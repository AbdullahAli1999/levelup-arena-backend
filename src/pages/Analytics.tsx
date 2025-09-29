import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Gamepad2, 
  Clock, 
  DollarSign,
  Target,
  Activity,
  Trophy,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Mock data for charts
  const userGrowthData = [
    { name: 'Jan', players: 120, trainers: 15, pros: 8 },
    { name: 'Feb', players: 180, trainers: 22, pros: 12 },
    { name: 'Mar', players: 250, trainers: 28, pros: 18 },
    { name: 'Apr', players: 320, trainers: 35, pros: 25 },
    { name: 'May', players: 410, trainers: 42, pros: 32 },
    { name: 'Jun', players: 520, trainers: 48, pros: 38 },
  ];

  const revenueData = [
    { name: 'Week 1', revenue: 15420, sessions: 156 },
    { name: 'Week 2', revenue: 18650, sessions: 189 },
    { name: 'Week 3', revenue: 22140, sessions: 224 },
    { name: 'Week 4', revenue: 19875, sessions: 201 },
  ];

  const gamePopularityData = [
    { name: 'Street Fighter 6', value: 35, color: '#3B82F6' },
    { name: 'Tekken 8', value: 28, color: '#EF4444' },
    { name: 'League of Legends', value: 22, color: '#10B981' },
    { name: 'Valorant', value: 15, color: '#F59E0B' },
  ];

  const sessionData = [
    { time: '00:00', sessions: 12 },
    { time: '04:00', sessions: 5 },
    { time: '08:00', sessions: 25 },
    { time: '12:00', sessions: 45 },
    { time: '16:00', sessions: 65 },
    { time: '20:00', sessions: 85 },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      title: "Active Sessions",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      title: "Monthly Revenue",
      value: "$76,250",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20"
    },
    {
      title: "Completion Rate",
      value: "87.4%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Platform performance insights and metrics</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Link to="/admin-dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Period Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last updated: 2 minutes ago</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="gaming-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="players" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="trainers" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="pros" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Session Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Session Activity</CardTitle>
                  <CardDescription>Sessions by hour of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sessionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Registration Trends</CardTitle>
                <CardDescription>Detailed user growth analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="players" stroke="#3B82F6" strokeWidth={3} />
                    <Line type="monotone" dataKey="trainers" stroke="#EF4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="pros" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Weekly revenue and session correlation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="revenue" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Game Popularity</CardTitle>
                  <CardDescription>Distribution of active sessions by game</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gamePopularityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {gamePopularityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Games</CardTitle>
                  <CardDescription>Most popular training games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gamePopularityData.map((game, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: game.color }}
                          ></div>
                          <span className="font-medium text-foreground">{game.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{game.value}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;