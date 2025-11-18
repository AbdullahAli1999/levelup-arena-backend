import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  avatar: string;
  score: number;
  wins: number;
  country: string;
}

const LeaderboardSection = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", rank: 1, previousRank: 1, name: "ShadowNinja", avatar: "🥷", score: 2840, wins: 156, country: "🇸🇦" },
    { id: "2", rank: 2, previousRank: 3, name: "ProGamer2024", avatar: "🎮", score: 2735, wins: 142, country: "🇦🇪" },
    { id: "3", rank: 3, previousRank: 2, name: "EliteSniper", avatar: "🎯", score: 2680, wins: 138, country: "🇰🇼" },
    { id: "4", rank: 4, previousRank: 5, name: "ThunderStrike", avatar: "⚡", score: 2590, wins: 131, country: "🇧🇭" },
    { id: "5", rank: 5, previousRank: 4, name: "PhantomX", avatar: "👻", score: 2540, wins: 128, country: "🇴🇲" },
    { id: "6", rank: 6, previousRank: 6, name: "CyberAce", avatar: "🤖", score: 2485, wins: 119, country: "🇶🇦" },
    { id: "7", rank: 7, previousRank: 8, name: "NeonDragon", avatar: "🐉", score: 2420, wins: 115, country: "🇸🇦" },
    { id: "8", rank: 8, previousRank: 7, name: "FrostByte", avatar: "❄️", score: 2380, wins: 110, country: "🇦🇪" },
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getRankTrend = (player: Player) => {
    const diff = player.previousRank - player.rank;
    if (diff > 0) return "up";
    if (diff < 0) return "down";
    return "same";
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50 shadow-[0_0_20px_rgba(156,163,175,0.3)]";
      case 3:
        return "bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]";
      default:
        return "bg-card/50 border-border/30";
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Global <span className="gradient-text-animated">Leaderboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with the best players worldwide and climb to the top
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 p-6">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 mb-4 pb-4 border-b border-border/50 text-sm font-semibold text-muted-foreground">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-2 text-center hidden sm:block">Wins</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-2 text-center">Trend</div>
            </div>

            {/* Players List */}
            <div className="space-y-2">
              {players.map((player, index) => {
                const trend = getRankTrend(player);
                const isTop3 = player.rank <= 3;

                return (
                  <div
                    key={player.id}
                    className={cn(
                      "grid grid-cols-12 gap-4 items-center p-4 rounded-lg border transition-all duration-500 hover:scale-[1.02]",
                      getRankStyle(player.rank),
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center justify-center">
                      {isTop3 ? (
                        <div className="relative">
                          {getRankIcon(player.rank)}
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                            {player.rank}
                          </div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center font-bold text-foreground">
                          {player.rank}
                        </div>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-2xl shadow-neon">
                        {player.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground flex items-center gap-2">
                          {player.name}
                          <span className="text-lg">{player.country}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rank #{player.rank}
                        </div>
                      </div>
                    </div>

                    {/* Wins */}
                    <div className="col-span-2 text-center hidden sm:block">
                      <div className="font-bold text-foreground">{player.wins}</div>
                      <div className="text-xs text-muted-foreground">wins</div>
                    </div>

                    {/* Score */}
                    <div className="col-span-2 text-center">
                      <div className="font-bold text-primary text-lg">{player.score}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>

                    {/* Trend */}
                    <div className="col-span-2 flex items-center justify-center">
                      {trend === "up" && (
                        <div className="flex items-center gap-1 text-green-500 animate-bounce">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-xs font-bold">
                            +{player.previousRank - player.rank}
                          </span>
                        </div>
                      )}
                      {trend === "down" && (
                        <div className="flex items-center gap-1 text-red-500">
                          <TrendingDown className="w-4 h-4" />
                          <span className="text-xs font-bold">
                            {player.previousRank - player.rank}
                          </span>
                        </div>
                      )}
                      {trend === "same" && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Minus className="w-4 h-4" />
                          <span className="text-xs">-</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More */}
            <div className="mt-6 text-center">
              <Button variant="gaming" size="lg">
                View Full Leaderboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
