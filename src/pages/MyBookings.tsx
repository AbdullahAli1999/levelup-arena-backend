import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, MapPin, Trophy, Filter, Search, Calendar as CalendarIcon, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bookings = [
    {
      id: 1,
      session: {
        name: 'Advanced Combos Mastery',
        game: 'Street Fighter 6',
        trainer: 'Ahmed Al-Rashid',
        trainerAvatar: '👨‍💼',
        date: '2024-01-15',
        time: '16:00 - 17:00',
        location: 'Training Room A'
      },
      status: 'upcoming',
      bookedAt: '2024-01-10',
      totalPrice: 250,
      sessionType: 'individual'
    },
    {
      id: 2,
      session: {
        name: 'Tournament Preparation',
        game: 'Tekken 8',
        trainer: 'Yuki Tanaka',
        trainerAvatar: '👩‍🏫',
        date: '2024-01-18',
        time: '14:00 - 16:00',
        location: 'Online'
      },
      status: 'completed',
      bookedAt: '2024-01-12',
      totalPrice: 400,
      sessionType: 'group',
      rating: 5,
      review: 'Excellent session! Learned advanced movement techniques.'
    },
    {
      id: 3,
      session: {
        name: 'Beginner Basics',
        game: 'Street Fighter 6',
        trainer: 'Mohammed Hassan',
        trainerAvatar: '🧑‍🎓',
        date: '2024-01-20',
        time: '18:00 - 19:00',
        location: 'Training Room B'
      },
      status: 'cancelled',
      bookedAt: '2024-01-08',
      totalPrice: 180,
      sessionType: 'individual',
      cancellationReason: 'Trainer unavailable'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.session.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.session.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/player-dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LevelUp Academy</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/player-dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/my-bookings" className="text-primary font-medium">
              My Bookings
            </Link>
            <Link to="/trainer-selection" className="text-muted-foreground hover:text-primary transition-colors">
              Book Session
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              My Training Sessions
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your booked sessions and training progress
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search sessions, games, or trainers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                          {booking.session.trainerAvatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{booking.session.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4" />
                            {booking.session.game}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(booking.status)} flex items-center gap-1`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.session.trainer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.session.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Type:</span>
                        <Badge variant="secondary">{booking.sessionType}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Price:</span>
                        <span className="text-primary font-bold">{booking.totalPrice} SAR</span>
                      </div>
                    </div>

                    {booking.status === 'completed' && booking.rating && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">Your Review:</span>
                          <div className="flex">
                            {[...Array(booking.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.review}</p>
                      </div>
                    )}

                    {booking.status === 'cancelled' && booking.cancellationReason && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-400" />
                          <span className="text-sm font-medium text-red-400">Cancellation Reason:</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{booking.cancellationReason}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Booked on {booking.bookedAt}
                      </span>
                      <div className="flex gap-2">
                        {booking.status === 'upcoming' && (
                          <>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'completed' && !booking.rating && (
                          <Button size="sm">
                            Rate Session
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your search or filters"
                    : "You haven't booked any training sessions yet"}
                </p>
                <Button asChild>
                  <Link to="/trainer-selection">Book Your First Session</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}