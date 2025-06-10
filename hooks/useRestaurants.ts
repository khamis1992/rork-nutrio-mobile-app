import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Restaurant } from '@/types/restaurant';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    supabase
      .from('restaurants')
      .select('*')
      .eq('active', true)
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

export async function addRestaurant({
  name,
  location,
  image_url,
  rating,
}: {
  name: string;
  location: string;
  image_url: string;
  rating: number;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from('restaurants').insert([
    { name, location, image_url, rating, active: true },
  ]);
  return { error: error ? error.message : null };
} 