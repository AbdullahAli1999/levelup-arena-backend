-- Allow users to view their own email notifications
CREATE POLICY "Users can view own email notifications"
ON email_notifications
FOR SELECT
USING (auth.uid() = user_id);