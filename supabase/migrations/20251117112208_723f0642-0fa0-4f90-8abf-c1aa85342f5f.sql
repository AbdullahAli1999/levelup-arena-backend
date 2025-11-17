-- Create enum types
CREATE TYPE public.app_role AS ENUM ('ADMIN', 'MODERATOR', 'PLAYER', 'PRO', 'PARENTS', 'TRAINER');
CREATE TYPE public.booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');
CREATE TYPE public.contract_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
CREATE TYPE public.payment_status AS ENUM ('SUCCESS', 'FAILED', 'PENDING');
CREATE TYPE public.payment_method AS ENUM ('CARD', 'STC_PAY', 'MADA');
CREATE TYPE public.offer_status AS ENUM ('ACTIVE', 'CLOSED');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create games table
CREATE TABLE public.games (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  genre TEXT,
  platform TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create players table
CREATE TABLE public.players (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  gaming_username TEXT,
  city TEXT,
  experience_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pros table
CREATE TABLE public.pros (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  gaming_username TEXT,
  bio TEXT,
  specialization TEXT,
  hourly_rate DECIMAL(10,2),
  cv_url TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create parents table
CREATE TABLE public.parents (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create children table
CREATE TABLE public.children (
  id BIGSERIAL PRIMARY KEY,
  parent_id BIGINT REFERENCES public.parents(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gaming_username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trainers table
CREATE TABLE public.trainers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  bio TEXT,
  specialization TEXT,
  hourly_rate DECIMAL(10,2),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE public.sessions (
  id BIGSERIAL PRIMARY KEY,
  trainer_id BIGINT REFERENCES public.trainers(id) ON DELETE CASCADE,
  game_id BIGINT REFERENCES public.games(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  max_participants INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  player_id BIGINT REFERENCES public.players(id) ON DELETE CASCADE,
  child_id BIGINT REFERENCES public.children(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK ((player_id IS NOT NULL AND child_id IS NULL) OR (player_id IS NULL AND child_id IS NOT NULL))
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES public.players(id) ON DELETE CASCADE,
  child_id BIGINT REFERENCES public.children(id) ON DELETE CASCADE,
  tier TEXT NOT NULL,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK ((player_id IS NOT NULL AND child_id IS NULL) OR (player_id IS NULL AND child_id IS NOT NULL))
);

-- Create reviews table
CREATE TABLE public.reviews (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contracts table
CREATE TABLE public.contracts (
  id BIGSERIAL PRIMARY KEY,
  pro_id BIGINT REFERENCES public.pros(id) ON DELETE CASCADE NOT NULL,
  moderator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  terms TEXT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL,
  status contract_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id BIGINT REFERENCES public.sessions(id) ON DELETE SET NULL,
  subscription_id BIGINT REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'SAR',
  payment_method payment_method NOT NULL,
  status payment_status DEFAULT 'PENDING',
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create club_offers table
CREATE TABLE public.club_offers (
  id BIGSERIAL PRIMARY KEY,
  club_name TEXT NOT NULL,
  logo TEXT,
  game TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min DECIMAL(10,2) NOT NULL,
  salary_max DECIMAL(10,2) NOT NULL,
  requirements TEXT[] NOT NULL,
  benefits TEXT[] NOT NULL,
  description TEXT NOT NULL,
  posted TIMESTAMPTZ DEFAULT NOW(),
  applicants INTEGER DEFAULT 0,
  urgent BOOLEAN DEFAULT FALSE,
  status offer_status DEFAULT 'ACTIVE'
);

-- Create player_stats table
CREATE TABLE public.player_stats (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES public.players(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_hours INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  current_rank TEXT,
  achievements TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pro_stats table
CREATE TABLE public.pro_stats (
  id BIGSERIAL PRIMARY KEY,
  pro_id BIGINT REFERENCES public.pros(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_sessions INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.0,
  total_earnings DECIMAL(10,2) DEFAULT 0.0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create child_stats table
CREATE TABLE public.child_stats (
  id BIGSERIAL PRIMARY KEY,
  child_id BIGINT REFERENCES public.children(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_hours INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  current_rank TEXT,
  achievements TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pro_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for games
CREATE POLICY "Anyone can view games" ON public.games FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage games" ON public.games FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for players
CREATE POLICY "Players can view own data" ON public.players FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Players can update own data" ON public.players FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Players can insert own data" ON public.players FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all players" ON public.players FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for pros
CREATE POLICY "Pros can view own data" ON public.pros FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Pros can update own data" ON public.pros FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Pros can insert own data" ON public.pros FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins and moderators can view all pros" ON public.pros FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'ADMIN') OR public.has_role(auth.uid(), 'MODERATOR'));

-- RLS Policies for parents
CREATE POLICY "Parents can view own data" ON public.parents FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Parents can update own data" ON public.parents FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Parents can insert own data" ON public.parents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for children
CREATE POLICY "Parents can manage own children" ON public.children FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.parents WHERE parents.id = children.parent_id AND parents.user_id = auth.uid())
);

-- RLS Policies for trainers
CREATE POLICY "Trainers can view own data" ON public.trainers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Trainers can update own data" ON public.trainers FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Trainers can insert own data" ON public.trainers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view approved trainers" ON public.trainers FOR SELECT TO authenticated USING (is_approved = true);

-- RLS Policies for sessions
CREATE POLICY "Anyone can view sessions" ON public.sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Trainers can manage own sessions" ON public.sessions FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.trainers WHERE trainers.id = sessions.trainer_id AND trainers.user_id = auth.uid())
);

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.players WHERE players.id = bookings.player_id AND players.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.children JOIN public.parents ON children.parent_id = parents.id WHERE children.id = bookings.child_id AND parents.user_id = auth.uid())
);
CREATE POLICY "Users can create own bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.players WHERE players.id = bookings.player_id AND players.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.children JOIN public.parents ON children.parent_id = parents.id WHERE children.id = bookings.child_id AND parents.user_id = auth.uid())
);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.players WHERE players.id = subscriptions.player_id AND players.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.children JOIN public.parents ON children.parent_id = parents.id WHERE children.id = subscriptions.child_id AND parents.user_id = auth.uid())
);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = reviewer_id);

-- RLS Policies for contracts
CREATE POLICY "Pros can view own contracts" ON public.contracts FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.pros WHERE pros.id = contracts.pro_id AND pros.user_id = auth.uid())
);
CREATE POLICY "Moderators can view all contracts" ON public.contracts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'MODERATOR'));
CREATE POLICY "Moderators can manage contracts" ON public.contracts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'MODERATOR'));

-- RLS Policies for payments
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for club_offers
CREATE POLICY "Anyone can view active offers" ON public.club_offers FOR SELECT TO authenticated USING (status = 'ACTIVE');
CREATE POLICY "Admins can manage offers" ON public.club_offers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'ADMIN'));

-- RLS Policies for stats tables
CREATE POLICY "Users can view own player stats" ON public.player_stats FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.players WHERE players.id = player_stats.player_id AND players.user_id = auth.uid())
);
CREATE POLICY "Users can view own pro stats" ON public.pro_stats FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.pros WHERE pros.id = pro_stats.pro_id AND pros.user_id = auth.uid())
);
CREATE POLICY "Parents can view own children stats" ON public.child_stats FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.children JOIN public.parents ON children.parent_id = parents.id WHERE children.id = child_stats.child_id AND parents.user_id = auth.uid())
);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_player_stats_updated_at BEFORE UPDATE ON public.player_stats FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_pro_stats_updated_at BEFORE UPDATE ON public.pro_stats FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_child_stats_updated_at BEFORE UPDATE ON public.child_stats FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();