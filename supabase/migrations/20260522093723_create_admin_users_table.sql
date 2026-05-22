/*
  # Create admin_users table and user_overrides table

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_auth_id` (uuid, references auth.users, unique)
      - `email` (text, not null)
      - `created_at` (timestamptz)

    - `user_plan_overrides`
      - `id` (uuid, primary key)
      - `user_auth_id` (uuid, references auth.users, unique)
      - `email` (text)
      - `plan_id` (text) — 'free' | 'calculator' | 'expert'
      - `trial_expires_at` (timestamptz, nullable) — extended trial expiry
      - `trial_calc_limit` (integer, nullable) — override for calc limit (null = use default)
      - `subscription_expires_at` (timestamptz, nullable) — paid plan expiry
      - `notes` (text, nullable) — admin notes
      - `updated_at` (timestamptz)
      - `updated_by` (text) — admin email who made the change

  2. Security
    - Enable RLS on both tables
    - Only admin users (harvinderswalia@gmail.com) can read/write admin_users
    - Only admin users can read/write user_plan_overrides

  3. Notes
    - The super admin harvinderswalia@gmail.com is seeded via a trigger on auth.users
    - user_plan_overrides allows the admin to override localStorage-based subscription data
      stored server-side for enforcement
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);
CREATE UNIQUE INDEX IF NOT EXISTS admin_users_auth_id_idx ON admin_users(user_auth_id);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS user_plan_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  plan_id text NOT NULL DEFAULT 'free',
  trial_expires_at timestamptz,
  trial_calc_limit integer,
  subscription_expires_at timestamptz,
  notes text DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  updated_by text DEFAULT ''
);

CREATE UNIQUE INDEX IF NOT EXISTS user_plan_overrides_auth_id_idx ON user_plan_overrides(user_auth_id);
CREATE INDEX IF NOT EXISTS user_plan_overrides_email_idx ON user_plan_overrides(email);

ALTER TABLE user_plan_overrides ENABLE ROW LEVEL SECURITY;

-- Admin users can read their own admin record
CREATE POLICY "Admin users can read own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = user_auth_id);

-- Admin users can read all plan overrides
CREATE POLICY "Admin users can read all plan overrides"
  ON user_plan_overrides FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_auth_id = auth.uid()
    )
  );

-- Admin users can insert plan overrides
CREATE POLICY "Admin users can insert plan overrides"
  ON user_plan_overrides FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_auth_id = auth.uid()
    )
  );

-- Admin users can update plan overrides
CREATE POLICY "Admin users can update plan overrides"
  ON user_plan_overrides FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_auth_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_auth_id = auth.uid()
    )
  );

-- Admin users can delete plan overrides
CREATE POLICY "Admin users can delete plan overrides"
  ON user_plan_overrides FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_auth_id = auth.uid()
    )
  );
