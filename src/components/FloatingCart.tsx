import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, X, Calendar, MapPin, Car, Shield, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBookingStore, ProtectionLevel } from "@/stores/bookingStore";
import { useCurrency } from "@/hooks/useCurrency";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const protectionLabels: Record<ProtectionLevel, string> = {
  none: "Aucune protection",
  basic: "Protection de base",
  intermediate: "Protection intermédiaire",
  complete: "Protection complète",
};

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { format: formatPrice } = useCurrency();

  const {
    startDate,
    endDate,
    selectedVehicle,
    protectionLevel,
    mileageOption,
    paymentOption,
    hasActiveBooking,
    getEnabledOptions,
    calculateDays,
    calculateTotal,
    setVehicle,
    resetBooking,
    currentStep,
  } = useBookingStore();

  const isActive = hasActiveBooking();
  const enabledOptions = getEnabledOptions();
  const days = calculateDays();
  const total = calculateTotal();

  // Don't show on confirmation page or if no active booking
  if (location.pathname === "/confirmation" || !isActive) {
    return null;
  }

  const handleResume = () => {
    setIsOpen(false);
    navigate(`/reserver?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleClear = () => {
    resetBooking();
    setIsOpen(false);
  };

  const handleRemoveVehicle = () => {
    setVehicle(null);
  };

  const formattedStartDate = startDate
    ? format(new Date(startDate), "d MMM yyyy", { locale: fr })
    : "";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "d MMM yyyy", { locale: fr })
    : "";

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-primary shadow-elevated animate-fade-in">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-between py-3 text-primary-foreground"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Réservation en cours</p>
                <p className="text-xs opacity-80">
                  {selectedVehicle?.name} • {formattedStartDate} → {formattedEndDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0 text-base font-semibold">
                {formatPrice(total)}
              </Badge>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-premium z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Votre réservation</h2>
                <p className="text-sm text-muted-foreground">Étape {currentStep} sur 6</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Dates */}
            <Card className="p-4 bg-muted/50 border-0">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Dates de location</p>
                  <p className="font-medium text-foreground">
                    {formattedStartDate} → {formattedEndDate}
                  </p>
                  <p className="text-xs text-muted-foreground">{days} jour{days > 1 ? "s" : ""}</p>
                </div>
              </div>
            </Card>

            {/* Vehicle */}
            {selectedVehicle && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    Véhicule sélectionné
                  </h3>
                  <button
                    onClick={handleRemoveVehicle}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Card className="p-4 border border-border/50">
                  <div className="flex gap-4">
                    {selectedVehicle.image_url && (
                      <img
                        src={selectedVehicle.image_url}
                        alt={selectedVehicle.name}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{selectedVehicle.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedVehicle.category}</p>
                      <p className="text-sm font-medium text-primary">
                        {formatPrice(Number(selectedVehicle.price_per_day))}/jour
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <Separator />

            {/* Options summary */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Options sélectionnées</h3>
              
              {/* Payment option */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mode de paiement</span>
                <span className="text-foreground">
                  {paymentOption === "best_price" ? "Meilleur prix" : "Flexibilité"}
                </span>
              </div>

              {/* Mileage */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kilométrage</span>
                <span className="text-foreground">
                  {mileageOption === "included" ? "Inclus (200km/jour)" : "Illimité"}
                </span>
              </div>

              {/* Protection */}
              {protectionLevel !== "none" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Protection</span>
                  <span className="text-foreground flex items-center gap-1">
                    <Shield className="w-3 h-3 text-success" />
                    {protectionLabels[protectionLevel]}
                  </span>
                </div>
              )}

              {/* Additional options */}
              {enabledOptions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Options supplémentaires</p>
                  {enabledOptions.map((option) => (
                    <div key={option.id} className="flex justify-between text-sm">
                      <span className="text-foreground">{option.name}</span>
                      <span className="text-muted-foreground">
                        {option.isPerDay
                          ? `${formatPrice(option.pricePerDay)}/jour`
                          : formatPrice(option.priceOnce || 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-foreground">Total estimé</span>
              <span className="text-2xl font-bold text-gradient">{formatPrice(total)}</span>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleResume}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
                size="lg"
              >
                Reprendre ma réservation
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={handleClear}
                variant="ghost"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vider le panier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingCart;
