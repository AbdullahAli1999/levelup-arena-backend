import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Mail, CheckCircle, XCircle, Clock, Bell, Check } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const NotificationHistory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['email-notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('email_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('email-notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'email_notifications'
        },
        () => {
          // Refetch notifications when new ones are added
          queryClient.invalidateQueries({ queryKey: ['email-notifications'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const getEmailTypeIcon = (type: string) => {
    switch (type) {
      case 'pro_application_received':
        return <Mail className="h-5 w-5 text-blue-400" />;
      case 'pro_application_approved':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'pro_application_rejected':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getEmailTypeLabel = (type: string) => {
    switch (type) {
      case 'pro_application_received':
        return 'Application Received';
      case 'pro_application_approved':
        return 'Application Approved';
      case 'pro_application_rejected':
        return 'Application Rejected';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      sent: 'bg-green-500/10 text-green-400 border-green-500/20',
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return statusColors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('email_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['email-notifications'] });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10 hover:border-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Notification History
            </h1>
            <p className="text-muted-foreground mt-1">
              View all email notifications sent to you
            </p>
          </div>
        </div>

        {/* Notifications List */}
        {notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 ${
                  !(notification as any).is_read ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        {getEmailTypeIcon(notification.email_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className={`text-lg ${!(notification as any).is_read ? 'font-bold' : ''}`}>
                            {getEmailTypeLabel(notification.email_type)}
                          </CardTitle>
                          <Badge className={getStatusBadge(notification.status)}>
                            {notification.status}
                          </Badge>
                          {!(notification as any).is_read && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              New
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          {notification.sent_at 
                            ? format(new Date(notification.sent_at), 'PPpp')
                            : 'No date'}
                        </CardDescription>
                      </div>
                    </div>
                    {!(notification as any).is_read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="gap-2 hover:bg-green-500/10 hover:border-green-500/50"
                      >
                        <Check className="h-4 w-4" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                </CardHeader>
                {notification.metadata && (
                  <CardContent>
                    <div className="rounded-lg bg-muted/30 p-4 space-y-2">
                      {typeof notification.metadata === 'object' && notification.metadata !== null && (
                        <>
                          {(notification.metadata as any).game && (
                            <div>
                              <span className="text-sm font-medium text-foreground">Game:</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {(notification.metadata as any).game}
                              </span>
                            </div>
                          )}
                          {(notification.metadata as any).rejection_reason && (
                            <div>
                              <span className="text-sm font-medium text-foreground">Reason:</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                {(notification.metadata as any).rejection_reason}
                              </p>
                            </div>
                          )}
                          {(notification.metadata as any).next_steps && (
                            <div>
                              <span className="text-sm font-medium text-foreground">Next Steps:</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                {(notification.metadata as any).next_steps}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Mail className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
              <p className="text-muted-foreground text-center max-w-md">
                You'll see all email notifications sent to you regarding your pro player application status here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
