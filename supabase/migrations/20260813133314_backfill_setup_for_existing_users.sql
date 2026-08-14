/*
# Backfill setup_completed_at for pre-existing accounts

## Purpose
Accounts created before the new 3-plan system launched (2026-08-13) should NOT
be forced through the new setup gate. Their setup_completed_at was reset to NULL
by the earlier migration, trapping existing users (including the super admin)
on the setup screen. This migration backfills setup_completed_at for any
account that already existed when the plan system went live, so they skip the
gate and keep using the app at their current plan.

## Changes
- UPDATE user_plan_overrides: set setup_completed_at = account created_at
  for all rows where setup_completed_at IS NULL and the linked auth.users
  account was created before 2026-08-13.
- Sets the super admin (harvinderswalia@gmail.com) to platinum with a
  long-running subscription, since they own the platform.

## Security
No RLS or policy changes.
*/

UPDATE user_plan_overrides upo
SET setup_completed_at = au.created_at,
    updated_at = now()
FROM auth.users au
WHERE upo.user_auth_id = au.id
  AND upo.setup_completed_at IS NULL
  AND au.created_at < '2026-08-13 11:32:08+00'::timestamptz;

UPDATE user_plan_overrides
SET plan_id = 'platinum',
    subscription_expires_at = '2099-12-31 23:59:59+00'::timestamptz,
    updated_at = now()
WHERE email = 'harvinderswalia@gmail.com';