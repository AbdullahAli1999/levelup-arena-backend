-- Create support tickets table
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_type text NOT NULL CHECK (recipient_type IN ('MODERATOR', 'TRAINER')),
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
  priority text NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Users can create their own tickets
CREATE POLICY "Users can create own tickets"
ON public.support_tickets
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can view their own tickets
CREATE POLICY "Users can view own tickets"
ON public.support_tickets
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Moderators and trainers can view tickets addressed to them
CREATE POLICY "Moderators can view moderator tickets"
ON public.support_tickets
FOR SELECT
TO authenticated
USING (
  recipient_type = 'MODERATOR' AND 
  has_role(auth.uid(), 'MODERATOR'::app_role)
);

CREATE POLICY "Trainers can view trainer tickets"
ON public.support_tickets
FOR SELECT
TO authenticated
USING (
  recipient_type = 'TRAINER' AND 
  has_role(auth.uid(), 'TRAINER'::app_role)
);

-- Moderators and trainers can update tickets addressed to them
CREATE POLICY "Moderators can update moderator tickets"
ON public.support_tickets
FOR UPDATE
TO authenticated
USING (
  recipient_type = 'MODERATOR' AND 
  has_role(auth.uid(), 'MODERATOR'::app_role)
);

CREATE POLICY "Trainers can update trainer tickets"
ON public.support_tickets
FOR UPDATE
TO authenticated
USING (
  recipient_type = 'TRAINER' AND 
  has_role(auth.uid(), 'TRAINER'::app_role)
);

-- Create trigger for updated_at
CREATE TRIGGER update_support_tickets_updated_at
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();