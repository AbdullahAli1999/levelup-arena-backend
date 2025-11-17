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
  UserDTO,
  StatisticPlayerDTO,
  StatisticProDTO,
  StatisticChildDTO
} from '@/types/api';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.levelupacademy.sa/api/v1' 
  : 'http://localhost:8080/api/v1';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = sessionStorage.getItem('auth_credentials');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Basic ${this.token}` }),
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
      credentials: 'include',
      headers: {
        ...(this.token && { Authorization: `Basic ${this.token}` }),
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
    sessionStorage.setItem('auth_credentials', token);
  }

  clearToken() {
    this.token = null;
    sessionStorage.removeItem('auth_credentials');
  }

  // Auth
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Create Basic Auth credentials
    const basicAuth = btoa(`${credentials.username}:${credentials.password}`);
    this.setToken(basicAuth);
    
    // Verify credentials by getting user role
    const role = await this.request<string>('/user/get-role', {
      method: 'GET',
    });
    
    // Get user info
    const user = await this.request<UserDTO>('/user/get-my-info', {
      method: 'GET',
    });
    
    return {
      token: basicAuth,
      user,
      expiresIn: 3600,
    };
  }

  async logout(): Promise<void> {
    await this.request<void>('/user/logout', { method: 'POST' });
    this.clearToken();
  }

  // Players
  async registerPlayer(data: PlayerRegisterRequest): Promise<PlayerDTO> {
    return this.request<PlayerDTO>('/player/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPlayer(playerId: number): Promise<PlayerDTO> {
    return this.request<PlayerDTO>(`/player/get-player/${playerId}`);
  }

  async getAllPlayers(): Promise<PlayerDTO[]> {
    return this.request<PlayerDTO[]>('/player/get');
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

    return this.upload<ProDTO>('/pro/register', formData);
  }

  async getPros(): Promise<ProDTO[]> {
    return this.request<ProDTO[]>('/pro/get');
  }

  async approvePro(proId: number): Promise<ProDTO> {
    return this.request<ProDTO>(`/pro/approve/${proId}`, {
      method: 'POST',
    });
  }

  async rejectPro(proId: number): Promise<void> {
    return this.request<void>(`/pro/reject/${proId}`, {
      method: 'PUT',
    });
  }

  // Parents & Children
  async registerParent(data: ParentRegisterRequest): Promise<ParentDTO> {
    return this.request<ParentDTO>('/parent/register', {
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

  // ============= ADDITIONAL USER ENDPOINTS =============
  async generateModeratorLogin(adminId: number, moderatorId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/user/generate/${adminId}/${moderatorId}`, {
      method: 'POST',
    });
  }

  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    return this.request<SubscriptionDTO[]>('/api/v1/user/get-all');
  }

  async getUserRole(): Promise<{ role: string }> {
    return this.request<{ role: string }>('/api/v1/user/get-role');
  }

  // ============= ADDITIONAL TRAINER ENDPOINTS =============
  async updateTrainer(data: TrainerDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/trainer/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTrainer(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/trainer/delete', {
      method: 'DELETE',
    });
  }

  async downloadTrainerCv(trainerId: number): Promise<Blob> {
    const url = `${this.baseURL}/api/v1/trainer/cv/${trainerId}`;
    const response = await fetch(url, {
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
    if (!response.ok) throw new Error('Failed to download CV');
    return response.blob();
  }

  async getAllPlayersInSession(sessionId: number): Promise<PlayerDTO[]> {
    return this.request<PlayerDTO[]>(`/api/v1/trainer/get-players/${sessionId}`);
  }

  async giveTrophyToPlayer(playerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/give-player/${playerId}`, {
      method: 'PUT',
    });
  }

  async giveTrophyToPro(proId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/give-pro/${proId}`, {
      method: 'PUT',
    });
  }

  async giveTrophyToChild(childId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/give-child/${childId}`, {
      method: 'PUT',
    });
  }

  async addStatisticToChild(childId: number, data: StatisticChildDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/addStatisticToChild/${childId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addStatisticToPlayer(playerId: number, data: StatisticPlayerDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/addStatisticToPlayer/${playerId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addStatisticToPro(proId: number, data: StatisticProDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/addStatisticToPro/${proId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async sendPromotionRequest(playerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/trainer/send-promotion-request/${playerId}`, {
      method: 'POST',
    });
  }

  async approveTrainer(trainerId: number): Promise<string> {
    return this.request<string>(`/api/v1/trainer/approve-trainer/${trainerId}`, {
      method: 'POST',
    });
  }

  async rejectTrainer(trainerId: number): Promise<string> {
    return this.request<string>(`/api/v1/trainer/reject-trainer/${trainerId}`, {
      method: 'PUT',
    });
  }

  // ============= SUBSCRIPTION TIERS =============
  async basicSubscription(paymentRequest: PaymentRequest): Promise<any> {
    return this.request<any>('/api/v1/subscription/basic', {
      method: 'POST',
      body: JSON.stringify(paymentRequest),
    });
  }

  async standardSubscription(paymentRequest: PaymentRequest): Promise<any> {
    return this.request<any>('/api/v1/subscription/standard', {
      method: 'POST',
      body: JSON.stringify(paymentRequest),
    });
  }

  async premiumSubscription(paymentRequest: PaymentRequest): Promise<any> {
    return this.request<any>('/api/v1/subscription/premium', {
      method: 'POST',
      body: JSON.stringify(paymentRequest),
    });
  }

  // ============= PRO STATISTICS =============
  async createProStatistic(proId: number, data: StatisticProDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro-statistic/create/${proId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProStatistic(stateId: number, data: StatisticProDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro-statistic/update/${stateId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getProStatistics(professionalId: number): Promise<StatisticProDTO> {
    return this.request<StatisticProDTO>(`/api/v1/pro-statistic/professional/${professionalId}`);
  }

  async deleteProStatistic(statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro-statistic/delete/${statId}`, {
      method: 'DELETE',
    });
  }

  async getTopProByRating(): Promise<string> {
    return this.request<string>('/api/v1/pro-statistic/top-pro-by-rating');
  }

  async getTop5ProByGame(winGame: number): Promise<StatisticProDTO[]> {
    return this.request<StatisticProDTO[]>(`/api/v1/pro-statistic/top5?winGame=${winGame}`);
  }

  async addWinToPro(statId: number, trainerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro-statistic/add-win/${statId}/${trainerId}`, {
      method: 'PUT',
    });
  }

  async addLossToPro(statId: number, trainerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro-statistic/add-loss/${statId}/${trainerId}`, {
      method: 'PUT',
    });
  }

  async updateProRating(trainerId: number, statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro-statistic/update-rating/${trainerId}/${statId}`, {
      method: 'PUT',
    });
  }

  // ============= PLAYER STATISTICS =============
  async createPlayerStatistic(playerId: number, data: StatisticPlayerDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/player-statistic/create/${playerId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePlayerStatistic(statId: number, data: StatisticPlayerDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/player-statistic/update/${statId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getPlayerStatistics(playerId: number): Promise<StatisticPlayerDTO> {
    return this.request<StatisticPlayerDTO>(`/api/v1/player-statistic/player/${playerId}`);
  }

  async deletePlayerStatistic(statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/player-statistic/delete/${statId}`, {
      method: 'DELETE',
    });
  }

  async getTopPlayerByRating(): Promise<string> {
    return this.request<string>('/api/v1/player-statistic/top-player-by-rating');
  }

  async addWinToPlayer(statId: number, trainerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/player-statistic/add-win/${statId}/${trainerId}`, {
      method: 'PUT',
    });
  }

  async addLossToPlayer(statId: number, trainerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/player-statistic/add-loss/${statId}/${trainerId}`, {
      method: 'PUT',
    });
  }

  async updatePlayerRating(trainerId: number, statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/player-statistic/update-rating/${trainerId}/${statId}`, {
      method: 'PUT',
    });
  }

  async notifyWeakPlayers(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/player-statistic/notify-weak', {
      method: 'POST',
    });
  }

  // ============= CHILD STATISTICS =============
  async createChildStatistic(childId: number, data: StatisticChildDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/child-statistic/create/${childId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChildStatistic(statId: number, data: StatisticChildDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/child-statistic/update/${statId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getChildStatisticsByTrainer(childId: number): Promise<StatisticChildDTO> {
    return this.request<StatisticChildDTO>(`/api/v1/child-statistic/get-child-stati-by-trainer/${childId}`);
  }

  async deleteChildStatistic(statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/child-statistic/delete/${statId}`, {
      method: 'DELETE',
    });
  }

  async getTopChildByRating(): Promise<string> {
    return this.request<string>('/api/v1/child-statistic/top-child-by-rating');
  }

  async addWinToChild(statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/child-statistic/add-win/${statId}`, {
      method: 'PUT',
    });
  }

  async addLossToChild(statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/child-statistic/add-loss/${statId}`, {
      method: 'PUT',
    });
  }

  async updateChildRating(statId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/child-statistic/update-rating/${statId}`, {
      method: 'PUT',
    });
  }

  async notifyWeakChildren(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/child-statistic/notify-weak', {
      method: 'POST',
    });
  }

  // ============= SESSION MANAGEMENT =============
  async getAllSessions(): Promise<SessionDTO[]> {
    return this.request<SessionDTO[]>('/api/v1/session/get');
  }

  async addSession(trainerId: number, gameId: number, session: SessionCreateRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/session/add/${trainerId}/${gameId}`, {
      method: 'POST',
      body: JSON.stringify(session),
    });
  }

  async updateSession(sessionId: number, session: SessionCreateRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/session/update/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(session),
    });
  }

  async deleteSession(sessionId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/session/del/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async notifySessionStart(sessionId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/session/notify-start/${sessionId}`);
  }

  async changeTrainerSession(trainerId: number, newSessionId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/session/change-session/${trainerId}/${newSessionId}`, {
      method: 'PUT',
    });
  }

  // ============= REVIEWS =============
  async getAllReviews(): Promise<ReviewDTO[]> {
    return this.request<ReviewDTO[]>('/api/v1/review/get-all');
  }

  async addReview(sessionId: number, review: ReviewCreateRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/review/add/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  }

  async deleteReview(reviewId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/review/delete/${reviewId}`, {
      method: 'DELETE',
    });
  }

  // ============= PRO MANAGEMENT =============
  async getAllPro(): Promise<ProDTO[]> {
    return this.request<ProDTO[]>('/api/v1/pro/get');
  }

  async getPro(proId: number): Promise<ProDTO> {
    return this.request<ProDTO>(`/api/v1/pro/get/${proId}`);
  }

  async editPro(data: ProRegisterRequest): Promise<string> {
    return this.request<string>('/api/v1/pro/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePro(): Promise<string> {
    return this.request<string>('/api/v1/pro/delete', {
      method: 'DELETE',
    });
  }

  async getMyProStatistics(): Promise<StatisticProDTO> {
    return this.request<StatisticProDTO>('/api/v1/pro/professional');
  }

  async downloadProCv(proId: number): Promise<Blob> {
    const url = `${this.baseURL}/api/v1/pro/cv/${proId}`;
    const response = await fetch(url, {
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
    if (!response.ok) throw new Error('Failed to download CV');
    return response.blob();
  }

  async expireProAccounts(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/pro/expireAccount', {
      method: 'POST',
    });
  }

  // ============= PLAYER MANAGEMENT =============
  async updatePlayer(data: PlayerRegisterRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/player/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePlayer(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/player/delete', {
      method: 'DELETE',
    });
  }

  async getMyPlayerStatistics(): Promise<StatisticPlayerDTO> {
    return this.request<StatisticPlayerDTO>('/api/v1/player/player');
  }

  // ============= PAYMENTS =============
  async processCardPayment(paymentRequest: PaymentRequest): Promise<string> {
    return this.request<string>('/api/v1/payments/card', {
      method: 'POST',
      body: JSON.stringify(paymentRequest),
    });
  }

  async getPaymentCallback(): Promise<any> {
    return this.request<any>('/api/v1/payments/callback');
  }

  // ============= PARENT MANAGEMENT =============
  async getAllParents(): Promise<ParentDTO[]> {
    return this.request<ParentDTO[]>('/api/v1/parent/get');
  }

  async editParent(data: ParentRegisterRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/parent/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteParent(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/parent/delete', {
      method: 'DELETE',
    });
  }

  async addChildToParent(child: ChildCreateRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/parent/add-child', {
      method: 'POST',
      body: JSON.stringify(child),
    });
  }

  async updateChild(childId: number, child: ChildCreateRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/parent/update-child/${childId}`, {
      method: 'PUT',
      body: JSON.stringify(child),
    });
  }

  async deleteChild(childId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/parent/delete-child/${childId}`, {
      method: 'DELETE',
    });
  }

  async getGamesByChildAge(childId: number): Promise<GameDTO[]> {
    return this.request<GameDTO[]>(`/api/v1/parent/get-games/${childId}`);
  }

  async getMyChildStatistics(childId: number): Promise<StatisticChildDTO> {
    return this.request<StatisticChildDTO>(`/api/v1/parent/get-child-stati-by-parent/${childId}`);
  }

  // ============= MODERATOR MANAGEMENT =============
  async getAllModerators(): Promise<any[]> {
    return this.request<any[]>('/api/v1/moderator/get');
  }

  async registerModerator(data: any): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/moderator/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateModerator(data: any): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/moderator/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteModerator(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/moderator/delete', {
      method: 'DELETE',
    });
  }

  async reviewContract(contractId: number, proId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/moderator/review-contract/${contractId}/${proId}`, {
      method: 'POST',
    });
  }

  async getAllProRequests(): Promise<ProDTO[]> {
    return this.request<ProDTO[]>('/api/v1/moderator/get-all-pro');
  }

  async sendDiscordExam(proId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/moderator/send-exam/${proId}`, {
      method: 'POST',
    });
  }

  async sendReportToParent(parentId: number, reportMessage: string): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/moderator/send-report/${parentId}`, {
      method: 'POST',
      body: JSON.stringify(reportMessage),
    });
  }

  async promotePlayerToPro(playerId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/moderator/promote/${playerId}`, {
      method: 'POST',
    });
  }

  // ============= GAME MANAGEMENT =============
  async editGame(gameId: number, game: GameDTO): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/game/edit/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify(game),
    });
  }

  async deleteGame(gameId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/game/delete/${gameId}`, {
      method: 'DELETE',
    });
  }

  // ============= EMAIL =============
  async sendEmail(emailRequest: { to: string; subject: string; body: string }): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/api/v1/email/send', {
      method: 'POST',
      body: JSON.stringify(emailRequest),
    });
  }

  // ============= CONTRACTS =============
  async getAllContracts(): Promise<ContractDTO[]> {
    return this.request<ContractDTO[]>('/api/v1/contract/get');
  }

  async addContract(moderatorId: number, data: ContractCreateRequest): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/contract/add/${moderatorId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async acceptContractAsPro(contractId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro/accept/${contractId}`, {
      method: 'PUT',
    });
  }

  async rejectContractAsPro(contractId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/pro/reject/${contractId}`, {
      method: 'PUT',
    });
  }

  // ============= BOOKINGS =============
  async addBooking(sessionId: number, subscriptionId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/booking/add/${sessionId}/${subscriptionId}`, {
      method: 'POST',
    });
  }

  async checkBookingStatus(bookingId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/booking/check/${bookingId}`, {
      method: 'POST',
    });
  }

  async cancelBookingById(bookingId: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/api/v1/booking/cancel/${bookingId}`, {
      method: 'PUT',
    });
  }
}

export const api = new ApiService();
export default api;