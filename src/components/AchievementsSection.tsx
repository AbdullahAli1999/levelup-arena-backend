import { useState } from "react";
import { Trophy, Target, Zap, Award, Crown, Star, Shield, Flame } from "lucide-react";
import AchievementBadge from "./AchievementBadge";
import AchievementUnlockToast from "./AchievementUnlockToast";
import { Button } from "./ui/button";

interface Achievement {
  id: string;
  icon: typeof Trophy;
  title: string;
  description: string;
  isUnlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const AchievementsSection = () => {
  const [achievements] = useState<Achievement[]>([
    {
      id: "first-win",
      icon: Trophy,
      title: "First Victory",
      description: "Win your first match",
      isUnlocked: true,
      rarity: "common",
    },
    {
      id: "sharpshooter",
      icon: Target,
      title: "Sharpshooter",
      description: "Achieve 90% accuracy",
      isUnlocked: true,
      rarity: "rare",
    },
    {
      id: "speed-demon",
      icon: Zap,
      title: "Speed Demon",
      description: "Complete 100 quick matches",
      isUnlocked: true,
      rarity: "epic",
    },
    {
      id: "champion",
      icon: Crown,
      title: "Champion",
      description: "Win 10 tournaments",
      isUnlocked: false,
      rarity: "legendary",
    },
    {
      id: "dedicated",
      icon: Flame,
      title: "Dedicated Player",
      description: "Play for 30 days straight",
      isUnlocked: true,
      rarity: "rare",
    },
    {
      id: "team-player",
      icon: Shield,
      title: "Team Player",
      description: "Win 50 team matches",
      isUnlocked: false,
      rarity: "epic",
    },
    {
      id: "legend",
      icon: Star,
      title: "Legend",
      description: "Reach top 100 global rank",
      isUnlocked: false,
      rarity: "legendary",
    },
    {
      id: "mvp",
      icon: Award,
      title: "MVP",
      description: "Be MVP 25 times",
      isUnlocked: false,
      rarity: "rare",
    },
  ]);

  const [unlockedToast, setUnlockedToast] = useState<Achievement | null>(null);

  const handleUnlockDemo = () => {
    const lockedAchievements = achievements.filter((a) => !a.isUnlocked);
    if (lockedAchievements.length > 0) {
      setUnlockedToast(lockedAchievements[0]);
    }
  };

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your <span className="gradient-text-animated">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Unlock badges and milestones as you progress through your gaming journey
          </p>

          {/* Progress */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-bold text-primary">
                {unlockedCount}/{totalCount}
              </span>
            </div>
            <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary shadow-neon transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Demo button */}
          <Button
            onClick={handleUnlockDemo}
            variant="premium"
            size="sm"
            className="mt-6"
          >
            Preview Achievement Unlock
          </Button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="animate-fade-in opacity-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <AchievementBadge
                icon={achievement.icon}
                title={achievement.title}
                description={achievement.description}
                isUnlocked={achievement.isUnlocked}
                rarity={achievement.rarity}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Toast notification */}
      {unlockedToast && (
        <AchievementUnlockToast
          icon={unlockedToast.icon}
          title={unlockedToast.title}
          description={unlockedToast.description}
          rarity={unlockedToast.rarity}
          onClose={() => setUnlockedToast(null)}
        />
      )}
    </section>
  );
};

export default AchievementsSection;
