// API Types based on OpenAPI specification
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// User Types
export type UserRole = 'ADMIN' | 'MODERATOR' | 'PLAYER' | 'PRO' | 'PARENTS' | 'TRAINER';

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Player Types
export interface PlayerRegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface StatisticPlayerDTO {
  id: number;
  wins: number;
  losses: number;
  rating: number;
  gamesPlayed: number;
}

export interface PlayerDTO {
  id: number;
  user: UserDTO;
  statistics: StatisticPlayerDTO;
}

// Pro Types
export interface ProRegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  game: string;
  cv: File;
}

export interface StatisticProDTO {
  id: number;
  wins: number;
  losses: number;
  rating: number;
  gamesPlayed: number;
  tournaments: number;
}

export interface ProDTO {
  id: number;
  user: UserDTO;
  cvPath: string;
  isApproved: boolean;
  statistics: StatisticProDTO;
}

// Parent & Child Types
export interface ParentRegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ParentDTO {
  id: number;
  user: UserDTO;
  phoneNumber: string;
  children?: ChildDTO[];
}

export interface ChildCreateRequest {
  firstName: string;
  lastName: string;
  age: number;
}

export interface ChildDTO {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  statistics?: StatisticChildDTO;
}

export interface StatisticChildDTO {
  id: number;
  wins: number;
  losses: number;
  rating: number;
  gamesPlayed: number;
}

// Trainer Types
export interface TrainerDTO {
  id: number;
  user: UserDTO;
  isApproved: boolean;
  specializations: string[];
  rating: number;
  experience: number;
  hourlyRate: number;
  availability: string[];
}

// Game Types
export interface GameDTO {
  id: number;
  name: string;
  age: number;
  category: string;
  imageUrl?: string;
  description?: string;
}

// Session Types
export interface SessionCreateRequest {
  name: string;
  startDate: string;
  endDate: string;
  time: string;
  seats: number;
}

export interface SessionDTO {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  availableSeats: number;
  time: string;
  trainer: TrainerDTO;
  game: GameDTO;
  price: number;
}

// Booking Types
export interface BookingCreateRequest {
  sessionId: number;
  subscriptionId: number;
}

export type BookingStatus = 'PENDING' | 'ACTIVE' | 'CANCELLED';

export interface BookingDTO {
  id: number;
  session: SessionDTO;
  player: PlayerDTO;
  status: BookingStatus;
  bookedAt: string;
  totalPrice: number;
}

// Subscription Types
export interface SubscriptionCreateRequest {
  planType: 'BASIC' | 'PREMIUM' | 'PRO';
  duration: number; // months
  playerId?: number;
  childId?: number;
}

export interface SubscriptionDTO {
  id: number;
  planType: string;
  duration: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
}

// Review Types
export interface ReviewCreateRequest {
  rating: number;
  comment: string;
}

export interface ReviewDTO {
  id: number;
  rating: number;
  comment: string;
  reviewer: UserDTO;
  session: SessionDTO;
  createdAt: string;
}

// Contract Types
export interface ContractCreateRequest {
  proId: number;
  terms: string;
  salary: number;
  duration: number; // months
}

export interface ContractDTO {
  id: number;
  pro: ProDTO;
  moderator: UserDTO;
  terms: string;
  salary: number;
  duration: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

// Payment Types
export interface PaymentRequest {
  amount: number;
  currency: string;
  sessionId?: number;
  subscriptionId?: number;
  cardToken?: string;
  paymentMethod: 'CARD' | 'STC_PAY' | 'MADA';
}

export interface PaymentResponse {
  id: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  transactionId: string;
  amount: number;
  currency: string;
  createdAt: string;
}

// Offer Types
export interface ClubOfferDTO {
  id: number;
  clubName: string;
  logo?: string;
  game: string;
  position: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  requirements: string[];
  benefits: string[];
  description: string;
  posted: string;
  applicants: number;
  urgent: boolean;
  status: 'ACTIVE' | 'CLOSED';
}

// WhatsApp Types
export interface WhatsAppDTO {
  phoneNumber: string;
  message: string;
  templateName?: string;
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserDTO;
  expiresIn: number;
}

export interface AuthState {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
}