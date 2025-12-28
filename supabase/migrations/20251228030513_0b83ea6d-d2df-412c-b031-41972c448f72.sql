-- =====================================================
-- 1. S'assurer que RLS est activé sur reservations
-- =====================================================
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. Créer une vue sécurisée qui EXCLUT les champs sensibles
-- =====================================================
DROP VIEW IF EXISTS public.reservations_public;

CREATE VIEW public.reservations_public 
WITH (security_barrier = true) AS
SELECT 
  id,
  user_id,
  status,
  payment_status,
  start_date,
  end_date,
  pickup_location_id,
  total_price,
  notes,
  created_at
FROM public.reservations
WHERE user_id = auth.uid();

-- Commentaire pour documenter la vue
COMMENT ON VIEW public.reservations_public IS 
'Vue sécurisée des réservations sans les champs sensibles (guest_email, guest_phone). 
Accessible uniquement pour les utilisateurs authentifiés sur leurs propres réservations.';

-- =====================================================
-- 3. Révoquer SELECT direct sur reservations pour anon/authenticated
-- =====================================================
REVOKE SELECT ON public.reservations FROM anon;
REVOKE SELECT ON public.reservations FROM authenticated;

-- =====================================================
-- 4. Accorder SELECT sur la vue aux utilisateurs authentifiés
-- =====================================================
GRANT SELECT ON public.reservations_public TO authenticated;

-- =====================================================
-- 5. Mettre à jour la fonction RPC pour les invités
-- Retourne les infos SANS guest_phone pour plus de sécurité
-- =====================================================
DROP FUNCTION IF EXISTS public.get_guest_reservation(uuid, text);

CREATE OR REPLACE FUNCTION public.get_guest_reservation(
  p_reservation_id uuid,
  p_guest_email text
)
RETURNS TABLE (
  id uuid,
  start_date date,
  end_date date,
  total_price numeric,
  status text,
  payment_status text,
  guest_name text,
  notes text,
  pickup_location_id uuid,
  created_at timestamptz
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

  -- Retourner la réservation uniquement si :
  -- 1. L'ID correspond
  -- 2. L'email correspond (insensible à la casse)
  -- 3. C'est une réservation anonyme (user_id IS NULL)
  -- NOTE: guest_email et guest_phone ne sont PAS retournés
  RETURN QUERY
  SELECT 
    r.id,
    r.start_date,
    r.end_date,
    r.total_price,
    r.status,
    r.payment_status,
    r.guest_name,
    r.notes,
    r.pickup_location_id,
    r.created_at
  FROM public.reservations r
  WHERE r.id = p_reservation_id
    AND LOWER(TRIM(r.guest_email)) = LOWER(TRIM(p_guest_email))
    AND r.user_id IS NULL
  LIMIT 1;
END;
$$;

-- Verrouiller les permissions sur la fonction
REVOKE ALL ON FUNCTION public.get_guest_reservation(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_guest_reservation(uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_guest_reservation(uuid, text) TO authenticated;

-- =====================================================
-- 6. Créer une fonction RPC pour les utilisateurs authentifiés
-- Pour récupérer leurs réservations sans données sensibles
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_my_reservations()
RETURNS TABLE (
  id uuid,
  start_date date,
  end_date date,
  total_price numeric,
  status text,
  payment_status text,
  notes text,
  pickup_location_id uuid,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Retourner uniquement les réservations de l'utilisateur connecté
  -- Sans les champs sensibles
  RETURN QUERY
  SELECT 
    r.id,
    r.start_date,
    r.end_date,
    r.total_price,
    r.status,
    r.payment_status,
    r.notes,
    r.pickup_location_id,
    r.created_at
  FROM public.reservations r
  WHERE r.user_id = auth.uid()
  ORDER BY r.created_at DESC;
END;
$$;

-- Verrouiller les permissions
REVOKE ALL ON FUNCTION public.get_my_reservations() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_my_reservations() TO authenticated;

-- =====================================================
-- 7. Fonction pour obtenir une réservation spécifique (auth)
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_my_reservation(p_reservation_id uuid)
RETURNS TABLE (
  id uuid,
  start_date date,
  end_date date,
  total_price numeric,
  status text,
  payment_status text,
  notes text,
  pickup_location_id uuid,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_reservation_id IS NULL THEN
    RAISE EXCEPTION 'Reservation ID is required';
  END IF;

  RETURN QUERY
  SELECT 
    r.id,
    r.start_date,
    r.end_date,
    r.total_price,
    r.status,
    r.payment_status,
    r.notes,
    r.pickup_location_id,
    r.created_at
  FROM public.reservations r
  WHERE r.id = p_reservation_id
    AND r.user_id = auth.uid()
  LIMIT 1;
END;
$$;

-- Verrouiller les permissions
REVOKE ALL ON FUNCTION public.get_my_reservation(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_my_reservation(uuid) TO authenticated;