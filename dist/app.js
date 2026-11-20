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
    heroNoSamples: '（不含示例）',
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
    aboutTitle: '关于这面墙',
    aboutWhy: '群里的消息一刷就沉，需求发出去常常没人回。这面墙把需求按分类留下来，想帮忙的同学随时找得到。',
    aboutFx: '本站不提供换汇撮合，换汇请走银行等正规渠道。',
    aboutSafe: '交易前当面确认，别提前转账。',
    paneEmpty: '这里还没有需求',
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
    formDescriptionPlaceholder: '选填：时间、地点、数量等细节',
    formDescriptionPlaceholderTeam: '选填：比赛或课程名称、还差几人、你能做什么',
    formContact: '联系方式',
    formContactPlaceholder: '选填：微信号等。不填的话，大家可以给你发私信',
    formOptional: '（选填）',
    formPin: '设置 4 位数字口令',
    formPinPlaceholder: '4 位数字',
    formPinHint: '以后修改或撤下这条需求时用，别告诉别人',
    requiredPin: '请设置 4 位数字口令',
    formSubmit: '发布需求',
    formCancel: '取消',
    charCount: (n, max) => `${n}/${max}`,
    requiredCategory: '请选择一个分类',
    requiredField: '请填写完整内容',
    successTitle: '已发布',
    successHint: '已发布。换了浏览器或手机时，在帖子详情页点「我是发帖人」，输入你的口令就能找回',
    done: '完成',
    mineTitle: '我的发布',
    mineEmpty: '本机还没有发布记录。发布需求后会自动出现在这里。',
    mineHint: '本机发的需求会显示在这里。换了浏览器或手机？在帖子详情页点「我是发帖人」，输入口令找回',
    claimEntry: '旧帖子用管理码找回',
    claimLabel: '管理码',
    claimPlaceholder: '粘贴发布时保存的管理码',
    claimSubmit: '找回',
    claimCancel: '取消',
    claimEmpty: '请输入管理码',
    claimWrong: '管理码不正确，找不到对应需求。',
    claimDone: '已找回，加入本机「我的发布」',
    ownerEntry: '我是发帖人',
    pinTitle: '我是发帖人',
    pinHint: '输入发帖时设置的 4 位数字口令，找回后可以在「我的发布」里改状态或撤下。',
    pinLabel: '4 位数字口令',
    pinSubmit: '确认',
    pinCancel: '取消',
    pinDone: '已加入我的发布',
    pinFormat: '请输入 4 位数字',
    pinWrong: '口令不对。同一条需求累计错 5 次会锁定 1 小时。',
    pinLocked: '口令错误次数太多，这条需求已锁定 1 小时，请稍后再试。',
    pinNotSet: '这条需求发布时还没有口令功能，请在「我的发布」里用管理码找回。',
    pinNotConfigured: '口令功能暂时不可用，请稍后再试。',
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
    errManageToken: '本机保存的发帖凭据已失效，请在详情页点「我是发帖人」重新找回。',
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
    shareCtaNoContact: '👉 查看详情，可以给 TA 发私信：',
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
    adminTabReports: '举报列表',
    adminTabAll: '全部需求',
    adminSearchPlaceholder: '按标题或描述搜索',
    adminAllEmpty: '还没有需求',
    adminNoMatch: '没有匹配的需求',
    adminAllCount: (n, total) => (n === total ? `共 ${total} 条` : `匹配 ${n} / ${total} 条`),
    adminAllLoadError: '加载需求列表失败',
    adminReplyCounts: (pub, priv) => `回复 ${pub} · 私信 ${priv}`,
    adminShowReplies: '查看回复',
    adminHideReplies: '收起回复',
    adminRepliesEmpty: '暂无回复或私信',
    adminRepliesLoadError: '加载回复失败',
    adminReplyPublic: '公开',
    adminReplyPrivate: '私信',
    adminReplyReported: (n) => `被举报 ${n} 次`,
    adminSample: '示例',
    adminNoDescription: '（无描述）',
    adminDeleteDemandConfirm: (t) => `将永久删除需求「${t}」及其全部回复和私信，无法恢复。确定删除？`,
    adminDeleteReplyConfirm: '将永久删除这条回复，无法恢复。确定删除？',
    adminDeleteReplyTitle: '删除回复',
    adminReplyDeleted: '回复已删除',
    repliesTitle: '回复',
    repliesCount: (n) => `回复 ${n}`,
    repliesEmpty: '还没有回复，来说第一句吧',
    repliesLoadError: '回复加载失败',
    replyAnon: '匿名同学',
    replyOwner: '发布者',
    replyPlaceholder: '问问细节，或者说说你能怎么帮…',
    replyPrivate: '仅发帖人可见',
    replySend: '发送',
    replySent: '已发送',
    replySentPrivate: '私信已发送，只有发帖人能看到',
    replyEmptyBody: '请先写点内容',
    replyNoContact: '发帖人没留联系方式，可以发私信给 TA',
    replyAsOwner: '你是发帖人，回复会带「发布者」标签并公开显示',
    replyReport: '举报',
    replyReported: '已举报，感谢反馈',
    replyReportAlready: '你已经举报过这条回复',
    replyErrInvalid: '回复需为 1–200 字',
    replyErrSample: '示例帖不能回复',
    privateCount: (n) => `私信 ${n}`,
    newReplies: (n) => `${n} 条新回复`,
    mineNewAria: (n) => `我的发布，${n} 条新回复`,
    aboutA2HS: '想天天用？用 Safari 或 Chrome 打开，添加到主屏幕。',
    privateNone: '暂无私信',
    privateTitle: '私信（仅你可见）',
    privateHide: '收起',
    privateLoadError: '私信加载失败',
    ownerReplyLabel: '以「发布者」身份公开回复',
    ownerReplyPlaceholder: '公开回复，所有人可见…',
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
    heroNoSamples: '(samples not counted)',
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
    aboutTitle: 'About this wall',
    aboutWhy: 'In group chats, requests get buried within minutes and often go unanswered. This wall keeps them sorted by category, so classmates who can help can always find them.',
    aboutFx: 'We don’t match currency exchanges. Please use banks or licensed channels.',
    aboutSafe: 'Meet in person first. Don’t pay in advance.',
    paneEmpty: 'Nothing posted here yet',
    detailTitle: 'Demand details',
    close: 'Close',
    viewContact: 'I can help · See contact',
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
    formDescriptionPlaceholder: 'Optional: time, place, quantity and other details',
    formDescriptionPlaceholderTeam: 'Optional: contest or course name, how many more people you need, what you can do',
    formContact: 'Contact',
    formContactPlaceholder: 'Optional: WeChat ID, etc. If left blank, people can send you private messages',
    formOptional: ' (optional)',
    formPin: 'Set a 4-digit PIN',
    formPinPlaceholder: '4 digits',
    formPinHint: 'You’ll need it to edit or remove this post later. Don’t share it.',
    requiredPin: 'Please set a 4-digit PIN',
    formSubmit: 'Post',
    formCancel: 'Cancel',
    charCount: (n, max) => `${n}/${max}`,
    requiredCategory: 'Please choose a category',
    requiredField: 'Please fill in all fields',
    successTitle: 'Published',
    successHint: 'Published. On a new browser or phone, open the post, tap “I posted this” and enter your PIN to get it back.',
    done: 'Done',
    mineTitle: 'My Posts',
    mineEmpty: 'No posts on this device yet. Your published demands will appear here.',
    mineHint: 'Posts made on this device appear here. New browser or phone? Open the post, tap “I posted this” and enter your PIN.',
    claimEntry: 'Older posts: restore with management code',
    claimLabel: 'Management code',
    claimPlaceholder: 'Paste the code saved when posting',
    claimSubmit: 'Restore',
    claimCancel: 'Cancel',
    claimEmpty: 'Enter the management code',
    claimWrong: 'Incorrect code; no matching demand.',
    claimDone: 'Restored to “My Posts” on this device',
    ownerEntry: 'I posted this',
    pinTitle: 'I posted this',
    pinHint: 'Enter the 4-digit PIN you set when posting. You can then change its status or remove it in “My Posts”.',
    pinLabel: '4-digit PIN',
    pinSubmit: 'Confirm',
    pinCancel: 'Cancel',
    pinDone: 'Added to My Posts',
    pinFormat: 'Enter 4 digits',
    pinWrong: 'Wrong PIN. 5 wrong tries lock this post for 1 hour.',
    pinLocked: 'Too many wrong tries. This post is locked for 1 hour. Please try again later.',
    pinNotSet: 'This post was made before PINs existed. Restore it with its management code in “My Posts”.',
    pinNotConfigured: 'PINs are temporarily unavailable. Please try again later.',
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
    errManageToken: 'The post credentials saved on this device are no longer valid. Open the post and tap “I posted this” to restore it.',
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
    shareCtaNoContact: '👉 View details and send a private message: ',
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
    adminTabReports: 'Reports',
    adminTabAll: 'All demands',
    adminSearchPlaceholder: 'Search title or description',
    adminAllEmpty: 'No demands yet',
    adminNoMatch: 'No matching demands',
    adminAllCount: (n, total) => (n === total ? `${total} total` : `${n} of ${total} match`),
    adminAllLoadError: 'Failed to load demands',
    adminReplyCounts: (pub, priv) => `${pub} replies · ${priv} private`,
    adminShowReplies: 'Show replies',
    adminHideReplies: 'Hide replies',
    adminRepliesEmpty: 'No replies or private messages',
    adminRepliesLoadError: 'Failed to load replies',
    adminReplyPublic: 'Public',
    adminReplyPrivate: 'Private',
    adminReplyReported: (n) => `reported ${n} times`,
    adminSample: 'Sample',
    adminNoDescription: '(no description)',
    adminDeleteDemandConfirm: (t) => `This permanently deletes "${t}" with all its replies and private messages. It cannot be undone. Delete it?`,
    adminDeleteReplyConfirm: 'This permanently deletes the reply. It cannot be undone. Delete it?',
    adminDeleteReplyTitle: 'Delete reply',
    adminReplyDeleted: 'Reply deleted',
    repliesTitle: 'Replies',
    repliesCount: (n) => `Replies ${n}`,
    repliesEmpty: 'No replies yet. Be the first to say something.',
    repliesLoadError: 'Could not load replies',
    replyAnon: 'Anonymous student',
    replyOwner: 'Poster',
    replyPlaceholder: 'Ask for details, or say how you can help…',
    replyPrivate: 'Only the poster can see this',
    replySend: 'Send',
    replySent: 'Sent',
    replySentPrivate: 'Private message sent. Only the poster can see it.',
    replyEmptyBody: 'Please write something first',
    replyNoContact: 'The poster left no contact. You can send them a private message.',
    replyAsOwner: 'You posted this. Your reply is public and tagged “Poster”.',
    replyReport: 'Report',
    replyReported: 'Reported. Thanks for the feedback.',
    replyReportAlready: 'You already reported this reply',
    replyErrInvalid: 'Replies must be 1–200 characters',
    replyErrSample: 'Sample posts can’t be replied to',
    privateCount: (n) => `Private messages ${n}`,
    newReplies: (n) => `${n} new ${n === 1 ? 'reply' : 'replies'}`,
    mineNewAria: (n) => `My Posts, ${n} new ${n === 1 ? 'reply' : 'replies'}`,
    aboutA2HS: 'Using it every day? Open it in Safari or Chrome and add it to your Home Screen.',
    privateNone: 'No private messages yet',
    privateTitle: 'Private messages (only you can see)',
    privateHide: 'Hide',
    privateLoadError: 'Could not load private messages',
    ownerReplyLabel: 'Reply publicly as the poster',
    ownerReplyPlaceholder: 'Public reply, visible to everyone…',
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
const LIMITS = { title: 40, description: 500, contact: 50, reply: 200 };
const REPLY_REPORTED_KEY = 'xmum_demand_wall_reply_reported'; // 本机举报过的回复，用于同设备去重
const replyDrafts = new Map(); // 切换语言重建详情时保留未发送的回复草稿：demandId -> { body, isPrivate }
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
  pinDemand: null, // 「我是发帖人」口令弹窗的目标需求（切换语言时重建）
  lastShareDemand: null, // 成功弹窗的分享文案在切换语言时重建
  loaded: false, // 首次加载完成前，hero 数字显示灰色占位块
  adminKey: null, // 管理页输入的 ADMIN_KEY（仅存内存）
  adminView: 'reports', // 管理页当前列表：reports | all
  adminDemands: [], // 管理页「全部需求」缓存（仅内存）
  adminQuery: '', // 管理页搜索词
  reportDemand: null, // 当前举报目标需求
};

/* 桌面三栏（≥1024px）：详情显示在右栏面板而不是弹窗。
   paneExplicit：右栏内容是用户点选/深链接打开的（true），还是「没选中时默认显示最新一条」（false）。 */
const WIDE_MQ = window.matchMedia('(min-width: 1024px)');
const isWide = () => WIDE_MQ.matches;
let paneExplicit = false;

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

// 「有没有联系方式」：有 contact 原文（如刚发布的自己的帖）就按去首尾空格后是否为空字符串判断；
// 否则用服务端按同一规则算出的 has_contact。
function demandHasContact(d) {
  if (!d) return false;
  if (typeof d.contact === 'string') return d.contact.trim() !== '';
  return d.has_contact !== false;
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

/* ================= 新回复提醒 ================= */
// 本机记录「我的发布」每条上次查看时的回复数：{ [id]: { p: 公开回复数, s: 私信数 } }。
// 公开回复数由服务端算好，不含发布者自己的回复，所以自己回复不会触发提醒。
const SEEN_KEY = 'xmum_demand_wall_reply_seen';
const COUNTS_BATCH = 20; // 与服务端单次上限一致
const COUNTS_MIN_GAP_MS = 15000; // 前端节流：频繁切回页面也不会撞上服务端每分钟 10 次的限流
const replyCounts = new Map(); // id -> { p, s }：最近一次从服务端拿到的数
const pendingRead = new Set(); // 计数还没拿到时就打开了的帖子，拿到后直接记为已读
let countsLastAt = 0;
let countsInflight = null;

const countNum = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
function readSeen() {
  try {
    const o = JSON.parse(localStorage.getItem(SEEN_KEY) || '{}');
    return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
  } catch { return {}; }
}
function writeSeen(o) {
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(o)); } catch { /* 忽略 */ }
}
// 刚发布的帖子：基线记为 0，之后的每条回复都算新回复
function initSeen(id) {
  const seen = readSeen();
  seen[id] = { p: 0, s: 0 };
  writeSeen(seen);
}
function forgetSeen(id) {
  const seen = readSeen();
  delete seen[id];
  writeSeen(seen);
  replyCounts.delete(id);
  pendingRead.delete(id);
}
function newReplyCount(id, seen) {
  const c = replyCounts.get(id);
  const s = seen[id];
  if (!c || !s) return 0;
  return Math.max(0, c.p - countNum(s.p)) + Math.max(0, c.s - countNum(s.s));
}

// 打开某条自己帖子的详情或私信列表：整条记为已读
function markRepliesRead(id) {
  if (!mineTokenFor(id)) return;
  const c = replyCounts.get(id);
  if (!c) { pendingRead.add(id); return; }
  const seen = readSeen();
  seen[id] = { p: c.p, s: c.s };
  writeSeen(seen);
  updateReplyBadges();
}

async function refreshReplyCounts(force) {
  const mine = readMine().slice(0, COUNTS_BATCH);
  if (!mine.length) { replyCounts.clear(); updateReplyBadges(); return; }
  if (countsInflight) return countsInflight;
  if (!force && Date.now() - countsLastAt < COUNTS_MIN_GAP_MS) return;
  countsLastAt = Date.now();
  countsInflight = (async () => {
    try {
      const data = await request('/api/my/reply-counts', {
        method: 'POST',
        body: JSON.stringify(mine.map((m) => ({ id: m.id, token: m.token }))),
      });
      const seen = readSeen();
      const mineIds = new Set(readMine().map((m) => m.id));
      const next = {};
      replyCounts.clear();
      for (const x of Array.isArray(data) ? data : []) {
        if (!x || typeof x.id !== 'string' || !mineIds.has(x.id)) continue;
        const c = { p: countNum(x.public_count), s: countNum(x.private_count) };
        replyCounts.set(x.id, c);
        const s = seen[x.id];
        if (!s || pendingRead.has(x.id)) next[x.id] = { p: c.p, s: c.s }; // 第一次见到（如找回的旧帖）不提醒历史回复
        else next[x.id] = { p: Math.min(countNum(s.p), c.p), s: Math.min(countNum(s.s), c.s) }; // 有回复被隐藏时下调基线
        pendingRead.delete(x.id);
      }
      // 本次没返回的（超出 20 条、暂时取不到）保留原记录；已不在「我的发布」里的清掉
      for (const [id, s] of Object.entries(seen)) if (!(id in next) && mineIds.has(id)) next[id] = s;
      writeSeen(next);
    } catch { /* 静默失败：提醒只是锦上添花，不打扰用户 */ }
    finally {
      countsInflight = null;
      updateReplyBadges();
    }
  })();
  return countsInflight;
}

function syncMineNewTag(item, n) {
  let tag = item.querySelector('.mine-item-new');
  if (n > 0) {
    if (!tag) {
      tag = el('span', 'mine-item-new');
      const top = item.querySelector('.mine-item-top');
      if (top) top.appendChild(tag); else item.prepend(tag);
    }
    tag.textContent = COPY.newReplies(n);
  } else if (tag) tag.remove();
}

// 红点：手机端顶栏、玻璃浮层顶栏、桌面端左栏的「我的发布」按钮，以及弹窗里的帖子卡片
function updateReplyBadges() {
  const seen = readSeen();
  let total = 0;
  for (const m of readMine()) total += newReplyCount(m.id, seen);
  ['#btn-mine', '#glass-mine', '#side-mine'].forEach((sel) => {
    const b = $(sel);
    if (!b) return;
    if (total > 0) {
      b.dataset.badge = total > 99 ? '99+' : String(total);
      b.setAttribute('aria-label', COPY.mineNewAria(total));
    } else {
      delete b.dataset.badge;
      b.removeAttribute('aria-label');
    }
  });
  document.querySelectorAll('#modal-mine .mine-item[data-id]').forEach((item) => {
    syncMineNewTag(item, newReplyCount(item.dataset.id, seen));
  });
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
  updateSideCounts();
  if (isWide() && !paneExplicit) { const h = $('#pane-sheet'); if (h) h.innerHTML = ''; }
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

function sortedFeed() {
  return filterDemands().slice().sort((a, b) => {
    const ra = rankOf(a), rb = rankOf(b);
    if (ra !== rb) return ra - rb;
    return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0; // 同组内时间倒序
  });
}

function renderFeed() {
  const feed = $('#feed');
  feed.innerHTML = '';
  const list = sortedFeed();
  if (!list.length) feed.appendChild(emptyState());
  else list.forEach((d) => feed.appendChild(listItem(d)));
  tearAnimateIds.clear();
  updateHero();
  updateSideCounts();
  syncPane();
}

/* ================= 桌面右栏详情面板 ================= */
function markActiveItem() {
  const id = isWide() ? state.activeId : null;
  document.querySelectorAll('#feed .item[data-id]').forEach((it) => {
    const on = it.dataset.id === id;
    it.classList.toggle('item--active', on);
    if (on) it.setAttribute('aria-current', 'true'); else it.removeAttribute('aria-current');
  });
}

function renderPaneState(kind) {
  const host = $('#pane-sheet');
  if (!host) return;
  host.innerHTML = '';
  if (kind === 'loading') { host.appendChild(loadingNode()); return; }
  const box = el('div', 'feed-state');
  const art = el('div', 'state-art');
  art.innerHTML = SVG_EMPTY;
  box.appendChild(art);
  box.appendChild(el('p', null, COPY.paneEmpty));
  const btn = el('button', 'btn btn-primary', COPY.headerPublish);
  btn.type = 'button';
  btn.addEventListener('click', openPublish);
  box.appendChild(btn);
  host.appendChild(box);
}

// 让右栏和信息流保持一致：
// - 用户点选过的需求：一直显示它；状态被改动（如我的发布里改成已接单）时用新数据重建。
// - 没选中：显示当前筛选结果里最新发布的一条；列表为空时显示空状态。
// 同一条且状态没变时不重建，避免已展开的联系方式、回复区被刷掉。force=true 时总是重建（切换语言）。
function syncPane(force) {
  if (!isWide()) return;
  if (!state.loaded) { if (!state.activeData) renderPaneState('loading'); return; }
  if (paneExplicit && state.activeData) {
    const fresh = state.demands.find((x) => x.id === state.activeData.id);
    if (force || (fresh && fresh.status !== state.activeData.status)) {
      if (fresh) state.activeData = { ...state.activeData, ...fresh };
      buildDetail(state.activeData);
    }
    markActiveItem();
    return;
  }
  paneExplicit = false;
  const list = sortedFeed();
  const latest = list.reduce((a, b) => (!a || b.created_at > a.created_at ? b : a), null);
  if (!latest) {
    state.activeId = null; state.activeData = null; state.activeContact = null;
    renderPaneState('empty');
  } else if (force || state.activeId !== latest.id || !state.activeData || state.activeData.status !== latest.status) {
    state.activeId = latest.id; state.activeData = latest; state.activeContact = null;
    buildDetail(latest);
  }
  markActiveItem();
}

// 取消右栏的点选（URL 回到 /），右栏改回默认的最新一条
function clearPaneSelection() {
  paneExplicit = false;
  state.activeId = null; state.activeData = null; state.activeContact = null;
  if (detailIdFromHash()) { try { history.replaceState(null, '', baseHashUrl()); } catch { /* 忽略 */ } }
  syncPane();
}

// 跨越 1024px 断点：弹窗中的详情搬到右栏，或右栏里点选的详情改用弹窗打开
function handleWideChange() {
  const modal = $('#modal-detail');
  if (isWide()) {
    if (!modal.hidden) {
      modal.hidden = true;
      document.body.style.overflow = '';
      paneExplicit = !!state.activeData;
    } else {
      paneExplicit = false;
      state.activeId = null; state.activeData = null; state.activeContact = null;
    }
    detailPushed = false;
    if (paneExplicit) buildDetail(state.activeData);
    syncPane();
  } else {
    const picked = paneExplicit && state.activeData;
    paneExplicit = false;
    const host = $('#pane-sheet');
    if (host) host.innerHTML = '';
    if (picked) { buildDetail(state.activeData); openModal('#modal-detail'); }
    else { state.activeId = null; state.activeData = null; state.activeContact = null; }
    markActiveItem();
  }
}

// 详情里会打开另一个弹窗的操作（去发布 / 我的发布）：手机/平板先关掉详情弹窗，桌面右栏保持不动
function leaveDetailForDialog() {
  if (!isWide()) closeModal('#modal-detail');
}

/* ================= 左栏分类列表 ================= */
function buildSideCats() {
  const nav = $('#side-cats');
  if (!nav) return;
  nav.innerHTML = '';
  const mk = (key, label, stamp) => {
    const b = el('button', 'side-cat');
    b.type = 'button';
    b.dataset.cat = key;
    if (state.category === key) { b.classList.add('active'); b.setAttribute('aria-current', 'true'); }
    b.append(stamp, el('span', 'side-cat-label', label), el('span', 'side-cat-count'));
    b.addEventListener('click', () => setCategory(key));
    nav.appendChild(b);
  };
  const all = el('span', 'stamp', '全');
  all.style.background = '#E9EDF2';
  all.style.color = '#14304F';
  mk('all', COPY.tabAll, all);
  CATEGORY_KEYS.forEach((key) => mk(key, COPY.categories[key], categoryStamp(key)));
  updateSideCounts();
}

// 分类后的数字：该分类当前可见的条数（跟随「只看进行中」，不跟随搜索词）
function updateSideCounts() {
  const nav = $('#side-cats');
  if (!nav) return;
  const pool = state.demands.filter((d) => !state.openOnly || (d.status === 'open' && !isOverdue(d)));
  nav.querySelectorAll('.side-cat').forEach((b) => {
    const n = b.dataset.cat === 'all' ? pool.length : pool.filter((d) => d.category === b.dataset.cat).length;
    const c = b.querySelector('.side-cat-count');
    if (c) c.textContent = state.loaded ? String(n) : '';
  });
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
  it.dataset.id = d.id;
  if (isWide() && state.activeId === d.id) { it.classList.add('item--active'); it.setAttribute('aria-current', 'true'); }
  it.setAttribute('role', 'button');
  it.tabIndex = 0;
  it.setAttribute('aria-label', d.title);
  if (d.status === 'done') it.classList.add('item--done'); // 已完成整体降低透明度

  it.appendChild(categoryStamp(d.category));

  const body = el('div', 'item-body');
  body.appendChild(el('h3', 'item-title', d.title));
  if (d.description) body.appendChild(el('p', 'item-desc', d.description));

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
  return { open, matched, real: real.length, samples: state.demands.length - real.length };
}
function updateHero() {
  const c = heroCounts();
  const loading = !state.loaded;
  const launched = state.loaded && c.real === 0;
  // 手机端开场区 #hero 与桌面左栏 #side-hero 共用同一套文案
  document.querySelectorAll('#hero, #side-hero').forEach((hero) => {
    const l1 = $('.hero-line1', hero), l2 = $('.hero-line2', hero), l3 = $('.hero-line3', hero);
    hero.classList.toggle('hero--skeleton', loading);
    if (l1) l1.textContent = loading ? '' : (launched ? COPY.heroLaunch1 : COPY.heroOpen(c.open));
    if (l2) l2.textContent = loading ? '' : (launched ? COPY.heroLaunch2 : COPY.heroNeed(c.open));
    if (l3) {
      l3.textContent = loading || launched ? '' : COPY.heroDone(c.matched);
      // 计数只含真实帖；列表里仍有示例帖时加灰色说明，避免误解
      if (!loading && c.real > 0 && c.samples > 0) l3.appendChild(el('span', 'hero-note', COPY.heroNoSamples));
    }
  });
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
  if (id === '#modal-pin') { $('#modal-pin').querySelector('.sheet').innerHTML = ''; state.pinDemand = null; }
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
  markRepliesRead(d.id); // 自己的帖子：打开详情即记为已读
  state.activeId = d.id;
  state.activeContact = null;
  state.activeData = d;
  if (isWide()) {
    // 桌面三栏：显示在右栏，不弹窗
    paneExplicit = true;
    buildDetail(d);
    markActiveItem();
    return;
  }
  buildDetail(d);
  openModal('#modal-detail');
}

// 点击条目：push 一条历史，使返回键/关闭都能把 URL 恢复成 /
function openDetail(d) {
  if (isWide()) {
    // 右栏里连续切换多条时只替换 URL，不堆历史；从「未选中」进入时 push 一条，返回键可回到默认
    if (paneExplicit && state.activeId === d.id) return;
    try {
      if (detailIdFromHash()) history.replaceState({ dw: d.id }, '', detailHashUrl(d.id));
      else history.pushState({ dw: d.id }, '', detailHashUrl(d.id));
    } catch { /* 忽略 */ }
    detailPushed = false;
    showDetail(d);
    return;
  }
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
    if (isWide()) { paneExplicit = false; state.activeId = null; state.activeData = null; }
    renderFeed();
  }
}

function handlePopState() {
  const id = detailIdFromHash();
  if (isWide()) {
    if (id) { if (!paneExplicit || state.activeId !== id) openDetailById(id); }
    else if (paneExplicit) clearPaneSelection();
    detailPushed = false;
    return;
  }
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
  const inPane = isWide();
  const sheet = inPane ? $('#pane-sheet') : $('#modal-detail .sheet');
  sheet.innerHTML = '';
  if (inPane) sheet.scrollTop = 0;

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.detailTitle));
  if (!inPane) { // 右栏常驻，不需要关闭按钮
    const close = el('button', 'icon-btn', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', COPY.close);
    close.addEventListener('click', () => closeModal('#modal-detail'));
    head.appendChild(close);
  }

  const meta = el('div', 'detail-meta');
  meta.appendChild(categoryStamp(d.category));
  meta.appendChild(el('span', 'detail-cat', COPY.categories[d.category] || d.category));
  if (d.is_sample) meta.appendChild(el('span', 'tag-sample', COPY.sampleTag));
  if (d.status !== 'open') meta.appendChild(el('span', 'detail-status', COPY.status[d.status]));

  const title = el('h3', 'detail-title', d.title);
  const desc = d.description ? el('p', 'detail-desc', d.description) : null; // 描述选填：为空则不显示段落
  const time = el('p', 'detail-time', relTime(d.created_at));

  // 没留联系方式的真实帖：不显示「我能帮，看联系方式」，改由回复区引导发私信
  const noContact = !d.is_sample && !demandHasContact(d);
  const contactBox = el('div', 'contact-box');
  if (noContact) {
    contactBox.hidden = true;
  } else if (d.is_sample) {
    // 示例帖：不获取联系方式、不可举报，引导发布真实需求
    contactBox.appendChild(el('p', 'sample-note', COPY.sampleNote));
    const btnPost = el('button', 'btn btn-secondary btn-block', COPY.publishTitle);
    btnPost.type = 'button';
    btnPost.addEventListener('click', () => { leaveDetailForDialog(); openPublish(); });
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
  const btnOwner = el('button', 'btn-report', COPY.ownerEntry);
  btnOwner.type = 'button';
  btnOwner.addEventListener('click', () => openPinClaim(d));
  const btnReport = el('button', 'btn-report', COPY.report);
  btnReport.type = 'button';
  btnReport.addEventListener('click', () => openReport(d));
  reportRow.append(btnOwner, btnReport);

  if (d.is_sample) sheet.append(...[head, meta, title, desc, time, contactBox, shareWrap].filter(Boolean));
  else sheet.append(...[head, meta, title, desc, time, contactBox, shareWrap, buildReplies(d, noContact), reportRow].filter(Boolean));
}

/* ================= 回复（公开回复 + 仅发帖人可见的私信） ================= */
function replyErrText(err) {
  const code = (err && err.code) || 'generic';
  if (code === 'invalid_input') return COPY.replyErrInvalid;
  if (code === 'sample_post') return COPY.replyErrSample;
  if (code === 'rate_limited') return COPY.errRateLimited;
  if (code === 'manage_token_invalid') return COPY.errManageToken;
  if (code === 'not_found') return COPY.errNotFound;
  if (code === 'network') return COPY.errNetwork;
  return COPY.errGeneric;
}

function mineTokenFor(id) {
  const m = readMine().find((x) => x.id === id);
  return m ? m.token : null;
}

// 单条回复：标签 + 相对时间 + 低调「举报」+ 正文，全部 textContent
function replyItem(r, opts) {
  const o = opts || {};
  const item = el('div', 'reply-item');
  const top = el('div', 'reply-top');
  if (!o.hideTag) top.appendChild(el('span', r.is_owner ? 'reply-tag reply-tag--owner' : 'reply-tag', r.is_owner ? COPY.replyOwner : COPY.replyAnon));
  top.appendChild(el('span', 'reply-time', relTime(r.created_at)));
  if (!r.is_owner && !readSet(REPLY_REPORTED_KEY).has(r.id)) {
    const btn = el('button', 'btn-report reply-report', COPY.replyReport);
    btn.type = 'button';
    btn.addEventListener('click', () => reportReply(r, btn));
    top.appendChild(btn);
  }
  item.append(top, el('p', 'reply-body', r.body));
  return item;
}

async function reportReply(r, btn) {
  if (readSet(REPLY_REPORTED_KEY).has(r.id)) { toast(COPY.replyReportAlready); btn.remove(); return; }
  btn.disabled = true;
  try {
    await request(`/api/replies/${r.id}/report`, { method: 'POST' });
    addToSet(REPLY_REPORTED_KEY, r.id);
    btn.remove();
    toast(COPY.replyReported);
  } catch (err) {
    if (err.code === 'already_reported') { addToSet(REPLY_REPORTED_KEY, r.id); btn.remove(); toast(COPY.replyReportAlready); return; }
    btn.disabled = false;
    toast(err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.reportFailed);
  }
}

function renderReplyList(list, replies) {
  list.innerHTML = '';
  if (!replies.length) { list.appendChild(el('p', 'reply-empty', COPY.repliesEmpty)); return; }
  replies.forEach((r) => list.appendChild(replyItem(r)));
}

async function loadReplies(d, list, heading) {
  list.innerHTML = '';
  list.appendChild(loadingNode());
  try {
    const data = await request(`/api/demands/${d.id}/replies`);
    if (state.activeId !== d.id) return; // 弹窗已切走
    const replies = Array.isArray(data) ? data : [];
    heading.textContent = replies.length ? COPY.repliesCount(replies.length) : COPY.repliesTitle;
    renderReplyList(list, replies);
  } catch {
    list.innerHTML = '';
    const err = el('p', 'reply-empty', COPY.repliesLoadError + ' · ');
    const retry = el('button', 'btn-report', COPY.retry);
    retry.type = 'button';
    retry.addEventListener('click', () => loadReplies(d, list, heading));
    err.appendChild(retry);
    list.appendChild(err);
  }
}

// 回复输入框（详情页与「我的发布」共用）：textarea + 字数统计 + 可选「仅发帖人可见」+ 发送
function replyComposer({ placeholder, showPrivate, privateDefault, draftKey, onSend }) {
  const box = el('div', 'reply-form');
  const ta = el('textarea', 'textarea reply-input');
  ta.placeholder = placeholder;
  ta.maxLength = LIMITS.reply;
  ta.rows = 3;
  const draft = draftKey ? replyDrafts.get(draftKey) : null;
  if (draft) ta.value = draft.body;
  const count = el('span', 'char-count', COPY.charCount(ta.value.length, LIMITS.reply));
  const row = el('div', 'reply-form-row');
  let cb = null;
  if (showPrivate) {
    const lbl = el('label', 'reply-private');
    cb = el('input');
    cb.type = 'checkbox';
    cb.checked = draft ? draft.isPrivate : !!privateDefault;
    lbl.append(cb, el('span', null, COPY.replyPrivate));
    row.appendChild(lbl);
  } else {
    row.appendChild(el('span'));
  }
  const send = el('button', 'btn btn-primary btn-sm', COPY.replySend);
  send.type = 'button';
  row.appendChild(send);
  const saveDraft = () => { if (draftKey) replyDrafts.set(draftKey, { body: ta.value, isPrivate: cb ? cb.checked : false }); };
  ta.addEventListener('input', () => {
    count.textContent = COPY.charCount(ta.value.length, LIMITS.reply);
    count.classList.toggle('over', ta.value.length >= LIMITS.reply);
    saveDraft();
  });
  if (cb) cb.addEventListener('change', saveDraft);
  send.addEventListener('click', async () => {
    const body = ta.value.trim();
    if (!body) { toast(COPY.replyEmptyBody); return; }
    send.disabled = true;
    const original = send.textContent;
    send.textContent = '…';
    try {
      await onSend(body, cb ? cb.checked : false);
      ta.value = '';
      count.textContent = COPY.charCount(0, LIMITS.reply);
      count.classList.remove('over');
      if (draftKey) replyDrafts.delete(draftKey);
    } catch (err) {
      toast(replyErrText(err));
    } finally {
      send.disabled = false;
      send.textContent = original;
    }
  });
  box.append(ta, count, row);
  return box;
}

function buildReplies(d, noContact) {
  const section = el('section', 'replies');
  const heading = el('h4', 'replies-title', COPY.repliesTitle);
  const list = el('div', 'reply-list');
  section.append(heading, list);

  const token = mineTokenFor(d.id);
  if (token) section.appendChild(el('p', 'reply-hint', COPY.replyAsOwner));
  else if (noContact) section.appendChild(el('p', 'reply-hint reply-hint--strong', COPY.replyNoContact));

  section.appendChild(replyComposer({
    placeholder: token ? COPY.ownerReplyPlaceholder : COPY.replyPlaceholder,
    showPrivate: !token,
    privateDefault: noContact,
    draftKey: d.id,
    onSend: async (body, isPrivate) => {
      const created = await request(`/api/demands/${d.id}/replies`, {
        method: 'POST',
        body: JSON.stringify({ body, is_private: isPrivate }),
        ...(token ? { headers: { 'x-manage-token': token } } : {}),
      });
      if (created && created.is_private) { toast(COPY.replySentPrivate); return; }
      toast(COPY.replySent);
      loadReplies(d, list, heading);
    },
  }));

  loadReplies(d, list, heading);
  return section;
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
    const contact = data && typeof data.contact === 'string' ? data.contact.trim() : '';
    if (!contact) throw Object.assign(new Error('no_contact'), { code: 'no_contact' });
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

/* ================= 我是发帖人（4 位数字口令认领） ================= */
// 口令输入框：遮蔽显示、数字键盘、只保留数字且最多 4 位（发布表单与认领弹窗共用）
function pinInput(id, autocomplete) {
  const input = el('input', 'input pin-input');
  input.id = id;
  input.type = 'password';
  input.setAttribute('inputmode', 'numeric');
  input.pattern = '[0-9]*';
  input.maxLength = 4;
  input.autocomplete = autocomplete;
  input.placeholder = COPY.formPinPlaceholder;
  input.addEventListener('input', () => {
    const v = input.value.replace(/[^0-9]/g, '').slice(0, 4);
    if (v !== input.value) input.value = v;
  });
  return input;
}
const PIN_RE = /^[0-9]{4}$/;

function openPinClaim(d) {
  // 本机已经有这条：直接打开「我的发布」
  if (mineTokenFor(d.id)) { leaveDetailForDialog(); openMine(); return; }
  state.pinDemand = d;
  buildPinSheet(d);
  openModal('#modal-pin');
  setTimeout(() => { try { $('#pin-input').focus(); } catch { /* 忽略 */ } }, 60);
}

function buildPinSheet(d) {
  const sheet = $('#modal-pin .sheet');
  sheet.innerHTML = '';

  const head = el('div', 'sheet-head');
  const h = el('h2', null, COPY.pinTitle);
  h.id = 'pin-title';
  head.appendChild(h);
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-pin'));
  head.appendChild(close);
  sheet.append(head, el('p', 'confirm-body', COPY.pinHint));

  const form = el('form');
  form.noValidate = true;
  const label = el('label', 'form-label', COPY.pinLabel);
  label.setAttribute('for', 'pin-input');
  const input = pinInput('pin-input', 'off');
  const errLine = el('p', 'pin-error');
  errLine.setAttribute('role', 'alert');
  errLine.hidden = true;

  const actions = el('div', 'form-actions');
  const btnCancel = el('button', 'btn btn-ghost', COPY.pinCancel);
  btnCancel.type = 'button';
  btnCancel.addEventListener('click', () => closeModal('#modal-pin'));
  const btnOk = el('button', 'btn btn-primary', COPY.pinSubmit);
  btnOk.type = 'submit';
  actions.append(btnCancel, btnOk);

  form.append(label, input, errLine, actions);
  form.addEventListener('submit', (e) => { e.preventDefault(); submitPinClaim(d, input, errLine, btnOk); });
  sheet.appendChild(form);
}

function pinErrText(code) {
  if (code === 'invalid_pin') return COPY.pinFormat;
  if (code === 'pin_invalid') return COPY.pinWrong;
  if (code === 'pin_locked') return COPY.pinLocked;
  if (code === 'pin_not_set') return COPY.pinNotSet;
  if (code === 'pin_not_configured') return COPY.pinNotConfigured;
  if (code === 'rate_limited') return COPY.errRateLimited;
  if (code === 'not_found') return COPY.errNotFound;
  if (code === 'network') return COPY.errNetwork;
  return COPY.errGeneric;
}

async function submitPinClaim(d, input, errLine, btn) {
  const pin = input.value;
  const showErr = (msg) => { errLine.textContent = msg; errLine.hidden = false; };
  if (!PIN_RE.test(pin)) { showErr(COPY.pinFormat); return; }
  errLine.hidden = true;
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = '…';
  try {
    const res = await request(`/api/demands/${d.id}/claim-pin`, { method: 'POST', body: JSON.stringify({ pin }) });
    if (!res || res.id !== d.id || typeof res.manage_token !== 'string') {
      throw Object.assign(new Error('invalid_response'), { code: 'invalid_response' });
    }
    addMine(res.id, res.manage_token);
    refreshReplyCounts(true); // 找回的帖子：拿到当前回复数作为基线
    closeModal('#modal-pin');
    leaveDetailForDialog();
    toast(COPY.pinDone);
    openMine();
  } catch (err) {
    input.value = '';
    showErr(pinErrText(err.code));
    try { input.focus(); } catch { /* 忽略 */ }
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
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
  lDesc.appendChild(el('span', 'optional', COPY.formOptional));
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
  lContact.appendChild(el('span', 'optional', COPY.formOptional));
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

  // 4 位数字口令（必填）
  const fPin = el('div', 'form-field');
  const lPin = el('label', 'form-label', COPY.formPin);
  lPin.setAttribute('for', 'publish-pin');
  lPin.appendChild(el('span', 'req', ' *'));
  const iPin = pinInput('publish-pin', 'new-password');
  fPin.append(lPin, iPin, el('p', 'field-hint', COPY.formPinHint));

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
  form.append(head, fHint, fCat, fTitle, fDesc, fContact, fPin, actions);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitPublish(btnSubmit, { iTitle, tDesc, iContact, iPin });
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
  if (!title) { toast(COPY.requiredField); return; }
  const pin = fields.iPin.value;
  if (!PIN_RE.test(pin)) { toast(COPY.requiredPin); try { fields.iPin.focus(); } catch { /* 忽略 */ } return; }

  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = '…';
  try {
    const created = await request('/api/demands', {
      method: 'POST',
      body: JSON.stringify({ category: selectedCategory, title, description, contact, pin }),
    });
    if (!created || typeof created.id !== 'string' || typeof created.manage_token !== 'string') {
      throw Object.assign(new Error('invalid_response'), { code: 'invalid_response' });
    }
    addMine(created.id, created.manage_token);
    initSeen(created.id);
    closeModal('#modal-publish');
    showSuccess(created);
    loadDemands();
  } catch (err) {
    toast(err.code === 'invalid_input' ? COPY.errInvalidInput
      : err.code === 'invalid_pin' ? COPY.requiredPin
      : err.code === 'pin_not_configured' ? COPY.pinNotConfigured
      : err.code === 'rate_limited' ? COPY.errRateLimited
      : err.code === 'network' ? COPY.errNetwork : COPY.errGeneric);
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}

// 管理码（manage_token）只存本机「我的发布」，不再展示给用户；找回靠「我是发帖人」+ 口令
function buildSuccess(demand) {
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

  const btnShare = el('button', 'btn btn-primary btn-block', COPY.shareBtn);
  btnShare.type = 'button';
  btnShare.addEventListener('click', () => copyShareText(buildShareText(demand), btnShare));

  const done = el('button', 'btn btn-ghost btn-block', COPY.done);
  done.type = 'button';
  done.style.marginTop = '16px';
  done.addEventListener('click', () => closeModal('#modal-success'));

  sheet.append(btnShare, done);
}

function showSuccess(demand) {
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
    ...(d.description ? [truncDesc(d.description)] : []),
    `${COPY.shareStatusPrefix}${st}`,
    `${d.is_sample || demandHasContact(d) ? COPY.shareCta : COPY.shareCtaNoContact}${deepLink(d.id)}`,
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
  refreshReplyCounts();

  const head = el('div', 'sheet-head');
  head.appendChild(el('h2', null, COPY.mineTitle));
  const close = el('button', 'icon-btn', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', COPY.close);
  close.addEventListener('click', () => closeModal('#modal-mine'));
  head.appendChild(close);
  sheet.appendChild(head);

  sheet.appendChild(el('p', 'detail-time', COPY.mineHint));

  // 旧帖找回入口（口令功能上线前发的帖子）：输入管理码 → 服务端校验 → 加入本机「我的发布」
  const claimWrap = el('div', 'mine-claim');
  const claimToggle = el('button', 'btn-report mine-claim-link', COPY.claimEntry);
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
  updateReplyBadges();
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
    refreshReplyCounts(true);
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
  item.dataset.id = mine.id;
  const top = el('div', 'mine-item-top');
  top.appendChild(categoryStamp(d.category));
  top.appendChild(statusTextNode(d.status));
  const title = el('p', 'mine-item-title', d.title);
  item.append(top, title);
  syncMineNewTag(item, newReplyCount(mine.id, readSeen()));
  if (numCount(d.help_count) > 0) item.appendChild(el('p', 'mine-item-help', COPY.helpCount(numCount(d.help_count))));

  // 私信：显示数量，点开查看列表，并可以「发布者」身份公开回复
  const priv = el('div', 'mine-private');
  const privToggle = el('button', 'btn btn-secondary btn-sm mine-private-toggle', COPY.privateCount('…'));
  privToggle.type = 'button';
  privToggle.disabled = true;
  const privPanel = el('div', 'mine-private-panel');
  privPanel.hidden = true;
  priv.append(privToggle, privPanel);
  item.appendChild(priv);
  let privList = [];
  const renderPrivPanel = () => {
    privPanel.innerHTML = '';
    privPanel.appendChild(el('p', 'form-label', COPY.privateTitle));
    if (!privList.length) privPanel.appendChild(el('p', 'reply-empty', COPY.privateNone));
    else privList.forEach((r) => privPanel.appendChild(replyItem(r, { hideTag: true })));
    privPanel.appendChild(el('p', 'form-label mine-owner-label', COPY.ownerReplyLabel));
    privPanel.appendChild(replyComposer({
      placeholder: COPY.ownerReplyPlaceholder,
      showPrivate: false,
      onSend: async (body) => {
        await request(`/api/demands/${mine.id}/replies`, {
          method: 'POST',
          body: JSON.stringify({ body, is_private: false }),
          headers: { 'x-manage-token': mine.token },
        });
        toast(COPY.replySent);
      },
    }));
  };
  const syncToggle = () => {
    privToggle.textContent = privPanel.hidden ? COPY.privateCount(privList.length) : COPY.privateHide;
  };
  privToggle.addEventListener('click', () => {
    privPanel.hidden = !privPanel.hidden;
    if (!privPanel.hidden) { renderPrivPanel(); markRepliesRead(mine.id); }
    syncToggle();
  });
  request(`/api/demands/${mine.id}/replies/private`, { headers: { 'x-manage-token': mine.token } })
    .then((data) => {
      privList = Array.isArray(data) ? data : [];
      privToggle.disabled = false;
      privToggle.classList.toggle('has-new', privList.length > 0);
      syncToggle();
    })
    .catch(() => { privToggle.textContent = COPY.privateLoadError; });

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
    forgetSeen(mine.id);
    item.remove();
    updateReplyBadges();
    toast(COPY.removeDone);
    if (isWide() && state.activeId === mine.id) { // 右栏正显示被撤下的这条：换回默认
      state.demands = state.demands.filter((x) => x.id !== mine.id);
      clearPaneSelection();
    }
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
  buildSideCats();
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
  document.querySelectorAll('#tabs .tab, #glass-tabs .tab, #side-cats .side-cat').forEach((t) => {
    t.classList.toggle('active', t.dataset.cat === key);
  });
  document.querySelectorAll('#side-cats .side-cat').forEach((t) => {
    if (t.dataset.cat === key) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
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
    loadAdmin();
  });
  i.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
  auth.append(l, i, btn);
  $('#admin-list').innerHTML = '';
  $('#admin-tools').innerHTML = '';
  $('#admin-tabs').innerHTML = '';
}

function enterAdmin() {
  document.body.classList.add('admin');
  $('#admin').hidden = false;
  document.body.style.overflow = '';
  renderAdminStatic();
  buildAdminAuth();
  if (state.adminKey) loadAdmin(); // 已登录则直接加载
}

function exitAdmin() {
  document.body.classList.remove('admin');
  $('#admin').hidden = true;
  state.adminKey = null;
  state.adminDemands = [];
  state.adminQuery = '';
  try { history.replaceState(null, '', baseHashUrl()); } catch { /* 忽略 */ }
  if (!state.loaded) loadDemands(); else renderFeed();
}

const adminHeaders = () => ({ 'x-admin-key': state.adminKey });
const adminErrText = (err, fallback) => (err.code === 'unauthorized' ? COPY.adminWrong
  : err.code === 'admin_not_configured' ? COPY.adminNotConfigured : fallback);

// 登录后按当前视图加载：举报列表 / 全部需求
function loadAdmin() {
  renderAdminTabs();
  if (state.adminView === 'all') loadAdminDemands(); else loadAdminReports();
}

function renderAdminTabs() {
  const box = $('#admin-tabs');
  box.innerHTML = '';
  box.setAttribute('role', 'tablist');
  [['reports', COPY.adminTabReports], ['all', COPY.adminTabAll]].forEach(([key, label]) => {
    const t = el('button', 'tab' + (state.adminView === key ? ' active' : ''), label);
    t.type = 'button';
    t.setAttribute('role', 'tab');
    t.setAttribute('aria-selected', state.adminView === key ? 'true' : 'false');
    t.addEventListener('click', () => {
      if (state.adminView === key) return;
      state.adminView = key;
      loadAdmin();
    });
    box.appendChild(t);
  });
}

function adminStateBox(svg, text) {
  const box = el('div', 'feed-state');
  const art = el('div', 'state-art');
  art.innerHTML = svg;
  box.appendChild(art);
  box.appendChild(el('p', null, text));
  return box;
}

async function loadAdminReports() {
  const list = $('#admin-list');
  $('#admin-tools').innerHTML = '';
  list.innerHTML = '';
  list.appendChild(loadingNode());
  try {
    const data = await request('/api/admin/reports', { headers: { 'x-admin-key': state.adminKey } });
    if (state.adminView !== 'reports') return;
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
    bDel.addEventListener('click', () => adminRemove(d.id, bDel, d.title));
    actions.appendChild(bDel);
    card.appendChild(actions);
  }

  return card;
}

async function adminRemove(id, btn, title) {
  const ok = await askConfirm({
    title: COPY.adminDelete,
    body: COPY.adminDeleteDemandConfirm(title || ''),
    ok: COPY.adminDelete,
    cancel: COPY.confirmNo,
  });
  if (!ok) return;
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

/* ---------- 管理页：全部需求 ---------- */
async function loadAdminDemands() {
  const tools = $('#admin-tools');
  const list = $('#admin-list');
  tools.innerHTML = '';
  list.innerHTML = '';
  list.appendChild(loadingNode());
  try {
    const data = await request('/api/admin/demands', { headers: adminHeaders() });
    if (state.adminView !== 'all') return;
    state.adminDemands = Array.isArray(data) ? data : [];
    renderAdminSearch();
    renderAdminDemands();
  } catch (err) {
    if (state.adminView !== 'all') return;
    list.innerHTML = '';
    list.appendChild(adminStateBox(SVG_ERR, adminErrText(err, COPY.adminAllLoadError)));
  }
}

function renderAdminSearch() {
  const tools = $('#admin-tools');
  tools.innerHTML = '';
  const i = el('input', 'input admin-search');
  i.type = 'search';
  i.autocomplete = 'off';
  i.placeholder = COPY.adminSearchPlaceholder;
  i.setAttribute('aria-label', COPY.adminSearchPlaceholder);
  i.value = state.adminQuery;
  i.addEventListener('input', () => {
    state.adminQuery = i.value;
    renderAdminDemands();
  });
  tools.append(i, el('p', 'admin-count', ''));
}

function adminFiltered() {
  const q = state.adminQuery.trim().toLowerCase();
  if (!q) return state.adminDemands;
  return state.adminDemands.filter((d) => `${d.title || ''}\n${d.description || ''}`.toLowerCase().includes(q));
}

function renderAdminDemands() {
  const list = $('#admin-list');
  list.innerHTML = '';
  const all = state.adminDemands;
  const shown = adminFiltered();
  const count = $('#admin-tools .admin-count');
  if (count) count.textContent = all.length ? COPY.adminAllCount(shown.length, all.length) : '';
  if (!all.length) { list.appendChild(adminStateBox(SVG_INBOX, COPY.adminAllEmpty)); return; }
  if (!shown.length) { list.appendChild(adminStateBox(SVG_INBOX, COPY.adminNoMatch)); return; }
  shown.forEach((d) => list.appendChild(adminDemandCard(d)));
}

function adminDemandCard(d) {
  const card = el('div', 'admin-card');
  const top = el('div', 'admin-card-top');
  top.appendChild(categoryStamp(d.category));
  const info = el('div', 'admin-card-info');
  info.appendChild(el('p', 'admin-card-title', d.title));
  const sub = el('p', 'admin-card-meta');
  sub.appendChild(el('span', null, COPY.categories[d.category] || d.category));
  sub.appendChild(el('span', null, COPY.status[d.status] || d.status || ''));
  const time = el('time', null, relTime(d.created_at));
  time.dateTime = d.created_at || '';
  time.title = d.created_at ? new Date(d.created_at).toLocaleString() : '';
  sub.appendChild(time);
  if (d.is_sample === true) sub.appendChild(el('span', null, COPY.adminSample));
  if (d.hidden === true) sub.appendChild(el('span', 'tag-overdue', COPY.adminHidden));
  info.appendChild(sub);
  top.appendChild(info);
  card.appendChild(top);

  card.appendChild(el('p', 'admin-card-desc' + (d.description ? '' : ' is-empty'), d.description || COPY.adminNoDescription));
  const counts = el('p', 'admin-card-reasons', COPY.adminReplyCounts(numCount(d.public_count), numCount(d.private_count)));
  card.appendChild(counts);

  const replies = el('div', 'admin-replies');
  replies.hidden = true;

  const actions = el('div', 'admin-card-actions');
  const bToggle = el('button', 'btn btn-ghost btn-sm', COPY.adminShowReplies);
  bToggle.type = 'button';
  bToggle.setAttribute('aria-expanded', 'false');
  bToggle.addEventListener('click', () => {
    const open = replies.hidden;
    replies.hidden = !open;
    bToggle.textContent = open ? COPY.adminHideReplies : COPY.adminShowReplies;
    bToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) loadAdminReplies(d, replies, counts);
  });
  const bDel = el('button', 'btn btn-danger btn-sm', COPY.adminDelete);
  bDel.type = 'button';
  bDel.addEventListener('click', () => adminDeleteDemand(d, bDel));
  actions.append(bToggle, bDel);
  card.append(actions, replies);
  return card;
}

async function adminDeleteDemand(d, btn) {
  const ok = await askConfirm({
    title: COPY.adminDelete,
    body: COPY.adminDeleteDemandConfirm(d.title),
    ok: COPY.adminDelete,
    cancel: COPY.confirmNo,
  });
  if (!ok) return;
  btn.disabled = true;
  try {
    // 已有的管理员删除接口：删除需求，并在服务端清理其回复与回复举报
    await request(`/api/admin/demands/${d.id}`, { method: 'DELETE', headers: adminHeaders() });
    toast(COPY.adminDeleted);
  } catch (err) {
    if (err.code !== 'not_found') { btn.disabled = false; toast(adminErrText(err, COPY.errGeneric)); return; }
    toast(COPY.adminDemandMissing);
  }
  state.adminDemands = state.adminDemands.filter((x) => x.id !== d.id);
  renderAdminDemands();
  loadDemands();
}

async function loadAdminReplies(d, box, counts) {
  box.innerHTML = '';
  box.appendChild(loadingNode());
  try {
    const data = await request(`/api/admin/demands/${d.id}/replies`, { headers: adminHeaders() });
    const list = Array.isArray(data) ? data : [];
    // 用实际取到的回复刷新计数
    d.public_count = list.filter((r) => !r.is_private).length;
    d.private_count = list.filter((r) => r.is_private).length;
    counts.textContent = COPY.adminReplyCounts(d.public_count, d.private_count);
    box.innerHTML = '';
    if (!list.length) { box.appendChild(el('p', 'reply-empty', COPY.adminRepliesEmpty)); return; }
    list.forEach((r) => box.appendChild(adminReplyItem(r, d, box, counts)));
  } catch (err) {
    box.innerHTML = '';
    box.appendChild(el('p', 'reply-empty', adminErrText(err, COPY.adminRepliesLoadError)));
  }
}

function adminReplyItem(r, d, box, counts) {
  const item = el('div', 'reply-item');
  const top = el('div', 'reply-top');
  top.appendChild(el('span', r.is_private ? 'reply-tag reply-tag--private' : 'reply-tag', r.is_private ? COPY.adminReplyPrivate : COPY.adminReplyPublic));
  if (r.is_owner) top.appendChild(el('span', 'reply-tag reply-tag--owner', COPY.replyOwner));
  top.appendChild(el('span', 'reply-time', relTime(r.created_at)));
  if (r.hidden) top.appendChild(el('span', 'tag-overdue', COPY.adminHidden));
  if (numCount(r.report_count) > 0) top.appendChild(el('span', 'reply-time', COPY.adminReplyReported(numCount(r.report_count))));
  const bDel = el('button', 'btn btn-danger btn-sm admin-reply-del', COPY.adminDelete);
  bDel.type = 'button';
  bDel.addEventListener('click', async () => {
    const ok = await askConfirm({
      title: COPY.adminDeleteReplyTitle,
      body: COPY.adminDeleteReplyConfirm,
      ok: COPY.adminDelete,
      cancel: COPY.confirmNo,
    });
    if (!ok) return;
    bDel.disabled = true;
    try {
      await request(`/api/admin/replies/${r.id}`, { method: 'DELETE', headers: adminHeaders() });
      toast(COPY.adminReplyDeleted);
    } catch (err) {
      if (err.code !== 'not_found') { bDel.disabled = false; toast(adminErrText(err, COPY.errGeneric)); return; }
    }
    item.remove();
    if (r.is_private) d.private_count = Math.max(0, numCount(d.private_count) - 1);
    else d.public_count = Math.max(0, numCount(d.public_count) - 1);
    counts.textContent = COPY.adminReplyCounts(d.public_count, d.private_count);
    if (!box.querySelector('.reply-item')) box.appendChild(el('p', 'reply-empty', COPY.adminRepliesEmpty));
  });
  top.appendChild(bDel);
  item.append(top, el('p', 'reply-body', r.body));
  return item;
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
  document.querySelectorAll('#open-only, #side-open-only').forEach((sw) => {
    sw.classList.toggle('on', state.openOnly);
    sw.setAttribute('aria-checked', state.openOnly ? 'true' : 'false');
  });
  renderFeed();
}

function renderStatic() {
  document.title = COPY.docTitle;
  document.querySelectorAll('#brand-title .brand-logo-text, #glassbar-title .brand-logo-text, #side-brand .brand-logo-text').forEach((t) => {
    t.textContent = COPY.brandWall;
  });
  $('#btn-mine').textContent = COPY.headerMy;
  $('#glass-mine').textContent = COPY.headerMy;
  $('#side-mine').textContent = COPY.headerMy;
  $('#btn-publish').textContent = COPY.headerPublish;
  $('#side-publish').textContent = COPY.headerPublish;
  $('#fab-label').textContent = COPY.headerPublish;
  $('#search').placeholder = COPY.searchPlaceholder;
  $('#glass-search').placeholder = COPY.searchPlaceholder;
  $('#footer').textContent = COPY.footer;
  $('#about-title').textContent = COPY.aboutTitle;
  $('#about-why').textContent = COPY.aboutWhy;
  $('#about-fx').textContent = COPY.aboutFx;
  $('#about-safe').textContent = COPY.aboutSafe;
  $('#about-a2hs').textContent = COPY.aboutA2HS;
  $('#pane').setAttribute('aria-label', COPY.detailTitle);
  document.querySelectorAll('#open-only, #side-open-only').forEach((sw) => {
    const lbl = sw.querySelector('.switch-label');
    if (lbl) lbl.textContent = COPY.openOnly;
    sw.classList.toggle('on', state.openOnly);
    sw.setAttribute('aria-checked', state.openOnly ? 'true' : 'false');
  });
  const note = $('#lang-note');
  if (note) {
    note.hidden = lang !== 'en';
    if (lang === 'en') note.textContent = COPY.langNote;
  }
  updateHero();
  updateReplyBadges(); // 按钮文字被重置后，同步红点的无障碍标签
}

function setLang(next) {
  lang = next;
  COPY = I18N[next];
  try { localStorage.setItem(LANG_KEY, next); } catch { /* 忽略 */ }
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('#lang-switch button, #side-lang-switch button').forEach((b) => {
    const on = b.dataset.lang === next;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  // 全量重渲染已渲染区域
  renderStatic();
  buildTabs();
  buildPublishForm();
  renderFeed();
  if (isWide()) syncPane(true);
  else if ($('#modal-detail') && !$('#modal-detail').hidden && state.activeData) buildDetail(state.activeData);
  if ($('#modal-success') && !$('#modal-success').hidden && state.lastShareDemand) buildSuccess(state.lastShareDemand);
  if ($('#modal-pin') && !$('#modal-pin').hidden && state.pinDemand) buildPinSheet(state.pinDemand);
}

/* ================= XMUM 启动动画 ================= */
const INTRO_LAST_KEY = 'xmum_intro_last';
const INTRO_LEGACY_KEY = 'xmum_intro_seen'; // 旧版「看过就永不再播」标记，已弃用
const INTRO_INTERVAL_MS = 24 * 60 * 60 * 1000;

function shouldPlayIntro() {
  try { if (new URLSearchParams(location.search).has('intro')) return true; } catch { /* 忽略 */ }
  try {
    localStorage.removeItem(INTRO_LEGACY_KEY);
    const last = Number(localStorage.getItem(INTRO_LAST_KEY));
    if (!last) return true;
    return Date.now() - last > INTRO_INTERVAL_MS;
  } catch { return true; }
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

/* 顶栏 logo：XMUM 字形（高 17px、填充墨蓝）+「需求墙」文字；主顶栏与玻璃顶栏共用 */
function buildBrandLogo() {
  ['#brand-title', '#glassbar-title', '#side-brand'].forEach(buildBrandLogoIn);
}
function buildBrandLogoIn(sel) {
  const host = $(sel);
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

/* 液体波浪转场色带：宽 = 视口 220%，viewBox 宽 WAVE.w(=220) 单位，1 单位 = 视口宽 1%；
   左右两边为竖向正弦波，波峰到波谷占 2*amp 单位，因此色带实心区为 [2*amp, w-2*amp]。 */
const WAVE = { w: 220, amp: 3, periods: 2, dur: 760, removeAt: 2950 };
const WAVE_BANDS = [
  { color: '#C4541D', delay: 2050, phase: 0 },
  { color: '#2F5D8C', delay: 2110, phase: 0.35 },
  { color: '#14304F', delay: 2170, phase: 0.7 },
];

function waveBandPath(phase) {
  const { w, amp, periods } = WAVE;
  const steps = 48;
  const xAt = (y) => amp + amp * Math.sin(2 * Math.PI * (periods * y / 100 + phase));
  let d = '';
  for (let i = 0; i <= steps; i++) {           // 左边：自上而下
    const y = (100 * i) / steps;
    d += `${i ? ' L' : 'M'} ${xAt(y).toFixed(2)} ${y.toFixed(2)}`;
  }
  for (let i = steps; i >= 0; i--) {           // 右边：自下而上，与左边同相位，保持等宽
    const y = (100 * i) / steps;
    d += ` L ${(w - 2 * amp + xAt(y)).toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + ' Z';
}

/* cubic-bezier(.65,0,.35,1) 的数值求值 */
function waveEase(t) {
  const bz = (p1, p2, s) => 3 * (1 - s) * (1 - s) * s * p1 + 3 * (1 - s) * s * s * p2 + s * s * s;
  let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (bz(0.65, 0.35, m) < t) lo = m; else hi = m; }
  return bz(0, 1, (lo + hi) / 2);
}

/* 深蓝色带完全盖住屏幕的时刻（ms）。
   色带 translateX 从 +w% 到 -w%（以视口宽为 100），位移 = w - 2w·p，实心区左缘 = w - 2w·p + 2·amp。
   左缘 ≤ 0（再留 4px 抗锯齿余量）时盖满；此时实心区右缘 = 左缘 + (w - 4·amp) ≈ 208 > 100，右侧同样盖满。
   盖满窗口约 2554–2630ms，与视口宽度无关（全部按百分比缩放），各宽度均无缝隙。 */
function waveCoverTime(viewportW) {
  const { w, amp, dur } = WAVE;
  const navy = WAVE_BANDS[WAVE_BANDS.length - 1];
  const margin = (4 / Math.max(viewportW, 1)) * 100;   // 4px 换算为视口百分比单位
  const pNeed = (w + 2 * amp + margin) / (2 * w);
  for (let ms = 0; ms <= dur; ms++) {
    if (waveEase(ms / dur) >= pNeed) return navy.delay + ms;
  }
  return navy.delay + dur;
}

function buildIntro() {
  // 覆盖层容器透明，白色背景单独一层，收尾淡出时单词仍可见。
  // 先以「暂停」态挂载，量出单词真实布局尺寸后再统一启动动画，保证各动画时钟同步。
  const overlay = el('div', 'intro-overlay intro-paused');
  overlay.appendChild(el('div', 'intro-bg'));

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
  overlay.appendChild(word);

  const sub = el('p', 'intro-sub', COPY.introSub);
  overlay.appendChild(sub);

  // 液体波浪转场：橙 → 中蓝 → 深蓝三条色带依次从右扫到左（深蓝在最上层）
  WAVE_BANDS.forEach((b, i) => {
    const band = svgEl('svg');
    band.setAttribute('class', 'intro-wave');
    band.setAttribute('viewBox', `0 0 ${WAVE.w} 100`);
    band.setAttribute('preserveAspectRatio', 'none');
    band.setAttribute('aria-hidden', 'true');
    band.style.zIndex = String(i + 1);
    band.style.animationDelay = b.delay + 'ms';
    const p = svgEl('path');
    p.setAttribute('d', waveBandPath(b.phase));
    p.setAttribute('fill', b.color);
    band.appendChild(p);
    overlay.appendChild(band);
  });
  // 深蓝色带完全盖住屏幕的时刻：开场画面在此刻隐藏，首页在色带下方露出
  overlay.style.setProperty('--intro-hide', waveCoverTime(window.innerWidth) + 'ms');

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

  return { overlay, word, sub, style };
}

function startIntro() {
  try { localStorage.setItem(INTRO_LAST_KEY, String(Date.now())); } catch { /* 忽略 */ }
  const intro = buildIntro();

  loadDemands(); // 动画开始即请求列表，结束时首页已有内容

  // 开场画面在深蓝色带盖满屏幕时由 CSS 隐藏（introHide），此刻同步解除滚动锁定，滚动条出现引起的布局变化被色带遮住
  intro.overlay.querySelector('.intro-bg').addEventListener('animationend', (e) => {
    if (e.animationName === 'introHide') document.body.classList.remove('intro-playing');
  });
  setTimeout(() => finishIntro(intro), WAVE.removeAt);
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

  document.querySelectorAll('#lang-switch button, #side-lang-switch button').forEach((b) => {
    b.addEventListener('click', () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); });
  });

  document.querySelectorAll('#open-only, #side-open-only').forEach((sw) => {
    sw.addEventListener('click', () => setOpenOnly(!state.openOnly));
  });

  $('#btn-publish').addEventListener('click', openPublish);
  $('#btn-mine').addEventListener('click', openMine);
  $('#side-publish').addEventListener('click', openPublish);
  $('#side-mine').addEventListener('click', openMine);
  if (WIDE_MQ.addEventListener) WIDE_MQ.addEventListener('change', handleWideChange);
  else if (WIDE_MQ.addListener) WIDE_MQ.addListener(handleWideChange);
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
  backdropClick('#modal-pin', '.sheet');

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
  const MODAL_ORDER = ['#modal-manual', '#modal-confirm', '#modal-pin', '#modal-report', '#modal-detail', '#modal-success', '#modal-publish', '#modal-mine'];
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    for (const id of MODAL_ORDER) { const m = $(id); if (m && !m.hidden) { closeModal(id); return; } }
  });

  // 新回复提醒：打开页面时拉一次；回到页面、页面重新可见时再拉（前端节流 15 秒）
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !isAdminHash()) refreshReplyCounts();
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted && !isAdminHash()) refreshReplyCounts(); });
  window.addEventListener('focus', () => { if (!isAdminHash()) refreshReplyCounts(); });

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
  if (!isAdminHash()) refreshReplyCounts(true);
}

document.addEventListener('DOMContentLoaded', init);
