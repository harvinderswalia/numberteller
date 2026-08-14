/*
# Update plan feature strings to "unlimited charts"

## Purpose
The plans table was seeded with "Save up to 5/7/10 charts" feature strings.
This updates them to "Save unlimited charts" to match the UI.

## Changes
- UPDATE plans SET features = updated jsonb with "Save unlimited charts"
  for silver, gold, and platinum plans.
*/

UPDATE plans SET features = '["All calculators with full numeric output","Lo Shu Grid — grid display & power arrow detection","Compatibility score & harmony matrix","Transit chart — pinnacles, personal years & months","House, Car & Mobile number calculators","Business name number calculator","Save unlimited charts","PDF export (numbers only)"]'::jsonb, updated_at = now() WHERE id = 'silver';

UPDATE plans SET features = '["Everything in Silver","Full written interpretations on every number","Over-energy analysis & detailed warnings","Personal Year Forecast narrative","Save unlimited charts","PDF export with interpretation text"]'::jsonb, updated_at = now() WHERE id = 'gold';

UPDATE plans SET features = '["Everything in Gold","AI Name Correction — full harmony analysis","AI Tarot Reading","Business Numerology — full company profile & analysis","Client-ready PDF with interpretation text","Save unlimited charts"]'::jsonb, updated_at = now() WHERE id = 'platinum';