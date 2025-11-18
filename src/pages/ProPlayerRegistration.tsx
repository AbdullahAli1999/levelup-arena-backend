import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Crown, Upload, AlertTriangle, CheckCircle, ChevronLeft, FileText } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProPlayerRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGame = location.state?.selectedGame;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gamerTag: "",
    bio: "",
    specialization: "",
    hourlyRate: "",
    achievements: "",
    teamExperience: "",
  });

  const [requirementsPdf, setRequirementsPdf] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  if (!selectedGame) {
    navigate('/pro-game-selection');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'requirements' | 'cv') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      if (type === 'requirements') {
        setRequirementsPdf(file);
      } else {
        setCvFile(file);
      }
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password) {
      toast.error('Please fill in all account information fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!requirementsPdf) {
      toast.error('Please upload your requirements proof document');
      return;
    }

    if (!formData.gamerTag || !formData.bio) {
      toast.error('Please fill in all gaming profile fields');
      return;
    }

    setLoading(true);

    try {
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

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      const userId = authData.user.id;

      // 2. Upload files
      const requirementsUrl = await uploadFile(requirementsPdf, 'pro-requirements');
      const cvUrl = cvFile ? await uploadFile(cvFile, 'pro-cvs') : null;

      if (!requirementsUrl) {
        throw new Error('Failed to upload requirements document');
      }

      // 3. Create pro player record
      const { error } = await supabase
        .from('pros')
        .insert({
          user_id: userId,
          gaming_username: formData.gamerTag,
          bio: formData.bio,
          specialization: formData.specialization || selectedGame.category,
          selected_game: selectedGame.name,
          hourly_rate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
          requirements_pdf_url: requirementsUrl,
          cv_url: cvUrl,
          is_approved: false,
        });

      if (error) throw error;

      // 4. Send application received confirmation email
      try {
        await supabase.functions.invoke('notify-pro-application-status', {
          body: {
            email: formData.email,
            userName: `${formData.firstName} ${formData.lastName}`,
            gamerTag: formData.gamerTag,
            selectedGame: selectedGame.name,
            status: 'received'
          }
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }

      toast.success('Application submitted successfully! Check your email for confirmation.');
      
      // Sign out the newly created user
      await supabase.auth.signOut();
      
      navigate('/pro-pending');
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LevelUp</h1>
                <p className="text-xs text-muted-foreground -mt-1">Academy</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Progress value={100} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">Step 3 of 3</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{selectedGame.image}</div>
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full mb-4">
              <Crown className="w-5 h-5" />
              <span className="font-medium">Pro Player Application</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {selectedGame.name} <span className="text-gradient">Application</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete your profile and upload proof of qualifications
            </p>
          </div>

          {/* Application Info */}
          <Card className="card-glow mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected Game</p>
                  <p className="font-bold text-foreground">{selectedGame.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="font-bold text-foreground">{selectedGame.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Potential Earnings</p>
                  <p className="font-bold text-foreground">
                    {selectedGame.earnings.min.toLocaleString()} - {selectedGame.earnings.max.toLocaleString()} SAR/mo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8">
            {/* Account Information */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a unique username"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gaming Profile */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Gaming Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="gamerTag">
                    Professional Gamer Tag <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="gamerTag"
                    name="gamerTag"
                    value={formData.gamerTag}
                    onChange={handleInputChange}
                    placeholder="Your professional gaming handle"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">
                    Professional Bio <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about your gaming career, achievements, and what makes you stand out..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Entry Fragger, Support, IGL, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (SAR) - Optional</Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    placeholder="Your coaching/session rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievements">Major Achievements</Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="List your tournament wins, team achievements, notable ranks, awards..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamExperience">Team/Organization Experience</Label>
                  <Textarea
                    id="teamExperience"
                    name="teamExperience"
                    value={formData.teamExperience}
                    onChange={handleInputChange}
                    placeholder="Previous teams, organizations, sponsorships..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documents Upload */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    Upload a PDF document proving you meet the requirements (screenshots of rank, tournament results, achievements, etc.)
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Label htmlFor="requirements">
                    Requirements Proof Document <span className="text-destructive">*</span>
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="requirements"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'requirements')}
                      className="hidden"
                    />
                    <label htmlFor="requirements" className="cursor-pointer">
                      {requirementsPdf ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-medium">{requirementsPdf.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload PDF (max 10MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="cv">CV/Resume (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="cv"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'cv')}
                      className="hidden"
                    />
                    <label htmlFor="cv" className="cursor-pointer">
                      {cvFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-medium">{cvFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload PDF (max 10MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Section */}
          <Card className="card-glow mt-8">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Ready to Submit?</h3>
                <p className="text-muted-foreground">
                  Your application will be reviewed by our moderation team. 
                  This process typically takes 3-5 business days.
                </p>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    By submitting this application, you confirm that all information provided is accurate 
                    and you meet the requirements for pro player status. False information may result in permanent ban.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/pro-requirements', { state: { selectedGame } })}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Requirements
                  </Button>
                  <Button type="submit" disabled={loading} className="gap-2">
                    <Crown className="w-4 h-4" />
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ProPlayerRegistration;
