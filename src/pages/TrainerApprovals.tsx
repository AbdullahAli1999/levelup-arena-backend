import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Eye,
  Download,
  FileText,
  Star,
  Calendar,
  MapPin,
  Gamepad2
} from "lucide-react";
import { Link } from "react-router-dom";

const TrainerApprovals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCV, setSelectedCV] = useState<any>(null);

  // Mock data for trainer applications
  const trainerApplications = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      email: "ahmed.alrashid@email.com",
      games: ["Street Fighter 6", "Tekken 8"],
      experience: "5 years",
      rank: "Diamond",
      location: "Riyadh, Saudi Arabia",
      status: "pending",
      appliedDate: "2024-01-15",
      rating: 4.8,
      cv: {
        achievements: ["EVO 2023 Top 8", "Red Bull Kumite Champion", "FGC Saudi Champion"],
        experience: "Professional fighting game player with 5+ years of competitive experience",
        certifications: ["Gaming Psychology Certificate", "Esports Coaching Diploma"],
        languages: ["Arabic", "English", "Japanese"]
      }
    },
    {
      id: 2,
      name: "Sara Al-Mahmoud",
      email: "sara.mahmoud@email.com",
      games: ["League of Legends", "Valorant"],
      experience: "3 years",
      rank: "Radiant",
      location: "Jeddah, Saudi Arabia",
      status: "approved",
      appliedDate: "2024-01-10",
      rating: 4.9,
      cv: {
        achievements: ["VCT Regional Finals", "MENA Champions League Winner"],
        experience: "Strategic gameplay specialist with focus on team coordination",
        certifications: ["Riot Games Coaching Certification"],
        languages: ["Arabic", "English", "French"]
      }
    },
    {
      id: 3,
      name: "Omar Al-Zahra",
      email: "omar.zahra@email.com",
      games: ["FIFA 24", "FC 24"],
      experience: "4 years",
      rank: "Elite",
      location: "Dammam, Saudi Arabia",
      status: "rejected",
      appliedDate: "2024-01-08",
      rating: 4.2,
      cv: {
        achievements: ["FIFA eWorld Cup Qualifier", "MENA FIFA Champion"],
        experience: "FIFA specialist with focus on competitive gameplay mechanics",
        certifications: ["EA Sports Coaching Badge"],
        languages: ["Arabic", "English"]
      }
    }
  ];

  const filteredApplications = trainerApplications.filter(application => {
    const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.games.some(game => game.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "all" || application.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-muted";
    }
  };

  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    console.log(`${action} trainer application ${id}`);
    // Handle approval/rejection logic here
  };

  const CVViewer = ({ cv, name }: { cv: any, name: string }) => (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">{name}'s CV</h2>
        <p className="text-muted-foreground">Trainer Application Review</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Key Achievements
          </h3>
          <div className="space-y-2">
            {cv.achievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Experience</h3>
          <p className="text-muted-foreground">{cv.experience}</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Certifications</h3>
          <div className="space-y-2">
            {cv.certifications.map((cert: string, index: number) => (
              <Badge key={index} variant="outline" className="mr-2 mb-2">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Languages</h3>
          <div className="space-y-2">
            {cv.languages.map((lang: string, index: number) => (
              <Badge key={index} variant="secondary" className="mr-2 mb-2">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download CV
        </Button>
        <Button variant="secondary" className="flex-1">
          <FileText className="w-4 h-4 mr-2" />
          Full Portfolio
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Trainer Approvals</h1>
              <p className="text-muted-foreground">Review and approve trainer applications</p>
            </div>
            <Link to="/admin-dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gaming-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gaming-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gaming-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gaming-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">20</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search trainers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  onClick={() => setFilterStatus("pending")}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={filterStatus === "approved" ? "default" : "outline"}
                  onClick={() => setFilterStatus("approved")}
                  size="sm"
                >
                  Approved
                </Button>
                <Button
                  variant={filterStatus === "rejected" ? "default" : "outline"}
                  onClick={() => setFilterStatus("rejected")}
                  size="sm"
                >
                  Rejected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="gaming-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{application.name}</h3>
                      <p className="text-muted-foreground">{application.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{application.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{application.appliedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{application.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Gamepad2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {application.games.join(", ")}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{application.experience}</Badge>
                        <Badge variant="secondary">{application.rank}</Badge>
                      </div>
                    </div>

                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View CV
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <CVViewer cv={application.cv} name={application.name} />
                        </DialogContent>
                      </Dialog>

                      {application.status === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApproval(application.id, 'approve')}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleApproval(application.id, 'reject')}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Applications Found</h3>
              <p className="text-muted-foreground">No trainer applications match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainerApprovals;