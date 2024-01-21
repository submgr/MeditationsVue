<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <NavbarController activatedfrom="Sleep/SleepMainScreen" @infomodalfunction="infomodalfunction()" align="right" />
      <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px; "
        class="light_upper_gradient">Сон</h1>

      <div v-if="howler_player_instance == null">
        <div style="bottom: 20vh !important; position:fixed !important; z-index: 5500 !important; width: 50vw; display: block;
      margin-left: 25vw;
      margin-right: 25vw; text-align: center;">
          <ion-button expand="block" @click="startSession()" color="none"
            style="margin-left: 5vw; margin-right: 5vw; margin-top: 0vh; opacity: 0.7; color: black; background: #f4f5f8 !important; --background: #f4f5f8 !important; border-radius: 30px; --ripple-color: deeppink;">Начать</ion-button>
        </div>
      </div>
      <div v-else>
        <div style="bottom: 20vh !important; position:fixed !important; z-index: 5500 !important; width: 80vw; display: block;
      margin-left: 10vw;
      margin-right: 10vw; text-align: center;">
          <ion-button expand="block" @click="finish('user-initiated')" color="none"
            style="margin-left: 5vw; margin-right: 5vw; margin-top: 0vh; opacity: 0.7; color: black; background: #f4f5f8 !important; --background: #f4f5f8 !important; border-radius: 30px; --ripple-color: deeppink;">Завершить</ion-button>
        </div>
      </div>




      <div>
        <div style="bottom: 15vh !important; position:fixed !important; z-index: 5500 !important; width: 80vw; display: block;
      margin-left: 10vw;
      margin-right: 10vw; text-align: center;" @click="configureAudioBackground()">
          <span class="light_bottom_gradient">{{ current_audiobackground.title }} </span>
          <ion-icon style="color: white; opacity: 0.8; margin-left: 1vw; font-size: 2rem; margin-bottom: -0.6rem;"
            :icon="albumsOutline"></ion-icon>
        </div>

        <Transition>
          <div style="bottom: 11vh !important; position:fixed !important; z-index: 5500 !important; width: 50vw; display: block;
      margin-left: 25vw;
      margin-right: 25vw; text-align: center;" v-if="howler_player_instance == null" @click="configureTimer()">
            <span class="light_bottom_gradient">Таймер: <span v-if="current_timer_timevalue_minutes != 9000">{{
              current_timer_timevalue_minutes }} минут</span><span v-else>без таймера</span></span>
            <ion-icon style="color: white; opacity: 0.8; margin-left: 1vw; font-size: 2rem; margin-bottom: -0.6rem;"
              :icon="stopwatchOutline"></ion-icon>
          </div>
        </Transition>

      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

ion-content {
  --background: #000000 v-bind("`url(assets/svg/experimental-abstract-night-sky-background-dark-blue.svg)`") no-repeat center center / cover !important;
}

.light_upper_gradient {
  background: -webkit-linear-gradient(153deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7259497549019608) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.light_bottom_gradient {
  background: -webkit-linear-gradient(313deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 253, 0.726) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, pickerController, toastController, IonButton, IonIcon } from '@ionic/vue';

import globaldata from '../../modules/global';

import NavbarController from '@/components/NavbarController.vue';

import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';

import { Howl, Howler } from 'howler';

import {
  stopwatchOutline,
  albumsOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonContent, IonPage, NavbarController, IonButton, IonIcon },
  setup() {
    //
  },
  data() {
    return {
      stopwatchOutline,
      albumsOutline,
      openedModalName: "timer_configurer",
      pickerColumnsForTimer: null,
      pickerButtonsForTimer: null,
      picker_available: false,
      current_timer_timevalue_minutes: 15,
      SleepingCompanion_timeoutContainer: null,
      timerPicker_LastOptionIndex: 1,
      availableBgSounds: [
        {
          text: "Природа",
          value: "birds-singing-calm-river-nature-ambient-sound"
        },
        {
          text: "Лазурный берег",
          value: "relaxing-ocean-waves"
        },
        {
          text: "Домашний камин",
          value: "fireplace-original-noise"
        },
        {
          text: "Лес летом",
          value: "wind-in-trees"
        },
        {
          text: "Любимая гроза",
          value: "rain-and-thunder"
        },
      ],
      current_audiobackground: {
        title: null,
        audio_url: null
      },
      howler_player_instance: null
    }
  },
  mounted() {
    if (this.current_audiobackground.audio_url == null) {
      this.current_audiobackground = {
        title: this.availableBgSounds[0].text,
        audio_url: globaldata.assets.hostname + "/sleepsounds/" + this.availableBgSounds[0].value + ".mp3"
      };
    }
  },
  methods: {
    async startSession() {
      if (this.current_audiobackground.audio_url == null) {
        this.current_audiobackground = {
          title: this.availableBgSounds[0].text,
          audio_url: globaldata.assets.hostname + "/sleepsounds/" + this.availableBgSounds[0].value + ".mp3"
        };
      }
      await this.audioStart();
      this.howler_player_instance.play();
      setTimeout(() => {
        this.finish("automatic")
      }, 1000 * 60 * this.current_timer_timevalue_minutes);
    },
    async audioStart(data = null) {
      //here our audio is being initated!!!!!

      var current_howler_isPlaying = false;


      if (this.howler_player_instance != null && this.howler_player_instance.playing()) {
        current_howler_isPlaying = true;
        Howler.stop(this.howler_player_instance)
      }

      this.howler_player_instance = await new Howl({
        src: [this.current_audiobackground.audio_url],
        html5: true,
        preload: true,
        loop: true,
      });

      if (current_howler_isPlaying) {
        this.howler_player_instance.play()
      }

      return this.howler_player_instance



    },
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
    },
    async finish(reason = "automatic") {
      // two types: 'automatic' or 'user-initiated'
      switch (reason) {
        case "automatic":
          //
          break;
        case "user-initiated":
          //
          break;
        default:
          //??
          break;
      }
      Howler.stop(this.howler_player_instance)
      this.howler_player_instance = null;
    },
    async startSleepingCompanion() {

      // eslint-disable-next-line
      var parent_this = this;

      this.SleepingCompanion_timeoutContainer = setTimeout(() => {
        parent_this.finish("automatic")
      }, this.current_timer_timevalue_minutes * 1000 * 60);
    },
    async configureAudioBackground() {
      this.picker_available = true;
      const picker = await pickerController.create({
        columns: [
          {
            name: 'audiobackground_options',
            prefix: '',
            options: this.availableBgSounds,
          },
        ],
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel',
          },
          {
            text: 'ОК',
            handler: (value) => {
              console.log(`You selected: ${value.audiobackground_options.value}`);
              const bg_value = value.audiobackground_options.value;
              const bg_title = this.availableBgSounds.find(x => x.value === bg_value).text;
              this.current_audiobackground = {
                title: bg_title,
                audio_url: globaldata.assets.hostname + "/sleepsounds/" + bg_value + ".mp3"
              };

              var current_howler_isPlaying = false;
              if (this.howler_player_instance != null && this.howler_player_instance.playing()) {
                current_howler_isPlaying = true;
              }
              if (current_howler_isPlaying) {
                this.audioStart({ audio_url: this.current_audiobackground.audio_url });
              }

            },
          },
        ],
      });
      picker.onDidDismiss().then(async => {
        if (document.getElementsByTagName('ion-picker').length == 0) {
          //nothing to delete then!
        } else {
          for (var i = 0; i < document.getElementsByTagName('ion-picker').length; i++) {
            document.getElementsByTagName('ion-picker')[i].remove();
          }
        }

      });
      await picker.present();
    },
    async configureTimer() {
      var text__minutes = "минут"
      this.picker_available = true;
      const picker = await pickerController.create({
        columns: [
          {
            name: 'time_options',
            prefix: '',
            selectedIndex: this.timerPicker_LastOptionIndex,
            options: [
              {
                text: 'Не выключать',
                value: '9000',
              },
              {
                text: '15 ' + text__minutes,
                value: '0.1',
              },
              {
                text: '30 ' + text__minutes,
                value: '30',
              },
              {
                text: '45 ' + text__minutes,
                value: '45',
              },
              {
                text: '60 ' + text__minutes,
                value: '60',
              },
              {
                text: '90 ' + text__minutes,
                value: '90',
              },
              {
                text: '120 ' + text__minutes,
                value: '120',
              },
            ],
          },
        ],
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel',
          },
          {
            text: 'ОК',
            handler: (value) => {
              console.log(`You selected: ${value.time_options.value}`);
              this.current_timer_timevalue_minutes = value.time_options.value;
            },
          },
        ],
      });
      picker.onDidDismiss().then(async => {
        if (document.getElementsByTagName('ion-picker').length == 0) {
          //nothing to delete then!
        } else {
          for (var i = 0; i < document.getElementsByTagName('ion-picker').length; i++) {
            document.getElementsByTagName('ion-picker')[i].remove();
          }
        }

      });
      await picker.present();
      const toast = await toastController.create({
        message: 'По завершении таймера, все звуки приглушатся и телефон перейдет в спящий режим.',
        duration: 5500,
        position: 'top',
      });

      await toast.present();
    }
  }
});

</script>
  