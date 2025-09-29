import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Trophy, AlertTriangle, CheckCircle, Clock, Star, Target, FileText, Users, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function ProRequirements() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGame = location.state?.selectedGame || 'sf6';
  
  const [acceptedRequirements, setAcceptedRequirements] = useState<string[]>([]);
  const [readDocuments, setReadDocuments] = useState<string[]>([]);

  const gameInfo = {
    sf6: { name: 'Street Fighter 6', icon: '🥊' },
    tekken8: { name: 'Tekken 8', icon: '👊' },
    kof15: { name: 'King of Fighters XV', icon: '👑' },
    ggst: { name: 'Guilty Gear Strive', icon: '⚡' }
  };

  const requirements = [
    {
      id: 'skill',
      title: 'Skill Requirements',
      icon: Target,
      type: 'critical',
      items: [
        'Grand Master rank or equivalent in ranked matches',
        'Consistent tournament placements (Top 8 minimum)',
        'Advanced combo execution and frame data knowledge',
        'Character mastery with at least 2 main characters',
        'Adaptability across different matchups and metas'
      ],
      verification: 'Screenshots of rank, tournament results required'
    },
    {
      id: 'experience',
      title: 'Competitive Experience',
      icon: Trophy,
      type: 'critical',
      items: [
        'Minimum 3 years of competitive fighting game experience',
        'Participation in at least 10 major tournaments',
        'Local/regional tournament victories or top placements',
        'Understanding of tournament rules and etiquette',
        'Experience with high-pressure match situations'
      ],
      verification: 'Tournament history and achievement documentation'
    },
    {
      id: 'commitment',
      title: 'Time Commitment',
      icon: Clock,
      type: 'important',
      items: [
        'Minimum 6 hours daily practice commitment',
        'Availability for tournaments and events (weekends)',
        'Participation in team practice sessions',
        'Content creation and streaming responsibilities',
        'Community engagement and fan interaction'
      ],
      verification: 'Schedule availability confirmation'
    },
    {
      id: 'professional',
      title: 'Professional Standards',
      icon: Star,
      type: 'important',
      items: [
        'Maintain positive public image and sportsmanship',
        'Adherence to LevelUp Academy code of conduct',
        'Professional communication with sponsors and media',
        'Commitment to continuous improvement and learning',
        'Mentorship responsibilities for academy students'
      ],
      verification: 'Background check and reference verification'
    },
    {
      id: 'technical',
      title: 'Technical Requirements',
      icon: Users,
      type: 'standard',
      items: [
        'High-end gaming setup with tournament-standard equipment',
        'Stable internet connection (minimum 100mbps)',
        'Streaming capable hardware and software knowledge',
        'Social media presence and content creation skills',
        'Basic understanding of esports industry and business'
      ],
      verification: 'Equipment verification and technical assessment'
    }
  ];

  const documents = [
    {
      id: 'contract',
      title: 'Professional Player Contract',
      description: 'Terms, conditions, and expectations for pro players',
      pages: 12,
      required: true
    },
    {
      id: 'conduct',
      title: 'Code of Conduct',
      description: 'Behavioral standards and community guidelines',
      pages: 6,
      required: true
    },
    {
      id: 'compensation',
      title: 'Compensation Structure',
      description: 'Salary, bonuses, and revenue sharing details',
      pages: 8,
      required: true
    },
    {
      id: 'tournament',
      title: 'Tournament Participation Guide',
      description: 'Rules, schedules, and participation requirements',
      pages: 15,
      required: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'important': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'standard': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'important': return <Star className="h-4 w-4" />;
      case 'standard': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleRequirementAccept = (requirementId: string) => {
    setAcceptedRequirements(prev => 
      prev.includes(requirementId) 
        ? prev.filter(id => id !== requirementId)
        : [...prev, requirementId]
    );
  };

  const handleDocumentRead = (docId: string) => {
    setReadDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const criticalRequirements = requirements.filter(req => req.type === 'critical');
  const allRequiredDocuments = documents.filter(doc => doc.required);
  const criticalAccepted = criticalRequirements.every(req => acceptedRequirements.includes(req.id));
  const allDocsRead = allRequiredDocuments.every(doc => readDocuments.includes(doc.id));
  const canProceed = criticalAccepted && allDocsRead;

  const completionPercentage = Math.round(
    ((acceptedRequirements.length / requirements.length) + 
     (readDocuments.length / documents.length)) / 2 * 100
  );

  const handleContinue = () => {
    if (canProceed) {
      navigate('/pro-player-registration', { state: { selectedGame } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LevelUp Academy</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Pro Registration - Step 2 of 4
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="text-4xl">{gameInfo[selectedGame as keyof typeof gameInfo]?.icon}</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {gameInfo[selectedGame as keyof typeof gameInfo]?.name} Pro Requirements
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Review and accept all requirements to proceed with your professional application
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Application Progress</span>
                <span className="text-sm text-muted-foreground">{completionPercentage}% Complete</span>
              </div>
              <Progress value={completionPercentage} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Requirements: {acceptedRequirements.length}/{requirements.length}</span>
                <span>Documents: {readDocuments.length}/{documents.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Requirements Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Professional Requirements
            </h2>

            {requirements.map((requirement) => {
              const Icon = requirement.icon;
              const isAccepted = acceptedRequirements.includes(requirement.id);
              
              return (
                <Card key={requirement.id} className={`transition-all duration-300 ${
                  isAccepted ? 'ring-1 ring-green-500/50 bg-green-500/5' : ''
                }`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{requirement.title}</h3>
                          <Badge variant="outline" className={getTypeColor(requirement.type)}>
                            {getTypeIcon(requirement.type)}
                            <span className="ml-1 capitalize">{requirement.type}</span>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={requirement.id}
                          checked={isAccepted}
                          onCheckedChange={() => handleRequirementAccept(requirement.id)}
                        />
                        <label htmlFor={requirement.id} className="text-sm font-medium cursor-pointer">
                          I understand and accept
                        </label>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {requirement.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <span className="text-xs font-medium text-muted-foreground">Verification: </span>
                      <span className="text-xs">{requirement.verification}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Documents Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Required Documentation
            </h2>

            <div className="grid gap-4">
              {documents.map((doc) => {
                const isRead = readDocuments.includes(doc.id);
                
                return (
                  <Card key={doc.id} className={`transition-all duration-300 ${
                    isRead ? 'ring-1 ring-green-500/50 bg-green-500/5' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold">{doc.title}</h4>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
                              {doc.required && (
                                <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View Document
                          </Button>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={doc.id}
                              checked={isRead}
                              onCheckedChange={() => handleDocumentRead(doc.id)}
                            />
                            <label htmlFor={doc.id} className="text-sm font-medium cursor-pointer">
                              Read & Understood
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Warning for Critical Requirements */}
          {!criticalAccepted && (
            <Card className="mb-8 bg-red-500/10 border-red-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <div>
                    <h4 className="font-bold text-red-400">Critical Requirements Missing</h4>
                    <p className="text-sm text-muted-foreground">
                      You must accept all critical requirements to proceed with your professional application.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Game Selection
            </Button>
            <Button 
              size="lg" 
              disabled={!canProceed}
              onClick={handleContinue}
              className="px-8"
            >
              Continue to Registration
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}