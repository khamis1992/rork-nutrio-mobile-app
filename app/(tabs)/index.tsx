import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Search, ChevronDown, Bell, Heart, Star, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/stores/auth-store';
import { useSubscriptionStore } from '@/stores/subscription-store';

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'vegan', name: 'Vegan', icon: '🌱' },
    { id: 'chef', name: "Chef's Special", icon: '👨‍🍳' },
    { id: 'menu', name: 'My Menu', icon: '🍽️' },
    { id: 'fitness', name: 'Nutrio Fitness', icon: '💪' },
  ];

  const nutritionSummary = {
    calories: subscription ? '620' : '0',
    protein: subscription ? '45g' : '0g',
    carbs: subscription ? '70g' : '0g',
    fats: subscription ? '15g' : '0g',
  };

  const recommendedMeals = [
    {
      id: '101',
      name: 'Salad Bowl',
      restaurant: 'Fit Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.9,
      reviews: 8,
      calories: 320,
      protein: 15,
      carbs: 25,
      fat: 12,
      tags: ['Keto', 'High Protein'],
    },
    {
      id: '102',
      name: 'Protein Smoothie',
      restaurant: 'Fit Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      reviews: 6,
      calories: 250,
      protein: 25,
      carbs: 30.5,
      fat: 5.5,
      tags: [],
    },
    {
      id: '103',
      name: 'Grilled Salmon Salad',
      restaurant: 'Green Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      rating: 4.8,
      reviews: 130,
      calories: 320,
      protein: 28,
      carbs: 15,
      fat: 18,
      tags: ['High Protein', 'Low Fat'],
    },
    {
      id: '104',
      name: 'Protein Power Bowl',
      restaurant: 'Fit Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.7,
      reviews: 55,
      calories: 400,
      protein: 35,
      carbs: 45,
      fat: 12,
      tags: ['High Protein'],
    },
    {
      id: '105',
      name: 'Vegan Buddha Bowl',
      restaurant: 'Pure Veggie',
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      rating: 4.6,
      reviews: 84,
      calories: 280,
      protein: 14,
      carbs: 35,
      fat: 10,
      tags: ['Vegan', 'Gluten Free'],
    },
  ];

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAddMeal = (mealId: string) => {
    const meal = recommendedMeals.find(m => m.id === mealId);
    if (meal) {
      router.push("/subscription");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/96/null/sprout.png' }}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.logoText}>Nutrio</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push("/profile")}>
            <Text style={styles.avatarText}>T</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome, {user?.name || 'Test'}!</Text>
        <Text style={styles.welcomeSubtitle}>Find and order healthy meals for your diet</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals..."
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <ChevronDown size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* No Active Meal Plan Card */}
      {!subscription && (
        <View style={styles.noSubscriptionCard}>
          <Text style={styles.noSubscriptionTitle}>No Active Meal Plan</Text>
          <Text style={styles.noSubscriptionText}>
            You don't have an active meal plan subscription. Subscribe to get delicious, healthy meals delivered to your door.
          </Text>
          <Link href="/subscription" asChild>
            <Button 
              title="Start a Meal Plan" 
              style={styles.startPlanButton} 
              textStyle={styles.startPlanButtonText}
            />
          </Link>
        </View>
      )}

      {/* Today's Nutrition */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Nutrition</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Details</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <View style={styles.nutritionIcon}>
            <Text style={styles.nutritionEmoji}>🔥</Text>
          </View>
          <Text style={styles.nutritionValue}>{nutritionSummary.calories}</Text>
          <Text style={styles.nutritionLabel}>Calories</Text>
        </View>
        <View style={styles.nutritionItem}>
          <View style={styles.nutritionIcon}>
            <Text style={styles.nutritionEmoji}>🍗</Text>
          </View>
          <Text style={styles.nutritionValue}>{nutritionSummary.protein}</Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
        </View>
        <View style={styles.nutritionItem}>
          <View style={styles.nutritionIcon}>
            <Text style={styles.nutritionEmoji}>🍚</Text>
          </View>
          <Text style={styles.nutritionValue}>{nutritionSummary.carbs}</Text>
          <Text style={styles.nutritionLabel}>Carbs</Text>
        </View>
        <View style={styles.nutritionItem}>
          <View style={styles.nutritionIcon}>
            <Text style={styles.nutritionEmoji}>🥑</Text>
          </View>
          <Text style={styles.nutritionValue}>{nutritionSummary.fats}</Text>
          <Text style={styles.nutritionLabel}>Fats</Text>
        </View>
      </View>

      {/* Recommended For You */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Surprise Me</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Meal Cards - Updated to match design */}
      <View style={styles.mealGrid}>
        {recommendedMeals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={styles.mealImageContainer}>
              <Image
                source={{ uri: meal.imageUrl }}
                style={styles.mealImage}
                contentFit="cover"
              />
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(meal.id)}
              >
                <Heart 
                  size={20} 
                  color={colors.white} 
                  fill={favorites.includes(meal.id) ? colors.secondary : 'transparent'} 
                />
              </TouchableOpacity>
              
              {meal.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {meal.tags.slice(0, 2).map((tag, index) => {
                    const tagKey = tag.toLowerCase().replace(' ', '');
                    return (
                      <View 
                        key={index} 
                        style={[
                          styles.tagBadge, 
                          { 
                            backgroundColor: colors.tagBackground[tagKey as keyof typeof colors.tagBackground] || colors.primaryLight,
                          }
                        ]}
                      >
                        <Text 
                          style={[
                            styles.tagText,
                            {
                              color: colors.tagText[tagKey as keyof typeof colors.tagText] || colors.primary,
                            }
                          ]}
                        >
                          {tag}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            
            <View style={styles.mealContent}>
              <View style={styles.mealHeader}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={colors.secondary} fill={colors.secondary} />
                  <Text style={styles.ratingText}>{meal.rating.toFixed(1)}</Text>
                  <Text style={styles.reviewCount}>({meal.reviews})</Text>
                </View>
              </View>
              
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.restaurantName}>by {meal.restaurant}</Text>
              
              <View style={styles.nutritionDetails}>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionDetailLabel}>Calories:</Text>
                  <Text style={styles.nutritionDetailValue}>{meal.calories}</Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionDetailLabel}>Protein:</Text>
                  <Text style={styles.nutritionDetailValue}>{meal.protein}g</Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionDetailLabel}>Carbs:</Text>
                  <Text style={styles.nutritionDetailValue}>{meal.carbs}g</Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text style={styles.nutritionDetailLabel}>Fat:</Text>
                  <Text style={styles.nutritionDetailValue}>{meal.fat}g</Text>
                </View>
              </View>
              
              <View style={styles.mealActions}>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => handleAddMeal(meal.id)}
                >
                  <Text style={styles.addButtonText}>+ Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Featured Partners */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Partners</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>View All</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.emptyPartnersContainer}>
        <Text style={styles.emptyPartnersText}>No featured restaurants yet</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background to match the design
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: theme.spacing.md,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff6347', // Orange-red color for avatar
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary, // Green color to match the design
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e9', // Light green background to match the design
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  noSubscriptionCard: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noSubscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: theme.spacing.sm,
  },
  noSubscriptionText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: theme.spacing.md,
  },
  startPlanButton: {
    backgroundColor: '#ffab40', // Orange color to match the design
    borderColor: '#ffab40',
  },
  startPlanButtonText: {
    color: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 2,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e9', // Light green background to match the design
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  nutritionEmoji: {
    fontSize: 20,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  // Updated meal grid layout to match design
  mealGrid: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealCard: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    width: '48%', // Two columns with small gap
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mealImageContainer: {
    position: 'relative',
  },
  mealImage: {
    width: '100%',
    height: 120,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    left: theme.spacing.xs,
    flexDirection: 'row',
  },
  tagBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginRight: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  mealContent: {
    padding: theme.spacing.sm,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  mealName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  restaurantName: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 10,
    color: colors.textLight,
    marginLeft: 2,
  },
  nutritionDetails: {
    marginBottom: theme.spacing.xs,
  },
  nutritionRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  nutritionDetailLabel: {
    fontSize: 10,
    color: colors.textLight,
    width: 50,
  },
  nutritionDetailValue: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text,
  },
  mealActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailsButtonText: {
    fontSize: 12,
    color: colors.textLight,
  },
  addButton: {
    backgroundColor: '#00c853', // Green color to match the design
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  emptyPartnersContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyPartnersText: {
    fontSize: 14,
    color: colors.textLight,
  },
});