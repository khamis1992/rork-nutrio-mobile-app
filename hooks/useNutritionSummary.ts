import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export async function logMeal(userId: string, mealId: string, mealTime: string = 'lunch') {
  const today = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from('user_nutrition_log').insert([
    {
      user_id: userId,
      meal_id: mealId,
      date: today,
      meal_time: mealTime,
    },
  ]);
  return { error };
}

export function useNutritionSummary(userId: string, date?: Date) {
  const [summary, setSummary] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const targetDate = (date ? date : new Date()).toISOString().slice(0, 10); // YYYY-MM-DD
    supabase
      .from('user_nutrition_log')
      .select('meal:meals(calories, protein, carbs, fats)')
      .eq('user_id', userId)
      .eq('date', targetDate)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setSummary({ calories: 0, protein: 0, carbs: 0, fats: 0 });
        } else {
          const totals = (data || []).reduce(
            (acc, entry) => {
              const meal = entry.meal || {};
              return {
                calories: acc.calories + (meal.calories || 0),
                protein: acc.protein + (meal.protein || 0),
                carbs: acc.carbs + (meal.carbs || 0),
                fats: acc.fats + (meal.fats || 0),
              };
            },
            { calories: 0, protein: 0, carbs: 0, fats: 0 }
          );
          setSummary(totals);
        }
        setLoading(false);
      });
  }, [userId, date]);

  return { ...summary, loading, error };
} 