import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/bookingStore";
import { useCurrency } from "@/hooks/useCurrency";
import BookingProgress from "@/components/booking/BookingProgress";
import BookingSummary from "@/components/booking/BookingSummary";
import VehicleSelection from "@/components/booking/steps/VehicleSelection";
import PaymentMileageOptions from "@/components/booking/steps/PaymentMileageOptions";
import ProtectionSelection from "@/components/booking/steps/ProtectionSelection";
import AdditionalOptions from "@/components/booking/steps/AdditionalOptions";
import DriverPayment from "@/components/booking/steps/DriverPayment";

const Reserver = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { format } = useCurrency();

  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    selectedVehicle,
    startDate,
    endDate,
    pickupLocationId,
    setSearchParams,
    calculateTotal,
    calculateDays,
  } = useBookingStore();

  // Initialize from URL params
  useEffect(() => {
    const location = searchParams.get("location");
    const returnLocationParam = searchParams.get("returnLocation");
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const startTimeParam = searchParams.get("startTime");
    const endTimeParam = searchParams.get("endTime");
    
    if (location || returnLocationParam || start || end || startTimeParam || endTimeParam) {
      setSearchParams({
        pickupLocationId: location || undefined,
        returnLocationId: returnLocationParam || location || undefined,
        startDate: start || undefined,
        endDate: end || undefined,
        startTime: startTimeParam || undefined,
        endTime: endTimeParam || undefined,
      });
    }
  }, [searchParams, setSearchParams]);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const days = calculateDays();
  const total = calculateTotal();

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedVehicle !== null;
      case 2:
      case 3:
      case 4:
        return true;
      case 5:
        return true;
      default:
        return true;
    }
  };

  // Show empty state if no dates
  if (!startDate || !endDate) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Car className="w-8 h-8 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Commencez votre réservation
              </h1>
              <p className="text-muted-foreground mb-8">
                Sélectionnez vos dates et lieu de prise en charge pour voir les véhicules disponibles.
              </p>
              <Link to="/">
                <Button variant="hero">
                  Retour à l'accueil
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VehicleSelection />;
      case 2:
        return <PaymentMileageOptions />;
      case 3:
        return <ProtectionSelection />;
      case 4:
        return <AdditionalOptions />;
      case 5:
        return <DriverPayment />;
      default:
        return <VehicleSelection />;
    }
  };

  const getStepCTA = () => {
    switch (currentStep) {
      case 1:
        return "Suivant";
      case 2:
        return "Suivant";
      case 3:
        return "Continuer";
      case 4:
        return "Suivant";
      default:
        return "Suivant";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Progress */}
          <div className="max-w-4xl mx-auto mb-10">
            <BookingProgress currentStep={currentStep} totalSteps={5} />
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            {currentStep < 5 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 animate-fade-in">
                  {renderStep()}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <BookingSummary showDetails={currentStep > 1} />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                {renderStep()}
              </div>
            )}

            {/* Navigation - Only for steps 1-4 */}
            {currentStep < 5 && (
              <div className="max-w-4xl mx-auto mt-8">
                {/* Mobile price bar */}
                <div className="lg:hidden mb-4 p-4 rounded-xl bg-card border border-border flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold text-gradient">{format(total)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{format(total / Math.max(days, 1))}/jour</p>
                </div>

                <div className="flex justify-between items-center">
                  {currentStep > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                  >
                    {getStepCTA()}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reserver;
