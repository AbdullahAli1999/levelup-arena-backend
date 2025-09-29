import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Users, Trophy, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const games = [
  {
    id: "valorant",
    name: "VALORANT",
    category: "FPS",
    popularity: "Hot",
    players: "2.5M+",
    description: "Tactical 5v5 shooter with unique agents and abilities",
    image: "🎯",
    difficulty: "Medium",
    trainingHours: "120-200",
  },
  {
    id: "lol",
    name: "League of Legends",
    category: "MOBA",
    popularity: "Popular",
    players: "180M+",
    description: "Strategic team-based multiplayer online battle arena",
    image: "⚔️",
    difficulty: "Hard",
    trainingHours: "200-300",
  },
  {
    id: "csgo",
    name: "CS:GO",
    category: "FPS",
    popularity: "Classic",
    players: "1M+",
    description: "Classic competitive tactical shooter",
    image: "🔫",
    difficulty: "Hard",
    trainingHours: "150-250",
  },
  {
    id: "fifa",
    name: "FIFA 24",
    category: "Sports",
    popularity: "New",
    players: "50M+",
    description: "The world's most popular football simulation",
    image: "⚽",
    difficulty: "Easy",
    trainingHours: "80-120",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    category: "Battle Royale",
    popularity: "Trending",
    players: "400M+",
    description: "Build, fight, and survive in this battle royale",
    image: "🏗️",
    difficulty: "Medium",
    trainingHours: "100-150",
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    category: "Sports",
    popularity: "Growing",
    players: "75M+",
    description: "Soccer meets driving in this unique competitive game",
    image: "🚗",
    difficulty: "Medium",
    trainingHours: "90-140",
  },
];

const GameSelection = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Step 2 of 4</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your <span className="text-gradient">Game</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the game you want to master. Our expert trainers will guide you from beginner to pro level.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover-glow ${
                selectedGame === game.id
                  ? "ring-2 ring-primary border-primary/50 bg-primary/5"
                  : "hover:border-primary/30"
              }`}
              onClick={() => setSelectedGame(game.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{game.image}</div>
                  <div className="flex flex-col gap-1">
                    <Badge variant={game.popularity === "Hot" ? "default" : "secondary"} className="text-xs">
                      {game.popularity}
                    </Badge>
                    {selectedGame === game.id && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl">{game.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">{game.category}</Badge>
                  <Badge variant="outline" className="text-xs">{game.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{game.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{game.players}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {game.trainingHours} hours
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Game Info */}
        {selectedGame && (
          <Card className="card-glow mb-8 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Game Selected</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Training Program</div>
                  <div className="text-sm text-muted-foreground">Structured curriculum</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Expert Trainers</div>
                  <div className="text-sm text-muted-foreground">Professional coaches</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Certification</div>
                  <div className="text-sm text-muted-foreground">Official completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <Link to="/player-registration">
            <Button variant="outline">Back to Registration</Button>
          </Link>
          <Link to="/trainer-selection">
            <Button disabled={!selectedGame} className="gap-2">
              Continue to Trainer Selection
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;