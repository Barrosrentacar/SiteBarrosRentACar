import { Check, X, Info, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingStore, ProtectionLevel } from "@/stores/bookingStore";
import { useCurrency } from "@/hooks/useCurrency";

interface ProtectionOption {
  value: ProtectionLevel;
  title: string;
  franchise: string;
  pricePerDay: number;
  originalPrice?: number;
  discount?: string;
  stars: number;
  features: { name: string; included: boolean }[];
}

const protectionOptions: ProtectionOption[] = [
  {
    value: "none",
    title: "Aucune protection supplémentaire",
    franchise: "Franchise : jusqu'à la valeur du véhicule",
    pricePerDay: 0,
    stars: 0,
    features: [
      { name: "Assurance dommages par collision, rayures, chocs et vol", included: false },
      { name: "Protection pneus et vitres", included: false },
      { name: "Protection Intérieure", included: false },
      { name: "Service de mobilité", included: false },
    ],
  },
  {
    value: "basic",
    title: "Protection Basique",
    franchise: "Franchise : jusqu'à 2 500,00 €",
    pricePerDay: 4.55,
    stars: 1,
    features: [
      { name: "Assurance dommages par collision, rayures, chocs et vol", included: true },
      { name: "Protection pneus et vitres", included: false },
      { name: "Protection Intérieure", included: false },
      { name: "Service de mobilité", included: false },
    ],
  },
  {
    value: "intermediate",
    title: "Protection Intermédiaire",
    franchise: "Pas de franchise",
    pricePerDay: 13.39,
    originalPrice: 47.81,
    discount: "- 72% de remise en ligne",
    stars: 2,
    features: [
      { name: "Assurance dommages par collision, rayures, chocs et vol", included: true },
      { name: "Protection pneus et vitres", included: true },
      { name: "Protection Intérieure", included: true },
      { name: "Service de mobilité", included: false },
    ],
  },
  {
    value: "complete",
    title: "Protection Complète",
    franchise: "Pas de franchise",
    pricePerDay: 37.08,
    originalPrice: 60.79,
    discount: "- 39% de remise en ligne",
    stars: 3,
    features: [
      { name: "Assurance dommages par collision, rayures, chocs et vol", included: true },
      { name: "Protection pneus et vitres", included: true },
      { name: "Protection Intérieure", included: true },
      { name: "Service de mobilité", included: true },
    ],
  },
];

const ProtectionSelection = () => {
  const { format } = useCurrency();
  const { protectionLevel, setProtectionLevel, calculateDays } = useBookingStore();
  const days = calculateDays();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          De quelle protection avez-vous besoin ?
        </h2>
        <div className="flex items-start gap-2 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Les conducteurs doivent avoir leur permis de conduire depuis au moins 2 an(s) pour ce véhicule
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {protectionOptions.map((option) => {
          const isSelected = protectionLevel === option.value;
          
          return (
            <Card
              key={option.value}
              className={`cursor-pointer transition-all duration-200 h-full ${
                isSelected
                  ? "ring-2 ring-foreground"
                  : "hover:border-muted-foreground/50"
              }`}
              onClick={() => setProtectionLevel(option.value)}
            >
              <CardContent className="p-5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground leading-tight">
                      {option.title}
                    </h3>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= option.stars
                              ? "fill-foreground text-foreground"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Radio */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      isSelected
                        ? "border-foreground bg-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-background" />
                    )}
                  </div>
                </div>

                {/* Discount badge */}
                {option.discount && (
                  <span className="inline-block self-start px-2 py-0.5 rounded text-xs font-semibold bg-success/10 text-success mb-2">
                    {option.discount}
                  </span>
                )}

                {/* Franchise */}
                <p className={`text-sm font-medium mb-4 ${
                  option.franchise.includes("Pas") ? "text-success" : "text-accent"
                }`}>
                  {option.franchise}
                </p>

                {/* Features */}
                <div className="space-y-2 flex-1">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-xs ${
                        feature.included ? "text-foreground" : "text-muted-foreground/70"
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-4 pt-4 border-t border-border">
                  {option.pricePerDay === 0 ? (
                    <span className="text-lg font-bold text-foreground">Inclus</span>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">
                        {format(option.pricePerDay)}
                      </span>
                      <span className="text-sm text-muted-foreground">/ jour</span>
                      {option.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {format(option.originalPrice)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary card */}
      <Card className="bg-secondary/30">
        <CardContent className="p-5">
          <h4 className="font-semibold text-foreground mb-3">Aperçu de votre réservation :</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Assurance au tiers</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Assistance dépannage 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                1 000 km sont inclus, chaque kilomètre supplémentaire coûte 0,56 €
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProtectionSelection;
