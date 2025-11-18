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

const UserTypeSection = () => {
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
            return (
              <Card 
                key={type.title}
                className={`${type.gradient} p-6 border-border/50 transition-all duration-300 ${type.shadowClass} transform hover:scale-105`}
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{type.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-white/90">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to={type.link}>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-smooth"
                    >
                      {type.buttonText}
                      <ArrowRight className="w-4 h-4" />
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