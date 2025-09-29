import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Users, TrendingUp, ChevronRight, Crown, Target, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProGameSelection() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const navigate = useNavigate();

  const proGames = [
    {
      id: 'sf6',
      name: 'Street Fighter 6',
      category: 'Fighting',
      difficulty: 'Expert',
      prizePool: '500K+ SAR',
      activePros: 150,
      demand: 'Very High',
      demandLevel: 95,
      image: '🥊',
      requirements: [
        'Grand Master rank or equivalent',
        'Tournament experience required',
        '3+ years competitive play',
        'Consistent top 8 placements'
      ],
      opportunities: [
        'Saudi Pro League tournaments',
        'International championship spots',
        'Streaming partnerships',
        'Academy trainer positions'
      ],
      earnings: {
        min: 15000,
        max: 50000,
        currency: 'SAR/month'
      },
      nextTournament: '2024-02-15',
      description: 'Dominate the Middle East fighting game scene with Street Fighter 6 mastery'
    },
    {
      id: 'tekken8',
      name: 'Tekken 8',
      category: 'Fighting',
      difficulty: 'Expert',
      prizePool: '300K+ SAR',
      activePros: 85,
      demand: 'High',
      demandLevel: 80,
      image: '👊',
      requirements: [
        'Tekken King rank minimum',
        'Regional tournament wins',
        'Character specialist expertise',
        'Frame data knowledge'
      ],
      opportunities: [
        'EVO Middle East qualifier',
        'King of Iron Fist spots',
        'Content creation deals',
        'Team sponsorships'
      ],
      earnings: {
        min: 12000,
        max: 35000,
        currency: 'SAR/month'
      },
      nextTournament: '2024-02-20',
      description: 'Rise through the ranks in the most technical fighting game'
    },
    {
      id: 'kof15',
      name: 'King of Fighters XV',
      category: 'Fighting',
      difficulty: 'Expert',
      prizePool: '200K+ SAR',
      activePros: 45,
      demand: 'Medium',
      demandLevel: 60,
      image: '👑',
      requirements: [
        'Master rank achievement',
        'Team synergy expertise',
        'Combo execution mastery',
        'Local tournament presence'
      ],
      opportunities: [
        'SNK sponsored events',
        'Team-based competitions',
        'International qualifiers',
        'Community leadership roles'
      ],
      earnings: {
        min: 8000,
        max: 25000,
        currency: 'SAR/month'
      },
      nextTournament: '2024-03-01',
      description: 'Master the art of team fighting and combo execution'
    },
    {
      id: 'ggst',
      name: 'Guilty Gear Strive',
      category: 'Fighting',
      difficulty: 'Expert',
      prizePool: '150K+ SAR',
      activePros: 35,
      demand: 'Growing',
      demandLevel: 70,
      image: '⚡',
      requirements: [
        'Celestial floor dominance',
        'Character mastery',
        'Roman Cancel expertise',
        'Set play knowledge'
      ],
      opportunities: [
        'Arc System Works events',
        'Anime fighting game scene',
        'International FGC presence',
        'Technical content creation'
      ],
      earnings: {
        min: 6000,
        max: 20000,
        currency: 'SAR/month'
      },
      nextTournament: '2024-03-10',
      description: 'Express yourself through the most stylish fighting game'
    }
  ];

  const getDemandColor = (level: number) => {
    if (level >= 90) return 'text-red-400';
    if (level >= 70) return 'text-orange-400';
    if (level >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Expert') return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (difficulty === 'Advanced') return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleContinue = () => {
    if (selectedGame) {
      navigate('/pro-requirements', { state: { selectedGame } });
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
            Pro Registration - Step 1 of 4
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-primary/20 text-yellow-400 px-4 py-2 rounded-full mb-4">
              <Crown className="w-5 h-5" />
              <span className="font-medium">Professional Path</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-primary to-yellow-400 bg-clip-text text-transparent">
              Choose Your Professional Game
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Select the game you want to compete in professionally. Each game has different requirements, 
              earning potential, and career opportunities in the Saudi esports scene.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">1.2M SAR</div>
                <div className="text-sm text-muted-foreground">Total Prize Pool</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">315</div>
                <div className="text-sm text-muted-foreground">Active Pros</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Monthly Tournaments</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Career Success Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Game Selection */}
          <div className="grid gap-6 mb-8">
            {proGames.map((game) => (
              <Card 
                key={game.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedGame === game.id 
                    ? 'ring-2 ring-primary shadow-lg shadow-primary/20' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleGameSelect(game.id)}
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl">
                          {game.image}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{game.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{game.category}</Badge>
                            <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                              {game.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{game.prizePool}</div>
                        <div className="text-sm text-muted-foreground">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{game.description}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Active Pros</div>
                        <div className="font-bold">{game.activePros}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Demand</div>
                        <div className={`font-bold ${getDemandColor(game.demandLevel)}`}>
                          {game.demand}
                        </div>
                        <Progress value={game.demandLevel} className="mt-1 h-1" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Earnings Range</div>
                        <div className="font-bold">
                          {game.earnings.min.toLocaleString()}-{game.earnings.max.toLocaleString()} {game.earnings.currency}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Next Tournament</div>
                        <div className="font-bold">{game.nextTournament}</div>
                      </div>
                    </div>

                    {/* Requirements and Opportunities */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-red-400" />
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {game.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-green-400" />
                          Opportunities
                        </h4>
                        <ul className="space-y-2">
                          {game.opportunities.map((opp, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {opp}
                            </li>
                          ))}
                        </ul>
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
              className="px-8"
            >
              Continue to Requirements
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}