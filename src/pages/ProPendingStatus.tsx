import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, Trophy, ChevronRight, ArrowLeft, Star, Target } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ProPendingStatus() {
  const location = useLocation();
  const selectedGame = location.state?.selectedGame || 'sf6';

  const gameInfo = {
    sf6: { name: 'Street Fighter 6', icon: '🥊' },
    tekken8: { name: 'Tekken 8', icon: '👊' },
    kof15: { name: 'King of Fighters XV', icon: '👑' },
    ggst: { name: 'Guilty Gear Strive', icon: '⚡' }
  };

  const applicationDetails = {
    submittedAt: '2024-01-15 16:45',
    applicationId: 'PRO-2024-SF6-001',
    estimatedReviewTime: '5-7 business days',
    status: 'Under Review',
    reviewStage: 'Technical Assessment'
  };

  const reviewProcess = [
    {
      stage: 'Application Submitted',
      description: 'Your pro player application and documents have been received',
      status: 'completed',
      estimatedTime: 'Immediate',
      reviewer: 'System'
    },
    {
      stage: 'Technical Assessment',
      description: 'Trainers reviewing your gameplay skills and tournament history',
      status: 'in-progress',
      estimatedTime: '2-3 days',
      reviewer: 'Senior Trainers'
    },
    {
      stage: 'Moderator Review',
      description: 'Moderators evaluating your application and conducting background check',
      status: 'pending',
      estimatedTime: '2-3 days',
      reviewer: 'Moderation Team'
    },
    {
      stage: 'Final Decision',
      description: 'Admin approval and contract preparation',
      status: 'pending',
      estimatedTime: '1-2 days',
      reviewer: 'Admin Team'
    }
  ];

  const requirements = [
    {
      title: 'Rank Verification',
      description: 'Screenshot verification of Grand Master rank',
      status: 'submitted',
      action: 'Under Review'
    },
    {
      title: 'Tournament History',
      description: 'Documentation of competitive achievements',
      status: 'submitted', 
      action: 'Under Review'
    },
    {
      title: 'Gameplay Assessment',
      description: 'Video review of advanced techniques and combos',
      status: 'pending',
      action: 'Awaiting Trainer Review'
    },
    {
      title: 'Interview Scheduling',
      description: 'Technical interview with senior trainers',
      status: 'pending',
      action: 'To be scheduled'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'pending':
        return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />;
      default:
        return null;
    }
  };

  const getRequirementStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-muted';
    }
  };

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
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Pro Application Pending
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="text-6xl">{gameInfo[selectedGame as keyof typeof gameInfo]?.icon}</div>
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
              Pro Application Under Review
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your {gameInfo[selectedGame as keyof typeof gameInfo]?.name} professional player application 
              is being reviewed by our expert team of trainers and moderators.
            </p>
          </div>

          {/* Application Status Overview */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Application Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Application ID:</span>
                      <Badge variant="secondary" className="font-mono">
                        {applicationDetails.applicationId}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Game:</span>
                      <span>{gameInfo[selectedGame as keyof typeof gameInfo]?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span>{applicationDetails.submittedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Stage:</span>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {applicationDetails.reviewStage}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Completion:</span>
                      <span>{applicationDetails.estimatedReviewTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h4 className="font-bold text-yellow-400 mb-2">Elite Review Process</h4>
                    <p className="text-sm text-muted-foreground">
                      Our most experienced trainers are evaluating your skills
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Process Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Review Process Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviewProcess.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(step.status)}
                      {index < reviewProcess.length - 1 && (
                        <div 
                          className={`w-0.5 h-16 mt-2 ${
                            step.status === 'completed' ? 'bg-green-500' : 
                            step.status === 'in-progress' ? 'bg-blue-500' : 'bg-muted-foreground/30'
                          }`} 
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{step.stage}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{step.estimatedTime}</span>
                          <Badge variant="outline">{step.reviewer}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.status === 'in-progress' && (
                        <div className="mt-2 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                          <p className="text-xs text-blue-400 font-medium">Currently in progress...</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements Checklist */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Requirements Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-semibold">{req.title}</h4>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{req.action}</span>
                      <Badge variant="outline" className={getRequirementStatusColor(req.status)}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="mb-8 bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-400 mb-2">Important Notice</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Keep your gaming accounts active and maintain your current rank</li>
                    <li>• Check your email regularly for interview scheduling and requests</li>
                    <li>• Be prepared for a technical assessment call with senior trainers</li>
                    <li>• Ensure your contact information is up to date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mb-8">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold mb-2">Questions About Your Application?</h3>
              <p className="text-muted-foreground mb-4">
                Our pro player recruitment team is available to help with any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Recruitment Team</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/pro-faq">Pro Player FAQ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild>
              <Link to="/sessions">
                Browse Training Sessions
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}