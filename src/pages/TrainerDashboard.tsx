import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Trophy, Clock, Star, TrendingUp, MessageSquare, Video, Settings } from "lucide-react";

export default function TrainerDashboard() {
  const trainerStats = {
    totalStudents: 47,
    activeStudents: 32,
    completedSessions: 156,
    averageRating: 4.9,
    monthlyEarnings: 12500,
    upcomingSessions: 8
  };

  const upcomingSessions = [
    {
      id: 1,
      student: "Ahmed Ali",
      game: "Street Fighter 6",
      time: "2:00 PM",
      date: "Today",
      duration: "2 hours",
      type: "1-on-1 Training",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      student: "Fatima Hassan",
      game: "Tekken 8",
      time: "4:30 PM", 
      date: "Today",
      duration: "1.5 hours",
      type: "Tournament Prep",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      student: "Omar Al-Mansouri",
      game: "Street Fighter 6",
      time: "10:00 AM",
      date: "Tomorrow",
      duration: "2 hours",
      type: "Combo Practice",
      avatar: "/placeholder.svg"
    }
  ];

  const students = [
    {
      id: 1,
      name: "Ahmed Ali",
      game: "Street Fighter 6",
      level: "Intermediate",
      progress: 75,
      sessionsCompleted: 12,
      nextSession: "Today 2:00 PM",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Fatima Hassan", 
      game: "Tekken 8",
      level: "Advanced",
      progress: 90,
      sessionsCompleted: 18,
      nextSession: "Today 4:30 PM",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Omar Al-Mansouri",
      game: "Street Fighter 6", 
      level: "Beginner",
      progress: 45,
      sessionsCompleted: 6,
      nextSession: "Tomorrow 10:00 AM",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
            <Badge variant="secondary" className="ml-2">Trainer</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Trainer" />
              <AvatarFallback>TR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Coach Ahmad! 👋</h1>
          <p className="text-muted-foreground">
            You have {trainerStats.upcomingSessions} sessions scheduled today. Let's help your students reach their goals!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{trainerStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sessions Completed</p>
                  <p className="text-2xl font-bold">{trainerStats.completedSessions}</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold flex items-center gap-1">
                    {trainerStats.averageRating}
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                  <p className="text-2xl font-bold">{trainerStats.monthlyEarnings.toLocaleString()} SAR</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="students">My Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upcoming Sessions */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Sessions
                    </CardTitle>
                    <CardDescription>
                      Your scheduled training sessions for today and tomorrow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={session.avatar} alt={session.student} />
                            <AvatarFallback>{session.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{session.student}</h4>
                            <p className="text-sm text-muted-foreground">{session.game}</p>
                            <Badge variant="outline" className="text-xs mt-1">{session.type}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.time}</p>
                          <p className="text-sm text-muted-foreground">{session.date}</p>
                          <p className="text-xs text-muted-foreground">{session.duration}</p>
                        </div>
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule New Session
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    View All Students
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Students</CardTitle>
                <CardDescription>
                  Manage your current students and track their progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.game}</p>
                          <Badge variant="secondary" className="text-xs mt-1">{student.level}</Badge>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-lg font-bold text-primary">{student.progress}%</p>
                        <p className="text-xs text-muted-foreground">{student.sessionsCompleted} sessions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Next Session</p>
                        <p className="text-sm text-muted-foreground">{student.nextSession}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Student Satisfaction</span>
                      <span className="font-bold text-green-500">98%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Session Completion Rate</span>
                      <span className="font-bold text-blue-500">96%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Session Duration</span>
                      <span className="font-bold">1.8 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Student Improvement Rate</span>
                      <span className="font-bold text-primary">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Sessions Conducted</span>
                      <span className="font-bold">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>New Students</span>
                      <span className="font-bold text-green-500">+8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue Generated</span>
                      <span className="font-bold">12,500 SAR</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Hours Taught</span>
                      <span className="font-bold">84 hours</span>
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