import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { GymCard } from '@/components/GymCard';
import { gyms } from '@/mocks/gyms';
import { useSubscriptionStore } from '@/stores/subscription-store';

export default function GymsScreen() {
  const subscription = useSubscriptionStore(state => state.subscription);
  
  const handleGymPress = (gymId: string) => {
    // In a real app, this might navigate to a gym details screen
    console.log(`Gym pressed: ${gymId}`);
  };

  const hasGymAccess = subscription?.includesGym || false;
  const accessUntil = subscription?.endDate 
    ? new Date(subscription.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    : '';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gyms</Text>
        <Text style={styles.subtitle}>
          {hasGymAccess 
            ? 'Your subscription includes access to these partner gyms'
            : 'Add gym access to your meal subscription for a complete wellness package'}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search gyms by name or location"
        />
      </View>

      {!hasGymAccess && (
        <View style={styles.upgradeCard}>
          <Text style={styles.upgradeTitle}>Upgrade Your Plan</Text>
          <Text style={styles.upgradeText}>
            Add gym access to your subscription for complete fitness and nutrition.
          </Text>
          <View style={styles.upgradePricing}>
            <Text style={styles.upgradePrice}>+$9.99/day</Text>
            <Text style={styles.upgradePrice}>+$39.99/week</Text>
            <Text style={styles.upgradePrice}>+$99.99/month</Text>
          </View>
        </View>
      )}

      <FlatList
        data={gyms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GymCard
            gym={item}
            hasAccess={hasGymAccess}
            accessUntil={accessUntil}
            onPress={() => handleGymPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: colors.textLight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  upgradeCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  upgradeTitle: {
    ...theme.typography.h3,
    color: colors.primary,
    marginBottom: theme.spacing.sm,
  },
  upgradeText: {
    ...theme.typography.body,
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  upgradePricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upgradePrice: {
    ...theme.typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
});