import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Plus } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Meal } from '@/types/meal';

interface MealCardProps {
  meal: Meal;
  onAddPress: () => void;
  style?: ViewStyle;
}

export function MealCard({ meal, onAddPress, style }: MealCardProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: meal.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
        web={{ fetchPriority: 'auto' }}
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{meal.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{meal.description}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.calories}>{meal.calories} cal</Text>
            <Text style={styles.price}>${meal.price.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={onAddPress}
          activeOpacity={0.8}
        >
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
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
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: theme.spacing.md,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  name: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.bodySmall,
    color: colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calories: {
    ...theme.typography.caption,
    color: colors.textLight,
  },
  price: {
    ...theme.typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});