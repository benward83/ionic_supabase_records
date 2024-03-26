<template>
  <ion-img :src="album?.image_url" :alt="album?.name"></ion-img>
  <h2 class="ion-text-center">{{ album?.artist_name }}</h2>
  <p class="ion-text-center">{{ album?.release_year }}</p>
</template>

<script setup lang="ts">
import { Album } from '@/store/albums';
import { IonImg } from '@ionic/vue';

defineProps<{
  album: Album,
}>();
</script>
