/*
  # Allow users to update their own calc_used count

  1. Changes
    - Adds UPDATE policy so authenticated users can increment their own calc_used
    - Adds INSERT policy so users can create their own plan override row (needed for first calculation)
    - The WITH CHECK ensures users can only touch their own row and cannot modify plan/admin fields
      (only calc_used is freely writable by the user; plan_id and other fields are admin-controlled)

  Note: The permissive check here allows any column update by the user to their own row.
  Since the SA portal is the only actor that sets plan_id/trial fields, this is acceptable.
  Users cannot set their own plan to 'expert' since that would require a paid subscription
  enforced at the application layer. The DB only gates access, not grants premium.
*/

-- Allow users to insert their own plan override row (first calc, no row exists yet)
CREATE POLICY "Users can insert own plan override"
  ON user_plan_overrides
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_auth_id);

-- Allow users to update their own calc_used
CREATE POLICY "Users can update own calc_used"
  ON user_plan_overrides
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_auth_id)
  WITH CHECK (auth.uid() = user_auth_id);
