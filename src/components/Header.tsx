import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Trophy, GraduationCap, LogIn, LogOut, LayoutDashboard, Settings, User, ChevronDown } from "lucide-react";
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