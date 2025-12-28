import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, MapPin, ArrowRight, ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePickupLocations } from "@/hooks/useVehicles";
import { useBookingStore, OUT_OF_HOURS_SURCHARGE, DIFFERENT_LOCATION_SURCHARGE } from "@/stores/bookingStore";
import { cn } from "@/lib/utils";
import TimeSelect from "@/components/TimeSelect";
import { useCurrency } from "@/hooks/useCurrency";
import { Checkbox } from "@/components/ui/checkbox";

// Import location images
import locationAConvenir from "@/assets/location-a-convenir.jpg";
import locationAeroport from "@/assets/location-aeroport.jpg";
import locationCentreVille from "@/assets/location-centre-ville.jpg";

interface BookingWidgetProps {
  variant?: "hero" | "standalone";
}

// Map location names to images
const locationImages: Record<string, { image: string; label: string }> = {
  "À convenir": {
    image: locationAConvenir,
    label: "Service personnalisé à votre convenance"
  },
  "Aéroport Nelson Mandela": {
    image: locationAeroport,
    label: "Aéroport International Nelson Mandela"
  },
  "Centre-ville Praia": {
    image: locationCentreVille,
    label: "Centre-ville de Praia"
  }
};

const BookingWidget = ({ variant = "hero" }: BookingWidgetProps) => {
  const navigate = useNavigate();
  const { data: locations } = usePickupLocations();
  const { setSearchParams, setStep } = useBookingStore();
  
  const [location, setLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [differentReturnLocation, setDifferentReturnLocation] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentLabel, setCurrentLabel] = useState<string>("");
  const [isImageVisible, setIsImageVisible] = useState(false);
  
  const { format: formatPrice } = useCurrency();
  const { isOutOfHours } = useBookingStore();

  // Update image when location changes
  useEffect(() => {
    if (location && locations) {
      const selectedLocation = locations.find(loc => loc.id === location);
      if (selectedLocation) {
        const locationData = locationImages[selectedLocation.name];
        if (locationData) {
          // Fade out, then change image, then fade in
          setIsImageVisible(false);
          setTimeout(() => {
            setCurrentImage(locationData.image);
            setCurrentLabel(locationData.label);
            setIsImageVisible(true);
          }, 300);
        } else {
          setIsImageVisible(false);
          setTimeout(() => {
            setCurrentImage(null);
            setCurrentLabel("");
          }, 300);
        }
      }
    } else {
      setIsImageVisible(false);
      setTimeout(() => {
        setCurrentImage(null);
        setCurrentLabel("");
      }, 300);
    }
  }, [location, locations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) return;
    
    const startStr = format(startDate, "yyyy-MM-dd");
    const endStr = format(endDate, "yyyy-MM-dd");
    
    const effectiveReturnLocation = differentReturnLocation ? returnLocation : location;
    
    // Update booking store
    setSearchParams({
      pickupLocationId: location,
      returnLocationId: effectiveReturnLocation,
      startDate: startStr,
      endDate: endStr,
      startTime,
      endTime,
    });
    setStep(1);
    
    navigate(`/reserver?location=${location}&returnLocation=${effectiveReturnLocation}&start=${startStr}&end=${endStr}&startTime=${startTime}&endTime=${endTime}`);
  };

  // Calculate total surcharges for display
  const outOfHoursSurcharge = 
    (isOutOfHours(startTime) ? OUT_OF_HOURS_SURCHARGE : 0) + 
    (isOutOfHours(endTime) ? OUT_OF_HOURS_SURCHARGE : 0);
  const differentLocationSurcharge = (differentReturnLocation && returnLocation && returnLocation !== location) ? DIFFERENT_LOCATION_SURCHARGE : 0;
  const totalSurcharge = outOfHoursSurcharge + differentLocationSurcharge;

  const containerClass = variant === "hero" 
    ? "glass rounded-2xl p-6 md:p-8 shadow-elevated"
    : "bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      {/* Dynamic Location Image */}
      <div 
        className={cn(
          "relative overflow-hidden rounded-2xl transition-all duration-500 ease-out",
          currentImage ? "h-48 md:h-64 opacity-100" : "h-0 opacity-0"
        )}
      >
        {currentImage && (
          <>
            <img
              src={currentImage}
              alt={currentLabel}
              className={cn(
                "w-full h-full object-cover transition-all duration-500 ease-out",
                isImageVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            
            {/* Location label */}
            <div 
              className={cn(
                "absolute bottom-4 left-4 right-4 transition-all duration-500 delay-100",
                isImageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">{currentLabel}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className={containerClass}>
        <div className="space-y-4">
          {/* Row 1: Location, Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Lieu de prise en charge
              </label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  // Reset return location if pickup changes
                  if (!differentReturnLocation) {
                    setReturnLocation(e.target.value);
                  }
                }}
                className="flex h-12 w-full rounded-xl border-2 border-border bg-secondary/50 px-4 py-3 text-base text-foreground ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/50"
                required
              >
                <option value="">Sélectionner</option>
                {locations?.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                Date de départ
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal rounded-xl border-2 border-border bg-secondary/50 px-4",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd MMM yyyy", { locale: fr }) : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      // Reset end date if it's before the new start date
                      if (date && endDate && endDate < date) {
                        setEndDate(undefined);
                      }
                    }}
                    disabled={(date) => date < today}
                    initialFocus
                    locale={fr}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                Date de retour
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal rounded-xl border-2 border-border bg-secondary/50 px-4",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd MMM yyyy", { locale: fr }) : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || today)}
                    initialFocus
                    locale={fr}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Different return location option */}
          <div className="flex items-center space-x-3 py-2">
            <Checkbox
              id="different-return"
              checked={differentReturnLocation}
              onCheckedChange={(checked) => {
                setDifferentReturnLocation(checked === true);
                if (!checked) {
                  setReturnLocation(location);
                }
              }}
            />
            <label
              htmlFor="different-return"
              className="text-sm font-medium text-muted-foreground cursor-pointer flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4 text-primary" />
              Retourner le véhicule à un autre lieu
              {differentReturnLocation && (
                <span className="text-xs text-amber-600 dark:text-amber-400 ml-1">
                  (+{formatPrice(DIFFERENT_LOCATION_SURCHARGE)})
                </span>
              )}
            </label>
          </div>

          {/* Return location selector - only visible when different return is checked */}
          {differentReturnLocation && (
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Lieu de retour
              </label>
              <select
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                className="flex h-12 w-full rounded-xl border-2 border-accent/50 bg-secondary/50 px-4 py-3 text-base text-foreground ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-accent"
                required
              >
                <option value="">Sélectionner le lieu de retour</option>
                {locations?.filter(loc => loc.id !== location).map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Row 2: Times and Submit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Start Time */}
            <TimeSelect
              value={startTime}
              onChange={setStartTime}
              label="Heure de prise en charge"
            />

            {/* End Time */}
            <TimeSelect
              value={endTime}
              onChange={setEndTime}
              label="Heure de retour"
            />

            {/* Submit */}
            <div className="flex items-end">
              <div className="w-full space-y-2">
                {totalSurcharge > 0 && (
                  <div className="text-sm text-amber-600 dark:text-amber-400 text-center space-y-0.5">
                    {outOfHoursSurcharge > 0 && (
                      <div>Supplément hors horaires : +{formatPrice(outOfHoursSurcharge)}</div>
                    )}
                    {differentLocationSurcharge > 0 && (
                      <div>Supplément lieu de retour différent : +{formatPrice(differentLocationSurcharge)}</div>
                    )}
                  </div>
                )}
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full"
                  disabled={!location || !startDate || !endDate || (differentReturnLocation && !returnLocation)}
                >
                  Voir les véhicules
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingWidget;
