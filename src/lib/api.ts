import { 
  PlayerRegisterRequest, 
  PlayerDTO, 
  ProRegisterRequest, 
  ProDTO,
  ParentRegisterRequest,
  ParentDTO,
  ChildCreateRequest,
  ChildDTO,
  GameDTO,
  SessionDTO,
  SessionCreateRequest,
  BookingDTO,
  BookingCreateRequest,
  SubscriptionDTO,
  SubscriptionCreateRequest,
  ReviewDTO,
  ReviewCreateRequest,
  ContractDTO,
  ContractCreateRequest,
  PaymentRequest,
  PaymentResponse,
  TrainerDTO,
  ClubOfferDTO,
  LoginRequest,
  LoginResponse,
  ApiResponse,
  UserDTO
} from '@/types/api';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.levelupacademy.sa' 
  : 'http://localhost:8080';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  private async upload<T>(
    endpoint: string,
    formData: FormData
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Upload Error [${endpoint}]:`, error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Auth
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<void> {
    this.clearToken();
  }

  // Players
  async registerPlayer(data: PlayerRegisterRequest): Promise<PlayerDTO> {
    return this.request<PlayerDTO>('/api/players/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPlayer(playerId: number): Promise<PlayerDTO> {
    return this.request<PlayerDTO>(`/api/v1/player/get-player/${playerId}`);
  }

  async getAllPlayers(): Promise<PlayerDTO[]> {
    return this.request<PlayerDTO[]>('/api/v1/player/player');
  }

  // Pros
  async registerPro(data: ProRegisterRequest): Promise<ProDTO> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'cv') {
        formData.append('cv', data.cv);
      } else {
        formData.append(key, (data as any)[key]);
      }
    });

    return this.upload<ProDTO>('/api/pros/register', formData);
  }

  async getPros(): Promise<ProDTO[]> {
    return this.request<ProDTO[]>('/api/v1/pro/professional');
  }

  async approvePro(proId: number): Promise<ProDTO> {
    return this.request<ProDTO>(`/api/v1/pro/approve/${proId}`, {
      method: 'POST',
    });
  }

  async rejectPro(proId: number): Promise<void> {
    return this.request<void>(`/api/v1/pro/reject/${proId}`, {
      method: 'PUT',
    });
  }

  // Parents & Children
  async registerParent(data: ParentRegisterRequest): Promise<ParentDTO> {
    return this.request<ParentDTO>('/api/parents/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addChild(parentId: number, data: ChildCreateRequest): Promise<ChildDTO> {
    return this.request<ChildDTO>(`/api/parents/${parentId}/children`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getChildStatistics(childId: number): Promise<any> {
    return this.request(`/api/v1/parent/child-statistic/${childId}`);
  }

  // Games
  async getGames(): Promise<GameDTO[]> {
    return this.request<GameDTO[]>('/api/v1/game/get');
  }

  async addGame(data: Omit<GameDTO, 'id'>): Promise<GameDTO> {
    return this.request<GameDTO>('/api/v1/game/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Trainers
  async getTrainers(): Promise<TrainerDTO[]> {
    return this.request<TrainerDTO[]>('/api/v1/trainer/get');
  }

  async registerTrainer(data: any): Promise<TrainerDTO> {
    return this.request<TrainerDTO>('/api/v1/trainer/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Sessions
  async getSessions(gameId?: number, trainerId?: number): Promise<SessionDTO[]> {
    const params = new URLSearchParams();
    if (gameId) params.append('gameId', gameId.toString());
    if (trainerId) params.append('trainerId', trainerId.toString());
    
    return this.request<SessionDTO[]>(`/api/sessions?${params.toString()}`);
  }

  async createSession(
    moderatorId: number, 
    trainerId: number, 
    gameId: number, 
    data: SessionCreateRequest
  ): Promise<SessionDTO> {
    return this.request<SessionDTO>(
      `/api/moderator/${moderatorId}/sessions?trainerId=${trainerId}&gameId=${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  // Bookings
  async createBooking(data: BookingCreateRequest): Promise<BookingDTO> {
    return this.request<BookingDTO>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyBookings(): Promise<BookingDTO[]> {
    return this.request<BookingDTO[]>('/api/bookings');
  }

  async cancelBooking(bookingId: number): Promise<BookingDTO> {
    return this.request<BookingDTO>(`/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  }

  // Subscriptions
  async createSubscription(data: SubscriptionCreateRequest): Promise<SubscriptionDTO> {
    return this.request<SubscriptionDTO>('/api/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMySubscriptions(): Promise<SubscriptionDTO[]> {
    return this.request<SubscriptionDTO[]>('/api/subscriptions');
  }

  // Reviews
  async createReview(sessionId: number, data: ReviewCreateRequest): Promise<ReviewDTO> {
    return this.request<ReviewDTO>(`/api/reviews?sessionId=${sessionId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyReviews(): Promise<ReviewDTO[]> {
    return this.request<ReviewDTO[]>('/api/v1/review/get-my-reviews');
  }

  // Contracts
  async createContract(moderatorId: number, data: ContractCreateRequest): Promise<ContractDTO> {
    return this.request<ContractDTO>(`/api/moderator/${moderatorId}/contracts`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async acceptContract(proId: number, contractId: number): Promise<ContractDTO> {
    return this.request<ContractDTO>(`/api/pro/${proId}/contracts/${contractId}/accept`, {
      method: 'POST',
    });
  }

  // Payments
  async processPayment(data: PaymentRequest): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('/api/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPaymentStatus(paymentId: number): Promise<PaymentResponse> {
    return this.request<PaymentResponse>(`/api/v1/payments/get-status/${paymentId}`);
  }

  // Statistics
  async getTopPlayers(): Promise<any[]> {
    return this.request<any[]>('/api/v1/player-statistic/top5');
  }

  async getTopPros(): Promise<any[]> {
    return this.request<any[]>('/api/v1/pro-statistic/top5');
  }

  async getTopChildren(): Promise<any[]> {
    return this.request<any[]>('/api/v1/child-statistic/top5');
  }

  // Club Offers (Mock for now - add real endpoints when available)
  async getClubOffers(): Promise<ClubOfferDTO[]> {
    // Mock data - replace with real API call when available
    return Promise.resolve([]);
  }

  async submitClubOffer(data: any): Promise<ClubOfferDTO> {
    // Mock implementation - replace with real API call
    return Promise.resolve({} as ClubOfferDTO);
  }
}

export const api = new ApiService();
export default api;