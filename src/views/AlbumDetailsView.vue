<template>
  <base-layout
    :page-title="album ? album?.name : 'Loading.....'"
    page-default-link="'/albums'"
  >
    <p v-if="!album">Sorry the album you were looking for does not seem to exist</p>
    <AlbumOverview
      v-else
      :album="album"
    />
  </base-layout>
</template>

<script setup lang="ts">
import { Ref, computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAlbumStore } from '../store/albums';
import AlbumOverview from '@/components/albums/AlbumOverview.vue'

const route = useRoute();
const albumId: Ref<string> = ref(route.params.id as string)


const store = useAlbumStore()

const album = computed(() => {
  return store.getAlbumById(albumId.value)
});

watch(() => route.params.id as string, async (newId) => {
  if (route.params.id) {
    albumId.value = newId
  }
}, {
  immediate: true,
});
</script>
