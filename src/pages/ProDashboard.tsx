import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Trophy, 
  Target, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Users,
  FileText,
  Award,
  Clock,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Settings,
  Bell
} from 'lucide-react';

const ProDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState(null);

  // Mock data
  const mockPlayerData = {
    id: '1',
    firstName: 'Omar',
    lastName: 'Al-Ghamdi',
    avatar: '/placeholder.svg',
    proLevel: 'ELITE',
    globalRank: 23,
    totalEarnings: 45750,
    monthlyEarnings: 8250,
    contractStatus: 'ACTIVE',
    clubName: 'Saudi Esports Elite',
    gameSpecialty: 'Valorant',
    winRate: 87.5,
    matchesPlayed: 156,
    hoursStreamed: 340,
    followersCount: 12400,
    sponsorshipDeals: 3,
    upcomingMatches: [
      {
        id: 1,
        opponent: 'Team Phoenix',
        date: '2024-03-25',
        time: '18:00',
        tournament: 'MENA Championship',
        prize: 50000,
        status: 'CONFIRMED'
      },
      {
        id: 2,
        opponent: 'Desert Warriors',
        date: '2024-03-28',
        time: '20:30',
        tournament: 'Saudi Pro League',
        prize: 25000,
        status: 'PENDING'
      }
    ],
    recentPerformance: [
      { date: '2024-03-20', opponent: 'Cyber Knights', result: 'WIN', score: '16-12', earnings: 1500 },
      { date: '2024-03-18', opponent: 'Digital Titans', result: 'WIN', score: '16-8', earnings: 2000 },
      { date: '2024-03-15', opponent: 'Virtual Legends', result: 'LOSS', score: '14-16', earnings: 0 },
      { date: '2024-03-12', opponent: 'Pixel Raiders', result: 'WIN', score: '16-10', earnings: 1800 }
    ],
    achievements: [
      { name: 'MENA Champion 2024', date: '2024-02-15', prize: 15000 },
      { name: 'Saudi Pro League Winner', date: '2024-01-20', prize: 10000 },
      { name: 'Rising Star Award', date: '2023-12-10', prize: 5000 }
    ],
    stats: {
      killDeathRatio: 1.67,
      headshotPercentage: 42.3,
      averageDamagePerRound: 165.7,
      clutchWinRate: 68.2
    },
    notifications: [
      { id: 1, type: 'MATCH', message: 'New match scheduled: Team Phoenix on March 25', time: '2 hours ago', read: false },
      { id: 2, type: 'CONTRACT', message: 'Contract renewal offer from Saudi Esports Elite', time: '1 day ago', read: false },
      { id: 3, type: 'PAYMENT', message: 'Prize money deposited: $2,000', time: '2 days ago', read: true }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlayerData(mockPlayerData);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'ACTIVE': 'bg-green-500/10 text-green-400 border-green-500/20',
      'PENDING': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'CONFIRMED': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'WIN': 'bg-green-500/10 text-green-400 border-green-500/20',
      'LOSS': 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={playerData.avatar} alt={playerData.firstName} />
                <AvatarFallback>{playerData.firstName[0]}{playerData.lastName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  {playerData.firstName} {playerData.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {playerData.proLevel} Pro
                  </Badge>
                  <Badge variant="outline">#{playerData.globalRank} Global</Badge>
                  <Badge variant="outline">{playerData.clubName}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => {/* Handle notifications */}}
              >
                <Bell className="h-4 w-4" />
                {playerData.notifications.filter(n => !n.read).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">${playerData.totalEarnings.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Earnings</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm text-green-400">
                <TrendingUp className="h-3 w-3" />
                +${playerData.monthlyEarnings.toLocaleString()} this month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">#{playerData.globalRank}</div>
                  <div className="text-sm text-muted-foreground">Global Rank</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-blue-400">
                {playerData.gameSpecialty} Specialist
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{playerData.winRate}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {playerData.matchesPlayed} matches played
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{playerData.followersCount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {playerData.hoursStreamed}h streamed
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="matches">Upcoming Matches</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Matches */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {playerData.upcomingMatches.map((match) => (
                    <div key={match.id} className="p-4 rounded-lg border border-border/50 bg-card/30">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">vs {match.opponent}</h3>
                        <Badge className={getStatusColor(match.status)}>
                          {match.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(match.date).toLocaleDateString()} at {match.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-3 w-3" />
                          {match.tournament}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3 w-3" />
                          Prize Pool: ${match.prize.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate('/pro-contracts')}
                  >
                    View All Contracts
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Performance */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Recent Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {playerData.recentPerformance.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/30">
                      <div>
                        <div className="font-medium">vs {match.opponent}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(match.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(match.result)}>
                          {match.result}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {match.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Statistics */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-primary" />
                    Game Statistics
                  </CardTitle>
                  <CardDescription>{playerData.gameSpecialty} Performance Metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kill/Death Ratio</span>
                      <span className="font-bold text-primary">{playerData.stats.killDeathRatio}</span>
                    </div>
                    <Progress value={(playerData.stats.killDeathRatio / 2) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Headshot %</span>
                      <span className="font-bold text-primary">{playerData.stats.headshotPercentage}%</span>
                    </div>
                    <Progress value={playerData.stats.headshotPercentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Damage/Round</span>
                      <span className="font-bold text-primary">{playerData.stats.averageDamagePerRound}</span>
                    </div>
                    <Progress value={(playerData.stats.averageDamagePerRound / 200) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Clutch Win Rate</span>
                      <span className="font-bold text-primary">{playerData.stats.clutchWinRate}%</span>
                    </div>
                    <Progress value={playerData.stats.clutchWinRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Contract Status */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Current Contract
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{playerData.clubName}</h3>
                      <Badge className={getStatusColor(playerData.contractStatus)}>
                        {playerData.contractStatus}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Salary</span>
                        <span className="font-medium">${playerData.monthlyEarnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contract Duration</span>
                        <span className="font-medium">2 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sponsorship Deals</span>
                        <span className="font-medium">{playerData.sponsorshipDeals} active</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate('/pro-contracts')}
                  >
                    Manage Contracts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Contract Management</CardTitle>
                <CardDescription>
                  View and manage your professional gaming contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Detailed Contract Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Access full contract details, negotiations, and opportunities
                  </p>
                  <Button onClick={() => navigate('/pro-contracts')}>
                    Go to Contracts Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerData.achievements.map((achievement, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                    <Badge variant="outline" className="text-primary">
                      ${achievement.prize.toLocaleString()} Prize
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProDashboard;