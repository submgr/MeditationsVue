<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <NavbarController activatedfrom="Sleep/SleepMainScreen" @infomodalfunction="infomodalfunction()" align="right" />
      <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Сон</h1>


      <ExploreContainer name="Tab 3 page" />

    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

import NavbarController from '@/components/NavbarController.vue';

import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonContent, IonPage, NavbarController },
  setup() {
    //
  },
  methods: {
    async infomodalfunction() {
      alert("test")
      const test = await Camera.checkPermissions();
      alert(JSON.stringify(test))
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        direction: CameraDirection.Front
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
    }
  }
});

</script>
  