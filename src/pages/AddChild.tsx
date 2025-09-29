import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, User, Calendar, MapPin, Trophy, Shield, Heart } from 'lucide-react';

const AddChild = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    preferredGames: [],
    skillLevel: '',
    medicalConditions: '',
    allergies: '',
    emergencyContact: '',
    emergencyPhone: '',
    allowPhotos: true,
    allowVideos: true,
    allowSocialMedia: false,
    specialInstructions: ''
  });

  const games = [
    { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
    { id: 'minecraft', name: 'Minecraft', icon: '⛏️' },
    { id: 'roblox', name: 'Roblox', icon: '🎮' },
    { id: 'fifa', name: 'FIFA 24', icon: '⚽' },
    { id: 'valorant', name: 'Valorant', icon: '🎯' },
    { id: 'overwatch', name: 'Overwatch 2', icon: '🦾' }
  ];

  const skillLevels = [
    { value: 'BEGINNER', label: 'Beginner', description: 'Just starting out' },
    { value: 'INTERMEDIATE', label: 'Intermediate', description: 'Some experience' },
    { value: 'ADVANCED', label: 'Advanced', description: 'Experienced player' },
    { value: 'EXPERT', label: 'Expert', description: 'Highly skilled' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGameToggle = (gameId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredGames: prev.preferredGames.includes(gameId)
        ? prev.preferredGames.filter(id => id !== gameId)
        : [...prev.preferredGames, gameId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Child Profile Created",
        description: `${formData.firstName}'s profile has been successfully created!`,
      });
      navigate('/parent-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
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
                Add Child Profile
              </h1>
              <p className="text-muted-foreground">Create a gaming profile for your child</p>
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
                <User className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Tell us about your child's basic details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                      <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gaming Preferences */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Gaming Preferences
              </CardTitle>
              <CardDescription>
                Select games your child is interested in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Preferred Games (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {games.map((game) => (
                    <div
                      key={game.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                        formData.preferredGames.includes(game.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 bg-card/30'
                      }`}
                      onClick={() => handleGameToggle(game.id)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{game.icon}</div>
                        <div className="font-medium text-sm">{game.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Overall Skill Level</Label>
                <Select value={formData.skillLevel} onValueChange={(value) => handleInputChange('skillLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{level.label}</span>
                          <span className="text-xs text-muted-foreground">{level.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Health & Safety */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Health & Safety Information
              </CardTitle>
              <CardDescription>
                Important medical and emergency contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    placeholder="Any medical conditions we should know about..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    placeholder="Any allergies or dietary restrictions..."
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Enter emergency contact name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="e.g., +966501234567"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Permissions
              </CardTitle>
              <CardDescription>
                Control how your child's information is used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Photos</Label>
                    <p className="text-sm text-muted-foreground">
                      Permission to take photos during sessions
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowPhotos}
                    onCheckedChange={(checked) => handleInputChange('allowPhotos', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Videos</Label>
                    <p className="text-sm text-muted-foreground">
                      Permission to record videos during sessions
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowVideos}
                    onCheckedChange={(checked) => handleInputChange('allowVideos', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Social Media Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow sharing achievements on social media
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowSocialMedia}
                    onCheckedChange={(checked) => handleInputChange('allowSocialMedia', checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any special instructions for trainers..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/parent-dashboard')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-32">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                'Create Profile'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChild;