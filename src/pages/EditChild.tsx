import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, User, Gamepad2, Calendar, Clock, Loader2, Save } from 'lucide-react';

interface ChildData {
  id: number;
  name: string;
  age: number;
  gaming_username: string;
  created_at: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  gamingUsername: string;
  preferredGames: string[];
  skillLevel: string;
  weekdayAvailability: string;
  weekendAvailability: string;
  maxHoursPerDay: string;
}

interface FormErrors {
  [key: string]: string;
}

const GAMES = [
  { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
  { id: 'minecraft', name: 'Minecraft', icon: '⛏️' },
  { id: 'roblox', name: 'Roblox', icon: '🎮' },
  { id: 'valorant', name: 'Valorant', icon: '🎯' },
  { id: 'fifa', name: 'FIFA 24', icon: '⚽' },
  { id: 'overwatch', name: 'Overwatch 2', icon: '🦾' },
  { id: 'rocket-league', name: 'Rocket League', icon: '🚗' },
  { id: 'apex', name: 'Apex Legends', icon: '🎪' }
];

const SKILL_LEVELS = [
  { value: 'BEGINNER', label: 'Beginner', description: 'Just starting out' },
  { value: 'INTERMEDIATE', label: 'Intermediate', description: 'Some experience' },
  { value: 'ADVANCED', label: 'Advanced', description: 'Experienced player' },
  { value: 'EXPERT', label: 'Expert', description: 'Highly skilled' }
];

export default function EditChild() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [childData, setChildData] = useState<ChildData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    gamingUsername: '',
    preferredGames: [],
    skillLevel: 'BEGINNER',
    weekdayAvailability: '16:00-20:00',
    weekendAvailability: '10:00-22:00',
    maxHoursPerDay: '2'
  });

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

      // Get parent ID
      const { data: parentData, error: parentError } = await supabase
        .from('parents')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (parentError || !parentData) {
        toast({
          title: "Error",
          description: "Parent profile not found",
          variant: "destructive"
        });
        navigate('/parent-dashboard');
        return;
      }

      // Get child data
      const { data: childDataResult, error: childError } = await supabase
        .from('children')
        .select('*')
        .eq('id', parseInt(id!))
        .eq('parent_id', parentData.id)
        .single();

      if (childError || !childDataResult) {
        toast({
          title: "Error",
          description: "Child profile not found",
          variant: "destructive"
        });
        navigate('/parent-dashboard');
        return;
      }

      setChildData(childDataResult as ChildData);
      
      // Parse name into first and last
      const nameParts = childDataResult.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setFormData({
        firstName,
        lastName,
        age: childDataResult.age.toString(),
        gamingUsername: childDataResult.gaming_username || '',
        preferredGames: [],
        skillLevel: 'BEGINNER',
        weekdayAvailability: '16:00-20:00',
        weekendAvailability: '10:00-22:00',
        maxHoursPerDay: '2'
      });

    } catch (error: any) {
      console.error('Error fetching child:', error);
      toast({
        title: "Error",
        description: "Failed to load child profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age)) {
      newErrors.age = 'Age is required';
    } else if (age < 6 || age > 18) {
      newErrors.age = 'Age must be between 6 and 18';
    }

    if (!formData.gamingUsername.trim()) {
      newErrors.gamingUsername = 'Gaming username is required';
    } else if (formData.gamingUsername.length < 3) {
      newErrors.gamingUsername = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.gamingUsername)) {
      newErrors.gamingUsername = 'Username can only contain letters, numbers, and underscores';
    }

    if (formData.preferredGames.length === 0) {
      newErrors.preferredGames = 'Select at least one game';
    }

    const maxHours = parseInt(formData.maxHoursPerDay);
    if (isNaN(maxHours) || maxHours < 1 || maxHours > 8) {
      newErrors.maxHoursPerDay = 'Must be between 1 and 8 hours';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGameToggle = (gameId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredGames: prev.preferredGames.includes(gameId)
        ? prev.preferredGames.filter(id => id !== gameId)
        : [...prev.preferredGames, gameId]
    }));
    if (errors.preferredGames) {
      setErrors(prev => ({ ...prev, preferredGames: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      
      const { error } = await supabase
        .from('children')
        .update({
          name: fullName,
          age: parseInt(formData.age),
          gaming_username: formData.gamingUsername.trim()
        })
        .eq('id', parseInt(id!));

      if (error) throw error;

      // Update child stats with skill level
      await supabase
        .from('child_stats')
        .update({
          current_rank: formData.skillLevel
        })
        .eq('child_id', parseInt(id!));

      toast({
        title: "Profile Updated!",
        description: `${formData.firstName}'s profile has been successfully updated`,
      });

      navigate('/parent-dashboard');
    } catch (error: any) {
      console.error('Error updating child:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/parent-dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Edit Child Profile
              </h1>
              <p className="text-muted-foreground">Update {childData.name}'s gaming information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Update your child's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="6"
                    max="18"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age"
                    className={errors.age ? 'border-destructive' : ''}
                  />
                  {errors.age && (
                    <p className="text-sm text-destructive mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gamingUsername">Gaming Username *</Label>
                  <Input
                    id="gamingUsername"
                    value={formData.gamingUsername}
                    onChange={(e) => handleInputChange('gamingUsername', e.target.value)}
                    placeholder="e.g., ProGamer123"
                    className={errors.gamingUsername ? 'border-destructive' : ''}
                  />
                  {errors.gamingUsername && (
                    <p className="text-sm text-destructive mt-1">{errors.gamingUsername}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gaming Preferences */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Gaming Preferences
              </CardTitle>
              <CardDescription>Select games and skill level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block">Preferred Games *</Label>
                {errors.preferredGames && (
                  <p className="text-sm text-destructive mb-2">{errors.preferredGames}</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {GAMES.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleGameToggle(game.id)}
                      className={`
                        p-4 border rounded-lg cursor-pointer transition-all
                        ${formData.preferredGames.includes(game.id)
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{game.icon}</div>
                      <p className="font-medium text-sm">{game.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="skillLevel">Skill Level *</Label>
                <Select
                  value={formData.skillLevel}
                  onValueChange={(value) => handleInputChange('skillLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{level.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {level.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Gaming Schedule */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Gaming Schedule
              </CardTitle>
              <CardDescription>Set availability and time limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weekdayAvailability">Weekday Availability</Label>
                  <Select
                    value={formData.weekdayAvailability}
                    onValueChange={(value) => handleInputChange('weekdayAvailability', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14:00-18:00">2:00 PM - 6:00 PM</SelectItem>
                      <SelectItem value="16:00-20:00">4:00 PM - 8:00 PM</SelectItem>
                      <SelectItem value="17:00-21:00">5:00 PM - 9:00 PM</SelectItem>
                      <SelectItem value="18:00-22:00">6:00 PM - 10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="weekendAvailability">Weekend Availability</Label>
                  <Select
                    value={formData.weekendAvailability}
                    onValueChange={(value) => handleInputChange('weekendAvailability', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00-12:00">8:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="10:00-22:00">10:00 AM - 10:00 PM</SelectItem>
                      <SelectItem value="12:00-20:00">12:00 PM - 8:00 PM</SelectItem>
                      <SelectItem value="14:00-22:00">2:00 PM - 10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="maxHoursPerDay">Maximum Hours Per Day *</Label>
                <Input
                  id="maxHoursPerDay"
                  type="number"
                  min="1"
                  max="8"
                  value={formData.maxHoursPerDay}
                  onChange={(e) => handleInputChange('maxHoursPerDay', e.target.value)}
                  className={errors.maxHoursPerDay ? 'border-destructive' : ''}
                />
                {errors.maxHoursPerDay && (
                  <p className="text-sm text-destructive mt-1">{errors.maxHoursPerDay}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  Recommended: 2-3 hours for healthy gaming habits
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/parent-dashboard')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
