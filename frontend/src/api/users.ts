
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/user.types';

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return data;
};

export const updateUserProfile = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  
  return data;
};

export const connectWalletToUser = async (userId: string, walletAddress: string): Promise<boolean> => {
  const { error } = await supabase
    .from('users')
    .update({ wallet_address: walletAddress })
    .eq('id', userId);
  
  return !error;
};
