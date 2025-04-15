
import { supabase } from "@/integrations/supabase/client";

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
