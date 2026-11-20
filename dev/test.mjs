// 本地逻辑校验：注入内存假 DB，跑通接口的业务规则。
// 仅验证路由逻辑，不代表云端数据库/权限/入口隔离已验收。用 Node 运行：node dev/test.mjs
import { application } from '../functions/routes.mjs';

class FakeError extends Error {
  constructor(code, status) { super(code); this.code = code; this.status = status; }
}

// 多表内存假 DB：支持 demands / reports，支持 eq / in / order / limit / insert / update / delete。
function createFakeDb() {
  const tables = { demands: [], reports: [], replies: [], reply_reports: [] };
  const failTables = new Set();
  return {
    tables,
    failTables,
    from(table) {
      if (!(table in tables)) throw new FakeError('invalid_table', 400);
      const rows_ = tables[table];
      const filters = []; let order = null; let mode = 'read'; let values; let limit = 1000; let cols = '*';
      const match = (row) => filters.every((f) => (f.op === 'in' ? f.val.includes(row[f.key]) : row[f.key] === f.val));
      const pick = (row) => (cols === '*' ? { ...row } : Object.fromEntries(cols.split(',').map((k) => [k, row[k]])));
      const q = {
        select(c) { cols = c; return q; },
        eq(k, v) { filters.push({ op: 'eq', key: k, val: v }); return q; },
        // Qoder Sites 的数据库客户端不一定支持 .in()（线上 delete + in 导致过 500），
        // 这里一律直接抛错，保证业务代码只用 .eq() 逐个处理。
        in() { throw new Error('fake_db: .in() is not supported; use .eq() per id'); },
        order(k, opts) { order = [k, opts && opts.ascending === false ? 'desc' : 'asc']; return q; },
        limit(n) { limit = n; return q; },
        insert(v) { mode = 'insert'; values = v; return q; },
        update(v) { mode = 'update'; values = v; return q; },
        delete() { mode = 'delete'; return q; },
        then(resolve) {
          return Promise.resolve().then(() => {
            // 故障注入：被标记的表返回数据库错误（模拟线上清理失败）
            if (failTables.has(table)) return { data: null, error: { code: 'fake_db_failure', status: 500 } };
            let data;
            if (mode === 'insert') {
              const row = { ...values, created_at: values.created_at || new Date().toISOString() };
              rows_.push(row);
              data = [pick(row)];
            } else if (mode === 'delete') {
              const keep = [], matched = [];
              for (const row of rows_) (match(row) ? matched : keep).push(row);
              rows_.length = 0; rows_.push(...keep);
              data = matched.map(pick);
            } else {
              let r = rows_.filter(match);
              if (mode === 'update') r.forEach((row) => Object.assign(row, values));
              if (order) {
                const [k, dir] = order;
                r = [...r].sort((a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * (dir === 'asc' ? 1 : -1));
              }
              r = r.slice(0, limit);
              data = r.map(pick);
            }
            return { data, error: null };
          }).then(resolve);
        },
      };
      return q;
    },
  };
}

// 模拟 Deno.env：get(key) 返回配置值，未配置返回 null
// 默认带测试用 PIN_PEPPER（发布必须有它）；传 PIN_PEPPER: undefined 可模拟未配置
function makeEnv(obj) {
  const all = { PIN_PEPPER: 'test-pepper', ...obj };
  return { get: (k) => (typeof all[k] === 'string' ? all[k] : null) };
}

function req(method, path, body, headers) {
  const h = new Headers();
  if (body !== undefined) h.set('content-type', 'application/json');
  if (headers) for (const [k, v] of Object.entries(headers)) h.set(k, v);
  const init = { method, headers: h };
  if (body !== undefined) init.body = JSON.stringify(body);
  return new Request(`http://test/functions/v1/app${path}`, init);
}

let passed = 0;
function assert(cond, label) {
  if (!cond) { console.error('✗ 失败：' + label); process.exitCode = 1; }
  else { passed++; console.log('✓ ' + label); }
}

const db = createFakeDb();
const handle = application({ db, BackendError: FakeError, env: makeEnv({}) });
// 模拟部署环境的 errorResponse：把抛出的 BackendError 转成 JSON 响应
const mkCall = (h) => async (m, p, b, hdr) => {
  try {
    return await h({ request: req(m, p, b, hdr) });
  } catch (e) {
    if (e instanceof FakeError) return Response.json({ error: e.code }, { status: e.status });
    throw e;
  }
};
const call = mkCall(handle);

// 1. 健康检查
let r = await call('GET', '/api/health');
assert(r.status === 200 && (await r.json()).ok === true, '健康检查返回 ok');

// 2. 空列表
r = await call('GET', '/api/demands');
assert(r.status === 200 && (await r.json()).length === 0, '空列表返回 []');

// 3. 发布（含非法输入校验）
r = await call('POST', '/api/demands', { pin: '1234', category: 'group_buy', title: '  拼奶茶  ', description: '  一起拼奶茶  ', contact: '  wx: abc  ' });
assert(r.status === 201, '发布返回 201');
const created = await r.json();
assert(created.title === '拼奶茶', '标题去首尾空格');
assert(typeof created.manage_token === 'string' && created.manage_token.length === 36, '返回 manage_token');
assert(created.status === 'open', '默认状态 open');
assert(created.help_count === 0, '发布返回 help_count=0');

r = await call('POST', '/api/demands', { pin: '1234', category: 'nope', title: 'x', description: 'y', contact: 'z' });
assert(r.status === 400, '非法分类被拒绝');

r = await call('POST', '/api/demands', { pin: '1234', category: 'currency', title: 'x', description: 'y', contact: 'z' });
assert(r.status === 400, '换汇分类被拒绝');

r = await call('POST', '/api/demands', { pin: '1234', category: 'study', title: 'x'.repeat(41), description: 'y', contact: 'z' });
assert(r.status === 400, '标题超长被拒绝');

r = await call('POST', '/api/demands', { pin: '1234', category: 'study', title: '   ', description: 'y', contact: 'z' });
assert(r.status === 400, '空白标题被拒绝');

// 4. 列表不含 contact / manage_token
r = await call('GET', '/api/demands');
const list = await r.json();
assert(list.length === 1, '列表包含 1 条');
assert(!('contact' in list[0]) && !('manage_token' in list[0]), '列表不返回 contact/manage_token');
assert(!('hidden' in list[0]), '列表不返回 hidden 内部字段');

// 5. 详情不含 contact / manage_token
r = await call('GET', `/api/demands/${created.id}`);
const detail = await r.json();
assert(detail.title === '拼奶茶' && !('contact' in detail) && !('manage_token' in detail), '详情不返回 contact/manage_token');

// 6. 联系方式单独接口
r = await call('GET', `/api/demands/${created.id}/contact`);
const contact = await r.json();
assert(contact.contact === 'wx: abc', '联系方式接口返回 contact');

// 7. 修改状态：错误 token 拒绝，正确 token 生效
r = await call('PATCH', `/api/demands/${created.id}/status`, { manage_token: 'bad', status: 'taken' });
assert(r.status === 403, '错误 token 修改状态返回 403');

r = await call('PATCH', `/api/demands/${created.id}/status`, { manage_token: created.manage_token, status: 'taken' });
const updated = await r.json();
assert(updated.status === 'taken' && !('manage_token' in updated), '正确 token 修改状态成功且不返回 token');

r = await call('PATCH', `/api/demands/${created.id}/status`, { manage_token: created.manage_token, status: 'open' });
assert(r.status === 200, '状态可回改 open');

// 8. 撤下：错误 token 拒绝，正确 token 删除
r = await call('DELETE', `/api/demands/${created.id}`, undefined, { 'x-manage-token': 'wrong' });
assert(r.status === 403, '错误 token 撤下返回 403');

r = await call('GET', '/api/demands');
assert((await r.json()).length === 1, '错误 token 撤下不影响数据');

r = await call('DELETE', `/api/demands/${created.id}`, undefined, { 'x-manage-token': created.manage_token });
assert(r.status === 200 && (await r.json()).ok === true, '正确 token 撤下返回 200');

r = await call('GET', `/api/demands/${created.id}`);
assert(r.status === 404, '撤下后详情 404');

// 9. 未知路由 404
r = await call('GET', '/api/nope');
assert(r.status === 404, '未知路由返回 404');

// 10. 排序：新发布的在前
await call('POST', '/api/demands', { pin: '1234', category: 'carpool', title: '拼车去机场', description: '明天上午', contact: 'wx2' });
r = await call('GET', '/api/demands');
const list2 = await r.json();
assert(list2.length === 1 && list2[0].title === '拼车去机场', '撤下的记录不再出现在列表，最新在前');

// ---- 防刷：使用独立的 application 实例（独立内存桶），同一来源令牌 ----
const db2 = createFakeDb();
const call2 = mkCall(application({ db: db2, BackendError: FakeError, env: makeEnv({}) }));
const SRC = { 'x-dw-client': 'test-device-1' };

// 11. 发布：同一来源 10 分钟内第 6 条被限流
let postStatuses = [];
for (let i = 0; i < 6; i++) {
  const rr = await call2('POST', '/api/demands', { pin: '1234', category: 'study', title: 'T' + i, description: 'D' + i, contact: 'C' + i }, SRC);
  postStatuses.push(rr.status);
}
assert(postStatuses.slice(0, 5).every((s) => s === 201), '前 5 条发布成功');
assert(postStatuses[5] === 429, '第 6 条发布触发 429');
const rl = await (await call2('POST', '/api/demands', { pin: '1234', category: 'study', title: 'T6', description: 'D6', contact: 'C6' }, SRC)).json();
assert(rl.error === 'rate_limited', '限流返回 rate_limited');

// 12. 发布：不同来源互不影响
const rr2 = await call2('POST', '/api/demands', { pin: '1234', category: 'study', title: 'other', description: 'd', contact: 'c' }, { 'x-dw-client': 'test-device-2' });
assert(rr2.status === 201, '不同设备令牌来源不受前者限流影响');

// 13. 联系方式：同一来源 1 分钟内第 21 次被限流（非法请求不占额度已在校验保证，这里全部合法）
const oneId = (await (await call2('GET', '/api/demands', undefined, { 'x-dw-client': 'test-device-1' })).json())[0].id;
let contactStatuses = [];
for (let i = 0; i < 21; i++) {
  const rr = await call2('GET', `/api/demands/${oneId}/contact`, undefined, SRC);
  contactStatuses.push(rr.status);
}
assert(contactStatuses.slice(0, 20).every((s) => s === 200), '前 20 次查看联系方式成功');
assert(contactStatuses[20] === 429, '第 21 次查看联系方式触发 429');

// ---- 新增：我能帮闭环 / 举报 / 管理员 / 隐藏 ----
const db3 = createFakeDb();
const call3 = mkCall(application({ db: db3, BackendError: FakeError, env: makeEnv({ ADMIN_KEY: 'sk-admin-123' }) }));

// 14. 发布
r = await call3('POST', '/api/demands', { pin: '1234', category: 'study', title: '求期末复习资料', description: '数学', contact: 'wx: help' });
assert(r.status === 201, '（闭环）发布返回 201');
const d3 = await r.json();

// 15. 我能帮：POST /help 返回联系方式并 help_count+1
r = await call3('POST', `/api/demands/${d3.id}/help`, undefined, { 'x-dw-client': 'device-A' });
assert(r.status === 200, '（闭环）help 返回 200');
let h = await r.json();
assert(h.contact === 'wx: help', 'help 返回 contact');
assert(h.help_count === 1, 'help_count 变为 1');

// 16. 列表带 help_count
r = await call3('GET', '/api/demands');
let l3 = await r.json();
assert(l3.length === 1 && l3[0].help_count === 1, '列表返回 help_count=1');

// 17. 举报：同设备重复举报 409
r = await call3('POST', `/api/demands/${d3.id}/report`, { reason: 'fake' }, { 'x-dw-client': 'device-A' });
assert(r.status === 200, '第一次举报返回 200');
r = await call3('POST', `/api/demands/${d3.id}/report`, { reason: 'fake' }, { 'x-dw-client': 'device-A' });
assert(r.status === 409, '同设备重复举报返回 409');

// 18. 3 个不同设备举报后自动隐藏
r = await call3('POST', `/api/demands/${d3.id}/report`, { reason: 'ad' }, { 'x-dw-client': 'device-B' });
assert(r.status === 200, '第二个设备举报成功');
r = await call3('POST', `/api/demands/${d3.id}/report`, { reason: 'other' }, { 'x-dw-client': 'device-C' });
assert(r.status === 200, '第三个设备举报成功');

r = await call3('GET', '/api/demands');
l3 = await r.json();
assert(l3.length === 0, '被 3 设备举报后列表不再出现');
r = await call3('GET', `/api/demands/${d3.id}`);
assert(r.status === 404, '被隐藏后详情 404');

// 19. 管理员：错误密钥 401，正确密钥可查看/恢复/删除
r = await call3('GET', '/api/admin/reports', undefined, { 'x-admin-key': 'wrong' });
assert(r.status === 401, '管理员错误密钥返回 401');

r = await call3('GET', '/api/admin/reports', undefined, { 'x-admin-key': 'sk-admin-123' });
assert(r.status === 200, '管理员正确密钥返回 200');
const reports = await r.json();
assert(reports.length === 1 && reports[0].report_count === 3 && reports[0].demand.hidden === true, '举报列表含被隐藏需求与 3 次举报');

r = await call3('POST', `/api/admin/demands/${d3.id}/restore`, undefined, { 'x-admin-key': 'sk-admin-123' });
assert(r.status === 200, '管理员恢复隐藏需求');
r = await call3('GET', `/api/demands/${d3.id}`);
assert(r.status === 200, '恢复后详情可访问');

r = await call3('DELETE', `/api/admin/demands/${d3.id}`, undefined, { 'x-admin-key': 'sk-admin-123' });
assert(r.status === 200, '管理员删除任意需求');
r = await call3('GET', `/api/demands/${d3.id}`);
assert(r.status === 404, '管理员删除后详情 404');

// 20. 未配置 ADMIN_KEY 的管理接口返回 503
const db4 = createFakeDb();
const call4 = mkCall(application({ db: db4, BackendError: FakeError, env: makeEnv({}) }));
r = await call4('GET', '/api/admin/reports', undefined, { 'x-admin-key': 'anything' });
assert(r.status === 503, '未配置 ADMIN_KEY 返回 503');

// ---- 新增：示例帖 / 组队分类 / 管理员批量删示例 ----
const db5 = createFakeDb();
const call5 = mkCall(application({ db: db5, BackendError: FakeError, env: makeEnv({ ADMIN_KEY: 'sk-admin-123' }) }));

// 21. 组队分类可发布，新帖 is_sample=false
r = await call5('POST', '/api/demands', { pin: '1234', category: 'team', title: '统计学习组队 3=2', description: '还差 1 人', contact: 'wx: team' });
assert(r.status === 201, '组队分类发布返回 201');
const dTeam = await r.json();
assert(dTeam.is_sample === false, '新发布真实帖 is_sample=false');

// 22. 注入示例行（模拟种子数据）：列表/详情透出 is_sample=true
db5.tables.demands.push({
  id: '22222222-2222-4222-8222-222222222201', category: 'errand', title: '示例需求',
  description: '示例', contact: '示例需求，联系方式已隐藏', status: 'open',
  manage_token: '22222222-2222-4222-8222-222222222299', created_at: new Date().toISOString(),
  help_count: 5, hidden: false, is_sample: true,
});
r = await call5('GET', '/api/demands');
const l5 = await r.json();
const sampleRow = l5.find((x) => x.id === '22222222-2222-4222-8222-222222222201');
assert(sampleRow && sampleRow.is_sample === true, '列表透出示例帖 is_sample=true');
assert(l5.find((x) => x.id === dTeam.id).is_sample === false, '列表真实帖 is_sample=false');
r = await call5('GET', '/api/demands/22222222-2222-4222-8222-222222222201');
assert((await r.json()).is_sample === true, '详情透出示例帖 is_sample=true');

// 23. 示例帖：help / contact / report 均拒绝，help_count 不变
r = await call5('POST', '/api/demands/22222222-2222-4222-8222-222222222201/help', undefined, { 'x-dw-client': 'device-S' });
assert(r.status === 400 && (await r.json()).error === 'sample_post', '示例帖 help 返回 400 sample_post');
r = await call5('GET', '/api/demands/22222222-2222-4222-8222-222222222201/contact', undefined, { 'x-dw-client': 'device-S' });
assert(r.status === 400 && (await r.json()).error === 'sample_post', '示例帖 contact 返回 400 sample_post');
r = await call5('POST', '/api/demands/22222222-2222-4222-8222-222222222201/report', { reason: 'fake' }, { 'x-dw-client': 'device-S' });
assert(r.status === 400 && (await r.json()).error === 'sample_post', '示例帖 report 返回 400 sample_post');
assert(db5.tables.demands.find((x) => x.id === '22222222-2222-4222-8222-222222222201').help_count === 5, '示例帖 help_count 不被改动');

// 24. 管理员批量删示例：错误密钥 401；正确密钥只删示例，真实帖保留
r = await call5('DELETE', '/api/admin/samples', undefined, { 'x-admin-key': 'wrong' });
assert(r.status === 401, '删示例错误密钥返回 401');
r = await call5('DELETE', '/api/admin/samples', undefined, { 'x-admin-key': 'sk-admin-123' });
const delRes = await r.json();
assert(r.status === 200 && delRes.ok === true && delRes.deleted === 1, '删示例返回 deleted=1');
r = await call5('GET', '/api/demands');
const l5b = await r.json();
assert(l5b.length === 1 && l5b[0].id === dTeam.id, '删示例后真实帖保留');
r = await call5('GET', '/api/demands/22222222-2222-4222-8222-222222222201');
assert(r.status === 404, '删示例后示例帖详情 404');

// ---- 新增：跨设备找回 claim ----
const db6 = createFakeDb();
const call6 = mkCall(application({ db: db6, BackendError: FakeError, env: makeEnv({}) }));

// 25. 发布一条用于找回
r = await call6('POST', '/api/demands', { pin: '1234', category: 'study', title: '求自习搭子', description: '图书馆', contact: 'wx: claim' });
assert(r.status === 201, '（claim）发布返回 201');
const d6 = await r.json();

// 26. 正确管理码找回：只返回 id，不回传 token/contact
r = await call6('POST', '/api/demands/claim', { manage_token: d6.manage_token }, { 'x-dw-client': 'device-CL' });
assert(r.status === 200, '（claim）正确管理码返回 200');
const claimed = await r.json();
assert(claimed.id === d6.id, '（claim）返回对应 id');
assert(!('manage_token' in claimed) && !('contact' in claimed), '（claim）不回传 token/contact');

// 27. 错误管理码 403；缺管理码 400
r = await call6('POST', '/api/demands/claim', { manage_token: 'wrong-token' }, { 'x-dw-client': 'device-CL' });
assert(r.status === 403 && (await r.json()).error === 'manage_token_invalid', '（claim）错误管理码 403');
r = await call6('POST', '/api/demands/claim', {}, { 'x-dw-client': 'device-CL' });
assert(r.status === 400, '（claim）缺管理码 400');

// 28. 限流：同设备每分钟 10 次（错误码也占额度），第 11 次 429
// 已用 2 次（正确1+错误1），再补 8 次错误凑满 10
let claimStatuses = [];
for (let i = 0; i < 8; i++) {
  const rr = await call6('POST', '/api/demands/claim', { manage_token: 'bad-' + i }, { 'x-dw-client': 'device-CL' });
  claimStatuses.push(rr.status);
}
assert(claimStatuses.every((s) => s === 403), '（claim）前 10 次内错误码返回 403');
r = await call6('POST', '/api/demands/claim', { manage_token: d6.manage_token }, { 'x-dw-client': 'device-CL' });
assert(r.status === 429 && (await r.json()).error === 'rate_limited', '（claim）同设备第 11 次触发 429');

// 29. 不同设备不受限流影响
r = await call6('POST', '/api/demands/claim', { manage_token: d6.manage_token }, { 'x-dw-client': 'device-CL2' });
assert(r.status === 200 && (await r.json()).id === d6.id, '（claim）不同设备不受前者限流影响');

// 30. 被隐藏的需求找回返回 404
db6.tables.demands.find((x) => x.id === d6.id).hidden = true;
r = await call6('POST', '/api/demands/claim', { manage_token: d6.manage_token }, { 'x-dw-client': 'device-CL3' });
assert(r.status === 404, '（claim）被隐藏需求返回 404');

// ---- 新增：联系方式选填 / 回复 / 私信 / 回复举报 / 管理员删回复 ----
const db7 = createFakeDb();
const call7 = mkCall(application({ db: db7, BackendError: FakeError, env: makeEnv({ ADMIN_KEY: 'sk-admin-123' }) }));

// 31. 联系方式选填：不填可发布，has_contact=false；超长仍拒绝；详情不泄露 contact
r = await call7('POST', '/api/demands', { pin: '1234', category: 'study', title: '求高数笔记', description: '第三章' });
assert(r.status === 201, '（回复）不填联系方式可发布');
const d7 = await r.json();
assert(d7.contact === '' && d7.has_contact === false, '（回复）不填联系方式返回空字符串 contact，has_contact=false');
assert(db7.tables.demands.find((x) => x.id === d7.id).contact === '', '（回复）不填联系方式在库里存为空字符串（非 NULL）');
r = await call7('POST', '/api/demands', { pin: '1234', category: 'study', title: 't', description: 'd', contact: '   ' });
const dBlank = await r.json();
assert(r.status === 201 && dBlank.has_contact === false, '（回复）空白联系方式视为未填');
assert(db7.tables.demands.find((x) => x.id === dBlank.id).contact === '', '（回复）空白联系方式存为空字符串');
r = await call7('POST', '/api/demands', { pin: '1234', category: 'study', title: 't', description: 'd', contact: null });
const dNull = await r.json();
assert(r.status === 201 && db7.tables.demands.find((x) => x.id === dNull.id).contact === '', '（回复）contact=null 也存为空字符串');
r = await call7('POST', '/api/demands', { pin: '1234', category: 'study', title: 't', description: 'd', contact: 'x'.repeat(51) });
assert(r.status === 400, '（回复）联系方式超 50 字被拒绝');
r = await call7('POST', '/api/demands', { pin: '1234', category: 'study', title: 't', description: 'd', contact: 123 });
assert(r.status === 400, '（回复）联系方式非字符串被拒绝');
r = await call7('POST', '/api/demands', { pin: '1234', category: 'study', title: '有联系方式', description: 'd', contact: 'wx: r' });
const d7c = await r.json();
r = await call7('GET', `/api/demands/${d7.id}`);
let det7 = await r.json();
assert(det7.has_contact === false && !('contact' in det7), '（回复）详情返回 has_contact=false 且不含 contact');
r = await call7('GET', '/api/demands');
const l7 = await r.json();
assert(l7.find((x) => x.id === d7c.id).has_contact === true && l7.every((x) => !('contact' in x)), '（回复）列表 has_contact 正确且不含 contact');
r = await call7('POST', `/api/demands/${d7.id}/help`, undefined, { 'x-dw-client': 'dev-R0' });
assert(r.status === 400 && (await r.json()).error === 'no_contact', '（回复）无联系方式的需求 help 返回 no_contact');
assert(db7.tables.demands.find((x) => x.id === d7.id).help_count === 0, '（回复）无联系方式 help 不增加计数');
r = await call7('GET', `/api/demands/${d7.id}/contact`, undefined, { 'x-dw-client': 'dev-R0' });
assert(r.status === 400 && (await r.json()).error === 'no_contact', '（回复）无联系方式的需求 contact 返回 no_contact');

// 32. 发表公开回复 / 私信；去首尾空格
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '  我有笔记  ', is_private: false }, { 'x-dw-client': 'dev-R1' });
assert(r.status === 201, '（回复）公开回复返回 201');
const pub1 = await r.json();
assert(pub1.body === '我有笔记' && pub1.is_owner === false && pub1.is_private === false, '（回复）去首尾空格，is_owner=false');
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '私下发你', is_private: true }, { 'x-dw-client': 'dev-R1' });
assert(r.status === 201 && (await r.json()).is_private === true, '（回复）私信返回 201');

// 33. 输入校验：空、纯空白、超长、is_private 类型错误
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '   ' }, { 'x-dw-client': 'dev-R1' });
assert(r.status === 400, '（回复）空白内容被拒绝');
r = await call7('POST', `/api/demands/${d7.id}/replies`, {}, { 'x-dw-client': 'dev-R1' });
assert(r.status === 400, '（回复）缺 body 被拒绝');
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '字'.repeat(201) }, { 'x-dw-client': 'dev-R1' });
assert(r.status === 400, '（回复）超 200 字被拒绝');
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '字'.repeat(200) }, { 'x-dw-client': 'dev-R9' });
assert(r.status === 201, '（回复）恰好 200 字可发');
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: 'x', is_private: 'yes' }, { 'x-dw-client': 'dev-R1' });
assert(r.status === 400, '（回复）is_private 非布尔被拒绝');

// 34. 管理码：正确 → 发布者回复（强制公开）；错误 → 403
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '谢谢，已私信你', is_private: true }, { 'x-dw-client': 'dev-OWN', 'x-manage-token': d7.manage_token });
const own = await r.json();
assert(r.status === 201 && own.is_owner === true && own.is_private === false, '（回复）正确管理码以发布者身份公开回复');
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '冒充' }, { 'x-dw-client': 'dev-R2', 'x-manage-token': 'wrong' });
assert(r.status === 403 && (await r.json()).error === 'manage_token_invalid', '（回复）错误管理码返回 403');
r = await call7('POST', `/api/demands/${d7.id}/replies`, { body: '跨帖冒充' }, { 'x-dw-client': 'dev-R2', 'x-manage-token': d7c.manage_token });
assert(r.status === 403, '（回复）别的需求的管理码无效');

// 35. 公开列表：只含公开、正序、不含内部字段
r = await call7('GET', `/api/demands/${d7.id}/replies`);
let pubList = await r.json();
assert(r.status === 200 && pubList.length === 3, '（回复）公开列表不含私信');
assert(pubList[0].body === '我有笔记' && pubList[2].is_owner === true, '（回复）按时间正序，发布者标记正确');
assert(pubList.every((x) => !('is_private' in x) && !('hidden' in x) && !('report_count' in x)), '（回复）公开列表不返回内部字段');

// 36. 私信列表：必须正确管理码
r = await call7('GET', `/api/demands/${d7.id}/replies/private`);
assert(r.status === 403, '（回复）缺管理码看私信返回 403');
r = await call7('GET', `/api/demands/${d7.id}/replies/private`, undefined, { 'x-manage-token': 'wrong' });
assert(r.status === 403, '（回复）错误管理码看私信返回 403');
r = await call7('GET', `/api/demands/${d7.id}/replies/private`, undefined, { 'x-manage-token': d7c.manage_token });
assert(r.status === 403, '（回复）别的需求的管理码看私信返回 403');
r = await call7('GET', `/api/demands/${d7.id}/replies/private`, undefined, { 'x-manage-token': d7.manage_token });
const privList = await r.json();
assert(r.status === 200 && privList.length === 1 && privList[0].body === '私下发你', '（回复）正确管理码返回全部私信');

// 37. 不存在 / 被隐藏的需求
r = await call7('GET', '/api/demands/99999999-9999-4999-8999-999999999999/replies');
assert(r.status === 404, '（回复）不存在的需求返回 404');

// 38. 示例帖：POST 返回 400，GET 返回空数组
db7.tables.demands.push({
  id: '33333333-3333-4333-8333-333333333301', category: 'errand', title: '示例', description: '示例',
  contact: '示例', status: 'open', manage_token: '33333333-3333-4333-8333-333333333399',
  created_at: new Date().toISOString(), help_count: 0, hidden: false, is_sample: true,
});
r = await call7('POST', '/api/demands/33333333-3333-4333-8333-333333333301/replies', { body: 'hi' }, { 'x-dw-client': 'dev-S' });
assert(r.status === 400 && (await r.json()).error === 'sample_post', '（回复）示例帖回复返回 400 sample_post');
r = await call7('GET', '/api/demands/33333333-3333-4333-8333-333333333301/replies');
assert(r.status === 200 && (await r.json()).length === 0, '（回复）示例帖回复列表为空');

// 39. 限流：同设备每分钟 5 条，第 6 条 429；不同设备不受影响
let replyStatuses = [];
for (let i = 0; i < 6; i++) {
  const rr = await call7('POST', `/api/demands/${d7c.id}/replies`, { body: 'm' + i }, { 'x-dw-client': 'dev-RL' });
  replyStatuses.push(rr.status);
}
assert(replyStatuses.slice(0, 5).every((s) => s === 201), '（回复）前 5 条成功');
assert(replyStatuses[5] === 429, '（回复）每分钟第 6 条触发 429');
r = await call7('POST', `/api/demands/${d7c.id}/replies`, { body: 'ok' }, { 'x-dw-client': 'dev-RL2' });
assert(r.status === 201, '（回复）不同设备不受限流影响');

// 40. 限流：每小时 30 条（伪造时间，跳过分钟档）
{
  const realNow = Date.now;
  const base = realNow();
  const dbH = createFakeDb();
  const callH = mkCall(application({ db: dbH, BackendError: FakeError, env: makeEnv({}) }));
  const dh = await (await callH('POST', '/api/demands', { pin: '1234', category: 'study', title: 'h', description: 'h' })).json();
  const statuses = [];
  try {
    for (let i = 0; i < 31; i++) {
      Date.now = () => base + i * 61 * 1000; // 每条间隔 61 秒，分钟档始终不触发
      const rr = await callH('POST', `/api/demands/${dh.id}/replies`, { body: 'h' + i }, { 'x-dw-client': 'dev-HR' });
      statuses.push(rr.status);
    }
  } finally {
    Date.now = realNow;
  }
  assert(statuses.slice(0, 30).every((s) => s === 201), '（回复）一小时内前 30 条成功');
  assert(statuses[30] === 429, '（回复）一小时内第 31 条触发 429');
}

// 41. 举报回复：同设备只能一次，3 个设备后隐藏
const target = pubList[0].id;
r = await call7('POST', `/api/replies/${target}/report`, undefined, { 'x-dw-client': 'rep-A' });
assert(r.status === 200, '（回复举报）第一次举报 200');
r = await call7('POST', `/api/replies/${target}/report`, undefined, { 'x-dw-client': 'rep-A' });
assert(r.status === 409 && (await r.json()).error === 'already_reported', '（回复举报）同设备重复举报 409');
await call7('POST', `/api/replies/${target}/report`, undefined, { 'x-dw-client': 'rep-B' });
assert(db7.tables.replies.find((x) => x.id === target).hidden === false, '（回复举报）2 次举报不隐藏');
r = await call7('POST', `/api/replies/${target}/report`, undefined, { 'x-dw-client': 'rep-C' });
assert(r.status === 200, '（回复举报）第三个设备举报 200');
const reported = db7.tables.replies.find((x) => x.id === target);
assert(reported.report_count === 3 && reported.hidden === true, '（回复举报）report_count=3 时 hidden=true');
r = await call7('GET', `/api/demands/${d7.id}/replies`);
pubList = await r.json();
assert(pubList.length === 2 && !pubList.some((x) => x.id === target), '（回复举报）被隐藏的回复不再出现在公开列表');
r = await call7('POST', '/api/replies/99999999-9999-4999-8999-999999999999/report', undefined, { 'x-dw-client': 'rep-D' });
assert(r.status === 404, '（回复举报）不存在的回复 404');

// 42. 管理员删除回复：错误密钥 401，正确密钥删除（私信也可删）
const privId = privList[0].id;
r = await call7('DELETE', `/api/admin/replies/${privId}`, undefined, { 'x-admin-key': 'wrong' });
assert(r.status === 401, '（回复）管理员错误密钥删回复 401');
r = await call7('DELETE', `/api/admin/replies/${privId}`, undefined, { 'x-admin-key': 'sk-admin-123' });
assert(r.status === 200 && (await r.json()).ok === true, '（回复）管理员删除私信');
r = await call7('GET', `/api/demands/${d7.id}/replies/private`, undefined, { 'x-manage-token': d7.manage_token });
assert((await r.json()).length === 0, '（回复）删除后私信列表为空');
r = await call7('DELETE', `/api/admin/replies/${privId}`, undefined, { 'x-admin-key': 'sk-admin-123' });
assert(r.status === 404, '（回复）重复删除返回 404');

// ---- 新增：无外键级联，由服务端清理关联数据 ----
{
  const dbC = createFakeDb();
  const callC = mkCall(application({ db: dbC, BackendError: FakeError, env: makeEnv({ ADMIN_KEY: 'sk-admin-123' }) }));
  let mkSeq = 0; // 每次发布用不同设备令牌，避免触发「每设备 10 分钟 5 条」发布限流
  const mk = async (title) => (await (await callC('POST', '/api/demands', { pin: '1234', category: 'study', title, description: 'd' }, { 'x-dw-client': 'mk-' + (++mkSeq) })).json());
  // 给需求加 1 条公开、1 条私信，并让公开回复被举报 1 次
  const seed = async (d, tag) => {
    const pub = await (await callC('POST', `/api/demands/${d.id}/replies`, { body: 'pub' }, { 'x-dw-client': 'c-' + tag })).json();
    await callC('POST', `/api/demands/${d.id}/replies`, { body: 'priv', is_private: true }, { 'x-dw-client': 'c-' + tag });
    await callC('POST', `/api/replies/${pub.id}/report`, undefined, { 'x-dw-client': 'rep-' + tag });
    return pub;
  };
  const repliesOf = (id) => dbC.tables.replies.filter((x) => x.demand_id === id);
  const reportsOf = (ids) => dbC.tables.reply_reports.filter((x) => ids.includes(x.reply_id));

  const keep = await mk('保留');
  const keepPub = await seed(keep, 'K');

  // 43. 发帖人撤下：错误管理码不动回复；正确管理码删需求 + 回复 + 回复举报
  const dA = await mk('A');
  const pubA = await seed(dA, 'A');
  assert(repliesOf(dA.id).length === 2 && reportsOf([pubA.id]).length === 1, '（级联）准备数据：2 条回复、1 条回复举报');
  await callC('DELETE', `/api/demands/${dA.id}`, undefined, { 'x-manage-token': 'wrong' });
  assert(repliesOf(dA.id).length === 2, '（级联）错误管理码撤下不删除回复');
  r = await callC('DELETE', `/api/demands/${dA.id}`, undefined, { 'x-manage-token': dA.manage_token });
  assert(r.status === 200, '（级联）发帖人撤下返回 200');
  assert(repliesOf(dA.id).length === 0, '（级联）撤下需求同时删除其全部回复（含私信）');
  assert(reportsOf([pubA.id]).length === 0, '（级联）撤下需求同时删除其回复的举报记录');

  // 44. 管理员删除需求：同样级联
  const dB = await mk('B');
  const pubB = await seed(dB, 'B');
  r = await callC('DELETE', `/api/admin/demands/${dB.id}`, undefined, { 'x-admin-key': 'sk-admin-123' });
  assert(r.status === 200 && repliesOf(dB.id).length === 0 && reportsOf([pubB.id]).length === 0, '（级联）管理员删除需求同时删除回复与回复举报');

  // 45. 管理员删除回复：同时删除该回复的举报记录，不影响其他回复
  const dC = await mk('C');
  const pubC = await seed(dC, 'C');
  r = await callC('DELETE', `/api/admin/replies/${pubC.id}`, undefined, { 'x-admin-key': 'sk-admin-123' });
  assert(r.status === 200 && reportsOf([pubC.id]).length === 0, '（级联）管理员删除回复同时删除其举报记录');
  assert(repliesOf(dC.id).length === 1, '（级联）删除回复不影响同需求的其他回复');

  // 46. 管理员批量删示例帖：示例帖的回复与举报一并删除（直接注入示例帖的回复数据）
  const sampleId = '55555555-5555-4555-8555-555555555501';
  dbC.tables.demands.push({ id: sampleId, category: 'errand', title: 's', description: 's', contact: 's', status: 'open',
    manage_token: 'tok-sample', created_at: new Date().toISOString(), help_count: 0, hidden: false, is_sample: true });
  const sReply = '55555555-5555-4555-8555-555555555502';
  dbC.tables.replies.push({ id: sReply, demand_id: sampleId, body: 'x', is_private: false, is_owner: false, report_count: 1, hidden: false, created_at: new Date().toISOString() });
  dbC.tables.reply_reports.push({ id: '55555555-5555-4555-8555-555555555503', reply_id: sReply, device: 'x', created_at: new Date().toISOString() });
  r = await callC('DELETE', '/api/admin/samples', undefined, { 'x-admin-key': 'sk-admin-123' });
  assert(r.status === 200 && repliesOf(sampleId).length === 0 && reportsOf([sReply]).length === 0, '（级联）删除示例帖同时删除其回复与回复举报');

  // 其他需求的数据不受影响
  assert(repliesOf(keep.id).length === 2 && reportsOf([keepPub.id]).length === 1, '（级联）其他需求的回复与举报保持不变');

  // 47. 没有回复的需求也能正常撤下（线上曾在此返回 500）
  const dEmpty = await mk('无回复');
  r = await callC('DELETE', `/api/demands/${dEmpty.id}`, undefined, { 'x-manage-token': dEmpty.manage_token });
  const emptyRes = await r.json();
  assert(r.status === 200 && emptyRes.ok === true && emptyRes.id === dEmpty.id, '（级联）无回复的需求撤下返回 200 ok');

  // 48. 清理关联数据失败：只记日志，撤下/删除仍返回 ok，需求本身已删除
  const realError = console.error;
  const logged = [];
  console.error = (...args) => { logged.push(args); if (String(args[0]).startsWith('✗')) realError(...args); };
  try {
    const dF = await mk('清理失败');
    await seed(dF, 'F');
    dbC.failTables.add('replies');
    r = await callC('DELETE', `/api/demands/${dF.id}`, undefined, { 'x-manage-token': dF.manage_token });
    const fRes = await r.json();
    assert(r.status === 200 && fRes.ok === true, '（级联）清理回复失败时撤下仍返回 200 ok');
    assert(!dbC.tables.demands.some((x) => x.id === dF.id), '（级联）清理失败不影响需求本身被删除');
    assert(logged.some((a) => a[0] === 'purge_demand_children_failed'), '（级联）清理失败写 console.error 日志');

    const dG = await mk('管理员删-清理失败');
    r = await callC('DELETE', `/api/admin/demands/${dG.id}`, undefined, { 'x-admin-key': 'sk-admin-123' });
    assert(r.status === 200 && (await r.json()).ok === true, '（级联）清理失败时管理员删除需求仍返回 ok');
    dbC.failTables.delete('replies');

    const dH = await mk('删回复-清理失败');
    const pubH = await seed(dH, 'H');
    dbC.failTables.add('reply_reports');
    r = await callC('DELETE', `/api/admin/replies/${pubH.id}`, undefined, { 'x-admin-key': 'sk-admin-123' });
    assert(r.status === 200 && (await r.json()).ok === true, '（级联）清理回复举报失败时删除回复仍返回 ok');
    assert(logged.some((a) => a[0] === 'purge_reply_reports_failed'), '（级联）回复举报清理失败写日志');
    dbC.failTables.delete('reply_reports');
  } finally {
    console.error = realError;
    dbC.failTables.clear();
  }

  // 49. 模拟数据库拒绝 .in()，防止以后再用
  let inThrew = false;
  try { dbC.from('replies').delete().in('id', ['x']); } catch { inThrew = true; }
  assert(inThrew, '（级联）模拟数据库对 .in() 直接抛错');
}

// ---- 新增：4 位数字口令（发布设置 + claim-pin 认领）----
{
  const dbP = createFakeDb();
  const callP = mkCall(application({ db: dbP, BackendError: FakeError, env: makeEnv({}) }));
  let seq = 0;
  const post = (extra, dev) => callP('POST', '/api/demands', { category: 'study', title: 't', description: 'd', ...extra }, { 'x-dw-client': dev || 'pin-post-' + (++seq) });
  const claim = (id, pin, dev) => callP('POST', `/api/demands/${id}/claim-pin`, pin === undefined ? {} : { pin }, { 'x-dw-client': dev || 'pin-dev-' + (++seq) });
  const rowOf = (id) => dbP.tables.demands.find((x) => x.id === id);

  // 50. 发布：口令必填且只能是 4 位数字字符串
  for (const bad of [undefined, '', '123', '12345', 'abcd', '12a4', ' 1234', '１２３４', 1234, null]) {
    r = await post(bad === undefined ? {} : { pin: bad });
    assert(r.status === 400 && (await r.json()).error === 'invalid_pin', `（口令）发布口令格式不对被拒绝：${JSON.stringify(bad)}`);
  }
  assert(dbP.tables.demands.length === 0, '（口令）格式不对的发布不写库');

  // 51. 发布：库里只存哈希，响应不含口令/哈希；哈希 = SHA-256(id + 口令 + PIN_PEPPER)
  r = await post({ pin: '0427' });
  assert(r.status === 201, '（口令）合法口令发布返回 201');
  const dp = await r.json();
  assert(typeof dp.manage_token === 'string', '（口令）发布仍返回 manage_token 供本机「我的发布」');
  assert(!('pin' in dp) && !('pin_hash' in dp) && !('pin_fail_count' in dp), '（口令）发布响应不含口令与哈希');
  const stored = rowOf(dp.id);
  const { createHash } = await import('node:crypto');
  assert(stored.pin_hash === createHash('sha256').update(dp.id + '0427' + 'test-pepper').digest('hex'), '（口令）pin_hash = SHA-256(id + 口令 + PIN_PEPPER)');
  assert(!JSON.stringify(stored).includes('"0427"'), '（口令）库里不存明文口令');
  assert(stored.pin_fail_count === 0 && stored.pin_locked_until === null, '（口令）新帖失败次数 0、未锁定');
  r = await callP('GET', `/api/demands/${dp.id}`);
  const dpDetail = await r.json();
  assert(!('pin_hash' in dpDetail) && !('manage_token' in dpDetail), '（口令）详情不返回 pin_hash / manage_token');
  r = await callP('GET', '/api/demands');
  assert((await r.json()).every((x) => !('pin_hash' in x) && !('pin_fail_count' in x) && !('pin_locked_until' in x)), '（口令）列表不返回口令相关字段');

  // 52. 认领：口令正确返回 manage_token
  r = await claim(dp.id, '0427');
  const okClaim = await r.json();
  assert(r.status === 200 && okClaim.id === dp.id && okClaim.manage_token === dp.manage_token, '（口令）口令正确返回 id 与 manage_token');
  assert(!('pin_hash' in okClaim), '（口令）认领响应不含 pin_hash');

  // 53. 认领：格式不对 400，不计失败次数
  for (const bad of [undefined, '12', '12345', 'abcd', 1234]) {
    r = await claim(dp.id, bad);
    assert(r.status === 400 && (await r.json()).error === 'invalid_pin', `（口令）认领口令格式不对 400：${JSON.stringify(bad)}`);
  }
  assert(rowOf(dp.id).pin_fail_count === 0, '（口令）格式不对不计入失败次数');

  // 54. 认领：错误口令 403 并累计；成功后清零
  r = await claim(dp.id, '1111');
  assert(r.status === 403 && (await r.json()).error === 'pin_invalid', '（口令）口令错误返回 403 pin_invalid');
  assert(rowOf(dp.id).pin_fail_count === 1, '（口令）错误一次 pin_fail_count=1');
  await claim(dp.id, '2222');
  assert(rowOf(dp.id).pin_fail_count === 2, '（口令）错误两次 pin_fail_count=2');
  r = await claim(dp.id, '0427');
  assert(r.status === 200 && rowOf(dp.id).pin_fail_count === 0, '（口令）认领成功后失败次数清零');

  // 55. 锁定：累计错 5 次锁 1 小时，锁定期间正确口令也 429；到期后可认领
  const realNow = Date.now;
  const base = realNow();
  try {
    Date.now = () => base;
    const st = [];
    for (let i = 0; i < 5; i++) st.push((await claim(dp.id, '9' + String(i).repeat(3))).status);
    assert(st.slice(0, 4).every((x) => x === 403), '（口令）前 4 次错误返回 403');
    assert(st[4] === 429, '（口令）第 5 次错误返回 429');
    const locked = rowOf(dp.id);
    assert(locked.pin_fail_count === 5 && Date.parse(locked.pin_locked_until) === base + 3600 * 1000, '（口令）错 5 次后 pin_locked_until = 1 小时后');
    r = await claim(dp.id, '0427');
    assert(r.status === 429 && (await r.json()).error === 'pin_locked', '（口令）锁定期间正确口令也返回 429 pin_locked');
    r = await claim(dp.id, '1234');
    assert(r.status === 429 && rowOf(dp.id).pin_fail_count === 5, '（口令）锁定期间的尝试不再计数');
    Date.now = () => base + 59 * 60 * 1000;
    r = await claim(dp.id, '0427');
    assert(r.status === 429, '（口令）59 分钟时仍锁定');
    // 到期后再错一次：累计未清零，立即重新锁 1 小时
    Date.now = () => base + 61 * 60 * 1000;
    r = await claim(dp.id, '5555');
    assert(r.status === 429 && Date.parse(rowOf(dp.id).pin_locked_until) === base + 121 * 60 * 1000, '（口令）锁定到期后再错一次立即重新锁定');
    Date.now = () => base + 122 * 60 * 1000;
    r = await claim(dp.id, '0427');
    assert(r.status === 200 && (await r.json()).manage_token === dp.manage_token, '（口令）锁定到期后口令正确可认领');
    const cleared = rowOf(dp.id);
    assert(cleared.pin_fail_count === 0 && cleared.pin_locked_until === null, '（口令）认领成功后清零并解除锁定');
  } finally {
    Date.now = realNow;
  }

  // 56. 锁定按需求：另一条需求不受影响
  const dp2 = await (await post({ pin: '8888' })).json();
  for (let i = 0; i < 5; i++) await claim(dp.id, '0000');
  r = await claim(dp2.id, '8888');
  assert(r.status === 200, '（口令）一条需求被锁不影响其他需求');
  rowOf(dp.id).pin_locked_until = null; rowOf(dp.id).pin_fail_count = 0;

  // 57. 并发：多个请求读到同一计数时只有一个能占用尝试，其余 429
  {
    const results = await Promise.all(['1000', '1001', '1002', '1003', '1004', '1005'].map((p) => claim(dp.id, p)));
    const codes = results.map((x) => x.status);
    const verdicts = codes.filter((c) => c === 403).length;
    assert(codes.every((c) => c === 403 || c === 429), '（口令）并发错误口令只返回 403 或 429');
    assert(verdicts >= 1 && verdicts === rowOf(dp.id).pin_fail_count, '（口令）并发时每个口令判定都对应一次已计数的尝试');
    rowOf(dp.id).pin_locked_until = null; rowOf(dp.id).pin_fail_count = 0;
  }

  // 58. 旧帖没有口令：409 pin_not_set，且不计数
  const legacyId = '66666666-6666-4666-8666-666666666601';
  dbP.tables.demands.push({ id: legacyId, category: 'study', title: '旧帖', description: 'd', contact: '', status: 'open',
    manage_token: 'legacy-token', created_at: new Date().toISOString(), help_count: 0, hidden: false, is_sample: false });
  r = await claim(legacyId, '1234');
  assert(r.status === 409 && (await r.json()).error === 'pin_not_set', '（口令）旧帖没有口令返回 409 pin_not_set');
  assert(!('pin_fail_count' in rowOf(legacyId)) || !rowOf(legacyId).pin_fail_count, '（口令）旧帖认领不写失败次数');
  r = await callP('POST', '/api/demands/claim', { manage_token: 'legacy-token' }, { 'x-dw-client': 'legacy-dev' });
  assert(r.status === 200 && (await r.json()).id === legacyId, '（口令）旧帖仍可用管理码找回');

  // 59. 不存在 / 被隐藏 / 示例帖
  r = await claim('99999999-9999-4999-8999-999999999999', '1234');
  assert(r.status === 404, '（口令）不存在的需求返回 404');
  rowOf(dp2.id).hidden = true;
  r = await claim(dp2.id, '8888');
  assert(r.status === 404, '（口令）被隐藏的需求返回 404');
  dbP.tables.demands.push({ id: '66666666-6666-4666-8666-666666666602', category: 'errand', title: 's', description: 's', contact: 's',
    status: 'open', manage_token: 'sample-token', created_at: new Date().toISOString(), help_count: 0, hidden: false, is_sample: true });
  r = await claim('66666666-6666-4666-8666-666666666602', '1234');
  assert(r.status === 400 && (await r.json()).error === 'sample_post', '（口令）示例帖返回 400 sample_post');

  // 60. 按设备限流：同设备每分钟 10 次（含错误），第 11 次 429；换设备不受影响
  const dp3 = await (await post({ pin: '4321' })).json();
  const devSt = [];
  for (let i = 0; i < 11; i++) {
    devSt.push((await claim(i % 2 ? dp3.id : legacyId, i % 2 ? '4321' : '0000', 'pin-rl')).status);
  }
  assert(devSt.slice(0, 10).every((x) => x !== 429), '（口令）同设备前 10 次不被设备限流');
  assert(devSt[10] === 429, '（口令）同设备第 11 次触发 429');
  r = await claim(dp3.id, '4321', 'pin-rl-2');
  assert(r.status === 200, '（口令）不同设备不受前者限流影响');

  // 61. 未配置 PIN_PEPPER：发布与认领都 503，不写入无密钥哈希
  const dbN = createFakeDb();
  const callN = mkCall(application({ db: dbN, BackendError: FakeError, env: makeEnv({ PIN_PEPPER: undefined }) }));
  r = await callN('POST', '/api/demands', { category: 'study', title: 't', description: 'd', pin: '1234' });
  assert(r.status === 503 && (await r.json()).error === 'pin_not_configured', '（口令）未配置 PIN_PEPPER 发布返回 503');
  assert(dbN.tables.demands.length === 0, '（口令）未配置 PIN_PEPPER 不写库');
  r = await callN('POST', `/api/demands/${dp.id}/claim-pin`, { pin: '1234' });
  assert(r.status === 503, '（口令）未配置 PIN_PEPPER 认领返回 503');

  // 62. 换了 PIN_PEPPER，旧哈希对不上（密钥确实参与哈希）
  const callQ = mkCall(application({ db: dbP, BackendError: FakeError, env: makeEnv({ PIN_PEPPER: 'other-pepper' }) }));
  r = await callQ('POST', `/api/demands/${dp3.id}/claim-pin`, { pin: '4321' }, { 'x-dw-client': 'pepper-dev' });
  assert(r.status === 403, '（口令）PIN_PEPPER 不同则正确口令也无法认领');
}

// ---- 描述选填 ----
{
  const dbD = createFakeDb();
  const callD = mkCall(application({ db: dbD, BackendError: FakeError, env: makeEnv() }));
  let seqD = 0;
  const postD = (extra) => callD('POST', '/api/demands', { pin: '1234', category: 'study', title: '求自习搭子', ...extra }, { 'x-dw-client': 'desc-opt-' + (++seqD) });
  const stored = (id) => dbD.tables.demands.find((x) => x.id === id);

  // 63. 不传描述可发布，存为空字符串（非 NULL）
  r = await postD({});
  assert(r.status === 201, '（描述）不传 description 可发布');
  const dd1 = await r.json();
  assert(dd1.description === '' && stored(dd1.id).description === '', '（描述）不传 description 存为空字符串');
  r = await callD('GET', `/api/demands/${dd1.id}`);
  assert(r.status === 200 && (await r.json()).description === '', '（描述）详情返回空描述');

  // 64. 空字符串 / 空白 / null 都视为未填
  for (const [v, label] of [['', '空字符串'], ['   ', '空白'], [null, 'null']]) {
    r = await postD({ description: v });
    const x = await r.json();
    assert(r.status === 201 && stored(x.id).description === '', `（描述）${label}描述可发布并存为空字符串`);
  }

  // 65. 有内容仍去首尾空格、限 500 字、必须是字符串；标题仍必填
  r = await postD({ description: '  图书馆三楼  ' });
  assert(r.status === 201 && (await r.json()).description === '图书馆三楼', '（描述）有内容时去首尾空格');
  r = await postD({ description: 'x'.repeat(500) });
  assert(r.status === 201, '（描述）500 字可发布');
  r = await postD({ description: 'x'.repeat(501) });
  assert(r.status === 400, '（描述）超 500 字被拒绝');
  r = await postD({ description: 123 });
  assert(r.status === 400, '（描述）非字符串被拒绝');
  r = await postD({ title: '   ' });
  assert(r.status === 400, '（描述）不填描述时空白标题仍被拒绝');
  r = await postD({ title: undefined });
  assert(r.status === 400, '（描述）缺标题仍被拒绝');
}

console.log(`\n通过 ${passed} 项断言${process.exitCode ? '（存在失败）' : ''}`);
