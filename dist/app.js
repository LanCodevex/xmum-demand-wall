'use strict';

/* ================= 文案（中/英双语，集中管理） ================= */
const I18N = {
  zh: {
    appTitle: 'XMUM 需求墙',
    docTitle: 'XMUM 校园需求墙',
    headerMy: '我的发布',
    headerPublish: '发布需求',
    searchPlaceholder: '搜课程代码、楼栋、拼车…',
    tabAll: '全部',
    categories: {
      team: '组队',
      group_buy: '拼单',
      study: '学习资料',
      carpool: '拼车',
      housing: '住宿',
      secondhand: '二手',
      errand: '代办',
    },
    status: { open: '进行中', taken: '已接单', done: '已完成' },
    heroOpen: (n) => `${n} 位同学`,
    heroNeed: () => '正在找人帮忙',
    heroDone: (n) => `已经帮成 ${n} 单`,
    heroLaunch1: '需求墙刚上线',
    heroLaunch2: '下面是示例，来发第一条真实需求吧',
    brandWall: '需求墙',
    glassSub: (n) => `${n} 位同学正在找人帮忙`,
    introSub: '厦马同学的需求墙',
    timeJustNow: '刚刚',
    timeMinutesAgo: (n) => `${n} 分钟前`,
    timeHoursAgo: (n) => `${n} 小时前`,
    timeDaysAgo: (n) => `${n} 天前`,
    emptyNone: '还没有人发这类需求',
    loadError: '加载失败',
    retry: '重试',
    footer: '有需求就发，能帮就帮一把',
    detailTitle: '需求详情',
    close: '关闭',
    viewContact: '我能帮，看联系方式',
    helpCount: (n) => `${n} 位同学说能帮`,
    sampleTag: '示例',
    sampleNote: '这是一条示例，展示需求墙的用法。有真实需求的话，发一条试试？',
    contactLoading: '正在获取联系方式…',
    contactLabel: '联系方式',
    contactSafety: '交易前当面确认，别提前转账',
    copy: '复制',
    copied: '已复制',
    contactFailed: '获取联系方式失败，请稍后重试。',
    publishTitle: '发布需求',
    formHint: '本站不提供换汇撮合，换汇请走银行等正规渠道',
    formCategory: '分类',
    formTitle: '标题',
    formTitlePlaceholder: '一句话说明你的需求',
    formDescription: '描述',
    formDescriptionPlaceholder: '补充时间、地点、数量等细节',
    formDescriptionPlaceholderTeam: '比赛或课程名称、还差几人、你能做什么',
    formContact: '联系方式',
    formContactPlaceholder: '微信号或其他联系方式',
    formSubmit: '发布需求',
    formCancel: '取消',
    charCount: (n, max) => `${n}/${max}`,
    requiredCategory: '请选择一个分类',
    requiredField: '请填写完整内容',
    successTitle: '已发布',
    successHint: '请保存下面的管理码，用于以后修改需求状态。已自动保存到本机「我的发布」。',
    manageCode: '管理码',
    copyCode: '复制管理码',
    codeRestoreHint: '换手机时用它找回',
    done: '完成',
    mineTitle: '我的发布',
    mineEmpty: '本机还没有发布记录。发布需求后会自动出现在这里。',
    mineHint: '本机发布的需求会显示在这里；换了设备可以用管理码找回。',
    claimEntry: '用管理码找回',
    claimLabel: '管理码',
    claimPlaceholder: '粘贴发布时保存的管理码',
    claimSubmit: '找回',
    claimCancel: '取消',
    claimEmpty: '请输入管理码',
    claimWrong: '管理码不正确，找不到对应需求。',
    claimDone: '已找回，加入本机「我的发布」',
    markTaken: '标记为已接单',
    markDone: '标记为已完成',
    statusUpdated: '状态已更新',
    takeDown: '撤下',
    confirmTitle: '撤下需求',
    confirmRemoveBody: (title) => `确定撤下「${title}」吗？撤下后无法恢复。`,
    confirmYes: '确认撤下',
    confirmNo: '取消',
    removeDone: '已撤下',
    errNetwork: '网络异常，请稍后重试。',
    errInvalidInput: '请检查输入内容（标题≤40字、描述≤500字、联系方式≤50字）。',
    errManageToken: '管理码不正确，无法操作该需求。',
    errRateLimited: '操作太频繁，请稍后再试。',
    errGeneric: '操作失败，请稍后重试。',
    errNotFound: '该需求已不存在。',
    errBlocked: '请求被拦截（403），请改用系统浏览器打开本站后重试。',
    errCodeSuffix: (c) => `（错误码：${c}）`,
    shareBtn: '复制分享文案',
    shareCopied: '已复制，去微信群粘贴吧',
    deepLinkMissing: '这条需求已撤下或不存在',
    shareAppName: 'XMUM 需求墙',
    shareStatusPrefix: '状态：',
    shareCta: '👉 查看详情和联系方式：',
    manualCopyTitle: '手动复制',
    manualCopyHint: '自动复制失败，请长按或全选下方文案后复制：',
    manualCopySelect: '全选',
    openOnly: '只看进行中',
    overdue: '可能已过期',
    report: '举报',
    reportTitle: '举报该需求',
    reportHint: '请选择举报原因',
    reportReasons: { fake: '虚假信息', illegal: '违规内容', ad: '广告骚扰', other: '其他' },
    reportSubmit: '提交举报',
    reportDone: '已收到举报，感谢反馈',
    reportAlready: '你已经举报过这条需求',
    reportFailed: '举报失败，请稍后重试',
    adminTitle: '需求墙管理',
    adminExit: '返回首页',
    adminKeyLabel: '管理密钥（ADMIN_KEY）',
    adminKeyPlaceholder: '输入管理密钥',
    adminLogin: '进入管理',
    adminWrong: '密钥不正确',
    adminNotConfigured: '尚未配置 ADMIN_KEY，请先在站点设置中配置',
    adminEmpty: '暂无举报',
    adminReported: (n) => `被举报 ${n} 次`,
    adminReason: '原因',
    adminHidden: '已隐藏',
    adminDelete: '删除',
    adminDeleteSamples: '删除全部示例帖',
    adminDeleteSamplesConfirm: '将删除所有标记为「示例」的帖子，真实帖不受影响。确定删除？',
    adminDeleteSamplesDone: (n) => `已删除 ${n} 条示例帖`,
    adminRestore: '恢复显示',
    adminDeleted: '已删除',
    adminRestored: '已恢复显示',
    adminDemandMissing: '该需求已不存在',
    adminLoadError: '加载举报列表失败',
  },
  en: {
    appTitle: 'XMUM Demand Wall',
    docTitle: 'XMUM Demand Wall',
    headerMy: 'My Posts',
    headerPublish: 'Post',
    searchPlaceholder: 'Search course codes, buildings, carpool…',
    tabAll: 'All',
    categories: {
      team: 'Team Up',
      group_buy: 'Group Buy',
      study: 'Study',
      carpool: 'Carpool',
      housing: 'Housing',
      secondhand: 'Secondhand',
      errand: 'Errand',
    },
    status: { open: 'Open', taken: 'Taken', done: 'Done' },
    heroOpen: (n) => `${n} student${n === 1 ? '' : 's'}`,
    heroNeed: (n) => (n === 1 ? 'needs a hand' : 'need a hand'),
    heroDone: (n) => `${n} matched so far`,
    heroLaunch1: 'Just launched',
    heroLaunch2: 'These are samples. Be the first to post',
    brandWall: 'Demand Wall',
    glassSub: (n) => `${n} student${n === 1 ? '' : 's'} need${n === 1 ? 's' : ''} a hand`,
    introSub: 'Campus needs, one wall',
    timeJustNow: 'just now',
    timeMinutesAgo: (n) => `${n} min ago`,
    timeHoursAgo: (n) => `${n} h ago`,
    timeDaysAgo: (n) => `${n} d ago`,
    emptyNone: 'No one has posted this kind of demand yet',
    loadError: 'Failed to load',
    retry: 'Retry',
    footer: 'Post what you need. Help where you can.',
    detailTitle: 'Demand details',
    close: 'Close',
    viewContact: 'I can help',
    helpCount: (n) => `${n} can help`,
    sampleTag: 'Sample',
    sampleNote: 'This is a sample post showing how the wall works. Got a real need? Try posting one.',
    contactLoading: 'Loading contact…',
    contactLabel: 'Contact',
    contactSafety: 'Meet in person first. Don’t pay in advance.',
    copy: 'Copy',
    copied: 'Copied',
    contactFailed: 'Could not load contact. Please try again later.',
    publishTitle: 'Post a demand',
    formHint: 'We don’t host currency exchange. Please use banks or licensed channels.',
    formCategory: 'Category',
    formTitle: 'Title',
    formTitlePlaceholder: 'One line describing your demand',
    formDescription: 'Description',
    formDescriptionPlaceholder: 'Add time, place, quantity and details',
    formDescriptionPlaceholderTeam: 'Contest or course name, how many more people you need, what you can do',
    formContact: 'Contact',
    formContactPlaceholder: 'WeChat ID or other contact',
    formSubmit: 'Post',
    formCancel: 'Cancel',
    charCount: (n, max) => `${n}/${max}`,
    requiredCategory: 'Please choose a category',
    requiredField: 'Please fill in all fields',
    successTitle: 'Published',
    successHint: 'Save the management code below to change this demand’s status later. It was saved to “My Posts” on this device.',
    manageCode: 'Management code',
    copyCode: 'Copy code',
    codeRestoreHint: 'Use it to restore on a new phone',
    done: 'Done',
    mineTitle: 'My Posts',
    mineEmpty: 'No posts on this device yet. Your published demands will appear here.',
    mineHint: 'Posts from this device appear here. On a new device, restore them with your management code.',
    claimEntry: 'Restore with code',
    claimLabel: 'Management code',
    claimPlaceholder: 'Paste the code saved when posting',
    claimSubmit: 'Restore',
    claimCancel: 'Cancel',
    claimEmpty: 'Enter the management code',
    claimWrong: 'Incorrect code; no matching demand.',
    claimDone: 'Restored to “My Posts” on this device',
    markTaken: 'Mark as taken',
    markDone: 'Mark as done',
    statusUpdated: 'Status updated',
    takeDown: 'Remove',
    confirmTitle: 'Remove demand',
    confirmRemoveBody: (title) => `Remove “${title}”? This cannot be undone.`,
    confirmYes: 'Remove',
    confirmNo: 'Cancel',
    removeDone: 'Removed',
    errNetwork: 'Network error. Please try again later.',
    errInvalidInput: 'Please check input (title ≤40, description ≤500, contact ≤50).',
    errManageToken: 'Incorrect management code; cannot modify this demand.',
    errRateLimited: 'Too many operations. Please try again later.',
    errGeneric: 'Operation failed. Please try again later.',
    errNotFound: 'This demand no longer exists.',
    errBlocked: 'Request blocked (403). Please open this site in a system browser and retry.',
    errCodeSuffix: (c) => ` (code: ${c})`,
    shareBtn: 'Copy share text',
    shareCopied: 'Copied. Paste it in your group chat.',
    deepLinkMissing: 'This demand has been removed or does not exist',
    shareAppName: 'XMUM Demand Wall',
    shareStatusPrefix: 'Status: ',
    shareCta: '👉 View details and contact: ',
    manualCopyTitle: 'Copy manually',
    manualCopyHint: 'Automatic copy failed. Long-press or select all the text below, then copy:',
    manualCopySelect: 'Select all',
    openOnly: 'Open only',
    langNote: 'Posts are shown in the language they were written in.',
    overdue: 'May be outdated',
    report: 'Report',
    reportTitle: 'Report this demand',
    reportHint: 'Choose a reason',
    reportReasons: { fake: 'False information', illegal: 'Inappropriate content', ad: 'Spam', other: 'Other' },
    reportSubmit: 'Submit report',
    reportDone: 'Report received. Thanks for the feedback.',
    reportAlready: 'You already reported this demand',
    reportFailed: 'Could not report. Please try again later.',
    adminTitle: 'Demand Wall Admin',
    adminExit: 'Back to site',
    adminKeyLabel: 'Admin key (ADMIN_KEY)',
    adminKeyPlaceholder: 'Enter admin key',
    adminLogin: 'Enter admin',
    adminWrong: 'Incorrect key',
    adminNotConfigured: 'ADMIN_KEY is not configured yet. Set it in site settings.',
    adminEmpty: 'No reports yet',
    adminReported: (n) => `reported ${n} times`,
    adminReason: 'Reasons',
    adminHidden: 'Hidden',
    adminDelete: 'Delete',
    adminDeleteSamples: 'Delete all sample posts',
    adminDeleteSamplesConfirm: 'This removes every post marked as sample. Real posts are not affected. Delete them?',
    adminDeleteSamplesDone: (n) => `Removed ${n} sample post(s)`,
    adminRestore: 'Restore',
    adminDeleted: 'Deleted',
    adminRestored: 'Restored',
    adminDemandMissing: 'This demand no longer exists',
    adminLoadError: 'Failed to load reports',
  },
};

const LANG_KEY = 'xmum_demand_wall_lang';
function detectLang() {
  try { const s = localStorage.getItem(LANG_KEY); if (s === 'zh' || s === 'en') return s; } catch { /* 忽略 */ }
  return (navigator.language || 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en';
}
let lang = 'zh';
let COPY = I18N.zh; // 渲染函数在调用时读取当前语言包；切换语言时整体重赋值

/* ================= 分类印章（40×40、单个汉字，颜色按设计规格） ================= */
const CATEGORIES = {
  team:       { key: 'team',       char: '组', bg: '#E8ECF6', fg: '#2B3F73' },
  group_buy: { key: 'group_buy', char: '拼', bg: '#F4E9E9', fg: '#7A2E2E' },
  study:      { key: 'study',      char: '学', bg: '#ECE8F4', fg: '#4B3A78' },
  carpool:    { key: 'carpool',    char: '车', bg: '#E3F0EC', fg: '#1D5E52' },
  housing:    { key: 'housing',    char: '住', bg: '#F2EDE4', fg: '#6B4E21' },
  secondhand: { key: 'secondhand', char: '二', bg: '#ECEEF1', fg: '#3E4C59' },
  errand:     { key: 'errand',     char: '代', bg: '#E8F1E1', fg: '#3F5F1F' },
};
const CATEGORY_KEYS = Object.keys(CATEGORIES);

const API = '/functions/v1/app';
const MINE_KEY = 'xmum_demand_wall_mine';
const CLIENT_KEY = 'xmum_demand_wall_client';
const CLIENT_HEADER = 'x-dw-client'; // 匿名设备令牌，作为服务端防刷的「来源」主键
const LIMITS = { title: 40, description: 500, contact: 50 };
const OPEN_ONLY_KEY = 'xmum_demand_wall_open_only';
const HELPED_KEY = 'xmum_demand_wall_helped'; // 本机「我能帮」过的需求，用于同设备去重
const REPORTED_KEY = 'xmum_demand_wall_reported'; // 本机举报过的需求，用于同设备去重
const DAY_MS = 86400000;
const OVERDUE_DAYS = 7, CARPOOL_OVERDUE_DAYS = 2; // 拼车时效强，过期阈值更短

/* ================= 状态 ================= */
const state = {
  demands: [],
  category: 'all',
  search: '',
  openOnly: false, // 「只看进行中」开关，持久化在 LocalStorage
  activeId: null,
  activeContact: null,
  activeData: null, // 供切换语言时重建详情
  lastToken: null, // 供切换语言时重建成功弹窗
  lastShareDemand: null, // 成功弹窗的分享文案在切换语言时重建
  loaded: false, // 首次加载完成前，hero 数字显示灰色占位块
  adminKey: null, // 管理页输入的 ADMIN_KEY（仅存内存）
  reportDemand: null, // 当前举报目标需求
};

/* 撕角动画标记：发布者把状态改成已接单后，回到列表时该条撕角翻折出现 */
const tearAnimateIds = new Set();
let feedDirty = false; // 我的发布里有状态变更，关闭弹窗时刷新信息流

/* ================= 内联 SVG（不用 emoji） ================= */
const SVG_EMPTY = '<svg viewBox="0 0 120 96" width="120" height="96" role="img" aria-hidden="true">'
  + '<rect x="16" y="24" width="70" height="54" rx="8" fill="none" stroke="currentColor" stroke-width="3"></rect>'
  + '<path d="M30 42h42M30 55h34M30 68h26" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>'
  + '<circle cx="90" cy="66" r="20" fill="#FFFFFF" stroke="currentColor" stroke-width="3"></circle>'
  + '<line x1="104" y1="80" x2="114" y2="90" stroke="currentColor" stroke-width="4" stroke-linecap="round"></line>'
  + '</svg>';
const SVG_ERR = '<svg viewBox="0 0 48 48" width="44" height="44" role="img" aria-hidden="true">'
  + '<circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="3"></circle>'
  + '<line x1="24" y1="14" x2="24" y2="27" stroke="currentColor" stroke-width="3" stroke-linecap="round"></line>'
  + '<circle cx="24" cy="34" r="1.8" fill="currentColor"></circle>'
  + '</svg>';
const SVG_INBOX = '<svg viewBox="0 0 48 48" width="44" height="44" role="img" aria-hidden="true">'
  + '<path d="M6 26h11l3 6h8l3-6h11" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>'
  + '<path d="M8 24V14a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v10" fill="none" stroke="currentColor" stroke-width="3"></path>'
  + '<path d="M8 38h32" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>'
  + '</svg>';
const SVG_CHECK = '<svg viewBox="0 0 24 24" width="26" height="26" role="img" aria-hidden="true">'
  + '<polyline points="4.5 12.5 9.5 17.5 19.5 6.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></polyline>'
  + '</svg>';

/* ================= XMUM 字形（Anton 字体轮廓，SIL Open Font License 1.1） ================= */
const GLYPHS = {
  viewBox: '-60 -1840 5137 1920',
  vb: { x: -60, y: -1840, w: 5137, h: 1920 },
  focus: { x: 495, y: -880 }, // 镜头拉远的 transform-origin（X 交叉点，SVG 坐标）
  letters: [
    { ch: 'X', x: 0, d: 'M27 0 216 933 66 1761H410L501 1156L582 1761H927L777 933L965 0H609L498 688L384 0Z',
      anchors: [[27,0],[216,933],[66,1761],[410,1761],[501,1156],[582,1761],[927,1761],[777,933],[965,0],[609,0],[498,688],[384,0]] },
    { ch: 'M', x: 991, d: 'M78 0V1760H614L762 687L909 1760H1450V0H1128V1268L926 0H610L396 1268V0Z',
      anchors: [[78,0],[78,1760],[614,1760],[762,687],[909,1760],[1450,1760],[1450,0],[1128,0],[1128,1268],[926,0],[610,0],[396,1268],[396,0]] },
    { ch: 'U', x: 2519, d: 'M485 -16Q265 -16 161.0 107.5Q57 231 57 471V1760H399V485Q399 441 404.0 400.5Q409 360 427.0 334.0Q445 308 485 308Q526 308 544.0 333.5Q562 359 566.5 400.0Q571 441 571 485V1760H913V471Q913 231 809.0 107.5Q705 -16 485 -16Z',
      anchors: [[485,-16],[57,471],[57,1760],[399,1760],[399,485],[485,308],[571,485],[571,1760],[913,1760],[913,471],[485,-16]] },
    { ch: 'M', x: 3489, d: 'M78 0V1760H614L762 687L909 1760H1450V0H1128V1268L926 0H610L396 1268V0Z',
      anchors: [[78,0],[78,1760],[614,1760],[762,687],[909,1760],[1450,1760],[1450,0],[1128,0],[1128,1268],[926,0],[610,0],[396,1268],[396,0]] },
  ],
};

/* ================= 工具 ================= */
const $ = (sel, root = document) => root.querySelector(sel);

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

// 本机匿名来源令牌：首次生成后存 LocalStorage，作为服务端限流的来源主键（可被清除后重置，属尽力而为）。
function clientToken() {
  let t; try { t = localStorage.getItem(CLIENT_KEY); } catch { /* 忽略 */ }
  if (typeof t !== 'string' || !t) {
    t = (self.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('c' + Date.now() + Math.random().toString(16).slice(2));
    try { localStorage.setItem(CLIENT_KEY, t); } catch { /* 忽略 */ }
  }
  return t;
}

async function request(path, options) {
  const opts = options || {};
  const headers = {};
  if (opts.body) headers['content-type'] = 'application/json';
  headers[CLIENT_HEADER] = clientToken();
  if (opts.headers) for (const [k, v] of Object.entries(opts.headers)) headers[k] = v;
  let res;
  try {
    res = await fetch(API + path, {
      method: opts.method,
      credentials: 'same-origin',
      headers,
      ...(opts.body ? { body: opts.body } : {}),
    });
  } catch {
    throw Object.assign(new Error('network'), { code: 'network' });
  }
  let body = null;
  try { body = await res.json(); } catch { /* 无 body */ }
  if (!res.ok) {
    const code = body && typeof body.error === 'string' ? body.error
      : body && typeof body.code === 'string' ? body.code : 'generic';
    throw Object.assign(new Error(code), { code, status: res.status });
  }
  return body;
}

const numCount = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

function relTime(iso) {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return '';
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return COPY.timeJustNow;
  if (m < 60) return COPY.timeMinutesAgo(m);
  const h = Math.floor(m / 60);
  if (h < 24) return COPY.timeHoursAgo(h);
  const d = Math.floor(h / 24);
  if (d < 30) return COPY.timeDaysAgo(d);
  const date = new Date(iso);
  const p = (x) => String(x).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ================= LocalStorage（仅存管理凭据） ================= */
function readMine() {
  try {
    const raw = localStorage.getItem(MINE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => x && typeof x.id === 'string' && typeof x.token === 'string') : [];
  } catch { return []; }
}
function addMine(id, token) {
  const list = readMine().filter((x) => x.id !== id);
  list.unshift({ id, token });
  try { localStorage.setItem(MINE_KEY, JSON.stringify(list)); } catch { /* 忽略 */ }
}
function removeMine(id) {
  const list = readMine().filter((x) => x.id !== id);
  try { localStorage.setItem(MINE_KEY, JSON.stringify(list)); } catch { /* 忽略 */ }
}

// 本机「已帮助/已举报」需求 id 集合（同设备去重，尽力而为）
function readSet(key) {
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === 'string')) : new Set();
  } catch { return new Set(); }
}
function addToSet(key, id) {
  const s = readSet(key);
  s.add(id);
  try { localStorage.setItem(key, JSON.stringify([...s])); } catch { /* 忽略 */ }
}

/* ================= 分类/状态小部件 ================= */
function categoryStamp(key) {
  const c = CATEGORIES[key] || { char: '?', bg: '#ECEEF1', fg: '#3E4C59' };
  const s = el('span', 'stamp', c.char);
  s.style.background = c.bg;
  s.style.color = c.fg;
  return s;
}
function statusTextNode(key) {
  return el('span', 'status-text', COPY.status[key] || key);
}

/* ================= 信息流 ================= */
async function loadDemands() {
  const feed = $('#feed');
  feed.innerHTML = '';
  skeletonFeed(feed); // 首次加载显示骨架屏，避免空白
  try {
    const list = await request('/api/demands');
    state.demands = Array.isArray(list) ? list : [];
    state.loaded = true;
    renderFeed();
  } catch {
    state.demands = [];
    state.loaded = true;
    renderFeedError();
  }
}

function loadingNode() {
  const w = el('div', 'loading');
  w.appendChild(el('div', 'spinner'));
  return w;
}

function skeletonFeed(feed = $('#feed')) {
  for (let i = 0; i < 3; i++) {
    const it = el('article', 'item item--skeleton');
    it.setAttribute('aria-hidden', 'true');
    const st = el('span', 'sk-stamp');
    const body = el('div', 'item-body');
    body.appendChild(el('div', 'sk-line sk-title'));
    body.appendChild(el('div', 'sk-line sk-desc'));
    body.appendChild(el('div', 'sk-line sk-meta'));
    it.append(st, body);
    feed.appendChild(it);
  }
}

function renderFeedError() {
  const feed = $('#feed');
  feed.innerHTML = '';
  const box = el('div', 'feed-state');
  const art = el('div', 'state-art');
  art.innerHTML = SVG_ERR;
  box.appendChild(art);
  box.appendChild(el('p', null, COPY.loadError));
  const btn = el('button', 'btn btn-primary', COPY.retry);
  btn.type = 'button';
  btn.addEventListener('click', loadDemands);
  box.appendChild(btn);
  feed.appendChild(box);
  updateHero();
}

function filterDemands() {
  const q = state.search.trim().toLowerCase();
  return state.demands.filter((d) => {
    if (state.openOnly && (d.status !== 'open' || isOverdue(d))) return false;
    if (state.category !== 'all' && d.category !== state.category) return false;
    if (!q) return true;
    return (d.title || '').toLowerCase().includes(q) || (d.description || '').toLowerCase().includes(q);
  });
}

// 是否已过期（前端按发布时长判断，不改数据）：拼车 2 天，其余 7 天。
function isOverdue(d) {
  const t = new Date(d.created_at).getTime();
  if (!Number.isFinite(t)) return false;
  const limit = (d.category === 'carpool' ? CARPOOL_OVERDUE_DAYS : OVERDUE_DAYS) * DAY_MS;
  return Date.now() - t > limit;
}

// 排序权重：进行中未过期 < 进行中已过期 < 已接单 < 已完成；同权重内按时间倒序。
function rankOf(d) {
  if (d.status === 'open') return isOverdue(d) ? 1 : 0;
  if (d.status === 'taken') return 2;
  return 3; // done
}

function renderFeed() {
  const feed = $('#feed');
  feed.innerHTML = '';
  const list = filterDemands().slice().sort((a, b) => {
    const ra = rankOf(a), rb = rankOf(b);
    if (ra !== rb) return ra - rb;
    return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0; // 同组内时间倒序
  });
  if (!list.length) {
    feed.appendChild(emptyState());
    tearAnimateIds.clear();
    updateHero();
    return;
  }
  list.forEach((d) => feed.appendChild(listItem(d)));
  tearAnimateIds.clear();
  updateHero();
}

function emptyState() {
  const box = el('div', 'feed-state');
  const art = el('div', 'state-art');
  art.innerHTML = SVG_EMPTY;
  box.appendChild(art);
  box.appendChild(el('p', null, COPY.emptyNone));
  const btn = el('button', 'btn btn-primary', COPY.headerPublish);
  btn.type = 'button';
  btn.style.marginTop = '4px';
  btn.addEventListener('click', openPublish);
  box.appendChild(btn);
  return box;
}

function listItem(d) {
  const it = el('article', 'item');
  it.setAttribute('role', 'button');
  it.tabIndex = 0;
  it.setAttribute('aria-label', d.title);
  if (d.status === 'done') it.classList.add('item--done'); // 已完成整体降低透明度

  it.appendChild(categoryStamp(d.category));

  const body = el('div', 'item-body');
  body.appendChild(el('h3', 'item-title', d.title));
  body.appendChild(el('p', 'item-desc', d.description));

  const meta = el('div', 'item-meta');
  meta.appendChild(el('span', 'item-cat', COPY.categories[d.category] || d.category));
  if (d.is_sample) meta.appendChild(el('span', 'tag-sample', COPY.sampleTag));
  meta.appendChild(el('span', 'item-time', relTime(d.created_at)));
  if (!d.is_sample && numCount(d.help_count) > 0) meta.appendChild(el('span', 'item-help', COPY.helpCount(numCount(d.help_count))));
  if (d.status === 'open' && isOverdue(d)) meta.appendChild(el('span', 'tag-overdue', COPY.overdue));
  if (d.status === 'done') meta.appendChild(el('span', 'item-done-tag', COPY.status.done));
  body.appendChild(meta);

  it.appendChild(body);

  if (d.status === 'taken') {
    it.classList.add('item--taken');
    const tear = el('span', 'tear');
    tear.appendChild(el('span', 'tear-label', COPY.status.taken));
    if (tearAnimateIds.has(d.id)) tear.classList.add('tear--anim');
    it.appendChild(tear);
  }

  const open = () => openDetail(d);
  it.addEventListener('click', open);
  it.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  return it;
}

/* ================= 开场区 / 玻璃浮层统计 ================= */
function heroCounts() {
  const real = state.demands.filter((d) => !d.is_sample);
  const open = real.filter((d) => d.status === 'open' && !isOverdue(d)).length;
  const matched = real.filter((d) => d.status === 'taken' || d.status === 'done').length;
  return { open, matched, real: real.length };
}
function updateHero() {
  const c = heroCounts();
  const l1 = $('#hero-line1'), l2 = $('#hero-line2'), l3 = $('#hero-line3');
  const loading = !state.loaded;
  const launched = state.loaded && c.real === 0;
  const hero = $('#hero');
  if (hero) hero.classList.toggle('hero--skeleton', loading);
  if (l1) l1.textContent = loading ? '' : (launched ? COPY.heroLaunch1 : COPY.heroOpen(c.open));
  if (l2) l2.textContent = loading ? '' : (launched ? COPY.heroLaunch2 : COPY.heroNeed(c.open));
  if (l3) l3.textContent = loading || launched ? '' : COPY.heroDone(c.matched);
  const sub = $('#glassbar-sub');
  if (sub) sub.textContent = loading ? '' : (launched ? COPY.heroLaunch1 : COPY.glassSub(c.open));
}

/* ================= 弹窗基础 ================= */
function openModal(id) {
  const m = $(id);
  m.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const m = $(id);
  m.hidden = true;
  document.body.style.overflow = '';
  if (id === '#modal-publish') resetPublishForm();
  if (id === '#modal-success') $('#modal-success').querySelector('.sheet').innerHTML = '';
  if (id === '#modal-manual') $('#modal-manual').querySelector('.sheet').innerHTML = '';
  if (id === '#modal-detail') { state.activeId = null; state.activeContact = null; state.activeData = null; restoreBaseUrl(); }
  if (id === '#modal-mine' && feedDirty) { feedDirty = false; renderFeed(); }
  // 确认层通过任意关闭路径（背景/取消/Esc）都应 resolve(false)
  if (id === '#modal-confirm' && confirmResolve) { const r = confirmResolve; confirmResolve = null; r(false); }
}
function backdropClick(id, sheet) {
  $(id).addEventListener('click', (e) => { if (!e.target.closest(sheet)) closeModal(id); });
}

/* ================= 详情深链接（/#/d/<id>）与历史管理 ================= */
// detailPushed：详情是否由点击卡片 pushState 打开。点击打开→关闭用 back()（返回键也能关）；
// 直接以深链接进入→关闭用 replaceState（无历史可退，避免退到站点外）。
let detailPushed = false;

function detailIdFromHash() {
  const m = (location.hash || '').match(/^#\/d\/([0-9a-fA-F-]{36})$/);
  return m ? m[1].toLowerCase() : null;
}
function baseHashUrl() { return location.pathname + location.search; }
function detailHashUrl(id) { return baseHashUrl() + '#/d/' + id; }
function deepLink(id) { return location.origin + detailHashUrl(id); }

function restoreBaseUrl() {
  try {
    if (detailPushed) { detailPushed = false; history.back(); } // popstate 里再真正隐藏弹窗
    else if (detailIdFromHash()) history.replaceState(null, '', baseHashUrl());
  } catch { /* 忽略：个别环境 history 受限 */ }
}

function hideDetailOnly() {
  const m = $('#modal-detail');
  if (!m || m.hidden) return;
  m.hidden = true;
  document.body.style.overflow = '';
  state.activeId = null; state.activeContact = null; state.activeData = null;
}

function showDetail(d) {
  state.activeId = d.id;
  state.activeContact = null;
  state.activeData = d;
  buildDetail(d);
  openModal('#modal-detail');
}

// 点击条目：push 一条历史，使返回键/关闭都能把 URL 恢复成 /
function openDetail(d) {
  try { history.pushState({ dw: d.id }, '', detailHashUrl(d.id)); detailPushed = true; }
  catch { detailPushed = false; }
  showDetail(d);
}

// 直接由深链接/返回键进入：按 id 拉取详情；不存在或已撤下则提示并回到信息流
async function openDetailById(id) {
  try {
    const d = await request('/api/demands/' + id);
    if (!d || typeof d.id !== 'string') throw new Error('not_found');
    detailPushed = false;
    showDetail(d);
  } catch (err) {
    toast(COPY.deepLinkMissing);
    if (detailIdFromHash()) { try { history.replaceState(null, '', baseHashUrl()); } catch { /* 忽略 */ } }
    hideDetailOnly();
    renderFeed();
  }
}

function handlePopState() {
  const id = detailIdFromHash();
  if (id) {
    if ($('#modal-detail').hidden || state.activeId !== id) openDetailById(id);
  } else if (!$('#modal-detail').hidden) {
    hideDetailOnly();
  }
  detailPushed = false;
}

/* ================= 页内确认层（替代原生 confirm） ================= */
let confirmResolve = null;
function askConfirm({ title, body, ok, cancel }) {
  const sheet = $('#modal-confirm .sheet');
  sheet.innerHTML = '';
  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, title));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-confirm'));
  head.appendChild(close);
  sheet.append(head, el('p', 'confirm-body', body));

  const actions = el('div', 'form-actions');
  const btnCancel = el('button', 'btn btn-ghost', cancel);
  btnCancel.type = 'button';
  btnCancel.addEventListener('click', () => closeModal('#modal-confirm'));
  const btnOk = el('button', 'btn btn-danger', ok);
  btnOk.type = 'button';
  btnOk.addEventListener('click', () => {
    const r = confirmResolve; confirmResolve = null;
    closeModal('#modal-confirm');
    if (r) r(true);
  });
  actions.append(btnCancel, btnOk);
  sheet.appendChild(actions);

  openModal('#modal-confirm');
  return new Promise((resolve) => { confirmResolve = resolve; });
}

/* ================= 详情弹窗 ================= */
function buildDetail(d) {
  const sheet = $('#modal-detail .sheet');
  sheet.innerHTML = '';

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.detailTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-detail'));
  head.appendChild(close);

  const meta = el('div', 'detail-meta');
  meta.appendChild(categoryStamp(d.category));
  meta.appendChild(el('span', 'detail-cat', COPY.categories[d.category] || d.category));
  if (d.is_sample) meta.appendChild(el('span', 'tag-sample', COPY.sampleTag));
  if (d.status !== 'open') meta.appendChild(el('span', 'detail-status', COPY.status[d.status]));

  const title = el('h3', 'detail-title', d.title);
  const desc = el('p', 'detail-desc', d.description);
  const time = el('p', 'detail-time', relTime(d.created_at));

  const contactBox = el('div', 'contact-box');
  if (d.is_sample) {
    // 示例帖：不获取联系方式、不可举报，引导发布真实需求
    contactBox.appendChild(el('p', 'sample-note', COPY.sampleNote));
    const btnPost = el('button', 'btn btn-secondary btn-block', COPY.publishTitle);
    btnPost.type = 'button';
    btnPost.addEventListener('click', () => { closeModal('#modal-detail'); openPublish(); });
    contactBox.appendChild(btnPost);
  } else {
    const btnView = el('button', 'btn btn-primary btn-block', COPY.viewContact);
    btnView.type = 'button';
    btnView.addEventListener('click', () => revealContact(d, contactBox, btnView));
    contactBox.appendChild(btnView);
  }

  const shareWrap = el('div', 'share-row');
  const btnShare = el('button', 'btn btn-ghost btn-block', COPY.shareBtn);
  btnShare.type = 'button';
  btnShare.addEventListener('click', () => copyShareText(buildShareText(d), btnShare));
  shareWrap.appendChild(btnShare);

  const reportRow = el('div', 'report-row');
  const btnReport = el('button', 'btn-report', COPY.report);
  btnReport.type = 'button';
  btnReport.addEventListener('click', () => openReport(d));
  reportRow.appendChild(btnReport);

  if (d.is_sample) sheet.append(head, meta, title, desc, time, contactBox, shareWrap);
  else sheet.append(head, meta, title, desc, time, contactBox, shareWrap, reportRow);
}

async function revealContact(d, box, btnView) {
  btnView.disabled = true;
  btnView.textContent = COPY.contactLoading;
  try {
    // 同设备首次点击走 /help（联系方式 + help_count+1），之后走 /contact（只取联系方式）
    const helped = readSet(HELPED_KEY).has(d.id);
    let data;
    if (helped) {
      data = await request(`/api/demands/${d.id}/contact`);
    } else {
      data = await request(`/api/demands/${d.id}/help`, { method: 'POST' });
      addToSet(HELPED_KEY, d.id);
      if (typeof data.help_count === 'number') {
        state.demands = state.demands.map((x) => (x.id === d.id ? { ...x, help_count: data.help_count } : x));
        renderFeed();
      }
    }
    const contact = data && typeof data.contact === 'string' ? data.contact : '';
    box.innerHTML = '';
    box.appendChild(el('div', 'form-label', COPY.contactLabel));
    box.appendChild(el('div', 'contact-value', contact));
    const copyBtn = el('button', 'btn btn-ghost btn-sm', COPY.copy);
    copyBtn.type = 'button';
    copyBtn.addEventListener('click', () => copyText(contact, copyBtn));
    box.appendChild(copyBtn);
    box.appendChild(el('p', 'safety-note', COPY.contactSafety));
  } catch (err) {
    btnView.disabled = false;
    btnView.textContent = COPY.viewContact;
    toast(contactErrText(err));
  }
}

// 联系方式失败提示按原因区分，并附错误码便于排查
function contactErrText(err) {
  const code = (err && err.code) || 'generic';
  const status = err && err.status;
  let msg;
  if (code === 'network') msg = COPY.errNetwork;
  else if (status === 403) msg = COPY.errBlocked;
  else if (status === 404 || code === 'not_found') msg = COPY.errNotFound;
  else if (status === 429 || code === 'rate_limited') msg = COPY.errRateLimited;
  else msg = COPY.contactFailed;
  return msg + COPY.errCodeSuffix(code);
}

/* ================= 举报 ================= */
function openReport(d) {
  if (readSet(REPORTED_KEY).has(d.id)) { toast(COPY.reportAlready); return; }
  state.reportDemand = d;
  buildReportSheet(d);
  openModal('#modal-report');
}

function buildReportSheet(d) {
  const sheet = $('#modal-report .sheet');
  sheet.innerHTML = '';

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.reportTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-report'));
  head.appendChild(close);
  sheet.append(head, el('p', 'confirm-body', COPY.reportHint));

  const grid = el('div', 'report-grid');
  let chosen = null;
  Object.entries(COPY.reportReasons).forEach(([key, label]) => {
    const chip = el('button', 'cat-chip', label);
    chip.type = 'button';
    chip.addEventListener('click', () => {
      chosen = key;
      grid.querySelectorAll('.cat-chip').forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
    grid.appendChild(chip);
  });
  sheet.appendChild(grid);

  const actions = el('div', 'form-actions');
  const btnCancel = el('button', 'btn btn-ghost', COPY.formCancel);
  btnCancel.type = 'button';
  btnCancel.addEventListener('click', () => closeModal('#modal-report'));
  const btnSubmit = el('button', 'btn btn-primary', COPY.reportSubmit);
  btnSubmit.type = 'button';
  btnSubmit.addEventListener('click', () => {
    if (!chosen) { toast(COPY.reportHint); return; }
    submitReport(d, chosen, btnSubmit);
  });
  actions.append(btnCancel, btnSubmit);
  sheet.appendChild(actions);
}

async function submitReport(d, reason, btn) {
  btn.disabled = true;
  try {
    await request(`/api/demands/${d.id}/report`, { method: 'POST', body: JSON.stringify({ reason }) });
    addToSet(REPORTED_KEY, d.id);
    closeModal('#modal-report');
    toast(COPY.reportDone);
  } catch (err) {
    btn.disabled = false;
    toast(err.code === 'already_reported' ? COPY.reportAlready
      : err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.reportFailed);
  }
}

/* ================= 发布表单 ================= */
let selectedCategory = null;

function syncDescPlaceholder() {
  const t = $('#modal-publish .textarea');
  if (t) t.placeholder = selectedCategory === 'team' ? COPY.formDescriptionPlaceholderTeam : COPY.formDescriptionPlaceholder;
}

function buildPublishForm() {
  const sheet = $('#modal-publish .sheet');
  sheet.innerHTML = '';

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.publishTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-publish'));
  head.appendChild(close);

  // 分类
  const fCat = el('div', 'form-field');
  const lCat = el('label', 'form-label', COPY.formCategory);
  lCat.appendChild(el('span', 'req', ' *'));
  const catGrid = el('div', 'cat-grid');
  CATEGORY_KEYS.forEach((key) => {
    const chip = el('button', 'cat-chip', COPY.categories[key]);
    chip.type = 'button';
    chip.addEventListener('click', () => {
      selectedCategory = key;
      catGrid.querySelectorAll('.cat-chip').forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      syncDescPlaceholder();
    });
    catGrid.appendChild(chip);
  });
  fCat.append(lCat, catGrid);

  // 标题
  const fTitle = el('div', 'form-field');
  const lTitle = el('label', 'form-label', COPY.formTitle);
  lTitle.appendChild(el('span', 'req', ' *'));
  const iTitle = el('input', 'input');
  iTitle.type = 'text';
  iTitle.placeholder = COPY.formTitlePlaceholder;
  iTitle.maxLength = LIMITS.title;
  const cTitle = el('span', 'char-count', COPY.charCount(0, LIMITS.title));
  iTitle.addEventListener('input', () => {
    cTitle.textContent = COPY.charCount(iTitle.value.length, LIMITS.title);
    cTitle.classList.toggle('over', iTitle.value.length >= LIMITS.title);
  });
  fTitle.append(lTitle, iTitle, cTitle);

  // 描述
  const fDesc = el('div', 'form-field');
  const lDesc = el('label', 'form-label', COPY.formDescription);
  lDesc.appendChild(el('span', 'req', ' *'));
  const tDesc = el('textarea', 'textarea');
  tDesc.placeholder = COPY.formDescriptionPlaceholder;
  tDesc.maxLength = LIMITS.description;
  const cDesc = el('span', 'char-count', COPY.charCount(0, LIMITS.description));
  tDesc.addEventListener('input', () => {
    cDesc.textContent = COPY.charCount(tDesc.value.length, LIMITS.description);
    cDesc.classList.toggle('over', tDesc.value.length >= LIMITS.description);
  });
  fDesc.append(lDesc, tDesc, cDesc);

  // 联系方式
  const fContact = el('div', 'form-field');
  const lContact = el('label', 'form-label', COPY.formContact);
  lContact.appendChild(el('span', 'req', ' *'));
  const iContact = el('input', 'input');
  iContact.type = 'text';
  iContact.placeholder = COPY.formContactPlaceholder;
  iContact.maxLength = LIMITS.contact;
  const cContact = el('span', 'char-count', COPY.charCount(0, LIMITS.contact));
  iContact.addEventListener('input', () => {
    cContact.textContent = COPY.charCount(iContact.value.length, LIMITS.contact);
    cContact.classList.toggle('over', iContact.value.length >= LIMITS.contact);
  });
  fContact.append(lContact, iContact, cContact);

  // 操作
  const actions = el('div', 'form-actions');
  const btnCancel = el('button', 'btn btn-ghost', COPY.formCancel);
  btnCancel.type = 'button';
  btnCancel.addEventListener('click', () => closeModal('#modal-publish'));
  const btnSubmit = el('button', 'btn btn-primary', COPY.formSubmit);
  btnSubmit.type = 'submit';
  actions.append(btnCancel, btnSubmit);

  const form = el('form');
  const fHint = el('p', 'form-hint', COPY.formHint);
  form.append(head, fHint, fCat, fTitle, fDesc, fContact, actions);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitPublish(btnSubmit, { iTitle, tDesc, iContact });
  });

  sheet.appendChild(form);
  selectedCategory = null;
}

function resetPublishForm() {
  buildPublishForm();
}

async function submitPublish(btn, fields) {
  if (!selectedCategory) { toast(COPY.requiredCategory); return; }
  const title = fields.iTitle.value.trim();
  const description = fields.tDesc.value.trim();
  const contact = fields.iContact.value.trim();
  if (!title || !description || !contact) { toast(COPY.requiredField); return; }

  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = '…';
  try {
    const created = await request('/api/demands', {
      method: 'POST',
      body: JSON.stringify({ category: selectedCategory, title, description, contact }),
    });
    if (!created || typeof created.id !== 'string' || typeof created.manage_token !== 'string') {
      throw Object.assign(new Error('invalid_response'), { code: 'invalid_response' });
    }
    addMine(created.id, created.manage_token);
    closeModal('#modal-publish');
    showSuccess(created);
    loadDemands();
  } catch (err) {
    toast(err.code === 'invalid_input' ? COPY.errInvalidInput
      : err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.errGeneric);
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}

function buildSuccess(demand) {
  const token = demand && typeof demand.manage_token === 'string' ? demand.manage_token : '';
  const sheet = $('#modal-success .sheet');
  sheet.innerHTML = '';

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.successTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-success'));
  head.appendChild(close);

  const mark = el('div', 'success-mark');
  mark.innerHTML = SVG_CHECK;
  sheet.appendChild(mark);
  sheet.appendChild(el('p', 'success-hint', COPY.successHint));

  const codeBox = el('div', 'code-box');
  codeBox.appendChild(el('span', 'code-label', COPY.manageCode));
  codeBox.appendChild(el('code', 'code-value', token));
  const copyBtn = el('button', 'btn btn-primary btn-block', COPY.copyCode);
  copyBtn.type = 'button';
  copyBtn.addEventListener('click', () => copyText(token, copyBtn));
  codeBox.appendChild(copyBtn);
  const codeHint = el('p', 'code-hint', COPY.codeRestoreHint);

  const btnShare = el('button', 'btn btn-ghost btn-block', COPY.shareBtn);
  btnShare.type = 'button';
  btnShare.style.marginTop = '12px';
  btnShare.addEventListener('click', () => copyShareText(buildShareText(demand), btnShare));

  const done = el('button', 'btn btn-ghost btn-block', COPY.done);
  done.type = 'button';
  done.style.marginTop = '16px';
  done.addEventListener('click', () => closeModal('#modal-success'));

  sheet.append(codeBox, codeHint, btnShare, done);
}

function showSuccess(demand) {
  state.lastToken = demand && demand.manage_token;
  state.lastShareDemand = demand;
  buildSuccess(demand);
  openModal('#modal-success');
}

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch { /* 忽略 */ }
    ta.remove();
  }
  const original = btn.textContent;
  btn.textContent = COPY.copied;
  setTimeout(() => { btn.textContent = original; }, 1500);
}

/* ================= 分享文案与复制（兼容微信内置浏览器） ================= */
// 描述超过 60 字截断并加「…」；文案不含联系方式，只引导点链接回站内查看。
function truncDesc(s, max = 60) {
  if (typeof s !== 'string' || !s) return '';
  return s.length > max ? s.slice(0, max) + '…' : s;
}

function buildShareText(d) {
  const cat = COPY.categories[d.category] || d.category || '';
  const st = COPY.status[d.status] || d.status || '';
  return [
    `【${COPY.shareAppName} · ${cat}】`,
    d.title || '',
    truncDesc(d.description),
    `${COPY.shareStatusPrefix}${st}`,
    `${COPY.shareCta}${deepLink(d.id)}`,
  ].join('\n');
}

async function tryCopy(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* 继续回退 */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    if (ok) return true;
  } catch { /* 继续回退到手动复制 */ }
  return false;
}

async function copyShareText(text, btn) {
  const ok = await tryCopy(text);
  if (ok) {
    toast(COPY.shareCopied);
    if (btn) {
      const original = btn.textContent;
      btn.textContent = COPY.copied;
      setTimeout(() => { btn.textContent = original; }, 1500);
    }
    return;
  }
  openManualCopy(text);
}

function openManualCopy(text) {
  const sheet = $('#modal-manual .sheet');
  sheet.innerHTML = '';

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.manualCopyTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-manual'));
  head.appendChild(close);
  sheet.append(head, el('p', 'confirm-body', COPY.manualCopyHint));

  const ta = el('textarea', 'textarea manual-copy-area');
  ta.value = text;
  ta.setAttribute('readonly', '');
  sheet.appendChild(ta);

  const actions = el('div', 'form-actions');
  const btnSelect = el('button', 'btn btn-primary', COPY.manualCopySelect);
  btnSelect.type = 'button';
  btnSelect.addEventListener('click', () => { try { ta.focus(); ta.setSelectionRange(0, text.length); } catch { /* 忽略 */ } });
  const btnDone = el('button', 'btn btn-ghost', COPY.done);
  btnDone.type = 'button';
  btnDone.addEventListener('click', () => closeModal('#modal-manual'));
  actions.append(btnSelect, btnDone);
  sheet.appendChild(actions);

  openModal('#modal-manual');
  setTimeout(() => { try { ta.focus(); ta.select(); } catch { /* 忽略 */ } }, 60);
}

/* ================= 我的发布 ================= */
async function openMine() {
  const sheet = $('#modal-mine .sheet');
  sheet.innerHTML = '';
  openModal('#modal-mine');

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.mineTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-mine'));
  head.appendChild(close);
  sheet.appendChild(head);

  sheet.appendChild(el('p', 'detail-time', COPY.mineHint));

  // 跨设备找回入口：输入管理码 → 服务端校验 → 加入本机「我的发布」
  const claimWrap = el('div', 'mine-claim');
  const claimToggle = el('button', 'btn btn-secondary btn-block', COPY.claimEntry);
  claimToggle.type = 'button';
  const claimBox = el('div', 'claim-box');
  claimBox.hidden = true;
  const claimLabel = el('label', 'form-label', COPY.claimLabel);
  claimLabel.setAttribute('for', 'claim-input');
  const claimInput = el('input', 'input');
  claimInput.id = 'claim-input';
  claimInput.type = 'text';
  claimInput.autocomplete = 'off';
  claimInput.placeholder = COPY.claimPlaceholder;
  const claimActions = el('div', 'claim-actions');
  const claimGo = el('button', 'btn btn-primary', COPY.claimSubmit);
  claimGo.type = 'button';
  const claimCancel = el('button', 'btn btn-ghost', COPY.claimCancel);
  claimCancel.type = 'button';
  claimActions.append(claimGo, claimCancel);
  claimBox.append(claimLabel, claimInput, claimActions);
  claimToggle.addEventListener('click', () => {
    claimBox.hidden = !claimBox.hidden;
    if (!claimBox.hidden) setTimeout(() => { try { claimInput.focus(); } catch { /* 忽略 */ } }, 50);
  });
  claimCancel.addEventListener('click', () => { claimBox.hidden = true; claimInput.value = ''; });
  claimGo.addEventListener('click', () => submitClaim(claimInput.value, claimGo));
  claimInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submitClaim(claimInput.value, claimGo); } });
  claimWrap.append(claimToggle, claimBox);
  sheet.appendChild(claimWrap);

  const mine = readMine();
  if (!mine.length) {
    const box = el('div', 'feed-state');
    const art = el('div', 'state-art');
    art.innerHTML = SVG_INBOX;
    box.appendChild(art);
    box.appendChild(el('p', null, COPY.mineEmpty));
    sheet.appendChild(box);
    return;
  }

  const list = el('div', 'mine-list');
  list.appendChild(loadingNode());
  sheet.appendChild(list);

  const results = await Promise.all(mine.map(async (m) => {
    try { return { mine: m, data: await request(`/api/demands/${m.id}`) }; }
    catch { return { mine: m, data: null }; }
  }));

  list.innerHTML = '';
  const valid = results.filter((r) => r.data && r.data.id);
  if (!valid.length) {
    const box = el('div', 'feed-state');
    box.appendChild(el('p', null, COPY.mineEmpty));
    list.appendChild(box);
    return;
  }

  valid.sort((a, b) => (a.data.created_at < b.data.created_at ? 1 : -1));
  valid.forEach(({ mine, data }) => list.appendChild(mineItem(mine, data)));
}

async function submitClaim(rawToken, btn) {
  const token = (rawToken || '').trim();
  if (!token) { toast(COPY.claimEmpty); return; }
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = '…';
  try {
    const res = await request('/api/demands/claim', {
      method: 'POST',
      body: JSON.stringify({ manage_token: token }),
    });
    if (!res || typeof res.id !== 'string') throw Object.assign(new Error('invalid_response'), { code: 'invalid_response' });
    addMine(res.id, token);
    toast(COPY.claimDone);
    openMine(); // 重渲染，列表里出现找回的需求
  } catch (err) {
    toast(err.code === 'manage_token_invalid' ? COPY.claimWrong
      : err.code === 'not_found' ? COPY.errNotFound
      : err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.errGeneric);
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}

function mineItem(mine, d) {
  const item = el('div', 'mine-item');
  const top = el('div', 'mine-item-top');
  top.appendChild(categoryStamp(d.category));
  top.appendChild(statusTextNode(d.status));
  const title = el('p', 'mine-item-title', d.title);
  item.append(top, title);
  if (numCount(d.help_count) > 0) item.appendChild(el('p', 'mine-item-help', COPY.helpCount(numCount(d.help_count))));

  const actions = el('div', 'mine-item-actions');
  if (d.status === 'open') {
    actions.appendChild(mineActionBtn(COPY.markTaken, 'taken', () => changeStatus(mine, 'taken', item)));
    actions.appendChild(mineActionBtn(COPY.markDone, 'done', () => changeStatus(mine, 'done', item)));
  } else if (d.status === 'taken') {
    actions.appendChild(mineActionBtn(COPY.markDone, 'done', () => changeStatus(mine, 'done', item)));
  }
  // 「撤下」按钮始终可用
  const btnRemove = el('button', 'btn btn-danger btn-sm', COPY.takeDown);
  btnRemove.type = 'button';
  btnRemove.addEventListener('click', () => removeDemand(mine, d, item, btnRemove));
  actions.appendChild(btnRemove);
  item.appendChild(actions);
  return item;
}

function mineActionBtn(label, kind, onClick) {
  const b = el('button', kind === 'done' ? 'btn btn-ghost btn-sm' : 'btn btn-primary btn-sm', label);
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
}

async function changeStatus(mine, status, item) {
  try {
    await request(`/api/demands/${mine.id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ manage_token: mine.token, status }),
    });
    toast(COPY.statusUpdated);
    // 本地即时更新信息流数据（不立即重渲染，避免撕角动画在弹窗后提前播放）
    const local = state.demands.find((d) => d.id === mine.id);
    if (local) local.status = status;
    if (status === 'taken') tearAnimateIds.add(mine.id);
    feedDirty = true;
    // 更新当前弹窗里的这条
    const updated = await request(`/api/demands/${mine.id}`);
    item.replaceWith(mineItem(mine, updated));
  } catch (err) {
    toast(err.code === 'manage_token_invalid' ? COPY.errManageToken
      : err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.errGeneric);
  }
}

async function removeDemand(mine, d, item, btn) {
  const ok = await askConfirm({
    title: COPY.confirmTitle,
    body: COPY.confirmRemoveBody(d.title),
    ok: COPY.confirmYes,
    cancel: COPY.confirmNo,
  });
  if (!ok) return;
  btn.disabled = true;
  try {
    await request(`/api/demands/${mine.id}`, {
      method: 'DELETE',
      headers: { 'x-manage-token': mine.token },
    });
    removeMine(mine.id);
    item.remove();
    toast(COPY.removeDone);
    loadDemands();
    if (!readMine().length) openMine(); // 无剩余则回到空状态
  } catch (err) {
    btn.disabled = false;
    toast(err.code === 'manage_token_invalid' ? COPY.errManageToken
      : err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.errGeneric);
  }
}

/* ================= 分类标签 & 搜索 ================= */
function buildTabs() {
  buildTabList($('#tabs'));
  buildTabList($('#glass-tabs'));
  updateTabsFade();
}
// 右缘渐隐：仅当可横向滑动且未滑到最右时显示
function updateTabsFade() {
  ['#tabs', '#glass-tabs'].forEach((sel) => {
    const t = $(sel);
    if (!t) return;
    const canScroll = t.scrollWidth > t.clientWidth + 1;
    const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 1;
    t.classList.toggle('fade-right', canScroll && !atEnd);
  });
}
function buildTabList(container) {
  if (!container) return;
  container.innerHTML = '';
  const mk = (key, label) => {
    const t = el('button', 'tab', label);
    t.type = 'button';
    t.setAttribute('role', 'tab');
    t.dataset.cat = key;
    if (state.category === key) t.classList.add('active');
    t.addEventListener('click', () => setCategory(key));
    container.appendChild(t);
  };
  mk('all', COPY.tabAll);
  CATEGORY_KEYS.forEach((key) => mk(key, COPY.categories[key]));
}

function setCategory(key) {
  state.category = key;
  document.querySelectorAll('#tabs .tab, #glass-tabs .tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.cat === key);
  });
  renderFeed();
}

let searchTimer = null;
function bindSearch(input) {
  input.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    const v = e.target.value;
    searchTimer = setTimeout(() => { state.search = v; syncSearchInputs(input); renderFeed(); }, 180);
  });
}
function syncSearchInputs(src) {
  const main = $('#search'), glass = $('#glass-search');
  const v = src.value;
  if (main && main !== src) main.value = v;
  if (glass && glass !== src) glass.value = v;
}

/* ================= 玻璃浮层 ================= */
function updateGlassbar() {
  const hero = $('#hero');
  const gb = $('#glassbar');
  if (!hero || !gb) return;
  const threshold = hero.offsetTop + hero.offsetHeight;
  const show = window.scrollY > threshold;
  if (show !== gb.classList.contains('show')) {
    gb.classList.toggle('show', show);
    gb.setAttribute('aria-hidden', show ? 'false' : 'true');
  }
}
function toggleGlassSearch() {
  const row = $('#glass-search-row');
  const open = row.hidden;
  row.hidden = !open;
  if (open) {
    const g = $('#glass-search');
    if (g) setTimeout(() => { try { g.focus(); } catch { /* 忽略 */ } }, 50);
  }
}

/* ================= 微信内置浏览器兼容 ================= */
function setupViewportGuard() {
  if (!window.visualViewport) return;
  let lastH = 0;
  window.visualViewport.addEventListener('resize', () => {
    const h = window.visualViewport.height;
    if (lastH && h < lastH) {
      const active = document.activeElement;
      if (active && /^(INPUT|TEXTAREA)$/.test(active.tagName)) {
        try { active.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch { /* 忽略 */ }
      }
    }
    lastH = h;
  });
}

/* ================= 管理页（/#/admin，隐藏路由，普通页面无入口） ================= */
function isAdminHash() { return (location.hash || '').replace(/\/+$/, '') === '#/admin'; }

function renderAdminStatic() {
  $('#admin-title').textContent = COPY.adminTitle;
  $('#admin-exit').textContent = COPY.adminExit;
}

function buildAdminAuth() {
  const auth = $('#admin-auth');
  auth.innerHTML = '';
  const l = el('label', 'form-label', COPY.adminKeyLabel);
  l.htmlFor = 'admin-key';
  const i = el('input', 'input');
  i.id = 'admin-key';
  i.type = 'password';
  i.autocomplete = 'off';
  i.placeholder = COPY.adminKeyPlaceholder;
  const btn = el('button', 'btn btn-primary btn-block', COPY.adminLogin);
  btn.type = 'button';
  btn.addEventListener('click', () => {
    const key = i.value.trim();
    if (!key) { toast(COPY.adminKeyPlaceholder); return; }
    state.adminKey = key;
    loadAdminReports();
  });
  i.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
  auth.append(l, i, btn);
  $('#admin-list').innerHTML = '';
  $('#admin-tools').innerHTML = '';
}

function enterAdmin() {
  document.body.classList.add('admin');
  $('#admin').hidden = false;
  document.body.style.overflow = '';
  renderAdminStatic();
  buildAdminAuth();
  if (state.adminKey) loadAdminReports(); // 已登录则直接加载
}

function exitAdmin() {
  document.body.classList.remove('admin');
  $('#admin').hidden = true;
  state.adminKey = null;
  try { history.replaceState(null, '', baseHashUrl()); } catch { /* 忽略 */ }
  if (!state.loaded) loadDemands(); else renderFeed();
}

async function loadAdminReports() {
  const list = $('#admin-list');
  $('#admin-tools').innerHTML = '';
  list.innerHTML = '';
  list.appendChild(loadingNode());
  try {
    const data = await request('/api/admin/reports', { headers: { 'x-admin-key': state.adminKey } });
    renderAdminReports(Array.isArray(data) ? data : []);
  } catch (err) {
    list.innerHTML = '';
    const box = el('div', 'feed-state');
    const art = el('div', 'state-art');
    art.innerHTML = SVG_ERR;
    box.appendChild(art);
    box.appendChild(el('p', null, err.code === 'unauthorized' ? COPY.adminWrong
      : err.code === 'admin_not_configured' ? COPY.adminNotConfigured : COPY.adminLoadError));
    list.appendChild(box);
  }
}

function renderAdminReports(groups) {
  renderAdminTools();
  const list = $('#admin-list');
  list.innerHTML = '';
  if (!groups.length) {
    const box = el('div', 'feed-state');
    const art = el('div', 'state-art');
    art.innerHTML = SVG_INBOX;
    box.appendChild(art);
    box.appendChild(el('p', null, COPY.adminEmpty));
    list.appendChild(box);
    return;
  }
  groups.forEach((g) => list.appendChild(adminCard(g)));
}

function renderAdminTools() {
  const tools = $('#admin-tools');
  tools.innerHTML = '';
  const btn = el('button', 'btn btn-danger admin-samples-btn', COPY.adminDeleteSamples);
  btn.type = 'button';
  btn.addEventListener('click', async () => {
    const ok = await askConfirm({
      title: COPY.adminDeleteSamples,
      body: COPY.adminDeleteSamplesConfirm,
      ok: COPY.confirmYes,
      cancel: COPY.confirmNo,
    });
    if (!ok) return;
    btn.disabled = true;
    try {
      const res = await request('/api/admin/samples', { method: 'DELETE', headers: { 'x-admin-key': state.adminKey } });
      toast(COPY.adminDeleteSamplesDone(numCount(res && res.deleted)));
      loadAdminReports();
      loadDemands();
    } catch (err) {
      toast(err.code === 'unauthorized' ? COPY.adminWrong
        : err.code === 'admin_not_configured' ? COPY.adminNotConfigured : COPY.adminLoadError);
    } finally {
      btn.disabled = false;
    }
  });
  tools.appendChild(btn);
}

function adminCard(g) {
  const card = el('div', 'admin-card');
  const d = g.demand;
  const top = el('div', 'admin-card-top');
  if (d) {
    top.appendChild(categoryStamp(d.category));
    const info = el('div', 'admin-card-info');
    info.appendChild(el('p', 'admin-card-title', d.title));
    const sub = el('p', 'admin-card-meta');
    sub.appendChild(el('span', null, COPY.categories[d.category] || d.category));
    sub.appendChild(el('span', null, relTime(d.created_at)));
    if (d.hidden === true) sub.appendChild(el('span', 'tag-overdue', COPY.adminHidden));
    info.appendChild(sub);
    top.appendChild(info);
  } else {
    const info = el('div', 'admin-card-info');
    info.appendChild(el('p', 'admin-card-title', COPY.adminDemandMissing));
    top.appendChild(info);
  }
  card.appendChild(top);

  const reasons = el('p', 'admin-card-reasons');
  const reasonText = (g.reasons || []).map((r) => COPY.reportReasons[r] || r).join(' / ');
  reasons.appendChild(el('strong', null, COPY.adminReported(g.report_count)));
  reasons.appendChild(document.createTextNode(` · ${COPY.adminReason}: ${reasonText}`));
  card.appendChild(reasons);

  if (d) {
    const actions = el('div', 'admin-card-actions');
    if (d.hidden === true) {
      const bRestore = el('button', 'btn btn-primary btn-sm', COPY.adminRestore);
      bRestore.type = 'button';
      bRestore.addEventListener('click', () => adminRestore(d.id, bRestore));
      actions.appendChild(bRestore);
    }
    const bDel = el('button', 'btn btn-danger btn-sm', COPY.adminDelete);
    bDel.type = 'button';
    bDel.addEventListener('click', () => adminRemove(d.id, bDel));
    actions.appendChild(bDel);
    card.appendChild(actions);
  }

  return card;
}

async function adminRemove(id, btn) {
  btn.disabled = true;
  try {
    await request(`/api/admin/demands/${id}`, { method: 'DELETE', headers: { 'x-admin-key': state.adminKey } });
    toast(COPY.adminDeleted);
    loadAdminReports();
  } catch (err) {
    btn.disabled = false;
    toast(err.code === 'unauthorized' ? COPY.adminWrong : COPY.errGeneric);
  }
}

async function adminRestore(id, btn) {
  btn.disabled = true;
  try {
    await request(`/api/admin/demands/${id}/restore`, { method: 'POST', headers: { 'x-admin-key': state.adminKey } });
    toast(COPY.adminRestored);
    loadAdminReports();
  } catch (err) {
    btn.disabled = false;
    toast(err.code === 'unauthorized' ? COPY.adminWrong : COPY.errGeneric);
  }
}

/* ================= 语言切换与静态渲染 ================= */
function openPublish() {
  buildPublishForm();
  openModal('#modal-publish');
}

function readOpenOnly() {
  try { return localStorage.getItem(OPEN_ONLY_KEY) === '1'; } catch { return false; }
}
function setOpenOnly(on) {
  state.openOnly = !!on;
  try { localStorage.setItem(OPEN_ONLY_KEY, on ? '1' : '0'); } catch { /* 忽略 */ }
  const sw = $('#open-only');
  if (sw) {
    sw.classList.toggle('on', state.openOnly);
    sw.setAttribute('aria-checked', state.openOnly ? 'true' : 'false');
  }
  renderFeed();
}

function renderStatic() {
  document.title = COPY.docTitle;
  $('#glassbar-title').textContent = COPY.appTitle;
  const brandText = $('#brand-title .brand-logo-text');
  if (brandText) brandText.textContent = COPY.brandWall;
  $('#btn-mine').textContent = COPY.headerMy;
  $('#glass-mine').textContent = COPY.headerMy;
  $('#btn-publish').textContent = COPY.headerPublish;
  $('#fab-label').textContent = COPY.headerPublish;
  $('#search').placeholder = COPY.searchPlaceholder;
  $('#glass-search').placeholder = COPY.searchPlaceholder;
  $('#footer').textContent = COPY.footer;
  const sw = $('#open-only');
  if (sw) {
    const lbl = sw.querySelector('.switch-label');
    if (lbl) lbl.textContent = COPY.openOnly;
    sw.classList.toggle('on', state.openOnly);
    sw.setAttribute('aria-checked', state.openOnly ? 'true' : 'false');
  }
  const note = $('#lang-note');
  if (note) {
    note.hidden = lang !== 'en';
    if (lang === 'en') note.textContent = COPY.langNote;
  }
  updateHero();
}

function setLang(next) {
  lang = next;
  COPY = I18N[next];
  try { localStorage.setItem(LANG_KEY, next); } catch { /* 忽略 */ }
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('#lang-switch button').forEach((b) => {
    const on = b.dataset.lang === next;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  // 全量重渲染已渲染区域
  renderStatic();
  buildTabs();
  buildPublishForm();
  renderFeed();
  if ($('#modal-detail') && !$('#modal-detail').hidden && state.activeData) buildDetail(state.activeData);
  if ($('#modal-success') && !$('#modal-success').hidden && state.lastShareDemand) buildSuccess(state.lastShareDemand);
}

/* ================= XMUM 启动动画 ================= */
const INTRO_SEEN_KEY = 'xmum_intro_seen';

function shouldPlayIntro() {
  try { if (new URLSearchParams(location.search).has('intro')) return true; } catch { /* 忽略 */ }
  try { return localStorage.getItem(INTRO_SEEN_KEY) !== '1'; } catch { return true; }
}

function svgEl(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function glyphPath(letter) {
  const p = svgEl('path');
  p.setAttribute('d', letter.d);
  p.setAttribute('transform', `translate(${letter.x} 0) scale(1 -1)`);
  return p;
}

/* 顶栏 logo：XMUM 字形（高 17px、填充墨蓝）+「需求墙」文字 */
function buildBrandLogo() {
  const host = $('#brand-title');
  if (!host || host.querySelector('.brand-logo')) return;
  host.textContent = '';
  const svg = svgEl('svg');
  svg.setAttribute('viewBox', GLYPHS.viewBox);
  svg.setAttribute('class', 'brand-logo');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'XMUM');
  GLYPHS.letters.forEach((l) => {
    const p = glyphPath(l);
    p.setAttribute('fill', '#14304F');
    svg.appendChild(p);
  });
  host.appendChild(svg);
  host.appendChild(el('span', 'brand-logo-text', COPY.brandWall));
}

/* 灌墨层：正弦波顶边，向下盖到 y=300；横向右端预留 1200 余量，抵消 introFill 的 -1200px 横移，保证盖满整个单词 */
function sineFillPath() {
  const yC = -2060, A = 110, P = 1200, bottom = 300;
  const x0 = -300, x1 = 6600, steps = 140;
  let d = `M ${x0} ${yC}`;
  for (let i = 1; i <= steps; i++) {
    const x = x0 + (x1 - x0) * (i / steps);
    const y = yC + A * Math.sin((2 * Math.PI * x) / P);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L ${x1} ${bottom} L ${x0} ${bottom} Z`;
  return d;
}

function buildIntro() {
  // 覆盖层容器透明，白色背景单独一层，收尾淡出时单词仍可见。
  // 先以「暂停」态挂载，量出单词真实布局尺寸后再统一启动动画，保证各动画时钟同步。
  const overlay = el('div', 'intro-overlay intro-paused');
  overlay.appendChild(el('div', 'intro-bg'));

  const move = el('div', 'intro-move');
  const word = el('div', 'intro-word'); // 宽度由 CSS min(90vw,420px) 决定，高度按 viewBox 比例计算

  const svg = svgEl('svg');
  svg.setAttribute('viewBox', GLYPHS.viewBox);
  svg.setAttribute('class', 'intro-svg');

  // 灌墨裁剪区 = 四个字母轮廓
  const defs = svgEl('defs');
  const clip = svgEl('clipPath');
  clip.setAttribute('id', 'introLetters');
  GLYPHS.letters.forEach((l) => clip.appendChild(glyphPath(l)));
  defs.appendChild(clip);
  svg.appendChild(defs);

  // 参考线：超长延伸只影响绘制（SVG overflow:visible），不改变单词的布局宽度与居中
  const ref = svgEl('g');
  ref.setAttribute('class', 'intro-ref');
  const refLines = [];
  const mkLine = (x1, y1, x2, y2) => {
    const ln = svgEl('line');
    ln.setAttribute('x1', x1); ln.setAttribute('y1', y1);
    ln.setAttribute('x2', x2); ln.setAttribute('y2', y2);
    ln.setAttribute('stroke', '#D5DDE5');
    ref.appendChild(ln);
    refLines.push(ln);
  };
  mkLine(-3000, 0, 8017, 0);          // 基线
  mkLine(-3000, -1760, 8017, -1760);  // 大写顶线
  [0, 991, 2519, 3489, 5017].forEach((x) => mkLine(x, -4000, x, 4000));
  svg.appendChild(ref);

  // 勾画轮廓（4 字母依次延迟 0/70/140/210ms）
  const outlines = svgEl('g');
  outlines.setAttribute('class', 'intro-outlines');
  const strokePaths = [];
  GLYPHS.letters.forEach((l, i) => {
    const p = glyphPath(l);
    p.setAttribute('class', 'intro-stroke');
    p.setAttribute('pathLength', '1');
    p.setAttribute('stroke', '#14304F');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.style.animationDelay = (i * 70) + 'ms';
    outlines.appendChild(p);
    strokePaths.push(p);
  });
  svg.appendChild(outlines);

  // 同步弹出锚点小方块（60 字体单位）
  const anchors = svgEl('g');
  anchors.setAttribute('class', 'intro-anchors');
  GLYPHS.letters.forEach((l, i) => {
    const n = l.anchors.length;
    l.anchors.forEach(([fx, fy], j) => {
      const r = svgEl('rect');
      const cx = l.x + fx, cy = -fy;
      r.setAttribute('x', cx - 30); r.setAttribute('y', cy - 30);
      r.setAttribute('width', 60); r.setAttribute('height', 60);
      r.setAttribute('fill', '#2F5D8C');
      const frac = n === 1 ? 0 : j / (n - 1);
      r.style.setProperty('--pop-delay', (i * 70 + 60 + frac * 640) + 'ms');
      anchors.appendChild(r);
    });
  });
  svg.appendChild(anchors);

  // 灌墨两层（第二层最终覆盖第一层）
  const fill = svgEl('g');
  fill.setAttribute('clip-path', 'url(#introLetters)');
  const mkFill = (cls) => {
    const p = svgEl('path');
    p.setAttribute('class', cls);
    p.setAttribute('d', sineFillPath());
    fill.appendChild(p);
  };
  mkFill('intro-fill intro-fill--orange');
  mkFill('intro-fill intro-fill--navy');
  svg.appendChild(fill);

  word.appendChild(svg);
  move.appendChild(word);
  overlay.appendChild(move);

  const sub = el('p', 'intro-sub', COPY.introSub);
  overlay.appendChild(sub);

  document.body.appendChild(overlay);
  document.body.classList.add('intro-playing');

  // 量取真实布局宽度（getComputedStyle 不受 transform 影响，精确到小数），高度按 viewBox 比例计算
  const W = parseFloat(getComputedStyle(word).width);
  const H = W * GLYPHS.vb.h / GLYPHS.vb.w;
  word.style.height = H + 'px';
  const s = W / GLYPHS.vb.w;
  const ox = (GLYPHS.focus.x - GLYPHS.vb.x) * s;   // 镜头焦点（X 交叉点）在单词内的本地坐标
  const oy = (GLYPHS.focus.y - GLYPHS.vb.y) * s;
  const strokeW = 1 / s; // scale(1) 时约 1px

  strokePaths.forEach((p) => p.setAttribute('stroke-width', strokeW));
  refLines.forEach((ln) => ln.setAttribute('stroke-width', strokeW));
  word.style.transformOrigin = `${ox}px ${oy}px`;
  sub.style.top = (window.innerHeight * 0.45 + H / 2 + 24) + 'px';

  // 镜头拉远关键帧：transform-origin 位于 X 交叉点，末尾平移把单词归到屏幕中央（左右留白相等）
  const style = el('style');
  style.textContent =
    '@keyframes introZoom{' +
    '0%{transform:translate(' + (-ox) + 'px,' + (-oy) + 'px) scale(7);}' +
    '35%{transform:translate(' + (-ox - 6) + 'px,' + (-oy + 4) + 'px) scale(5.6);}' +
    '100%{transform:translate(' + (-W / 2) + 'px,' + (-H / 2) + 'px) scale(1);}' +
    '}';
  document.head.appendChild(style);

  // 解除暂停：全部动画从同一时刻开始
  overlay.classList.remove('intro-paused');

  return { overlay, move, word, sub, style };
}

function startIntro() {
  try { localStorage.setItem(INTRO_SEEN_KEY, '1'); } catch { /* 忽略 */ }
  const intro = buildIntro();

  loadDemands(); // 动画开始即请求列表，结束时首页已有内容

  // 2080–2480ms FLIP：单词从屏幕中央缩到顶栏 logo 实际位置（基于修正后的真实尺寸）
  setTimeout(() => {
    const logo = document.querySelector('#brand-title .brand-logo');
    const start = intro.word.getBoundingClientRect();
    let end = null;
    if (logo) end = logo.getBoundingClientRect();
    if (!end || !end.width || !start.width) { finishIntro(intro); return; }
    const dx = end.left - start.left;
    const dy = end.top - start.top;
    const sc = end.width / start.width;
    intro.move.style.transformOrigin = `${start.left}px ${start.top}px`;
    intro.move.style.transition = 'transform 400ms cubic-bezier(.4, 0, .2, 1)';
    void intro.move.offsetWidth; // 强制 reflow，确保过渡生效
    intro.move.style.transform = `translate(${dx}px, ${dy}px) scale(${sc})`;
  }, 2080);

  setTimeout(() => { intro.word.style.opacity = '0'; }, 2460);
  setTimeout(() => finishIntro(intro), 2520);
}

function finishIntro(intro) {
  document.body.classList.remove('intro-playing');
  if (intro.overlay.parentNode) intro.overlay.parentNode.removeChild(intro.overlay);
  if (intro.style.parentNode) intro.style.parentNode.removeChild(intro.style);
  const hashId = detailIdFromHash();
  if (hashId) openDetailById(hashId);
}

/* ================= 初始化 ================= */
function init() {
  lang = detectLang();
  COPY = I18N[lang];
  state.openOnly = readOpenOnly();

  renderStatic();
  buildTabs();
  buildPublishForm();

  document.querySelectorAll('#lang-switch button').forEach((b) => {
    b.addEventListener('click', () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); });
  });

  const openOnlySwitch = $('#open-only');
  if (openOnlySwitch) openOnlySwitch.addEventListener('click', () => setOpenOnly(!state.openOnly));

  $('#btn-publish').addEventListener('click', openPublish);
  $('#btn-mine').addEventListener('click', openMine);
  $('#fab-publish').addEventListener('click', openPublish);
  $('#glass-mine').addEventListener('click', openMine);
  $('#glass-search-btn').addEventListener('click', toggleGlassSearch);

  bindSearch($('#search'));
  bindSearch($('#glass-search'));

  ['#tabs', '#glass-tabs'].forEach((sel) => {
    const t = $(sel);
    if (t) t.addEventListener('scroll', updateTabsFade, { passive: true });
  });
  window.addEventListener('resize', updateTabsFade);

  backdropClick('#modal-detail', '.sheet');
  backdropClick('#modal-publish', '.sheet');
  backdropClick('#modal-mine', '.sheet');
  backdropClick('#modal-success', '.sheet');
  backdropClick('#modal-confirm', '.sheet');
  backdropClick('#modal-manual', '.sheet');
  backdropClick('#modal-report', '.sheet');

  window.addEventListener('popstate', handlePopState);
  window.addEventListener('scroll', updateGlassbar, { passive: true });
  window.addEventListener('hashchange', () => {
    const adminMode = document.body.classList.contains('admin');
    if (isAdminHash()) { if (!adminMode) enterAdmin(); }
    else if (adminMode) exitAdmin();
  });

  setupViewportGuard();

  buildBrandLogo();

  // 同步语言切换按钮初始态
  setLang(lang);

  // Esc 仅关闭最上层弹窗（手动复制/确认 > 详情/成功 > 表单/我的）
  const MODAL_ORDER = ['#modal-manual', '#modal-confirm', '#modal-report', '#modal-detail', '#modal-success', '#modal-publish', '#modal-mine'];
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    for (const id of MODAL_ORDER) { const m = $(id); if (m && !m.hidden) { closeModal(id); return; } }
  });

  if (isAdminHash()) {
    enterAdmin();
  } else if (shouldPlayIntro()) {
    startIntro();
  } else {
    loadDemands();
    updateGlassbar();

    // 打开页面时若带 /#/d/<id> 深链接，自动加载并弹出该详情
    const hashId = detailIdFromHash();
    if (hashId) openDetailById(hashId);
  }
}

document.addEventListener('DOMContentLoaded', init);
