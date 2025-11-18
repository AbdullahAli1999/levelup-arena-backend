-- Function to send booking notifications
CREATE OR REPLACE FUNCTION notify_booking_changes()
RETURNS TRIGGER AS $$
DECLARE
  v_trainer_user_id uuid;
  v_player_user_id uuid;
  v_parent_user_id uuid;
  v_session_title text;
  v_session_date timestamp with time zone;
  v_player_name text;
  v_trainer_name text;
BEGIN
  -- Get session details
  SELECT s.title, s.date, t.user_id
  INTO v_session_title, v_session_date, v_trainer_user_id
  FROM sessions s
  JOIN trainers t ON s.trainer_id = t.id
  WHERE s.id = COALESCE(NEW.session_id, OLD.session_id);

  -- Get player/parent user_id and names
  IF COALESCE(NEW.player_id, OLD.player_id) IS NOT NULL THEN
    SELECT p.user_id, pr.first_name || ' ' || pr.last_name
    INTO v_player_user_id, v_player_name
    FROM players p
    JOIN profiles pr ON p.user_id = pr.id
    WHERE p.id = COALESCE(NEW.player_id, OLD.player_id);
  ELSIF COALESCE(NEW.child_id, OLD.child_id) IS NOT NULL THEN
    SELECT pa.user_id, c.name
    INTO v_parent_user_id, v_player_name
    FROM children c
    JOIN parents pa ON c.parent_id = pa.id
    WHERE c.id = COALESCE(NEW.child_id, OLD.child_id);
  END IF;

  -- Get trainer name
  SELECT pr.first_name || ' ' || pr.last_name
  INTO v_trainer_name
  FROM profiles pr
  WHERE pr.id = v_trainer_user_id;

  -- Handle INSERT (new booking)
  IF TG_OP = 'INSERT' THEN
    -- Notify trainer
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      v_trainer_user_id,
      'New Booking',
      v_player_name || ' has booked your session "' || v_session_title || '" on ' || to_char(v_session_date, 'Mon DD, YYYY at HH24:MI'),
      'booking',
      '/trainer-dashboard'
    );

    -- Notify player/parent
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      COALESCE(v_player_user_id, v_parent_user_id),
      'Booking Confirmed',
      'Your booking for "' || v_session_title || '" with ' || v_trainer_name || ' on ' || to_char(v_session_date, 'Mon DD, YYYY at HH24:MI') || ' has been confirmed',
      'booking',
      '/my-bookings'
    );

  -- Handle UPDATE (status change)
  ELSIF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    -- Notify trainer
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      v_trainer_user_id,
      'Booking Status Updated',
      'Booking for "' || v_session_title || '" by ' || v_player_name || ' is now ' || NEW.status,
      'booking',
      '/trainer-dashboard'
    );

    -- Notify player/parent
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      COALESCE(v_player_user_id, v_parent_user_id),
      'Booking Status Updated',
      'Your booking for "' || v_session_title || '" is now ' || NEW.status,
      'booking',
      '/my-bookings'
    );

  -- Handle DELETE (cancelled booking)
  ELSIF TG_OP = 'DELETE' THEN
    -- Notify trainer
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      v_trainer_user_id,
      'Booking Cancelled',
      v_player_name || ' has cancelled their booking for "' || v_session_title || '"',
      'booking',
      '/trainer-dashboard'
    );

    -- Notify player/parent
    INSERT INTO notifications (user_id, title, message, type, link)
    VALUES (
      COALESCE(v_player_user_id, v_parent_user_id),
      'Booking Cancelled',
      'Your booking for "' || v_session_title || '" has been cancelled',
      'booking',
      '/my-bookings'
    );
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for booking changes
DROP TRIGGER IF EXISTS trigger_booking_created ON bookings;
CREATE TRIGGER trigger_booking_created
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_booking_changes();

DROP TRIGGER IF EXISTS trigger_booking_updated ON bookings;
CREATE TRIGGER trigger_booking_updated
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_booking_changes();

DROP TRIGGER IF EXISTS trigger_booking_deleted ON bookings;
CREATE TRIGGER trigger_booking_deleted
  AFTER DELETE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_booking_changes();