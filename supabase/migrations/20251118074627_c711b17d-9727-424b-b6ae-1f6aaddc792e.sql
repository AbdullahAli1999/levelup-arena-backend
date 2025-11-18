-- Allow admins and moderators to view ALL trainers (including unapproved)
CREATE POLICY "Admins and moderators can view all trainers"
ON trainers
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'ADMIN'::app_role) OR 
  has_role(auth.uid(), 'MODERATOR'::app_role)
);

-- Allow admins to update trainer approval status
CREATE POLICY "Admins can update trainers"
ON trainers
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'ADMIN'::app_role))
WITH CHECK (has_role(auth.uid(), 'ADMIN'::app_role));

-- Update pros table RLS policies to allow admins to update
CREATE POLICY "Admins can update pros"
ON pros
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'ADMIN'::app_role))
WITH CHECK (has_role(auth.uid(), 'ADMIN'::app_role));