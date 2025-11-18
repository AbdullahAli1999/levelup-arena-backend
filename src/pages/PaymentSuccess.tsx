import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  ArrowRight, 
  Calendar, 
  CreditCard,
  Receipt,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [userType, setUserType] = useState<'parent' | 'player' | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Get payment details from URL params
  const paymentId = searchParams.get('payment_id');
  const amount = searchParams.get('amount') || '0';
  const sessionTitle = searchParams.get('session') || 'Training Session';
  const transactionId = searchParams.get('transaction_id') || 'N/A';

  useEffect(() => {
    initializePaymentSuccess();
  }, []);

  const initializePaymentSuccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      // Get user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setUserEmail(profileData.email);
        setUserName(`${profileData.first_name} ${profileData.last_name}`);
      }

      // Check user type
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (roles) {
        const roleList = roles.map(r => r.role);
        if (roleList.includes('PARENTS')) {
          setUserType('parent');
        } else if (roleList.includes('PLAYER')) {
          setUserType('player');
        }
      }

      // Send Discord invite email
      await sendDiscordInvite(profileData.email, `${profileData.first_name} ${profileData.last_name}`);
      
    } catch (error: any) {
      console.error('Error initializing payment success:', error);
      toast({
        title: "Warning",
        description: "Payment successful but some features may be limited",
        variant: "default"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendDiscordInvite = async (email: string, name: string) => {
    try {
      const type = userType || 'player';
      const { error } = await supabase.functions.invoke('send-discord-invite', {
        body: {
          email,
          userName: name,
          userType: type
        }
      });

      if (error) throw error;
      
      setEmailSent(true);
      toast({
        title: "Welcome Email Sent!",
        description: "Check your inbox for your Discord community invite",
      });
    } catch (error: any) {
      console.error('Error sending Discord invite:', error);
      // Don't show error to user as payment was successful
      setEmailSent(false);
    }
  };

  const handleDownloadReceipt = () => {
    // Create a simple receipt text
    const receiptContent = `
LEVELUP ACADEMY - PAYMENT RECEIPT
═══════════════════════════════════

Transaction ID: ${transactionId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

PAYMENT DETAILS
───────────────────────────────────
Service: ${sessionTitle}
Amount: ${amount} SAR
Payment Method: Card
Status: COMPLETED ✓

CUSTOMER INFORMATION
───────────────────────────────────
Name: ${userName}
Email: ${userEmail}

Thank you for choosing LevelUp Academy!
For support, contact: support@levelupacademy.sa
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Receipt Downloaded",
      description: "Your payment receipt has been saved",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your payment, {userName.split(' ')[0]}!
          </p>
        </div>

        {/* Payment Details Card */}
        <Card className="border-2 border-green-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Payment Receipt
              </CardTitle>
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                Completed
              </Badge>
            </div>
            <CardDescription>Transaction ID: {transactionId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  Date & Time
                </div>
                <p className="font-semibold">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <CreditCard className="w-4 h-4" />
                  Payment Method
                </div>
                <p className="font-semibold">Credit Card</p>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div className="space-y-3">
              <h3 className="font-semibold">Order Details</h3>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{sessionTitle}</span>
                <span className="font-semibold">{amount} SAR</span>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total Paid</span>
              <span className="font-bold text-2xl text-green-500">{amount} SAR</span>
            </div>

            {/* Download Receipt Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDownloadReceipt}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </CardContent>
        </Card>

        {/* Discord Invite Card - Prominent */}
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🎮 Join Our Discord Community!
            </CardTitle>
            <CardDescription className="text-base">
              Connect with other {userType === 'parent' ? 'parents and trainers' : 'players and pros'}, 
              get exclusive tips, and stay updated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailSent && (
              <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Mail className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-green-500">Email Sent!</p>
                  <p className="text-sm text-muted-foreground">
                    We've sent your Discord invite to <span className="font-medium">{userEmail}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Click below to join our vibrant community:
              </p>
              <Button 
                size="lg" 
                className="w-full text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.open('https://discord.gg/3NzXWzy4', '_blank')}
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Server
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Direct Link: <a href="https://discord.gg/3NzXWzy4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">discord.gg/3NzXWzy4</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>Here's what you can do now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {userType === 'parent' ? (
              <>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Add Your Children's Profiles</p>
                    <p className="text-sm text-muted-foreground">
                      Create gaming profiles for your children to start tracking their progress
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">Browse Training Sessions</p>
                    <p className="text-sm text-muted-foreground">
                      Find expert trainers and book sessions for your children
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Join Discord Community</p>
                    <p className="text-sm text-muted-foreground">
                      Connect with other parents and get safety tips
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Complete Your Profile</p>
                    <p className="text-sm text-muted-foreground">
                      Set your gaming preferences and skill level
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">Book Your First Session</p>
                    <p className="text-sm text-muted-foreground">
                      Browse trainers and schedule your training
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Join Discord Community</p>
                    <p className="text-sm text-muted-foreground">
                      Connect with other players and pros
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="flex-1"
            onClick={() => navigate(userType === 'parent' ? '/parent-dashboard' : '/player-dashboard')}
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/my-bookings')}
          >
            View My Bookings
          </Button>
        </div>

        {/* Support */}
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{' '}
              <a href="mailto:support@levelupacademy.sa" className="text-primary hover:underline">
                support@levelupacademy.sa
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
