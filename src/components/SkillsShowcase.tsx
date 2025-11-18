import { Card } from "@/components/ui/card";
import AnimatedProgressBar from "./AnimatedProgressBar";
import { Trophy, Target, Zap, Shield } from "lucide-react";

const SkillsShowcase = () => {
  const skills = [
    { label: "Aiming Accuracy", value: 92, icon: Target, color: "text-primary" },
    { label: "Game Strategy", value: 85, icon: Trophy, color: "text-secondary" },
    { label: "Reaction Time", value: 88, icon: Zap, color: "text-accent" },
    { label: "Team Coordination", value: 78, icon: Shield, color: "text-primary" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Master Your <span className="gradient-text-animated">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your progress and level up across multiple gaming competencies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.label}
                    className="space-y-3"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <IconComponent className={`w-5 h-5 ${skill.color}`} />
                      </div>
                      <h3 className="font-semibold text-foreground">{skill.label}</h3>
                    </div>
                    <AnimatedProgressBar
                      label=""
                      value={skill.value}
                      showPercentage={true}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Skill Rating</p>
                  <p className="text-3xl font-bold gradient-text-animated">86%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                  <p className="text-3xl font-bold text-secondary">#2,450</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
