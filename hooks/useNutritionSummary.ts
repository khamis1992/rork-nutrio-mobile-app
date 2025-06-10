import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useNutritionSummary(userId: string) {
  const [summary, setSummary] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    supabase
      .from('user_nutrition_log')
      .select('calories, protein, carbs, fats')
      .eq('user_id', userId)
      .eq('date', today)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setSummary({ calories: 0, protein: 0, carbs: 0, fats: 0 });
        } else {
          const totals = (data || []).reduce(
            (acc, entry) => ({
              calories: acc.calories + (entry.calories || 0),
              protein: acc.protein + (entry.protein || 0),
              carbs: acc.carbs + (entry.carbs || 0),
              fats: acc.fats + (entry.fats || 0),
            }),
            { calories: 0, protein: 0, carbs: 0, fats: 0 }
          );
          setSummary(totals);
        }
        setLoading(false);
      });
  }, [userId]);

  return { ...summary, loading, error };
} 