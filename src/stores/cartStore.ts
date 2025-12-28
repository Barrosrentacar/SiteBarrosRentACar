import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vehicle } from "@/hooks/useVehicles";

interface CartState {
  selectedVehicles: Vehicle[];
  startDate: string;
  endDate: string;
  pickupLocationId: string;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (vehicleId: string) => void;
  isVehicleSelected: (vehicleId: string) => boolean;
  setDates: (start: string, end: string) => void;
  setPickupLocation: (locationId: string) => void;
  clearCart: () => void;
  getTotalPrice: (days: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      selectedVehicles: [],
      startDate: "",
      endDate: "",
      pickupLocationId: "",

      addVehicle: (vehicle) => {
        set((state) => ({
          selectedVehicles: [...state.selectedVehicles, vehicle],
        }));
      },

      removeVehicle: (vehicleId) => {
        set((state) => ({
          selectedVehicles: state.selectedVehicles.filter((v) => v.id !== vehicleId),
        }));
      },

      isVehicleSelected: (vehicleId) => {
        return get().selectedVehicles.some((v) => v.id === vehicleId);
      },

      setDates: (start, end) => {
        set({ startDate: start, endDate: end });
      },

      setPickupLocation: (locationId) => {
        set({ pickupLocationId: locationId });
      },

      clearCart: () => {
        set({
          selectedVehicles: [],
          startDate: "",
          endDate: "",
          pickupLocationId: "",
        });
      },

      getTotalPrice: (days) => {
        return get().selectedVehicles.reduce(
          (total, v) => total + Number(v.price_per_day) * days,
          0
        );
      },
    }),
    {
      name: "barros-cart",
    }
  )
);
