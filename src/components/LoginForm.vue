<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding">
        <h1>Welcome</h1>
        <p>Sign in below if you are already a user. If not, please create an account</p>
      </div>
      <ion-list :inset="true">
        <div>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              v-model="user.email"
              name="email"
              type="email"
            >
          </ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input
              v-model="user.password"
              name="password"
              type="password"
            >
          </ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input
              v-model="user.name"
              name="name"
              type="text"
            >
          </ion-input>
          </ion-item>
          <div class="ion-text-center">
            <ion-button
              type="button"
              fill="clear"
              @click="createAccount"
            >
              Create Account
            </ion-button>
            <ion-button
              type="button"
              fill="clear"
              @click="login"
            >
              Login
            </ion-button>
            <ion-button
              type="button"
              fill="clear"
              @click="seeCurrentUser"
            >
              See User
            </ion-button>
          </div>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonButton, IonInput } from '@ionic/vue'
import { reactive } from 'vue';
import { useUserStore } from '../store/users';

const userStore = useUserStore();

const user = reactive({
  name: '',
  email: '',
  password: '',
})

const createAccount = () => {
  userStore.createUser({ ...user });
};

const login = () => {
  userStore.loginWithPassword({ ...user });
};

const seeCurrentUser = () => {
  userStore.getCurrentUserSession();
};
</script>

