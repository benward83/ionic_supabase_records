<template>
  <ion-item class="ion-align-items-center">
    <ion-thumbnail slot="start">
      <ion-img v-if="album.image_url" :src="album.image_url"></ion-img>
    </ion-thumbnail>
    <div>
      <ion-label
        :router-link="`/albums/${album.id}`"
        class="ion-text-wrap"
      >
        {{ album.name }}
      </ion-label>
      <ion-icon
        v-for="n in parseInt(album.rating)"
        :key="n"
        :icon="starOutline"
        size="small"
      >
      </ion-icon>
    </div>
    <ion-icon
      slot="end"
      :icon="trashBin"
      size="small"
      @click="removeAlbum"
    >
    </ion-icon>
  </ion-item>
</template>

<script setup lang="ts">
import { Album, useAlbumStore } from '@/store/albums';
import { IonItem, IonImg, IonThumbnail, IonLabel, IonIcon } from '@ionic/vue';
import { trashBin, starOutline } from 'ionicons/icons'

const props = defineProps<{
  album: Album,
}>();

const albumStore = useAlbumStore()

const removeAlbum = async () => {
  await albumStore.deleteAlbum(props.album)
  albumStore.getAllAlbums()
}
</script>
