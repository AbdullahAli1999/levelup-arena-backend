import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Loader2 } from 'lucide-react';

type UserRole = 'ADMIN' | 'MODERATOR' | 'PLAYER' | 'PRO' | 'PARENTS' | 'TRAINER';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requiredRole 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { hasRole, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && requireAuth && !isAuthenticated) {
      navigate('/auth');
    }
  }, [authLoading, requireAuth, isAuthenticated, navigate]);

  useEffect(() => {
    if (!authLoading && !roleLoading && requiredRole && !hasRole(requiredRole)) {
      navigate('/');
    }
  }, [authLoading, roleLoading, requiredRole, hasRole, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
