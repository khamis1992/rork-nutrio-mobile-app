import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RestaurantsScreen } from '@/components/rork/Restaurants';
import { useRestaurants } from '@/hooks/useRestaurants';

const RestaurantsScreenWrapper: React.FC = () => {
  const { restaurants, loading, error } = useRestaurants();

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
        <Text>Failed to load restaurants.</Text>
      </View>
    );
  }

  return <RestaurantsScreen restaurants={restaurants || []} />;
};

export default RestaurantsScreenWrapper; 