/*
# Add attribution JSONB column to activation_requests

1. Changes
- Adds `attribution jsonb` column to `activation_requests` table.
- Stores first-touch attribution data (landing page, referrer, UTM params, GCLID, source_site, page_url) for each lead.
- No security changes needed: the column is written by the same authenticated user who owns the row, so existing RLS policies already cover it.
*/

ALTER TABLE activation_requests
  ADD COLUMN IF NOT EXISTS attribution jsonb DEFAULT '{}'::jsonb;
