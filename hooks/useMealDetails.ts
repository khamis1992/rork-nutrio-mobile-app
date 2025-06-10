import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useMealDetails(mealId: string) {
  const [meal, setMeal] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mealId) return;
    setLoading(true);
    setError(null);
    supabase
      .from('meals')
      .select('id, name, image_url, description, calories, protein, carbs, fats, vendor, tags, price, restaurant_id')
      .eq('id', mealId)
      .single()
      .then(async ({ data, error }) => {
        if (error || !data) {
          setError('Failed to load meal details.');
          setMeal(null);
          setRestaurant(null);
        } else {
          setMeal(data);
          if (data.restaurant_id) {
            const { data: rest, error: restError } = await supabase
              .from('restaurants')
              .select('id, name, image_url, rating, location')
              .eq('id', data.restaurant_id)
              .single();
            setRestaurant(restError ? null : rest);
          } else {
            setRestaurant(null);
          }
        }
        setLoading(false);
      });
  }, [mealId]);

  return { meal, restaurant, loading, error };
} 