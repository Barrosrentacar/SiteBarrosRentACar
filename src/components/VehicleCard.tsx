import { Users, Fuel, Settings, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { Vehicle } from "@/hooks/useVehicles";
import { toast } from "sonner";
import { useCurrency } from "@/hooks/useCurrency";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { addVehicle, removeVehicle, isVehicleSelected } = useCartStore();
  const { format } = useCurrency();
  const isSelected = isVehicleSelected(vehicle.id);

  const handleToggleSelect = () => {
    if (isSelected) {
      removeVehicle(vehicle.id);
      toast.info(`${vehicle.name} retiré du panier`);
    } else {
      addVehicle(vehicle);
      toast.success(`${vehicle.name} ajouté au panier`);
    }
  };

  return (
    <Card className={`group overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
      isSelected 
        ? "ring-2 ring-primary shadow-glow" 
        : "hover:shadow-elevated"
    }`}>
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
        <img
          src={vehicle.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!vehicle.available && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Indisponible</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
            {vehicle.category}
          </span>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Title & Price */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">{vehicle.name}</h3>
            <p className="text-sm text-muted-foreground">ou similaire</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gradient">{format(Number(vehicle.price_per_day))}</p>
            <p className="text-xs text-muted-foreground">par jour</p>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
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

        {/* CTA */}
        <Button 
          variant={isSelected ? "secondary" : "default"} 
          className="w-full"
          disabled={!vehicle.available}
          onClick={handleToggleSelect}
        >
          {!vehicle.available ? (
            "Indisponible"
          ) : isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Sélectionné
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
