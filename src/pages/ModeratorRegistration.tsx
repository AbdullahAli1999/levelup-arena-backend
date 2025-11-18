import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Shield, UserCheck, Eye, EyeOff, Copy, Check, Mail, Trophy, Users, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function ModeratorRegistration() {
  const [searchParams] = useSearchParams();
  const isAdminCreated = searchParams.get('admin') === 'true';
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
    notes: '',
    agreeToTerms: false,
    sendWelcomeEmail: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedCredentials, setGeneratedCredentials] = useState<{username: string, password: string} | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const moderatorResponsibilities = [
    {
      icon: Users,
      title: 'Pro Player Management',
      description: 'Review and approve professional player applications',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: 'Contract Oversight',
      description: 'Moderate and approve player-trainer contracts',
      color: 'text-green-400'
    },
    {
      icon: MessageSquare,
      title: 'Review Moderation',
      description: 'Monitor and moderate user reviews and feedback',
      color: 'text-purple-400'
    },
    {
      icon: Trophy,
      title: 'Tournament Management',
      description: 'Oversee competitive events and tournaments',
      color: 'text-yellow-400'
    }
  ];

  const generateCredentials = () => {
    const username = `mod_${formData.firstName.toLowerCase()}_${Math.random().toString(36).substr(2, 4)}`;
    const password = `LevelUp${Math.random().toString(36).substr(2, 8)}@${Math.floor(Math.random() * 100)}`;
    
    setGeneratedCredentials({ username, password });
    setFormData(prev => ({ ...prev, username, password, confirmPassword: password }));
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim() || formData.firstName.length < 2 || formData.firstName.length > 40) {
      newErrors.firstName = 'First name must be 2-40 characters';
    }

    if (!formData.lastName.trim() || formData.lastName.length < 2 || formData.lastName.length > 40) {
      newErrors.lastName = 'Last name must be 2-40 characters';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.username.trim() || formData.username.length < 3 || formData.username.length > 30) {
      newErrors.username = 'Username must be 3-30 characters';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isAdminCreated && !formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and privacy policy';
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

      // 2. Add MODERATOR role (pending approval)
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'MODERATOR',
        });

      if (roleError) throw roleError;

      // 3. Update profile with phone and notes in bio
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          avatar_url: formData.phone ? `tel:${formData.phone}` : null, // Store phone temporarily
        })
        .eq('id', userId);

      if (profileError) console.error('Profile update error:', profileError);

      if (isAdminCreated) {
        toast({
          title: "Moderator Created Successfully",
          description: "The new moderator account has been created.",
        });
      } else {
        toast({
          title: "Application Submitted",
          description: "Your moderator application is under admin review. Check your email for confirmation.",
        });
        
        // Sign out the newly created user
        await supabase.auth.signOut();
        
        navigate('/moderator-pending');
      }
    } catch (error: any) {
      console.error('Moderator registration error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process request. Please try again.",
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
          {isAdminCreated && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Admin Panel
            </Badge>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">
                    {isAdminCreated ? 'Create Moderator' : 'Become a Moderator'}
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {isAdminCreated ? 'Create New Moderator' : 'انضم كمشرف'}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {isAdminCreated 
                    ? 'Generate credentials for a new moderator account'
                    : 'ساهم في بيئة آمنة وتنافسية في LevelUp'
                  }
                </p>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    {isAdminCreated ? 'Account Details' : 'Application Form'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
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
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
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

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="moderator@example.com"
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

                    {/* Account Credentials */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Account Credentials</h3>
                        {isAdminCreated && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={generateCredentials}
                          >
                            Generate Credentials
                          </Button>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="username">
                          Username <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            placeholder="Enter username"
                            className={errors.username ? 'border-red-500' : ''}
                            readOnly={isAdminCreated && !!generatedCredentials}
                          />
                          {generatedCredentials && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(formData.username, 'Username')}
                              className="px-3"
                            >
                              {copiedField === 'Username' ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                        {errors.username && (
                          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password">
                            Password <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              placeholder="Enter password"
                              className={errors.password ? 'border-red-500' : ''}
                              readOnly={isAdminCreated && !!generatedCredentials}
                            />
                            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                              {generatedCredentials && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(formData.password, 'Password')}
                                  className="h-7 w-7 p-0"
                                >
                                  {copiedField === 'Password' ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="h-7 w-7 p-0"
                              >
                                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">
                            Confirm Password <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              placeholder="Confirm password"
                              className={errors.confirmPassword ? 'border-red-500' : ''}
                              readOnly={isAdminCreated && !!generatedCredentials}
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
                    </div>

                    {/* Additional Information */}
                    {!isAdminCreated && (
                      <div>
                        <Label htmlFor="notes">Why do you want to be a moderator? (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Tell us about your experience and motivation..."
                          rows={4}
                        />
                      </div>
                    )}

                    {/* Email Settings for Admin */}
                    {isAdminCreated && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendWelcomeEmail"
                          checked={formData.sendWelcomeEmail}
                          onCheckedChange={(checked) => handleInputChange('sendWelcomeEmail', checked)}
                        />
                        <Label htmlFor="sendWelcomeEmail" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Send welcome email with credentials
                        </Label>
                      </div>
                    )}

                    {/* Terms Agreement */}
                    {!isAdminCreated && (
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
                          <span className="text-red-500"> *</span>
                        </Label>
                      </div>
                    )}

                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        "Processing..."
                      ) : isAdminCreated ? (
                        "Create Moderator Account"
                      ) : (
                        "إرسال الطلب"
                      )}
                      {!loading && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Responsibilities */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Moderator Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {moderatorResponsibilities.map((responsibility, index) => {
                    const Icon = responsibility.icon;
                    return (
                      <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${responsibility.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{responsibility.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {responsibility.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Join Our Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Help shape the future of esports in Saudi Arabia
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}