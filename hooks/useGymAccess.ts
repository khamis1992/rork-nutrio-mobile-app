import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useGymAccess(userId: string) {
  const [access, setAccess] = useState<{
    gymId: string;
    from_date: string;
    to_date: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    supabase
      .from('gym_access')
      .select('gym_id, from_date, to_date')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (error) {
          setError('Failed to load gym access.');
          setAccess([]);
        } else {
          setAccess(
            (data || []).map((row) => ({
              gymId: row.gym_id,
              from_date: row.from_date,
              to_date: row.to_date,
            }))
          );
        }
        setLoading(false);
      });
  }, [userId]);

  return { access, loading, error };
} 