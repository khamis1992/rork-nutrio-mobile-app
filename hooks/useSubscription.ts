import { supabase } from '@/lib/supabase';
import type { Subscription } from '@/types/subscription';

export async function getActiveSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .single();
  if (error || !data) return null;
  return data as Subscription;
}

export async function subscribeToPlan(
  userId: string,
  planType: 'daily' | 'weekly' | 'monthly',
  includesGym: boolean
): Promise<{ error?: string }> {
  const startDate = new Date();
  let endDate = new Date(startDate);
  if (planType === 'daily') endDate.setDate(startDate.getDate() + 1);
  if (planType === 'weekly') endDate.setDate(startDate.getDate() + 7);
  if (planType === 'monthly') endDate.setMonth(startDate.getMonth() + 1);

  // Deactivate any existing subscriptions
  await supabase
    .from('subscriptions')
    .update({ active: false })
    .eq('user_id', userId)
    .eq('active', true);

  const { error } = await supabase.from('subscriptions').insert([
    {
      user_id: userId,
      plan_type: planType,
      includes_gym: includesGym,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      active: true,
    },
  ]);
  if (error) return { error: error.message };
  return {};
} 