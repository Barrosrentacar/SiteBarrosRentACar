import { Check, Users, Fuel, Settings, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/bookingStore";
import { useVehicles, Vehicle } from "@/hooks/useVehicles";
import { useCurrency } from "@/hooks/useCurrency";

const VehicleSelection = () => {
  const { format } = useCurrency();
  const { selectedVehicle, setVehicle, startDate, endDate } = useBookingStore();
  const { data: vehicles, isLoading, error } = useVehicles();

  // Filter available vehicles
  const availableVehicles = vehicles?.filter((v) => v.available) || [];

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setVehicle(vehicle);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">Erreur lors du chargement des véhicules</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choisissez votre véhicule
        </h2>
        <p className="text-muted-foreground">
          {availableVehicles.length} véhicule{availableVehicles.length > 1 ? "s" : ""} disponible{availableVehicles.length > 1 ? "s" : ""} pour vos dates
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {availableVehicles.map((vehicle) => {
          const isSelected = selectedVehicle?.id === vehicle.id;
          
          return (
            <Card
              key={vehicle.id}
              className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "ring-2 ring-primary shadow-glow"
                  : "hover:shadow-elevated hover:-translate-y-0.5"
              }`}
              onClick={() => handleSelectVehicle(vehicle)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={vehicle.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                        {vehicle.category}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {vehicle.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">ou similaire</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gradient">
                            {format(Number(vehicle.price_per_day))}
                          </p>
                          <p className="text-sm text-muted-foreground">par jour</p>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{vehicle.seats} places</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Fuel className="w-4 h-4 text-primary" />
                          <span>{vehicle.fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Settings className="w-4 h-4 text-primary" />
                          <span>{vehicle.transmission}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4">
                      <Button
                        variant={isSelected ? "secondary" : "outline"}
                        className="w-full md:w-auto"
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Sélectionné
                          </>
                        ) : (
                          "Sélectionner ce véhicule"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {availableVehicles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Aucun véhicule disponible pour ces dates. Essayez d'autres dates.
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleSelection;
