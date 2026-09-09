-- Backfill trial_expires_at for existing free users who completed setup but have no trial date.
-- Set to 2026-09-08 so they are treated as expired by the trial logic.
UPDATE user_plan_overrides
SET trial_expires_at = '2026-09-08T23:59:59Z'::timestamptz,
    updated_at = now()
WHERE plan_id = 'free'
  AND trial_expires_at IS NULL
  AND setup_completed_at IS NOT NULL;