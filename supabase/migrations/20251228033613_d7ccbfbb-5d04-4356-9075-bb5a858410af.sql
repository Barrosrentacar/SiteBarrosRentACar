-- =============================================
-- RENFORCEMENT SÉCURITÉ TABLE USER_ROLES
-- Protection contre l'escalade de privilèges
-- =============================================

-- 1. Forcer RLS (au cas où ce n'est pas déjà fait)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;

-- 2. Révoquer tous les accès publics et anonymes
REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.user_roles FROM public;

-- 3. Accorder les permissions au rôle authenticated uniquement
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;

-- 4. Supprimer l'ancienne policy SELECT si elle existe
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- =============================================
-- NOUVELLES POLICIES SÉCURISÉES
-- =============================================

-- SELECT: Utilisateurs authentifiés peuvent voir UNIQUEMENT leurs propres rôles
CREATE POLICY "Users can view own roles only"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- SELECT: Admins peuvent voir tous les rôles (pour la gestion)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- INSERT: SEULS les admins peuvent attribuer des rôles
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- UPDATE: SEULS les admins peuvent modifier des rôles
CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- DELETE: SEULS les admins peuvent supprimer des rôles
CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- PROTECTION SUPPLÉMENTAIRE : 
-- Empêcher un admin de supprimer son propre rôle admin
-- (évite de se retrouver sans admin)
-- =============================================

-- Créer une fonction pour vérifier qu'on ne supprime pas son propre rôle admin
CREATE OR REPLACE FUNCTION public.prevent_self_admin_removal()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Empêcher un admin de supprimer/modifier son propre rôle admin
  IF OLD.user_id = auth.uid() AND OLD.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot remove your own admin role. Ask another admin to do it.';
  END IF;
  RETURN OLD;
END;
$$;

-- Appliquer le trigger sur DELETE
DROP TRIGGER IF EXISTS prevent_self_admin_removal_trigger ON public.user_roles;
CREATE TRIGGER prevent_self_admin_removal_trigger
  BEFORE DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_admin_removal();