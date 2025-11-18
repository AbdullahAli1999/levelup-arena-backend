import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Check, X, FileText, Download, User, Gamepad2, Loader2, Clock, Mail, Trophy, AlertTriangle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProApprovalData {
  id: number;
  user_id: string;
  gaming_username: string;
  bio: string;
  specialization: string;
  hourly_rate: number;
  is_approved: boolean;
  selected_game: string;
  requirements_pdf_url: string;
  cv_url: string;
  created_at: string;
  rejection_reason: string | null;
  profile: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

const REJECTION_TEMPLATES = [
  {
    title: 'Insufficient Rank',
    reason: 'Unfortunately, your current rank does not meet the minimum requirements for professional play. Please achieve the required rank and reapply.'
  },
  {
    title: 'Incomplete Documentation',
    reason: 'Your application is missing required documentation or proof of achievements. Please provide complete screenshots of your rank, tournament results, and achievements.'
  },
  {
    title: 'Insufficient Tournament Experience',
    reason: 'We require a minimum of competitive tournament experience. Please participate in more tournaments and reapply with your results.'
  },
  {
    title: 'Quality of Proof',
    reason: 'The documentation provided does not clearly demonstrate meeting our requirements. Please provide higher quality screenshots and more detailed evidence of your achievements.'
  }
];

export default function ProApprovalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [proData, setProData] = useState<ProApprovalData | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProData();
    }
  }, [id]);

  const fetchProData = async () => {
    try {
      const { data, error } = await supabase
        .from('pros')
        .select(`
          *,
          profile:profiles(username, email, first_name, last_name)
        `)
        .eq('id', parseInt(id!))
        .single();

      if (error) throw error;
      setProData(data as any);
    } catch (error: any) {
      console.error('Error fetching pro data:', error);
      toast({
        title: "Error",
        description: "Failed to load pro player details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!proData || !user) return;
    
    setSubmitting(true);
    try {
      // Update pro status
      const { error: updateError } = await supabase
        .from('pros')
        .update({
          is_approved: true,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
          rejection_reason: null
        })
        .eq('id', proData.id);

      if (updateError) throw updateError;

      // Add PRO role if not exists
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: proData.user_id,
          role: 'PRO'
        });

      if (roleError && !roleError.message.includes('duplicate')) {
        console.error('Role error:', roleError);
      }

      // Send Discord invite email
      try {
        await supabase.functions.invoke('send-discord-invite', {
          body: {
            email: proData.profile.email,
            userName: `${proData.profile.first_name} ${proData.profile.last_name}`,
            userType: 'pro'
          }
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      toast({
        title: "Pro player approved",
        description: "The pro player has been notified and can now access the platform.",
      });

      navigate('/pro-approvals');
    } catch (error: any) {
      console.error('Error approving pro:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve pro player",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!proData || !rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('pros')
        .update({
          rejection_reason: rejectionReason,
          is_approved: false
        })
        .eq('id', proData.id);

      if (error) throw error;

      toast({
        title: "Application rejected",
        description: "The applicant has been notified.",
      });

      navigate('/pro-approvals');
    } catch (error: any) {
      console.error('Error rejecting pro:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reject application",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!proData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Pro player not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/pro-approvals')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Pro Player Application</h1>
            <p className="text-muted-foreground">Review application and supporting documents</p>
          </div>
          <Badge variant={proData.is_approved ? "default" : "secondary"} className="text-lg px-4 py-2">
            {proData.is_approved ? 'Approved' : 'Pending Review'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-glow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <User className="h-6 w-6 text-primary" />
                      {proData.profile.first_name} {proData.profile.last_name}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">@{proData.gaming_username}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email
                    </Label>
                    <p className="text-muted-foreground">{proData.profile.email}</p>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Applied
                    </Label>
                    <p className="text-muted-foreground">
                      {new Date(proData.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4 text-primary" />
                      Selected Game
                    </Label>
                    <Badge variant="outline" className="text-sm">
                      {proData.selected_game || 'Not specified'}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      Specialization
                    </Label>
                    <p className="text-muted-foreground">{proData.specialization}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Professional Bio</Label>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-muted-foreground whitespace-pre-wrap">{proData.bio}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-semibold">Hourly Rate</Label>
                  <p className="text-2xl font-bold text-primary">{proData.hourly_rate || 0} SAR/hour</p>
                </div>

                {proData.rejection_reason && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Previous Rejection Reason:</strong> {proData.rejection_reason}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>
                  Review uploaded proof of requirements and credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="requirements" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="requirements">Requirements Proof</TabsTrigger>
                    <TabsTrigger value="cv" disabled={!proData.cv_url}>CV/Resume</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="requirements" className="space-y-4">
                    {proData.requirements_pdf_url ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => window.open(proData.requirements_pdf_url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = proData.requirements_pdf_url;
                              link.download = 'requirements-proof.pdf';
                              link.click();
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="border-2 border-border rounded-lg overflow-hidden bg-muted/30">
                          <iframe
                            src={`${proData.requirements_pdf_url}#toolbar=0`}
                            className="w-full h-[600px]"
                            title="Requirements PDF"
                          />
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>No requirements document uploaded</AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="cv" className="space-y-4">
                    {proData.cv_url ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => window.open(proData.cv_url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = proData.cv_url;
                              link.download = 'cv.pdf';
                              link.click();
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="border-2 border-border rounded-lg overflow-hidden bg-muted/30">
                          <iframe
                            src={`${proData.cv_url}#toolbar=0`}
                            className="w-full h-[600px]"
                            title="CV PDF"
                          />
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>No CV document uploaded</AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {!proData.is_approved && !showRejectForm && (
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle>Review Actions</CardTitle>
                  <CardDescription>Approve or reject this application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleApprove}
                    disabled={submitting}
                    className="w-full"
                    size="lg"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Approve Application
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowRejectForm(true)}
                    variant="destructive"
                    className="w-full"
                    size="lg"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Application
                  </Button>
                </CardContent>
              </Card>
            )}

            {showRejectForm && (
              <Card className="card-glow border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Reject Application</CardTitle>
                  <CardDescription>Provide detailed feedback to the applicant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Quick Templates</Label>
                    <div className="grid gap-2">
                      {REJECTION_TEMPLATES.map((template, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="justify-start text-left h-auto py-2 px-3"
                          onClick={() => setRejectionReason(template.reason)}
                        >
                          <div>
                            <p className="font-medium text-sm">{template.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{template.reason}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Rejection Reason</Label>
                    <Textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide a detailed, constructive reason for rejection..."
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      {rejectionReason.length} / 500 characters
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReject}
                      disabled={submitting || !rejectionReason.trim()}
                      variant="destructive"
                      className="flex-1"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Confirm Rejection'
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectionReason('');
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {proData.is_approved && (
              <Card className="card-glow border-primary">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Approved
                  </CardTitle>
                  <CardDescription>This pro player has been approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertDescription>
                      The applicant has been granted pro player access and notified via email.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Review Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Verify rank meets minimum requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Check tournament participation proof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Review quality of submitted documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Verify achievements and credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <span>Assess professional bio quality</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
