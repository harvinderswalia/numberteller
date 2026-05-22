/*
  # Seed super admin and auto-register admin trigger

  1. Trigger
    - `on_user_signup_check_admin` — fires after each new auth.users insert
    - If the newly created user's email matches the super admin email,
      automatically inserts them into admin_users

  2. Notes
    - This ensures harvinderswalia@gmail.com is automatically made admin
      the moment they create their account, without any manual step
    - The trigger is SECURITY DEFINER so it can write to admin_users
*/

CREATE OR REPLACE FUNCTION handle_new_user_admin_check()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'harvinderswalia@gmail.com' THEN
    INSERT INTO admin_users (user_auth_id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (email) DO UPDATE SET user_auth_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_user_signup_check_admin ON auth.users;

CREATE TRIGGER on_user_signup_check_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_admin_check();

-- Also try to seed the admin now in case the user already exists
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'harvinderswalia@gmail.com'
  LIMIT 1;

  IF admin_user_id IS NOT NULL THEN
    INSERT INTO admin_users (user_auth_id, email)
    VALUES (admin_user_id, 'harvinderswalia@gmail.com')
    ON CONFLICT (email) DO UPDATE SET user_auth_id = admin_user_id;
  END IF;
END $$;
