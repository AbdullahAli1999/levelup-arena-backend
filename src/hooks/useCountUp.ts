import { useEffect, useState, useRef } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  isVisible: boolean;
}

export const useCountUp = ({ end, duration = 2000, decimals = 0, isVisible }: UseCountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = startValue + (end - startValue) * easeProgress;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, hasAnimated]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
};
