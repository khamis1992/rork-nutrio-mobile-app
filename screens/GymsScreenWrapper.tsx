import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useGyms } from '@/hooks/useGyms';
import { useAuth } from '@/hooks/useAuth';
import { useGymAccess } from '@/hooks/useGymAccess';
import { GymsScreen } from '@/components/rork/Gyms';
import { useNavigation } from '@react-navigation/native';
import { getActiveSubscription } from '@/hooks/useSubscription';

const GymsScreenWrapper: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();
  const { access: userAccessList, loading: accessLoading, error: accessError } = useGymAccess(user?.id || '');
  const [hasPlan, setHasPlan] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!user?.id) return;
    getActiveSubscription(user.id).then((sub) => setHasPlan(!!sub));
  }, [user?.id]);

  if (gymsLoading || accessLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (gymsError || accessError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{gymsError || accessError}</Text>
      </View>
    );
  }

  // Combine gyms with access info and featured badge
  const gymsWithAccess = gyms.map((gym) => {
    const access = userAccessList.find((a) => a.gymId === gym.id);
    return {
      ...gym,
      hasAccess: !!access,
      accessDates: access ? { from: access.from_date, to: access.to_date } : undefined,
      featured: !!gym.featured,
    };
  });

  const onViewGymDetails = (gymId: string) => {
    navigation.navigate('GymDetails', { gymId });
  };

  const onGetAccess = () => {
    if (!hasPlan) {
      navigation.navigate('Subscription');
    }
  };

  return (
    <GymsScreen
      gyms={gymsWithAccess}
      onViewGymDetails={onViewGymDetails}
      onGetAccess={onGetAccess}
    />
  );
};

export default GymsScreenWrapper; 