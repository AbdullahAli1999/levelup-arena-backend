import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Mail, CheckCircle, XCircle, Clock, InboxIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EmailNotification {
  id: string;
  email_type: string;
  sent_at: string;
  metadata: {
    game?: string;
    rejection_reason?: string;
  } | null;
}

export const EmailNotificationCenter = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: notifications } = useQuery({
    queryKey: ['email-notifications-preview'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('email_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as EmailNotification[];
    },
  });

  // Set up real-time subscription for unread count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { count } = await supabase
        .from('email_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('sent_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()); // Last 24 hours

      setUnreadCount(count || 0);
    };

    fetchUnreadCount();

    const channel = supabase
      .channel('email-notifications-count')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'email_notifications'
        },
        () => {
          fetchUnreadCount();
          queryClient.invalidateQueries({ queryKey: ['email-notifications-preview'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'pro_application_received':
        return <Mail className="h-4 w-4 text-blue-400" />;
      case 'pro_application_approved':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pro_application_rejected':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Mail className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getNotificationTitle = (type: string, metadata: EmailNotification['metadata']) => {
    switch (type) {
      case 'pro_application_received':
        return 'Application Received';
      case 'pro_application_approved':
        return `${metadata?.game || 'Pro'} - Approved`;
      case 'pro_application_rejected':
        return `${metadata?.game || 'Pro'} - Rejected`;
      default:
        return 'Notification';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-primary/10 hover:border-primary transition-colors"
        >
          <Mail className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-card/95 backdrop-blur-sm border-border/50 z-50"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-lg font-bold">Email Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications && notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate('/notification-history')}
              >
                <div className="mt-0.5">
                  {getNotificationIcon(notification.email_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {getNotificationTitle(notification.email_type, notification.metadata)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(notification.sent_at), { addSuffix: true })}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-center text-sm text-primary cursor-pointer"
              onClick={() => navigate('/notification-history')}
            >
              View All Notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <InboxIcon className="h-12 w-12 mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
