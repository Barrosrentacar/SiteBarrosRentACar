import { Info, Check, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingStore, PaymentOption, MileageOption } from "@/stores/bookingStore";
import { useCurrency } from "@/hooks/useCurrency";

const PaymentMileageOptions = () => {
  const { format } = useCurrency();
  const {
    paymentOption,
    setPaymentOption,
    mileageOption,
    setMileageOption,
    calculateDays,
  } = useBookingStore();

  const days = calculateDays();

  const paymentOptions: { value: PaymentOption; title: string; description: string; price: number; badge?: string }[] = [
    {
      value: "best_price",
      title: "Meilleur prix",
      description: "Payez maintenant, annulez et modifiez moyennant des frais",
      price: 0,
    },
    {
      value: "flexible",
      title: "Restez flexible",
      description: "Payez à la prise en charge, annulez et modifiez gratuitement avant l'heure de la prise en charge",
      price: 7,
      badge: "Populaire",
    },
  ];

  const mileageOptions: { value: MileageOption; title: string; description: string; price: number }[] = [
    {
      value: "included",
      title: "1000 km",
      description: "+0,56 € pour chaque kilomètre supplémentaire",
      price: 0,
    },
    {
      value: "unlimited",
      title: "Kilomètres illimités",
      description: "Tous les kilomètres sont inclus dans le prix",
      price: 3.48,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Payment Options */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Options de paiement
        </h2>

        <div className="space-y-3">
          {paymentOptions.map((option) => {
            const isSelected = paymentOption === option.value;
            return (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-foreground"
                    : "hover:border-muted-foreground/50"
                }`}
                onClick={() => setPaymentOption(option.value)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Radio button */}
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
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

                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {option.title}
                          </h3>
                          {option.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                              {option.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {option.price === 0 ? (
                        <span className="font-medium text-foreground">Inclus</span>
                      ) : (
                        <span className="font-medium text-foreground">
                          + {format(option.price)} / jour
                        </span>
                      )}
                      <button className="p-1 rounded-full hover:bg-secondary">
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mileage Options */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Kilométrage</h2>

        <div className="space-y-3">
          {mileageOptions.map((option) => {
            const isSelected = mileageOption === option.value;
            return (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-foreground"
                    : "hover:border-muted-foreground/50"
                }`}
                onClick={() => setMileageOption(option.value)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Radio button */}
                      <div className="mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
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

                      <div>
                        <h3 className="font-semibold text-foreground">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {option.price === 0 ? (
                        <span className="font-medium text-foreground">Inclus</span>
                      ) : (
                        <span className="font-medium text-foreground">
                          + {format(option.price)} par jour
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PaymentMileageOptions;
