import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, X, FileText, Download, User, Gamepad2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  profile: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export default function ProApprovalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
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
    if (!proData) return;
    
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update pro status
      const { error: updateError } = await supabase
        .from('pros')
        .update({
          is_approved: true,
          approved_by: user.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', proData.id);

      if (updateError) throw updateError;

      // Add PRO role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: proData.user_id,
          role: 'PRO'
        });

      if (roleError && !roleError.message.includes('duplicate')) {
        throw roleError;
      }

      // Send Discord invite email
      await supabase.functions.invoke('send-discord-invite', {
        body: {
          email: proData.profile.email,
          userName: `${proData.profile.first_name} ${proData.profile.last_name}`,
          userType: 'pro'
        }
      });

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
          rejection_reason: rejectionReason
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/pro-approvals')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Pro Player Application</h1>
            <p className="text-muted-foreground">Review and approve or reject</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {proData.profile.first_name} {proData.profile.last_name}
                </CardTitle>
                <CardDescription>@{proData.gaming_username}</CardDescription>
              </div>
              <Badge variant={proData.is_approved ? "default" : "secondary"}>
                {proData.is_approved ? 'Approved' : 'Pending'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-semibold">Contact Information</Label>
              <p className="text-muted-foreground">{proData.profile.email}</p>
            </div>

            <div>
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Selected Game
              </Label>
              <p className="text-muted-foreground">{proData.selected_game || 'Not specified'}</p>
            </div>

            <div>
              <Label className="text-sm font-semibold">Specialization</Label>
              <p className="text-muted-foreground">{proData.specialization}</p>
            </div>

            <div>
              <Label className="text-sm font-semibold">Bio</Label>
              <p className="text-muted-foreground">{proData.bio}</p>
            </div>

            <div>
              <Label className="text-sm font-semibold">Hourly Rate</Label>
              <p className="text-muted-foreground">{proData.hourly_rate} SAR/hour</p>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </Label>
              
              {proData.requirements_pdf_url && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(proData.requirements_pdf_url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Requirements PDF
                </Button>
              )}
              
              {proData.cv_url && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(proData.cv_url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </Button>
              )}
            </div>

            {!proData.is_approved && (
              <div className="flex gap-3 pt-4">
                {!showRejectForm ? (
                  <>
                    <Button
                      onClick={handleApprove}
                      disabled={submitting}
                      className="flex-1"
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
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                ) : (
                  <div className="w-full space-y-3">
                    <Label>Rejection Reason</Label>
                    <Textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide a detailed reason for rejection..."
                      rows={4}
                    />
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
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
