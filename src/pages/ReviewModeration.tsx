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
  MessageSquare, 
  Star, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye,
  Flag,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Shield,
  User,
  Calendar
} from 'lucide-react';

const ReviewModeration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Mock data
  const mockReviews = [
    {
      id: '1',
      reviewer: {
        firstName: 'Ahmad',
        lastName: 'Al-Mahmoud',
        avatar: '/placeholder.svg',
        userType: 'PLAYER'
      },
      reviewee: {
        firstName: 'Sarah',
        lastName: 'Al-Zahra',
        avatar: '/placeholder.svg',
        userType: 'TRAINER'
      },
      session: {
        id: 'session-123',
        game: 'Valorant',
        date: '2024-03-20',
        duration: 120
      },
      rating: 5,
      comment: 'Sarah is an amazing trainer! She helped me improve my aim and game sense significantly. Her teaching methods are clear and effective. I would definitely recommend her to anyone looking to improve their Valorant skills.',
      submittedDate: '2024-03-21',
      status: 'PENDING_REVIEW',
      reportedBy: null,
      reportReason: null,
      flagged: false,
      helpful: 15,
      notHelpful: 2,
      tags: ['POSITIVE', 'DETAILED', 'CONSTRUCTIVE']
    },
    {
      id: '2',
      reviewer: {
        firstName: 'Layla',
        lastName: 'Al-Rashid',
        avatar: '/placeholder.svg',
        userType: 'PARENT'
      },
      reviewee: {
        firstName: 'Omar',
        lastName: 'Al-Qasimi',
        avatar: '/placeholder.svg',
        userType: 'TRAINER'
      },
      session: {
        id: 'session-456',
        game: 'Fortnite',
        date: '2024-03-18',
        duration: 90
      },
      rating: 1,
      comment: 'Terrible experience. The trainer was late, unprofessional, and used inappropriate language during the session with my child. This is completely unacceptable behavior.',
      submittedDate: '2024-03-19',
      status: 'FLAGGED',
      reportedBy: {
        firstName: 'System',
        reason: 'Inappropriate content detected'
      },
      reportReason: 'Contains allegations of inappropriate behavior',
      flagged: true,
      helpful: 8,
      notHelpful: 1,
      tags: ['NEGATIVE', 'COMPLAINT', 'URGENT']
    },
    {
      id: '3',
      reviewer: {
        firstName: 'Khalid',
        lastName: 'Al-Mutairi',
        avatar: '/placeholder.svg',
        userType: 'PLAYER'
      },
      reviewee: {
        firstName: 'Fatima',
        lastName: 'Al-Harbi',
        avatar: '/placeholder.svg',
        userType: 'PRO_PLAYER'
      },
      session: {
        id: 'session-789',
        game: 'CS2',
        date: '2024-03-15',
        duration: 60
      },
      rating: 4,
      comment: 'Good session overall. Fatima shared some useful strategies and her mechanical skills are impressive. However, the session felt a bit rushed and I would have liked more personalized feedback.',
      submittedDate: '2024-03-16',
      status: 'APPROVED',
      reportedBy: null,
      reportReason: null,
      flagged: false,
      helpful: 12,
      notHelpful: 3,
      tags: ['POSITIVE', 'CONSTRUCTIVE'],
      approvedBy: 'Moderator Sarah',
      approvedDate: '2024-03-17'
    },
    {
      id: '4',
      reviewer: {
        firstName: 'Noor',
        lastName: 'Al-Saud',
        avatar: '/placeholder.svg',
        userType: 'PLAYER'
      },
      reviewee: {
        firstName: 'Ahmed',
        lastName: 'Al-Dosari',
        avatar: '/placeholder.svg',
        userType: 'TRAINER'
      },
      session: {
        id: 'session-101',
        game: 'League of Legends',
        date: '2024-03-12',
        duration: 150
      },
      rating: 2,
      comment: 'This trainer is a complete noob and wasted my time. He doesn\'t know what he\'s talking about and I could play better than him. Total scam!',
      submittedDate: '2024-03-13',
      status: 'REJECTED',
      reportedBy: {
        firstName: 'Ahmed Al-Dosari',
        reason: 'Inappropriate language and false claims'
      },
      reportReason: 'Contains offensive language and unsubstantiated claims',
      flagged: true,
      helpful: 2,
      notHelpful: 18,
      tags: ['NEGATIVE', 'INAPPROPRIATE', 'UNSUBSTANTIATED'],
      rejectedBy: 'Moderator Ahmed',
      rejectedDate: '2024-03-14',
      rejectionReason: 'Contains inappropriate language and unsubstantiated claims'
    },
    {
      id: '5',
      reviewer: {
        firstName: 'Yasmin',
        lastName: 'Al-Fadl',
        avatar: '/placeholder.svg',
        userType: 'PLAYER'
      },
      reviewee: {
        firstName: 'Mohammad',
        lastName: 'Al-Rashid',
        avatar: '/placeholder.svg',
        userType: 'TRAINER'
      },
      session: {
        id: 'session-202',
        game: 'Valorant',
        date: '2024-03-25',
        duration: 75
      },
      rating: 3,
      comment: 'Average session. The trainer knew the basics but didn\'t provide any advanced strategies. It was okay for beginners but I was expecting more advanced content.',
      submittedDate: '2024-03-26',
      status: 'UNDER_REVIEW',
      reportedBy: null,
      reportReason: null,
      flagged: false,
      helpful: 5,
      notHelpful: 2,
      tags: ['NEUTRAL', 'HONEST'],
      assignedTo: 'Moderator Sarah'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING_REVIEW': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'UNDER_REVIEW': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'APPROVED': 'bg-green-500/10 text-green-400 border-green-500/20',
      'REJECTED': 'bg-red-500/10 text-red-400 border-red-500/20',
      'FLAGGED': 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    };
    return colors[status] || colors['PENDING_REVIEW'];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'PENDING_REVIEW': <MessageSquare className="h-4 w-4" />,
      'UNDER_REVIEW': <Eye className="h-4 w-4" />,
      'APPROVED': <CheckCircle className="h-4 w-4" />,
      'REJECTED': <XCircle className="h-4 w-4" />,
      'FLAGGED': <Flag className="h-4 w-4" />
    };
    return icons[status] || icons['PENDING_REVIEW'];
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'POSITIVE': 'bg-green-500/10 text-green-400',
      'NEGATIVE': 'bg-red-500/10 text-red-400',
      'NEUTRAL': 'bg-blue-500/10 text-blue-400',
      'DETAILED': 'bg-purple-500/10 text-purple-400',
      'CONSTRUCTIVE': 'bg-emerald-500/10 text-emerald-400',
      'COMPLAINT': 'bg-orange-500/10 text-orange-400',
      'INAPPROPRIATE': 'bg-red-600/10 text-red-500',
      'URGENT': 'bg-red-500/10 text-red-400',
      'UNSUBSTANTIATED': 'bg-gray-500/10 text-gray-400',
      'HONEST': 'bg-blue-500/10 text-blue-400'
    };
    return colors[tag] || 'bg-gray-500/10 text-gray-400';
  };

  const handleReviewAction = (reviewId: string, action: 'approve' | 'reject', reason?: string) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            status: action === 'approve' ? 'APPROVED' : 'REJECTED',
            [`${action}dBy`]: 'Current Moderator',
            [`${action}dDate`]: new Date().toISOString(),
            ...(action === 'reject' && reason ? { rejectionReason: reason } : {})
          }
        : review
    );
    setReviews(updatedReviews);
    
    toast({
      title: `Review ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `The review has been ${action}d successfully.`,
    });
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = `${review.reviewer.firstName} ${review.reviewer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${review.reviewee.firstName} ${review.reviewee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.session.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'ALL' || review.rating.toString() === ratingFilter;
    const matchesType = typeFilter === 'ALL' || review.reviewee.userType === typeFilter;
    return matchesSearch && matchesStatus && matchesRating && matchesType;
  });

  const statusCounts = reviews.reduce((acc, review) => {
    acc[review.status] = (acc[review.status] || 0) + 1;
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
                Review Moderation
              </h1>
              <p className="text-muted-foreground">Monitor and moderate user reviews and feedback</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.PENDING_REVIEW || 0}</div>
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
              <Flag className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{statusCounts.FLAGGED || 0}</div>
              <div className="text-xs text-muted-foreground">Flagged</div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search Reviews</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
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
                    <SelectItem value="PENDING_REVIEW">Pending Review</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="FLAGGED">Flagged</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rating Filter</Label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reviewee Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="TRAINER">Trainers</SelectItem>
                    <SelectItem value="PRO_PLAYER">Pro Players</SelectItem>
                    <SelectItem value="PLAYER">Players</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className={`border-border/50 bg-card/50 backdrop-blur-sm ${review.flagged ? 'border-orange-500/50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.firstName} />
                        <AvatarFallback>
                          {review.reviewer.firstName[0]}{review.reviewer.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-muted-foreground">→</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.reviewee.avatar} alt={review.reviewee.firstName} />
                        <AvatarFallback>
                          {review.reviewee.firstName[0]}{review.reviewee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">
                          {review.reviewer.firstName} {review.reviewer.lastName} → {review.reviewee.firstName} {review.reviewee.lastName}
                        </CardTitle>
                        <Badge className={getStatusColor(review.status)}>
                          {getStatusIcon(review.status)}
                          {review.status.replace('_', ' ')}
                        </Badge>
                        {review.flagged && (
                          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                            <Flag className="h-3 w-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {review.session.game} session • {new Date(review.session.date).toLocaleDateString()} • 
                        {review.session.duration} minutes
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {getRatingStars(review.rating)}
                          <span className="text-sm font-medium ml-1">{review.rating}/5</span>
                        </div>
                        <div className="flex gap-1">
                          {review.tags.map((tag) => (
                            <Badge key={tag} className={getTagColor(tag)} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {new Date(review.submittedDate).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-card/30 rounded-lg">
                  <p className="text-sm leading-relaxed">{review.comment}</p>
                </div>

                {review.reportReason && (
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-orange-400 mb-1">Report Reason:</div>
                        <div className="text-sm text-orange-300">{review.reportReason}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <ThumbsUp className="h-4 w-4 text-green-400" />
                      <span>{review.helpful}</span>
                      <ThumbsDown className="h-4 w-4 text-red-400 ml-2" />
                      <span>{review.notHelpful}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Reviewer: {review.reviewer.userType} • Reviewee: {review.reviewee.userType}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedReview(review)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Review Details</DialogTitle>
                          <DialogDescription>
                            Comprehensive review information and moderation options
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Review Content */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={review.reviewer.avatar} />
                                <AvatarFallback>
                                  {review.reviewer.firstName[0]}{review.reviewer.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">
                                  {review.reviewer.firstName} {review.reviewer.lastName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {review.reviewer.userType} • Reviewed on {new Date(review.submittedDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  {getRatingStars(review.rating)}
                                  <span className="ml-2 font-medium">{review.rating}/5</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-card/50 rounded-lg">
                              <p className="leading-relaxed">{review.comment}</p>
                            </div>
                          </div>

                          {/* Session Details */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Session Information</Label>
                            <div className="grid grid-cols-2 gap-4 p-3 bg-card/50 rounded-lg">
                              <div>
                                <div className="text-sm text-muted-foreground">Game</div>
                                <div className="font-medium">{review.session.game}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Duration</div>
                                <div className="font-medium">{review.session.duration} minutes</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Date</div>
                                <div className="font-medium">{new Date(review.session.date).toLocaleDateString()}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Session ID</div>
                                <div className="font-medium">{review.session.id}</div>
                              </div>
                            </div>
                          </div>

                          {/* Community Feedback */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Community Feedback</Label>
                            <div className="flex items-center gap-6 p-3 bg-card/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <ThumbsUp className="h-5 w-5 text-green-400" />
                                <span className="font-medium">{review.helpful}</span>
                                <span className="text-sm text-muted-foreground">found helpful</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ThumbsDown className="h-5 w-5 text-red-400" />
                                <span className="font-medium">{review.notHelpful}</span>
                                <span className="text-sm text-muted-foreground">not helpful</span>
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Review Tags</Label>
                            <div className="flex flex-wrap gap-2">
                              {review.tags.map((tag) => (
                                <Badge key={tag} className={getTagColor(tag)} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Moderation Actions */}
                          {(review.status === 'PENDING_REVIEW' || review.status === 'UNDER_REVIEW' || review.status === 'FLAGGED') && (
                            <div className="flex gap-3 pt-4 border-t">
                              <Button
                                onClick={() => handleReviewAction(review.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Review
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleReviewAction(review.id, 'reject', 'Violates community guidelines')}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Review
                              </Button>
                              {!review.flagged && (
                                <Button variant="outline">
                                  <Flag className="h-4 w-4 mr-2" />
                                  Flag for Review
                                </Button>
                              )}
                            </div>
                          )}

                          {review.status === 'APPROVED' && (
                            <div className="text-sm text-muted-foreground pt-4 border-t">
                              Approved by {review.approvedBy} on {new Date(review.approvedDate).toLocaleDateString()}
                            </div>
                          )}

                          {review.status === 'REJECTED' && (
                            <div className="pt-4 border-t">
                              <div className="text-sm text-muted-foreground mb-2">
                                Rejected by {review.rejectedBy} on {new Date(review.rejectedDate).toLocaleDateString()}
                              </div>
                              <div className="p-2 bg-red-500/10 rounded text-red-400 text-sm">
                                Reason: {review.rejectionReason}
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {(review.status === 'PENDING_REVIEW' || review.status === 'UNDER_REVIEW' || review.status === 'FLAGGED') && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleReviewAction(review.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReviewAction(review.id, 'reject', 'Inappropriate content')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Reviews Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'ALL' || ratingFilter !== 'ALL' || typeFilter !== 'ALL'
                  ? 'No reviews match your current filters.'
                  : 'No reviews to moderate at this time.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewModeration;