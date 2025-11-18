import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Gamepad2, 
  UserPlus,
  TrendingUp, 
  Clock, 
  Trophy,
  Edit,
  Trash2,
  BarChart3,
  Loader2,
  Plus,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Child {
  id: number;
  name: string;
  age: number;
  gaming_username: string;
  created_at: string;
  child_stats?: {
    current_rank: string;
    sessions_completed: number;
    total_hours: number;
    achievements: string[];
  };
}

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);
  const [parentName, setParentName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<Child | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchParentData();
  }, []);

  const fetchParentData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      // Get parent profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setParentName(profileData.first_name);
      }

      // Get parent ID
      const { data: parentData, error: parentError } = await supabase
        .from('parents')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (parentError || !parentData) {
        console.error('Parent not found:', parentError);
        setLoading(false);
        return;
      }

      // Get children with stats
      const { data: childrenData, error: childrenError } = await supabase
        .from('children')
        .select(`
          *,
          child_stats(*)
        `)
        .eq('parent_id', parentData.id)
        .order('created_at', { ascending: false });

      if (childrenError) {
        throw childrenError;
      }

      setChildren(childrenData as any);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChild = async () => {
    if (!childToDelete) return;
    
    setDeleting(true);
    try {
      // Delete child stats first (due to foreign key)
      await supabase
        .from('child_stats')
        .delete()
        .eq('child_id', childToDelete.id);

      // Delete child
      const { error } = await supabase
        .from('children')
        .delete()
        .eq('id', childToDelete.id);

      if (error) throw error;

      toast({
        title: "Child profile deleted",
        description: `${childToDelete.name}'s profile has been removed`,
      });

      // Refresh data
      fetchParentData();
      setDeleteDialogOpen(false);
      setChildToDelete(null);
    } catch (error: any) {
      console.error('Error deleting child:', error);
      toast({
        title: "Error",
        description: "Failed to delete child profile",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                <Gamepad2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  LevelUp Academy
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Parent Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                <Users className="w-4 h-4" />
              </Button>
              <Avatar className="border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {parentName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with Prominent Add Button */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome, <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">{parentName}</span>! 👋
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitor your children's gaming journey in a safe environment
              </p>
            </div>
          </div>

          {/* Prominent Add Child Card */}
          <Card className="border-2 border-dashed border-primary/50 hover:border-primary transition-colors bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Add Child Profile</h3>
                    <p className="text-muted-foreground">
                      Create a gaming profile for your child and start tracking their progress
                    </p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/add-child')}
                  className="shadow-lg hover:shadow-xl transition-all"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add Child
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Children Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Children Profiles</h2>
            <Badge variant="secondary" className="text-sm">
              {children.length} {children.length === 1 ? 'Child' : 'Children'}
            </Badge>
          </div>

          {children.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No children profiles yet</h3>
                <p className="text-muted-foreground mb-6">
                  Get started by adding your first child's gaming profile
                </p>
                <Button onClick={() => navigate('/add-child')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Your First Child
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <Card 
                  key={child.id} 
                  className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {child.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{child.name}</CardTitle>
                          <CardDescription>
                            Age {child.age} • @{child.gaming_username || 'No username'}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">Rank</span>
                        </div>
                        <p className="font-semibold">
                          {child.child_stats?.current_rank || 'Beginner'}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-muted-foreground">Sessions</span>
                        </div>
                        <p className="font-semibold">
                          {child.child_stats?.sessions_completed || 0}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-xs text-muted-foreground">Hours</span>
                        </div>
                        <p className="font-semibold">
                          {child.child_stats?.total_hours || 0}h
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="w-4 h-4 text-purple-500" />
                          <span className="text-xs text-muted-foreground">Achievements</span>
                        </div>
                        <p className="font-semibold">
                          {child.child_stats?.achievements?.length || 0}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => navigate(`/child-stats/${child.id}`)}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Stats
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          // For now, navigate to add-child with edit mode
                          toast({
                            title: "Edit feature",
                            description: "Edit functionality coming soon",
                          });
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setChildToDelete(child);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {children.length > 0 && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your children's gaming experience</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate('/my-bookings')}>
                <Clock className="w-5 h-5 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-semibold">View Bookings</div>
                  <div className="text-xs text-muted-foreground">Manage scheduled sessions</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate('/trainer-selection')}>
                <Users className="w-5 h-5 mr-3 text-green-500" />
                <div className="text-left">
                  <div className="font-semibold">Find Trainers</div>
                  <div className="text-xs text-muted-foreground">Book training sessions</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate('/settings')}>
                <Trophy className="w-5 h-5 mr-3 text-yellow-500" />
                <div className="text-left">
                  <div className="font-semibold">Settings</div>
                  <div className="text-xs text-muted-foreground">Manage account settings</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Child Profile?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {childToDelete?.name}'s profile? This action cannot be undone and will remove all associated data including stats and achievements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChild}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Profile'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
