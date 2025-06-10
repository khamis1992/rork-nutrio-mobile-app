import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  Plus,
  Flame,
  Zap,
  Droplets,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NutritionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const macroData = [
    { name: 'Calories', value: 1847, goal: 2200, color: '#EF4444', icon: Flame },
    { name: 'Protein', value: 89, goal: 120, color: '#8B5CF6', icon: Zap },
    { name: 'Carbs', value: 156, goal: 200, color: '#F59E0B', icon: TrendingUp },
    { name: 'Fat', value: 67, goal: 80, color: '#06B6D4', icon: Droplets },
  ];

  const recentMeals = [
    {
      id: 1,
      name: 'Greek Yogurt Bowl',
      time: '8:30 AM',
      calories: 320,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Quinoa Salad',
      time: '12:45 PM',
      calories: 450,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Grilled Chicken',
      time: '7:20 PM',
      calories: 380,
      image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
    },
  ];

  const suggestedMeals = [
    {
      id: 1,
      name: 'Avocado Toast',
      calories: 280,
      prepTime: '5 min',
      image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      tags: ['Healthy', 'Quick'],
    },
    {
      id: 2,
      name: 'Protein Smoothie',
      calories: 320,
      prepTime: '3 min',
      image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      tags: ['Post-workout', 'High Protein'],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search foods, recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Macro Overview */}
      <View style={styles.macroContainer}>
        <Text style={styles.sectionTitle}>Today's Macros</Text>
        <View style={styles.macroGrid}>
          {macroData.map((macro, index) => {
            const IconComponent = macro.icon;
            const percentage = (macro.value / macro.goal) * 100;
            
            return (
              <View key={index} style={styles.macroCard}>
                <View style={styles.macroHeader}>
                  <IconComponent size={20} color={macro.color} />
                  <Text style={styles.macroName}>{macro.name}</Text>
                </View>
                <Text style={styles.macroValue}>
                  {macro.value}
                  <Text style={styles.macroGoal}>/{macro.goal}</Text>
                </Text>
                <View style={styles.macroProgressBar}>
                  <View
                    style={[
                      styles.macroProgress,
                      { width: `${Math.min(percentage, 100)}%`, backgroundColor: macro.color },
                    ]}
                  />
                </View>
                <Text style={styles.macroPercentage}>{percentage.toFixed(0)}%</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Meals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Meals</Text>
        {recentMeals.map((meal) => (
          <TouchableOpacity key={meal.id} style={styles.mealCard}>
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>{meal.rating}</Text>
                </View>
              </View>
              <View style={styles.mealDetails}>
                <View style={styles.mealDetail}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <View style={styles.mealDetail}>
                  <Flame size={14} color="#EF4444" />
                  <Text style={styles.mealCalories}>{meal.calories} cal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Suggested Meals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested for You</Text>
        {suggestedMeals.map((meal) => (
          <TouchableOpacity key={meal.id} style={styles.suggestionCard}>
            <Image source={{ uri: meal.image }} style={styles.suggestionImage} />
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionName}>{meal.name}</Text>
              <View style={styles.suggestionDetails}>
                <Text style={styles.suggestionCalories}>{meal.calories} cal</Text>
                <Text style={styles.suggestionDot}>•</Text>
                <Text style={styles.suggestionTime}>{meal.prepTime}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>{meal.rating}</Text>
                </View>
              </View>
              <View style={styles.tagsContainer}>
                {meal.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.addMealButton}>
              <Plus size={20} color="#10B981" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  macroContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  macroCard: {
    width: (width - 56) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  macroName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  macroValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  macroGoal: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  macroProgressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginBottom: 8,
  },
  macroProgress: {
    height: '100%',
    borderRadius: 3,
  },
  macroPercentage: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryButtonActive: {
    backgroundColor: '#10B981',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  mealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  mealTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  mealCalories: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  suggestionImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  suggestionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionCalories: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  suggestionDot: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
  suggestionTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  addMealButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});