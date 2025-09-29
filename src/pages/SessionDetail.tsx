import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Edit3, 
  X, 
  Star, 
  MessageSquare, 
  Trophy,
  UserMinus,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Player {
  id: string;
  name: string;
  username: string;
  avatar: string;
  level: string;
  rating: number;
  gamesWon: number;
  gamesLost: number;
  attendanceRate: number;
}

interface Review {
  id: string;
  playerName: string;
  playerAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface SessionData {
  id: string;
  title: string;
  game: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxCapacity: number;
  currentBookings: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  trainer: {
    name: string;
    avatar: string;
    rating: number;
  };
  players: Player[];
  reviews: Review[];
  price: number;
  description: string;
}

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Mock session data following OpenAPI SessionDTO
  const [sessionData] = useState<SessionData>({
    id: id || '1',
    title: 'Street Fighter 6 Advanced Training',
    game: 'Street Fighter 6',
    date: '2024-01-15',
    startTime: '18:00',
    endTime: '20:00',
    location: 'LevelUp Gaming Center - Riyadh',
    maxCapacity: 8,
    currentBookings: 6,
    status: 'SCHEDULED',
    trainer: {
      name: 'Ahmed Al-Rashid',
      avatar: '/avatars/trainer-ahmed.jpg',
      rating: 4.8
    },
    players: [
      {
        id: '1',
        name: 'Omar Hassan',
        username: 'OmarFighter',
        avatar: '/avatars/player1.jpg',
        level: 'Gold',
        rating: 8.2,
        gamesWon: 45,
        gamesLost: 12,
        attendanceRate: 95
      },
      {
        id: '2',
        name: 'Sarah Al-Zahra',
        username: 'SarahSF',
        avatar: '/avatars/player2.jpg',
        level: 'Platinum',
        rating: 8.7,
        gamesWon: 62,
        gamesLost: 18,
        attendanceRate: 88
      },
      {
        id: '3',
        name: 'Mohammed Khalil',
        username: 'MoKhalil',
        avatar: '/avatars/player3.jpg',
        level: 'Silver',
        rating: 7.5,
        gamesWon: 28,
        gamesLost: 15,
        attendanceRate: 92
      },
      {
        id: '4',
        name: 'Layla Nasser',
        username: 'LaylaN',
        avatar: '/avatars/player4.jpg',
        level: 'Gold',
        rating: 8.0,
        gamesWon: 38,
        gamesLost: 14,
        attendanceRate: 90
      },
      {
        id: '5',
        name: 'Ali Mansour',
        username: 'AliM',
        avatar: '/avatars/player5.jpg',
        level: 'Bronze',
        rating: 6.8,
        gamesWon: 22,
        gamesLost: 20,
        attendanceRate: 85
      },
      {
        id: '6',
        name: 'Fatima Al-Saud',
        username: 'FatimaFS',
        avatar: '/avatars/player6.jpg',
        level: 'Silver',
        rating: 7.2,
        gamesWon: 31,
        gamesLost: 18,
        attendanceRate: 87
      }
    ],
    reviews: [
      {
        id: '1',
        playerName: 'Omar Hassan',
        playerAvatar: '/avatars/player1.jpg',
        rating: 5,
        comment: 'Excellent training session! Ahmed really helped me improve my combos.',
        date: '2024-01-10'
      },
      {
        id: '2',
        playerName: 'Sarah Al-Zahra',
        playerAvatar: '/avatars/player2.jpg',
        rating: 5,
        comment: 'Great atmosphere and very detailed feedback. Highly recommended!',
        date: '2024-01-08'
      }
    ],
    price: 150,
    description: 'Advanced Street Fighter 6 training focusing on frame data, neutral game, and tournament preparation. Perfect for players looking to compete at higher levels.'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-500/20 text-blue-400';
      case 'IN_PROGRESS': return 'bg-green-500/20 text-green-400';
      case 'COMPLETED': return 'bg-purple-500/20 text-purple-400';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'bg-amber-600/20 text-amber-400';
      case 'Silver': return 'bg-gray-400/20 text-gray-300';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-400';
      case 'Platinum': return 'bg-cyan-400/20 text-cyan-300';
      case 'Diamond': return 'bg-blue-400/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const removePlayer = async (playerId: string) => {
    setLoading(true);
    try {
      // Mock API call - DELETE /api/trainers/{trainerId}/sessions/{sessionId}/players/{playerId}
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Player Removed",
        description: "Player has been removed from the session.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove player. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelSession = async () => {
    if (!cancelReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for cancellation.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock API call - PUT /api/trainers/{trainerId}/sessions/{sessionId}/cancel
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Session Cancelled",
        description: "All players have been notified of the cancellation.",
      });
      setShowCancelDialog(false);
      navigate('/trainer-dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-2">
                {sessionData.title}
              </h1>
              <Badge className={`${getStatusColor(sessionData.status)} border-0`}>
                {sessionData.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/trainer-dashboard')}>
                Back to Dashboard
              </Button>
              <Button variant="outline">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Session
              </Button>
              <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Cancel Session
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Session</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. All registered players will be notified and refunded.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Reason for cancellation</label>
                      <Textarea
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Please provide a reason for cancelling this session..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                      Keep Session
                    </Button>
                    <Button variant="destructive" onClick={cancelSession} disabled={loading}>
                      {loading ? 'Cancelling...' : 'Cancel Session'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Session Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Date & Time</span>
              </div>
              <p className="text-lg">{sessionData.date}</p>
              <p className="text-muted-foreground">{sessionData.startTime} - {sessionData.endTime}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Capacity</span>
              </div>
              <p className="text-lg">{sessionData.currentBookings}/{sessionData.maxCapacity} Players</p>
              <p className="text-muted-foreground">
                {sessionData.maxCapacity - sessionData.currentBookings} spots available
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-lg">Gaming Center</p>
              <p className="text-muted-foreground">{sessionData.location}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="players" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="players">Players ({sessionData.players.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({sessionData.reviews.length})</TabsTrigger>
            <TabsTrigger value="details">Session Details</TabsTrigger>
          </TabsList>

          <TabsContent value="players">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Registered Players</CardTitle>
              </CardHeader>
              <CardContent>
                {sessionData.players.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No players registered yet</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {sessionData.players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-background/50 hover:bg-background/80 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={player.avatar} alt={player.name} />
                            <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{player.name}</h3>
                            <p className="text-sm text-muted-foreground">@{player.username}</p>
                          </div>
                          <Badge className={`${getLevelColor(player.level)} border-0`}>
                            {player.level}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Rating</p>
                            <p className="font-medium text-primary">{player.rating}/10</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">W/L</p>
                            <p className="font-medium">{player.gamesWon}/{player.gamesLost}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Attendance</p>
                            <p className="font-medium text-green-400">{player.attendanceRate}%</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePlayer(player.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Player Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {sessionData.reviews.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No reviews yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessionData.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 rounded-lg border border-primary/10 bg-background/50"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.playerAvatar} alt={review.playerName} />
                            <AvatarFallback>{review.playerName.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{review.playerName}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            {renderStars(review.rating)}
                            <p className="mt-2 text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{sessionData.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Game</h3>
                    <p className="text-muted-foreground">{sessionData.game}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Price</h3>
                    <p className="text-primary font-bold">{sessionData.price} SAR</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Trainer</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={sessionData.trainer.avatar} alt={sessionData.trainer.name} />
                      <AvatarFallback>{sessionData.trainer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{sessionData.trainer.name}</p>
                      <div className="flex items-center gap-2">
                        {renderStars(Math.floor(sessionData.trainer.rating))}
                        <span className="text-sm text-muted-foreground">
                          {sessionData.trainer.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SessionDetail;