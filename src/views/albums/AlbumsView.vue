<template>
  <base-layout page-title="Albums" pageDefaultLink="/home">
    <template #actions-end>
      <ion-button router-link="/albums/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <AlbumsList
      :albums="albumStore.albums"
    />
  </base-layout>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useAlbumStore } from '../../store/albums';
import AlbumsList from '@/components/albums/AlbumsList.vue'
import { onMounted } from 'vue';

const albumStore = useAlbumStore();

onMounted(() => {
  albumStore.getAllAlbums();
});
</script>
