import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, UserCheck, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/terry-bogard-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Professional esports training environment" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Level Up Your
                <span className="neon-text bg-gradient-primary bg-clip-text text-transparent"> Gaming</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Master gaming skills, compete in tournaments, and connect with top 
                gamers worldwide. Your journey to becoming a pro starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
              <Link to="/player-registration">
                <Button variant="hero" size="lg" className="text-lg px-10 py-6 group">
                  Start Training
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/game-selection">
                <Button variant="gaming" size="lg" className="text-lg px-10 py-6">
                  Explore Games
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 animate-fade-in">
              <div className="gaming-card flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shadow-neon">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Secure Learning</p>
                  <p className="text-sm text-muted-foreground">Safe environment</p>
                </div>
              </div>
              
              <div className="gaming-card flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center shadow-orange">
                  <UserCheck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Expert Trainers</p>
                  <p className="text-sm text-muted-foreground">Pro-level coaching</p>
                </div>
              </div>
              
              <div className="gaming-card flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shadow-accent">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Progress</p>
                  <p className="text-sm text-muted-foreground">Rapid skill building</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Game Card */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <Card className="gaming-card w-full max-w-md bg-gradient-card border-border/50 p-8 shadow-card float">
              <div className="space-y-6">
                <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-elegant">
                  <img 
                    src={heroImage} 
                    alt="Featured training session" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Elite Training Program</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Join our intensive pro-level training sessions and master advanced techniques.
                  </p>
                </div>
                <Link to="/player-registration">
                  <Button variant="premium" className="w-full text-lg py-4">
                    Join Now - Free Trial
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;