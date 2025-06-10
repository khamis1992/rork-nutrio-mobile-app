import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth-store';

export default function WelcomeScreen() {
  const { login } = useAuthStore();
  const router = useRouter();

  const handleGuestLogin = async () => {
    try {
      // Set a guest user without requiring credentials
      await login('guest@example.com', 'guestpassword', true);
      // Force navigation to home page after guest login
      router.replace("/(tabs)");
    } catch (error) {
      console.error('Guest login failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80' }}
            style={styles.logoBackground}
          />
          <View style={styles.logoOverlay} />
          <Text style={styles.logo}>NUTRIO</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Healthy Living Made Easy</Text>
          <Text style={styles.tagline}>
            Healthy Meals & Gym Access in One Subscription
          </Text>
        </View>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Curated meals from top restaurants</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Optional gym access at partner locations</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Flexible subscription plans</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Continue as Guest" 
          onPress={handleGuestLogin}
          style={styles.guestButton} 
        />
        <Link href="/(auth)/login" asChild>
          <Button 
            title="Login" 
            variant="outline"
            style={styles.button} 
          />
        </Link>
        <Link href="/(auth)/signup" asChild>
          <Button 
            title="Create Account" 
            variant="text" 
            style={styles.button} 
          />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 180,
    borderRadius: 90,
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(76, 175, 80, 0.7)',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    zIndex: 1,
  },
  textContainer: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    ...theme.typography.body,
    textAlign: 'center',
    color: colors.textLight,
    paddingHorizontal: theme.spacing.lg,
  },
  features: {
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: theme.spacing.sm,
  },
  featureText: {
    ...theme.typography.body,
  },
  buttonContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  guestButton: {
    backgroundColor: colors.primary,
  },
});