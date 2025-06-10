import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import Login from '@/components/rork/Login';

const LoginScreenWrapper: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    setError(null);
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  return <Login onSubmit={handleSubmit} error={error} />;
};

export default LoginScreenWrapper; 