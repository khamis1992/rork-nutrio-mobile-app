import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Calendar,
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  Flame,
  Droplets,
  Zap,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.date}>{today}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Daily Progress Card */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.progressCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <Calendar size={20} color="#FFFFFF" />
        </View>
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Flame size={24} color="#FFFFFF" />
            <Text style={styles.progressValue}>1,847</Text>
            <Text style={styles.progressLabel}>Calories</Text>
          </View>
          <View style={styles.progressStat}>
            <Droplets size={24} color="#FFFFFF" />
            <Text style={styles.progressValue}>2.1L</Text>
            <Text style={styles.progressLabel}>Water</Text>
          </View>
          <View style={styles.progressStat}>
            <Zap size={24} color="#FFFFFF" />
            <Text style={styles.progressValue}>45min</Text>
            <Text style={styles.progressLabel}>Exercise</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.actionGradient}>
              <Target size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.actionTitle}>Log Meal</Text>
            <Text style={styles.actionSubtitle}>Track your nutrition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.actionGradient}>
              <TrendingUp size={24} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.actionTitle}>Start Workout</Text>
            <Text style={styles.actionSubtitle}>Begin your session</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Meals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Meals</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#10B981" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.mealCard}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
              }}
              style={styles.mealImage}
            />
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>Avocado Toast</Text>
              <Text style={styles.mealCalories}>320 cal</Text>
            </View>
          </View>
          <View style={styles.mealCard}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
              }}
              style={styles.mealImage}
            />
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>Greek Salad</Text>
              <Text style={styles.mealCalories}>280 cal</Text>
            </View>
          </View>
          <View style={styles.mealCard}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
              }}
              style={styles.mealImage}
            />
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>Grilled Salmon</Text>
              <Text style={styles.mealCalories}>450 cal</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Weekly Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Goals</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Award size={20} color="#10B981" />
            <Text style={styles.goalTitle}>Weight Loss Goal</Text>
          </View>
          <View style={styles.goalProgress}>
            <View style={styles.goalProgressBar}>
              <View style={[styles.goalProgressFill, { width: '70%' }]} />
            </View>
            <Text style={styles.goalProgressText}>70% Complete</Text>
          </View>
          <Text style={styles.goalDescription}>
            You're doing great! Keep up the momentum.
          </Text>
        </View>
      </View>

      {/* Recommended Recipes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <TouchableOpacity style={styles.recipeCard}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
            }}
            style={styles.recipeImage}
          />
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>Quinoa Buddha Bowl</Text>
            <Text style={styles.recipeDescription}>
              High-protein, nutrient-dense meal perfect for lunch
            </Text>
            <View style={styles.recipeStats}>
              <Text style={styles.recipeStat}>25 min</Text>
              <Text style={styles.recipeStat}>•</Text>
              <Text style={styles.recipeStat}>420 cal</Text>
              <Text style={styles.recipeStat}>•</Text>
              <Text style={styles.recipeStat}>High Protein</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>
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
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  progressCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    marginRight: 4,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  mealCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  mealInfo: {
    padding: 12,
  },
  mealName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  mealCalories: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginLeft: 8,
  },
  goalProgress: {
    marginBottom: 12,
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 8,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  goalProgressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  goalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  recipeStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeStat: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginRight: 8,
  },
});