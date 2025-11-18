import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Users, DollarSign, TrendingUp, Settings, Shield, Trophy, Star, UserPlus, Building } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

function AdminDashboardContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlayers: 0,
    totalTrainers: 0,
    totalPros: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [profilesData, playersData, trainersData, prosData] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('players').select('id', { count: 'exact', head: true }),
        supabase.from('trainers').select('id', { count: 'exact', head: true }),
        supabase.from('pros').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        totalUsers: profilesData.count || 0,
        totalPlayers: playersData.count || 0,
        totalTrainers: trainersData.count || 0,
        totalPros: prosData.count || 0,
      });
    }

    fetchStats();
  }, []);

  const recentSignups = [
    { name: "Ahmed Ali", type: "Player", date: "2 hours ago", avatar: "/placeholder.svg" },
    { name: "Sara Hassan", type: "Pro Player", date: "4 hours ago", avatar: "/placeholder.svg" },
    { name: "Omar Al-Rashid", type: "Trainer", date: "6 hours ago", avatar: "/placeholder.svg" },
    { name: "Fatima Al-Zahra", type: "Parent", date: "8 hours ago", avatar: "/placeholder.svg" }
  ];

  const topTrainers = [
    { name: "Ahmed Al-Rashid", students: 47, rating: 4.9, earnings: "12,500 SAR", avatar: "/placeholder.svg" },
    { name: "Fatima Al-Zahra", students: 39, rating: 4.8, earnings: "10,200 SAR", avatar: "/placeholder.svg" },
    { name: "Omar Al-Mansouri", students: 35, rating: 4.7, earnings: "9,800 SAR", avatar: "/placeholder.svg" }
  ];

  const systemMetrics = [
    { label: "Server Uptime", value: "99.9%", color: "text-green-600" },
    { label: "Active Sessions", value: "1,247", color: "text-blue-600" },
    { label: "Database Health", value: "Optimal", color: "text-green-600" },
    { label: "Response Time", value: "125ms", color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
            <Badge className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500">Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Control Panel 👑</h1>
          <p className="text-muted-foreground">
            Complete system overview and management tools for LevelUp Academy
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">All registered users</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Trainers</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalTrainers}</p>
                  <p className="text-xs text-muted-foreground mt-1">Registered trainers</p>
                </div>
                <Trophy className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pro Players</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalPros} Pros</p>
                  <p className="text-xs text-muted-foreground mt-1">Registered pro players</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Players</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.totalPlayers}</p>
                  <p className="text-xs text-muted-foreground mt-1">Registered players</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/admin-approvals">
            <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Pending Approvals</h3>
                    <p className="text-sm text-muted-foreground">Activate users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user-management">
            <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">User Management</h3>
                    <p className="text-sm text-muted-foreground">Manage roles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/game-management">
            <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Game Management</h3>
                    <p className="text-sm text-muted-foreground">Manage games</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/analytics">
            <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Analytics</h3>
                    <p className="text-sm text-muted-foreground">View insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="trainers">Trainer Management</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Signups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Recent Signups
                  </CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSignups.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <Badge variant="secondary" className="text-xs">{user.type}</Badge>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{user.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Trainers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Top Performing Trainers
                  </CardTitle>
                  <CardDescription>Based on ratings and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTrainers.map((trainer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={trainer.avatar} alt={trainer.name} />
                            <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{trainer.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{trainer.students} students</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {trainer.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{trainer.earnings}</p>
                          <p className="text-sm text-muted-foreground">this month</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Trophy className="h-6 w-6" />
                    <span className="text-sm">Trainer Approval</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Safety Reports</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm">Revenue Reports</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Settings className="h-6 w-6" />
                    <span className="text-sm">System Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Metrics</CardTitle>
                  <CardDescription>Real-time system performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.label}</span>
                        <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Database Maintenance
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Audit
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Analysis
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building className="h-4 w-4 mr-2" />
                    Backup Management
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Training Sessions</span>
                      <span className="font-medium">142,000 SAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pro Memberships</span>
                      <span className="font-medium">28,500 SAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Club Partnerships</span>
                      <span className="font-medium">14,500 SAR</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>185,000 SAR</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>New Users</span>
                      <span className="font-medium text-green-600">+23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Growth</span>
                      <span className="font-medium text-green-600">+18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trainer Growth</span>
                      <span className="font-medium text-green-600">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Volume</span>
                      <span className="font-medium text-green-600">+31%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>User Satisfaction</span>
                      <span className="font-medium text-green-600">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trainer Retention</span>
                      <span className="font-medium text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safety Score</span>
                      <span className="font-medium text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>System Uptime</span>
                      <span className="font-medium text-green-600">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAuth={true} requiredRole="ADMIN">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}