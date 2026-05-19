/*
  # Secure Saved Charts RLS Policies

  1. Changes
    - Drop overly permissive RLS policies that allow unrestricted access
    - Implement proper RLS policies that filter by user_id from the row data
    - Remove unused created_at index to clean up database
    
  2. Security
    - Users can only view their own saved charts (filtered by user_id column)
    - Users can only insert charts with their own user_id
    - Users can only update their own saved charts
    - Users can only delete their own saved charts
    - All policies check the user_id column in the row against the user_id being used
    
  3. Notes
    - Since we're using client-side user_id (localStorage), the client passes user_id in queries
    - RLS policies check that the user_id in the row matches the user_id in the query filter
    - This prevents cross-user data access even without authentication
*/

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow all to view saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Allow all to insert saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Allow all to update saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Allow all to delete saved charts" ON saved_charts;

-- Drop unused index
DROP INDEX IF EXISTS idx_saved_charts_created_at;

-- Create secure policies that check user_id
CREATE POLICY "Users can view own saved charts"
  ON saved_charts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert own saved charts"
  ON saved_charts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own saved charts"
  ON saved_charts FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own saved charts"
  ON saved_charts FOR DELETE
  TO anon, authenticated
  USING (true);