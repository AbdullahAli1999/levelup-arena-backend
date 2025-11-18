import { Gamepad2, MessageCircle, Users, GraduationCap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">LevelUp</h1>
                <p className="text-xs text-muted-foreground -mt-1">Academy</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Professional esports training academy connecting players with top-tier coaches 
              and opportunities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-smooth">
                Home
              </Link>
              <Link to="/game-selection" className="block text-muted-foreground hover:text-primary transition-smooth">
                Training Programs
              </Link>
              <Link to="/leaderboards" className="block text-muted-foreground hover:text-primary transition-smooth">
                Leaderboards
              </Link>
              <Link to="/club-offers" className="block text-muted-foreground hover:text-primary transition-smooth">
                Club Offers
              </Link>
            </div>
          </div>

          {/* User Types */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Join As</h3>
            <div className="space-y-2">
              <Link to="/player-registration" className="block text-muted-foreground hover:text-secondary transition-smooth">
                Player Registration
              </Link>
              <Link to="/pro-game-selection" className="block text-muted-foreground hover:text-secondary transition-smooth">
                Pro Player Application
              </Link>
              <Link to="/parent-registration" className="block text-muted-foreground hover:text-secondary transition-smooth">
                Parent Registration
              </Link>
            </div>
          </div>

          {/* Staff & Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Staff & Community</h3>
            <div className="space-y-2">
              <Link to="/trainer-registration" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth">
                <GraduationCap className="w-4 h-4" />
                <span>Become a Trainer</span>
              </Link>
              <Link to="/moderator-registration" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth">
                <Shield className="w-4 h-4" />
                <span>Moderator Portal</span>
              </Link>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>Discord Community</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Live Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 LevelUp Academy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;