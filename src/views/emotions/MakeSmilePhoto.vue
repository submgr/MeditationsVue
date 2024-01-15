<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <NavbarController activatedfrom="Sleep/SleepMainScreen" @infomodalfunction="infomodalfunction()" align="right" />
        <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Улыбка</h1>

        <h1 @click="cameraSnap()">testbtn</h1>
  
  
        <ExploreContainer name="Tab 3 page" />
  
      </ion-content>
    </ion-page>
  </template>
    
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';

  import { Device } from '@capacitor/device';
  
  import NavbarController from '@/components/NavbarController.vue';
  
  import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';
  
  export default defineComponent({
    name: 'Tab3Page',
    components: { IonContent, IonPage, NavbarController },
    setup() {
      //
    },
    methods: {
      async cameraSnap() {
        const cameraPermissionsData = await Camera.checkPermissions();
        alert(JSON.stringify(cameraPermissionsData))

        const deviceInfo = await Device.getInfo();

        alert(JSON.stringify(deviceInfo))

        if(cameraPermissionsData.camera == "granted" || cameraPermissionsData.camera == "prompt"){
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
        }else if(cameraPermissionsData.camera == "denied"){
          //SORRY??
          //deviceInfo.
          if(deviceInfo.platform == "web"){
            //cant reask permission
          }else{
            Camera.requestPermissions();
            this.cameraSnap();
          }
        }
        
      }
    }
  });
  
  </script>
    