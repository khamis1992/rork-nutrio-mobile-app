import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Star, MapPin, Clock, ChevronLeft, Plus } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { MealCard } from '@/components/MealCard';
import { Button } from '@/components/Button';
import { restaurants } from '@/mocks/restaurants';
import { meals } from '@/mocks/meals';
import { useSubscriptionStore } from '@/stores/subscription-store';

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const restaurant = restaurants.find(r => r.id === id);
  const restaurantMeals = meals.filter(meal => meal.restaurantId === id);
  
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const addMeal = useSubscriptionStore(state => state.addMeal);
  
  if (!restaurant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Restaurant not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleAddMeal = (mealId: string) => {
    const meal = meals.find(m => m.id === mealId);
    if (meal) {
      addMeal(meal);
      
      if (!selectedMeals.includes(mealId)) {
        setSelectedMeals([...selectedMeals, mealId]);
        Alert.alert(
          "Meal Added",
          "This meal has been added to your selection. Go to the subscription page to complete your order.",
          [
            { text: "Continue Shopping", style: "cancel" },
            { text: "Go to Subscription", onPress: () => router.push("/subscription") }
          ]
        );
      }
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: restaurant.name,
          headerBackTitle: "Restaurants",
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.secondary} fill={colors.secondary} />
              <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MapPin size={16} color={colors.textLight} />
              <Text style={styles.infoText}>{restaurant.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color={colors.textLight} />
              <Text style={styles.infoText}>{restaurant.openingHours}</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {restaurant.cuisineType.split(',').map((cuisine, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{cuisine.trim()}</Text>
              </View>
            ))}
            <View style={styles.tag}>
              <Text style={styles.tagText}>{restaurant.priceRange}</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{restaurant.description}</Text>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Meals</Text>
        </View>
        
        {restaurantMeals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            onAddPress={() => handleAddMeal(meal.id)}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  image: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h2,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryLight,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  rating: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
    color: colors.secondary,
  },
  infoContainer: {
    marginBottom: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
    color: colors.textLight,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  tag: {
    backgroundColor: colors.card,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  tagText: {
    ...theme.typography.caption,
    color: colors.text,
  },
  description: {
    ...theme.typography.body,
    lineHeight: 24,
  },
  sectionHeader: {
    padding: theme.spacing.lg,
    paddingBottom: 0,
  },
  sectionTitle: {
    ...theme.typography.h3,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  notFoundText: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.lg,
  },
});