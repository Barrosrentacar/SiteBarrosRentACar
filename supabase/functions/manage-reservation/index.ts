import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { reservationId, email, action, updates } = await req.json();

    if (!reservationId || !email) {
      return new Response(
        JSON.stringify({ error: "Numéro de réservation et email requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch reservation with matching ID and email
    const { data: reservation, error: fetchError } = await supabaseClient
      .from("reservations")
      .select(`
        *,
        pickup_location:pickup_locations(id, name, address),
        reservation_vehicles(
          id,
          vehicle:vehicles(id, name, image_url, price_per_day, seats, fuel_type, transmission, category)
        )
      `)
      .eq("id", reservationId)
      .eq("guest_email", email.toLowerCase().trim())
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la recherche" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!reservation) {
      return new Response(
        JSON.stringify({ error: "Aucune réservation trouvée avec ces informations" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle different actions
    if (action === "get") {
      // Return reservation details
      return new Response(
        JSON.stringify({ reservation }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "update") {
      // Only allow updating certain fields
      const allowedUpdates: Record<string, any> = {};
      
      if (updates?.guest_phone) {
        allowedUpdates.guest_phone = updates.guest_phone.trim();
      }
      if (updates?.guest_name) {
        allowedUpdates.guest_name = updates.guest_name.trim();
      }
      if (updates?.notes !== undefined) {
        allowedUpdates.notes = updates.notes?.trim() || null;
      }

      // Check if reservation can be modified (not cancelled, not completed)
      if (reservation.status === "cancelled" || reservation.status === "completed") {
        return new Response(
          JSON.stringify({ error: "Cette réservation ne peut plus être modifiée" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (Object.keys(allowedUpdates).length > 0) {
        const { error: updateError } = await supabaseClient
          .from("reservations")
          .update(allowedUpdates)
          .eq("id", reservationId);

        if (updateError) {
          console.error("Update error:", updateError);
          return new Response(
            JSON.stringify({ error: "Erreur lors de la mise à jour" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      // Fetch updated reservation
      const { data: updatedReservation } = await supabaseClient
        .from("reservations")
        .select(`
          *,
          pickup_location:pickup_locations(id, name, address),
          reservation_vehicles(
            id,
            vehicle:vehicles(id, name, image_url, price_per_day, seats, fuel_type, transmission, category)
          )
        `)
        .eq("id", reservationId)
        .single();

      return new Response(
        JSON.stringify({ reservation: updatedReservation, message: "Réservation mise à jour" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "cancel") {
      // Check if reservation can be cancelled
      if (reservation.status === "cancelled") {
        return new Response(
          JSON.stringify({ error: "Cette réservation est déjà annulée" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (reservation.status === "completed") {
        return new Response(
          JSON.stringify({ error: "Une réservation terminée ne peut pas être annulée" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check cancellation policy (e.g., at least 24h before start)
      const startDate = new Date(reservation.start_date);
      const now = new Date();
      const hoursUntilStart = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (hoursUntilStart < 24) {
        return new Response(
          JSON.stringify({ error: "L'annulation n'est plus possible moins de 24h avant le début de la location" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error: cancelError } = await supabaseClient
        .from("reservations")
        .update({ status: "cancelled" })
        .eq("id", reservationId);

      if (cancelError) {
        console.error("Cancel error:", cancelError);
        return new Response(
          JSON.stringify({ error: "Erreur lors de l'annulation" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ message: "Réservation annulée avec succès" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Default: return reservation details
    return new Response(
      JSON.stringify({ reservation }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
