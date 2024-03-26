<template>
  <ion-list>
    <ion-item class="ion-align-items-center">
      <ion-label :router-link="'/albums'">
        Albums
      </ion-label>
    </ion-item>
    <ion-item class="ion-align-items-center">
      <ion-label>
        Artists
      </ion-label>
    </ion-item>
    <ion-item class="ion-align-items-center">
      <ion-label :router-link="'/me'">
        My profile
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList } from '@ionic/vue';
</script>
