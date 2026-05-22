/*
  # Add calc_used tracking to user_plan_overrides

  1. Changes
    - Adds `calc_used` integer column to `user_plan_overrides` to track calculations used
    - Defaults to 0, never null
    - This replaces the unreliable localStorage-only tracking so counts persist across
      devices/browsers and survive login/logout cycles

  2. Security
    - No policy changes needed; existing RLS policies on user_plan_overrides already cover this column
    - The SA portal reads/writes the whole row which now includes calc_used
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_plan_overrides' AND column_name = 'calc_used'
  ) THEN
    ALTER TABLE user_plan_overrides ADD COLUMN calc_used integer NOT NULL DEFAULT 0;
  END IF;
END $$;
