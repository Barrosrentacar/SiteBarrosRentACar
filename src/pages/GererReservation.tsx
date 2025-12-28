import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Loader2, Info, Calendar, MapPin, Car, Phone, Mail, User, FileText, AlertCircle, Check, X, Edit2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCurrency } from "@/hooks/useCurrency";

interface Vehicle {
  id: string;
  name: string;
  image_url: string | null;
  price_per_day: number;
  seats: number;
  fuel_type: string;
  transmission: string;
  category: string;
}

interface ReservationVehicle {
  id: string;
  vehicle: Vehicle;
}

interface PickupLocation {
  id: string;
  name: string;
  address: string | null;
}

interface Reservation {
  id: string;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string | null;
  payment_status: string | null;
  notes: string | null;
  created_at: string;
  pickup_location: PickupLocation | null;
  reservation_vehicles: ReservationVehicle[];
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "En attente", variant: "secondary" },
  confirmed: { label: "Confirmée", variant: "default" },
  cancelled: { label: "Annulée", variant: "destructive" },
  completed: { label: "Terminée", variant: "outline" },
};

const GererReservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [reservationId, setReservationId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ guest_name: "", guest_phone: "", notes: "" });
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { format } = useCurrency();

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReservation(null);

    if (!reservationId.trim() || !email.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke("manage-reservation", {
        body: { reservationId: reservationId.trim(), email: email.trim().toLowerCase(), action: "get" },
      });

      if (fetchError) throw fetchError;

      if (data.error) {
        setError(data.error);
        return;
      }

      setReservation(data.reservation);
      setEditedData({
        guest_name: data.reservation.guest_name || "",
        guest_phone: data.reservation.guest_phone || "",
        notes: data.reservation.notes || "",
      });
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!reservation) return;

    setIsLoading(true);

    try {
      const { data, error: updateError } = await supabase.functions.invoke("manage-reservation", {
        body: {
          reservationId: reservation.id,
          email: reservation.guest_email,
          action: "update",
          updates: editedData,
        },
      });

      if (updateError) throw updateError;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setReservation(data.reservation);
      setIsEditing(false);
      toast.success("Réservation mise à jour avec succès");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!reservation) return;

    setIsCancelling(true);

    try {
      const { data, error: cancelError } = await supabase.functions.invoke("manage-reservation", {
        body: {
          reservationId: reservation.id,
          email: reservation.guest_email,
          action: "cancel",
        },
      });

      if (cancelError) throw cancelError;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setReservation((prev) => (prev ? { ...prev, status: "cancelled" } : null));
      setShowCancelDialog(false);
      toast.success("Réservation annulée avec succès");
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Erreur lors de l'annulation");
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Gérez votre <span className="text-gradient">réservation</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Modifiez votre réservation comme vous le souhaitez, rapidement et facilement.
              </p>
            </div>

            {/* Search Form */}
            {!reservation && (
              <Card className="animate-fade-in">
                <CardContent className="p-8">
                  <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                          Numéro de réservation
                        </label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-1 rounded hover:bg-secondary transition-colors">
                                <Info className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <p>Vous trouverez votre numéro de réservation dans l'email de confirmation que vous avez reçu après votre réservation.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        type="text"
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
                        placeholder="Ex: a1b2c3d4-..."
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Adresse e-mail
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="text-base"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Recherche...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Suivant
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Reservation Details */}
            {reservation && (
              <div className="space-y-6 animate-fade-in">
                {/* Status Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Réservation</p>
                        <p className="font-mono text-sm text-foreground">{reservation.id}</p>
                      </div>
                      <Badge variant={statusLabels[reservation.status || "pending"]?.variant || "secondary"}>
                        {statusLabels[reservation.status || "pending"]?.label || reservation.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReservation(null);
                        setReservationId("");
                        setEmail("");
                      }}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Rechercher une autre réservation
                    </Button>
                  </CardContent>
                </Card>

                {/* Vehicles */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Car className="w-5 h-5 text-primary" />
                      Véhicules
                    </h3>
                    <div className="space-y-4">
                      {reservation.reservation_vehicles.map((rv) => (
                        <div key={rv.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                          <img
                            src={rv.vehicle.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"}
                            alt={rv.vehicle.name}
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{rv.vehicle.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {rv.vehicle.seats} places • {rv.vehicle.fuel_type} • {rv.vehicle.transmission}
                            </p>
                          </div>
                          <p className="font-semibold text-foreground">
                            {format(Number(rv.vehicle.price_per_day))}/jour
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Dates & Location */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Dates & Lieu
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Début</p>
                          <p className="text-foreground font-medium">{formatDate(reservation.start_date)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Fin</p>
                          <p className="text-foreground font-medium">{formatDate(reservation.end_date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{reservation.pickup_location?.name}</p>
                          {reservation.pickup_location?.address && (
                            <p className="text-sm text-muted-foreground">{reservation.pickup_location.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Informations de contact
                      </h3>
                      {reservation.status !== "cancelled" && reservation.status !== "completed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          {isEditing ? "Annuler" : "Modifier"}
                        </Button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Nom complet</label>
                          <Input
                            value={editedData.guest_name}
                            onChange={(e) => setEditedData({ ...editedData, guest_name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Téléphone</label>
                          <Input
                            value={editedData.guest_phone}
                            onChange={(e) => setEditedData({ ...editedData, guest_phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Notes</label>
                          <textarea
                            value={editedData.notes}
                            onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                            className="flex min-h-[100px] w-full rounded-xl border-2 border-border bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                        <Button onClick={handleUpdate} disabled={isLoading}>
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                          Enregistrer
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{reservation.guest_name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{reservation.guest_email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{reservation.guest_phone}</span>
                        </div>
                        {reservation.notes && (
                          <div className="flex items-start gap-3 pt-2">
                            <FileText className="w-4 h-4 text-muted-foreground mt-1" />
                            <span className="text-foreground">{reservation.notes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Total */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {calculateDays(reservation.start_date, reservation.end_date)} jour
                          {calculateDays(reservation.start_date, reservation.end_date) > 1 ? "s" : ""} de location
                        </p>
                        <p className="text-2xl font-bold text-gradient">{format(Number(reservation.total_price))}</p>
                      </div>
                      <Badge variant={reservation.payment_status === "paid" ? "default" : "secondary"}>
                        {reservation.payment_status === "paid" ? "Payé" : "À payer"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Cancel Button */}
                {reservation.status !== "cancelled" && reservation.status !== "completed" && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Annuler la réservation
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler la réservation ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Votre réservation sera annulée et les véhicules seront libérés.
              <br /><br />
              <strong>Politique d'annulation :</strong> L'annulation est possible jusqu'à 24h avant le début de la location.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Non, garder ma réservation
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={isCancelling}>
              {isCancelling ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Oui, annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GererReservation;
