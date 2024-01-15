<template>
  <ion-app>
    
    <ion-router-outlet />
  </ion-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}



ion-tab-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.input-wrapper{
  border-radius: 1.25vh !important;
}

.padding_from_bottom_line {
  margin-top: 7.5vh;
}

/* ion-content {
  --overflow: scroll;
  scrollbar-width: 4px;
  --scrollbar-width: 4px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
} */


@media (prefers-color-scheme: light) {
  ion-content {
    --background: #ffffff00 url("/public/assets/svg/light-colorful-background.svg") no-repeat center center / cover !important;
  }
}
/* @media (prefers-color-scheme: light) {
  ion-content {
    --background: #ffffff00 url("https://hubhtml.liquid-themes.com/assets/images/demo/start-hub-8/banner-bg.jpg") no-repeat center center / cover !important;
  }
} */

@media (prefers-color-scheme: dark) {
  ion-content {
    --background: #000000 url("/public/assets/svg/dark-colorful-background.svg") no-repeat center center / cover !important;
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
