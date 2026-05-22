/*
  # Enable Realtime for user_plan_overrides

  Adds the user_plan_overrides table to the supabase_realtime publication so that
  changes made via the SA portal propagate to the user's browser session instantly
  without a page refresh.

  1. Changes
    - Adds user_plan_overrides to supabase_realtime publication
*/

ALTER PUBLICATION supabase_realtime ADD TABLE user_plan_overrides;
