import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './i18n'
import { Capacitor } from '@capacitor/core';

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

// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(LoadScript)
  .use(store)

import axios from 'axios'
import VueAxios from 'vue-axios'

import i18next from 'i18next'

import { Network } from '@capacitor/network';

import { toastController } from '@ionic/vue';

axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => {
  return 1000;
} });

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


app.config.globalProperties.$http = axios; // Allow axios in all componenets this.$http.get
app.config.globalProperties.$i18next = i18next;


import * as adsEngine from "./modules/ads_engine"
adsEngine.prepareAdsService();

setTimeout(() => {
  adsEngine.showBanner();
}, 3000);


router.isReady().then(() => {
  app.mount('#app');
});