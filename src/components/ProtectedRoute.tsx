import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
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
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const { hasRole, loading: roleLoading } = useUserRole();
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approved, setApproved] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // If auth is required and user is not authenticated, redirect to login
  useEffect(() => {
    if (!authLoading && requireAuth && !isAuthenticated) {
      navigate('/auth');
    }
  }, [authLoading, requireAuth, isAuthenticated, navigate]);

  // If a specific role is required and user doesn't have it, redirect home
  useEffect(() => {
    if (!authLoading && !roleLoading && requiredRole && !hasRole(requiredRole)) {
      navigate('/');
    }
  }, [authLoading, roleLoading, requiredRole, hasRole, navigate]);

  // Enforce approval gate for roles with approval workflow (TRAINER, PRO)
  useEffect(() => {
    const checkApproval = async () => {
      if (!requiredRole || !user) {
        setApproved(null);
        return;
      }

      if (requiredRole === 'TRAINER' || requiredRole === 'PRO') {
        setApprovalLoading(true);
        try {
          const table = requiredRole === 'TRAINER' ? 'trainers' : 'pros';
          const { data, error } = await supabase
            .from(table)
            .select('is_approved')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) throw error;
          setApproved(Boolean(data?.is_approved));
        } catch (err) {
          console.error('Error checking approval:', err);
          setApproved(false);
        } finally {
          setApprovalLoading(false);
        }
      } else {
        // Roles without approval table (e.g., MODERATOR relies on role assignment by admin)
        setApproved(true);
      }
    };

    if (!authLoading) {
      checkApproval();
    }
  }, [authLoading, requiredRole, user]);

  // Redirect unapproved users to their pending pages
  useEffect(() => {
    if (!authLoading && !roleLoading && requiredRole && (requiredRole === 'TRAINER' || requiredRole === 'PRO') && approved === false) {
      navigate(requiredRole === 'TRAINER' ? '/trainer-pending' : '/pro-pending');
    }
  }, [authLoading, roleLoading, requiredRole, approved, navigate]);

  if (authLoading || roleLoading || approvalLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) return null;
  if (requiredRole && !hasRole(requiredRole)) return null;
  if (requiredRole && (requiredRole === 'TRAINER' || requiredRole === 'PRO') && approved === false) return null;

  return <>{children}</>;
}
