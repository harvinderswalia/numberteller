/*
  # Cleanup Old user_id Column

  1. Changes
    - Drop the old user_id column since we're now using user_auth_id
    - Drop the old index on user_id
    
  2. Notes
    - This completes the migration to auth-based user identification
    - All existing data will be lost (this is acceptable for a new feature)
*/

-- Drop the old index
DROP INDEX IF EXISTS idx_saved_charts_user_id;

-- Drop the old user_id column
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'saved_charts' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE saved_charts DROP COLUMN user_id;
  END IF;
END $$;