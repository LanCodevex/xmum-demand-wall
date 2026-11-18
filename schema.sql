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
