-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anyone can view reservation vehicles" ON public.reservation_vehicles;

-- Create secure policy for reservations: users can only view their OWN reservations
CREATE POLICY "Users can view their own reservations" 
ON public.reservations 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Guest reservations (user_id IS NULL) should not be viewable by regular users
-- Only service role or admin should access them

-- Create secure policy for reservation_vehicles: only view vehicles for own reservations
CREATE POLICY "Users can view their own reservation vehicles" 
ON public.reservation_vehicles 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reservations 
    WHERE reservations.id = reservation_vehicles.reservation_id 
    AND reservations.user_id = auth.uid()
  )
);

-- Update INSERT policy for reservation_vehicles to only allow for own reservations
DROP POLICY IF EXISTS "Anyone can create reservation vehicles" ON public.reservation_vehicles;

CREATE POLICY "Users can create reservation vehicles for own reservations" 
ON public.reservation_vehicles 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reservations 
    WHERE reservations.id = reservation_vehicles.reservation_id 
    AND reservations.user_id = auth.uid()
  )
);

-- Allow anonymous users to insert reservations and reservation_vehicles during booking
CREATE POLICY "Anonymous can create reservations" 
ON public.reservations 
FOR INSERT 
TO anon
WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous can create reservation vehicles" 
ON public.reservation_vehicles 
FOR INSERT 
TO anon
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reservations 
    WHERE reservations.id = reservation_vehicles.reservation_id 
    AND reservations.user_id IS NULL
  )
);