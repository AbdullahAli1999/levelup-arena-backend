import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, UserPlus, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PlayerRegistration = () => {
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Player Registration</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join the <span className="text-gradient">Academy</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Start your journey to becoming a pro esports player
            </p>
          </div>

          {/* Registration Form */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Player Information
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
                <Label htmlFor="username">Gaming Username</Label>
                <Input id="username" placeholder="Choose your gaming handle" />
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
                  <Input id="age" type="number" placeholder="18" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">Riyadh</SelectItem>
                      <SelectItem value="jeddah">Jeddah</SelectItem>
                      <SelectItem value="dammam">Dammam</SelectItem>
                      <SelectItem value="mecca">Mecca</SelectItem>
                      <SelectItem value="medina">Medina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Gaming Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  . I understand that this is a safe learning environment monitored by certified trainers.
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full" size="lg">
                <span>Continue to Game Selection</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;