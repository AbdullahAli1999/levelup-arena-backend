import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Users, Flag, Eye, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";

export default function ModeratorDashboard() {
  const moderatorStats = {
    pendingReports: 12,
    proApplications: 5,
    activeWarnings: 8,
    resolvedToday: 23
  };

  const pendingProApplications = [
    {
      id: 1,
      name: "Khalid Al-Rashid",
      game: "Street Fighter 6",
      rank: "Grand Master",
      experience: "6 years",
      achievements: "EVO Top 8, Regional Champion",
      appliedDate: "2 days ago",
      status: "pending",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sara Al-Mansouri", 
      game: "Tekken 8",
      rank: "Tekken King",
      experience: "4 years",
      achievements: "National Tournament Winner",
      appliedDate: "1 day ago", 
      status: "pending",
      avatar: "/placeholder.svg"
    }
  ];

  const safetyReports = [
    {
      id: 1,
      reporter: "Ahmed Ali",
      reported: "User123",
      type: "Harassment",
      severity: "high",
      description: "Inappropriate messages in chat",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      reporter: "Fatima Hassan",
      reported: "ProPlayer456", 
      type: "Inappropriate Content",
      severity: "medium",
      description: "Shared inappropriate images",
      time: "4 hours ago",
      status: "investigating"
    },
    {
      id: 3,
      reporter: "Parent User",
      reported: "Trainer789",
      type: "Safety Concern",
      severity: "high", 
      description: "Concerning behavior with minor",
      time: "6 hours ago",
      status: "urgent"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium": 
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
            <Badge variant="destructive" className="ml-2">Moderator</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Moderator" />
              <AvatarFallback>MOD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Moderator Dashboard 🛡️</h1>
          <p className="text-muted-foreground">
            Keep the academy safe and manage community standards. You have {moderatorStats.pendingReports} pending reports.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                  <p className="text-2xl font-bold text-red-600">{moderatorStats.pendingReports}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pro Applications</p>
                  <p className="text-2xl font-bold text-yellow-600">{moderatorStats.proApplications}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Warnings</p>
                  <p className="text-2xl font-bold text-orange-600">{moderatorStats.activeWarnings}</p>
                </div>
                <Flag className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{moderatorStats.resolvedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports">Safety Reports</TabsTrigger>
            <TabsTrigger value="applications">Pro Applications</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Safety Reports
                </CardTitle>
                <CardDescription>
                  Review and manage community safety reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={getSeverityColor(report.severity)}>
                            {report.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{report.type}</Badge>
                          <span className="text-sm text-muted-foreground">{report.time}</span>
                        </div>
                        <Badge variant="secondary">{report.status}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Reporter</p>
                          <p className="text-sm text-muted-foreground">{report.reporter}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reported User</p>
                          <p className="text-sm text-muted-foreground">{report.reported}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Take Action
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Reporter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Pending Pro Player Applications
                </CardTitle>
                <CardDescription>
                  Review applications from players wanting to become pro players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingProApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={application.avatar} alt={application.name} />
                            <AvatarFallback>{application.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg">{application.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{application.game}</Badge>
                              <Badge variant="outline">{application.rank}</Badge>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">{application.appliedDate}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Experience</p>
                          <p className="text-sm text-muted-foreground">{application.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Major Achievements</p>
                          <p className="text-sm text-muted-foreground">{application.achievements}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Approve Application
                        </Button>
                        <Button variant="destructive" className="flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Reject Application
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Contact Applicant
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    View All Users
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Flag className="h-4 w-4 mr-2" />
                    Issue Warning
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <XCircle className="h-4 w-4 mr-2" />
                    Suspend User
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Safety Guidelines
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>User warnings issued</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reports resolved</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pro applications reviewed</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safety incidents prevented</span>
                      <span className="font-medium text-green-600">15</span>
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