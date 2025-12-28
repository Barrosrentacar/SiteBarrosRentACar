-- Supprimer la vue reservations_public qui expose des données sans RLS appropriée
-- Les fonctions security definer (get_my_reservations, get_guest_reservation) 
-- fournissent déjà un accès sécurisé aux réservations
DROP VIEW IF EXISTS public.reservations_public;