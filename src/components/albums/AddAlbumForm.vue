<template>
  <form
    @submit.prevent
    class="ion-padding"
  >
    <ion-list>
      <ion-item>
        <ion-label position="floating">Album name</ion-label>
        <ion-input
          v-model="albumData.name"
          type="text"
        />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Artist</ion-label>
        <ion-input
          v-model="albumData.artist"
          type="text"
        />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Release year</ion-label>
        <ion-input
          v-model="albumData.release_year"
          type="text"
        />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Rating</ion-label>
        <ion-input
          v-model="albumData.rating"
          type="text"
        />
      </ion-item>
      <ion-item>
        <ion-button
          @click="takePhoto"
          type="button"
          fill="clear"
        >
          <ion-icon slot="start" :icon="camera"></ion-icon>
          Take photo
        </ion-button>
        <ion-thumbnail slot="start">
          <img :src="albumData.image_url" />
        </ion-thumbnail>
      </ion-item>
    </ion-list>
  </form>
  <ion-button
    @click="submitForm"
    class="ion-padding"
    expand="block"
  >
    Submit
  </ion-button>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonInput, IonLabel, IonButton, IonThumbnail, IonIcon } from '@ionic/vue';
import { camera } from 'ionicons/icons'
import { Album, useAlbumStore } from '@/store/albums';
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Plugins } from '@capacitor/core'
import { CameraResultType, CameraSource } from '@capacitor/camera'

const { Camera } = Plugins;

const props = withDefaults(defineProps<{
  album: Partial<Album>
}>(), {
  album: () => ({
    name: '',
    artist: '',
    rating: '',
    release_year: '',
    image_url: '',
    id: undefined,
  }),
});

const albumStore = useAlbumStore()
const router = useRouter();

const albumData = reactive({ ...props.album });

const submitForm = async () => {
  if (albumData.id) {
    await albumStore.updateAlbum(albumData);
  } else {
    await albumStore.addAlbum(albumData);
  }
  router.replace('/albums');
};

const takePhoto = async() => {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 60,
  });

  albumData.image_url = photo.webPath;
}

watch(() => props.album, (newVal) => {
  Object.assign(albumData, newVal);
}, { deep: true });

</script>
