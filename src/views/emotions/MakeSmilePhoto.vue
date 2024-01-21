<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <NavbarController activatedfrom="Emotions/MakeSmilePhoto" @backfunction="$router.back()"
        @infomodalfunction="infomodalfunction()" align="right" />
      <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Улыбка</h1>

      <ion-card color="danger" v-if="camera_access_denied">
        <ion-card-header>
          <ion-card-title>Необходимо разрешение</ion-card-title>
          <ion-card-subtitle>Не удается получить доступ к камере</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>

          Для этой функции необходим доступ к камере: так вы сможете увидеть себя и запечатлеть свою улыбку. Похоже, что
          вы отказали приложению в доступе к камере. <br /><br />
          <span v-if="user_browser == 'ios'" style="font-style: italic;">aA > Website Settings > Camera > Allow</span>
          <span v-else-if="user_browser == 'android'" style="font-style: italic;">··· > Settings > Site Settings > Camera
            > On</span>
          <span v-else-if="user_browser == 'windows'" style="font-style: italic;">🔒 > 🔑 Permission for this site >
            Camera > Allow</span>
          <span v-else style="font-style: italic;"></span>

          <ion-button @click="cameraSnap()" color="light">Я выдал резрешение приложению</ion-button>
        </ion-card-content>
      </ion-card>

      <div>
        <div style="width: 105vw; margin-top: -2vh; z-index: -1;">
          <img src="https://svgshare.com/i/123k.svg" style="margin-left: -2vw; margin-right: -2vw; " />
        </div>

        <ion-card style="border-radius: 20px; margin-top: -7.5vh; opacity: 0.95;" v-if="currentstep != 'photo_view'">
          <ion-card-header>
            <ion-card-title>Встречайте свою яркую улыбку!</ion-card-title>
            <ion-card-subtitle>Улыбнитесь себе!</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>

            Раскройте силу своей улыбки! Исследования показывают, что улыбка способна поднять настроение и вызвать
            положительные эмоции. Сделайте веселое селфи и зарядитесь весельем на весь день! <br /><br />

            <ion-button expand="block" @click="cameraSnap()"
              style="margin-left: 2vw; margin-right: 2vw; margin-top: 0vh;">Улыбнуться!</ion-button>
          </ion-card-content>
        </ion-card>
        <ion-card style="border-radius: 20px; margin-top: -20.5vh; opacity: 0.9;" v-if="currentstep == 'photo_view'">
          <ion-card-header>
            <ion-card-title>Сногшибательно!</ion-card-title>
          </ion-card-header>

          <ion-card-content>

            <img style="transform: rotate(5deg); margin-top: 2vh; max-height: 40vh; margin-bottom: 4vh; display: block;
              margin-left: auto;
              margin-right: auto;
              width: 50%;" :src="'data:image/png;base64, ' + last_shoot_base64String">

            <ion-button expand="block" @click="sharePhoto()"
              style="margin-left: 2vw; margin-right: 2vw; margin-top: 0vh;">Поделиться!</ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="padding_from_bottom_line" style="padding-top: 1vh;"></div>

    </ion-content>
  </ion-page>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';

import {
  arrowBackCircleOutline
} from 'ionicons/icons';

import { Device } from '@capacitor/device';

import NavbarController from '@/components/NavbarController.vue';

import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';

import {
    IonPage,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonCardHeader,
    IonCardContent,
} from '@ionic/vue';

import confetti from 'canvas-confetti';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonPage,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonCardHeader,
    IonCardContent,
    NavbarController },
  setup() {
    //
  },
  data() {
    return {
      camera_access_denied: false,
      user_browser: 'default',
      //currentstep: "awaiting"
      currentstep: "awaiting",
      last_shoot_imgblob: null,
      last_shoot_base64String: null,
      arrowBackCircleOutline
    }
  },
  methods: {
    randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    },
    async cameraSnap() {

      // eslint-disable-next-line
      var parent_this = this;

      this.currentstep = "awaiting";
      const cameraPermissionsData = await Camera.checkPermissions();

      const deviceInfo = await Device.getInfo();
      console.log(deviceInfo)

      if (cameraPermissionsData.camera == "granted" || cameraPermissionsData.camera == "prompt") {
        var image = null;
        try {
          image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64,
            direction: CameraDirection.Front
          });

          console.warn("aaai1")

          // image.webPath will contain a path that can be set as an image src.
          // You can access the original file using image.path, which can be
          // passed to the Filesystem API to read the raw data of the image,
          // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
          var base64String = image.base64String;
          parent_this.last_shoot_base64String = base64String;

          console.warn("aaai2")

          const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);

              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }

              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
          }

          console.warn("aaai3")


          // Assume `blob` is a PNG image file.
          parent_this.last_shoot_imgblob = b64toBlob(base64String, "image/jpeg");

          parent_this.currentstep = "photo_view"

          var duration = 4 * 1000;
          var animationEnd = Date.now() + duration;
          var defaults = { startVelocity: 20, spread: 260, ticks: 90, zIndex: 0 };


          var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            var particleCount = 100 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: parent_this.randomInRange(0.1, 0.3), y: Math.random() - 0.1 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: parent_this.randomInRange(0.7, 0.9), y: Math.random() - 0.1 } }));
          }, 250);

        } catch (error) {
          console.error(error);

          // Expected output: ReferenceError: nonExistentFunction is not defined
          // (Note: the exact output may be browser-dependent)
        }




      } else if (cameraPermissionsData.camera == "denied") {
        //SORRY??
        //deviceInfo.
        if (deviceInfo.platform == "web") {
          //cant reask permission
          this.camera_access_denied = true;
        } else {
          Camera.requestPermissions();
          this.cameraSnap();
        }
      }

    },
    async sharePhoto() {
      const data = {
        files: [
          new File([this.last_shoot_imgblob], 'YourMeditation_Smile.png', {
            type: this.last_shoot_imgblob.type,
          }),
        ],
        title: 'Поделитесь своей улыбкой с миром',
        text: 'Какое у меня веселое селфи вышло! ❤️‍🔥 Заряд весельем на весь день получен! 😎 #круто #вашамедитация',
      };
      console.warn("aaai4")
      if (navigator.canShare(data)) {
        console.warn("aaai5")
        await navigator.share(data);
      }
      console.warn("aaai6")
    }
  }
});

</script>
    