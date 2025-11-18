-- Add CHILD role to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'CHILD';

-- Add approval fields to pros table
ALTER TABLE pros ADD COLUMN IF NOT EXISTS selected_game TEXT;
ALTER TABLE pros ADD COLUMN IF NOT EXISTS requirements_pdf_url TEXT;
ALTER TABLE pros ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id);
ALTER TABLE pros ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE pros ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add email notification tracking
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'sent',
  metadata JSONB
);

ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all email notifications"
ON email_notifications FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'ADMIN'));

-- Create notification function for pro approval
CREATE OR REPLACE FUNCTION notify_pro_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify when is_approved changes from false to true
  IF OLD.is_approved = false AND NEW.is_approved = true THEN
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      NEW.user_id,
      'Pro Account Approved',
      'Congratulations! Your pro player account has been approved. You can now access all pro features.',
      'approval',
      '/pro-dashboard'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for pro approval notifications
DROP TRIGGER IF EXISTS on_pro_approval ON pros;
CREATE TRIGGER on_pro_approval
  AFTER UPDATE ON pros
  FOR EACH ROW
  WHEN (OLD.is_approved IS DISTINCT FROM NEW.is_approved)
  EXECUTE FUNCTION notify_pro_approval();