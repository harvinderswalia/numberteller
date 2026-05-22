/*
  # Allow users to read their own plan override

  1. Changes
    - Add SELECT policy on user_plan_overrides so authenticated users can read their own row
    - This is needed for the dashboard to display the correct plan/trial status pulled from the DB

  2. Security
    - Only allows a user to see their own row (auth.uid() = user_auth_id)
    - Admin writes are still controlled by existing policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_plan_overrides'
    AND policyname = 'Users can read own plan override'
  ) THEN
    CREATE POLICY "Users can read own plan override"
      ON user_plan_overrides
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_auth_id);
  END IF;
END $$;
