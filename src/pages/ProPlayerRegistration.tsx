import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Gamepad2, Crown, Star, Trophy, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const ProPlayerRegistration = () => {
  const requirements = [
    { text: "Minimum rank: Diamond in chosen game", met: true },
    { text: "At least 1000 hours of gameplay", met: true },
    { text: "Competitive tournament experience", met: false },
    { text: "Clean disciplinary record", met: true },
    { text: "Fluent in Arabic or English", met: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border p-4">
        <div className="container mx-auto flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LevelUp</h1>
              <p className="text-xs text-muted-foreground -mt-1">Academy</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full mb-4">
              <Crown className="w-5 h-5" />
              <span className="font-medium">Pro Player Registration</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join the <span className="text-gradient">Elite</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Apply to become a certified pro player and mentor the next generation
            </p>
          </div>

          {/* Requirements Check */}
          <Card className="card-glow mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Requirements Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      req.met ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {req.met ? (
                        <CheckCircle className="w-3 h-3 text-white" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={`text-sm ${req.met ? "text-foreground" : "text-muted-foreground"}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You must meet all requirements to proceed. Please complete any missing requirements before applying.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gamerTag">Professional Gamer Tag</Label>
                  <Input id="gamerTag" placeholder="Your professional gaming handle" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+966 50 123 4567" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saudi">Saudi Arabia</SelectItem>
                        <SelectItem value="uae">UAE</SelectItem>
                        <SelectItem value="qatar">Qatar</SelectItem>
                        <SelectItem value="kuwait">Kuwait</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input id="languages" placeholder="Arabic, English, etc." />
                </div>
              </CardContent>
            </Card>

            {/* Gaming Profile */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Gaming Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryGame">Primary Game</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valorant">VALORANT</SelectItem>
                      <SelectItem value="lol">League of Legends</SelectItem>
                      <SelectItem value="csgo">CS:GO</SelectItem>
                      <SelectItem value="fifa">FIFA 24</SelectItem>
                      <SelectItem value="fortnite">Fortnite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentRank">Current Rank</Label>
                  <Input id="currentRank" placeholder="e.g., Immortal 2, Diamond 1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="peakRank">Peak Rank</Label>
                  <Input id="peakRank" placeholder="Your highest achieved rank" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-7">5-7 years</SelectItem>
                      <SelectItem value="7-10">7-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievements">Major Achievements</Label>
                  <Textarea 
                    id="achievements" 
                    placeholder="List your tournament wins, team achievements, notable ranks, etc."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamExperience">Team/Organization Experience</Label>
                  <Textarea 
                    id="teamExperience" 
                    placeholder="Previous teams, organizations, sponsorships, etc."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents Upload */}
          <Card className="card-glow mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Profile Photo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Upload professional photo</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>ID/Passport Copy</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Upload ID document</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Gaming Portfolio</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Screenshots, clips, certificates</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>References (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Letters of recommendation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <Card className="card-glow mt-8">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Ready to Submit?</h3>
                <p className="text-muted-foreground">
                  Your application will be reviewed by our team of trainers and moderators. 
                  This process typically takes 3-5 business days.
                </p>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    By submitting this application, you agree that all information provided is accurate 
                    and you meet the requirements for pro player status.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4 justify-center">
                  <Link to="/game-selection-pro">
                    <Button variant="outline">Back to Game Selection</Button>
                  </Link>
                  <Button className="gap-2">
                    <Crown className="w-4 h-4" />
                    Submit Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProPlayerRegistration;