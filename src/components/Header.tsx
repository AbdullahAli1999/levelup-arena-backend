import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Trophy, GraduationCap, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="glass sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 hover-scale">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-neon animate-pulse-glow">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground neon-text">LevelUp</h1>
              <p className="text-sm text-muted-foreground -mt-1 font-medium">Academy</p>
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
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.firstName}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/player-registration">
                  <Button variant="hero" size="sm">
                    Join Academy
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;