/*
# New 3-Plan System, Setup Flow, Activation Requests, Email Logging

## Overview
Replaces the old 2-plan (Calculator/Expert) system with a 3-plan system (Silver/Gold/Platinum),
adds a setup-completion gate before trial activation, creates an activation request workflow
for users whose trial has expired, and adds an email log table for tracking all outgoing emails.

## New Tables

### plans
Stores editable plan definitions that the super admin can modify (name, price, description, features).
- id (text, primary key): 'free', 'silver', 'gold', 'platinum'
- name (text): display name
- monthly_price (integer): price in rupees
- description (text): short description
- features (jsonb): array of feature strings
- not_included (jsonb): array of features not included
- is_active (boolean): whether plan is available for selection
- sort_order (integer): display order
- created_at, updated_at (timestamptz)

### activation_requests
User requests to activate a paid plan after trial expiry.
- id (uuid, primary key)
- user_auth_id (uuid, FK to auth.users, ON DELETE CASCADE)
- email (text)
- full_name (text)
- phone (text)
- requested_plan_id (text): which plan the user wants
- status (text): 'pending', 'approved', 'rejected'
- reminder_count (integer, default 0): how many reminder emails sent (max 1)
- admin_notes (text): notes from admin during approval/rejection
- activated_plan_id (text): the plan actually activated (may differ from requested)
- subscription_expires_at (timestamptz): when the activated subscription expires
- monthly_amount (integer): amount charged
- created_at, updated_at (timestamptz)

### email_log
Tracks all emails sent by the system.
- id (uuid, primary key)
- user_auth_id (uuid, nullable): associated user if any
- recipient_email (text): email address sent to
- template_type (text): 'activation_request', 'reminder', 'trial_expired', 'plan_activated', 'renewal', 'cancellation', 'plan_expired'
- status (text): 'sent', 'failed'
- error_message (text, nullable)
- sent_at (timestamptz, default now())

## Modified Tables

### user_plan_overrides
Added columns:
- full_name (text, nullable): user's full name from setup
- phone (text, nullable): user's phone from setup
- setup_completed_at (timestamptz, nullable): when setup was completed (null = setup pending)
- reminder_count (integer, default 0): activation reminders sent

## Data Migration
- Migrate existing plan_id values: 'calculator' → 'silver', 'expert' → 'platinum'
- Reset existing free users to new trial system: trial_expires_at = null, trial_calc_limit = 5,
  setup_completed_at = null, calc_used = 0 (they will go through setup on next login)

## Security
- RLS enabled on all new tables
- plans: readable by anon+authenticated (public info), writable by admin only
- activation_requests: users can read/insert their own; admin can read/update all
- email_log: admin only (no user access)
- Updated user_plan_overrides policies to allow users to update their own full_name, phone, setup_completed_at
*/

-- ─── plans table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  monthly_price integer NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  not_included jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Plans are public info: anyone can read
DROP POLICY IF EXISTS "plans_select_all" ON plans;
CREATE POLICY "plans_select_all"
  ON plans FOR SELECT TO anon, authenticated USING (true);

-- Only admin can modify plans
DROP POLICY IF EXISTS "plans_admin_insert" ON plans;
CREATE POLICY "plans_admin_insert"
  ON plans FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

DROP POLICY IF EXISTS "plans_admin_update" ON plans;
CREATE POLICY "plans_admin_update"
  ON plans FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

DROP POLICY IF EXISTS "plans_admin_delete" ON plans;
CREATE POLICY "plans_admin_delete"
  ON plans FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

-- Seed plan data
INSERT INTO plans (id, name, monthly_price, description, features, not_included, sort_order) VALUES
  ('free', 'Free Trial', 0, '3-day trial with 5 calculations on Silver plan features.',
    '["3-day trial","5 calculations","All calculators","No card needed"]'::jsonb,
    '[]'::jsonb, 0),
  ('silver', 'Silver', 991, 'For experienced practitioners who need fast, accurate calculations.',
    '["All calculators with full numeric output","Lo Shu Grid — grid display & power arrow detection","Compatibility score & harmony matrix","Transit chart — pinnacles, personal years & months","House, Car & Mobile number calculators","Business name number calculator","Save up to 5 charts","PDF export (numbers only)"]'::jsonb,
    '["Written interpretations on numbers","AI Name Correction full analysis","AI Tarot Reading","Business Numerology full profile","Client-ready PDF with interpretation text"]'::jsonb, 1),
  ('gold', 'Gold', 1299, 'For practitioners who need written interpretations alongside their calculations.',
    '["Everything in Silver","Full written interpretations on every number","Over-energy analysis & detailed warnings","Personal Year Forecast narrative","Save up to 7 charts","PDF export with interpretation text"]'::jsonb,
    '["AI Name Correction full analysis","AI Tarot Reading","Business Numerology full profile"]'::jsonb, 2),
  ('platinum', 'Platinum', 1499, 'For practitioners delivering full written analysis and client-ready reports.',
    '["Everything in Gold","AI Name Correction — full harmony analysis","AI Tarot Reading","Business Numerology — full company profile & analysis","Client-ready PDF with interpretation text","Save up to 10 charts"]'::jsonb,
    '[]'::jsonb, 3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  monthly_price = EXCLUDED.monthly_price,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  not_included = EXCLUDED.not_included,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

-- ─── activation_requests table ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_auth_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  requested_plan_id text NOT NULL DEFAULT 'silver',
  status text NOT NULL DEFAULT 'pending',
  reminder_count integer NOT NULL DEFAULT 0,
  admin_notes text NOT NULL DEFAULT '',
  activated_plan_id text,
  subscription_expires_at timestamptz,
  monthly_amount integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE activation_requests ENABLE ROW LEVEL SECURITY;

-- Users can read their own requests
DROP POLICY IF EXISTS "select_own_activation_requests" ON activation_requests;
CREATE POLICY "select_own_activation_requests"
  ON activation_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_auth_id);

-- Users can insert their own requests
DROP POLICY IF EXISTS "insert_own_activation_requests" ON activation_requests;
CREATE POLICY "insert_own_activation_requests"
  ON activation_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_auth_id);

-- Users can update their own requests (only for adding reminders)
DROP POLICY IF EXISTS "update_own_activation_requests" ON activation_requests;
CREATE POLICY "update_own_activation_requests"
  ON activation_requests FOR UPDATE TO authenticated
  USING (auth.uid() = user_auth_id)
  WITH CHECK (auth.uid() = user_auth_id);

-- Admin can read all requests
DROP POLICY IF EXISTS "admin_select_activation_requests" ON activation_requests;
CREATE POLICY "admin_select_activation_requests"
  ON activation_requests FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

-- Admin can update all requests (approve/reject)
DROP POLICY IF EXISTS "admin_update_activation_requests" ON activation_requests;
CREATE POLICY "admin_update_activation_requests"
  ON activation_requests FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

-- ─── email_log table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email text NOT NULL,
  template_type text NOT NULL,
  status text NOT NULL DEFAULT 'sent',
  error_message text,
  sent_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;

-- Only admin can read email logs
DROP POLICY IF EXISTS "admin_select_email_log" ON email_log;
CREATE POLICY "admin_select_email_log"
  ON email_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

-- Admin can insert email logs (via edge function with service role)
DROP POLICY IF EXISTS "admin_insert_email_log" ON email_log;
CREATE POLICY "admin_insert_email_log"
  ON email_log FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()));

-- ─── Add columns to user_plan_overrides ───────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_plan_overrides' AND column_name = 'full_name') THEN
    ALTER TABLE user_plan_overrides ADD COLUMN full_name text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_plan_overrides' AND column_name = 'phone') THEN
    ALTER TABLE user_plan_overrides ADD COLUMN phone text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_plan_overrides' AND column_name = 'setup_completed_at') THEN
    ALTER TABLE user_plan_overrides ADD COLUMN setup_completed_at timestamptz;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_plan_overrides' AND column_name = 'reminder_count') THEN
    ALTER TABLE user_plan_overrides ADD COLUMN reminder_count integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- ─── Migrate existing data ────────────────────────────────────────────────────
UPDATE user_plan_overrides SET plan_id = 'silver' WHERE plan_id = 'calculator';
UPDATE user_plan_overrides SET plan_id = 'platinum' WHERE plan_id = 'expert';

-- Reset existing free users to new trial system
UPDATE user_plan_overrides
SET trial_expires_at = NULL,
    trial_calc_limit = 5,
    setup_completed_at = NULL,
    calc_used = 0
WHERE plan_id = 'free';

-- ─── Add index for activation_requests lookups ────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_activation_requests_user ON activation_requests(user_auth_id);
CREATE INDEX IF NOT EXISTS idx_activation_requests_status ON activation_requests(status);
CREATE INDEX IF NOT EXISTS idx_email_log_user ON email_log(user_auth_id);

-- Enable realtime for activation_requests so admin sees new requests instantly
ALTER TABLE activation_requests REPLICA IDENTITY FULL;
