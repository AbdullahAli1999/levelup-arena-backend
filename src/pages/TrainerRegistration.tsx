import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Upload, FileText, Eye, EyeOff, ChevronRight, Award, Users, Clock, Trophy, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function TrainerRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    experience: '',
    specializations: [] as string[],
    availability: [] as string[],
    hourlyRate: '',
    bio: '',
    agreeToTerms: false
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  const games = [
    { id: 'sf6', name: 'Street Fighter 6', icon: '🥊' },
    { id: 'tekken8', name: 'Tekken 8', icon: '👊' },
    { id: 'kof15', name: 'King of Fighters XV', icon: '👑' },
    { id: 'ggst', name: 'Guilty Gear Strive', icon: '⚡' },
    { id: 'valorant', name: 'Valorant', icon: '🎯' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️' }
  ];

  const timeSlots = [
    'Morning (6:00-12:00)', 'Afternoon (12:00-18:00)', 
    'Evening (18:00-00:00)', 'Late Night (00:00-06:00)'
  ];

  const trainerBenefits = [
    {
      icon: Award,
      title: 'Professional Recognition',
      description: 'Join Saudi Arabia\'s premier esports academy',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      title: 'Elite Student Base',
      description: 'Train dedicated players and future pros',
      color: 'text-blue-400'
    },
    {
      icon: Trophy,
      title: 'Competitive Salary',
      description: 'Earn 150-500 SAR per hour based on experience',
      color: 'text-green-400'
    }
  ];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSpecializationChange = (gameId: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(gameId)
        ? prev.specializations.filter(id => id !== gameId)
        : [...prev.specializations, gameId]
    }));
  };

  const handleAvailabilityChange = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(timeSlot)
        ? prev.availability.filter(slot => slot !== timeSlot)
        : [...prev.availability, timeSlot]
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setCvFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file for your CV",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
        setCvFile(file);
      } else {
        toast({
          title: "Invalid file",
          description: "Please upload a PDF file under 5MB",
          variant: "destructive",
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.username.trim() || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Please describe your gaming experience';
    }

    if (formData.specializations.length === 0) {
      newErrors.specializations = 'Please select at least one game specialization';
    }

    if (formData.availability.length === 0) {
      newErrors.availability = 'Please select your availability';
    }

    if (!formData.hourlyRate || isNaN(Number(formData.hourlyRate)) || Number(formData.hourlyRate) < 50) {
      newErrors.hourlyRate = 'Hourly rate must be at least 50 SAR';
    }

    if (!cvFile) {
      newErrors.cv = 'CV upload is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Import supabase client
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingUser) {
        toast({
          title: "Account Already Exists",
          description: "An account with this email already exists. Please login instead or use a different email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError) {
        // Handle specific auth errors
        if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
          throw new Error('This email is already registered. Please login instead or use a different email.');
        }
        throw authError;
      }
      
      if (!authData.user) throw new Error('Failed to create user account');

      const userId = authData.user.id;

      // 2. Upload CV file to storage
      let cvUrl = null;
      if (cvFile) {
        const fileExt = 'pdf';
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`trainer-cvs/${fileName}`, cvFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(`trainer-cvs/${fileName}`);
        
        cvUrl = urlData.publicUrl;
      }

      // 3. Create trainer record
      const { error: trainerError } = await supabase
        .from('trainers')
        .insert({
          user_id: userId,
          bio: `${formData.bio}\n\nExperience: ${formData.experience}\nSpecializations: ${formData.specializations.join(', ')}\nAvailability: ${formData.availability.join(', ')}`,
          specialization: formData.specializations.join(', '),
          hourly_rate: Number(formData.hourlyRate),
          is_approved: false,
        });

      if (trainerError) throw trainerError;

      toast({
        title: "Application Submitted Successfully!",
        description: "Your trainer application is now under admin review. Check your email for confirmation.",
      });
      
      // Sign out the newly created user so they don't auto-login
      await supabase.auth.signOut();
      
      navigate('/trainer-pending');
    } catch (error: any) {
      console.error('Trainer registration error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LevelUp Academy</span>
          </Link>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Trainer Application
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-medium">Join Our Team</span>
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Become a Trainer
                </h1>
                <p className="text-lg text-muted-foreground">
                  Share your expertise and help shape the next generation of esports champions
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="trainer@example.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+966 5X XXX XXXX"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          placeholder="Choose username"
                          className={errors.username ? 'border-red-500' : ''}
                        />
                        {errors.username && (
                          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Hourly Rate (SAR) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          min="50"
                          max="500"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                          placeholder="150"
                          className={errors.hourlyRate ? 'border-red-500' : ''}
                        />
                        {errors.hourlyRate && (
                          <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="Enter password"
                            className={errors.password ? 'border-red-500' : ''}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                          >
                            {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm password"
                            className={errors.confirmPassword ? 'border-red-500' : ''}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                          >
                            {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="experience">Gaming Experience *</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        placeholder="Describe your competitive gaming background, achievements, and training experience..."
                        rows={4}
                        className={errors.experience ? 'border-red-500' : ''}
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                      )}
                    </div>

                    <div>
                      <Label>Game Specializations *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {games.map((game) => (
                          <div key={game.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={game.id}
                              checked={formData.specializations.includes(game.id)}
                              onCheckedChange={() => handleSpecializationChange(game.id)}
                            />
                            <Label htmlFor={game.id} className="flex items-center gap-2 cursor-pointer">
                              <span className="text-lg">{game.icon}</span>
                              <span className="text-sm">{game.name}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.specializations && (
                        <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>
                      )}
                    </div>

                    <div>
                      <Label>Availability *</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {timeSlots.map((slot) => (
                          <div key={slot} className="flex items-center space-x-2">
                            <Checkbox
                              id={slot}
                              checked={formData.availability.includes(slot)}
                              onCheckedChange={() => handleAvailabilityChange(slot)}
                            />
                            <Label htmlFor={slot} className="cursor-pointer text-sm">
                              {slot}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.availability && (
                        <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio (Optional)</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself, your coaching philosophy, and what makes you unique..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* CV Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      CV Upload
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive 
                          ? 'border-primary bg-primary/5' 
                          : errors.cv 
                            ? 'border-red-500' 
                            : 'border-muted-foreground/25 hover:border-primary/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {cvFile ? (
                        <div className="space-y-3">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                          <div>
                            <p className="font-medium">{cvFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCvFile(null)}
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                          <div>
                            <p className="font-medium">Upload your CV (PDF only)</p>
                            <p className="text-sm text-muted-foreground">
                              Drag and drop or click to browse (Max 5MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="cv-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('cv-upload')?.click()}
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                    {errors.cv && (
                      <p className="text-red-500 text-sm mt-2">{errors.cv}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Terms Agreement */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                        className={errors.agreeToTerms ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        . I understand that my application will be reviewed by the admin team.
                        <span className="text-red-500"> *</span>
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    "Submitting Application..."
                  ) : (
                    "Submit Trainer Application"
                  )}
                  {!loading && <ChevronRight className="h-4 w-4 ml-2" />}
                </Button>
              </form>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Trainer Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trainerBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className={`h-5 w-5 ${benefit.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Application Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        1
                      </div>
                      <span className="text-sm">Submit application with CV</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground font-bold">
                        2
                      </div>
                      <span className="text-sm text-muted-foreground">Admin review (3-5 days)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground font-bold">
                        3
                      </div>
                      <span className="text-sm text-muted-foreground">Technical interview</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground font-bold">
                        4
                      </div>
                      <span className="text-sm text-muted-foreground">Account activation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      High rank in chosen games
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Teaching or coaching experience
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Strong communication skills
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Flexible schedule availability
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Must pass background check
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}