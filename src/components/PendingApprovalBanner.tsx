import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export function PendingApprovalBanner() {
  const { user } = useAuth();
  const { isPro, isTrainer } = useUserRole();
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkApproval = async () => {
      if (!user || (!isPro && !isTrainer)) {
        setLoading(false);
        return;
      }

      try {
        if (isTrainer) {
          const { data, error } = await supabase
            .from('trainers')
            .select('is_approved')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) throw error;
          setIsApproved(data?.is_approved ?? true);
        } else if (isPro) {
          const { data, error } = await supabase
            .from('pros')
            .select('is_approved')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) throw error;
          setIsApproved(data?.is_approved ?? true);
        }
      } catch (error) {
        console.error('Error checking approval status:', error);
        setIsApproved(true);
      } finally {
        setLoading(false);
      }
    };

    checkApproval();
  }, [user, isPro, isTrainer]);

  if (loading || isApproved || (!isPro && !isTrainer)) {
    return null;
  }

  const pendingLink = isTrainer ? '/trainer-pending' : '/pro-pending';
  const roleLabel = isTrainer ? 'Trainer' : 'Pro Player';

  return (
    <div className="bg-warning/20 border-b border-warning/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <Link 
          to={pendingLink}
          className="flex items-center justify-center gap-2 text-warning hover:text-warning/80 transition-colors"
        >
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">
            Your {roleLabel} account is pending approval. Click here for more details.
          </span>
        </Link>
      </div>
    </div>
  );
}
