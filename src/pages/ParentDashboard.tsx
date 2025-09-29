import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Gamepad2, 
  Users, 
  Shield, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  UserPlus,
  Calendar,
  Star,
  Eye,
  Settings,
  Heart,
  Trophy
} from "lucide-react";
import { Link } from "react-router-dom";

const ParentDashboard = () => {
  const children = [
    { 
      id: 1, 
      name: "Ahmed", 
      age: 14, 
      game: "VALORANT", 
      level: 8, 
      wins: 23, 
      losses: 12, 
      winRate: 66,
      lastActive: "2 hours ago",
      trainer: "Omar Al-Habib",
      safetyScore: 95
    },
    { 
      id: 2, 
      name: "Fatima", 
      age: 12, 
      game: "Fortnite", 
      level: 5, 
      wins: 15, 
      losses: 8, 
      winRate: 65,
      lastActive: "Yesterday",
      trainer: "Sarah Al-Rashid",
      safetyScore: 98
    }
  ];

  const safetyAlerts = [
    { 
      type: "info", 
      message: "Ahmed completed online safety training", 
      time: "2 hours ago",
      severity: "low"
    },
    { 
      type: "warning", 
      message: "Fatima's gaming session exceeded recommended time", 
      time: "Yesterday",
      severity: "medium"
    }
  ];

  const weeklyReports = [
    { week: "This Week", hoursPlayed: 12, improvement: "+5%", achievements: 3 },
    { week: "Last Week", hoursPlayed: 15, improvement: "+2%", achievements: 2 },
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
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome, <span className="text-gradient">Mariam</span>! 👋
            </h1>
            <p className="text-muted-foreground">Monitor your children's gaming journey in a safe environment</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Child
          </Button>
        </div>

        {/* Safety Overview */}
        <Card className="card-glow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Safety Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-500">100%</div>
                <div className="text-sm text-muted-foreground">Supervised Sessions</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-500">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring Active</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <Heart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-500">96%</div>
                <div className="text-sm text-muted-foreground">Average Safety Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Children Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Your Children</h2>
              {children.map((child) => (
                <Card key={child.id} className="card-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{child.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">{child.name}</h3>
                          <p className="text-sm text-muted-foreground">Age {child.age} • Playing {child.game}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={child.safetyScore >= 95 ? "default" : "secondary"}>
                          Safety: {child.safetyScore}%
                        </Badge>
                        <Badge variant="outline">Level {child.level}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                        <div className="font-bold">{child.wins}</div>
                        <div className="text-xs text-muted-foreground">Wins</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="font-bold">{child.losses}</div>
                        <div className="text-xs text-muted-foreground">Losses</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                        <div className="font-bold">{child.winRate}%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                        <div className="text-xs font-bold">{child.lastActive}</div>
                        <div className="text-xs text-muted-foreground">Last Active</div>
                      </div>
                    </div>

                    {/* Trainer Info */}
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm">Trainer: {child.trainer}</span>
                      </div>
                      <Button size="sm" variant="outline">View Sessions</Button>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Progress</span>
                        <span>Level {child.level}</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Reports */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Weekly Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{report.week}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.hoursPlayed} hours played • {report.achievements} achievements
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-500">{report.improvement}</div>
                        <div className="text-xs text-muted-foreground">Improvement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Alerts */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Safety Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {safetyAlerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === "medium" ? "border-yellow-500 bg-yellow-500/10" : "border-green-500 bg-green-500/10"
                  }`}>
                    <div className="text-sm font-medium">{alert.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" size="sm">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Safety Guidelines */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Safety Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>All sessions are monitored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Certified trainers only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Zero tolerance policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Regular safety training</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Another Child
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;