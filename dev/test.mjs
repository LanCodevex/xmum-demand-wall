// 本地逻辑校验：注入内存假 DB，跑通接口的业务规则。
// 仅验证路由逻辑，不代表云端数据库/权限/入口隔离已验收。用 Node 运行：node dev/test.mjs
import { application } from '../functions/routes.mjs';

class FakeError extends Error {
  constructor(code, status) { super(code); this.code = code; this.status = status; }
}

// 多表内存假 DB：支持 demands / reports，支持 eq / in / order / limit / insert / update / delete。
function createFakeDb() {
  const tables = { demands: [], reports: [] };
  return {
    tables,
    from(table) {
      if (!(table in tables)) throw new FakeError('invalid_table', 400);
      const rows_ = tables[table];
      const filters = []; let order = null; let mode = 'read'; let values; let limit = 1000; let cols = '*';
      const match = (row) => filters.every((f) => (f.op === 'in' ? f.val.includes(row[f.key]) : row[f.key] === f.val));
      const pick = (row) => (cols === '*' ? { ...row } : Object.fromEntries(cols.split(',').map((k) => [k, row[k]])));
      const q = {
        select(c) { cols = c; return q; },
        eq(k, v) { filters.push({ op: 'eq', key: k, val: v }); return q; },
        in(k, arr) { filters.push({ op: 'in', key: k, val: arr }); return q; },
        order(k, opts) { order = [k, opts && opts.ascending === false ? 'desc' : 'asc']; return q; },
        limit(n) { limit = n; return q; },
        insert(v) { mode = 'insert'; values = v; return q; },
        update(v) { mode = 'update'; values = v; return q; },
        delete() { mode = 'delete'; return q; },
        then(resolve) {
          return Promise.resolve().then(() => {
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
function makeEnv(obj) {
  return { get: (k) => (k in obj ? obj[k] : null) };
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
const handle = application({ db, BackendError: FakeError });
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
r = await call('POST', '/api/demands', { category: 'group_buy', title: '  拼奶茶  ', description: '  一起拼奶茶  ', contact: '  wx: abc  ' });
assert(r.status === 201, '发布返回 201');
const created = await r.json();
assert(created.title === '拼奶茶', '标题去首尾空格');
assert(typeof created.manage_token === 'string' && created.manage_token.length === 36, '返回 manage_token');
assert(created.status === 'open', '默认状态 open');
assert(created.help_count === 0, '发布返回 help_count=0');

r = await call('POST', '/api/demands', { category: 'nope', title: 'x', description: 'y', contact: 'z' });
assert(r.status === 400, '非法分类被拒绝');

r = await call('POST', '/api/demands', { category: 'currency', title: 'x', description: 'y', contact: 'z' });
assert(r.status === 400, '换汇分类被拒绝');

r = await call('POST', '/api/demands', { category: 'study', title: 'x'.repeat(41), description: 'y', contact: 'z' });
assert(r.status === 400, '标题超长被拒绝');

r = await call('POST', '/api/demands', { category: 'study', title: '   ', description: 'y', contact: 'z' });
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
await call('POST', '/api/demands', { category: 'carpool', title: '拼车去机场', description: '明天上午', contact: 'wx2' });
r = await call('GET', '/api/demands');
const list2 = await r.json();
assert(list2.length === 1 && list2[0].title === '拼车去机场', '撤下的记录不再出现在列表，最新在前');

// ---- 防刷：使用独立的 application 实例（独立内存桶），同一来源令牌 ----
const db2 = createFakeDb();
const call2 = mkCall(application({ db: db2, BackendError: FakeError }));
const SRC = { 'x-dw-client': 'test-device-1' };

// 11. 发布：同一来源 10 分钟内第 6 条被限流
let postStatuses = [];
for (let i = 0; i < 6; i++) {
  const rr = await call2('POST', '/api/demands', { category: 'study', title: 'T' + i, description: 'D' + i, contact: 'C' + i }, SRC);
  postStatuses.push(rr.status);
}
assert(postStatuses.slice(0, 5).every((s) => s === 201), '前 5 条发布成功');
assert(postStatuses[5] === 429, '第 6 条发布触发 429');
const rl = await (await call2('POST', '/api/demands', { category: 'study', title: 'T6', description: 'D6', contact: 'C6' }, SRC)).json();
assert(rl.error === 'rate_limited', '限流返回 rate_limited');

// 12. 发布：不同来源互不影响
const rr2 = await call2('POST', '/api/demands', { category: 'study', title: 'other', description: 'd', contact: 'c' }, { 'x-dw-client': 'test-device-2' });
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
r = await call3('POST', '/api/demands', { category: 'study', title: '求期末复习资料', description: '数学', contact: 'wx: help' });
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
const call4 = mkCall(application({ db: db4, BackendError: FakeError }));
r = await call4('GET', '/api/admin/reports', undefined, { 'x-admin-key': 'anything' });
assert(r.status === 503, '未配置 ADMIN_KEY 返回 503');

// ---- 新增：示例帖 / 组队分类 / 管理员批量删示例 ----
const db5 = createFakeDb();
const call5 = mkCall(application({ db: db5, BackendError: FakeError, env: makeEnv({ ADMIN_KEY: 'sk-admin-123' }) }));

// 21. 组队分类可发布，新帖 is_sample=false
r = await call5('POST', '/api/demands', { category: 'team', title: '统计学习组队 3=2', description: '还差 1 人', contact: 'wx: team' });
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
const call6 = mkCall(application({ db: db6, BackendError: FakeError }));

// 25. 发布一条用于找回
r = await call6('POST', '/api/demands', { category: 'study', title: '求自习搭子', description: '图书馆', contact: 'wx: claim' });
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

console.log(`\n通过 ${passed} 项断言${process.exitCode ? '（存在失败）' : ''}`);
