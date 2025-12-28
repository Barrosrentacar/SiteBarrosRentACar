import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleCard from "./VehicleCard";
import { useVehicles } from "@/hooks/useVehicles";

const VehicleShowcase = () => {
  const { data: vehicles, isLoading } = useVehicles();

  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos véhicules
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Des véhicules fiables et confortables pour explorer le Cap-Vert en toute liberté.
            </p>
          </div>
          <Link to="/vehicules">
            <Button variant="outline" size="lg">
              Voir tous les véhicules
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Vehicle Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles?.slice(0, 3).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleShowcase;
