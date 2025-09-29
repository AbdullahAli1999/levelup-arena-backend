import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Crown, Medal, Star, Filter, Search, Users, TrendingUp, Zap, Target, Flag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Leaderboards() {
  const [selectedTab, setSelectedTab] = useState('global');
  const [gameFilter, setGameFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const games = [
    { id: 'sf6', name: 'Street Fighter 6', icon: '🥊' },
    { id: 'tekken8', name: 'Tekken 8', icon: '👊' },
    { id: 'kof15', name: 'King of Fighters XV', icon: '👑' },
    { id: 'ggst', name: 'Guilty Gear Strive', icon: '⚡' },
    { id: 'valorant', name: 'Valorant', icon: '🎯' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️' }
  ];

  // Global Leaderboard (Top Players)
  const globalLeaderboard = [
    {
      rank: 1,
      name: 'أحمد الراشد',
      username: '@ahmed_fighter',
      avatar: '👑',
      rating: 9.8,
      wins: 247,
      losses: 15,
      winRate: 94.3,
      trophy: 'GOLD',
      game: 'Street Fighter 6',
      country: 'Saudi Arabia',
      points: 2850,
      streak: 12,
      isVerified: true
    },
    {
      rank: 2,
      name: 'سارة العنزي',
      username: '@sara_tekken',
      avatar: '👸',
      rating: 9.6,
      wins: 198,
      losses: 22,
      winRate: 90.0,
      trophy: 'GOLD',
      game: 'Tekken 8',
      country: 'Saudi Arabia', 
      points: 2720,
      streak: 8,
      isVerified: true
    },
    {
      rank: 3,
      name: 'محمد القحطاني',
      username: '@mohammed_kof',
      avatar: '🤴',
      rating: 9.4,
      wins: 165,
      losses: 18,
      winRate: 90.2,
      trophy: 'GOLD',
      game: 'King of Fighters XV',
      country: 'Saudi Arabia',
      points: 2650,
      streak: 5,
      isVerified: false
    },
    {
      rank: 4,
      name: 'فاطمة الشهري',
      username: '@fatima_gg',
      avatar: '👩‍🎓',
      rating: 9.1,
      wins: 142,
      losses: 25,
      winRate: 85.0,
      trophy: 'SILVER',
      game: 'Guilty Gear Strive',
      country: 'Saudi Arabia',
      points: 2480,
      streak: 3,
      isVerified: true
    },
    {
      rank: 5,
      name: 'عبدالله النعيمي',
      username: '@abdullah_val',
      avatar: '🧑‍💼',
      rating: 8.9,
      wins: 134,
      losses: 31,
      winRate: 81.2,
      trophy: 'SILVER',
      game: 'Valorant',
      country: 'Saudi Arabia',
      points: 2320,
      streak: 7,
      isVerified: false
    }
  ];

  // Pro Players Leaderboard
  const proLeaderboard = [
    {
      rank: 1,
      name: 'يوكي تاناكا',
      username: '@yuki_pro',
      avatar: '🥷',
      rating: 10.0,
      wins: 89,
      losses: 2,
      winRate: 97.8,
      trophy: 'GOLD',
      game: 'Tekken 8',
      country: 'Japan',
      points: 3200,
      earnings: 45000,
      tournaments: 12,
      isVerified: true
    },
    {
      rank: 2,
      name: 'أحمد الراشد',
      username: '@ahmed_pro',
      avatar: '👑',
      rating: 9.9,
      wins: 78,
      losses: 3,
      winRate: 96.3,
      trophy: 'GOLD',
      game: 'Street Fighter 6',
      country: 'Saudi Arabia',
      points: 3150,
      earnings: 38000,
      tournaments: 10,
      isVerified: true
    },
    {
      rank: 3,
      name: 'الكس رودريغيز',
      username: '@alex_champion',
      avatar: '🏆',
      rating: 9.7,
      wins: 72,
      losses: 5,
      winRate: 93.5,
      trophy: 'GOLD',
      game: 'Street Fighter 6',
      country: 'Spain',
      points: 2980,
      earnings: 32000,
      tournaments: 8,
      isVerified: true
    }
  ];

  // Children Leaderboard
  const childrenLeaderboard = [
    {
      rank: 1,
      name: 'عبدالرحمن أحمد',
      username: '@abdulrahman_kid',
      avatar: '🧒',
      age: 12,
      rating: 8.5,
      wins: 45,
      losses: 8,
      winRate: 84.9,
      trophy: 'GOLD',
      game: 'Street Fighter 6',
      country: 'Saudi Arabia',
      points: 1850,
      parent: 'أحمد الراشد',
      trainer: 'محمد حسن'
    },
    {
      rank: 2,
      name: 'لينا سامي',
      username: '@lina_gamer',
      avatar: '👧',
      age: 14,
      rating: 8.2,
      wins: 38,
      losses: 12,
      winRate: 76.0,
      trophy: 'SILVER',
      game: 'Tekken 8',
      country: 'Saudi Arabia',
      points: 1720,
      parent: 'سامي العتيبي',
      trainer: 'سارة القاسمي'
    },
    {
      rank: 3,
      name: 'خالد علي',
      username: '@khalid_young',
      avatar: '🧑‍🎓',
      age: 13,
      rating: 7.9,
      wins: 42,
      losses: 18,
      winRate: 70.0,
      trophy: 'SILVER',
      game: 'King of Fighters XV',
      country: 'Saudi Arabia',
      points: 1650,
      parent: 'علي الدوسري',
      trainer: 'أحمد الراشد'
    }
  ];

  const getTrophyIcon = (trophy: string) => {
    switch (trophy) {
      case 'GOLD': return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'SILVER': return <Medal className="h-5 w-5 text-gray-400" />;
      case 'BRONZE': return <Trophy className="h-5 w-5 text-amber-600" />;
      default: return null;
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Trophy className="h-6 w-6 text-amber-600" />;
    return <span className="font-bold text-lg">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
    return 'bg-muted/50';
  };

  const renderLeaderboardCard = (player: any, type: 'global' | 'pro' | 'children') => (
    <Card key={player.rank} className={`transition-all duration-300 hover:shadow-lg ${getRankBg(player.rank)}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center">
              {getRankIcon(player.rank)}
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl">
              {player.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{player.name}</h3>
                {player.isVerified && <Star className="h-4 w-4 text-blue-500 fill-blue-500" />}
              </div>
              <p className="text-sm text-muted-foreground">{player.username}</p>
              <div className="flex items-center gap-2 mt-1">
                {games.find(g => g.name === player.game)?.icon}
                <span className="text-sm font-medium">{player.game}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              {getTrophyIcon(player.trophy)}
              <span className="font-bold text-2xl text-primary">{player.rating}</span>
            </div>
            <Badge variant="outline" className="mb-1">
              {player.points} pts
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-500">{player.wins}</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-500">{player.losses}</div>
            <div className="text-xs text-muted-foreground">Losses</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-500">{player.winRate}%</div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </div>
          {type === 'pro' ? (
            <div>
              <div className="text-lg font-bold text-yellow-500">{player.tournaments}</div>
              <div className="text-xs text-muted-foreground">Tournaments</div>
            </div>
          ) : type === 'children' ? (
            <div>
              <div className="text-lg font-bold text-purple-500">{player.age}</div>
              <div className="text-xs text-muted-foreground">Age</div>
            </div>
          ) : (
            <div>
              <div className="text-lg font-bold text-orange-500">{player.streak}</div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
          )}
        </div>

        {type === 'children' && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Parent: {player.parent}</span>
              <span>Trainer: {player.trainer}</span>
            </div>
          </div>
        )}

        {type === 'pro' && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Earnings:</span>
              <span className="font-bold text-green-500">{player.earnings.toLocaleString()} SAR</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/player-dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/tournaments" className="text-muted-foreground hover:text-primary transition-colors">
              Tournaments
            </Link>
            <Link to="/leaderboards" className="text-primary font-medium">
              Leaderboards
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-primary to-yellow-400 bg-clip-text text-transparent">
              🏆 Leaderboards
            </h1>
            <p className="text-lg text-muted-foreground">
              The best players, pros, and rising stars in Saudi Arabia&apos;s esports scene
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-500">89</div>
                <div className="text-sm text-muted-foreground">Pro Players</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-500">342</div>
                <div className="text-sm text-muted-foreground">Rising Stars</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-amber-500">156</div>
                <div className="text-sm text-muted-foreground">Champions</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players, pros, or children..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={gameFilter} onValueChange={setGameFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Games</SelectItem>
                      {games.map(game => (
                        <SelectItem key={game.id} value={game.id}>
                          {game.icon} {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={ageFilter} onValueChange={setAgeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ages</SelectItem>
                      <SelectItem value="children">Children (8-17)</SelectItem>
                      <SelectItem value="adults">Adults (18+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="global" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Global Rankings
              </TabsTrigger>
              <TabsTrigger value="pros" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Pro Players
              </TabsTrigger>
              <TabsTrigger value="children" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Rising Stars
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-4">
              {globalLeaderboard.map(player => renderLeaderboardCard(player, 'global'))}
            </TabsContent>

            <TabsContent value="pros" className="space-y-4">
              {proLeaderboard.map(player => renderLeaderboardCard(player, 'pro'))}
            </TabsContent>

            <TabsContent value="children" className="space-y-4">
              {childrenLeaderboard.map(player => renderLeaderboardCard(player, 'children'))}
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-yellow-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Want to climb the ranks?</h3>
              <p className="text-muted-foreground mb-6">
                Join LevelUp Academy and train with the best to become a champion
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/trainer-selection">
                    <Trophy className="h-4 w-4 mr-2" />
                    Start Training
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/tournaments">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Tournaments
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}