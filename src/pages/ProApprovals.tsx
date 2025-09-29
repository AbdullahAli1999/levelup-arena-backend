import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Shield, 
  User, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  Trophy, 
  Star,
  FileText,
  Calendar,
  Download,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const ProApprovals = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [gameFilter, setGameFilter] = useState('ALL');

  // Mock data
  const mockApplications = [
    {
      id: '1',
      applicant: {
        firstName: 'Khalid',
        lastName: 'Al-Mansouri',
        email: 'khalid.mansouri@email.com',
        avatar: '/placeholder.svg',
        age: 19,
        nationality: 'Saudi Arabia',
        city: 'Riyadh'
      },
      game: 'Valorant',
      rank: 'Immortal 3',
      experience: '3 years competitive',
      achievements: [
        'MENA Regional Championship - 2nd Place',
        'Saudi Pro League - Winner',
        'University Esports Cup - 1st Place'
      ],
      stats: {
        peakRank: 'Radiant',
        averageKD: 1.67,
        hoursPlayed: 2400,
        winRate: 78.5
      },
      documents: {
        cv: 'khalid-cv.pdf',
        skillVideo: 'valorant-highlights.mp4',
        references: 'references.pdf'
      },
      applicationDate: '2024-03-15',
      status: 'PENDING',
      notes: 'Strong mechanical skills, good team communication. Previous tournament experience is impressive.',
      socialMedia: {
        twitch: 'khalid_gaming',
        youtube: 'KhalidPlays',
        twitter: '@khalid_esports'
      }
    },
    {
      id: '2',
      applicant: {
        firstName: 'Layla',
        lastName: 'Al-Zahra',
        email: 'layla.zahra@email.com',
        avatar: '/placeholder.svg',
        age: 17,
        nationality: 'Saudi Arabia',
        city: 'Jeddah'
      },
      game: 'Fortnite',
      rank: 'Champion League',
      experience: '2 years competitive',
      achievements: [
        'Fortnite World Cup Qualifier',
        'MENA Solo Championship - 3rd Place',
        'Creative Cup Winner'
      ],
      stats: {
        peakRank: 'Champion League',
        averageKD: 2.34,
        hoursPlayed: 1800,
        winRate: 85.2
      },
      documents: {
        cv: 'layla-cv.pdf',
        skillVideo: 'fortnite-montage.mp4',
        references: 'coach-references.pdf'
      },
      applicationDate: '2024-03-18',
      status: 'UNDER_REVIEW',
      notes: 'Exceptional building skills and game sense. Young but very promising talent.',
      socialMedia: {
        twitch: 'layla_builds',
        youtube: 'LaylaFortnite',
        instagram: '@layla_gaming'
      }
    },
    {
      id: '3',
      applicant: {
        firstName: 'Omar',
        lastName: 'Al-Rashid',
        email: 'omar.rashid@email.com',
        avatar: '/placeholder.svg',
        age: 22,
        nationality: 'Saudi Arabia',
        city: 'Dammam'
      },
      game: 'CS2',
      rank: 'Global Elite',
      experience: '5 years competitive',
      achievements: [
        'FaceIt Level 10',
        'ESL Pro League Qualifier',
        'BLAST Premier Qualifier'
      ],
      stats: {
        peakRank: 'Global Elite',
        averageKD: 1.45,
        hoursPlayed: 4200,
        winRate: 72.8
      },
      documents: {
        cv: 'omar-cv.pdf',
        skillVideo: 'cs2-highlights.mp4',
        references: 'team-references.pdf'
      },
      applicationDate: '2024-03-12',
      status: 'APPROVED',
      notes: 'Excellent IGL skills and tactical knowledge. Strong addition to the pro roster.',
      approvedBy: 'Admin Sarah',
      approvedDate: '2024-03-20'
    },
    {
      id: '4',
      applicant: {
        firstName: 'Fatima',
        lastName: 'Al-Qassim',
        email: 'fatima.qassim@email.com',
        avatar: '/placeholder.svg',
        age: 20,
        nationality: 'Saudi Arabia',
        city: 'Riyadh'
      },
      game: 'League of Legends',
      rank: 'Challenger',
      experience: '4 years competitive',
      achievements: [
        'Worlds Play-In Stage',
        'LEC Masters Winner',
        'University Championship MVP'
      ],
      stats: {
        peakRank: 'Challenger 800LP',
        averageKD: 3.2,
        hoursPlayed: 3600,
        winRate: 76.4
      },
      documents: {
        cv: 'fatima-cv.pdf',
        skillVideo: 'lol-montage.mp4',
        references: 'coach-feedback.pdf'
      },
      applicationDate: '2024-03-10',
      status: 'REJECTED',
      notes: 'Good individual skill but communication issues noted in team tryouts.',
      rejectedBy: 'Moderator Ahmed',
      rejectedDate: '2024-03-19',
      rejectionReason: 'Team communication requirements not met'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'UNDER_REVIEW': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'APPROVED': 'bg-green-500/10 text-green-400 border-green-500/20',
      'REJECTED': 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[status] || colors['PENDING'];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'PENDING': <Clock className="h-4 w-4" />,
      'UNDER_REVIEW': <Eye className="h-4 w-4" />,
      'APPROVED': <CheckCircle className="h-4 w-4" />,
      'REJECTED': <XCircle className="h-4 w-4" />
    };
    return icons[status] || icons['PENDING'];
  };

  const handleApproval = (applicationId: string, action: 'approve' | 'reject', reason?: string) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: action === 'approve' ? 'APPROVED' : 'REJECTED',
            [`${action}dBy`]: 'Current Moderator',
            [`${action}dDate`]: new Date().toISOString(),
            ...(action === 'reject' && reason ? { rejectionReason: reason } : {})
          }
        : app
    );
    setApplications(updatedApplications);
    
    toast({
      title: `Application ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${applications.find(app => app.id === applicationId)?.applicant.firstName}'s application has been ${action}d.`,
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = `${app.applicant.firstName} ${app.applicant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesGame = gameFilter === 'ALL' || app.game === gameFilter;
    return matchesSearch && matchesStatus && matchesGame;
  });

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

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
          <Skeleton className="h-96 w-full rounded-lg" />
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
              onClick={() => navigate('/moderator-dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Pro Player Applications
              </h1>
              <p className="text-muted-foreground">Review and approve pro player applications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.PENDING || 0}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.UNDER_REVIEW || 0}</div>
              <div className="text-xs text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.APPROVED || 0}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <XCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.REJECTED || 0}</div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Applications</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or game..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status Filter</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Game Filter</Label>
                <Select value={gameFilter} onValueChange={setGameFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Games</SelectItem>
                    <SelectItem value="Valorant">Valorant</SelectItem>
                    <SelectItem value="Fortnite">Fortnite</SelectItem>
                    <SelectItem value="CS2">CS2</SelectItem>
                    <SelectItem value="League of Legends">League of Legends</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={application.applicant.avatar} alt={application.applicant.firstName} />
                      <AvatarFallback>
                        {application.applicant.firstName[0]}{application.applicant.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {application.applicant.firstName} {application.applicant.lastName}
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          {application.status.replace('_', ' ')}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {application.game} • {application.rank} • Applied {new Date(application.applicationDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={application.applicant.avatar} />
                              <AvatarFallback>
                                {application.applicant.firstName[0]}{application.applicant.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            {application.applicant.firstName} {application.applicant.lastName} - Pro Application
                          </DialogTitle>
                          <DialogDescription>
                            Detailed review of pro player application for {application.game}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Personal Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Personal Information</Label>
                              <div className="space-y-1 text-sm">
                                <div>Age: {application.applicant.age}</div>
                                <div>Email: {application.applicant.email}</div>
                                <div>Location: {application.applicant.city}, {application.applicant.nationality}</div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Gaming Profile</Label>
                              <div className="space-y-1 text-sm">
                                <div>Game: {application.game}</div>
                                <div>Current Rank: {application.rank}</div>
                                <div>Experience: {application.experience}</div>
                              </div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Performance Statistics</Label>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">{application.stats.peakRank}</div>
                                <div className="text-xs text-muted-foreground">Peak Rank</div>
                              </div>
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">{application.stats.averageKD}</div>
                                <div className="text-xs text-muted-foreground">Avg K/D</div>
                              </div>
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">{application.stats.hoursPlayed}</div>
                                <div className="text-xs text-muted-foreground">Hours Played</div>
                              </div>
                              <div className="text-center p-3 bg-card/50 rounded-lg">
                                <div className="font-bold text-lg">{application.stats.winRate}%</div>
                                <div className="text-xs text-muted-foreground">Win Rate</div>
                              </div>
                            </div>
                          </div>

                          {/* Achievements */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Achievements</Label>
                            <div className="space-y-2">
                              {application.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-card/50 rounded">
                                  <Trophy className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Documents */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Submitted Documents</Label>
                            <div className="grid grid-cols-3 gap-3">
                              <Button variant="outline" size="sm" className="justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                CV/Resume
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Skill Video
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                References
                              </Button>
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Review Notes</Label>
                            <Textarea
                              value={application.notes}
                              readOnly
                              className="min-h-[100px]"
                            />
                          </div>

                          {/* Action Buttons */}
                          {application.status === 'PENDING' || application.status === 'UNDER_REVIEW' ? (
                            <div className="flex gap-3 pt-4 border-t">
                              <Button
                                onClick={() => handleApproval(application.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Application
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleApproval(application.id, 'reject', 'Requirements not met')}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Application
                              </Button>
                            </div>
                          ) : (
                            <div className="pt-4 border-t text-sm text-muted-foreground">
                              Application {application.status.toLowerCase()} on {' '}
                              {new Date(application.approvedDate || application.rejectedDate).toLocaleDateString()}
                              {application.rejectionReason && (
                                <div className="mt-2 p-2 bg-red-500/10 rounded text-red-400">
                                  Reason: {application.rejectionReason}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Experience</Label>
                    <div className="text-sm font-medium">{application.experience}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Key Stats</Label>
                    <div className="text-sm font-medium">
                      {application.stats.winRate}% WR • {application.stats.averageKD} K/D
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <div className="text-sm font-medium">
                      {application.applicant.city}, {application.applicant.nationality}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-card/30 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Top Achievement:</div>
                  <div className="text-sm font-medium">{application.achievements[0]}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Applications Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'ALL' || gameFilter !== 'ALL' 
                  ? 'No applications match your current filters.'
                  : 'No pro player applications to review at this time.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProApprovals;