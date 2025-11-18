import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Trophy, AlertTriangle, CheckCircle, Clock, Star, Target, FileText, Users, Gamepad2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ProRequirements() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedGame = location.state?.selectedGame;
  
  const [acceptedRequirements, setAcceptedRequirements] = useState<string[]>([]);
  const [readDocuments, setReadDocuments] = useState<string[]>([]);

  if (!selectedGame) {
    navigate('/pro-game-selection');
    return null;
  }

  const requirements = [
    {
      id: 'skill',
      title: 'Skill Requirements',
      icon: Target,
      type: 'critical',
      items: selectedGame.requirements,
      verification: 'Screenshots of rank, tournament results required'
    },
    {
      id: 'experience',
      title: 'Competitive Experience',
      icon: Trophy,
      type: 'critical',
      items: [
        'Minimum 3 years of competitive experience',
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
      pages: 8,
      required: true
    },
    {
      id: 'privacy',
      title: 'Privacy & Data Policy',
      description: 'How we handle your personal and performance data',
      pages: 6,
      required: true
    },
    {
      id: 'compensation',
      title: 'Compensation Structure',
      description: 'Payment schedules, bonuses, and prize pool distribution',
      pages: 5,
      required: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-destructive';
      case 'important':
        return 'text-secondary';
      default:
        return 'text-accent';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return '🔴';
      case 'important':
        return '🟡';
      default:
        return '🟢';
    }
  };

  const handleRequirementAccept = (id: string) => {
    setAcceptedRequirements(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleDocumentRead = (id: string) => {
    setReadDocuments(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const criticalRequirements = requirements.filter(r => r.type === 'critical');
  const allRequiredDocuments = documents.filter(d => d.required);
  
  const criticalAccepted = criticalRequirements.every(r => acceptedRequirements.includes(r.id));
  const allDocsRead = allRequiredDocuments.every(d => readDocuments.includes(d.id));
  const canProceed = criticalAccepted && allDocsRead;

  const totalItems = requirements.length + allRequiredDocuments.length;
  const completedItems = acceptedRequirements.length + readDocuments.length;
  const completionPercentage = (completedItems / totalItems) * 100;

  const handleContinue = () => {
    if (canProceed) {
      navigate('/pro-player-registration', { state: { selectedGame } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
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
              <Progress value={66} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">Step 2 of 3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Game Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{selectedGame.image}</div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {selectedGame.name} <span className="text-gradient">Requirements</span>
            </h1>
            <p className="text-muted-foreground">
              Review and accept all requirements before proceeding with your application
            </p>
          </div>

          {/* Progress Card */}
          <Card className="card-glow mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Application Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete all critical items to proceed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{Math.round(completionPercentage)}%</p>
                  <p className="text-xs text-muted-foreground">
                    {completedItems} of {totalItems} items
                  </p>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* Requirements Sections */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Requirements Checklist</h2>
            {requirements.map((requirement) => {
              const Icon = requirement.icon;
              const isAccepted = acceptedRequirements.includes(requirement.id);
              
              return (
                <Card key={requirement.id} className={`card-glow ${isAccepted ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-card flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {requirement.title}
                            <span className="text-lg">{getTypeIcon(requirement.type)}</span>
                          </CardTitle>
                          <p className={`text-sm ${getTypeColor(requirement.type)}`}>
                            {requirement.type.charAt(0).toUpperCase() + requirement.type.slice(1)} Requirement
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {requirement.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        <strong>Verification:</strong> {requirement.verification}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Checkbox
                        id={requirement.id}
                        checked={isAccepted}
                        onCheckedChange={() => handleRequirementAccept(requirement.id)}
                      />
                      <label
                        htmlFor={requirement.id}
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        I understand and accept these requirements
                      </label>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Documents Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Required Documents</h2>
            <div className="grid gap-4">
              {documents.map((doc) => {
                const isRead = readDocuments.includes(doc.id);
                
                return (
                  <Card key={doc.id} className={`card-glow ${isRead ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-foreground">{doc.title}</h3>
                              {doc.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                            <p className="text-xs text-muted-foreground">{doc.pages} pages</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View PDF
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={doc.id}
                          checked={isRead}
                          onCheckedChange={() => handleDocumentRead(doc.id)}
                        />
                        <label
                          htmlFor={doc.id}
                          className="text-sm font-medium text-foreground cursor-pointer"
                        >
                          I have read and understood this document
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Warning if not complete */}
          {!canProceed && (
            <Alert className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You must accept all critical requirements and read all required documents before proceeding.
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/pro-game-selection')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Game Selection
            </Button>
            <Button
              disabled={!canProceed}
              onClick={handleContinue}
            >
              Continue to Application
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
