import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Meal } from '@/types/meal';

export function useMeals(restaurantId: string) {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    setLoading(true);
    setError(null);
    supabase
      .from('meals')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('available', true)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setMeals(null);
        } else {
          setMeals(data || []);
        }
        setLoading(false);
      });
  }, [restaurantId]);

  return { meals, loading, error };
} 