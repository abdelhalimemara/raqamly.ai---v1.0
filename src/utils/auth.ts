import { supabase } from '../lib/supabaseClient';

export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  subscriptionPlan: 'free' | 'basic' | 'premium';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export const signup = async (
  email: string,
  password: string,
  name: string,
  businessName: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email,
          name,
          business_name: businessName,
          subscription_plan: 'free'
        });

      if (profileError) throw profileError;

      return {
        success: true,
        message: 'Signup successful. Please check your email to confirm your account.',
        user: {
          id: data.user.id,
          email,
          name,
          businessName,
          subscriptionPlan: 'free'
        }
      };
    } else {
      throw new Error('Signup failed');
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, message: error.message || 'Signup failed' };
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          businessName: userData.business_name,
          subscriptionPlan: userData.subscription_plan
        }
      };
    } else {
      throw new Error('Login failed');
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, message: error.message || 'Login failed' };
  }
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        businessName: data.business_name,
        subscriptionPlan: data.subscription_plan
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const updateUser = async (updatedUser: Partial<User>): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: updatedUser.name,
        business_name: updatedUser.businessName,
      })
      .eq('id', updatedUser.id);

    if (error) throw error;

    const updatedUserData = await getCurrentUser();

    if (!updatedUserData) {
      throw new Error('Failed to fetch updated user data');
    }

    return {
      success: true,
      message: 'User updated successfully',
      user: updatedUserData
    };
  } catch (error: any) {
    console.error('Update user error:', error);
    return { success: false, message: error.message || 'Failed to update user' };
  }
};