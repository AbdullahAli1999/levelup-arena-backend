import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Eye, EyeOff, ChevronRight, Baby, Shield, MessageSquare, Trophy, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function ParentRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeToTerms: false,
    allowDataSharing: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const parentFeatures = [
    {
      icon: Baby,
      title: 'Child Account Management',
      description: 'Link and monitor your children\'s gaming progress',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: 'Safety & Supervision',
      description: 'Review trainers and approve all training sessions',
      color: 'text-green-400'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Chat securely with trainers about your child\'s development',
      color: 'text-purple-400'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'View detailed statistics and achievements',
      color: 'text-yellow-400'
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

    if (!formData.phoneNumber.trim() || !/^(\+966|0)?[5][0-9]{8}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid Saudi phone number';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as +966 5X XXX XXXX
    if (cleaned.startsWith('966')) {
      const formatted = cleaned.slice(3);
      if (formatted.length >= 9) {
        return `+966 ${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5, 9)}`;
      } else if (formatted.length >= 5) {
        return `+966 ${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5)}`;
      } else if (formatted.length >= 2) {
        return `+966 ${formatted.slice(0, 2)} ${formatted.slice(2)}`;
      } else {
        return `+966 ${formatted}`;
      }
    } else if (cleaned.startsWith('5')) {
      if (cleaned.length >= 9) {
        return `+966 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`;
      } else if (cleaned.length >= 5) {
        return `+966 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
      } else if (cleaned.length >= 2) {
        return `+966 ${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
      } else {
        return `+966 ${cleaned}`;
      }
    }
    
    return value;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phoneNumber', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to LevelUp Academy. You can now add your children.",
      });
      
      // Navigate to parent dashboard with add child prompt
      navigate('/parent-dashboard?firstTime=true');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
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
            Parent Registration
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-primary/20 text-pink-400 px-4 py-2 rounded-full mb-4">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Supporting Your Child&apos;s Journey</span>
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-primary to-pink-400 bg-clip-text text-transparent">
                  Parent Registration
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join LevelUp Academy to support your child&apos;s esports journey with professional supervision and guidance
                </p>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Create Your Parent Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Personal Information
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Enter your first name"
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
                            placeholder="Enter your last name"
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
                            placeholder="parent@example.com"
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber">Phone Number (Saudi Arabia) *</Label>
                          <Input
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="+966 5X XXX XXXX"
                            className={errors.phoneNumber ? 'border-red-500' : ''}
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Account Credentials */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Account Security
                      </h3>

                      <div>
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          placeholder="Choose a unique username"
                          className={errors.username ? 'border-red-500' : ''}
                        />
                        {errors.username && (
                          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
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
                              placeholder="Enter secure password"
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
                              placeholder="Confirm your password"
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
                    </div>

                    {/* Privacy Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Privacy & Consent</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="allowDataSharing"
                            checked={formData.allowDataSharing}
                            onCheckedChange={(checked) => handleInputChange('allowDataSharing', checked)}
                          />
                          <Label htmlFor="allowDataSharing" className="text-sm leading-relaxed">
                            Allow sharing of child&apos;s progress data with trainers for personalized coaching
                            <span className="text-muted-foreground block text-xs mt-1">
                              This helps trainers provide better guidance and track improvements
                            </span>
                          </Label>
                        </div>

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
                            . I understand that I am responsible for supervising my child&apos;s activities.
                            <span className="text-red-500"> *</span>
                          </Label>
                        </div>
                      </div>

                      {errors.agreeToTerms && (
                        <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        "Creating Account..."
                      ) : (
                        "Create Parent Account"
                      )}
                      {!loading && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Parent Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Parent Dashboard Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {parentFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className={`h-5 w-5 ${feature.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Safety Information */}
              <Card className="bg-green-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Shield className="h-5 w-5" />
                    Safety First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                      All trainers are background-checked
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                      Secure messaging system
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                      Parent approval for all sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                      24/7 monitoring and support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>After Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        1
                      </div>
                      <span className="text-sm">Add your children to your account</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs text-primary font-bold">
                        2
                      </div>
                      <span className="text-sm">Browse and book training sessions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs text-primary font-bold">
                        3
                      </div>
                      <span className="text-sm">Monitor progress and communicate with trainers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our parent support team is here to help
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}