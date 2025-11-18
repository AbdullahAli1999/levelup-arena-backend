import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Gamepad2, 
  Star, 
  Users, 
  GraduationCap, 
  Shield, 
  Settings,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const UserTypeSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const userTypes = [
    {
      title: "Player",
      icon: Gamepad2,
      description: "Register, select games & trainers, access leaderboards and classes",
      features: ["Game Selection", "Trainer Matching", "Payment System", "Leaderboards"],
      buttonText: "Register as Player",
      gradient: "bg-gradient-primary",
      shadowClass: "hover:shadow-neon",
      link: "/player-registration"
    },
    {
      title: "Pro Player",
      icon: Star,
      description: "Elite registration with trainer approval, access to advanced training",
      features: ["Game Specialization", "Requirements Review", "Trainer Approval", "Advanced Classes"],
      buttonText: "Apply as Pro",
      gradient: "bg-gradient-secondary",
      shadowClass: "hover:shadow-orange",
      link: "/pro-player-registration"
    },
    {
      title: "Parent",
      icon: Users,
      description: "Secure registration for children with safe environment controls",
      features: ["Child Registration", "Safe Environment", "Parental Controls", "Progress Tracking"],
      buttonText: "Register Child",
      gradient: "bg-gradient-card",
      shadowClass: "hover:shadow-elegant",
      link: "/parent-dashboard"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">Gaming Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're a beginner player, aspiring pro, parent, or gaming professional, 
            we have the perfect training environment for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes.map((type, index) => {
            const IconComponent = type.icon;
            const isVisible = visibleCards.has(index);
            return (
              <Card 
                key={type.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`${type.gradient} p-6 border-border/50 transition-all duration-700 ${type.shadowClass} transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:tracking-wide transition-all duration-300">{type.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-center gap-2 text-white/90 group-hover:text-white transition-all duration-300"
                        style={{ transitionDelay: `${featureIndex * 50}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                        <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to={type.link}>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:border-white/40 group-hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        {type.buttonText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTypeSection;