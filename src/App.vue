<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
  *{
    font-family: Montserrat;
  }
  @media (prefers-color-scheme: lig4ssssssssqqht) {
    ion-content {
      --background: linear-gradient(to right, rgba(191, 209, 212, 0.07), rgba(250, 255, 241, 0.07)),
    url(https://grainy-gradients.vercel.app/noise.svg);;
    filter: contrast(100%) brightness(100%);
    }
  }

  @media (prefers-color-scheme: dark) {
    ion-content {
      --background: #000 url('./assets/abstract/black-and-noise-background.png') no-repeat center center / cover !important;
    }
  }
</style>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
