import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { ProgressScreen } from '@/components/rork/Progress';

const ProgressScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d.toISOString().slice(0, 10);
    }).reverse();

    (async () => {
      try {
        const { data, error } = await supabase
          .from('user_nutrition_log')
          .select('date, meal:meals(calories, protein, carbs, fats)')
          .eq('user_id', user.id)
          .in('date', days);
        if (error) throw error;
        // Group by date and sum macros
        const byDate: Record<string, { calories: number; protein: number; carbs: number; fats: number }> = {};
        for (const d of days) {
          byDate[d] = { calories: 0, protein: 0, carbs: 0, fats: 0 };
        }
        (data || []).forEach((entry) => {
          const d = entry.date;
          const meal = entry.meal || {};
          if (byDate[d]) {
            byDate[d].calories += meal.calories || 0;
            byDate[d].protein += meal.protein || 0;
            byDate[d].carbs += meal.carbs || 0;
            byDate[d].fats += meal.fats || 0;
          }
        });
        setProgress(
          days.map((d) => ({
            date: d,
            calories: byDate[d].calories,
            protein: byDate[d].protein,
            carbs: byDate[d].carbs,
            fats: byDate[d].fats,
          }))
        );
        setLoading(false);
      } catch (e: any) {
        setError('Failed to load progress.');
        setLoading(false);
      }
    })();
  }, [user?.id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return <ProgressScreen progress={progress} />;
};

export default ProgressScreenWrapper; 