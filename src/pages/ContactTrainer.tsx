import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Send, 
  Clock, 
  Star, 
  MessageSquare, 
  Calendar, 
  Trophy,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const ContactTrainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trainerId = searchParams.get('trainerId');
  const childId = searchParams.get('childId');
  
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [trainer, setTrainer] = useState(null);
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    childId: childId || '',
    subject: '',
    message: '',
    messageType: 'GENERAL',
    urgency: 'NORMAL'
  });

  // Mock data
  const mockTrainer = {
    id: trainerId || '1',
    firstName: 'Sarah',
    lastName: 'Al-Mahmoud',
    avatar: '/placeholder.svg',
    specializations: ['Fortnite', 'Valorant', 'Rocket League'],
    rating: 4.9,
    totalReviews: 127,
    responseTime: '< 1 hour',
    languages: ['Arabic', 'English'],
    experience: '5+ years',
    location: 'Riyadh, Saudi Arabia',
    bio: 'Professional esports coach with extensive experience in competitive gaming. Specialized in helping young players develop their skills and achieve their gaming goals.',
    achievements: ['Top 100 Fortnite Player', 'Certified Gaming Coach', 'Youth Development Specialist'],
    onlineStatus: 'ONLINE',
    lastSeen: new Date().toISOString()
  };

  const mockChildren = [
    { id: '1', firstName: 'Ahmed', lastName: 'Al-Rashid', age: 12 },
    { id: '2', firstName: 'Fatima', lastName: 'Al-Rashid', age: 10 }
  ];

  const messageTypes = [
    { value: 'GENERAL', label: 'General Question', description: 'General inquiries or feedback' },
    { value: 'BOOKING', label: 'Session Booking', description: 'Schedule or modify sessions' },
    { value: 'PROGRESS', label: 'Child Progress', description: 'Discuss child\'s development' },
    { value: 'TECHNICAL', label: 'Technical Issue', description: 'Platform or game-related problems' },
    { value: 'FEEDBACK', label: 'Feedback', description: 'Share feedback or suggestions' }
  ];

  const urgencyLevels = [
    { value: 'LOW', label: 'Low Priority', color: 'bg-green-500/10 text-green-400' },
    { value: 'NORMAL', label: 'Normal', color: 'bg-blue-500/10 text-blue-400' },
    { value: 'HIGH', label: 'High Priority', color: 'bg-orange-500/10 text-orange-400' },
    { value: 'URGENT', label: 'Urgent', color: 'bg-red-500/10 text-red-400' }
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setTrainer(mockTrainer);
      setChildren(mockChildren);
      setLoading(false);
    }, 1000);
  }, [trainerId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message Sent Successfully",
        description: `Your message has been sent to ${trainer.firstName}. You'll receive a response within ${trainer.responseTime}.`,
      });
      navigate('/parent-dashboard');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                Contact Trainer
              </h1>
              <p className="text-muted-foreground">Send a message to your child's trainer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainer Info Sidebar */}
          <div className="lg:order-1">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={trainer.avatar} alt={trainer.firstName} />
                      <AvatarFallback>{trainer.firstName[0]}{trainer.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
                      trainer.onlineStatus === 'ONLINE' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{trainer.firstName} {trainer.lastName}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{trainer.rating}</span>
                      <span className="text-sm text-muted-foreground">({trainer.totalReviews})</span>
                    </div>
                    <Badge variant={trainer.onlineStatus === 'ONLINE' ? 'default' : 'secondary'}>
                      {trainer.onlineStatus === 'ONLINE' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Responds within {trainer.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{trainer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>{trainer.experience} experience</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Specializations</h4>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {trainer.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">{trainer.bio}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 lg:order-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send Message
                </CardTitle>
                <CardDescription>
                  Send a message to {trainer.firstName} about your child's training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="childId">Child *</Label>
                      <Select
                        value={formData.childId}
                        onValueChange={(value) => handleInputChange('childId', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select child" />
                        </SelectTrigger>
                        <SelectContent>
                          {children.map((child) => (
                            <SelectItem key={child.id} value={child.id}>
                              {child.firstName} {child.lastName} (Age {child.age})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="messageType">Message Type *</Label>
                      <Select
                        value={formData.messageType}
                        onValueChange={(value) => handleInputChange('messageType', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select message type" />
                        </SelectTrigger>
                        <SelectContent>
                          {messageTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{type.label}</span>
                                <span className="text-xs text-muted-foreground">{type.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief subject line..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Priority Level</Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) => handleInputChange('urgency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${level.color.split(' ')[0].replace('/10', '')}`} />
                                {level.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Type your message here..."
                      rows={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Please be specific about your question or concern to help the trainer provide the best response.
                    </p>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/parent-dashboard')}
                      disabled={sending}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={sending} className="min-w-32">
                      {sending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2"
                    onClick={() => navigate('/trainer-selection')}
                  >
                    <Calendar className="h-4 w-4" />
                    Book Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2"
                    onClick={() => navigate(`/child-stats/${formData.childId}`)}
                    disabled={!formData.childId}
                  >
                    <Trophy className="h-4 w-4" />
                    View Progress
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2"
                    onClick={() => navigate('/my-bookings')}
                  >
                    <Clock className="h-4 w-4" />
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTrainer;