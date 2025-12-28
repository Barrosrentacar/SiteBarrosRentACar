import { Info, Users, Fuel, Navigation, Baby, Shield, Car, Globe, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useBookingStore } from "@/stores/bookingStore";
import { useCurrency } from "@/hooks/useCurrency";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Fuel: <Fuel className="w-5 h-5" />,
  Navigation: <Navigation className="w-5 h-5" />,
  Baby: <Baby className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
};

const AdditionalOptions = () => {
  const { format } = useCurrency();
  const { additionalOptions, toggleAdditionalOption, calculateDays } = useBookingStore();
  const days = calculateDays();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Options & services additionnels
        </h2>
        <div className="flex items-start gap-2 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Les conducteurs doivent avoir leur permis de conduire depuis au moins 2 an(s) pour ce véhicule
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {additionalOptions.map((option) => (
          <Card
            key={option.id}
            className={`transition-all duration-200 ${
              option.enabled
                ? "ring-2 ring-primary/50 bg-primary/5"
                : "hover:border-muted-foreground/50"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground">
                    {iconMap[option.icon] || <Plus className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">{option.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {option.isPerDay ? (
                        <>
                          {format(option.pricePerDay)} / jour
                          {days > 0 && (
                            <span className="ml-2 text-xs">
                              (Total: {format(option.pricePerDay * days)})
                            </span>
                          )}
                        </>
                      ) : (
                        <>{format(option.priceOnce || 0)} / une fois</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="text-sm text-muted-foreground underline hover:text-foreground transition-colors">
                    Détails
                  </button>
                  <Switch
                    checked={option.enabled}
                    onCheckedChange={() => toggleAdditionalOption(option.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdditionalOptions;
