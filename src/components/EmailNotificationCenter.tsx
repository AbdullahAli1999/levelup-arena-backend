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
import { Mail, CheckCircle, XCircle, Clock, InboxIcon, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface EmailNotification {
  id: string;
  email_type: string;
  sent_at: string;
  is_read: boolean;
  metadata: {
    game?: string;
    rejection_reason?: string;
  } | null;
}

export const EmailNotificationCenter = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
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

  const markAsRead = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from('email_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['email-notifications-preview'] });
      toast({
        title: 'Marked as read',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Failed to mark as read',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('email_notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['email-notifications-preview'] });
      toast({
        title: 'All notifications marked as read',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Failed to mark all as read',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  // Set up real-time subscription for unread count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { count } = await supabase
        .from('email_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      setUnreadCount(count || 0);
    };

    fetchUnreadCount();

    const channel = supabase
      .channel('email-notifications-count')
      .on(
        'postgres_changes',
        {
          event: '*',
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
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Email Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-7 text-xs hover:bg-primary/10 hover:text-primary"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications && notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors group"
                onClick={() => navigate('/notification-history')}
              >
                <div className="mt-0.5">
                  {getNotificationIcon(notification.email_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${!notification.is_read ? 'font-bold' : ''}`}>
                    {getNotificationTitle(notification.email_type, notification.metadata)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(notification.sent_at), { addSuffix: true })}
                  </div>
                </div>
                {!notification.is_read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => markAsRead(notification.id, e)}
                    title="Mark as read"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                )}
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
