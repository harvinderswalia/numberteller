/*
  # Add unique constraint on user_plan_overrides.user_auth_id

  Required for upsert operations with onConflict: 'user_auth_id' to work correctly.
  Ensures each user has at most one plan override row.

  1. Changes
    - Adds UNIQUE constraint on user_auth_id column
*/

ALTER TABLE user_plan_overrides
  ADD CONSTRAINT user_plan_overrides_user_auth_id_key UNIQUE (user_auth_id);
