import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Mail, Home } from 'lucide-react';

export default function TrainerPending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-primary/20 shadow-neon animate-fade-in">
        <CardContent className="p-8 sm:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-primary/10 rounded-full p-6">
                <CheckCircle className="h-16 w-16 text-primary animate-bounce-subtle" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground neon-text">
              Application Submitted!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for applying to become a trainer at LevelUp Academy
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Under Review</h3>
                <p className="text-sm text-muted-foreground">
                  Our team is reviewing your application. This typically takes 2-3 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Notification</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email notification once your application has been reviewed.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-3">What Happens Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                Our team will review your qualifications and experience
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                You'll be notified via email about the application status
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                If approved, you can start creating training sessions
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full gap-2"
              size="lg"
            >
              <CheckCircle className="h-5 w-5" />
              Login Now
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full gap-2"
              size="lg"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>
          </div>

          {/* Contact Support */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Questions about your application?{' '}
            <a href="mailto:support@levelup.academy" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
