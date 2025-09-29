import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, User, MapPin, Trophy, Download, Share2, MessageCircle, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function BookingConfirmation() {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const bookingDetails = {
    id: 'BK-2024-001',
    session: {
      name: 'Advanced Combos Mastery',
      game: 'Street Fighter 6',
      trainer: 'Ahmed Al-Rashid',
      trainerAvatar: '👨‍💼',
      trainerRating: 4.9,
      date: '2024-01-15',
      time: '16:00 - 17:00',
      duration: '60 minutes',
      location: 'Training Room A',
      type: 'Individual Training'
    },
    payment: {
      method: 'Credit Card',
      amount: 250,
      transactionId: 'TXN-789123',
      status: 'Completed'
    },
    bookedAt: new Date().toISOString(),
    confirmationCode: 'LVLUP-SF6-001'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Booking Confirmed
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <Card className="mb-8 bg-gradient-to-r from-green-500/10 to-primary/10 border-green-500/20">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-primary bg-clip-text text-transparent">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Your training session has been successfully booked
              </p>
              <div className="inline-flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">Confirmation Code:</span>
                <Badge variant="secondary" className="font-mono">
                  {bookingDetails.confirmationCode}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Session Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Session Info */}
                <div className="border-b pb-4">
                  <h3 className="font-bold text-xl mb-2">{bookingDetails.session.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-medium">{bookingDetails.session.game}</span>
                    <Badge variant="secondary">{bookingDetails.session.type}</Badge>
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    {bookingDetails.session.trainerAvatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{bookingDetails.session.trainer}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{bookingDetails.session.trainerRating}</span>
                      <span>• Professional Trainer</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>

                {/* Schedule Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Date:</span>
                    <span>{bookingDetails.session.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time:</span>
                    <span>{bookingDetails.session.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{bookingDetails.session.location}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Session Fee</span>
                    <span>{bookingDetails.payment.amount} SAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>0 SAR</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount Applied</span>
                    <span>-0 SAR</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Paid</span>
                      <span className="text-primary">{bookingDetails.payment.amount} SAR</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span>{bookingDetails.payment.method}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID</span>
                    <span className="font-mono">{bookingDetails.payment.transactionId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {bookingDetails.payment.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What&apos;s Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Connect with Trainer</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your trainer will reach out 24 hours before the session
                  </p>
                  <Button variant="outline" size="sm">
                    Message Now
                  </Button>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Prepare for Session</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Review pre-session materials and warm up
                  </p>
                  <Button variant="outline" size="sm">
                    View Guide
                  </Button>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Track Progress</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Monitor your improvement after each session
                  </p>
                  <Button variant="outline" size="sm">
                    View Stats
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild className="flex-1">
              <Link to="/my-bookings">View All Bookings</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/trainer-selection">Book Another Session</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/player-dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}