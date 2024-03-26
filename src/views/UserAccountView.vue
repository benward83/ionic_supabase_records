<template>
  <base-layout page-title="Me">
    <UserAccount
      v-if="currentUser"
      :currentUser="currentUser"
    />
  </base-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';
import UserAccount from '@/components/UserAccountForm.vue'

const authStore = useAuthStore()
const currentUser = ref(null)

onMounted(async () => {
  await authStore.getCurrentUserSession();
  currentUser.value = authStore.currentUserSession;
});
</script>
