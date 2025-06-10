import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Gym } from '@/types/gym';

interface GymCardProps {
  gym: Gym;
  hasAccess?: boolean;
  accessUntil?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function GymCard({ 
  gym, 
  hasAccess = false, 
  accessUntil, 
  onPress, 
  style 
}: GymCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: gym.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      {hasAccess && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Access until {accessUntil}
          </Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{gym.name}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={colors.textLight} />
          <Text style={styles.location}>{gym.location}</Text>
        </View>
        <Text style={styles.amenities} numberOfLines={1}>
          {gym.amenities.join(' • ')}
        </Text>
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
  badge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  location: {
    ...theme.typography.bodySmall,
    color: colors.textLight,
    marginLeft: theme.spacing.xs,
  },
  amenities: {
    ...theme.typography.caption,
    color: colors.textLight,
  },
});