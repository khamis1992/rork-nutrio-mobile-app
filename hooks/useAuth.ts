import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, User } from '@supabase/supabase-js';

const SESSION_KEY = 'supabase.session';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from AsyncStorage
  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      const sessionStr = await AsyncStorage.getItem(SESSION_KEY);
      if (sessionStr) {
        const sessionObj = JSON.parse(sessionStr);
        setSession(sessionObj);
        setUser(sessionObj.user);
        supabase.auth.setSession({
          access_token: sessionObj.access_token,
          refresh_token: sessionObj.refresh_token,
        });
      } else {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) {
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        await AsyncStorage.removeItem(SESSION_KEY);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(data.session));
    }
    return {};
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string): Promise<{ error?: string }> => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) return { error: error.message };
    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(data.session));
    }
    return {};
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  }, []);

  return { user, session, loading, signIn, signUp, signOut };
} 