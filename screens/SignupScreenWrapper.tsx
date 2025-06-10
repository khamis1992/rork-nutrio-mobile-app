import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import Signup from '@/components/rork/Signup';

const SignupScreenWrapper: React.FC = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ email, password, fullName }: { email: string; password: string; fullName: string }) => {
    setError(null);
    const result = await signUp(email, password, fullName);
    if (result.error) {
      setError(result.error);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  return <Signup onSubmit={handleSubmit} error={error} />;
};

export default SignupScreenWrapper; 