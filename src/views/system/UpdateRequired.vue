<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div style="margin-top: 4.5vh;">

            </div>
            <Vue3Lottie style="height: 30vh; margin-top: 4vh; margin-left: -20vh;"
                :animationData="animationData" />
            <ion-header collapse="condense" style="margin-top: 4vh; --background: none;">
                <ion-toolbar style="--background: none;">
                    <ion-title size="large" style="--background: none;">Пора обновиться</ion-title>
                </ion-toolbar>
            </ion-header>
            <div style="margin-left: 1rem;">
                <div style="margin-top: 0.4vh;">
                    <ion-label>Вы используете устаревшую версию приложения <i style="opacity: 0.45;"><b>({{ $store.getters.appVersion }})</b></i>, которая больше не поддерживается. <br /><br />С каждым обновлением мы открываем перед пользователям новые горизонты медитации, стараясь делать приложение все лучше и лучше с каждым новым днем. <br /><br />Пожалуйста, обновите приложение, чтобы продолжить.<br /><br /> </ion-label>
                </div>
                <ion-button v-if="!unableToGetUpdateLink" @click="updateApp();" :disabled="!update_button_available" style="margin-left: -2px;">Обновить приложение</ion-button>
                <p v-if="unableToGetUpdateLink">Вы можете обновить приложение в магазине приложений, где и скачивали его. Например, App Store/ Google Play/ Huawei AppGallery и другие источники.</p>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, toastController } from '@ionic/vue';

import * as semver from "semver";

import globaldata from '../../modules/global';

import version from 'vite-plugin-package-version';

import animationData from './../../assets/lottie/juicy-girl-typing-on-phone.json'

import { Vue3Lottie } from 'vue3-lottie'

export default defineComponent({
    name: 'Tab3Page',
    components: { IonContent, IonPage, Vue3Lottie },
    setup() {
        //
    },
    data() {
        return {
            app_update_link: null,
            update_button_available: false,
            unableToGetUpdateLink: false,

            animationData
        }
    },
    mounted() {
        //

        // eslint-disable-next-line
        const parent_this = this;

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        if (this.$route.query.app_update_link) {
            this.app_update_link = this.$route.query.app_update_link
            this.update_button_available = true;
        }else{
            this.$http.get(globaldata.api.hostname + "service/app_configs/versioncheck", {
                    params: {

                    }
                }).then((response) => {
                    console.log(response)

                    if(response.status == 200){
                        if(response.data.status == "okay"){
                            parent_this.app_update_link = response.data.data.app_update_link
                            parent_this.update_button_available = true;
                        }
                    }else{
                        parent_this.unableToGetUpdateLink = true;
                    }

                    //to get app's version: $store.getters.appVersion
                }).catch(function (error) {
                    console.log("CATCHED AN ERROR.", error)
                    parent_this.unableToGetUpdateLink = true;
                });
        }
    },
    methods: {
        updateApp(){
            //
            window.open(this.app_update_link, '_system');
        }
    }
});

</script>
  