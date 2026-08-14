/*
# Add activated_at column to user_plan_overrides

## Purpose
Tracks the date a paid plan was first activated for each user. This is the
"billing anchor" date — the day-of-month that monthly renewals should align to.
Previously only `subscription_expires_at` existed, which shifts over time and
loses the original billing day after multiple renewals.

## Changes
1. New column: `activated_at` (timestamptz, nullable)
   - Set when a user is first upgraded to a paid plan (silver/gold/platinum)
   - Cleared (set to null) when access is revoked
   - Used by the renew-subscriptions edge function as the renewal anchor
2. Backfill: for existing paid users, set activated_at = subscription_expires_at - 1 month
   (approximation of the original activation date)

## Security
No RLS policy changes — existing policies on user_plan_overrides already cover
all CRUD operations for authenticated users.
*/

ALTER TABLE user_plan_overrides
  ADD COLUMN IF NOT EXISTS activated_at timestamptz;

-- Backfill for existing paid users: approximate activation date as one month before current expiry
UPDATE user_plan_overrides
SET activated_at = subscription_expires_at - INTERVAL '1 month'
WHERE plan_id IN ('silver', 'gold', 'platinum')
  AND subscription_expires_at IS NOT NULL
  AND activated_at IS NULL;
