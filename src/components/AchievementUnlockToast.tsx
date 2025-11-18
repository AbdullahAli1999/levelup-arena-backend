import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementUnlockToastProps {
  icon: LucideIcon;
  title: string;
  description: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  onClose: () => void;
}

const AchievementUnlockToast = ({
  icon: Icon,
  title,
  description,
  rarity = "common",
  onClose,
}: AchievementUnlockToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const rarityGradients = {
    common: "bg-gradient-card",
    rare: "bg-gradient-primary",
    epic: "bg-gradient-secondary",
    legendary: "bg-gradient-neon",
  };

  const rarityShadows = {
    common: "shadow-card",
    rare: "shadow-neon",
    epic: "shadow-orange",
    legendary: "shadow-glow",
  };

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-[100] max-w-sm transition-all duration-500 transform",
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-border/50 p-6",
          rarityGradients[rarity],
          rarityShadows[rarity],
          "animate-pulse-glow"
        )}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-shimmer" />

        {/* Content */}
        <div className="relative z-10 flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-background/20 rounded-full flex items-center justify-center animate-bounce">
              <Icon className="w-6 h-6 text-foreground" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Achievement Unlocked!
            </p>
            <h4 className="text-lg font-bold text-foreground">{title}</h4>
            <p className="text-sm text-foreground/80">{description}</p>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 500);
            }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-foreground/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementUnlockToast;
