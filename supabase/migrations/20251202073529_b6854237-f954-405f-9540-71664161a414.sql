-- Create pro-requirements bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('pro-requirements', 'pro-requirements', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload own requirements" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own requirements" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own requirements" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own requirements" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view all requirements" ON storage.objects;

-- Allow authenticated users to upload their own requirement documents
CREATE POLICY "Users can upload own requirements"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pro-requirements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own uploaded requirements
CREATE POLICY "Users can view own requirements"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'pro-requirements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own requirements
CREATE POLICY "Users can update own requirements"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'pro-requirements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own requirements
CREATE POLICY "Users can delete own requirements"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'pro-requirements' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow admins and moderators to view all requirements
CREATE POLICY "Admins can view all requirements"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'pro-requirements' AND
  (has_role(auth.uid(), 'ADMIN'::app_role) OR has_role(auth.uid(), 'MODERATOR'::app_role))
);