import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Target,
  Download,
  Calendar,
  Star,
  Award,
  Loader2,
  MessageSquare,
  BarChart3,
  LineChart as LineChartIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ChildData {
  id: number;
  name: string;
  age: number;
  gaming_username: string;
  child_stats?: {
    current_rank: string;
    sessions_completed: number;
    total_hours: number;
    achievements: string[];
  };
}

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const ACHIEVEMENTS_DATA = [
  { id: 1, title: 'First Session', description: 'Completed first training session', date: '2024-01-15', icon: '🎮' },
  { id: 2, title: 'Week Warrior', description: 'Trained 5 days in a row', date: '2024-02-01', icon: '🔥' },
  { id: 3, title: 'Quick Learner', description: 'Improved rank in first month', date: '2024-02-10', icon: '📈' },
  { id: 4, title: 'Team Player', description: 'Participated in team practice', date: '2024-02-20', icon: '🤝' },
  { id: 5, title: 'Consistency King', description: 'Maintained 80% attendance', date: '2024-03-01', icon: '👑' }
];

const FEEDBACK_DATA = [
  {
    id: 1,
    trainer: 'Ahmed Al-Rashid',
    date: '2024-03-15',
    rating: 5,
    comment: 'Excellent progress! Shows great understanding of game mechanics and strategic thinking.',
    session: 'Advanced Techniques'
  },
  {
    id: 2,
    trainer: 'Sarah Al-Zahra',
    date: '2024-03-10',
    rating: 4,
    comment: 'Good improvement in reaction time. Keep practicing the combo moves we worked on.',
    session: 'Combat Skills'
  },
  {
    id: 3,
    trainer: 'Omar Al-Habib',
    date: '2024-03-05',
    rating: 5,
    comment: 'Outstanding performance in team coordination. Natural leadership qualities.',
    session: 'Team Strategy'
  }
];

export default function ChildStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [childData, setChildData] = useState<ChildData | null>(null);
  const [dateRange, setDateRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');

  const sessionHistoryData = [
    { date: 'Week 1', hours: 4, sessions: 2 },
    { date: 'Week 2', hours: 6, sessions: 3 },
    { date: 'Week 3', hours: 5, sessions: 2 },
    { date: 'Week 4', hours: 8, sessions: 4 },
    { date: 'Week 5', hours: 7, sessions: 3 },
    { date: 'Week 6', hours: 9, sessions: 4 }
  ];

  const skillProgressData = [
    { skill: 'Mechanics', value: 85 },
    { skill: 'Strategy', value: 78 },
    { skill: 'Teamwork', value: 92 },
    { skill: 'Communication', value: 88 },
    { skill: 'Game Sense', value: 75 }
  ];

  const performanceData = [
    { name: 'Training', value: 65 },
    { name: 'Practice', value: 25 },
    { name: 'Review', value: 10 }
  ];

  useEffect(() => {
    fetchChildData();
  }, [id]);

  const fetchChildData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: parentData } = await supabase
        .from('parents')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!parentData) {
        toast({
          title: "Error",
          description: "Parent profile not found",
          variant: "destructive"
        });
        navigate('/parent-dashboard');
        return;
      }

      const { data: childDataResult, error } = await supabase
        .from('children')
        .select(`
          *,
          child_stats(*)
        `)
        .eq('id', parseInt(id!))
        .eq('parent_id', parentData.id)
        .maybeSingle();

      if (error || !childDataResult) {
        toast({
          title: "Error",
          description: "Child profile not found",
          variant: "destructive"
        });
        navigate('/parent-dashboard');
        return;
      }

      setChildData(childDataResult as any);
    } catch (error: any) {
      console.error('Error fetching child stats:', error);
      toast({
        title: "Error",
        description: "Failed to load statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!childData) return;

    const reportContent = `
LEVELUP ACADEMY - PROGRESS REPORT
═══════════════════════════════════════

CHILD INFORMATION
───────────────────────────────────────
Name: ${childData.name}
Age: ${childData.age}
Gaming Username: ${childData.gaming_username}
Current Rank: ${childData.child_stats?.current_rank || 'Beginner'}

STATISTICS SUMMARY
───────────────────────────────────────
Total Sessions: ${childData.child_stats?.sessions_completed || 0}
Total Hours: ${childData.child_stats?.total_hours || 0}h
Achievements: ${childData.child_stats?.achievements?.length || 0}

RECENT ACHIEVEMENTS
───────────────────────────────────────
${ACHIEVEMENTS_DATA.slice(0, 3).map(a => `${a.icon} ${a.title} - ${a.date}`).join('\n')}

TRAINER FEEDBACK (Recent)
───────────────────────────────────────
${FEEDBACK_DATA.slice(0, 2).map(f => `
Trainer: ${f.trainer}
Session: ${f.session}
Rating: ${'⭐'.repeat(f.rating)}
Feedback: ${f.comment}
Date: ${f.date}
`).join('\n---\n')}

Generated: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${childData.name.replace(' ', '_')}_progress_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Progress report has been downloaded",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!childData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/parent-dashboard')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {childData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{childData.name}</h1>
                  <p className="text-sm text-muted-foreground">@{childData.gaming_username}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8 text-purple-500" />
                <Badge variant="secondary">{childData.child_stats?.current_rank || 'Beginner'}</Badge>
              </div>
              <p className="text-2xl font-bold">{childData.child_stats?.sessions_completed || 0}</p>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{childData.child_stats?.total_hours || 0}h</p>
              <p className="text-sm text-muted-foreground">Training Hours</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-yellow-500" />
                <Badge variant="secondary">+2 New</Badge>
              </div>
              <p className="text-2xl font-bold">{childData.child_stats?.achievements?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-green-500" />
                <Badge variant="default">85%</Badge>
              </div>
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress">
              <LineChartIcon className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Weekly training activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sessionHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))' 
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="hours" fill="#8b5cf6" name="Hours" />
                      <Bar dataKey="sessions" fill="#ec4899" name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>How time is spent</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment</CardTitle>
                <CardDescription>Current skill levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillProgressData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="skill" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Progression</CardTitle>
                <CardDescription>Track improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={sessionHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} name="Training Hours" />
                    <Line type="monotone" dataKey="sessions" stroke="#ec4899" strokeWidth={2} name="Sessions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
                <CardDescription>Key achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: '2024-03-15', title: 'Reached Intermediate', description: 'Consistent improvement' },
                    { date: '2024-02-28', title: 'Completed 10 Sessions', description: '90% attendance' },
                    { date: '2024-02-15', title: 'First Tournament', description: 'Local competition' }
                  ].map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {index < 2 && <div className="w-0.5 h-full bg-border mt-2" />}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          <Badge variant="outline">{milestone.date}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACHIEVEMENTS_DATA.map((achievement) => (
                <Card key={achievement.id} className="border-border/50 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant="secondary">{achievement.date}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            {FEEDBACK_DATA.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{feedback.trainer}</CardTitle>
                      <CardDescription>{feedback.session} • {feedback.date}</CardDescription>
                    </div>
                    <div className="flex">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feedback.comment}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
