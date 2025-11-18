import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Mail, MessageSquare, Trophy, ChevronRight, ArrowLeft, LogIn, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ModeratorPending() {
  const navigate = useNavigate();
  const applicationDetails = {
    submittedAt: '2024-01-15 14:30',
    applicationId: 'MOD-2024-001',
    estimatedReviewTime: '3-5 business days',
    status: 'Under Review'
  };

  const checklistItems = [
    {
      title: 'Application Submitted',
      description: 'Your moderator application has been received',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      title: 'Initial Review',
      description: 'Admin team reviewing your qualifications',
      status: 'in-progress',
      date: null
    },
    {
      title: 'Background Check',
      description: 'Verification of provided information',
      status: 'pending',
      date: null
    },
    {
      title: 'Final Approval',
      description: 'Decision and account activation',
      status: 'pending',
      date: null
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-muted text-muted-foreground';
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
            Application Pending
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
              Application Under Review
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thank you for applying to become a moderator at LevelUp Academy. 
              Your application is currently being reviewed by our admin team.
            </p>
          </div>

          {/* Application Status Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500/10 to-primary/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Application Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Application ID:</span>
                      <Badge variant="secondary" className="font-mono">
                        {applicationDetails.applicationId}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span>{applicationDetails.submittedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {applicationDetails.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Review Time:</span>
                      <span>{applicationDetails.estimatedReviewTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ll receive an email notification once your application is processed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(item.status)}
                      {index < checklistItems.length - 1 && (
                        <div 
                          className={`w-0.5 h-12 mt-2 ${
                            item.status === 'completed' ? 'bg-green-500' : 'bg-muted-foreground/30'
                          }`} 
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      {item.date && (
                        <p className="text-xs text-muted-foreground">Completed on {item.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Email Notification</h4>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll receive an email with the decision and next steps
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Account Setup</h4>
                  <p className="text-sm text-muted-foreground">
                    If approved, you&apos;ll get access to moderator tools and training
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Start Moderating</h4>
                  <p className="text-sm text-muted-foreground">
                    Begin helping maintain a safe and competitive environment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-bold mb-2">Questions About Your Application?</h3>
                <p className="text-muted-foreground mb-4">
                  Our admin team is here to help with any questions about the moderator application process.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/faq">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View FAQ
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate('/auth')} size="lg">
              <LogIn className="h-4 w-4 mr-2" />
              Login Now
            </Button>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/sessions">
                  Browse Sessions (Read-Only)
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}