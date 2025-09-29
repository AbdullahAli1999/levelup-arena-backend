import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Trophy, Users, Clock, ArrowLeft, CheckCircle } from "lucide-react";

const trainers = [
  {
    id: "1",
    name: "Ahmed Al-Rashid",
    game: "Street Fighter 6",
    rank: "Grand Master",
    rating: 4.9,
    students: 127,
    experience: "8 years",
    price: "250 SAR/hour",
    specialties: ["Combo Mastery", "Frame Data", "Tournament Prep"],
    achievements: ["EVO Champion 2023", "Saudi National Champion"],
    avatar: "/placeholder.svg",
    flag: "🇸🇦",
    languages: ["Arabic", "English"]
  },
  {
    id: "2", 
    name: "Fatima Al-Zahra",
    game: "Street Fighter 6",
    rank: "Master",
    rating: 4.8,
    students: 89,
    experience: "6 years",
    price: "200 SAR/hour",
    specialties: ["Defense Strategies", "Mind Games", "Character Mastery"],
    achievements: ["Regional Champion", "Top 8 at Capcom Cup"],
    avatar: "/placeholder.svg",
    flag: "🇸🇦",
    languages: ["Arabic", "English"]
  },
  {
    id: "3",
    name: "Omar Al-Mansouri",
    game: "Street Fighter 6",
    rank: "Diamond",
    rating: 4.7,
    students: 156,
    experience: "5 years", 
    price: "150 SAR/hour",
    specialties: ["Beginner Friendly", "Fundamentals", "Online Training"],
    achievements: ["Multiple Regional Top 3", "Rising Star Award"],
    avatar: "/placeholder.svg",
    flag: "🇸🇦",
    languages: ["Arabic"]
  }
];

export default function TrainerSelection() {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/game-selection')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Games
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LevelUp Academy</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Step 3 of 4
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Choose Your Trainer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a professional trainer who will guide you to become a pro player in Street Fighter 6
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid gap-6 mb-8">
          {trainers.map((trainer) => (
            <Card 
              key={trainer.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                selectedTrainer === trainer.id ? 'ring-2 ring-primary border-primary shadow-lg' : ''
              }`}
              onClick={() => setSelectedTrainer(trainer.id)}
            >
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Trainer Info */}
                  <div className="md:col-span-2 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={trainer.avatar} alt={trainer.name} />
                      <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{trainer.name}</h3>
                        <span className="text-lg">{trainer.flag}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{trainer.rank}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{trainer.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Languages: {trainer.languages.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.experience} experience</span>
                    </div>
                    <div className="font-bold text-primary">{trainer.price}</div>
                  </div>

                  {/* Specialties & Achievements */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Achievements</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {trainer.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {achievement}
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

        {/* Selection Confirmation */}
        {selectedTrainer && (
          <Card className="border-primary bg-primary/5 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-lg">Trainer Selected!</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                You've selected {trainers.find(t => t.id === selectedTrainer)?.name} as your trainer. 
                Continue to payment to complete your registration.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate('/payment')}
                  className="flex items-center gap-2"
                >
                  Continue to Payment
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTrainer(null)}
                >
                  Change Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}