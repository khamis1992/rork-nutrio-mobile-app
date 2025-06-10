import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  style?: ViewStyle;
}

export function RestaurantCard({ restaurant, onPress, style }: RestaurantCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: restaurant.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
        web={{ fetchPriority: 'auto' }}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.location}>{restaurant.location}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color={colors.secondary} fill={colors.secondary} />
          <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    height: 160,
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs,
  },
  location: {
    ...theme.typography.bodySmall,
    color: colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
});

export { RestaurantCard }