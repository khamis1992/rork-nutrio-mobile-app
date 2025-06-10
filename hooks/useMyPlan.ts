import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useMyPlan(userId: string) {
  const [plan, setPlan] = useState<{
    planType: 'daily' | 'weekly' | 'monthly';
    startDate: string;
    endDate: string;
    meals: {
      id: string;
      name: string;
      image_url: string;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    (async () => {
      // Fetch active subscription
      const { data: sub, error: subError } = await supabase
        .from('subscriptions')
        .select('id, plan_type, start_date, end_date')
        .eq('user_id', userId)
        .eq('active', true)
        .single();
      if (subError || !sub) {
        setError('No active plan found.');
        setPlan(null);
        setLoading(false);
        return;
      }
      // Fetch meals for this subscription from join table
      const { data: subMeals, error: subMealsError } = await supabase
        .from('subscription_meals')
        .select('meal_id')
        .eq('subscription_id', sub.id);
      if (subMealsError) {
        setError('Failed to load meals.');
        setPlan(null);
        setLoading(false);
        return;
      }
      const mealIds = (subMeals || []).map((sm) => sm.meal_id);
      let meals = [];
      if (mealIds.length > 0) {
        const { data: mealsData, error: mealsError } = await supabase
          .from('meals')
          .select('id, name, image_url, calories, protein, carbs, fats')
          .in('id', mealIds);
        if (mealsError) {
          setError('Failed to load meals.');
          setPlan(null);
          setLoading(false);
          return;
        }
        meals = mealsData || [];
      }
      setPlan({
        planType: sub.plan_type,
        startDate: sub.start_date,
        endDate: sub.end_date,
        meals,
      });
      setLoading(false);
    })();
  }, [userId]);

  return { plan, loading, error };
} 