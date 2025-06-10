import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useMyPlan } from '@/hooks/useMyPlan';
import { MyPlanScreen } from '@/components/rork/MyPlan';

const MyPlanScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const { plan, loading, error } = useMyPlan(user?.id || '');

  const onRemoveMeal = (mealId: string) => {
    // TODO: Implement remove meal from plan
  };

  const onViewMeal = (mealId: string) => {
    // TODO: Implement navigation to meal details
  };

  const onChangePlan = () => {
    // TODO: Implement navigation to change plan
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !plan) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error || 'No plan found.'}</Text>
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
      onViewMeal={onViewMeal}
      onChangePlan={onChangePlan}
    />
  );
};

export default MyPlanScreenWrapper; 