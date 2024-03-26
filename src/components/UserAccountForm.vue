<template>
  <ion-content>
    <form @submit.prevent="updateProfile">
      <ion-item>
        <ion-label>
          <p>Email</p>
          <p>{{ currentUser.email }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label position="stacked" v-model="userProfile.first_name">First name</ion-label>
        <ion-input type="text" name="username"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked" v-model="userProfile.last_name">Last name</ion-label>
        <ion-input type="text" name="username"></ion-input>
      </ion-item>
      <div class="ion-text-center">
        <ion-button fill="clear" type="submit" @click="updateProfile">Update Profile</ion-button>
      </div>
    </form>
  </ion-content>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/users';
import {
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonLabel,
} from '@ionic/vue'
import { reactive } from 'vue';

const props = defineProps<{
  currentUser: any,
}>();

const userStore = useUserStore();

const userProfile = reactive({
  first_name: '',
  last_name: '',
})

const updateProfile = () => {
  const userId = props.currentUser.id
  userStore.updateProfile(userId, userProfile )
}
</script>
