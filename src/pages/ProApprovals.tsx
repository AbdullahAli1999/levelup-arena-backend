import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Loader2, User, Gamepad2, Calendar, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProApplication {
  id: number;
  gaming_username: string;
  selected_game: string;
  bio: string;
  specialization: string;
  is_approved: boolean;
  created_at: string;
  profile: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function ProApprovals() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<ProApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    try {
      let query = supabase
        .from('pros')
        .select(`
          *,
          profile:profiles(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter === 'pending') {
        query = query.eq('is_approved', false);
      } else if (statusFilter === 'approved') {
        query = query.eq('is_approved', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setApplications(data as any);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const searchLower = searchTerm.toLowerCase();
    return (
      app.profile.first_name.toLowerCase().includes(searchLower) ||
      app.profile.last_name.toLowerCase().includes(searchLower) ||
      app.gaming_username.toLowerCase().includes(searchLower) ||
      (app.selected_game || '').toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => !a.is_approved).length,
    approved: applications.filter(a => a.is_approved).length,
    thisWeek: applications.filter(a => {
      const created = new Date(a.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created >= weekAgo;
    }).length
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/moderator-dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pro Player Applications</h1>
            <p className="text-muted-foreground">Review and approve pro player registrations</p>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-secondary">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-primary">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-3xl font-bold text-accent">{stats.thisWeek}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, username, or game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No applications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((app) => (
              <Card key={app.id} className="card-glow hover:border-primary/50 transition-all hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        {app.profile.first_name} {app.profile.last_name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>@{app.gaming_username}</span>
                        {app.profile.email && (
                          <>
                            <span>•</span>
                            <span className="text-xs">{app.profile.email}</span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                    <Badge variant={app.is_approved ? "default" : "secondary"} className="text-sm">
                      {app.is_approved ? 'Approved' : 'Pending Review'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center flex-wrap gap-4 text-sm">
                      {app.selected_game && (
                        <div className="flex items-center gap-2 bg-gradient-card px-3 py-1.5 rounded-lg">
                          <Gamepad2 className="h-4 w-4 text-primary" />
                          <span className="font-medium">{app.selected_game}</span>
                        </div>
                      )}
                      {app.specialization && (
                        <Badge variant="outline" className="text-xs">
                          {app.specialization}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(app.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {app.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2 bg-muted/30 p-3 rounded-lg">
                        {app.bio}
                      </p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => navigate(`/pro-approvals/${app.id}`)}
                        className="flex-1"
                        variant={app.is_approved ? "outline" : "default"}
                      >
                        {app.is_approved ? 'View Details' : 'Review & Approve'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
