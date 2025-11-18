import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Users, TrendingUp, ChevronRight, Crown, Target, Zap, Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProGameSelection() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const navigate = useNavigate();

  const proGames = [
    {
      id: 'valorant',
      name: 'VALORANT',
      category: 'FPS/Tactical',
      difficulty: 'Expert',
      prizePool: '2M+ SAR',
      activePros: 320,
      demand: 'Very High',
      demandLevel: 98,
      image: '🎯',
      requirements: [
        'Immortal 3 rank minimum',
        'VCT tournament experience',
        'Agent pool mastery (5+ agents)',
        'Team-based competitive experience'
      ],
      opportunities: [
        'VCT Middle East tournaments',
        'Regional league spots',
        'International championship qualifiers',
        'Content creator partnerships'
      ],
      earnings: {
        min: 20000,
        max: 80000,
        currency: 'SAR/month'
      },
      description: 'Join the fastest-growing tactical shooter esports scene in the Middle East'
    },
    {
      id: 'cs2',
      name: 'Counter-Strike 2',
      category: 'FPS/Tactical',
      difficulty: 'Expert',
      prizePool: '1.5M+ SAR',
      activePros: 250,
      demand: 'Very High',
      demandLevel: 95,
      image: '🔫',
      requirements: [
        'Faceit Level 10 or ESEA Rank S',
        'Major tournament experience',
        'Map pool knowledge (all competitive maps)',
        '5000+ hours competitive play'
      ],
      opportunities: [
        'ESL Pro League qualifiers',
        'BLAST Premier tournaments',
        'Regional championships',
        'Team contracts with top orgs'
      ],
      earnings: {
        min: 18000,
        max: 70000,
        currency: 'SAR/month'
      },
      description: 'Compete in the world\'s most prestigious tactical FPS with decades of legacy'
    },
    {
      id: 'fortnite',
      name: 'Fortnite',
      category: 'Battle Royale',
      difficulty: 'Expert',
      prizePool: '3M+ SAR',
      activePros: 280,
      demand: 'Very High',
      demandLevel: 92,
      image: '🏆',
      requirements: [
        'Champion League Division',
        'FNCS qualification history',
        'Creative 2.0 proficiency',
        'Consistent tournament placements'
      ],
      opportunities: [
        'FNCS Championships',
        'Cash Cup tournaments',
        'Creator Cup events',
        'Streaming and content deals'
      ],
      earnings: {
        min: 22000,
        max: 100000,
        currency: 'SAR/month'
      },
      description: 'Dominate the world\'s largest battle royale esports ecosystem'
    },
    {
      id: 'lol',
      name: 'League of Legends',
      category: 'MOBA',
      difficulty: 'Expert',
      prizePool: '1.8M+ SAR',
      activePros: 200,
      demand: 'High',
      demandLevel: 88,
      image: '⚔️',
      requirements: [
        'Master tier minimum (top 0.1%)',
        'Multi-role proficiency',
        'Competitive team experience',
        'Meta knowledge and adaptation'
      ],
      opportunities: [
        'LEC/LCS regional leagues',
        'World Championship qualifiers',
        'Academy team positions',
        'Coaching and analyst roles'
      ],
      earnings: {
        min: 15000,
        max: 60000,
        currency: 'SAR/month'
      },
      description: 'Join the world\'s most popular MOBA with the biggest prize pools'
    },
    {
      id: 'dota2',
      name: 'Dota 2',
      category: 'MOBA',
      difficulty: 'Expert',
      prizePool: '2.5M+ SAR',
      activePros: 120,
      demand: 'High',
      demandLevel: 85,
      image: '🐉',
      requirements: [
        'Immortal rank (top 1000)',
        'The International qualifier experience',
        'Hero pool mastery (20+ heroes)',
        'Professional team experience'
      ],
      opportunities: [
        'The International tournaments',
        'DPC regional leagues',
        'Major championships',
        'Team coaching positions'
      ],
      earnings: {
        min: 16000,
        max: 75000,
        currency: 'SAR/month'
      },
      description: 'Compete for the largest prize pools in esports history'
    },
    {
      id: 'rocketleague',
      name: 'Rocket League',
      category: 'Sports',
      difficulty: 'Expert',
      prizePool: '800K+ SAR',
      activePros: 150,
      demand: 'Growing',
      demandLevel: 78,
      image: '🚗',
      requirements: [
        'Grand Champion 3 minimum',
        'RLCS qualifier participation',
        'Mechanical skill mastery',
        'Team chemistry and positioning'
      ],
      opportunities: [
        'RLCS championships',
        'Regional majors',
        'Freestyle and content creation',
        'Brand partnerships'
      ],
      earnings: {
        min: 12000,
        max: 45000,
        currency: 'SAR/month'
      },
      description: 'Master the unique blend of sports and esports in aerial soccer'
    },
    {
      id: 'cod',
      name: 'Call of Duty',
      category: 'FPS',
      difficulty: 'Expert',
      prizePool: '1.2M+ SAR',
      activePros: 180,
      demand: 'High',
      demandLevel: 82,
      image: '💣',
      requirements: [
        'Top 250 ranked play',
        'CDL Challengers experience',
        'Game mode mastery (all competitive)',
        'Communication and teamwork'
      ],
      opportunities: [
        'CDL Pro League',
        'Challengers tournaments',
        'Warzone competitions',
        'Content and streaming'
      ],
      earnings: {
        min: 14000,
        max: 55000,
        currency: 'SAR/month'
      },
      description: 'Join the premier console FPS competitive scene'
    },
    {
      id: 'apex',
      name: 'Apex Legends',
      category: 'Battle Royale',
      difficulty: 'Expert',
      prizePool: '900K+ SAR',
      activePros: 160,
      demand: 'Growing',
      demandLevel: 75,
      image: '🎮',
      requirements: [
        'Predator rank achievement',
        'ALGS participation',
        'Legend mastery (5+ legends)',
        'Tournament consistency'
      ],
      opportunities: [
        'ALGS Championships',
        'Pro League spots',
        'Creator partnerships',
        'Team contracts'
      ],
      earnings: {
        min: 11000,
        max: 42000,
        currency: 'SAR/month'
      },
      description: 'Compete in the fastest-paced battle royale esport'
    }
  ];

  const getDemandColor = (level: number) => {
    if (level >= 90) return 'text-primary';
    if (level >= 80) return 'text-secondary';
    return 'text-accent';
  };

  const getDifficultyColor = (difficulty: string) => {
    return 'bg-destructive/20 text-destructive';
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleContinue = () => {
    if (selectedGame) {
      const game = proGames.find(g => g.id === selectedGame);
      navigate('/pro-requirements', { state: { selectedGame: game } });
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
              <Progress value={33} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">Step 1 of 3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-full mb-6 shadow-glow">
              <Crown className="w-6 h-6" />
              <span className="font-bold text-lg">Pro Player Application</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient">Game</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select the game you want to compete professionally in. Each game has specific requirements 
              and opportunities in the Middle East esports scene.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">14M+ SAR</p>
                <p className="text-sm text-muted-foreground">Total Prize Pool</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">1,800+</p>
                <p className="text-sm text-muted-foreground">Active Pros</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">8 Games</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">Growing</p>
                <p className="text-sm text-muted-foreground">Market Demand</p>
              </CardContent>
            </Card>
          </div>

          {/* Game Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {proGames.map((game) => (
              <Card
                key={game.id}
                className={`card-glow cursor-pointer transition-all duration-300 ${
                  selectedGame === game.id
                    ? 'ring-2 ring-primary shadow-glow scale-[1.02]'
                    : 'hover:border-primary/50 hover:scale-[1.01]'
                }`}
                onClick={() => handleGameSelect(game.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{game.image}</div>
                      <div>
                        <CardTitle className="text-xl mb-1">{game.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {game.category}
                          </Badge>
                          <Badge className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {selectedGame === game.id && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{game.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{game.prizePool}</p>
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{game.activePros}</p>
                      <p className="text-xs text-muted-foreground">Active Pros</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${getDemandColor(game.demandLevel)}`}>
                        {game.demand}
                      </p>
                      <p className="text-xs text-muted-foreground">Demand</p>
                    </div>
                  </div>

                  {/* Requirements Preview */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Key Requirements</span>
                    </div>
                    <ul className="space-y-1">
                      {game.requirements.slice(0, 2).map((req, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Earnings */}
                  <div className="bg-gradient-card p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Potential Earnings</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">
                          {game.earnings.min.toLocaleString()} - {game.earnings.max.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{game.earnings.currency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              disabled={!selectedGame}
              onClick={handleContinue}
              className="gap-2"
            >
              Continue to Requirements
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
