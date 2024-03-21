<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <ion-img :src="album.image" :alt="album.name"></ion-img>
    </ion-thumbnail>
    <ion-label>
      {{ album.name }}
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { Album } from '@/store/albums';
import { IonItem, IonImg, IonThumbnail, IonLabel } from '@ionic/vue';

defineProps<{
  album: Album,
}>();
</script>
