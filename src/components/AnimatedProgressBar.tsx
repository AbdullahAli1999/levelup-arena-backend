import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  className?: string;
  barClassName?: string;
  showPercentage?: boolean;
}

const AnimatedProgressBar = ({
  label,
  value,
  maxValue = 100,
  className,
  barClassName,
  showPercentage = true,
}: AnimatedProgressBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const percentage = Math.min((value / maxValue) * 100, 100);

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
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = percentage * easeProgress;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, percentage]);

  return (
    <div ref={progressRef} className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {showPercentage && (
          <span className="text-sm font-bold text-primary">
            {Math.round(animatedValue)}%
          </span>
        )}
      </div>
      <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-primary shadow-neon transition-all duration-300",
            barClassName
          )}
          style={{
            width: `${animatedValue}%`,
            transition: isVisible ? "width 0.1s ease-out" : "none",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
