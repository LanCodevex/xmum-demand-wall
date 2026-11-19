-- 新增「回复」功能：公开回复 + 仅发帖人可见的私信；联系方式改为选填。
-- 由 Qoder 平台 migration 流程执行。

-- 1. 联系方式改为选填（可为空，长度上限 50 由服务端校验）
ALTER TABLE app.demands ALTER COLUMN contact DROP NOT NULL;

-- 2. 回复表
CREATE TABLE app.replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id uuid NOT NULL REFERENCES app.demands (id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 200),
  is_private boolean NOT NULL DEFAULT false,
  is_owner boolean NOT NULL DEFAULT false,
  report_count integer NOT NULL DEFAULT 0,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX replies_demand_id_created_at_idx ON app.replies (demand_id, created_at);

-- 3. 回复举报去重：同一设备对同一条回复只能举报一次
CREATE TABLE app.reply_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reply_id uuid NOT NULL REFERENCES app.replies (id) ON DELETE CASCADE,
  device text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (reply_id, device)
);
