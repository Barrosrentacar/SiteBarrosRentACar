-- =============================================
-- RENFORCEMENT SÉCURITÉ TABLE PROFILES
-- =============================================

-- 1. Révoquer tous les accès publics et anonymes sur la table profiles
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.profiles FROM public;

-- 2. S'assurer que seul le rôle authenticated a des permissions
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

-- 3. Supprimer les anciennes policies pour les recréer proprement
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 4. Créer des policies RESTRICTIVE qui exigent l'authentification

-- Policy SELECT: Utilisateurs authentifiés peuvent voir UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users can view own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy INSERT: Utilisateurs authentifiés peuvent créer UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users can insert own profile only"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy UPDATE: Utilisateurs authentifiés peuvent modifier UNIQUEMENT leur propre profil
CREATE POLICY "Authenticated users can update own profile only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. Ajouter une policy pour les admins (lecture seule pour support)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Note: Pas de policy DELETE - les profils ne peuvent pas être supprimés directement
-- La suppression se fait via CASCADE quand l'utilisateur auth est supprimé