<template>
  <base-layout :page-title="album ? album?.name : 'Loading.....'" page-default-link="'/albums'">
    <p v-if="!album">Sorry, the album you were looking for does not seem to exist.</p>
    <template v-else>
      <div class="ion-align-items-center ion-justify-content-between">
        <ion-item>
          <ion-label>Edit album details</ion-label>
          <ion-icon
          v-if="!updateAlbum"
          :icon="pencil"
          @click="updateAlbum = true"
          ></ion-icon>
        </ion-item>
        <AlbumOverview
          v-if="!updateAlbum"
          :album="album"
        />
      </div>
      <AddAlbumForm v-if="updateAlbum" :album="album" />
    </template>
  </base-layout>
</template>

<script setup lang="ts">
import { IonIcon, IonLabel, IonItem } from '@ionic/vue';
import { Ref, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Album, useAlbumStore } from '../../store/albums';
import AlbumOverview from '@/components/albums/AlbumOverview.vue';
import AddAlbumForm from '@/components/albums/AddAlbumForm.vue';
import { pencil } from 'ionicons/icons'

const route = useRoute();

const album: Ref<Album|null> = ref(null);
const albumStore = useAlbumStore();

const albumId = ref(route.params.id as string);

const updateAlbum = ref(false)

watchEffect(async () => {
  if (albumId.value) {
    album.value = await albumStore.getAlbumById(albumId.value);
  } else {
    album.value = null;
  }
});
</script>

