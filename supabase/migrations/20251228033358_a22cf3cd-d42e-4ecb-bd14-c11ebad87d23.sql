-- =============================================
-- RENFORCEMENT SÉCURITÉ TABLE RESERVATIONS
-- =============================================

-- 1. Révoquer tous les accès publics et anonymes
REVOKE ALL ON public.reservations FROM anon;
REVOKE ALL ON public.reservations FROM public;

-- 2. Accorder les permissions au rôle authenticated uniquement
GRANT SELECT, INSERT, UPDATE ON public.reservations TO authenticated;

-- 3. Supprimer les anciennes policies SELECT pour les recréer
DROP POLICY IF EXISTS "Users can view their own reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins can view all reservations" ON public.reservations;

-- 4. Supprimer les anciennes policies UPDATE
DROP POLICY IF EXISTS "Users can update their own reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins can update all reservations" ON public.reservations;

-- 5. Supprimer les anciennes policies INSERT
DROP POLICY IF EXISTS "Anonymous guests can create reservations" ON public.reservations;
DROP POLICY IF EXISTS "Authenticated users can create reservations" ON public.reservations;

-- 6. Supprimer l'ancienne policy DELETE
DROP POLICY IF EXISTS "Admins can delete all reservations" ON public.reservations;

-- =============================================
-- NOUVELLES POLICIES SÉCURISÉES
-- =============================================

-- SELECT: Utilisateurs authentifiés ne voient QUE leurs propres réservations (user_id = auth.uid())
-- Les réservations invitées (user_id IS NULL) ne sont PAS accessibles par cette policy
CREATE POLICY "Users can only view their own reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

-- SELECT: Admins peuvent voir TOUTES les réservations
CREATE POLICY "Admins can view all reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- INSERT: Utilisateurs authentifiés créent des réservations liées à leur compte
CREATE POLICY "Authenticated users can create own reservations"
ON public.reservations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- INSERT: Réservations invitées (anonymes) - autorisées SANS authentification via anon
-- On doit réactiver cette capacité spécifiquement
GRANT INSERT ON public.reservations TO anon;

CREATE POLICY "Anonymous can create guest reservations"
ON public.reservations
FOR INSERT
TO anon
WITH CHECK (
  user_id IS NULL 
  AND guest_email IS NOT NULL 
  AND guest_name IS NOT NULL
);

-- UPDATE: Utilisateurs peuvent modifier leurs propres réservations uniquement
CREATE POLICY "Users can update their own reservations only"
ON public.reservations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND user_id IS NOT NULL)
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- UPDATE: Admins peuvent modifier toutes les réservations
CREATE POLICY "Admins can update all reservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- DELETE: Seuls les admins peuvent supprimer des réservations
CREATE POLICY "Only admins can delete reservations"
ON public.reservations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- SÉCURITÉ TABLE RESERVATION_VEHICLES
-- =============================================

-- Révoquer accès public
REVOKE ALL ON public.reservation_vehicles FROM anon;
REVOKE ALL ON public.reservation_vehicles FROM public;

-- Accorder au rôle authenticated
GRANT SELECT, INSERT ON public.reservation_vehicles TO authenticated;

-- Permettre à anon d'insérer pour les réservations invitées
GRANT INSERT ON public.reservation_vehicles TO anon;

-- Recréer les policies
DROP POLICY IF EXISTS "Users can view their own reservation vehicles" ON public.reservation_vehicles;
DROP POLICY IF EXISTS "Users can create reservation vehicles for own reservations" ON public.reservation_vehicles;
DROP POLICY IF EXISTS "Anonymous can create reservation vehicles" ON public.reservation_vehicles;

-- SELECT: Utilisateurs voient les véhicules de leurs réservations
CREATE POLICY "Users can view own reservation vehicles"
ON public.reservation_vehicles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reservations r
    WHERE r.id = reservation_vehicles.reservation_id
    AND r.user_id = auth.uid()
  )
);

-- SELECT: Admins voient tous les véhicules de réservation
CREATE POLICY "Admins can view all reservation vehicles"
ON public.reservation_vehicles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- INSERT: Utilisateurs créent pour leurs propres réservations
CREATE POLICY "Users can insert own reservation vehicles"
ON public.reservation_vehicles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reservations r
    WHERE r.id = reservation_vehicles.reservation_id
    AND r.user_id = auth.uid()
  )
);

-- INSERT: Anon peut créer pour les réservations invitées
CREATE POLICY "Anonymous can insert guest reservation vehicles"
ON public.reservation_vehicles
FOR INSERT
TO anon
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reservations r
    WHERE r.id = reservation_vehicles.reservation_id
    AND r.user_id IS NULL
  )
);