import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  price_per_day: number;
  image_url: string | null;
  fuel_type: string;
  transmission: string;
  seats: number;
  available: boolean;
}

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Vehicle[];
    },
  });
};

export const usePickupLocations = () => {
  return useQuery({
    queryKey: ["pickup_locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pickup_locations")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as { id: string; name: string; address: string | null }[];
    },
  });
};
