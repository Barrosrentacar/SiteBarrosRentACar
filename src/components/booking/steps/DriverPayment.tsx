import { useState, useEffect } from "react";
import { Info, Check, CreditCard, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useBookingStore, PaymentMethod } from "@/stores/bookingStore";
import { usePickupLocations } from "@/hooks/useVehicles";
import { useCurrency } from "@/hooks/useCurrency";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format as formatDate } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";

// Apple Pay Logo component
const ApplePayLogo = () => (
  <svg width="50" height="20" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.365 6.56c-.527.62-1.36 1.097-2.194 1.027-.105-.85.306-1.752.787-2.308.527-.62 1.442-1.072 2.183-1.098.087.877-.25 1.74-.776 2.379zm.77.77c-1.21-.07-2.238.686-2.812.686-.58 0-1.463-.656-2.42-.638C3.43 7.398 2.064 8.38 1.325 9.872-.2 12.86.914 17.25 2.38 19.63c.72 1.18 1.58 2.5 2.717 2.45 1.08-.05 1.487-.7 2.795-.7 1.303 0 1.67.7 2.8.68 1.17-.02 1.91-1.19 2.63-2.37.82-1.36 1.153-2.68 1.17-2.75-.02-.02-2.25-.87-2.27-3.44-.02-2.15 1.75-3.18 1.83-3.24-1-1.48-2.56-1.64-3.11-1.68z" fill="#000"/>
    <path d="M22.09 4.12c3.07 0 5.21 2.11 5.21 5.18 0 3.09-2.18 5.21-5.29 5.21h-3.39v5.4h-2.5V4.12h5.97zm-3.47 8.27h2.82c2.14 0 3.36-1.15 3.36-3.08 0-1.93-1.22-3.06-3.35-3.06h-2.83v6.14zm9.91 2.92c0-2.01 1.54-3.25 4.27-3.4l3.14-.18v-.89c0-1.28-.86-2.05-2.31-2.05-1.37 0-2.23.64-2.43 1.66h-2.28c.11-2.14 1.93-3.72 4.8-3.72 2.82 0 4.63 1.49 4.63 3.81v7.97h-2.31v-1.9h-.06c-.68 1.27-2.15 2.07-3.68 2.07-2.29 0-3.77-1.39-3.77-3.37zm7.41-1.02v-.91l-2.83.18c-1.41.09-2.21.69-2.21 1.66 0 .95.83 1.58 2.1 1.58 1.66 0 2.94-1.15 2.94-2.51zm5.64 7.14v-2.01c.18.04.59.04.8.04 1.15 0 1.78-.48 2.16-1.73l.23-.75-4.33-11.99h2.6l3.02 9.67h.04l3.02-9.67h2.53l-4.49 12.58c-1.03 2.91-2.21 3.9-4.71 3.9-.2 0-.68-.02-.87-.04z" fill="#000"/>
  </svg>
);

// Check if Apple Pay is available
const checkApplePayAvailability = (): boolean => {
  if (typeof window !== "undefined" && (window as any).ApplePaySession) {
    return (window as any).ApplePaySession.canMakePayments();
  }
  return false;
};

const DriverPayment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { format } = useCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);

  // Check Apple Pay availability on mount
  useEffect(() => {
    setIsApplePayAvailable(checkApplePayAvailability());
  }, []);

  const {
    driverInfo,
    setDriverInfo,
    paymentMethod,
    setPaymentMethod,
    selectedVehicle,
    startDate,
    endDate,
    pickupLocationId,
    paymentOption,
    mileageOption,
    protectionLevel,
    additionalOptions,
    calculateDays,
    calculateTotal,
    resetBooking,
  } = useBookingStore();

  const { data: locations } = usePickupLocations();
  const location = locations?.find((l) => l.id === pickupLocationId);
  const days = calculateDays();
  const total = calculateTotal();

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return formatDate(date, "EEE dd MMM yyyy | HH:mm", { locale: fr });
  };

  const enabledOptions = additionalOptions.filter((opt) => opt.enabled);

  const isFormValid = () => {
    return (
      driverInfo.firstName &&
      driverInfo.lastName &&
      driverInfo.email &&
      driverInfo.phone &&
      driverInfo.isOver25 &&
      driverInfo.hasLicense2Years
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !selectedVehicle) return;

    setIsSubmitting(true);

    try {
      // Create reservation
      const { data: reservation, error: reservationError } = await supabase
        .from("reservations")
        .insert({
          user_id: user?.id || null,
          guest_name: `${driverInfo.firstName} ${driverInfo.lastName}`,
          guest_email: driverInfo.email,
          guest_phone: `${driverInfo.countryCode}${driverInfo.phone}`,
          pickup_location_id: pickupLocationId || null,
          start_date: startDate,
          end_date: endDate,
          total_price: total,
          notes: `Protection: ${protectionLevel}, Paiement: ${paymentOption}, Kilométrage: ${mileageOption}`,
          status: "pending",
        })
        .select()
        .single();

      if (reservationError) throw reservationError;

      // Add vehicle to reservation
      const { error: vehiclesError } = await supabase
        .from("reservation_vehicles")
        .insert({
          reservation_id: reservation.id,
          vehicle_id: selectedVehicle.id,
        });

      if (vehiclesError) throw vehiclesError;

      // Clear booking and redirect
      resetBooking();
      toast.success("Réservation confirmée !");
      navigate("/confirmation");
    } catch (error: any) {
      console.error("Reservation error:", error);
      toast.error("Une erreur est survenue lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods: { value: PaymentMethod; label: string; icon: React.ReactNode; hidden?: boolean }[] = [
    ...(isApplePayAvailable ? [{
      value: "apple_pay" as PaymentMethod,
      label: "Apple Pay",
      icon: <ApplePayLogo />,
      hidden: false,
    }] : []),
    {
      value: "card",
      label: "Carte de crédit ou de débit",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      value: "paypal",
      label: "PayPal",
      icon: (
        <span className="text-lg font-bold text-[#003087]">
          Pay<span className="text-[#009cde]">Pal</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">
        Revoir votre réservation
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Driver info */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Informations sur le conducteur
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Prénom</label>
                  <Input
                    value={driverInfo.firstName}
                    onChange={(e) => setDriverInfo({ firstName: e.target.value })}
                    placeholder="Jean"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nom de famille</label>
                  <Input
                    value={driverInfo.lastName}
                    onChange={(e) => setDriverInfo({ lastName: e.target.value })}
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Adresse e-mail</label>
                <Input
                  type="email"
                  value={driverInfo.email}
                  onChange={(e) => setDriverInfo({ email: e.target.value })}
                  placeholder="jean@exemple.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Numéro de téléphone</label>
                <div className="flex gap-2">
                  <select
                    value={driverInfo.countryCode}
                    onChange={(e) => setDriverInfo({ countryCode: e.target.value })}
                    className="flex h-12 w-24 rounded-xl border-2 border-border bg-secondary/50 px-3 text-sm"
                  >
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+238">🇨🇻 +238</option>
                  </select>
                  <Input
                    type="tel"
                    value={driverInfo.phone}
                    onChange={(e) => setDriverInfo({ phone: e.target.value })}
                    placeholder="6 XX XX XX XX"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Age & License checkboxes */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="age18"
                    checked={driverInfo.isOver25}
                    onCheckedChange={(checked) =>
                      setDriverInfo({ isOver25: checked as boolean })
                    }
                  />
                  <label htmlFor="age18" className="text-sm text-foreground cursor-pointer">
                    J'ai 18 ans ou plus
                  </label>
                </div>
              </div>

              {/* Info box */}
              <div className="flex items-start gap-2 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Les conducteurs doivent avoir leur permis de conduire depuis au moins 1 an pour ce véhicule
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="license"
                  checked={driverInfo.hasLicense2Years}
                  onCheckedChange={(checked) =>
                    setDriverInfo({ hasLicense2Years: checked as boolean })
                  }
                />
                <label htmlFor="license" className="text-sm text-foreground cursor-pointer">
                  J'ai mon permis depuis plus de 1 an
                </label>
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Moyens de paiement
            </h3>

            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const isSelected = paymentMethod === method.value;
                return (
                  <Card
                    key={method.value}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-foreground"
                        : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => setPaymentMethod(method.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-foreground bg-foreground"
                                : "border-muted-foreground"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-background" />
                            )}
                          </div>
                          <span className="font-medium text-foreground">
                            {method.label}
                          </span>
                        </div>
                        {method.icon}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {paymentOption === "best_price" && (
              <p className="text-sm text-muted-foreground mt-4">
                <span className="text-accent underline cursor-pointer">
                  Optez pour le paiement différé
                </span>{" "}
                et bénéficiez de l'annulation gratuite pour seulement {format(7 * days)} de plus.
              </p>
            )}
          </section>

          {/* Submit button */}
          <Button
            size="xl"
            variant="hero"
            className="w-full"
            disabled={!isFormValid() || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Traitement...
              </>
            ) : (
              <>
                Confirmer et payer
                <Check className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Right column - Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-5 space-y-4">
              {/* Vehicle */}
              {selectedVehicle && (
                <div className="flex gap-3">
                  <img
                    src={selectedVehicle.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"}
                    alt={selectedVehicle.name}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {selectedVehicle.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedVehicle.category}
                    </p>
                  </div>
                </div>
              )}

              {/* Dates & Location */}
              <div className="pt-4 border-t border-border space-y-3">
                <h4 className="font-semibold text-foreground text-sm">
                  Prise en charge et retour
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Prise en charge</p>
                    <p className="text-foreground font-medium">{location?.name}</p>
                    <p className="text-muted-foreground capitalize">
                      {formatDisplayDate(startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Retour</p>
                    <p className="text-foreground font-medium">{location?.name}</p>
                    <p className="text-muted-foreground capitalize">
                      {formatDisplayDate(endDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment option badge */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Paiement en ligne</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success">
                    {paymentOption === "best_price" ? "MEILLEUR PRIX" : "FLEXIBLE"}
                  </span>
                </div>
              </div>

              {/* What's included */}
              <div className="pt-4 border-t border-border space-y-2">
                <h4 className="font-semibold text-foreground text-sm">Ce qui est inclus</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">Assurance au tiers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">Assistance dépannage 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">1000 km inclus</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-gradient">{format(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverPayment;
