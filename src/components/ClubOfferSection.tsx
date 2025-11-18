import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Target, Users, Star, ArrowRight, Building } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ClubOfferSkeleton from "@/components/skeletons/ClubOfferSkeleton";
import { useCountUp } from "@/hooks/useCountUp";

const ClubOfferSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for stats animation
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
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  // Animated counters
  const tournamentWinners = useCountUp({ end: 500, duration: 2000, isVisible });
  const placementRate = useCountUp({ end: 95, duration: 2000, isVisible });
  const activePlayers = useCountUp({ end: 1000, duration: 2000, isVisible });
  const satisfaction = useCountUp({ end: 4.9, duration: 2000, decimals: 1, isVisible });

  if (isLoading) {
    return <ClubOfferSkeleton />;
  }

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary">
                <Building className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">For Esports Clubs</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Find Your Next
                <span className="gradient-text-animated"> Champion</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Connect with talented players from LevelUp Academy. Our graduates are 
                tournament-ready and trained by industry professionals.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-foreground">{tournamentWinners}+</span>
                </div>
                <p className="text-muted-foreground">Tournament Winners</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{placementRate}%</span>
                </div>
                <p className="text-muted-foreground">Placement Rate</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-foreground">{activePlayers}+</span>
                </div>
                <p className="text-muted-foreground">Active Players</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-foreground">{satisfaction}/5</span>
                </div>
                <p className="text-muted-foreground">Club Satisfaction</p>
              </div>
            </div>

            <Button variant="gaming" size="lg" className="text-lg px-8 py-4">
              Submit Your Offer
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Right Content - Offer Card */}
          <Card className="bg-gradient-card border-border/50 p-8 shadow-elegant">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Club Partnership</h3>
                <p className="text-muted-foreground">
                  Access our talent pool of trained esports athletes
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What You Get:</h4>
                  <div className="space-y-2">
                    {[
                      "Pre-screened talented players",
                      "Performance analytics & stats",
                      "Direct communication channel",
                      "Ongoing partnership support"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Partnership Types:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                        <div className="font-medium text-primary">Scout Individual Players</div>
                        <div className="text-sm text-muted-foreground">Find specific talent for your team</div>
                      </div>
                      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                        <div className="font-medium text-secondary">Team Building Program</div>
                        <div className="text-sm text-muted-foreground">Build entire competitive teams</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="w-full">
                Start Partnership Discussion
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClubOfferSection;