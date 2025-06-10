import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Switch, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Button } from '@/components/Button';
import { SubscriptionPlan } from '@/components/SubscriptionPlan';
import { useSubscriptionStore } from '@/stores/subscription-store';

export default function SubscriptionScreen() {
  const router = useRouter();
  const { 
    selectedPlan, 
    includesGym, 
    selectedMeals,
    setSelectedPlan,
    toggleGymAccess,
    removeMeal,
    createSubscription,
    isLoading,
    error
  } = useSubscriptionStore();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [selectedPlan, includesGym, selectedMeals]);

  const calculateTotal = () => {
    let total = 0;
    
    // Plan base price
    if (selectedPlan === 'daily') {
      total += 19.99;
    } else if (selectedPlan === 'weekly') {
      total += 99.99;
    } else if (selectedPlan === 'monthly') {
      total += 349.99;
    }
    
    // Gym access
    if (includesGym) {
      if (selectedPlan === 'daily') {
        total += 9.99;
      } else if (selectedPlan === 'weekly') {
        total += 39.99;
      } else if (selectedPlan === 'monthly') {
        total += 99.99;
      }
    }
    
    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    if (!selectedPlan) {
      Alert.alert("Error", "Please select a subscription plan");
      return;
    }
    
    if (selectedMeals.length === 0) {
      Alert.alert("Error", "Please add at least one meal to your subscription");
      return;
    }
    
    try {
      await createSubscription();
      Alert.alert(
        "Success",
        "Your subscription has been created successfully!",
        [{ text: "OK", onPress: () => router.push("/") }]
      );
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Subscription</Text>
        <Text style={styles.subtitle}>
          Choose your plan and customize your healthy meal subscription
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Plan</Text>
        <SubscriptionPlan
          title="Daily Plan"
          price={19.99}
          period="day"
          features={[
            "1 meal per day",
            "Change restaurants anytime",
            "Cancel anytime",
          ]}
          isSelected={selectedPlan === 'daily'}
          onSelect={() => setSelectedPlan('daily')}
        />
        
        <SubscriptionPlan
          title="Weekly Plan"
          price={99.99}
          period="week"
          features={[
            "7 meals per week",
            "Save 28% compared to daily",
            "Flexible delivery schedule",
            "Cancel anytime",
          ]}
          isSelected={selectedPlan === 'weekly'}
          onSelect={() => setSelectedPlan('weekly')}
        />
        
        <SubscriptionPlan
          title="Monthly Plan"
          price={349.99}
          period="month"
          features={[
            "30 meals per month",
            "Save 42% compared to daily",
            "Priority selection",
            "Exclusive recipes",
            "Cancel anytime",
          ]}
          isSelected={selectedPlan === 'monthly'}
          onSelect={() => setSelectedPlan('monthly')}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.gymAccessContainer}>
          <View>
            <Text style={styles.sectionTitle}>Add Gym Access</Text>
            <Text style={styles.gymAccessText}>
              Get access to all partner gyms with your meal subscription
            </Text>
          </View>
          <Switch
            value={includesGym}
            onValueChange={toggleGymAccess}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={includesGym ? colors.primary : colors.card}
          />
        </View>
        
        {includesGym && (
          <View style={styles.gymPricing}>
            <Text style={styles.gymPricingText}>
              {selectedPlan === 'daily' ? '+$9.99/day' : 
               selectedPlan === 'weekly' ? '+$39.99/week' : 
               selectedPlan === 'monthly' ? '+$99.99/month' : ''}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Meals</Text>
        
        {selectedMeals.length === 0 ? (
          <View style={styles.emptyMealsContainer}>
            <Text style={styles.emptyMealsText}>
              No meals selected yet. Browse restaurants to add meals to your subscription.
            </Text>
            <Button 
              title="Browse Restaurants" 
              onPress={() => router.push("/restaurants")}
              style={styles.browseButton}
            />
          </View>
        ) : (
          <>
            {selectedMeals.map(meal => (
              <View key={meal.id} style={styles.mealCard}>
                <Image
                  source={{ uri: meal.imageUrl }}
                  style={styles.mealImage}
                  contentFit="cover"
                />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealCalories}>{meal.calories} cal</Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeMeal(meal.id)}
                >
                  <Trash2 size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            
            <Button 
              title="Add More Meals" 
              variant="outline"
              onPress={() => router.push("/restaurants")}
              style={styles.addMoreButton}
            />
          </>
        )}
      </View>

      {selectedPlan && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>
              {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
            </Text>
            <Text style={styles.summaryValue}>
              ${selectedPlan === 'daily' ? '19.99' : 
                selectedPlan === 'weekly' ? '99.99' : '349.99'}
            </Text>
          </View>
          
          {includesGym && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Gym Access</Text>
              <Text style={styles.summaryValue}>
                ${selectedPlan === 'daily' ? '9.99' : 
                  selectedPlan === 'weekly' ? '39.99' : '99.99'}
              </Text>
            </View>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <Button
            title="Complete Subscription"
            onPress={handleCheckout}
            loading={isLoading}
            style={styles.checkoutButton}
          />
        </View>
      )}
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
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: colors.textLight,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  gymAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  gymAccessText: {
    ...theme.typography.bodySmall,
    color: colors.textLight,
    maxWidth: '80%',
  },
  gymPricing: {
    backgroundColor: colors.primaryLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  gymPricingText: {
    ...theme.typography.body,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyMealsContainer: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyMealsText: {
    ...theme.typography.body,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  browseButton: {
    width: '100%',
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  mealImage: {
    width: 80,
    height: 80,
  },
  mealInfo: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  mealName: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  mealCalories: {
    ...theme.typography.bodySmall,
    color: colors.textLight,
  },
  removeButton: {
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  addMoreButton: {
    marginTop: theme.spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  summaryTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    ...theme.typography.body,
  },
  summaryValue: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: theme.spacing.md,
  },
  totalLabel: {
    ...theme.typography.h4,
  },
  totalValue: {
    ...theme.typography.h3,
    color: colors.primary,
  },
  errorText: {
    color: colors.error,
    marginVertical: theme.spacing.md,
    textAlign: 'center',
  },
  checkoutButton: {
    marginTop: theme.spacing.lg,
  },
});