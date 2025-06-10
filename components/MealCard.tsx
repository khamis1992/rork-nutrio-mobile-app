import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Plus, Heart, Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Meal } from '@/types/meal';

interface MealCardProps {
  meal: Meal;
  onAddPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  style?: ViewStyle;
}

export function MealCard({ 
  meal, 
  onAddPress, 
  onFavoritePress,
  isFavorite = false,
  style 
}: MealCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: meal.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {onFavoritePress && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <Heart 
              size={20} 
              color={colors.white} 
              fill={isFavorite ? colors.secondary : 'transparent'} 
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{meal.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.secondary} fill={colors.secondary} />
            <Text style={styles.rating}>4.8</Text>
          </View>
        </View>
        <Text style={styles.restaurant}>by {meal.restaurantId}</Text>
        
        <View style={styles.nutritionInfo}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Calories:</Text>
            <Text style={styles.nutritionValue}>{meal.calories}</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Protein:</Text>
            <Text style={styles.nutritionValue}>{meal.protein}g</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Carbs:</Text>
            <Text style={styles.nutritionValue}>{meal.carbs}g</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Fat:</Text>
            <Text style={styles.nutritionValue}>{meal.fat}g</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={onAddPress}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  restaurant: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  nutritionInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.sm,
  },
  nutritionItem: {
    flexDirection: 'row',
    marginRight: theme.spacing.md,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  nutritionValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  detailsText: {
    fontSize: 14,
    color: colors.textLight,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});