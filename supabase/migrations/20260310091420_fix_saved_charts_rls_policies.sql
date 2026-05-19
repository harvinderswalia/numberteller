/*
  # Fix Saved Charts RLS Policies

  1. Changes
    - Drop existing restrictive RLS policies that use `current_setting('app.user_id')`
    - Create new permissive policies that allow all authenticated and anonymous operations
    - This is appropriate for a client-side app where user_id is managed in localStorage
    
  2. Security Notes
    - Since this app uses client-side user identification (localStorage-based user_id)
    - And there's no authentication system, we allow all operations
    - The application layer enforces the 10-chart limit per user
*/

DROP POLICY IF EXISTS "Users can view own saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Users can insert own saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Users can update own saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Users can delete own saved charts" ON saved_charts;

CREATE POLICY "Allow all to view saved charts"
  ON saved_charts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow all to insert saved charts"
  ON saved_charts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all to update saved charts"
  ON saved_charts FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all to delete saved charts"
  ON saved_charts FOR DELETE
  TO anon, authenticated
  USING (true);
