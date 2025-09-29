import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Trophy, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LevelUp</h1>
              <p className="text-xs text-muted-foreground -mt-1">Academy</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Players</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Trophy className="w-4 h-4" />
                <span>Pro Players</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4" />
                <span>Trainers</span>
              </div>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/player-dashboard">
              <Button variant="ghost" size="sm">
                Demo Dashboard
              </Button>
            </Link>
            <Link to="/player-registration">
              <Button variant="hero" size="sm">
                Join Academy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;