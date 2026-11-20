// 业务路由：依赖注入只用于本地测试；index.ts 保留 Deno.serve。
// 此模块从不读取客户端提交的 owner 字段；manage_token 只在两处返回：发布响应，以及口令认领成功（claim-pin）。
// pin_hash / pin_fail_count / pin_locked_until 从不返回给前端。
export function application({ db, BackendError, env = null }) {
  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  const isUuid = (v) => typeof v === 'string' && uuidRe.test(v);

  const CATEGORIES = ['team', 'group_buy', 'study', 'carpool', 'housing', 'secondhand', 'errand'];
  const STATUSES = ['open', 'taken', 'done'];
  const REPORT_REASONS = ['fake', 'illegal', 'ad', 'other'];
  const HIDE_THRESHOLD = 3;
  // 对外公开字段：不包含 contact / manage_token / hidden
  const PUBLIC_COLUMNS = 'id,category,title,description,status,created_at,help_count,is_sample';
  const LIST_COLUMNS = PUBLIC_COLUMNS + ',hidden';
  // 列表/详情内部多取 contact，只用来算出 has_contact，随后在 publicRow 里剥离
  const FEED_COLUMNS = LIST_COLUMNS + ',contact';
  // 回复对外字段：不含 is_private / report_count / hidden
  const REPLY_COLUMNS = 'id,body,is_owner,created_at';
  // 管理页：全部需求列表上限、回复扫描上限（平台数据库单次查询最多 limit 1000，超过会直接报错）
  const ADMIN_DEMAND_LIST = 300, ADMIN_REPLY_SCAN = 1000;
  const LIMITS = { title: 40, description: 500, contact: 50, list: 300, reply: 200, replyList: 200 };

  const fail = (code, status) => { throw new BackendError(code, status); };
  const rows = (result) => {
    if (result.error) fail(result.error.code || 'database_error', result.error.status || 500);
    return result.data;
  };

  // ---------- 基础防刷（服务端，进程内尽力而为）----------
  // 限制：边缘函数按实例隔离、冷启动会清空内存，跨实例不共享，因此这是「基础」限流，
  // 不是严格的全局限流。未新增数据表以遵守「不改动现有数据库结构」的约束。
  const POST_WINDOW_MS = 10 * 60 * 1000, POST_MAX = 5;
  const CONTACT_WINDOW_MS = 60 * 1000, CONTACT_MAX = 20;
  const HELP_WINDOW_MS = 60 * 1000, HELP_MAX = 30;
  const REPORT_WINDOW_MS = 60 * 1000, REPORT_MAX = 20;
  const CLAIM_WINDOW_MS = 60 * 1000, CLAIM_MAX = 10;
  // 口令认领：按设备每分钟 10 次（进程内）；按需求累计错 5 次锁 1 小时（存数据库，跨实例生效）
  const PIN_CLAIM_WINDOW_MS = 60 * 1000, PIN_CLAIM_MAX = 10;
  const PIN_MAX_FAILS = 5, PIN_LOCK_MS = 60 * 60 * 1000;
  const pinRe = /^[0-9]{4}$/;
  // 新回复提醒：按设备每分钟 10 次，每次最多查 20 条
  const COUNTS_WINDOW_MS = 60 * 1000, COUNTS_MAX = 10, COUNTS_ITEMS = 20;
  // 回复：每设备每分钟 5 条、每小时 30 条（两档共用一个桶，同时满足才放行）
  const REPLY_TIERS = [{ max: 5, windowMs: 60 * 1000 }, { max: 30, windowMs: 60 * 60 * 1000 }];
  const buckets = new Map();
  let lastSweep = Date.now();

  function sweep(now) {
    if (now - lastSweep < 60 * 1000) return;
    lastSweep = now;
    const maxAge = Math.max(POST_WINDOW_MS, CONTACT_WINDOW_MS, HELP_WINDOW_MS, REPORT_WINDOW_MS, COUNTS_WINDOW_MS,
      ...REPLY_TIERS.map((t) => t.windowMs));
    for (const [key, arr] of buckets) {
      const kept = arr.filter((t) => now - t < maxAge);
      if (kept.length) buckets.set(key, kept); else buckets.delete(key);
    }
  }

  // 返回 { allowed, retryAfterMs }
  function hit(scope, src, max, windowMs) {
    const now = Date.now();
    sweep(now);
    const key = scope + ':' + src;
    const arr = (buckets.get(key) || []).filter((t) => now - t < windowMs);
    if (arr.length >= max) {
      buckets.set(key, arr);
      return { allowed: false, retryAfterMs: windowMs - (now - arr[0]) };
    }
    arr.push(now);
    buckets.set(key, arr);
    return { allowed: true };
  }

  // 多档限流：所有档位都未超限才计数一次，避免某档拒绝时其他档白白占额度
  function hitTiers(scope, src, tiers) {
    const now = Date.now();
    sweep(now);
    const key = scope + ':' + src;
    const longest = Math.max(...tiers.map((t) => t.windowMs));
    const arr = (buckets.get(key) || []).filter((t) => now - t < longest);
    for (const t of tiers) {
      if (arr.filter((x) => now - x < t.windowMs).length >= t.max) {
        buckets.set(key, arr);
        return { allowed: false };
      }
    }
    arr.push(now);
    buckets.set(key, arr);
    return { allowed: true };
  }

  // 来源标识：优先用前端生成的匿名设备令牌（x-dw-client），叠加网关可能透传的 IP。
  // 校园出口 IP 常为多人共享，若只按 IP 会误伤，故以设备令牌为主。两者皆无时归入 'anon'。
  function sourceOf(request) {
    const fwd = request.headers.get('x-forwarded-for');
    const ip = (fwd ? fwd.split(',')[0].trim() : '') || request.headers.get('x-real-ip') || '';
    const client = request.headers.get('x-dw-client') || '';
    const norm = (v) => (typeof v === 'string' ? v.slice(0, 128) : '');
    const src = norm(client) + '|' + norm(ip);
    return src === '|' ? 'anon' : src;
  }

  // 服务端统一清洗：必须是字符串、去首尾空格、非空、长度不超限
  function clean(v, max) {
    if (typeof v !== 'string') return null;
    const t = v.trim();
    if (!t || t.length > max) return null;
    return t;
  }

  async function input(request) {
    if (!request.headers.get('content-type')?.startsWith('application/json')) fail('invalid_input', 400);
    const reader = request.body?.getReader();
    if (!reader) fail('invalid_input', 400);
    let size = 0;
    const chunks = [];
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 8192) { await reader.cancel(); fail('payload_too_large', 413); }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
    catch { fail('invalid_input', 400); }
  }

  // help_count / hidden 由 migration 以「可空、无默认」方式新增，旧行可能为 NULL，这里统一归一并剥离内部字段
  const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
  // 「有没有联系方式」的唯一判断：去掉首尾空格后不是空字符串（兼容旧数据可能出现的 NULL）
  const hasContact = (v) => typeof v === 'string' && v.trim() !== '';
  const publicRow = (d) => {
    const { hidden, contact, ...rest } = d;
    // 只透出「有没有联系方式」，不透出联系方式本身
    rest.has_contact = hasContact(contact);
    rest.help_count = num(rest.help_count);
    rest.is_sample = rest.is_sample === true;
    return rest;
  };

  const adminKey = () => {
    const v = env && env.get ? env.get('ADMIN_KEY') : null;
    return typeof v === 'string' && v.trim() ? v.trim() : null;
  };
  // 口令哈希的服务端密钥：只从环境变量读，缺失时拒绝发布/认领（绝不退化成无密钥哈希）
  const pinPepper = () => {
    const v = env && env.get ? env.get('PIN_PEPPER') : null;
    return typeof v === 'string' && v.trim() ? v.trim() : null;
  };
  const requirePepper = () => pinPepper() || fail('pin_not_configured', 503);
  // hex(SHA-256(需求 id + 口令 + PIN_PEPPER))；id 固定 36 位、口令固定 4 位，拼接无歧义
  async function pinHash(id, pin, pepper) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(id + pin + pepper));
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // 定长比较，避免按字节提前返回带来的时间差
  function sameHash(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
  }

  const requireAdmin = (request) => {
    const key = adminKey();
    if (!key) fail('admin_not_configured', 503);
    if ((request.headers.get('x-admin-key') || '') !== key) fail('unauthorized', 401);
  };

  async function getDemand(id) {
    const found = rows(await db.from('demands').select(FEED_COLUMNS).eq('id', id).limit(1));
    if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
    return publicRow(found[0]);
  }

  // 回复用：取需求的内部字段（含 manage_token，仅在服务端比对，绝不返回）
  async function getDemandInternal(id) {
    const found = rows(await db.from('demands').select('id,hidden,is_sample,manage_token').eq('id', id).limit(1));
    if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
    return found[0];
  }
  // 数据库没有外键级联，由服务端清理关联数据：
  // 删除回复 → 删其 reply_reports；删除需求 → 删其 replies 及这些回复的 reply_reports。
  // 平台数据库客户端不一定支持 .in()，这里只用 .eq() 逐个处理。
  // 清理是「尽力而为」：主记录已删除成功，清理失败只记日志，绝不影响接口返回。
  async function purgeReplyReports(replyId) {
    rows(await db.from('reply_reports').delete().eq('reply_id', replyId).select('id'));
  }
  async function purgeDemandChildren(demandId) {
    const replies = rows(await db.from('replies').select('id').eq('demand_id', demandId));
    for (const r of Array.isArray(replies) ? replies : []) {
      if (r && r.id) await purgeReplyReports(r.id);
    }
    rows(await db.from('replies').delete().eq('demand_id', demandId).select('id'));
  }
  async function safePurgeDemands(demandIds) {
    for (const id of demandIds) {
      try { await purgeDemandChildren(id); }
      catch (error) { console.error('purge_demand_children_failed', id, error && (error.code || error.message)); }
    }
  }
  async function safePurgeReply(replyId) {
    try { await purgeReplyReports(replyId); }
    catch (error) { console.error('purge_reply_reports_failed', replyId, error && (error.code || error.message)); }
  }

  const tokenMatches = (demand, token) => typeof token === 'string' && token !== ''
    && typeof demand.manage_token === 'string' && demand.manage_token === token;

  return async (ctx) => {
    const request = ctx.request;
    // Gateway 保留后缀，但会把逻辑名 app 替换为部署的物理 Function 名；
    // Provider 也可能在调用前剥离 /functions/v1。
    const pathname = new URL(request.url).pathname;
    const match = pathname.match(/^\/(?:functions\/v1\/)?(?:app|app-d[0-9a-f]{32})(\/.*)?$/);
    if (!match) fail('not_found', 404);
    const path = match[1] || '/';

    // 健康检查（匿名）
    if (path === '/api/health' && request.method === 'GET') return Response.json({ ok: true });

    // 列表：按时间倒序，不含 contact / manage_token / hidden
    if (path === '/api/demands' && request.method === 'GET') {
      const raw = rows(await db.from('demands').select(FEED_COLUMNS)
        .order('created_at', { ascending: false }).limit(LIMITS.list));
      const list = (Array.isArray(raw) ? raw : []).filter((d) => d.hidden !== true).map(publicRow);
      return Response.json(list);
    }

    // 发布：生成 manage_token（前端只存本机，不再展示给用户）；口令只存加盐哈希
    if (path === '/api/demands' && request.method === 'POST') {
      const body = await input(request);
      const category = body && body.category;
      if (!CATEGORIES.includes(category)) fail('invalid_input', 400);
      const title = clean(body && body.title, LIMITS.title);
      if (!title) fail('invalid_input', 400);
      // 描述选填：缺省/null/空白 → 存空字符串 ''（description 列保持 NOT NULL）；有内容则必须是字符串且 ≤500 字
      const rawDescription = body && body.description;
      let description = '';
      if (rawDescription !== undefined && rawDescription !== null) {
        if (typeof rawDescription !== 'string') fail('invalid_input', 400);
        const t = rawDescription.trim();
        if (t.length > LIMITS.description) fail('invalid_input', 400);
        description = t;
      }
      // 联系方式选填：缺省/空白 → 存空字符串 ''（contact 列保持 NOT NULL）；有内容则必须是字符串且 ≤50 字
      const rawContact = body && body.contact;
      let contact = '';
      if (rawContact !== undefined && rawContact !== null) {
        if (typeof rawContact !== 'string') fail('invalid_input', 400);
        const t = rawContact.trim();
        if (t.length > LIMITS.contact) fail('invalid_input', 400);
        contact = t;
      }

      // 4 位数字口令：必填，只接受字符串形式的 4 位数字
      const pin = body && body.pin;
      if (typeof pin !== 'string' || !pinRe.test(pin)) fail('invalid_pin', 400);
      const pepper = requirePepper();

      // 通过输入校验后再计一次发布配额（非法请求不占用额度）
      if (!hit('post', sourceOf(request), POST_MAX, POST_WINDOW_MS).allowed) fail('rate_limited', 429);

      const id = crypto.randomUUID();
      const manageToken = crypto.randomUUID();
      const created = rows(await db.from('demands').insert({
        id, category, title, description, contact,
        status: 'open', manage_token: manageToken, created_at: new Date().toISOString(),
        help_count: 0, hidden: false, is_sample: false,
        pin_hash: await pinHash(id, pin, pepper), pin_fail_count: 0, pin_locked_until: null,
      }).select('id,category,title,description,contact,status,manage_token,created_at,help_count,is_sample'));
      if (!created || !created.length) fail('write_failed', 500);
      const out = { ...created[0] };
      out.has_contact = hasContact(out.contact);
      return Response.json(out, { status: 201 });
    }

    // 跨设备找回：校验 manage_token，只返回对应 id（绝不回传 token 本身）。
    // 错误码也计入限流额度，防止暴力枚举管理码；每设备每分钟 10 次。
    if (path === '/api/demands/claim' && request.method === 'POST') {
      const body = await input(request);
      const token = clean(body && body.manage_token, 64);
      if (!token) fail('invalid_input', 400);
      if (!hit('claim', sourceOf(request), CLAIM_MAX, CLAIM_WINDOW_MS).allowed) fail('rate_limited', 429);
      const found = rows(await db.from('demands').select('id,hidden').eq('manage_token', token).limit(1));
      if (!found || !found.length) fail('manage_token_invalid', 403);
      if (found[0].hidden === true) fail('not_found', 404);
      return Response.json({ id: found[0].id });
    }

    // 口令认领：输入发帖时设置的 4 位口令，正确则返回 manage_token（前端存入本机「我的发布」）。
    // 防暴力：① 按设备每分钟 10 次；② 按需求累计错 5 次锁 1 小时（锁定期间一律 429），成功后清零。
    // 「累计」指只有认领成功才清零：锁定到期后再错一次会立刻重新锁 1 小时。
    // 并发安全：先用「pin_fail_count 仍等于读到的值」做条件更新占用一次尝试，再比对口令，
    // 这样并发请求无法共用同一个计数值多试几次；条件更新落空的请求直接 429。
    const claimPinMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/claim-pin$/);
    if (claimPinMatch && isUuid(claimPinMatch[1]) && request.method === 'POST') {
      const body = await input(request);
      const pin = body && body.pin;
      if (typeof pin !== 'string' || !pinRe.test(pin)) fail('invalid_pin', 400);
      const pepper = requirePepper();
      if (!hit('claim-pin', sourceOf(request), PIN_CLAIM_MAX, PIN_CLAIM_WINDOW_MS).allowed) fail('rate_limited', 429);

      const id = claimPinMatch[1];
      const found = rows(await db.from('demands')
        .select('id,hidden,is_sample,manage_token,pin_hash,pin_fail_count,pin_locked_until').eq('id', id).limit(1));
      if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
      const d = found[0];
      if (d.is_sample === true) fail('sample_post', 400);
      // 口令功能上线前的旧帖没有口令，只能用管理码找回
      if (typeof d.pin_hash !== 'string' || !d.pin_hash) fail('pin_not_set', 409);

      const now = Date.now();
      const lockedUntil = d.pin_locked_until ? Date.parse(d.pin_locked_until) : NaN;
      if (Number.isFinite(lockedUntil) && lockedUntil > now) fail('pin_locked', 429);

      // 占用一次尝试：计数 +1；若这次达到上限，同一次写入里先挂上锁（口令正确再解除）
      const prev = d.pin_fail_count;
      const nextCount = num(prev) + 1;
      const reserve = { pin_fail_count: nextCount };
      if (nextCount >= PIN_MAX_FAILS) reserve.pin_locked_until = new Date(now + PIN_LOCK_MS).toISOString();
      let q = db.from('demands').update(reserve).eq('id', id);
      // 新帖发布时计数为 0，不会是 NULL；万一被手动清成 NULL，只能退化为无条件更新
      if (typeof prev === 'number') q = q.eq('pin_fail_count', prev);
      const reserved = rows(await q.select('id'));
      if (!reserved || !reserved.length) fail('rate_limited', 429);

      if (!sameHash(await pinHash(id, pin, pepper), d.pin_hash)) {
        fail(nextCount >= PIN_MAX_FAILS ? 'pin_locked' : 'pin_invalid', nextCount >= PIN_MAX_FAILS ? 429 : 403);
      }
      rows(await db.from('demands').update({ pin_fail_count: 0, pin_locked_until: null }).eq('id', id).select('id'));
      return Response.json({ id, manage_token: d.manage_token });
    }

    // 单独获取联系方式：详情页点击「查看联系方式」时调用（先按来源限流）
    const contactMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/contact$/);
    if (contactMatch && isUuid(contactMatch[1]) && request.method === 'GET') {
      if (!hit('contact', sourceOf(request), CONTACT_MAX, CONTACT_WINDOW_MS).allowed) fail('rate_limited', 429);
      const found = rows(await db.from('demands').select('id,contact,hidden,is_sample').eq('id', contactMatch[1]).limit(1));
      if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
      if (found[0].is_sample === true) fail('sample_post', 400);
      if (!hasContact(found[0].contact)) fail('no_contact', 400);
      return Response.json({ id: found[0].id, contact: found[0].contact });
    }

    // 修改状态：必须携带正确 manage_token
    const statusMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/status$/);
    if (statusMatch && isUuid(statusMatch[1]) && request.method === 'PATCH') {
      const body = await input(request);
      const status = body && body.status;
      if (!STATUSES.includes(status)) fail('invalid_input', 400);
      const token = typeof (body && body.manage_token) === 'string' ? body.manage_token : '';
      const updated = rows(await db.from('demands').update({ status })
        .eq('id', statusMatch[1]).eq('manage_token', token).select(PUBLIC_COLUMNS));
      if (!updated || !updated.length) fail('manage_token_invalid', 403);
      return Response.json(updated[0]);
    }

    // 撤下：必须携带正确 manage_token（放在详情之前，靠 method 区分）
    const deleteMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})$/);
    if (deleteMatch && isUuid(deleteMatch[1]) && request.method === 'DELETE') {
      const token = request.headers.get('x-manage-token') || '';
      const deleted = rows(await db.from('demands').delete()
        .eq('id', deleteMatch[1]).eq('manage_token', token).select('id'));
      if (!deleted || !deleted.length) fail('manage_token_invalid', 403);
      await safePurgeDemands([deleted[0].id]);
      return Response.json({ ok: true, id: deleted[0].id });
    }

    // 详情：不含 contact / manage_token
    if (deleteMatch && isUuid(deleteMatch[1]) && request.method === 'GET') {
      return Response.json(await getDemand(deleteMatch[1]));
    }

    // 「我能帮」：点击获取联系方式的同时 help_count +1（服务端按来源限流兜底，同设备去重由前端 LocalStorage 保证）
    const helpMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/help$/);
    if (helpMatch && isUuid(helpMatch[1]) && request.method === 'POST') {
      if (!hit('help', sourceOf(request), HELP_MAX, HELP_WINDOW_MS).allowed) fail('rate_limited', 429);
      const found = rows(await db.from('demands').select('id,contact,hidden,help_count,is_sample').eq('id', helpMatch[1]).limit(1));
      if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
      if (found[0].is_sample === true) fail('sample_post', 400);
      if (!hasContact(found[0].contact)) fail('no_contact', 400);
      const next = num(found[0].help_count) + 1;
      const updated = rows(await db.from('demands').update({ help_count: next }).eq('id', helpMatch[1]).select('id,help_count'));
      if (!updated || !updated.length) fail('write_failed', 500);
      return Response.json({ id: helpMatch[1], contact: found[0].contact, help_count: num(updated[0].help_count) });
    }

    // 举报：同设备只能一次，达到 3 个不同设备后自动隐藏
    const reportMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/report$/);
    if (reportMatch && isUuid(reportMatch[1]) && request.method === 'POST') {
      if (!hit('report', sourceOf(request), REPORT_MAX, REPORT_WINDOW_MS).allowed) fail('rate_limited', 429);
      const body = await input(request);
      const reason = body && body.reason;
      if (!REPORT_REASONS.includes(reason)) fail('invalid_input', 400);
      const id = reportMatch[1];
      const demand = rows(await db.from('demands').select('id,hidden,is_sample').eq('id', id).limit(1));
      if (!demand || !demand.length) fail('not_found', 404);
      if (demand[0].is_sample === true) fail('sample_post', 400);
      const device = sourceOf(request);
      const prior = rows(await db.from('reports').select('id').eq('demand_id', id).eq('device', device).limit(1));
      if (prior && prior.length) fail('already_reported', 409);
      rows(await db.from('reports').insert({
        id: crypto.randomUUID(), demand_id: id, device, reason, created_at: new Date().toISOString(),
      }).select('id'));
      const all = rows(await db.from('reports').select('device').eq('demand_id', id));
      const distinct = new Set((Array.isArray(all) ? all : []).map((r) => r.device)).size;
      if (distinct >= HIDE_THRESHOLD) {
        rows(await db.from('demands').update({ hidden: true }).eq('id', id).select('id'));
      }
      return Response.json({ ok: true });
    }

    // ---- 回复 ----
    // 公开回复列表：只返回 is_private=false 且未隐藏的，按时间正序
    const repliesMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/replies$/);
    if (repliesMatch && isUuid(repliesMatch[1]) && request.method === 'GET') {
      const demand = await getDemandInternal(repliesMatch[1]);
      if (demand.is_sample === true) return Response.json([]);
      const list = rows(await db.from('replies').select(REPLY_COLUMNS + ',is_private,hidden')
        .eq('demand_id', demand.id).eq('is_private', false)
        .order('created_at', { ascending: true }).limit(LIMITS.replyList));
      const out = (Array.isArray(list) ? list : [])
        .filter((x) => x.is_private !== true && x.hidden !== true)
        .map((x) => ({ id: x.id, body: x.body, is_owner: x.is_owner === true, created_at: x.created_at }));
      return Response.json(out);
    }

    // 发表回复：带正确 x-manage-token 即以「发布者」身份（公开）回复；带了但不正确 → 403
    if (repliesMatch && isUuid(repliesMatch[1]) && request.method === 'POST') {
      const payload = await input(request);
      const text = clean(payload && payload.body, LIMITS.reply);
      if (!text) fail('invalid_input', 400);
      const rawPrivate = payload && payload.is_private;
      if (rawPrivate !== undefined && typeof rawPrivate !== 'boolean') fail('invalid_input', 400);
      const demand = await getDemandInternal(repliesMatch[1]);
      if (demand.is_sample === true) fail('sample_post', 400);
      const token = request.headers.get('x-manage-token') || '';
      let isOwner = false;
      if (token) {
        if (!tokenMatches(demand, token)) fail('manage_token_invalid', 403);
        isOwner = true;
      }
      // 发帖人给自己发私信没有意义：发布者回复一律公开
      const isPrivate = isOwner ? false : rawPrivate === true;
      if (!hitTiers('reply', sourceOf(request), REPLY_TIERS).allowed) fail('rate_limited', 429);
      const created = rows(await db.from('replies').insert({
        id: crypto.randomUUID(), demand_id: demand.id, body: text,
        is_private: isPrivate, is_owner: isOwner, report_count: 0, hidden: false,
        created_at: new Date().toISOString(),
      }).select(REPLY_COLUMNS + ',is_private'));
      if (!created || !created.length) fail('write_failed', 500);
      const r = created[0];
      return Response.json({
        id: r.id, body: r.body, is_owner: r.is_owner === true, is_private: r.is_private === true, created_at: r.created_at,
      }, { status: 201 });
    }

    // 私信列表：仅发帖人（x-manage-token 正确）可见
    const privateMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/replies\/private$/);
    if (privateMatch && isUuid(privateMatch[1]) && request.method === 'GET') {
      const demand = await getDemandInternal(privateMatch[1]);
      if (!tokenMatches(demand, request.headers.get('x-manage-token') || '')) fail('manage_token_invalid', 403);
      const list = rows(await db.from('replies').select(REPLY_COLUMNS + ',is_private,hidden')
        .eq('demand_id', demand.id).eq('is_private', true)
        .order('created_at', { ascending: true }).limit(LIMITS.replyList));
      const out = (Array.isArray(list) ? list : [])
        .filter((x) => x.is_private === true && x.hidden !== true)
        .map((x) => ({ id: x.id, body: x.body, created_at: x.created_at }));
      return Response.json(out);
    }

    // 新回复提醒（只读）：请求体 [{id, token}]，最多 20 条；逐条校验 manage_token，
    // 返回每条的公开回复数（不含发布者自己的回复）与私信数，均不含已隐藏的。
    // id 格式不对 / token 不对 / 需求不存在或已隐藏 / 示例帖：直接跳过，不报错，也不区分原因。
    // 只返回计数，绝不返回 token 或回复内容。
    if (path === '/api/my/reply-counts' && request.method === 'POST') {
      const body = await input(request);
      if (!Array.isArray(body) || body.length > COUNTS_ITEMS) fail('invalid_input', 400);
      if (!hit('reply-counts', sourceOf(request), COUNTS_MAX, COUNTS_WINDOW_MS).allowed) fail('rate_limited', 429);
      const out = [];
      const seen = new Set();
      for (const item of body) {
        const id = item && item.id;
        const token = item && item.token;
        if (!isUuid(id) || typeof token !== 'string' || !token || token.length > 64 || seen.has(id)) continue;
        seen.add(id);
        const found = rows(await db.from('demands').select('id,hidden,is_sample,manage_token').eq('id', id).limit(1));
        const d = Array.isArray(found) && found.length ? found[0] : null;
        if (!d || d.hidden === true || d.is_sample === true || !tokenMatches(d, token)) continue;
        const list = rows(await db.from('replies').select('id,is_private,is_owner,hidden')
          .eq('demand_id', id).limit(1000));
        let pub = 0, priv = 0;
        for (const x of Array.isArray(list) ? list : []) {
          if (!x || x.hidden === true) continue;
          if (x.is_private === true) priv += 1;
          else if (x.is_owner !== true) pub += 1;
        }
        out.push({ id, public_count: pub, private_count: priv });
      }
      return Response.json(out);
    }

    // 举报回复：同设备对同一条只能一次；report_count 达到 3 自动隐藏
    const replyReportMatch = path.match(/^\/api\/replies\/([0-9a-f-]{36})\/report$/);
    if (replyReportMatch && isUuid(replyReportMatch[1]) && request.method === 'POST') {
      if (!hit('report', sourceOf(request), REPORT_MAX, REPORT_WINDOW_MS).allowed) fail('rate_limited', 429);
      const id = replyReportMatch[1];
      const found = rows(await db.from('replies').select('id,hidden').eq('id', id).limit(1));
      if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
      const device = sourceOf(request);
      const prior = rows(await db.from('reply_reports').select('id').eq('reply_id', id).eq('device', device).limit(1));
      if (prior && prior.length) fail('already_reported', 409);
      rows(await db.from('reply_reports').insert({
        id: crypto.randomUUID(), reply_id: id, device, created_at: new Date().toISOString(),
      }).select('id'));
      const all = rows(await db.from('reply_reports').select('device').eq('reply_id', id));
      const count = new Set((Array.isArray(all) ? all : []).map((x) => x.device)).size;
      const patch = { report_count: count };
      if (count >= HIDE_THRESHOLD) patch.hidden = true;
      rows(await db.from('replies').update(patch).eq('id', id).select('id'));
      return Response.json({ ok: true });
    }

    // ---- 管理员（x-admin-key 头携带 ADMIN_KEY）----
    // 举报列表：按需求聚合，附带需求信息与举报理由
    if (path === '/api/admin/reports' && request.method === 'GET') {
      requireAdmin(request);
      const reps = rows(await db.from('reports').select('id,demand_id,device,reason,created_at')
        .order('created_at', { ascending: false }).limit(500));
      const repList = Array.isArray(reps) ? reps : [];
      const ids = [...new Set(repList.map((r) => r.demand_id))];
      // 只用 .eq() 逐个取需求（平台客户端不一定支持 .in()）
      const demands = [];
      for (const id of ids) {
        const found = rows(await db.from('demands').select(LIST_COLUMNS).eq('id', id).limit(1));
        if (Array.isArray(found) && found.length) demands.push(found[0]);
      }
      const byId = new Map((Array.isArray(demands) ? demands : []).map((d) => [d.id, d]));
      const groups = new Map();
      for (const r of repList) {
        const g = groups.get(r.demand_id) || { demand: byId.get(r.demand_id) || null, report_count: 0, reasons: [], latest_at: r.created_at };
        g.report_count += 1;
        if (g.reasons.indexOf(r.reason) < 0) g.reasons.push(r.reason);
        groups.set(r.demand_id, g);
      }
      const list = [...groups.values()].sort((a, b) => (b.latest_at < a.latest_at ? -1 : b.latest_at > a.latest_at ? 1 : 0));
      return Response.json(list);
    }

    // 管理员：全部需求（含已隐藏），按发布时间倒序，附公开回复数 / 私信数。
    // 仅管理页使用；不含 contact / manage_token / pin_*。
    if (path === '/api/admin/demands' && request.method === 'GET') {
      requireAdmin(request);
      const raw = rows(await db.from('demands').select(LIST_COLUMNS)
        .order('created_at', { ascending: false }).limit(ADMIN_DEMAND_LIST));
      const list = Array.isArray(raw) ? raw : [];
      // 一次取回复的 demand_id/is_private 在内存里计数，避免逐条查询。
      // 统计是附加信息：失败只记日志、回复数一律返回 null，需求列表照常返回。
      let counts = new Map();
      try {
        const reps = rows(await db.from('replies').select('demand_id,is_private').limit(ADMIN_REPLY_SCAN));
        for (const r of Array.isArray(reps) ? reps : []) {
          if (!r || !r.demand_id) continue;
          const c = counts.get(r.demand_id) || { pub: 0, priv: 0 };
          if (r.is_private === true) c.priv += 1; else c.pub += 1;
          counts.set(r.demand_id, c);
        }
      } catch (error) {
        console.error('admin_reply_count_failed', error && (error.code || error.message));
        counts = null;
      }
      return Response.json(list.map((d) => {
        const c = counts ? (counts.get(d.id) || { pub: 0, priv: 0 }) : { pub: null, priv: null };
        return {
          id: d.id, category: d.category, title: d.title, description: d.description,
          status: d.status, created_at: d.created_at, help_count: num(d.help_count),
          is_sample: d.is_sample === true, hidden: d.hidden === true,
          public_count: c.pub, private_count: c.priv,
        };
      }));
    }

    // 管理员：某条需求的全部回复（公开 + 私信，含已隐藏），按时间正序。仅管理页使用。
    const adminRepliesMatch = path.match(/^\/api\/admin\/demands\/([0-9a-f-]{36})\/replies$/);
    if (adminRepliesMatch && isUuid(adminRepliesMatch[1]) && request.method === 'GET') {
      requireAdmin(request);
      const id = adminRepliesMatch[1];
      const found = rows(await db.from('demands').select('id').eq('id', id).limit(1));
      if (!found || !found.length) fail('not_found', 404);
      const list = rows(await db.from('replies').select('id,body,is_private,is_owner,report_count,hidden,created_at')
        .eq('demand_id', id).order('created_at', { ascending: true }).limit(ADMIN_REPLY_SCAN));
      return Response.json((Array.isArray(list) ? list : []).map((x) => ({
        id: x.id, body: x.body, is_private: x.is_private === true, is_owner: x.is_owner === true,
        report_count: num(x.report_count), hidden: x.hidden === true, created_at: x.created_at,
      })));
    }

    // 管理员：删除任意需求
    const adminDelMatch = path.match(/^\/api\/admin\/demands\/([0-9a-f-]{36})$/);
    if (adminDelMatch && isUuid(adminDelMatch[1]) && request.method === 'DELETE') {
      requireAdmin(request);
      const deleted = rows(await db.from('demands').delete().eq('id', adminDelMatch[1]).select('id'));
      if (!deleted || !deleted.length) fail('not_found', 404);
      await safePurgeDemands([deleted[0].id]);
      return Response.json({ ok: true, id: deleted[0].id });
    }

    // 管理员：删除任意回复（含私信）
    const adminReplyDelMatch = path.match(/^\/api\/admin\/replies\/([0-9a-f-]{36})$/);
    if (adminReplyDelMatch && isUuid(adminReplyDelMatch[1]) && request.method === 'DELETE') {
      requireAdmin(request);
      const deleted = rows(await db.from('replies').delete().eq('id', adminReplyDelMatch[1]).select('id'));
      if (!deleted || !deleted.length) fail('not_found', 404);
      await safePurgeReply(deleted[0].id);
      return Response.json({ ok: true, id: deleted[0].id });
    }

    // 管理员：恢复被隐藏的需求
    const restoreMatch = path.match(/^\/api\/admin\/demands\/([0-9a-f-]{36})\/restore$/);
    if (restoreMatch && isUuid(restoreMatch[1]) && request.method === 'POST') {
      requireAdmin(request);
      const restored = rows(await db.from('demands').update({ hidden: false }).eq('id', restoreMatch[1]).select('id'));
      if (!restored || !restored.length) fail('not_found', 404);
      return Response.json({ ok: true, id: restored[0].id });
    }

    // 管理员：删除全部示例帖（真实帖不受影响）
    if (path === '/api/admin/samples' && request.method === 'DELETE') {
      requireAdmin(request);
      const deleted = rows(await db.from('demands').delete().eq('is_sample', true).select('id'));
      await safePurgeDemands((Array.isArray(deleted) ? deleted : []).map((d) => d.id).filter(Boolean));
      return Response.json({ ok: true, deleted: Array.isArray(deleted) ? deleted.length : 0 });
    }

    fail('not_found', 404);
  };
}
