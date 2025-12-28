-- =====================================================
-- SÉCURISATION DES RÉSERVATIONS - PROTECTION DES DONNÉES INVITÉS
-- =====================================================

-- 1. Supprimer les anciennes policies problématiques sur reservations
DROP POLICY IF EXISTS "Anyone can view reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anonymous can view reservations" ON public.reservations;

-- 2. Policy SELECT : Utilisateurs connectés peuvent voir UNIQUEMENT leurs réservations
-- (Cette policy existe déjà, mais on la recrée pour s'assurer qu'elle est correcte)
DROP POLICY IF EXISTS "Users can view their own reservations" ON public.reservations;
CREATE POLICY "Users can view their own reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. Policy INSERT : Utilisateurs connectés peuvent créer leurs réservations
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anonymous can create reservations" ON public.reservations;

CREATE POLICY "Authenticated users can create reservations"
ON public.reservations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous guests can create reservations"
ON public.reservations
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL AND guest_email IS NOT NULL);

-- 4. Policy UPDATE : Utilisateurs connectés peuvent modifier UNIQUEMENT leurs réservations
-- (Cette policy existe déjà, on la garde)

-- 5. Policy UPDATE pour les réservations anonymes via fonction RPC seulement
-- (Pas de policy UPDATE directe pour anon - tout passe par la fonction RPC)

-- 6. Créer la fonction RPC SECURITY DEFINER pour accès invité sécurisé
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
  guest_email text,
  guest_phone text,
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
  RETURN QUERY
  SELECT 
    r.id,
    r.start_date,
    r.end_date,
    r.total_price,
    r.status,
    r.payment_status,
    r.guest_name,
    r.guest_email,
    r.guest_phone,
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

-- 7. Fonction RPC pour mettre à jour une réservation invité
CREATE OR REPLACE FUNCTION public.update_guest_reservation(
  p_reservation_id uuid,
  p_guest_email text,
  p_guest_name text DEFAULT NULL,
  p_guest_phone text DEFAULT NULL,
  p_notes text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_found boolean;
BEGIN
  -- Validation des paramètres
  IF p_reservation_id IS NULL OR p_guest_email IS NULL THEN
    RAISE EXCEPTION 'Reservation ID and email are required';
  END IF;

  -- Mettre à jour uniquement si la réservation appartient à cet invité
  UPDATE public.reservations
  SET 
    guest_name = COALESCE(p_guest_name, guest_name),
    guest_phone = COALESCE(p_guest_phone, guest_phone),
    notes = COALESCE(p_notes, notes)
  WHERE id = p_reservation_id
    AND LOWER(TRIM(guest_email)) = LOWER(TRIM(p_guest_email))
    AND user_id IS NULL;

  GET DIAGNOSTICS v_found = ROW_COUNT;
  RETURN v_found > 0;
END;
$$;

-- 8. Fonction RPC pour annuler une réservation invité
CREATE OR REPLACE FUNCTION public.cancel_guest_reservation(
  p_reservation_id uuid,
  p_guest_email text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_start_date date;
  v_found boolean;
BEGIN
  -- Validation des paramètres
  IF p_reservation_id IS NULL OR p_guest_email IS NULL THEN
    RAISE EXCEPTION 'Reservation ID and email are required';
  END IF;

  -- Vérifier que la réservation existe et récupérer la date de début
  SELECT start_date INTO v_start_date
  FROM public.reservations
  WHERE id = p_reservation_id
    AND LOWER(TRIM(guest_email)) = LOWER(TRIM(p_guest_email))
    AND user_id IS NULL
    AND status != 'cancelled';

  IF v_start_date IS NULL THEN
    RETURN false;
  END IF;

  -- Vérifier la politique d'annulation (24h avant)
  IF v_start_date <= CURRENT_DATE + INTERVAL '1 day' THEN
    RAISE EXCEPTION 'Cancellation not allowed within 24 hours of start date';
  END IF;

  -- Annuler la réservation
  UPDATE public.reservations
  SET status = 'cancelled'
  WHERE id = p_reservation_id
    AND LOWER(TRIM(guest_email)) = LOWER(TRIM(p_guest_email))
    AND user_id IS NULL;

  GET DIAGNOSTICS v_found = ROW_COUNT;
  RETURN v_found > 0;
END;
$$;

-- 9. Sécuriser les permissions sur les fonctions
REVOKE ALL ON FUNCTION public.get_guest_reservation(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_guest_reservation(uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_guest_reservation(uuid, text) TO authenticated;

REVOKE ALL ON FUNCTION public.update_guest_reservation(uuid, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_guest_reservation(uuid, text, text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.update_guest_reservation(uuid, text, text, text, text) TO authenticated;

REVOKE ALL ON FUNCTION public.cancel_guest_reservation(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_guest_reservation(uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.cancel_guest_reservation(uuid, text) TO authenticated;