import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { useVehicles } from "@/hooks/useVehicles";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Loader2 } from "lucide-react";

const Vehicules = () => {
  const { data: vehicles, isLoading, error } = useVehicles();
  const { selectedVehicles } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Notre <span className="text-gradient">Flotte</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez un ou plusieurs véhicules pour votre réservation
            </p>
          </div>

          {/* Selected Vehicles Banner */}
          {selectedVehicles.length > 0 && (
            <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">
                  {selectedVehicles.length} véhicule{selectedVehicles.length > 1 ? "s" : ""} sélectionné{selectedVehicles.length > 1 ? "s" : ""}
                </span>
              </div>
              <Link to="/reserver">
                <Button>
                  Continuer la réservation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-destructive">Une erreur est survenue lors du chargement des véhicules.</p>
            </div>
          )}

          {/* Vehicles Grid */}
          {vehicles && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          {vehicles?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Aucun véhicule disponible pour le moment.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicules;
