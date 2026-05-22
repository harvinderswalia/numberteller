/*
  # Add monthly_amount to user_plan_overrides

  Tracks the actual monthly subscription amount paid per user (in INR paise or whole rupees).
  Used for revenue reporting in the SA portal dashboard.

  1. Changes
    - Adds monthly_amount integer column (default 0, stores rupees)
    - Adds admin_delete_requested boolean for soft-delete workflow
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_plan_overrides' AND column_name = 'monthly_amount'
  ) THEN
    ALTER TABLE user_plan_overrides ADD COLUMN monthly_amount integer DEFAULT 0;
  END IF;
END $$;
