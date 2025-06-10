import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Meal } from '@/types/meal';

type MealFilter = 'all' | 'vegan' | 'chef' | 'menu' | 'fitness';

export function useRecommendedMeals(userId: string, filter: MealFilter = 'all') {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    let query = supabase
      .from('meals')
      .select('*')
      .eq('available', true);

    // Apply filters based on category
    switch (filter) {
      case 'vegan':
        query = query.eq('category', 'vegan');
        break;
      case 'chef':
        query = query.eq('featured', true); // assuming chef's special is marked as featured
        break;
      case 'menu':
        query = query.eq('user_id', userId); // user's personal menu
        break;
      case 'fitness':
        query = query.eq('category', 'fitness');
        break;
      default:
        // 'all' - no additional filter
        break;
    }

    query
      .limit(6)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setMeals(null);
        } else {
          setMeals(data || []);
        }
        setLoading(false);
      });
  }, [userId, filter]);

  return { meals, loading, error };
} 