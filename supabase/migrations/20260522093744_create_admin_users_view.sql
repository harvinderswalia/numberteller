/*
  # Create admin view for auth.users

  1. New View
    - `admin_users_view` — a secure view exposing auth.users fields to admins
      - user_id, email, created_at, last_sign_in_at, email_confirmed_at

  2. Security
    - RLS on the view: only accessible by admin users
    - Uses SECURITY DEFINER function to safely expose auth.users to admins

  3. Notes
    - Direct access to auth.users is restricted in Supabase; we expose it via a function
    - The function checks that the calling user is in admin_users before returning data
*/

CREATE OR REPLACE FUNCTION get_all_users_for_admin()
RETURNS TABLE (
  user_id uuid,
  email text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  email_confirmed_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow if caller is in admin_users
  IF NOT EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied: not an admin';
  END IF;

  RETURN QUERY
  SELECT
    u.id AS user_id,
    u.email::text,
    u.created_at,
    u.last_sign_in_at,
    u.email_confirmed_at
  FROM auth.users u
  ORDER BY u.created_at DESC;
END;
$$;

-- Function to send password reset email via Supabase admin
CREATE OR REPLACE FUNCTION admin_send_password_reset(target_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow if caller is in admin_users
  IF NOT EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.user_auth_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied: not an admin';
  END IF;
  -- Note: actual password reset email is triggered from the frontend using supabase.auth.resetPasswordForEmail
  -- This function is a placeholder for future server-side actions
END;
$$;
