import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { getActiveSubscription } from '@/hooks/useSubscription';
import { useRecommendedMeals } from '@/hooks/useRecommendedMeals';
import { useNutritionSummary } from '@/hooks/useNutritionSummary';
import { useFeaturedRestaurants } from '@/hooks/useFeaturedRestaurants';
import { HomeScreen } from '@/components/rork/Home';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type MealFilter = 'all' | 'vegan' | 'chef' | 'menu' | 'fitness';

const HomeScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [subscription, setSubscription] = useState<any>(null);
  const [subLoading, setSubLoading] = useState(true);
  const [subError, setSubError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<MealFilter>('all');

  const { meals, loading: mealsLoading, error: mealsError } = useRecommendedMeals(user?.id || '', activeFilter);
  const { calories, protein, carbs, fats, loading: nutritionLoading } = useNutritionSummary(user?.id || '');
  const { restaurants: featuredRestaurants, loading: featuredLoading, error: featuredError } = useFeaturedRestaurants();

  useEffect(() => {
    if (!user?.id) return;
    setSubLoading(true);
    getActiveSubscription(user.id)
      .then((sub) => {
        setSubscription(sub);
        setSubError(null);
      })
      .catch((err) => setSubError(err.message))
      .finally(() => setSubLoading(false));
  }, [user?.id]);

  const onStartPlan = useCallback(() => {
    navigation.navigate('Subscription');
  }, [navigation]);

  const onAddMeal = useCallback(async (mealId: string) => {
    if (!user?.id) return;
    const today = new Date().toISOString().slice(0, 10);
    const meal = meals?.find((m) => m.id === mealId);
    if (!meal) return;
    const { error } = await supabase.from('user_nutrition_log').insert([
      {
        user_id: user.id,
        date: today,
        meal_id: meal.id,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
      },
    ]);
    if (error) {
      Alert.alert('Error', 'Failed to add meal to log.');
    } else {
      Alert.alert('Success', 'Meal added to your log!');
    }
  }, [user?.id, meals]);

  const onViewDetails = useCallback((mealId: string) => {
    navigation.navigate('MealDetails', { mealId });
  }, [navigation]);

  const onFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter as MealFilter);
  }, []);

  const onDetails = useCallback(() => {
    navigation.navigate('NutritionDetails');
  }, [navigation]);

  const onSurpriseMe = useCallback(() => {
    if (!meals || meals.length === 0) return;
    const randomIndex = Math.floor(Math.random() * meals.length);
    const meal = meals[randomIndex];
    if (meal) {
      navigation.navigate('MealDetails', { mealId: meal.id });
    }
  }, [meals, navigation]);

  const onViewAllPartners = useCallback(() => {
    navigation.navigate('Explore');
  }, [navigation]);

  if (subLoading || mealsLoading || nutritionLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (subError || mealsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load dashboard.</Text>
      </View>
    );
  }

  const hasActivePlan = !!subscription;
  const nutritionSummary = hasActivePlan
    ? { calories, protein, carbs, fats }
    : { calories: 0, protein: 0, carbs: 0, fats: 0 };

  return (
    <HomeScreen
      userName={user?.full_name || user?.user_metadata?.full_name || user?.email || ''}
      hasActivePlan={hasActivePlan}
      onStartPlan={onStartPlan}
      nutritionSummary={nutritionSummary}
      onDetails={onDetails}
      meals={meals || []}
      onAddMeal={onAddMeal}
      onViewDetails={onViewDetails}
      activeFilter={activeFilter}
      onFilterChange={onFilterChange}
      onSurpriseMe={onSurpriseMe}
      featuredRestaurants={featuredRestaurants || []}
      featuredLoading={featuredLoading}
      featuredError={featuredError}
      onViewAllPartners={onViewAllPartners}
    />
  );
};

export default HomeScreenWrapper; 