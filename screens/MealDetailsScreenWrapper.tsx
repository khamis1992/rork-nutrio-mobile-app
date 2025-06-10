import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useMealDetails } from '@/hooks/useMealDetails';
import { MealDetailsScreen } from '@/components/rork/MealDetails';

const MealDetailsScreenWrapper: React.FC = () => {
  const route = useRoute<any>();
  const { mealId } = route.params || {};
  const { meal, loading, error } = useMealDetails(mealId);

  const onAddToLog = (id: string) => {
    // TODO: Implement add to user_nutrition_log
  };

  const onAddToPlan = (id: string) => {
    // TODO: Implement add to active subscription
  };

  const onFavorite = (id: string) => {
    // TODO: Implement favorite toggle
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error || 'Meal not found.'}</Text>
      </View>
    );
  }

  // Map meal to the expected shape
  const mappedMeal = {
    id: meal.id,
    name: meal.name || '',
    description: meal.description || '',
    image_url: meal.image_url || '',
    calories: meal.calories || 0,
    protein: meal.protein || 0,
    carbs: meal.carbs || 0,
    fats: meal.fats || 0,
    vendor: meal.vendor || '',
    tags: Array.isArray(meal.tags) ? meal.tags : [],
    rating: meal.rating || 0,
  };

  return (
    <MealDetailsScreen
      meal={mappedMeal}
      onAddToLog={onAddToLog}
      onAddToPlan={onAddToPlan}
      onFavorite={onFavorite}
    />
  );
};

export default MealDetailsScreenWrapper; 