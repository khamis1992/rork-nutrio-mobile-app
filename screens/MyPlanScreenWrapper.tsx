import React from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { useMyPlan } from '@/hooks/useMyPlan';
import { MyPlanScreen } from '@/components/rork/MyPlan';
import { supabase } from '@/lib/supabase';

const MyPlanScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { plan, loading, error } = useMyPlan(user?.id || '');

  const onRemoveMeal = async (mealId: string) => {
    if (!plan) return;
    // Remove meal from subscription_meals join table
    const { error } = await supabase
      .from('subscription_meals')
      .delete()
      .eq('subscription_id', plan.id)
      .eq('meal_id', mealId);
    if (error) {
      Alert.alert('Error', 'Failed to remove meal from plan.');
    } else {
      Alert.alert('Removed', 'Meal removed from your plan.');
      // Optionally, refetch plan here
    }
  };

  const onSwapMeal = (mealId: string) => {
    navigation.navigate('MealSelector', { mealId, subscriptionId: plan?.id });
  };

  const onViewMeal = (mealId: string) => {
    navigation.navigate('MealDetails', { mealId });
  };

  const onChangePlan = () => {
    navigation.navigate('Subscription');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !plan || !plan.meals || plan.meals.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error || 'No plan or meals found.'}</Text>
      </View>
    );
  }

  return (
    <MyPlanScreen
      planType={plan.planType}
      startDate={plan.startDate}
      endDate={plan.endDate}
      meals={plan.meals}
      onRemoveMeal={onRemoveMeal}
      onSwapMeal={onSwapMeal}
      onViewMeal={onViewMeal}
      onChangePlan={onChangePlan}
    />
  );
};

export default MyPlanScreenWrapper; 