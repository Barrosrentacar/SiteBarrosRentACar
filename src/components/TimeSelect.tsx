import { Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { OPERATING_HOURS, OUT_OF_HOURS_SURCHARGE } from "@/stores/bookingStore";
import { useCurrency } from "@/hooks/useCurrency";

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
  label: string;
  className?: string;
}

// Generate time slots from 00:00 to 23:30 in 30-minute increments
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, "0");
      const minStr = minute.toString().padStart(2, "0");
      slots.push(`${hourStr}:${minStr}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const isOutOfHours = (time: string): boolean => {
  const hour = parseInt(time.split(":")[0], 10);
  return hour < OPERATING_HOURS.open || hour >= OPERATING_HOURS.close;
};

const TimeSelect = ({ value, onChange, label, className }: TimeSelectProps) => {
  const { format: formatPrice } = useCurrency();
  const outOfHours = isOutOfHours(value);

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 bg-secondary/50 px-4 py-3 text-base text-foreground ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          outOfHours 
            ? "border-amber-500/50 focus-visible:border-amber-500" 
            : "border-border focus-visible:border-primary/50"
        )}
      >
        {timeSlots.map((time) => {
          const isOOH = isOutOfHours(time);
          return (
            <option key={time} value={time}>
              {time} {isOOH ? `(+${OUT_OF_HOURS_SURCHARGE}€)` : ""}
            </option>
          );
        })}
      </select>
      
      {outOfHours && (
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            Hors horaires ({OPERATING_HOURS.open}h-{OPERATING_HOURS.close}h) : supplément de {formatPrice(OUT_OF_HOURS_SURCHARGE)}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimeSelect;
