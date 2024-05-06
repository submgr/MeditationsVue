<template>
  <ion-page>
    <ion-content :fullscreen="true" class="mainpage_ioncontent">
      <NavbarController activatedfrom="Sleep/SleepMainScreen" @infomodalfunction="showOnboarding()" align="right" />
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
        <div style="bottom: 15vh !important; position:fixed !important; z-index: 5500 !important; width: 100vw; display: block;
 text-align: center;" @click="configureAudioBackground()">
          <span style="text-align: center;" class="light_bottom_gradient">{{ current_audiobackground.title }} <ion-icon style="color: white; opacity: 0.8; margin-left: 1vw; font-size: 2rem; margin-bottom: -0.6rem;"
            :icon="albumsOutline"></ion-icon></span>
          
        </div>

        <Transition>
          <div style="bottom: 11vh !important; position:fixed !important; z-index: 5500 !important; width: 100vw; display: block;
     text-align: center;" v-if="howler_player_instance == null" @click="configureTimer()">
            <span  style="text-align: center;" class="light_bottom_gradient">Таймер: <span v-if="current_timer_timevalue_minutes != 9000">{{
              current_timer_timevalue_minutes }} минут</span><span v-else>без таймера</span> <ion-icon style="color: white; opacity: 0.8; margin-left: 1vw; font-size: 2rem; margin-bottom: -0.6rem;"
              :icon="stopwatchOutline"></ion-icon></span>
           
          </div>
        </Transition>

      </div>

      <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="currentModalOpened == 'sleep_intro'" trigger="open-modal"
        style="margin-top: 5vh;" :initial-breakpoint="1" :breakpoints="[1]" handle-behavior="cycle">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click="Modal_onWillDismiss()">Закрыть</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding ion-text-center" style="text-align: center;">
          <div class="ion-margin-top ion-text-center">
            <img src="../../assets/graphics/sleeping_emoji.png" style="width: 30vw; margin: auto;"
              class="centered-image" />
            <h1 style="margin-top: 5vh; font-size: 1.625rem !important;"><b>Засыпайте быстрее,<br />спите лучше</b></h1>
            <!-- List out the new features -->
            <div v-for="(feature, index) in features" :key="index" class="feature-item"
              style="text-align: left; margin-top: 2vh;">
              <ion-icon style="margin-left: 10px; margin-right: 10px;" :icon="feature.icon" class="feature-icon"
                color="tertiary"></ion-icon>
              <div style="width: 80vw; margin-left: 1vw;">
                <h4 style="font-weight: 800 !important; opacity: 0.75; font-size: 1.25rem !important;">{{ feature.title
                  }}</h4>
                <p style="font-weight: 400 !important; opacity: 0.65;  margin-top: 1px; line-height: 1.45 !important;">
                  {{ feature.description }}</p>
              </div>
            </div>
          </div>
          <ion-button expand="block" @click="Modal_onWillDismiss()" color="primary"
            style="margin-bottom: 7vh; margin-top: 4vh;">
            Хорошо
          </ion-button>
        </ion-content>


      </ion-modal>

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

ion-toolbar {
  --background: none;
}

.header-ios ion-toolbar:last-of-type {
  --border-width: 0 0 0px;
}


.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  /* Adjust the margin as needed */
}

.feature-icon {
  color: white;
  opacity: 0.8;
  font-size: 50px;
  margin-right: 10px;
  /* Adjust the margin as needed */
}


/*ion-content {
  --background: #000000 v-bind("`url(assets/svg/experimental-abstract-night-sky-background-dark-blue.svg)`") no-repeat center center / cover !important;
}*/

.mainpage_ioncontent {
  position: relative;
  background: black !important;
  z-index: -2;
}

.mainpage_ioncontent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/photo/zane-lee-7jus80HTnK0-unsplash_darken.jpg") no-repeat center center / cover !important;
  opacity: 1;
  animation: fadeIn 1.5s ease-in-out forwards;
  z-index: -1;
}

@media (prefers-color-scheme: light) {
  .mainpage_ioncontent {
    color: #ffffff !important;
    --background: url("../../assets/photo/zane-lee-7jus80HTnK0-unsplash_darken.jpg") no-repeat center center / cover !important;
    animation: fadeIn 1.5s ease-in-out;
  }
}

@media (prefers-color-scheme: dark) {
  .mainpage_ioncontent {
    color: #ffffff !important;
    --background: url("../../assets/photo/zane-lee-7jus80HTnK0-unsplash_darken.jpg") no-repeat center center / cover !important;
    animation: fadeIn 1.5s ease-in-out;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

ion-modal ion-content {
  --background: none !important;
}

.centered-image {
  width: 50vw;
  /* Adjust the width as needed */
  max-width: 100%;
  /* Optional: ensures the image is not bigger than its container */
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
import { IonPage, IonContent, IonToolbar, IonButtons, IonHeader, pickerController, toastController, IonButton, IonIcon, IonModal } from '@ionic/vue';

import globaldata from '../../modules/global';

import NavbarController from '@/components/NavbarController.vue';

import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';

declare const vkBridge;

import { Howl, Howler } from 'howler';

import {
  stopwatchOutline,
  albumsOutline,
  flowerOutline,
  moonOutline,
  bedOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonContent, IonPage, NavbarController, IonButton, IonIcon, IonModal, IonToolbar, IonButtons, IonHeader, },
  data() {
    return {
      stopwatchOutline,
      albumsOutline,
      flowerOutline,
      moonOutline,
      bedOutline,
      openedModalName: "timer_configurer",
      pickerColumnsForTimer: null,
      pickerButtonsForTimer: null,
      picker_available: false,
      current_timer_timevalue_minutes: 15,
      SleepingCompanion_timeoutContainer: null,
      timerPicker_LastOptionIndex: 1,
      currentModalOpened: "none",
      availableBgSounds: [
        {
          text: "Лес летом",
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
    if (localStorage.getItem('seenOnboarding') === null) {
      // User hasn't seen the onboarding info
      // Show the onboarding info here
      this.showOnboarding();
    }

    if (this.current_audiobackground.audio_url == null) {
      this.current_audiobackground = {
        title: this.availableBgSounds[0].text,
        audio_url: globaldata.assets.hostname + "/sleepsounds/" + this.availableBgSounds[0].value + ".mp3"
      };
    }

    this.additionalVKBridgeSetups();
  },
  setup() {
    const features = [
      {
        title: 'Успокаивающие саундскейпы',
        description: 'Найдите свою идеальную фоновую мелодию для спокойного сна: от мягкого потрескивания теплого камина до тихого шепота леса в сумерках.',
        icon: flowerOutline
      },
      {
        title: 'Ускоренное наступление сна',
        description: 'Попрощайтесь с бессонницей и долгими попытками заснуть. Наши звуковые ландшафты созданы для того, чтобы помочь вам заснуть быстрее, чем когда-либо прежде.',
        icon: moonOutline
      },
      {
        title: 'Спите хорошо в любом месте',
        description: 'Где бы вы ни находились - дома или в дороге, - это средство поможет вам заснуть естественным образом.',
        icon: bedOutline
      },
      {
        title: 'Настраиваемый таймер сна',
        description: 'Установите таймер сна, чтобы выбранный вами фоновый звук мягко затих.',
        icon: stopwatchOutline
      },
      // Add more features...
    ];

    return {
      features,
    };
  },
  methods: {
    async additionalVKBridgeSetups() {
      // eslint-disable-next-line
      const parent_this = this;

      let isVKMiniApps = false;

      try {
        // Try to get the value from localStorage
        isVKMiniApps = localStorage.getItem('isVKMiniApps') === 'true';
      } catch (e) {
        // If an error occurs (e.g., localStorage is not available), keep isVKMiniApps as false
        console.log('Failed to access localStorage. Defaulting isVKMiniApps to false.');
      }

      if (isVKMiniApps) {
        vkBridge.subscribe((e) => {
          if (e.detail.type === 'VKWebAppViewHide') {
            // Действия при сворачивании или 
            // переключении из игры или мини-приложения
            parent_this.finish("automatic");
          }
        });
      }
    },
    async showOnboarding() {
      this.currentModalOpened = "sleep_intro"
    },
    Modal_onWillDismiss() {
      this.markIntoAsViewed();
      this.currentModalOpened = "none"
    },
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
      //alert("test")
      const test = await Camera.checkPermissions();
      //alert(JSON.stringify(test))
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
    markIntoAsViewed() {
      // Mark that the user has viewed the onboarding info
      localStorage.setItem('seenOnboarding', 'true');
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
                value: '15',
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
        message: 'По окончании таймера все звуки будут отключены, а телефон перейдет в спящий режим.',
        duration: 5500,
        position: 'top',
      });

      await toast.present();
    }
  }
});

</script>