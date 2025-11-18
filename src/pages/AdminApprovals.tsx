import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Eye, Loader2, UserCheck, Crown, GraduationCap, Trophy, Shield } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PendingTrainer {
  id: number;
  user_id: string;
  bio: string | null;
  specialization: string | null;
  hourly_rate: number | null;
  created_at: string | null;
  profiles: {
    first_name: string;
    last_name: string;
    username: string;
    avatar_url: string | null;
    email: string;
  };
}

interface PendingPro {
  id: number;
  user_id: string;
  gaming_username: string | null;
  selected_game: string | null;
  bio: string | null;
  specialization: string | null;
  cv_url: string | null;
  requirements_pdf_url: string | null;
  created_at: string | null;
  profiles: {
    first_name: string;
    last_name: string;
    username: string;
    avatar_url: string | null;
    email: string;
  };
}

function AdminApprovalsContent() {
  const { toast } = useToast();
  const [pendingTrainers, setPendingTrainers] = useState<PendingTrainer[]>([]);
  const [pendingPros, setPendingPros] = useState<PendingPro[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);

      // Fetch pending trainers with user profiles
      const { data: trainers, error: trainersError } = await supabase
        .from('trainers')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (trainersError) throw trainersError;

      // Fetch profiles for trainers
      const trainerUserIds = trainers?.map(t => t.user_id) || [];
      const { data: trainerProfiles } = await supabase
        .from('profiles')
        .select('*')
        .in('id', trainerUserIds);

      const trainersWithProfiles = trainers?.map(trainer => ({
        ...trainer,
        profiles: trainerProfiles?.find(p => p.id === trainer.user_id) || {
          first_name: '',
          last_name: '',
          username: '',
          avatar_url: null,
          email: ''
        }
      })) || [];

      // Fetch pending pros with user profiles
      const { data: pros, error: prosError } = await supabase
        .from('pros')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (prosError) throw prosError;

      // Fetch profiles for pros
      const proUserIds = pros?.map(p => p.user_id) || [];
      const { data: proProfiles } = await supabase
        .from('profiles')
        .select('*')
        .in('id', proUserIds);

      const prosWithProfiles = pros?.map(pro => ({
        ...pro,
        profiles: proProfiles?.find(p => p.id === pro.user_id) || {
          first_name: '',
          last_name: '',
          username: '',
          avatar_url: null,
          email: ''
        }
      })) || [];

      setPendingTrainers(trainersWithProfiles);
      setPendingPros(prosWithProfiles);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch pending approvals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTrainer = async (trainerId: number, userId: string) => {
    try {
      setActionLoading(`trainer-${trainerId}`);

      // Get trainer details for email
      const trainer = pendingTrainers.find(t => t.id === trainerId);
      if (!trainer) throw new Error("Trainer not found");

      // Update trainer approval status
      const { error: updateError } = await supabase
        .from('trainers')
        .update({ is_approved: true })
        .eq('id', trainerId);

      if (updateError) throw updateError;

      // Add TRAINER role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'TRAINER' });

      if (roleError && !roleError.message.includes('duplicate')) throw roleError;

      // Send approval email
      try {
        await supabase.functions.invoke('send-approval-email', {
          body: {
            email: trainer.profiles.email,
            name: `${trainer.profiles.first_name} ${trainer.profiles.last_name}`,
            type: 'trainer',
            status: 'approved'
          }
        });
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Don't fail the approval if email fails
      }

      toast({
        title: "Trainer Approved",
        description: "The trainer has been activated and notified via email",
      });

      fetchPendingApprovals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve trainer",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectTrainer = async (trainerId: number) => {
    try {
      setActionLoading(`trainer-reject-${trainerId}`);

      // Get trainer details for email
      const trainer = pendingTrainers.find(t => t.id === trainerId);
      if (!trainer) throw new Error("Trainer not found");

      // Send rejection email before deleting
      try {
        await supabase.functions.invoke('send-approval-email', {
          body: {
            email: trainer.profiles.email,
            name: `${trainer.profiles.first_name} ${trainer.profiles.last_name}`,
            type: 'trainer',
            status: 'rejected',
            reason: 'Thank you for your application. Unfortunately, your qualifications do not meet our current requirements. Please review our trainer requirements and feel free to reapply in the future.'
          }
        });
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
        // Continue with deletion even if email fails
      }

      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', trainerId);

      if (error) throw error;

      toast({
        title: "Trainer Rejected",
        description: "The application has been rejected and the applicant has been notified",
      });

      fetchPendingApprovals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject trainer",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprovePro = async (proId: number, userId: string) => {
    try {
      setActionLoading(`pro-${proId}`);

      // Get pro details for email
      const pro = pendingPros.find(p => p.id === proId);
      if (!pro) throw new Error("Pro player not found");

      // Update pro approval status
      const { error: updateError } = await supabase
        .from('pros')
        .update({ is_approved: true })
        .eq('id', proId);

      if (updateError) throw updateError;

      // Add PRO role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'PRO' });

      if (roleError && !roleError.message.includes('duplicate')) throw roleError;

      // Send approval email
      try {
        await supabase.functions.invoke('send-approval-email', {
          body: {
            email: pro.profiles.email,
            name: `${pro.profiles.first_name} ${pro.profiles.last_name}`,
            type: 'pro',
            status: 'approved'
          }
        });
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Don't fail the approval if email fails
      }

      toast({
        title: "Pro Player Approved",
        description: "The pro player has been activated and notified via email",
      });

      fetchPendingApprovals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve pro player",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectPro = async (proId: number) => {
    try {
      setActionLoading(`pro-reject-${proId}`);

      // Get pro details for email
      const pro = pendingPros.find(p => p.id === proId);
      if (!pro) throw new Error("Pro player not found");

      // Send rejection email before deleting
      try {
        await supabase.functions.invoke('send-approval-email', {
          body: {
            email: pro.profiles.email,
            name: `${pro.profiles.first_name} ${pro.profiles.last_name}`,
            type: 'pro',
            status: 'rejected',
            reason: 'Thank you for your application. After careful review, we have determined that your current qualifications do not meet our pro player requirements. Please improve your skills and achievements, then feel free to reapply in the future.'
          }
        });
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
        // Continue with deletion even if email fails
      }

      const { error } = await supabase
        .from('pros')
        .delete()
        .eq('id', proId);

      if (error) throw error;

      toast({
        title: "Pro Player Rejected",
        description: "The application has been rejected and the applicant has been notified",
      });

      fetchPendingApprovals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject pro player",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const viewDetails = (item: any, type: 'trainer' | 'pro') => {
    setSelectedItem({ ...item, type });
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground neon-text">User Approvals</h1>
          </div>
          <p className="text-muted-foreground">Review and approve pending trainer and pro player applications</p>
        </div>

        <Tabs defaultValue="trainers" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="trainers" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              Trainers ({pendingTrainers.length})
            </TabsTrigger>
            <TabsTrigger value="pros" className="gap-2">
              <Trophy className="h-4 w-4" />
              Pro Players ({pendingPros.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Trainers */}
          <TabsContent value="trainers" className="space-y-4">
            {pendingTrainers.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending trainer applications</p>
                </CardContent>
              </Card>
            ) : (
              pendingTrainers.map((trainer) => (
                <Card key={trainer.id} className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={trainer.profiles?.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {trainer.profiles?.first_name?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">
                              {trainer.profiles?.first_name} {trainer.profiles?.last_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">@{trainer.profiles?.username}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{trainer.specialization || 'No specialization'}</Badge>
                            {trainer.hourly_rate && (
                              <Badge variant="secondary">{trainer.hourly_rate} SAR/hour</Badge>
                            )}
                          </div>
                          {trainer.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{trainer.bio}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Applied: {new Date(trainer.created_at || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDetails(trainer, 'trainer')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApproveTrainer(trainer.id, trainer.user_id)}
                          disabled={actionLoading === `trainer-${trainer.id}`}
                        >
                          {actionLoading === `trainer-${trainer.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRejectTrainer(trainer.id)}
                          disabled={actionLoading === `trainer-reject-${trainer.id}`}
                        >
                          {actionLoading === `trainer-reject-${trainer.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Pending Pro Players */}
          <TabsContent value="pros" className="space-y-4">
            {pendingPros.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending pro player applications</p>
                </CardContent>
              </Card>
            ) : (
              pendingPros.map((pro) => (
                <Card key={pro.id} className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={pro.profiles?.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {pro.profiles?.first_name?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">
                              {pro.profiles?.first_name} {pro.profiles?.last_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              @{pro.gaming_username || pro.profiles?.username}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {pro.selected_game && (
                              <Badge variant="outline">{pro.selected_game}</Badge>
                            )}
                            {pro.specialization && (
                              <Badge variant="secondary">{pro.specialization}</Badge>
                            )}
                          </div>
                          {pro.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{pro.bio}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Applied: {new Date(pro.created_at || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDetails(pro, 'pro')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprovePro(pro.id, pro.user_id)}
                          disabled={actionLoading === `pro-${pro.id}`}
                        >
                          {actionLoading === `pro-${pro.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRejectPro(pro.id)}
                          disabled={actionLoading === `pro-reject-${pro.id}`}
                        >
                          {actionLoading === `pro-reject-${pro.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === 'trainer' ? 'Trainer' : 'Pro Player'} Application Details
            </DialogTitle>
            <DialogDescription>
              Complete application information
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedItem.profiles?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {selectedItem.profiles?.first_name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-xl">
                    {selectedItem.profiles?.first_name} {selectedItem.profiles?.last_name}
                  </h3>
                  <p className="text-muted-foreground">{selectedItem.profiles?.email}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Username</Label>
                  <p className="font-medium">@{selectedItem.profiles?.username}</p>
                </div>

                {selectedItem.type === 'trainer' ? (
                  <>
                    <div>
                      <Label className="text-sm text-muted-foreground">Specialization</Label>
                      <p className="font-medium">{selectedItem.specialization || 'Not specified'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Hourly Rate</Label>
                      <p className="font-medium">{selectedItem.hourly_rate ? `${selectedItem.hourly_rate} SAR` : 'Not specified'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm text-muted-foreground">Gaming Username</Label>
                      <p className="font-medium">{selectedItem.gaming_username || 'Not specified'}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Selected Game</Label>
                      <p className="font-medium">{selectedItem.selected_game || 'Not specified'}</p>
                    </div>
                    {selectedItem.requirements_pdf_url && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Requirements Document</Label>
                        <Button variant="outline" size="sm" asChild className="mt-1">
                          <a href={selectedItem.requirements_pdf_url} target="_blank" rel="noopener noreferrer">
                            View Document
                          </a>
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {selectedItem.bio && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Bio</Label>
                    <p className="font-medium">{selectedItem.bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function AdminApprovals() {
  return (
    <ProtectedRoute requireAuth requiredRole="ADMIN">
      <AdminApprovalsContent />
    </ProtectedRoute>
  );
}
