import { defineStore } from "pinia"
import supabase from '../client/supabaseClient'
import router from "@/router";

export type User = {
  first_name?: string,
  last_name?: string,
  email: string,
  password: string
}

export const useUserStore = defineStore('users', () => {

  const updateProfile = async (userId: string, profileData: Partial<User>) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .match({ user_id: userId });

    if (error) {
      console.warn('Could not update profile', error);
      return false;
    }

    router.replace('/Home')

    return data;
  };

  // const createOrUpdateProfile = async (profileData: Partial<User>) => {
  //   const user = supabase.auth.user();

  //   if (!user) {
  //     console.warn('No user logged in');
  //     return false;
  //   }

  //   const existingProfile = await supabase
  //     .from('profiles')
  //     .select('*')
  //     .eq('user_id', user.id)
  //     .single();

  //   if (existingProfile.data) {
  //     return await updateProfile(user.id, profileData);
  //   } else {
  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .insert([{ ...profileData, user_id: user.id }]);

  //     if (error) {
  //       console.warn('Could not create profile', error);
  //       return false;
  //     }

  //     return data;
  //   }
  // };

  return {
    updateProfile,
  }
});
