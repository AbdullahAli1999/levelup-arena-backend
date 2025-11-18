import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isUnlocked: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
  className?: string;
}

const AchievementBadge = ({
  icon: Icon,
  title,
  description,
  isUnlocked,
  rarity = "common",
  className,
}: AchievementBadgeProps) => {
  const rarityStyles = {
    common: "border-border bg-card/30",
    rare: "border-primary/50 bg-gradient-primary shadow-neon",
    epic: "border-secondary/50 bg-gradient-secondary shadow-orange",
    legendary: "border-accent/50 bg-gradient-neon shadow-glow",
  };

  const iconColors = {
    common: "text-muted-foreground",
    rare: "text-primary",
    epic: "text-secondary",
    legendary: "text-accent",
  };

  return (
    <div
      className={cn(
        "relative group p-4 rounded-lg border-2 transition-all duration-300",
        isUnlocked
          ? `${rarityStyles[rarity]} hover:scale-105 hover:-translate-y-1`
          : "border-border/30 bg-muted/10 grayscale opacity-50",
        className
      )}
    >
      {/* Unlock animation overlay */}
      {isUnlocked && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="relative z-10 flex flex-col items-center space-y-3 text-center">
        {/* Icon container */}
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
            isUnlocked
              ? "bg-background/20 group-hover:scale-110 group-hover:rotate-6"
              : "bg-muted/20"
          )}
        >
          <Icon
            className={cn(
              "w-8 h-8",
              isUnlocked ? iconColors[rarity] : "text-muted-foreground/50"
            )}
          />
        </div>

        {/* Text content */}
        <div className="space-y-1">
          <h4
            className={cn(
              "font-bold text-sm",
              isUnlocked ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {title}
          </h4>
          <p
            className={cn(
              "text-xs leading-tight",
              isUnlocked ? "text-muted-foreground" : "text-muted-foreground/50"
            )}
          >
            {description}
          </p>
        </div>

        {/* Lock indicator */}
        {!isUnlocked && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-muted/50 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        )}

        {/* Rarity badge */}
        {isUnlocked && rarity !== "common" && (
          <div className="absolute top-2 left-2">
            <span
              className={cn(
                "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                rarity === "rare" && "bg-primary/20 text-primary",
                rarity === "epic" && "bg-secondary/20 text-secondary",
                rarity === "legendary" && "bg-accent/20 text-accent"
              )}
            >
              {rarity}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;
