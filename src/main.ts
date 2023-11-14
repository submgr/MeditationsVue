import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './i18n'
import { Capacitor } from '@capacitor/core';

import store from "./store";

import { IonicVue } from '@ionic/vue';

import LoadScript from "vue-plugin-load-script";

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

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(LoadScript)
  .use(store)

import axios from 'axios'
import VueAxios from 'vue-axios'

import i18next from 'i18next'

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