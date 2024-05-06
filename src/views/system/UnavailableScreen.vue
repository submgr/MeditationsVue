<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-toast :isOpen="reconnection_toast_countdown_isopen"
                :message='"Следующая автоматическая попытка переподключения произойдет через " + this.real_times_secs + " секунд..."'
                position='top'></ion-toast>
            <div style="margin-top: 8vh;">

            </div>
            <ExploreContainer name="Tab 3 page" />
            <Vue3Lottie style="height: 40vh; margin-top: 10vh;"
                :animationData="animationData" />
            <ion-header collapse="condense" style="margin-top: 6vh; --background: none;">
                <ion-toolbar style="--background: none;">
                    <ion-title size="large" style="--background: none;">Ой!</ion-title>
                </ion-toolbar>
            </ion-header>
            <div style="margin-left: 1rem;">
                <div style="margin-top: 1vh;">
                    <ion-label>Похоже, что сервера <i>Вашей медитации</i> сейчас недоступны. Мы уже знаем об этой проблеме и
                        стараемся наладить работу!<br /><br /> </ion-label>
                </div>
                <ion-button @click="reconnect()" :disabled="false">Переподключиться</ion-button>

            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonToast, toastController } from '@ionic/vue';

import * as semver from "semver";

import globaldata from '../../modules/global';

import version from 'vite-plugin-package-version';

import { Vue3Lottie } from 'vue3-lottie'

import { Network } from '@capacitor/network';

import animationData from './../../assets/lottie/neo-sakura-page-under-construction.json'

export default defineComponent({
    name: 'Tab3Page',
    components: { IonContent, IonPage, Vue3Lottie, IonToast },
    setup() {
        //
    },
    data() {
        return {
            current_resolve_step: "waiting_for_retry",
            amount_of_completed_retries: 0,
            real_times_secs: 0,
            reconnection_toast_countdown_isopen: false,
            reconnection_auto_retries_intiated: false,

            animationData
        }
    },
    async mounted() {
        //

        const status = await Network.getStatus();
        console.log('Network status:', status);
        if(!status.connected){
            this.reconnection_result('no_network')
        }

        setTimeout(() => {
            this.reconnect();
        }, 1000);
        

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }
    },
    methods: {
        async reconnect() {

            // eslint-disable-next-line
            const parent_this = this;

            this.amount_of_completed_retries += 1;
            const toast = await toastController.create({
                message: 'Переподключение...',
                position: 'top',
                color: 'tertiary'
            });

            await toast.present();

            setTimeout(() => {
                
                this.$http.get(globaldata.api.hostname + "service/app_configs/versioncheck", {
                    params: {

                    }
                }).then((response) => {
                    toast.dismiss()
                    console.log(response)

                    if(response.status == 200){
                        if(response.data.status == "okay"){
                            var min_required_ver_of_app =response.data.data.minrequired_app_version;
                            console.log(`MIN REQUIRED VERSION OF APP STATED BY THE SERVER IS v.${min_required_ver_of_app}`)
                            if(semver.satisfies(this.$store.getters.appVersion, min_required_ver_of_app)){
                                //ok! 
                                console.log("Established connection. User is free to continue using this app.")
                                parent_this.reconnection_result('ok')
                            }else{
                                console.log(`Please, update. Min app version to continue is ${min_required_ver_of_app}, while current version is ${this.$store.getters.appVersion}.`)
                                parent_this.reconnection_result('update', {app_update_link: response.data.data.app_update_link})
                            }
                        }
                    }else{
                        parent_this.reconnection_result('error')
                    }

                    //to get app's version: $store.getters.appVersion
                }).catch(function (error) {
                    toast.dismiss()
                    console.log("CATCHED AN ERROR.", error)
                    parent_this.reconnection_result('error')
                });

            }, 1000);
        },
        async reconnection_result(status: 'ok' | 'error' | 'no_network' | 'update', options = {app_update_link: ""}) {

            var copy_amount_of_completed_retries = this.amount_of_completed_retries;

            console.log("UnavailableScreen::fun/reconnection_result: __ reconnection_result, status IS " + status)

            switch (status) {
                case 'ok':
                    //
                    this.$router.push({path:'/tabs/home', replace: true, query: { }});
                    break;
                case 'error': {
                    const toast1 = await toastController.create({
                        message: 'Сервер все еще недоступен.',
                        duration: 2000,
                        position: 'top',
                    });

                    await toast1.present();

                    if (!this.reconnection_auto_retries_intiated) {
                        this.reconnection_auto_retries_intiated = true;
                        var time_before_reconnect = 10

                        if (copy_amount_of_completed_retries > 5) {
                            time_before_reconnect = 60;
                        } else {
                            time_before_reconnect = 39 % (copy_amount_of_completed_retries * 10)
                        }

                        setTimeout(async () => {

                            this.real_times_secs = time_before_reconnect;

                            var timer = setInterval(() => {
                                this.real_times_secs -= 1;
                            }, 1000);

                            this.reconnection_toast_countdown_isopen = true;
                            
                            setTimeout(() => {
                                clearInterval(timer);
                                this.reconnection_toast_countdown_isopen = false;
                                this.reconnection_auto_retries_intiated = false;
                                this.reconnect();
                            }, time_before_reconnect * 1000);
                        }, 2099);
                    }



                    break;
                }
                case 'no_network':
                    //
                    this.$router.push({path:'/tabs/home', replace: true, query: { isnotconnected: "connectionIsRequired" }});
                    break;
                case 'update':
                    //
                    var update_link = "";
                    if(options.app_update_link){
                        update_link = options.app_update_link;
                    }else{
                        update_link = ""
                    }
                    this.$router.push({path:'/tabs/system/updaterequired', replace: true, query: { app_update_link: update_link }});
                    break;

                default:
                    break;
            }
        }
    }
});

</script>
  