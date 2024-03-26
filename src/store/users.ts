import { defineStore } from "pinia"
import supabase from '../client/supabaseClient'
import { useRouter } from 'vue-router';

export type User = {
  name?: string,
  email: string,
  password: string
}

export const useUserStore = defineStore('users', () => {

  const router = useRouter();

  const createUser = async (user: User) => {

    const { data, error } = await supabase
      .auth
      .signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            first_name: user.name,
          },
        },
      })

    if (error) {
      console.warn('Could not create user', error)
    }

    if (data) {
      router.replace('/home')
    }

  }

  const loginWithPassword = async (user: User) => {
    const { error} = await supabase
      .auth
      .signInWithPassword({
        email: user.email,
        password: user.password,
      });

    if (error) {
      console.warn('Could not login to application', error)
    } else {
      router.replace('/home')
    }
  }

  const getCurrentUserSession = async () => {
    const currentUser = await supabase
      .auth
      .getSession()
    console.log("🚀 ~ getCurrentUserSession ~ currentUser:", currentUser)
  }

  const logout = async () => {

    const { error } = await supabase
      .auth
      .signOut()

    if (error) {
      console.warn('Could not logout', error)
    }

    router.replace('/Login')
  }

  return {
    createUser,
    loginWithPassword,
    getCurrentUserSession,
    logout,
  }

});
