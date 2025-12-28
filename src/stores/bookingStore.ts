import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vehicle } from "@/hooks/useVehicles";

// Payment options
export type PaymentOption = "best_price" | "flexible";

// Mileage options
export type MileageOption = "included" | "unlimited";

// Protection levels
export type ProtectionLevel = "none" | "basic" | "intermediate" | "complete";

// Additional options
export interface AdditionalOption {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  priceOnce?: number;
  isPerDay: boolean;
  icon: string;
  enabled: boolean;
}

// Driver info
export interface DriverInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  isOver25: boolean;
  hasLicense2Years: boolean;
}

// Payment method
export type PaymentMethod = "card" | "paypal" | "apple_pay";

// Operating hours configuration
export const OPERATING_HOURS = {
  open: 8, // 8h00
  close: 20, // 20h00
};

// Out-of-hours surcharge per occurrence (pickup or return)
export const OUT_OF_HOURS_SURCHARGE = 30;

// Different return location surcharge
export const DIFFERENT_LOCATION_SURCHARGE = 25;

interface BookingState {
  // Step 1: Search
  pickupLocationId: string;
  returnLocationId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  
  // Step 2: Vehicle
  selectedVehicle: Vehicle | null;
  
  // Step 3: Payment & Mileage
  paymentOption: PaymentOption;
  mileageOption: MileageOption;
  
  // Step 4: Protection
  protectionLevel: ProtectionLevel;
  
  // Step 5: Additional Options
  additionalOptions: AdditionalOption[];
  
  // Step 6: Driver & Payment
  driverInfo: DriverInfo;
  paymentMethod: PaymentMethod;
  
  // Current step
  currentStep: number;
  
  // Actions
  setSearchParams: (params: { pickupLocationId?: string; returnLocationId?: string; startDate?: string; endDate?: string; startTime?: string; endTime?: string }) => void;
  setVehicle: (vehicle: Vehicle | null) => void;
  setPaymentOption: (option: PaymentOption) => void;
  setMileageOption: (option: MileageOption) => void;
  setProtectionLevel: (level: ProtectionLevel) => void;
  toggleAdditionalOption: (optionId: string) => void;
  setDriverInfo: (info: Partial<DriverInfo>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
  
  // Computed
  calculateDays: () => number;
  calculateBasePrice: () => number;
  calculateOptionsPrice: () => number;
  calculateProtectionPrice: () => number;
  calculateMileagePrice: () => number;
  calculatePaymentOptionPrice: () => number;
  calculateOutOfHoursSurcharge: () => number;
  calculateDifferentLocationSurcharge: () => number;
  calculateTotal: () => number;
  isOutOfHours: (time: string) => boolean;
  isDifferentReturnLocation: () => boolean;
  
  // Cart helpers
  hasActiveBooking: () => boolean;
  getEnabledOptions: () => AdditionalOption[];
}

const defaultAdditionalOptions: AdditionalOption[] = [
  {
    id: "additional_driver",
    name: "Conducteur supplémentaire",
    description: "Ajoutez un conducteur supplémentaire à votre location",
    pricePerDay: 13,
    isPerDay: true,
    icon: "Users",
    enabled: false,
  },
  {
    id: "fuel_service",
    name: "Service de plein/recharge",
    description: "Retournez le véhicule sans faire le plein",
    pricePerDay: 0,
    priceOnce: 13,
    isPerDay: false,
    icon: "Fuel",
    enabled: false,
  },
  {
    id: "gps_carplay",
    name: "GPS / Apple CarPlay / Android Auto",
    description: "Navigation et connectivité smartphone incluses",
    pricePerDay: 20.99,
    isPerDay: true,
    icon: "Navigation",
    enabled: false,
  },
  {
    id: "baby_seat",
    name: "Siège bébé",
    description: "Siège auto pour bébé (0-12 mois)",
    pricePerDay: 16,
    isPerDay: true,
    icon: "Baby",
    enabled: false,
  },
  {
    id: "child_seat",
    name: "Siège enfant",
    description: "Siège auto pour enfant (1-4 ans)",
    pricePerDay: 16,
    isPerDay: true,
    icon: "Baby",
    enabled: false,
  },
  {
    id: "booster_seat",
    name: "Rehausseur garanti",
    description: "Rehausseur pour enfant (4-10 ans)",
    pricePerDay: 10.99,
    isPerDay: true,
    icon: "Baby",
    enabled: false,
  },
  {
    id: "tire_glass",
    name: "Protection pneus et vitres",
    description: "Couverture contre les dommages aux pneus et vitres",
    pricePerDay: 9.96,
    isPerDay: true,
    icon: "Shield",
    enabled: false,
  },
  {
    id: "mobility_service",
    name: "Service de mobilité",
    description: "Assistance et véhicule de remplacement en cas de panne",
    pricePerDay: 7.99,
    isPerDay: true,
    icon: "Car",
    enabled: false,
  },
  {
    id: "international_coverage",
    name: "Couverture internationale",
    description: "Conduisez dans les pays voisins sans restriction",
    pricePerDay: 0,
    priceOnce: 33.95,
    isPerDay: false,
    icon: "Globe",
    enabled: false,
  },
];

const defaultDriverInfo: DriverInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: "+33",
  isOver25: false,
  hasLicense2Years: false,
};

// Protection prices per day
const protectionPrices: Record<ProtectionLevel, number> = {
  none: 0,
  basic: 4.55,
  intermediate: 13.39,
  complete: 37.08,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial state
      pickupLocationId: "",
      returnLocationId: "",
      startDate: "",
      endDate: "",
      startTime: "09:00",
      endTime: "09:00",
      selectedVehicle: null,
      paymentOption: "best_price",
      mileageOption: "included",
      protectionLevel: "none",
      additionalOptions: defaultAdditionalOptions,
      driverInfo: defaultDriverInfo,
      paymentMethod: "card",
      currentStep: 1,

      // Actions
      setSearchParams: (params) => {
        set((state) => ({
          ...state,
          ...params,
        }));
      },

      setVehicle: (vehicle) => {
        set({ selectedVehicle: vehicle });
      },

      setPaymentOption: (option) => {
        set({ paymentOption: option });
      },

      setMileageOption: (option) => {
        set({ mileageOption: option });
      },

      setProtectionLevel: (level) => {
        set({ protectionLevel: level });
      },

      toggleAdditionalOption: (optionId) => {
        set((state) => ({
          additionalOptions: state.additionalOptions.map((opt) =>
            opt.id === optionId ? { ...opt, enabled: !opt.enabled } : opt
          ),
        }));
      },

      setDriverInfo: (info) => {
        set((state) => ({
          driverInfo: { ...state.driverInfo, ...info },
        }));
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },

      setStep: (step) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) }));
      },

      prevStep: () => {
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) }));
      },

      resetBooking: () => {
        set({
          pickupLocationId: "",
          returnLocationId: "",
          startDate: "",
          endDate: "",
          startTime: "09:00",
          endTime: "09:00",
          selectedVehicle: null,
          paymentOption: "best_price",
          mileageOption: "included",
          protectionLevel: "none",
          additionalOptions: defaultAdditionalOptions,
          driverInfo: defaultDriverInfo,
          paymentMethod: "card",
          currentStep: 1,
        });
      },

      // Computed values
      calculateDays: () => {
        const { startDate, endDate } = get();
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      },

      calculateBasePrice: () => {
        const { selectedVehicle } = get();
        const days = get().calculateDays();
        if (!selectedVehicle) return 0;
        return Number(selectedVehicle.price_per_day) * days;
      },

      calculateOptionsPrice: () => {
        const { additionalOptions } = get();
        const days = get().calculateDays();
        return additionalOptions
          .filter((opt) => opt.enabled)
          .reduce((total, opt) => {
            if (opt.isPerDay) {
              return total + opt.pricePerDay * days;
            }
            return total + (opt.priceOnce || 0);
          }, 0);
      },

      calculateProtectionPrice: () => {
        const { protectionLevel } = get();
        const days = get().calculateDays();
        return protectionPrices[protectionLevel] * days;
      },

      calculateMileagePrice: () => {
        const { mileageOption } = get();
        const days = get().calculateDays();
        if (mileageOption === "unlimited") {
          return 3.48 * days;
        }
        return 0;
      },

      calculatePaymentOptionPrice: () => {
        const { paymentOption } = get();
        const days = get().calculateDays();
        if (paymentOption === "flexible") {
          return 7 * days;
        }
        return 0;
      },

      isOutOfHours: (time: string) => {
        const hour = parseInt(time.split(":")[0], 10);
        return hour < OPERATING_HOURS.open || hour >= OPERATING_HOURS.close;
      },

      calculateOutOfHoursSurcharge: () => {
        const { startTime, endTime } = get();
        let surcharge = 0;
        if (get().isOutOfHours(startTime)) {
          surcharge += OUT_OF_HOURS_SURCHARGE;
        }
        if (get().isOutOfHours(endTime)) {
          surcharge += OUT_OF_HOURS_SURCHARGE;
        }
        return surcharge;
      },

      isDifferentReturnLocation: () => {
        const { pickupLocationId, returnLocationId } = get();
        return !!(pickupLocationId && returnLocationId && pickupLocationId !== returnLocationId);
      },

      calculateDifferentLocationSurcharge: () => {
        return get().isDifferentReturnLocation() ? DIFFERENT_LOCATION_SURCHARGE : 0;
      },

      calculateTotal: () => {
        const basePrice = get().calculateBasePrice();
        const optionsPrice = get().calculateOptionsPrice();
        const protectionPrice = get().calculateProtectionPrice();
        const mileagePrice = get().calculateMileagePrice();
        const paymentOptionPrice = get().calculatePaymentOptionPrice();
        const outOfHoursSurcharge = get().calculateOutOfHoursSurcharge();
        const differentLocationSurcharge = get().calculateDifferentLocationSurcharge();
        return basePrice + optionsPrice + protectionPrice + mileagePrice + paymentOptionPrice + outOfHoursSurcharge + differentLocationSurcharge;
      },

      // Cart helpers
      hasActiveBooking: () => {
        const { startDate, endDate, selectedVehicle } = get();
        return !!(startDate && endDate && selectedVehicle);
      },

      getEnabledOptions: () => {
        return get().additionalOptions.filter((opt) => opt.enabled);
      },
    }),
    {
      name: "barros-booking",
    }
  )
);
