import { Calendar, MapPin, Check, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingStore, OPERATING_HOURS, DIFFERENT_LOCATION_SURCHARGE } from "@/stores/bookingStore";
import { usePickupLocations } from "@/hooks/useVehicles";
import { useCurrency } from "@/hooks/useCurrency";
import { format as formatDate } from "date-fns";
import { fr } from "date-fns/locale";

interface BookingSummaryProps {
  showDetails?: boolean;
}

const BookingSummary = ({ showDetails = true }: BookingSummaryProps) => {
  const { format } = useCurrency();
  const {
    selectedVehicle,
    startDate,
    endDate,
    startTime,
    endTime,
    pickupLocationId,
    returnLocationId,
    paymentOption,
    protectionLevel,
    additionalOptions,
    calculateDays,
    calculateBasePrice,
    calculateOptionsPrice,
    calculateProtectionPrice,
    calculateMileagePrice,
    calculatePaymentOptionPrice,
    calculateOutOfHoursSurcharge,
    calculateDifferentLocationSurcharge,
    calculateTotal,
    isOutOfHours,
    isDifferentReturnLocation,
  } = useBookingStore();

  const { data: locations } = usePickupLocations();
  const pickupLocation = locations?.find((l) => l.id === pickupLocationId);
  const returnLocation = locations?.find((l) => l.id === returnLocationId);
  const days = calculateDays();

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return formatDate(date, "EEE dd MMM yyyy", { locale: fr });
  };

  const enabledOptions = additionalOptions.filter((opt) => opt.enabled);

  return (
    <Card className="sticky top-28">
      <CardContent className="p-6">
        {/* Vehicle info */}
        {selectedVehicle && (
          <div className="flex gap-4 pb-4 border-b border-border/50">
            <img
              src={selectedVehicle.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"}
              alt={selectedVehicle.name}
              className="w-20 h-14 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold text-foreground">{selectedVehicle.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedVehicle.category}</p>
            </div>
          </div>
        )}

        {/* Dates & Location */}
        {(startDate || location) && (
          <div className="py-4 border-b border-border/50 space-y-3">
            {startDate && endDate && (
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Prise en charge</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {formatDisplayDate(startDate)}
                    </p>
                    {startTime && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className={`text-xs ${isOutOfHours(startTime) ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                          {startTime}
                          {isOutOfHours(startTime) && " (hors horaires)"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4 border-l-2 border-dashed border-border h-4" />
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Retour</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {formatDisplayDate(endDate)}
                    </p>
                    {endTime && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className={`text-xs ${isOutOfHours(endTime) ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                          {endTime}
                          {isOutOfHours(endTime) && " (hors horaires)"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {pickupLocation && (
              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Lieu de prise en charge</p>
                  <p className="text-sm font-medium text-foreground">{pickupLocation.name}</p>
                </div>
              </div>
            )}

            {returnLocation && (
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDifferentReturnLocation() ? "bg-accent/10" : "bg-secondary"
                }`}>
                  <MapPin className={`w-4 h-4 ${isDifferentReturnLocation() ? "text-accent" : "text-primary"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Lieu de retour</p>
                  <p className="text-sm font-medium text-foreground">
                    {returnLocation.name}
                    {isDifferentReturnLocation() && (
                      <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">
                        (+{format(DIFFERENT_LOCATION_SURCHARGE)})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment option badge */}
        {paymentOption && (
          <div className="py-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Paiement en ligne</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                paymentOption === "best_price" 
                  ? "bg-success/10 text-success" 
                  : "bg-accent/10 text-accent"
              }`}>
                {paymentOption === "best_price" ? "MEILLEUR PRIX" : "FLEXIBLE"}
              </span>
            </div>
          </div>
        )}

        {/* What's included */}
        {showDetails && (
          <div className="py-4 border-b border-border/50 space-y-2">
            <p className="text-sm font-medium text-foreground">Ce qui est inclus</p>
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
              {protectionLevel !== "none" && (
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">
                    Protection {protectionLevel === "basic" ? "basique" : protectionLevel === "intermediate" ? "intermédiaire" : "complète"}
                  </span>
                </div>
              )}
              {enabledOptions.map((opt) => (
                <div key={opt.id} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">{opt.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price breakdown */}
        <div className="pt-4 space-y-2">
          {selectedVehicle && days > 0 && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {selectedVehicle.name} × {days} jour{days > 1 ? "s" : ""}
                </span>
                <span className="text-foreground">{format(calculateBasePrice())}</span>
              </div>
              
              {calculatePaymentOptionPrice() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Option flexible</span>
                  <span className="text-foreground">{format(calculatePaymentOptionPrice())}</span>
                </div>
              )}
              
              {calculateMileagePrice() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kilométrage illimité</span>
                  <span className="text-foreground">{format(calculateMileagePrice())}</span>
                </div>
              )}
              
              {calculateProtectionPrice() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Protection</span>
                  <span className="text-foreground">{format(calculateProtectionPrice())}</span>
                </div>
              )}
              
              {calculateOptionsPrice() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Options</span>
                  <span className="text-foreground">{format(calculateOptionsPrice())}</span>
                </div>
              )}

              {calculateOutOfHoursSurcharge() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    Supplément hors horaires
                  </span>
                  <span className="text-amber-600 dark:text-amber-400">{format(calculateOutOfHoursSurcharge())}</span>
                </div>
              )}

              {calculateDifferentLocationSurcharge() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                    Supplément lieu de retour différent
                  </span>
                  <span className="text-amber-600 dark:text-amber-400">{format(calculateDifferentLocationSurcharge())}</span>
                </div>
              )}

              <div className="flex justify-between pt-3 border-t border-border/50">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-gradient">{format(calculateTotal())}</span>
              </div>
              
              <p className="text-xs text-muted-foreground text-right">
                {format(calculateTotal() / days)}/jour
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
