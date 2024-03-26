import { defineStore } from "pinia"
import supabase from '../client/supabaseClient'
import { useRouter } from 'vue-router';
import { ref } from "vue";
import { User } from "./users";

export const useAuthStore = defineStore('auth', () => {

  const router = useRouter();

  const currentUserSession = ref(null)

  const createUser = async (user: User) => {

    const { data, error } = await supabase
      .auth
      .signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            first_name: user.first_name,
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
    const { data, error } = await supabase
      .auth
      .getSession()

    if (error) {
      console.warn('Could not find session', error)
    }

    if (data) {
      currentUserSession.value = data.session? data.session.user : null
      return currentUserSession.value
    }

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
    currentUserSession,
  }

});
