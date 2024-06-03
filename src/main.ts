import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './i18n'
import { Capacitor } from '@capacitor/core';

import { App as CapacitorApp, URLOpenListenerEvent as CapacitorURLOpenListenerEvent } from "@capacitor/app";

import store from "./store";

import { IonicVue } from '@ionic/vue';

import LoadScript from "vue-plugin-load-script";

import axiosRetry from 'axios-retry';

import './index.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions';
import '@morev/vue-transitions/styles';

// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-purple/theme.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(LoadScript)
  .use(vueTransitionsPlugin({
    // Plugin options (optional, described below)
  }))
  .use(store)
  .use(PrimeVue, { ripple: true })


import Ripple from 'primevue/ripple';

app.directive('ripple', Ripple);

import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()

import axios from 'axios'
import VueAxios from 'vue-axios'

import i18next from 'i18next'

import { Network } from '@capacitor/network';

import { toastController } from '@ionic/vue';

import { computed } from 'vue';

const getUserData = computed(() => {
  return store.getters.getUserData;
});

axiosRetry(axios, {
  retries: 3, retryDelay: (retryCount) => {
    return 1000;
  }
});

// Add request interceptor
axios.interceptors.request.use((config) => {
  if (config.url.includes('user/getData')) {
    return config;
  }

  if (config.url.includes('research/savesurveydata')) {
    return config;
  }

  // Assuming the params are in config.params for GET requests
  // and in config.data for POST requests
  if (config.method === 'get') {
    config.params = config.params || {};
    config.params.auth_userid = getUserData.value.id || "";
    config.params.auth_token = getUserData.value.token || "";
  } else if (config.method === 'post') {
    config.data = config.data || {};
    config.data.auth_userid = getUserData.value.id || "";
    config.data.auth_token = getUserData.value.token || "";
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const status = await Network.getStatus();
  console.log('Network status:', status);
  if (!status.connected) {
    const toast = await toastController.create({
      message: 'Для работы этой функции необходимо подключение к Интернету. Подключитесь к сети и повторите попытку.',
      duration: 3500,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
  } else {
    if (error.response.status === 525) {
      // If the error has status code 429, retry the request
      return axios.request(error.config);
    } else {
      router.push({ path: '/tabs/system/unavailable', replace: false, query: {} });
    }

  }
  return Promise.reject(error);
});

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

function runPushNotificationsService() {
  console.log('Initializing HomePage');

  // Request permission to use push notifications
  // iOS will prompt user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token: Token) => {
      console.log('(PushNotifications) Push registration success, token: ' + token.value);
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error: any) => {
      console.log('(PushNotifications) Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log('(PushNotifications) Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      console.log('(PushNotifications) Push action performed: ' + JSON.stringify(notification));
    }
  );
}

runPushNotificationsService();



CapacitorApp.addListener('appUrlOpen', function (event: CapacitorURLOpenListenerEvent) {
  // Example url: https://deqstudio.com/servicereserved/meditationsapp/tabs/tabs2
  // slug = /tabs/tabs2
  const appurlopen_url = event.url;
  let slug = null;
  if (appurlopen_url.startsWith("yourmeditation:")) {
    slug = "/tabs/" + appurlopen_url.split("yourmeditation:").pop();
  } else {
    slug = appurlopen_url.split("deqstudio.com/servicereserved/meditationsapp").pop();
  }


  // We only push to the route if there is a slug present
  if (slug) {
    router.push({
      path: slug,
    });
  }
});

import * as gamificationEngine from "./modules/gamificationEngine"
const achievementsSystem = gamificationEngine.createAchievementsSystem('userAchievements');


app.config.globalProperties.$http = axios; // Allow axios in all componenets this.$http.get
app.config.globalProperties.$i18next = i18next;
app.config.globalProperties.$achievements = achievementsSystem;


import * as adsEngine from "./modules/ads_engine"

var adsSpecificNetwork = null;
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('isVKMiniApps') == "true") {
  adsSpecificNetwork = "vkminiapps"
}

// alert("urlParams.get('isVKMiniApps'): " + urlParams.get('isVKMiniApps'))

adsEngine.prepareAdsService(adsSpecificNetwork);


router.isReady().then(() => {
  app.mount('#app');
});