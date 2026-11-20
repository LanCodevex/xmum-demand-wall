-- 用 4 位数字口令替代「保存管理码」做跨设备找回。
-- 由 Qoder 平台 migration 流程执行；只使用平台支持的 ALTER TABLE ADD COLUMN。
-- 说明：
--   * pin_hash = hex(SHA-256(需求 id + 口令 + PIN_PEPPER))，PIN_PEPPER 是服务端 Secret 环境变量，不进代码与数据库。
--   * 三列都可空、无默认值：口令功能上线前的旧帖 pin_hash 为 NULL，只能继续用管理码找回。
--   * 新帖发布时服务端写入 pin_fail_count = 0；失败计数、锁定判断全部由 functions/routes.mjs 负责。
--   * manage_token 保持不变，仍是改状态/撤下/看私信的唯一凭据；口令只用于换取 manage_token。

ALTER TABLE app.demands ADD COLUMN pin_hash text;
ALTER TABLE app.demands ADD COLUMN pin_fail_count integer;
ALTER TABLE app.demands ADD COLUMN pin_locked_until timestamptz;
