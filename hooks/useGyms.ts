import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useGyms() {
  const [gyms, setGyms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    supabase
      .from('gyms')
      .select('id, name, location, image_url, rating')
      .then(({ data, error }) => {
        if (error) {
          setError('Failed to load gyms.');
          setGyms([]);
        } else {
          setGyms(data || []);
        }
        setLoading(false);
      });
  }, []);

  return { gyms, loading, error };
} 