import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/stores/auth-store';
import { useSubscriptionStore } from '@/stores/subscription-store';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysLeft = (endDateString: string) => {
    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <Image
          source={{ uri: user?.profileImageUrl }}
          style={styles.profileImage}
          contentFit="cover"
          web={{ fetchpriority: 'auto' }}
        />
      </View>

      {subscription ? (
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Text style={styles.subscriptionTitle}>Active Subscription</Text>
            <View style={styles.subscriptionBadge}>
              <Text style={styles.subscriptionBadgeText}>
                {getDaysLeft(subscription.endDate)} days left
              </Text>
            </View>
          </View>

          <View style={styles.subscriptionDetails}>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Plan:</Text>
              <Text style={styles.subscriptionValue}>
                {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
              </Text>
            </View>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Gym Access:</Text>
              <Text style={styles.subscriptionValue}>
                {subscription.includesGym ? 'Included' : 'Not Included'}
              </Text>
            </View>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Valid Until:</Text>
              <Text style={styles.subscriptionValue}>
                {formatDate(subscription.endDate)}
              </Text>
            </View>
          </View>

          <Link href="/subscription" asChild>
            <Button 
              title="Manage Subscription" 
              variant="outline" 
              style={styles.manageButton}
            />
          </Link>
        </View>
      ) : (
        <View style={styles.noSubscriptionCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
            style={styles.noSubscriptionImage}
            contentFit="cover"
            web={{ fetchpriority: 'auto' }}
          />
          <Text style={styles.noSubscriptionTitle}>No Active Subscription</Text>
          <Text style={styles.noSubscriptionText}>
            Subscribe to healthy meal plans from top restaurants and get optional gym access.
          </Text>
          <Link href="/subscription" asChild>
            <Button title="Get Started" style={styles.getStartedButton} />
          </Link>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>

      <View style={styles.quickActions}>
        <Link href="/restaurants" asChild>
          <TouchableOpacity style={styles.quickActionCard}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primaryLight }]}>
              <Utensils size={24} color={colors.primary} />
            </View>
            <Text style={styles.quickActionTitle}>Browse Restaurants</Text>
            <ArrowRight size={16} color={colors.textLight} />
          </TouchableOpacity>
        </Link>

        <Link href="/gyms" asChild>
          <TouchableOpacity style={styles.quickActionCard}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.secondaryLight }]}>
              <Dumbbell size={24} color={colors.secondary} />
            </View>
            <Text style={styles.quickActionTitle}>Explore Gyms</Text>
            <ArrowRight size={16} color={colors.textLight} />
          </TouchableOpacity>
        </Link>
      </View>

      {subscription && subscription.meals.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Meals</Text>
            <Link href="/meals" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.upcomingMeals}>
            {subscription.meals.slice(0, 2).map((meal, index) => (
              <View key={index} style={styles.mealCard}>
                <View style={styles.mealDateContainer}>
                  <Calendar size={16} color={colors.primary} />
                  <Text style={styles.mealDate}>{formatDate(meal.date)}</Text>
                </View>
                <View style={styles.mealStatusContainer}>
                  <CheckCircle size={16} color={colors.success} />
                  <Text style={styles.mealStatus}>{meal.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

import { Utensils, Dumbbell } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    ...theme.typography.body,
    color: colors.textLight,
  },
  name: {
    ...theme.typography.h2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subscriptionCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  subscriptionTitle: {
    ...theme.typography.h3,
  },
  subscriptionBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  subscriptionBadgeText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  subscriptionDetails: {
    marginBottom: theme.spacing.lg,
  },
  subscriptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  subscriptionLabel: {
    ...theme.typography.body,
    color: colors.textLight,
  },
  subscriptionValue: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  manageButton: {
    marginTop: theme.spacing.sm,
  },
  noSubscriptionCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  noSubscriptionImage: {
    width: '100%',
    height: 160,
  },
  noSubscriptionTitle: {
    ...theme.typography.h3,
    margin: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  noSubscriptionText: {
    ...theme.typography.body,
    color: colors.textLight,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  getStartedButton: {
    margin: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
  },
  seeAllText: {
    ...theme.typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: theme.spacing.xl,
  },
  quickActionCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  quickActionTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    flex: 1,
  },
  upcomingMeals: {
    marginBottom: theme.spacing.xl,
  },
  mealCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  mealDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealDate: {
    ...theme.typography.body,
    marginLeft: theme.spacing.xs,
  },
  mealStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealStatus: {
    ...theme.typography.bodySmall,
    color: colors.success,
    marginLeft: theme.spacing.xs,
    textTransform: 'capitalize',
  },
});