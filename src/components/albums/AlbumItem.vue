<template>
  <ion-item class="ion-align-items-center">
    <ion-thumbnail slot="start">
      <ion-img v-if="album.image_url" :src="album.image_url"></ion-img>
    </ion-thumbnail>
    <ion-label
      :router-link="`/albums/${album.id}`"
    >
      {{ album.name }}
    </ion-label>
    <ion-note
      slot='end'
      color="medium"
    >
      {{ album.artist }}
    </ion-note>
    <ion-icon
      slot="end"
      :icon="trashBin"
      @click="removeAlbum"
    >
    </ion-icon>
  </ion-item>
</template>

<script setup lang="ts">
import { Album, useAlbumStore } from '@/store/albums';
import { IonItem, IonImg, IonThumbnail, IonLabel, IonNote, IonIcon } from '@ionic/vue';
import { trashBin } from 'ionicons/icons'

const props = defineProps<{
  album: Album,
}>();

const albumStore = useAlbumStore()

const removeAlbum = async () => {
  await albumStore.deleteAlbum(props.album)
  albumStore.getAllAlbums()
}
</script>
