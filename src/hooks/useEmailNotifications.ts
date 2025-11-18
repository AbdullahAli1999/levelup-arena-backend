import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

export const useEmailNotifications = () => {
  const { toast } = useToast();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setupRealtimeSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      channel = supabase
        .channel('email-notifications-toast')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'email_notifications',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            const notification = payload.new as {
              email_type: string;
              metadata?: { game?: string; rejection_reason?: string };
            };

            const getNotificationConfig = (type: string) => {
              switch (type) {
                case 'pro_application_received':
                  return {
                    title: 'Application Received',
                    description: 'We received your pro player application and will review it soon.',
                    icon: Mail
                  };
                case 'pro_application_approved':
                  return {
                    title: 'Application Approved! 🎉',
                    description: `Congratulations! Your application for ${notification.metadata?.game || 'pro player'} has been approved.`,
                    icon: CheckCircle
                  };
                case 'pro_application_rejected':
                  return {
                    title: 'Application Update',
                    description: 'Your pro player application requires attention. Check your notification history for details.',
                    icon: XCircle
                  };
                default:
                  return {
                    title: 'New Notification',
                    description: 'You have received a new email notification.',
                    icon: Mail
                  };
              }
            };

            const config = getNotificationConfig(notification.email_type);

            toast({
              title: config.title,
              description: config.description,
              duration: 6000,
            });
          }
        )
        .subscribe();
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [toast]);
};
