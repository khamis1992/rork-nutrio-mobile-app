import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { ProgressScreen } from '@/components/rork/Progress';

const ProgressScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const { progress, loading, error } = useProgress(user?.id || '');

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return <ProgressScreen progress={progress} />;
};

export default ProgressScreenWrapper; 