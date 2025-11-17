import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'ADMIN' | 'MODERATOR' | 'PLAYER' | 'PRO' | 'PARENTS' | 'TRAINER';

export function useUserRole() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) throw error;

        setRoles(data?.map(r => r.role as UserRole) || []);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, [user]);

  const hasRole = (role: UserRole) => roles.includes(role);
  const isAdmin = hasRole('ADMIN');
  const isModerator = hasRole('MODERATOR');
  const isTrainer = hasRole('TRAINER');
  const isPro = hasRole('PRO');
  const isPlayer = hasRole('PLAYER');
  const isParent = hasRole('PARENTS');

  return { roles, hasRole, isAdmin, isModerator, isTrainer, isPro, isPlayer, isParent, loading };
}
