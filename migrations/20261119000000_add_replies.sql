-- 新增「回复」功能：公开回复 + 仅发帖人可见的私信。
-- 由 Qoder 平台 migration 流程执行；只使用平台支持的 CREATE TABLE / CREATE INDEX。
-- 说明：
--   * demands.contact 保持 NOT NULL，「不填联系方式」由服务端存空字符串 ''。
--   * 回复长度（1–200 字）、非空校验，以及删除需求/回复时清理关联数据，全部由 functions/routes.mjs 负责。
--   * 同设备对同一回复只能举报一次，由服务端先查 reply_reports 再写入保证。

CREATE TABLE app.replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id uuid NOT NULL,
  body text NOT NULL,
  is_private boolean NOT NULL DEFAULT false,
  is_owner boolean NOT NULL DEFAULT false,
  report_count integer NOT NULL DEFAULT 0,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX replies_demand_id_idx ON app.replies (demand_id);

CREATE TABLE app.reply_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reply_id uuid NOT NULL,
  device text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX reply_reports_reply_id_idx ON app.reply_reports (reply_id);
