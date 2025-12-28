-- =====================================================
-- 1. PROFILES TABLE - Renforcer la sécurité
-- =====================================================

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Recréer les policies avec des noms cohérents
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 2. RESERVATION_VEHICLES - Permettre aux invités de voir leurs véhicules
-- =====================================================

-- Créer une fonction SECURITY DEFINER pour récupérer les véhicules d'une réservation anonyme
CREATE OR REPLACE FUNCTION public.get_guest_reservation_vehicles(
  p_reservation_id uuid,
  p_guest_email text
)
RETURNS TABLE (
  id uuid,
  reservation_id uuid,
  vehicle_id uuid,
  vehicle_name text,
  vehicle_category text,
  vehicle_price_per_day numeric,
  vehicle_image_url text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validation des paramètres
  IF p_reservation_id IS NULL OR p_guest_email IS NULL THEN
    RAISE EXCEPTION 'Reservation ID and email are required';
  END IF;

  -- Vérifier d'abord que la réservation appartient à cet invité
  IF NOT EXISTS (
    SELECT 1 FROM public.reservations r
    WHERE r.id = p_reservation_id
      AND LOWER(TRIM(r.guest_email)) = LOWER(TRIM(p_guest_email))
      AND r.user_id IS NULL
  ) THEN
    RETURN; -- Retourner un résultat vide si la réservation n'appartient pas à l'invité
  END IF;

  -- Retourner les véhicules de la réservation avec leurs détails
  RETURN QUERY
  SELECT 
    rv.id,
    rv.reservation_id,
    rv.vehicle_id,
    v.name as vehicle_name,
    v.category as vehicle_category,
    v.price_per_day as vehicle_price_per_day,
    v.image_url as vehicle_image_url
  FROM public.reservation_vehicles rv
  JOIN public.vehicles v ON v.id = rv.vehicle_id
  WHERE rv.reservation_id = p_reservation_id;
END;
$$;

-- Verrouiller les permissions sur la nouvelle fonction
REVOKE ALL ON FUNCTION public.get_guest_reservation_vehicles(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_guest_reservation_vehicles(uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_guest_reservation_vehicles(uuid, text) TO authenticated;

-- =====================================================
-- 3. USER ROLES - Préparer le système admin (optionnel)
-- =====================================================

-- Créer le type enum pour les rôles s'il n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END
$$;

-- Créer la table user_roles si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Activer RLS sur user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy pour que les utilisateurs puissent voir leurs propres rôles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Créer la fonction has_role pour vérifier les rôles (évite la récursion RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =====================================================
-- 4. POLICIES ADMIN pour reservations (optionnel)
-- =====================================================

-- Policy SELECT pour les admins sur reservations
CREATE POLICY "Admins can view all reservations"
ON public.reservations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy UPDATE pour les admins sur reservations
CREATE POLICY "Admins can update all reservations"
ON public.reservations FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy DELETE pour les admins sur reservations
CREATE POLICY "Admins can delete all reservations"
ON public.reservations FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));