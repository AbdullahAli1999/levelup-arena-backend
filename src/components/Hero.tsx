import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, UserCheck, Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-gaming.jpg";

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
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Level Up Your
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Gaming</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Master gaming skills, compete in tournaments, and connect with top 
                gamers worldwide. Your journey to becoming a pro starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Training
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="gaming" size="lg" className="text-lg px-8 py-4">
                Submit Club Offer
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Secure Learning</p>
                  <p className="text-sm text-muted-foreground">Safe environment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Expert Trainers</p>
                  <p className="text-sm text-muted-foreground">Pro-level coaching</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Fast Progress</p>
                  <p className="text-sm text-muted-foreground">Rapid skill building</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Game Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-gradient-card border-border/50 p-6 shadow-elegant">
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="Featured training session" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Elite Training Program</h3>
                  <p className="text-muted-foreground">
                    Join our intensive pro-level training sessions and master advanced techniques.
                  </p>
                </div>
                <Button variant="hero" className="w-full">
                  Join Now - Free Trial
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;