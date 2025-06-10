import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { User, CreditCard, Calendar, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth-store';
import { useSubscriptionStore } from '@/stores/subscription-store';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { subscription, cancelSubscription } = useSubscriptionStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => logout() }
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your subscription? You will lose access to all benefits immediately.",
      [
        { text: "No, Keep It", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: async () => {
            await cancelSubscription();
            Alert.alert("Subscription Cancelled", "Your subscription has been cancelled successfully.");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.profileImageUrl }}
          style={styles.profileImage}
          contentFit="cover"
          web={{ fetchPriority: 'auto' }}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {subscription && (
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Current Subscription</Text>
          <View style={styles.subscriptionDetails}>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Plan:</Text>
              <Text style={styles.subscriptionValue}>
                {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
              </Text>
            </View>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Status:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Gym Access:</Text>
              <Text style={styles.subscriptionValue}>
                {subscription.includesGym ? 'Included' : 'Not Included'}
              </Text>
            </View>
            <View style={styles.subscriptionItem}>
              <Text style={styles.subscriptionLabel}>Expires:</Text>
              <Text style={styles.subscriptionValue}>
                {new Date(subscription.endDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancelSubscription}
          >
            <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <User size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <CreditCard size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Payment Methods</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Calendar size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Meal History</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Bell size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <View style={styles.menuIconContainer}>
              <LogOut size={20} color={colors.error} />
            </View>
            <Text style={[styles.menuText, { color: colors.error }]}>Logout</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body,
    color: colors.textLight,
  },
  subscriptionCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.small,
  },
  subscriptionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  subscriptionDetails: {
    marginBottom: theme.spacing.md,
  },
  subscriptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statusBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: theme.borderRadius.md,
  },
  cancelButtonText: {
    color: colors.error,
    fontWeight: '600',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  menuText: {
    ...theme.typography.body,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});