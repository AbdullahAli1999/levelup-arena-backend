-- Add is_read column to email_notifications table
ALTER TABLE public.email_notifications 
ADD COLUMN is_read BOOLEAN DEFAULT false;

-- Create index for better performance on filtering read/unread notifications
CREATE INDEX idx_email_notifications_user_read 
ON public.email_notifications(user_id, is_read);

-- Add RLS policy to allow users to update their own notification read status
CREATE POLICY "Users can update own email notification read status"
ON public.email_notifications
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);