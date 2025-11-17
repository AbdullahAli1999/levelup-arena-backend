import { supabase } from "@/integrations/supabase/client";

export type NotificationType = 'booking' | 'message' | 'approval' | 'general';

export interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
}

/**
 * Create a notification for a user
 * This function can be called from anywhere in the app to send notifications
 */
export async function createNotification({
  userId,
  title,
  message,
  type,
  link
}: CreateNotificationParams) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        link,
        is_read: false
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { data: null, error };
  }
}

/**
 * Example usage:
 * 
 * // Send booking confirmation notification
 * await createNotification({
 *   userId: 'user-uuid',
 *   title: 'Booking Confirmed',
 *   message: 'Your session with Trainer John has been confirmed for tomorrow at 3 PM',
 *   type: 'booking',
 *   link: '/my-bookings'
 * });
 * 
 * // Send message notification
 * await createNotification({
 *   userId: 'user-uuid',
 *   title: 'New Message',
 *   message: 'You have a new message from your trainer',
 *   type: 'message',
 *   link: '/messages'
 * });
 * 
 * // Send approval notification
 * await createNotification({
 *   userId: 'user-uuid',
 *   title: 'Pro Application Approved',
 *   message: 'Congratulations! Your pro player application has been approved',
 *   type: 'approval',
 *   link: '/pro-dashboard'
 * });
 */
