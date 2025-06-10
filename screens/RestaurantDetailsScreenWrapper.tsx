import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useMeals } from '@/hooks/useMeals';
import { useRoute } from '@react-navigation/native';
import RestaurantDetailsScreen from '@/components/rork/RestaurantDetails';

const RestaurantDetailsScreenWrapper: React.FC = () => {
  const route = useRoute<any>();
  const restaurantId = route.params?.restaurantId;
  const { meals, loading, error } = useMeals(restaurantId);

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
        <Text>Failed to load meals.</Text>
      </View>
    );
  }

  return <RestaurantDetailsScreen meals={meals || []} />;
};

export default RestaurantDetailsScreenWrapper; 