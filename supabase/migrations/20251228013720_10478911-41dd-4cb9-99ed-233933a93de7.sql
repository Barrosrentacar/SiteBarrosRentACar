-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  fuel_type TEXT DEFAULT 'Diesel',
  transmission TEXT DEFAULT 'Manuelle',
  seats INTEGER DEFAULT 5,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on vehicles (public read)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view vehicles" 
ON public.vehicles FOR SELECT 
TO anon, authenticated
USING (true);

-- Create pickup locations table
CREATE TABLE public.pickup_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pickup_locations (public read)
ALTER TABLE public.pickup_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pickup locations" 
ON public.pickup_locations FOR SELECT 
TO anon, authenticated
USING (true);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  pickup_location_id UUID REFERENCES public.pickup_locations(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'unpaid',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reservations" 
ON public.reservations FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create reservations" 
ON public.reservations FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own reservations" 
ON public.reservations FOR UPDATE 
USING (auth.uid() = user_id);

-- Create reservation_vehicles junction table (for multiple vehicles per reservation)
CREATE TABLE public.reservation_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reservation_vehicles
ALTER TABLE public.reservation_vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reservation vehicles" 
ON public.reservation_vehicles FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can create reservation vehicles" 
ON public.reservation_vehicles FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create blocked_dates table for vehicle availability
CREATE TABLE public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vehicle_id, blocked_date)
);

-- Enable RLS on blocked_dates (public read)
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blocked dates" 
ON public.blocked_dates FOR SELECT 
TO anon, authenticated
USING (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default vehicles
INSERT INTO public.vehicles (name, category, price_per_day, fuel_type, transmission, seats, image_url) VALUES
('Dacia Duster 2021', 'SUV', 45.00, 'Diesel', 'Manuelle', 5, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'),
('Toyota Corolla 2022', 'Berline', 40.00, 'Essence', 'Automatique', 5, 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800'),
('Renault Clio 2023', 'Citadine', 35.00, 'Essence', 'Manuelle', 5, 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800');

-- Insert default pickup locations
INSERT INTO public.pickup_locations (name, address) VALUES
('Aéroport Nelson Mandela', 'Aéroport International, Praia'),
('Centre-ville Praia', 'Plateau, Praia'),
('Livraison Hôtel', 'Votre hôtel à Praia');