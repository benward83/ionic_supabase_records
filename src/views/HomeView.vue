<template>
  <base-layout page-title="Home">
    <template #actions-end>
      <ion-button @click="logout">
        <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
      </ion-button>
    </template>
    <HomePageList />
  </base-layout>
</template>

<script setup lang="ts">
import HomePageList from '@/components/HomePageList.vue'
import { useUserStore } from '@/store/users';
import { IonButton, IonIcon } from '@ionic/vue';
import { logOut } from 'ionicons/icons';

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};
</script>
