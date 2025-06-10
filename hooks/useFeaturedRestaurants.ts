import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Restaurant } from '@/types/restaurant';

export function useFeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    supabase
      .from('restaurants')
      .select('*')
      .or('featured.eq.true,rating.gte.4.5')
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setRestaurants(null);
        } else {
          setRestaurants(data || []);
        }
        setLoading(false);
      });
  }, []);

  return { restaurants, loading, error };
} 