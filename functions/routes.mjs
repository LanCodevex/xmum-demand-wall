// 业务路由：依赖注入只用于本地测试；index.ts 保留 Deno.serve。
// 此模块从不读取客户端提交的 owner 字段，也从不向前端泄露 manage_token（发布响应除外）。
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
  const LIMITS = { title: 40, description: 500, contact: 50, list: 300 };

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
  const buckets = new Map();
  let lastSweep = Date.now();

  function sweep(now) {
    if (now - lastSweep < 60 * 1000) return;
    lastSweep = now;
    const maxAge = Math.max(POST_WINDOW_MS, CONTACT_WINDOW_MS, HELP_WINDOW_MS, REPORT_WINDOW_MS);
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
  const publicRow = (d) => {
    const { hidden, ...rest } = d;
    rest.help_count = num(rest.help_count);
    rest.is_sample = rest.is_sample === true;
    return rest;
  };

  const adminKey = () => {
    const v = env && env.get ? env.get('ADMIN_KEY') : null;
    return typeof v === 'string' && v.trim() ? v.trim() : null;
  };
  const requireAdmin = (request) => {
    const key = adminKey();
    if (!key) fail('admin_not_configured', 503);
    if ((request.headers.get('x-admin-key') || '') !== key) fail('unauthorized', 401);
  };

  async function getDemand(id) {
    const found = rows(await db.from('demands').select(LIST_COLUMNS).eq('id', id).limit(1));
    if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
    return publicRow(found[0]);
  }

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
      const raw = rows(await db.from('demands').select(LIST_COLUMNS)
        .order('created_at', { ascending: false }).limit(LIMITS.list));
      const list = (Array.isArray(raw) ? raw : []).filter((d) => d.hidden !== true).map(publicRow);
      return Response.json(list);
    }

    // 发布：生成 manage_token，只随本次响应返回一次
    if (path === '/api/demands' && request.method === 'POST') {
      const body = await input(request);
      const category = body && body.category;
      if (!CATEGORIES.includes(category)) fail('invalid_input', 400);
      const title = clean(body && body.title, LIMITS.title);
      const description = clean(body && body.description, LIMITS.description);
      const contact = clean(body && body.contact, LIMITS.contact);
      if (!title || !description || !contact) fail('invalid_input', 400);

      // 通过输入校验后再计一次发布配额（非法请求不占用额度）
      if (!hit('post', sourceOf(request), POST_MAX, POST_WINDOW_MS).allowed) fail('rate_limited', 429);

      const id = crypto.randomUUID();
      const manageToken = crypto.randomUUID();
      const created = rows(await db.from('demands').insert({
        id, category, title, description, contact,
        status: 'open', manage_token: manageToken, created_at: new Date().toISOString(),
        help_count: 0, hidden: false, is_sample: false,
      }).select('id,category,title,description,contact,status,manage_token,created_at,help_count,is_sample'));
      if (!created || !created.length) fail('write_failed', 500);
      return Response.json(created[0], { status: 201 });
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

    // 单独获取联系方式：详情页点击「查看联系方式」时调用（先按来源限流）
    const contactMatch = path.match(/^\/api\/demands\/([0-9a-f-]{36})\/contact$/);
    if (contactMatch && isUuid(contactMatch[1]) && request.method === 'GET') {
      if (!hit('contact', sourceOf(request), CONTACT_MAX, CONTACT_WINDOW_MS).allowed) fail('rate_limited', 429);
      const found = rows(await db.from('demands').select('id,contact,hidden,is_sample').eq('id', contactMatch[1]).limit(1));
      if (!found || !found.length || found[0].hidden === true) fail('not_found', 404);
      if (found[0].is_sample === true) fail('sample_post', 400);
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

    // ---- 管理员（x-admin-key 头携带 ADMIN_KEY）----
    // 举报列表：按需求聚合，附带需求信息与举报理由
    if (path === '/api/admin/reports' && request.method === 'GET') {
      requireAdmin(request);
      const reps = rows(await db.from('reports').select('id,demand_id,device,reason,created_at')
        .order('created_at', { ascending: false }).limit(500));
      const repList = Array.isArray(reps) ? reps : [];
      const ids = [...new Set(repList.map((r) => r.demand_id))];
      let demands = [];
      if (ids.length) demands = rows(await db.from('demands').select(LIST_COLUMNS).in('id', ids));
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

    // 管理员：删除任意需求
    const adminDelMatch = path.match(/^\/api\/admin\/demands\/([0-9a-f-]{36})$/);
    if (adminDelMatch && isUuid(adminDelMatch[1]) && request.method === 'DELETE') {
      requireAdmin(request);
      const deleted = rows(await db.from('demands').delete().eq('id', adminDelMatch[1]).select('id'));
      if (!deleted || !deleted.length) fail('not_found', 404);
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
      return Response.json({ ok: true, deleted: Array.isArray(deleted) ? deleted.length : 0 });
    }

    fail('not_found', 404);
  };
}
