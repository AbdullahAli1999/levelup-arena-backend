import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle, AlertTriangle, Mail, Home, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function PendingActivation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [paymentDetails, setPaymentDetails] = useState({
    amount: searchParams.get('amount') || '0',
    transactionId: searchParams.get('transaction_id') || '',
    session: searchParams.get('session') || 'Training Package'
  });

  useEffect(() => {
    // If user is not logged in, redirect to auth
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleContactSupport = () => {
    navigate('/support-ticket?type=payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Main Status Card */}
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="flex justify-center">
              <div className="p-4 bg-yellow-500/10 rounded-full">
                <Clock className="h-16 w-16 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <Badge variant="outline" className="mx-auto bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
              Account Pending Activation
            </Badge>
            <CardTitle className="text-3xl font-bold">
              Payment Received Successfully!
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Your account is awaiting admin approval
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Confirmation */}
            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="ml-2">
                <strong>Payment Confirmed</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Transaction ID: <code className="text-xs bg-background px-2 py-1 rounded">{paymentDetails.transactionId}</code></p>
                  <p>Amount: {paymentDetails.amount} SAR</p>
                  <p>Package: {decodeURIComponent(paymentDetails.session)}</p>
                </div>
              </AlertDescription>
            </Alert>

            {/* What Happens Next */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                What Happens Next?
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Payment Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Our admin team is reviewing your payment receipt to ensure everything is correct.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Account Activation</p>
                    <p className="text-sm text-muted-foreground">
                      Once verified, your account will be activated and you'll receive an email confirmation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Start Training</p>
                    <p className="text-sm text-muted-foreground">
                      You'll get full access to all features and can begin your training sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription className="ml-2">
                <strong>Check Your Email</strong>
                <p className="text-sm mt-1">
                  We've sent a confirmation to your email address. You'll receive another email once your account is activated.
                </p>
              </AlertDescription>
            </Alert>

            {/* Estimated Time */}
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <p className="text-sm font-medium mb-1">Estimated Activation Time</p>
              <p className="text-2xl font-bold text-primary">24-48 hours</p>
              <p className="text-xs text-muted-foreground mt-1">
                Most accounts are activated within 24 hours during business days
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
              <Button
                onClick={handleContactSupport}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-center text-sm text-muted-foreground pt-2">
              <p>
                Have questions? You can explore the website and{' '}
                <button 
                  onClick={handleContactSupport}
                  className="text-primary hover:underline font-medium"
                >
                  contact our support team
                </button>
                {' '}anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
