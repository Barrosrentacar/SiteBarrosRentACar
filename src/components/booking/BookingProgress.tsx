import { Check } from "lucide-react";

interface BookingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { label: "Véhicule", shortLabel: "1" },
  { label: "Paiement", shortLabel: "2" },
  { label: "Protection", shortLabel: "3" },
  { label: "Options", shortLabel: "4" },
  { label: "Confirmation", shortLabel: "5" },
];

const BookingProgress = ({ currentStep, totalSteps = 5 }: BookingProgressProps) => {
  return (
    <div className="w-full">
      {/* Desktop progress */}
      <div className="hidden md:flex items-center justify-center">
        {steps.slice(0, totalSteps).map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  index + 1 < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index + 1 === currentStep
                    ? "bg-gradient-primary text-white shadow-glow"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`font-medium transition-colors ${
                  index + 1 <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-16 xl:w-24 h-0.5 mx-4 transition-colors duration-300 ${
                  index + 1 < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;
