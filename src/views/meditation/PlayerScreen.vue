<template lang="en">
<ion-page>
    <ion-content :fullscreen="true">
        <SimpleMeditationBackground/>
        <div class="controllers_wrapper">
            <div class="controllers">
                <ion-grid class="controllers_grid">
                    <ion-row>
                        <ion-col @click="playerRewind('past', 10)"><ion-icon :icon="playBackOutline" /></ion-col>
                        <ion-col></ion-col>
                        <ion-col v-if="playerState == 'stopped'" @click="changePlayerState"><ion-icon :icon="play" /></ion-col>
                        <ion-col v-if="playerState == 'playing'" @click="changePlayerState"><ion-icon :icon="pause" /></ion-col>
                        <ion-col></ion-col>
                        <ion-col @click="playerRewind('future', 10)"><ion-icon :icon="playForwardOutline" /></ion-col>
                    </ion-row>
                </ion-grid> 
            </div>
        </div>
        <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="meditationState == 'prestart_info' && playerState == 'stopped'" trigger="open-modal" :initial-breakpoint="0.50" :breakpoints="[0.50, 0.75]" handle-behavior="cycle">
            <ion-content class="ion-padding">
                <div class="ion-margin-top">
                    <ion-label style="white-space: pre-wrap;"><br><b style="font-size: 28px;">Вы готовы?</b><br><br>Ваша медитация готова. Перед началом мы обычно рекомендуем убедиться, что вам удобно и вы можете слышать звук. Если вокруг шумно, воспользуйтесь наушниками.</ion-label>
                </div>
                <div style="margin-top: 5% !important;">
                    <ion-label style="white-space: pre-wrap;"><ion-button fill="clear" @click="startMeditation" style="font-weight: 700; margin-left: -3.95% !important;">Начать <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                    </ion-button></ion-label>
                    
                </div>
            </ion-content>
        </ion-modal>
    </ion-content>
</ion-page>
</template>

<style scoped>
.controllers_wrapper{
    margin: 0 auto;
    position: fixed;
    z-index: 5;
    bottom: 3vh;
    left: 50%;
    transform: translate(-50%, 0);
}
.controllers{
    width: 86vw;
    height: 9vh;
    border-radius: 23px;
    opacity: 0.46;
    border-color: rgba(255, 255, 255, 0.144);
    box-shadow: 0 0 19px #ffffff5a;
    border-style:dotted;
    border-width: 1px;
}
.controllers_grid{
    color: rgba(255, 255, 255, 0.499);
    font-size: 26px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 10vw;
    margin-right: 10vw;
    text-align: center;
}

.toast_center{
    --text-align: center;
}

</style>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import {
    Howl,
    Howler
} from 'howler';
import {
    IonPage,
    IonContent,
    IonModal,
    IonLabel,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    toastController,

} from '@ionic/vue';

import {
    closeOutline,
    playOutline,
    arrowForward
} from 'ionicons/icons';

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import globaldata from '../../modules/global';

import SimpleMeditationBackground from '@/components/SimpleMeditationBackground.vue';

import { gameController, playBackOutline, play, pause, playForwardOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'Tab1Page',
    props: {
        clinical_records: String,
    },
    components: {
        IonContent,
        IonPage,
        IonModal,
        IonLabel,
        VuePlyr,
        SimpleMeditationBackground,
        IonIcon,
        IonGrid,
        IonRow,
        IonCol,
        IonButton
    },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        //sthis.videoplayer = this.$refs.videoplayer.player;
    },
    methods: {
        modalDisallowHiding(){
            this.meditationState = "prestart_info"
        },
        async toastAction(type_of_action, direction = null, change_amount = null){
                var msg = ""
                if(type_of_action == "time_rewind"){
                    switch (direction) {
                        case "past":
                            msg = `<< вернуться назад на ${change_amount} секунд`
                            break;
                        case "future":
                            msg = `перейти вперед на ${change_amount} секунд >>`
                            break;
                        default:
                            break;
                    }
                }else if(type_of_action == "player_state_change"){
                    switch (direction) {
                        case "resume":
                            msg = `проигрывается`
                            break;
                        case "pause":
                            msg = `на паузе`
                            break;
                        default:
                            break;
                    }
                }

                const toast = await toastController.create({
                    message: msg,
                    color: "tertiary",
                    cssClass: "toast_center",
                    duration: 100,
                    animated: true,
                    position: 'middle'
                });
                await toast.present();
        },
        async playerRewind(direction, time){
            var audiotrack_playposition_now = this.audiotrack.seek(this.audiotrack_musicid)
            switch (direction) {
                case "past":
                    if(time > audiotrack_playposition_now){
                        this.audiotrack.seek(0, this.audiotrack_musicid)
                    }else{
                        this.audiotrack.seek(audiotrack_playposition_now - time, this.audiotrack_musicid)
                    }
                    
                    break;

                case "future":
                    if( this.audiotrack.duration(this.audiotrack_musicid) < this.audiotrack.seek(this.audiotrack_musicid) + time){
                        this.audiotrack.seek(audiotrack_playposition_now, this.audiotrack_musicid)
                    }else{
                        this.audiotrack.seek(audiotrack_playposition_now + time, this.audiotrack_musicid)
                    }
                    break;
            
                default:
                    break;
            }

            this.toastAction("time_rewind", direction, time)
        },
        changePlayerState(){
            if(this.meditationState == "ready"){
                switch (this.playerState) {
                    case "stopped":
                        this.playerState = "playing"
                        this.audiotrack_musicid = this.audiotrack.play();
                        this.backgroundtrack_musicid = this.backgroundtrack.play();
                        this.toastAction("player_state_change", "resume");
                        break;
                    case "playing":
                        console.log(this.audiotrack.pause(this.audiotrack_musicid))
                        this.audiotrack.pause(this.audiotrack_musicid);
                        this.backgroundtrack.pause(this.backgroundtrack_musicid);
                        this.playerState = "stopped";
                        this.toastAction("player_state_change", "pause");
                        break;
                    default:
                        break;
                }
            }else{
                this.startMeditation()
            }
        },
        startMeditation() {
            this.meditationState = "ready"
            var data = JSON.parse(localStorage.getItem("temp/alfa_meditationdata"))
            console.log("Received LOCAL persist data from localstorage.", data)

            var a = 1;

            if (1 > a + 1) {
                //this.videoplayer.source = {
                //    type: 'video',
                //    title: 'Meditation',
                //    sources: [{
                //            src: 'https://test.deqstudio.com/pexels-tima-miroshnichenko-5716900.mp4',
                //            type: 'video/mp4',
                //            size: 720,
                //        },
                //        {
                //            src: 'https://test.deqstudio.com/pexels-tima-miroshnichenko-5716900.mp4',
                //            type: 'video/webm',
                //            size: 1080,
                //        },
                //    ]
                //};
                //this.videoplayer.play();
            }

            if (!data.content) {
                console.log("[SCREEN] CAN'T ACCESS $content AT $response!\nIt's critical!")
            }

            // eslint-disable-next-line
            const parent_this = this;

            if (data.content.audio.audiotrack) {
                this.audiotrack = new Howl({
                    src: [data.content.audio.audiotrack.url],
                    html5: true,
                    onpause(){
                        parent_this.playerState = "stopped"
                    },
                    onstop(){
                        parent_this.playerState = "stopped"
                    },
                    async onend(){
                        parent_this.playerState = "stopped"
                        const toast = await toastController.create({
                            message: 'Медитация подошла к концу. Через несколько секунд мы завершаем нашу сессию. Спасибо!',
                            duration: 4000,
                            position: 'top'
                        });
                        await toast.present();
                        setTimeout(() => {
                            parent_this.audiotrack.fade(parent_this.audiotrack.volume(parent_this.audiotrack_musicid), 0, 2000, parent_this.audiotrack_musicid);
                            parent_this.backgroundtrack.fade(parent_this.backgroundtrack.volume(parent_this.backgroundtrack_musicid), 0, 2000, parent_this.backgroundtrack_musicid);
                            parent_this.$router.push( { path:'/tabs/meditation/finished', replace: true } );
                        }, 4000);
                    }
                });
                setTimeout(() => {
                    this.audiotrack_musicid = this.audiotrack.play();
                }, 0); //some time before we had here 9000 instead of 0.
                this.playerState = "playing"
            } else {
                console.log("[SCREEN] THERE IS NO audio/audiotrack!")
            }

            if (data.content.audio.backgroundtrack) {
                this.backgroundtrack = new Howl({
                    src: [data.content.audio.backgroundtrack.url],
                    volume: 0.05,
                    html5: true
                });
                this.backgroundtrack_musicid = this.backgroundtrack.play();
            } else {
                console.log("[SCREEN] Can't find audio/backgroundtrack!")
            }
        }
    },
    data() {
        return {
            test: this.$route.params.test,
            playerState: "stopped",

            videoplayer: null,
            meditationState: "prestart_info",
            audiotrack: null,
            audiotrack_musicid: null,
            backgroundtrack: null,
            backgroundtrack_musicid: null,
            popoverOpen: false,
            event: null,
            options: {
                autoplay: false,
                loop: {
                    active: true
                },
                settings: [],
                controls: [],
                fullscreen: {
                    enabled: false,
                    fallback: true,
                    iosNative: false,
                    container: null
                }
            }
        }
    },
    setup() {
        return {
            gameController,
            closeOutline,
            playOutline,
            arrowForward,
            playBackOutline,
            play,
            pause,
            playForwardOutline
        }
    }
});
</script>
