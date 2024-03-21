<template>
  <ion-list>
    <AlbumItem
      v-for="album in albums"
      :key="album.id"
      :router-link="`/albums/${album.id}`"
      :album="album"
    />
  </ion-list>
</template>

<script setup lang="ts">
import { Album } from '@/store/albums';
import { IonList } from '@ionic/vue';
import AlbumItem from '@/components/albums/AlbumItem.vue'

defineProps<{
  albums: Array<Album>,
}>();
</script>
