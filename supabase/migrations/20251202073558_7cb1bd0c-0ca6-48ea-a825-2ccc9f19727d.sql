-- Fix profiles table public exposure
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a restricted policy that only allows viewing specific fields publicly
-- or users viewing their own full profile
CREATE POLICY "Users can view limited profile info"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  -- Users can view their own full profile
  auth.uid() = id OR
  -- Or admins can view all profiles
  has_role(auth.uid(), 'ADMIN'::app_role)
);

-- Create a policy for public viewing of non-sensitive profile fields
-- This would require a view or separate query logic, but for now we restrict to authenticated only

-- Fix bookings table - add UPDATE and DELETE policies
CREATE POLICY "Users can update own bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (
  (EXISTS (
    SELECT 1 FROM players
    WHERE players.id = bookings.player_id AND players.user_id = auth.uid()
  )) OR
  (EXISTS (
    SELECT 1 FROM children
    JOIN parents ON children.parent_id = parents.id
    WHERE children.id = bookings.child_id AND parents.user_id = auth.uid()
  ))
);

CREATE POLICY "Users can delete own bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (
  (EXISTS (
    SELECT 1 FROM players
    WHERE players.id = bookings.player_id AND players.user_id = auth.uid()
  )) OR
  (EXISTS (
    SELECT 1 FROM children
    JOIN parents ON children.parent_id = parents.id
    WHERE children.id = bookings.child_id AND parents.user_id = auth.uid()
  ))
);

-- Fix reviews table - drop the public policy and create a more restricted one
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;

-- Allow authenticated users to view reviews but without exposing reviewer details
-- Note: This requires application-level filtering to hide reviewer_id
CREATE POLICY "Authenticated users can view reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- Alternative: If you want to completely anonymize, you'd need a view
-- For now, we rely on the application to not display reviewer_id publicly