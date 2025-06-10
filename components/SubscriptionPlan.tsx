import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';

interface SubscriptionPlanProps {
  title: string;
  price: number;
  period: string;
  features: string[];
  isSelected: boolean;
  onSelect: () => void;
  style?: ViewStyle;
}

export function SubscriptionPlan({
  title,
  price,
  period,
  features,
  isSelected,
  onSelect,
  style,
}: SubscriptionPlanProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        style,
      ]}
      onPress={onSelect}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.period}>/{period}</Text>
        </View>
      </View>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Check size={16} color={colors.primary} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.selector, isSelected && styles.selectedSelector]}>
        {isSelected && <View style={styles.innerSelector} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    ...theme.shadows.small,
  },
  selectedContainer: {
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    ...theme.typography.h2,
    color: colors.primary,
  },
  period: {
    ...theme.typography.bodySmall,
    color: colors.textLight,
    marginBottom: 4,
  },
  featuresContainer: {
    marginBottom: theme.spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
  },
  selector: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSelector: {
    borderColor: colors.primary,
  },
  innerSelector: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});