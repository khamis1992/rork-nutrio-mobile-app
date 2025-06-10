import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Profile from '@/components/rork/Profile';

const ProfileScreenWrapper: React.FC = () => {
  const { signOut } = useAuth();

  return <Profile onLogout={signOut} />;
};

export default ProfileScreenWrapper; 