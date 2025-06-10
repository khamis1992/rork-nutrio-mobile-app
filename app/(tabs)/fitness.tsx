import React, { useState } from 'react';
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
  Play,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Award,
  Calendar,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function FitnessScreen() {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('All');

  const workoutTypes = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT'];

  const todayStats = [
    { label: 'Calories Burned', value: '420', icon: Flame, color: '#EF4444' },
    { label: 'Active Minutes', value: '45', icon: Clock, color: '#10B981' },
    { label: 'Workouts', value: '2', icon: Target, color: '#8B5CF6' },
  ];

  const featuredWorkouts = [
    {
      id: 1,
      title: 'Morning HIIT Blast',
      duration: '20 min',
      difficulty: 'Intermediate',
      calories: '250-300',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'HIIT',
    },
    {
      id: 2,
      title: 'Full Body Strength',
      duration: '45 min',
      difficulty: 'Advanced',
      calories: '400-500',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Strength',
    },
  ];

  const quickWorkouts = [
    {
      id: 1,
      title: 'Quick Abs',
      duration: '10 min',
      image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Cardio Burst',
      duration: '15 min',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'Yoga Flow',
      duration: '20 min',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const weeklyProgress = [
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 60 },
    { day: 'Wed', value: 90 },
    { day: 'Thu', value: 70 },
    { day: 'Fri', value: 100 },
    { day: 'Sat', value: 85 },
    { day: 'Sun', value: 95 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Fitness</Text>
          <Text style={styles.subtitle}>Let's get moving today!</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <Calendar size={24} color="#10B981" />
        </TouchableOpacity>
      </View>

      {/* Today's Stats */}
      <View style={styles.statsContainer}>
        {todayStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <LinearGradient
                colors={[stat.color, stat.color + '80']}
                style={styles.statIcon}>
                <IconComponent size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Weekly Progress Chart */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <TouchableOpacity>
            <TrendingUp size={20} color="#10B981" />
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {weeklyProgress.map((day, index) => (
              <View key={index} style={styles.chartDay}>
                <View style={styles.chartBarContainer}>
                  <View
                    style={[
                      styles.chartBar,
                      { height: `${day.value}%` },
                    ]}
                  />
                </View>
                <Text style={styles.chartDayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <Text style={styles.chartLegendText}>Active Minutes</Text>
            <View style={styles.chartLegendDot} />
          </View>
        </View>
      </View>

      {/* Featured Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Workouts</Text>
        {featuredWorkouts.map((workout) => (
          <TouchableOpacity key={workout.id} style={styles.featuredCard}>
            <Image source={{ uri: workout.image }} style={styles.featuredImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.featuredOverlay}>
              <View style={styles.featuredContent}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>{workout.type}</Text>
                </View>
                <Text style={styles.featuredTitle}>{workout.title}</Text>
                <View style={styles.featuredDetails}>
                  <View style={styles.featuredDetail}>
                    <Clock size={14} color="#FFFFFF" />
                    <Text style={styles.featuredDetailText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.featuredDetail}>
                    <Target size={14} color="#FFFFFF" />
                    <Text style={styles.featuredDetailText}>{workout.difficulty}</Text>
                  </View>
                  <View style={styles.featuredDetail}>
                    <Flame size={14} color="#FFFFFF" />
                    <Text style={styles.featuredDetailText}>{workout.calories} cal</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Workout Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {workoutTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.categoryButton,
                selectedWorkoutType === type && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedWorkoutType(type)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedWorkoutType === type && styles.categoryTextActive,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Workouts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Workouts</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#10B981" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickWorkouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.quickCard}>
              <Image source={{ uri: workout.image }} style={styles.quickImage} />
              <View style={styles.quickOverlay}>
                <TouchableOpacity style={styles.quickPlayButton}>
                  <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.quickInfo}>
                <Text style={styles.quickTitle}>{workout.title}</Text>
                <Text style={styles.quickDuration}>{workout.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Achievement */}
      <View style={styles.section}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
          style={styles.achievementCard}>
          <View style={styles.achievementContent}>
            <Award size={32} color="#FFFFFF" />
            <View style={styles.achievementText}>
              <Text style={styles.achievementTitle}>Week Warrior!</Text>
              <Text style={styles.achievementDescription}>
                You've completed 5 workouts this week. Keep it up!
              </Text>
            </View>
          </View>
        </LinearGradient>
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
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
  chartContainer: {
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
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
  },
  chartDay: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarContainer: {
    height: 80,
    width: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: '100%',
  },
  chartDayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLegendText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 8,
  },
  chartLegendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  featuredCard: {
    height: 200,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  featuredTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featuredDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredDetailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryButtonActive: {
    backgroundColor: '#10B981',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  quickCard: {
    width: 140,
    marginLeft: 20,
  },
  quickImage: {
    width: '100%',
    height: 100,
    borderRadius: 16,
    marginBottom: 12,
  },
  quickOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  quickPlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickInfo: {
    paddingHorizontal: 4,
  },
  quickTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  quickDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  achievementCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementText: {
    marginLeft: 16,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
  },
});