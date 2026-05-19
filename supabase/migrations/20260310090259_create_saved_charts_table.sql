/*
  # Create Saved Charts Table

  1. New Tables
    - `saved_charts`
      - `id` (uuid, primary key) - Unique identifier for each saved chart
      - `user_id` (text) - User identifier (can be session-based or user ID)
      - `name` (text) - Name/title for the saved chart
      - `chart_data` (jsonb) - Complete chart calculation results
      - `created_at` (timestamptz) - Timestamp when chart was saved
      - `updated_at` (timestamptz) - Timestamp when chart was last updated

  2. Security
    - Enable RLS on `saved_charts` table
    - Add policies for users to manage their own saved charts
    
  3. Indexes
    - Add index on `user_id` for efficient querying
    - Add index on `created_at` for sorting

  4. Constraints
    - Each user can have maximum 10 saved charts (enforced at application level)
*/

CREATE TABLE IF NOT EXISTS saved_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  name text NOT NULL,
  chart_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE saved_charts ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_saved_charts_user_id ON saved_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_charts_created_at ON saved_charts(created_at DESC);

CREATE POLICY "Users can view own saved charts"
  ON saved_charts FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own saved charts"
  ON saved_charts FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own saved charts"
  ON saved_charts FOR UPDATE
  USING (user_id = current_setting('app.user_id', true))
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own saved charts"
  ON saved_charts FOR DELETE
  USING (user_id = current_setting('app.user_id', true));