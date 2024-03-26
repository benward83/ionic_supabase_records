<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-ref="pageDefaultLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
          <ion-button @click="logout">
            <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonPage, IonBackButton, IonButtons, IonButton, IonIcon  } from '@ionic/vue';
import { useAuthStore } from '@/store/auth';
import { logOut } from 'ionicons/icons';

const authStore = useAuthStore();

withDefaults(defineProps<{
  pageTitle: string,
  pageDefaultLink?: string
}>(), {
  pageDefaultLink: '/home',
});

const logout = () => {
  authStore.logout();
};
</script>
