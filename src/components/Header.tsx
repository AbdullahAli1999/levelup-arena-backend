import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Trophy, GraduationCap, LogIn, LogOut, LayoutDashboard, Settings, User, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/NotificationBell";
import { EmailNotificationCenter } from "@/components/EmailNotificationCenter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isAdmin, isModerator, isTrainer, isPro, isPlayer, isParent } = useUserRole();
  const [profileData, setProfileData] = useState<{ first_name: string; avatar_url: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinMenuOpen, setJoinMenuOpen] = useState(false);

  const getDashboards = () => {
    const dashboards = [];
    if (isAdmin) dashboards.push({ label: 'Admin Dashboard', path: '/admin-dashboard', icon: LayoutDashboard });
    if (isModerator) dashboards.push({ label: 'Moderator Dashboard', path: '/moderator-dashboard', icon: LayoutDashboard });
    if (isTrainer) dashboards.push({ label: 'Trainer Dashboard', path: '/trainer-dashboard', icon: LayoutDashboard });
    if (isPro) dashboards.push({ label: 'Pro Dashboard', path: '/pro-dashboard', icon: LayoutDashboard });
    if (isParent) dashboards.push({ label: 'Parent Dashboard', path: '/parent-dashboard', icon: LayoutDashboard });
    if (isPlayer) dashboards.push({ label: 'Player Dashboard', path: '/player-dashboard', icon: LayoutDashboard });
    return dashboards;
  };

  const dashboards = getDashboards();

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('first_name, avatar_url')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfileData(data);
        });
    }
  }, [user]);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
            <Link to="/" className="text-foreground hover:text-primary transition-smooth font-medium">
              Home
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/game-selection" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth">
                <Users className="w-4 h-4" />
                <span>Players</span>
              </Link>
              <Link to="/pro-game-selection" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth">
                <Trophy className="w-4 h-4" />
                <span>Pro Players</span>
              </Link>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <EmailNotificationCenter />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={profileData?.avatar_url} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {profileData?.first_name?.[0]?.toUpperCase() || <User className="h-3 w-3" />}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">
                        {profileData?.first_name || user?.email?.split('@')[0]}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-background border-border z-50"
                  >
                    <DropdownMenuLabel className="text-foreground">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profileData?.avatar_url} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {profileData?.first_name?.[0]?.toUpperCase() || <User className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {profileData?.first_name || user?.email?.split('@')[0]}
                          </div>
                          <div className="text-xs font-normal text-muted-foreground truncate">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    
                    {dashboards.length > 0 && (
                      <>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">
                          Dashboards
                        </DropdownMenuLabel>
                        {dashboards.map((dashboard) => (
                          <DropdownMenuItem key={dashboard.path} asChild className="cursor-pointer">
                            <Link to={dashboard.path} className="flex items-center">
                              <dashboard.icon className="h-4 w-4 mr-2" />
                              {dashboard.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    
                    <DropdownMenuSeparator className="bg-border" />
                    
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-border" />
                    
                    <DropdownMenuItem 
                      onClick={logout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="hero" size="sm" className="gap-2">
                      Join Academy
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-sm border-border/50 z-50">
                    <DropdownMenuLabel>Join as</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/player-registration" className="cursor-pointer">
                        <Users className="h-4 w-4 mr-2" />
                        Player
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/pro-game-selection" className="cursor-pointer">
                        <Trophy className="h-4 w-4 mr-2" />
                        Pro Player
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/parent-registration" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Parent
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sliding Menu */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border/50 z-50 md:hidden animate-slide-in-right shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Menu</h2>
                  <p className="text-sm text-muted-foreground">Navigate</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-2">
                  <Link 
                    to="/" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Gamepad2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">Home</span>
                  </Link>
                  <Link 
                    to="/game-selection" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">Players</span>
                  </Link>
                  <Link 
                    to="/pro-game-selection" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-medium">Pro Players</span>
                  </Link>
                </div>

                {isAuthenticated ? (
                  <>
                    {/* User Profile Section */}
                    <div className="pt-4 border-t border-border/50 space-y-2">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profileData?.avatar_url || undefined} />
                          <AvatarFallback>
                            {profileData?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {profileData?.first_name || user?.email}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Dashboard Links */}
                      {dashboards.map((dashboard) => {
                        const Icon = dashboard.icon;
                        return (
                          <Link
                            key={dashboard.path}
                            to={dashboard.path}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{dashboard.label}</span>
                          </Link>
                        );
                      })}

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5 text-primary" />
                        <span className="font-medium">Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors w-full"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Join Academy Options */}
                    <div className="pt-4 border-t border-border/50 space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground px-3 mb-2">Join Academy</p>
                      <Link
                        to="/player-registration"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-medium">Player</span>
                      </Link>
                      <Link
                        to="/pro-game-selection"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Trophy className="h-5 w-5 text-primary" />
                        <span className="font-medium">Pro Player</span>
                      </Link>
                      <Link
                        to="/parent-registration"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5 text-primary" />
                        <span className="font-medium">Parent</span>
                      </Link>
                    </div>

                    {/* Login Button */}
                    <Link
                      to="/auth"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full" variant="outline">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;