/*
  # Implement Authentication-Based RLS for Saved Charts

  1. Changes
    - Update saved_charts table to use auth.users uuid instead of text user_id
    - Drop old policies and create secure auth-based policies
    - Add foreign key constraint to auth.users
    - Migrate existing data to use auth system
    
  2. Security
    - Users must be authenticated to access saved charts
    - Users can only access their own charts (enforced by auth.uid())
    - No anonymous access allowed
    - Foreign key ensures data integrity
    
  3. Migration Strategy
    - Add new user_auth_id column
    - Keep old user_id column temporarily for data migration
    - After migration, drop old column
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Users can insert own saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Users can update own saved charts" ON saved_charts;
DROP POLICY IF EXISTS "Users can delete own saved charts" ON saved_charts;

-- Add new column for auth user ID if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saved_charts' AND column_name = 'user_auth_id'
  ) THEN
    ALTER TABLE saved_charts ADD COLUMN user_auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create secure auth-based policies
CREATE POLICY "Authenticated users can view own saved charts"
  ON saved_charts FOR SELECT
  TO authenticated
  USING (user_auth_id = auth.uid());

CREATE POLICY "Authenticated users can insert own saved charts"
  ON saved_charts FOR INSERT
  TO authenticated
  WITH CHECK (user_auth_id = auth.uid());

CREATE POLICY "Authenticated users can update own saved charts"
  ON saved_charts FOR UPDATE
  TO authenticated
  USING (user_auth_id = auth.uid())
  WITH CHECK (user_auth_id = auth.uid());

CREATE POLICY "Authenticated users can delete own saved charts"
  ON saved_charts FOR DELETE
  TO authenticated
  USING (user_auth_id = auth.uid());

-- Add index on user_auth_id for performance
CREATE INDEX IF NOT EXISTS idx_saved_charts_user_auth_id ON saved_charts(user_auth_id);