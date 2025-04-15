
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";

export async function fetchUsers() {
  // Fetch users with ban status information
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) throw error;
  
  // Get ban information for all users
  const { data: bans } = await supabase
    .from('user_bans')
    .select('*')
    .eq('active', true);

  // Map profiles to User objects and add banned status
  return profiles.map(profile => ({
    id: profile.id,
    email: '', // Email not exposed in profiles table for privacy
    name: profile.name,
    role: profile.role,
    is_admin: profile.is_admin || false,
    createdAt: profile.created_at,
    banned: bans?.some(ban => ban.user_id === profile.id) || false
  })) as User[];
}

export async function fetchAnalyticsStats() {
  const { data: users } = await supabase.from('profiles').select('count');
  const { data: bookings } = await supabase.from('bookings').select('count');
  const { data: providers } = await supabase.from('providers').select('count').eq('verified', true);
  const { data: revenue } = await supabase.from('bookings').select('total_cost');

  const totalRevenue = revenue?.reduce((acc, booking) => acc + booking.total_cost, 0) || 0;

  return {
    totalUsers: users?.[0]?.count || 0,
    totalBookings: bookings?.[0]?.count || 0,
    activeProviders: providers?.[0]?.count || 0,
    totalRevenue: totalRevenue,
  };
}

export async function banUser(userId: string) {
  const { error } = await supabase
    .from('user_bans')
    .insert({
      user_id: userId,
      banned_by: (await supabase.auth.getUser()).data.user?.id,
      active: true
    });

  if (error) throw error;
}

export async function unbanUser(userId: string) {
  const { error } = await supabase
    .from('user_bans')
    .update({ active: false })
    .eq('user_id', userId);

  if (error) throw error;
}
