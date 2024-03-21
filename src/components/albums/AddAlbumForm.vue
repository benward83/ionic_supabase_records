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
          v-model="albumData.releaseYear"
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
          <img :src="albumData.imageUrl" />
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
import { useAlbumStore } from '@/store/albums';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Plugins } from '@capacitor/core'
import { CameraResultType, CameraSource } from '@capacitor/camera'

const { Camera } = Plugins;

const store = useAlbumStore()
const router = useRouter();

const albumData = reactive({
  name: '',
  artist: '',
  releaseYear: '',
  imageUrl: '',
});

const submitForm = () => {
  const payload = {
    id: albumData.name,
    ...albumData,
  }
  store.addAlbum(payload)
  router.replace('/albums')
}

const takePhoto = async() => {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 60,
  });

  albumData.imageUrl = photo.webPath;
}
</script>
