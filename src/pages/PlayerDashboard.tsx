import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp,
  Medal,
  Clock,
  PlayCircle,
  BookOpen,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const PlayerDashboard = () => {
  const playerStats = {
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    rank: "Silver II",
    wins: 47,
    losses: 23,
    winRate: 67,
    hoursPlayed: 156,
    achievements: 8,
    totalAchievements: 25
  };

  const upcomingClasses = [
    { id: 1, name: "Advanced Aim Training", trainer: "Ahmad Al-Faisal", time: "2:00 PM", date: "Today" },
    { id: 2, name: "Team Strategy Session", trainer: "Sarah Al-Rashid", time: "4:30 PM", date: "Tomorrow" },
    { id: 3, name: "1v1 Practice Match", trainer: "Omar Al-Habib", time: "6:00 PM", date: "Dec 15" },
  ];

  const recentAchievements = [
    { name: "First Win Streak", description: "Win 5 matches in a row", icon: "🔥", rarity: "Common" },
    { name: "Headshot Master", description: "Achieve 70% headshot accuracy", icon: "🎯", rarity: "Rare" },
    { name: "Team Player", description: "Complete 10 team training sessions", icon: "🤝", rarity: "Common" },
  ];

  const leaderboard = [
    { rank: 1, name: "Abdullah Al-Zahra", level: 24, points: 8450 },
    { rank: 2, name: "Fatima Al-Rashid", level: 22, points: 7890 },
    { rank: 3, name: "Khalid Al-Mansour", level: 21, points: 7654 },
    { rank: 4, name: "You", level: 12, points: 2450, isCurrentUser: true },
    { rank: 5, name: "Nora Al-Shahrani", level: 11, points: 2344 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LevelUp</h1>
              <p className="text-xs text-muted-foreground -mt-1">Academy</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-gradient">Saleh</span>! 👋
            </h1>
            <p className="text-muted-foreground">Ready to level up your VALORANT skills today?</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">Level {playerStats.level}</div>
            <Badge variant="outline" className="mt-1">{playerStats.rank}</Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{playerStats.wins}</div>
                  <div className="text-sm text-muted-foreground">Wins</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Target className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{playerStats.losses}</div>
                  <div className="text-sm text-muted-foreground">Losses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{playerStats.winRate}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{playerStats.hoursPlayed}</div>
                  <div className="text-sm text-muted-foreground">Hours Played</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>XP Progress</span>
                    <span>{playerStats.xp} / {playerStats.xpToNext} XP</span>
                  </div>
                  <Progress value={(playerStats.xp / playerStats.xpToNext) * 100} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Achievements</span>
                    <span>{playerStats.achievements} / {playerStats.totalAchievements}</span>
                  </div>
                  <Progress value={(playerStats.achievements / playerStats.totalAchievements) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <PlayCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{cls.name}</div>
                        <div className="text-sm text-muted-foreground">with {cls.trainer}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{cls.time}</div>
                      <div className="text-xs text-muted-foreground">{cls.date}</div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View All Classes
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    <Badge variant={achievement.rarity === "Rare" ? "default" : "secondary"}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      player.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank === 1 ? "bg-yellow-500 text-black" :
                      player.rank === 2 ? "bg-gray-400 text-black" :
                      player.rank === 3 ? "bg-orange-500 text-black" :
                      "bg-muted text-foreground"
                    }`}>
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-muted-foreground">Level {player.level}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{player.points}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Join Practice Match
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Find Training Partner
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Study Game Replays
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;