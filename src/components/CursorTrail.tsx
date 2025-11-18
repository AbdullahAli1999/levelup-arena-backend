import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
}

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      // Throttle particle creation (every 50ms)
      if (currentTime - lastTime < 50) return;
      
      lastTime = currentTime;
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    const cleanupParticles = () => {
      const now = Date.now();
      setParticles((prev) =>
        prev.filter((particle) => now - particle.id < 1000)
      );
      animationFrameId = requestAnimationFrame(cleanupParticles);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(cleanupParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-particle-fade"
          style={{
            left: particle.x,
            top: particle.y,
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
