CREATE TABLE app.demands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  contact text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  manage_token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  help_count integer,
  hidden boolean
);
CREATE INDEX demands_created_at_idx ON app.demands (created_at);

CREATE TABLE app.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id uuid NOT NULL,
  device text NOT NULL,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX reports_demand_id_idx ON app.reports (demand_id);

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
