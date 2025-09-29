import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Calendar, 
  Clock, 
  Star, 
  TrendingUp, 
  Award,
  Gamepad2,
  Users,
  MessageSquare,
  Medal
} from 'lucide-react';

const ChildStats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [childData, setChildData] = useState(null);

  // Mock data
  const mockChildData = {
    id: id,
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    avatar: '/placeholder.svg',
    age: 12,
    joinedDate: '2024-01-15',
    overallLevel: 'INTERMEDIATE',
    totalSessions: 24,
    hoursPlayed: 48.5,
    rank: 127,
    totalPlayers: 1500,
    achievements: [
      { id: 1, name: 'First Victory', description: 'Won your first match', unlockedAt: '2024-01-20', rarity: 'COMMON' },
      { id: 2, name: 'Team Player', description: 'Completed 10 team sessions', unlockedAt: '2024-02-10', rarity: 'RARE' },
      { id: 3, name: 'Speed Demon', description: 'Improved reaction time by 50%', unlockedAt: '2024-03-05', rarity: 'EPIC' },
      { id: 4, name: 'Consistency King', description: 'Attended 20 sessions in a row', unlockedAt: '2024-03-15', rarity: 'LEGENDARY' }
    ],
    gameStats: [
      {
        game: 'Fortnite',
        level: 'ADVANCED',
        hoursPlayed: 20.5,
        winRate: 68,
        improvementRate: 15,
        lastPlayed: '2024-03-20',
        skills: {
          building: 85,
          aiming: 72,
          strategy: 78,
          teamwork: 90
        }
      },
      {
        game: 'Minecraft',
        level: 'INTERMEDIATE',
        hoursPlayed: 18.0,
        winRate: 45,
        improvementRate: 22,
        lastPlayed: '2024-03-18',
        skills: {
          creativity: 92,
          problemSolving: 78,
          collaboration: 85,
          technical: 65
        }
      },
      {
        game: 'Valorant',
        level: 'BEGINNER',
        hoursPlayed: 10.0,
        winRate: 32,
        improvementRate: 35,
        lastPlayed: '2024-03-19',
        skills: {
          aiming: 45,
          strategy: 55,
          communication: 70,
          positioning: 42
        }
      }
    ],
    recentSessions: [
      {
        id: 1,
        date: '2024-03-20',
        game: 'Fortnite',
        trainer: 'Coach Sarah',
        duration: 120,
        performance: 'EXCELLENT',
        notes: 'Great improvement in building techniques!'
      },
      {
        id: 2,
        date: '2024-03-18',
        game: 'Minecraft',
        trainer: 'Coach Ahmed',
        duration: 90,
        performance: 'GOOD',
        notes: 'Showed creativity in redstone contraptions'
      },
      {
        id: 3,
        date: '2024-03-15',
        game: 'Valorant',
        trainer: 'Coach Maya',
        duration: 60,
        performance: 'IMPROVING',
        notes: 'Better map awareness, needs work on crosshair placement'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChildData(mockChildData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getSkillColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      'EXCELLENT': 'bg-green-500/10 text-green-400 border-green-500/20',
      'GOOD': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'IMPROVING': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'NEEDS_WORK': 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return variants[performance] || variants['IMPROVING'];
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      'COMMON': 'text-gray-400',
      'RARE': 'text-blue-400',
      'EPIC': 'text-purple-400',
      'LEGENDARY': 'text-yellow-400'
    };
    return colors[rarity] || colors['COMMON'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/parent-dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarImage src={childData.avatar} alt={childData.firstName} />
              <AvatarFallback>{childData.firstName[0]}{childData.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                {childData.firstName} {childData.lastName}
              </h1>
              <p className="text-muted-foreground">
                Age {childData.age} • Level {childData.overallLevel} • Rank #{childData.rank}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{childData.totalSessions}</div>
                  <div className="text-xs text-muted-foreground">Total Sessions</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{childData.hoursPlayed}h</div>
                  <div className="text-xs text-muted-foreground">Hours Played</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">#{childData.rank}</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{childData.achievements.length}</div>
                  <div className="text-xs text-muted-foreground">Achievements</div>
                </CardContent>
              </Card>
            </div>

            {/* Game Performance */}
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="games">Game Performance</TabsTrigger>
                <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="games" className="space-y-4">
                {childData.gameStats.map((game, index) => (
                  <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Gamepad2 className="h-6 w-6 text-primary" />
                          <div>
                            <CardTitle className="text-lg">{game.game}</CardTitle>
                            <CardDescription>
                              Level {game.level} • {game.hoursPlayed}h played
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{game.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400">+{game.improvementRate}% improvement</span>
                        <Badge variant="outline" className="ml-auto">
                          Last played: {new Date(game.lastPlayed).toLocaleDateString()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(game.skills).map(([skill, value]) => (
                          <div key={skill} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{skill}</span>
                              <span className="font-medium">{value as number}%</span>
                            </div>
                            <Progress 
                              value={value as number} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sessions" className="space-y-4">
                {childData.recentSessions.map((session, index) => (
                  <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{session.game}</h3>
                            <Badge className={getPerformanceBadge(session.performance)}>
                              {session.performance}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            with {session.trainer} • {session.duration} minutes
                          </p>
                          <p className="text-sm">{session.notes}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {childData.achievements.map((achievement) => (
                    <Card key={achievement.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Medal className={`h-6 w-6 ${getRarityColor(achievement.rarity)}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                                {achievement.rarity}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => navigate('/trainer-selection')}
                >
                  <Calendar className="h-4 w-4" />
                  Book New Session
                </Button>
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => navigate('/contact-trainer')}
                >
                  <MessageSquare className="h-4 w-4" />
                  Message Trainer
                </Button>
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => navigate('/leaderboards')}
                >
                  <Trophy className="h-4 w-4" />
                  View Leaderboards
                </Button>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round((childData.rank / childData.totalPlayers) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Better than {childData.totalPlayers - childData.rank} players
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>To next level</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(childData.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievement */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Latest Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                {childData.achievements.length > 0 && (
                  <div className="flex items-center gap-3">
                    <Medal className={`h-8 w-8 ${getRarityColor(childData.achievements[childData.achievements.length - 1].rarity)}`} />
                    <div>
                      <h3 className="font-semibold">
                        {childData.achievements[childData.achievements.length - 1].name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {childData.achievements[childData.achievements.length - 1].description}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildStats;