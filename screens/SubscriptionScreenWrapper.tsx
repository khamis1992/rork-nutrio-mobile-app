import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { subscribeToPlan } from '@/hooks/useSubscription';
import Subscription from '@/components/rork/Subscription';

const SubscriptionScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (planType: string, includesGym: boolean) => {
    setError(null);
    if (!user) {
      setError('You must be logged in.');
      return;
    }
    const result = await subscribeToPlan(user.id, planType as any, includesGym);
    if (result.error) {
      setError(result.error);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  return <Subscription onSubscribe={handleSubscribe} error={error} />;
};

export default SubscriptionScreenWrapper; 