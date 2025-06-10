import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/hooks/useAuth';
import WelcomeScreenWrapper from '@/screens/WelcomeScreenWrapper';
import LoginScreenWrapper from '@/screens/LoginScreenWrapper';
import SignupScreenWrapper from '@/screens/SignupScreenWrapper';
import HomeScreenWrapper from '@/screens/HomeScreenWrapper';
import RestaurantsScreenWrapper from '@/screens/RestaurantsScreenWrapper';
import RestaurantDetailsScreenWrapper from '@/screens/RestaurantDetailsScreenWrapper';
import GymsScreenWrapper from '@/screens/GymsScreenWrapper';
import ProfileScreenWrapper from '@/screens/ProfileScreenWrapper';
import SubscriptionScreenWrapper from '@/screens/SubscriptionScreenWrapper';
import ExploreScreenWrapper from '@/screens/ExploreScreenWrapper';
import MyPlanScreenWrapper from '@/screens/MyPlanScreenWrapper';
import FitnessScreenWrapper from '@/screens/FitnessScreenWrapper';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreenWrapper} />
      <Tab.Screen name="Explore" component={ExploreScreenWrapper} />
      <Tab.Screen name="My Plan" component={MyPlanScreenWrapper} />
      <Tab.Screen name="Fitness" component={FitnessScreenWrapper} />
      <Tab.Screen name="Profile" component={ProfileScreenWrapper} />
    </Tab.Navigator>
  );
}

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Restaurants" component={RestaurantsScreenWrapper} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreenWrapper} />
          <Stack.Screen name="Gyms" component={GymsScreenWrapper} />
          <Stack.Screen name="Subscription" component={SubscriptionScreenWrapper} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreenWrapper} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={SignupScreenWrapper} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App; 