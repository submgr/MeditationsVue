<template lang="en">
    <ion-page id="ionpage">
        <ion-content :fullscreen="true">
            <NavbarController activatedfrom="Meditation/PlayerScreen" @backfunction="exitMeditation();" @additionalmodalfunction="meditationAdditional()" 
                    @bgpickmodalfunction="backgroundPick()"/>
            <SimpleMeditationBackground v-if="isAvailable_SimpleMeditationBackground" :type="currentBackground.type" 
            :backgroundCode="currentBackground.bgcode" />
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

            <div class="shadow1"></div>
            <div class="shadow2"></div>
            
            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="meditationState == 'prestart_info' && playerState == 'stopped'" trigger="open-modal" :initial-breakpoint="0.50" :breakpoints="[0.50, 0.75]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;"><br><b style="font-size: 28px;">Вы готовы?</b><br><br>Ваша медитация готова. Перед началом мы обычно рекомендуем убедиться, что вам удобно и вы можете слышать звук. Если вокруг шумно, воспользуйтесь наушниками.</ion-label>
                    </div>
                    <div style="margin-top: 5% !important; margin-left: -18px;">
                        <ion-button fill="clear" @click="startMeditation" style="font-weight: 700;">Начать <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                        </ion-button>
                    </div>
                </ion-content>
            </ion-modal>
            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="additionalModalOpenened == 'info'" trigger="open-modal" :initial-breakpoint="0.50" :breakpoints="[0.50, 0.75]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;"><br><b style="font-size: 28px;">Медитация</b><br/><br/>Вы хорошо проводите время!<span v-if="meditationAuthors != null" style="font-size: 13px;"><br><br>Медитация, которую вы сейчас слышите, появилась благодаря этим людям: {{meditationAuthors.name}}</span></ion-label>
                    </div>
                    <div style="margin-top: 5% !important; margin-left: -18px;">
                        <ion-button fill="clear" @click="Modal_onWillDismiss" style="font-weight: 700;">Скрыть <ion-icon slot="end" :icon="chevronDown"></ion-icon>
                        </ion-button>
                    </div>
                </ion-content>
            </ion-modal>
            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="additionalModalOpenened == 'bgpick'" trigger="open-modal">
                <ion-header>
                    <ion-toolbar>
                      <ion-title>Выбрать фон</ion-title>
                      <ion-buttons slot="end">
                        <ion-button @click="Modal_onWillDismiss()">Close</ion-button>
                      </ion-buttons>
                    </ion-toolbar>
                  </ion-header>
                  <ion-content>
                    <p class="ion-padding-horizontal" style="margin-top: 2vh;">Вы можете подобрать фоновое сопровождение, которое вам нравится.</p>
                    <ion-list :inset="true">
                        <ion-item v-for="item in availableBackgrounds" @click="changeBackground(item)">
                            <ion-thumbnail slot="start">
                                <img alt="Silhouette of mountains" :src="globaldata.assets.hostname + '/images/thumbnails/mededitationbg/' + item.code + '.png'" />
                              </ion-thumbnail>
                            <ion-label class="ion-text-wrap" for="terms">{{item.friendly_title}}</ion-label>
                            <ion-checkbox :id="item.code" :checked="currentBackground.bgcode == item.code" @ionChange="checkboxEventChangeBackground" class="bgpicker_checkbox_element"></ion-checkbox>
                          </ion-item>
                      </ion-list>
                    
                    
                  </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
    </template>
    
<style scoped>
#top_el_holder {
    background-color: #19202420 !important;
    font-size: 34px;
    opacity: 0.65;
    margin-left: 2vw;
    margin-top: 0.7vh;
    border-radius: 25px;
}

.controllers_wrapper {
    margin: 0 auto;
    position: fixed;
    z-index: 5;
    bottom: 0vh;
    left: 50%;
    transform: translate(-50%, 0);
    left: 0 !important;
    transform: translate(0, 0) !important;
}

.shadow1 {
    position: absolute;
    width: 60vw;
    height: 7.5vh;
    left: 137px;
    bottom: 0;

    background: #192024;
    filter: blur(41.5px);
}

/* shadow */
.shadow2 {
    position: absolute;
    width: 60vw;
    height: 7.5vh;
    left: 2px;
    bottom: 0;

    background: #192024;
    filter: blur(41.5px);
}

.controllers {

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    /* MusicPlayer */


    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px 16px;
    gap: 2px;
    isolation: isolate;

    width: 100vw;
    height: 12vh;

    background: #24242490;
    background-blend-mode: hard-light, luminosity, overlay;
    backdrop-filter: blur(20px);
    opacity: 0.95;
    border-radius: 40px 40px 0 0;

}

.controllers_grid {
    opacity: 0.7;
    color: #FFFFFF;
    font-size: 36px;
    position: relative;
    top: 61%;
    transform: translateY(-50%);
    margin-bottom: 0;
    text-align: center;
    font-size: 42px;
}

.toast_center {
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
    IonToolbar,
    IonHeader,
    IonTitle,
    IonSelect,
    IonSelectOption,
    CheckboxCustomEvent,
    IonCheckbox,
    actionSheetController


} from '@ionic/vue';

import {
    closeOutline,
    playOutline,
    arrowForward,
    arrowBackOutline,
    ellipsisHorizontal,
    chevronDown
} from 'ionicons/icons';

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import globaldata from '../../modules/global';

import SimpleMeditationBackground from '@/components/SimpleMeditationBackground.vue';
import NavbarController from '@/components/NavbarController.vue';

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
        NavbarController,
        IonIcon,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonToolbar,
        IonSelect,
        IonSelectOption,
        IonCheckbox
    },
    watch: {
        '$route'() {
            this.audiotrack.pause(this.audiotrack_musicid);
            this.backgroundtrack.pause(this.backgroundtrack_musicid);

            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
                tabsEl.hidden = false;
                tabsEl.style.height = "1";
            }
        }
    },
    mounted() {

        // eslint-disable-next-line
        const parent_this = this;


        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        this.currentBackground = {
            bgcode: this.availableBackgrounds[0].code,
            type: this.availableBackgrounds[0].type
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        //sthis.videoplayer = this.$refs.videoplayer.player;



        setInterval(function () {


            // this timer helps us count total time spent with meditation and record it for each user individually
            parent_this.temp_timeCounter_00 += 5
            if ((parent_this.temp_timeCounter_00 >= 60) && (parent_this.playerState = "playing")) {

                var minutes = ~~(parent_this.temp_timeCounter_00 / 60)
                parent_this.temp_timeCounter_00 = parent_this.temp_timeCounter_00 - (60 * minutes)

                var updatedMeditationTime = parseInt(localStorage.getItem("user_meditationtime")) + minutes + 0
                localStorage.setItem("user_meditationtime", updatedMeditationTime + "")
            }
        }, 5000)
    },
    methods: {
        async exitMeditation() {
            // eslint-disable-next-line
            var parent_this = this;
            const actionSheet = await actionSheetController.create({
                header: 'Вы уверены, что хотите прервать эту чудесную медитацию?',
                buttons: [
                    {
                        text: 'Да',
                        role: 'confirm',
                    },
                    {
                        text: 'Нет',
                        role: 'cancel',
                    },
                ],
            });
            actionSheet.present();

            const { role } = await actionSheet.onWillDismiss();

            if (role === 'confirm') {
                parent_this.getBack()
            }
        },
        backgroundPick() {
            this.additionalModalOpenened = "bgpick"
        },
        modalDisallowHiding() {
            this.meditationState = "prestart_info"
        },
        getBack() {
            this.$router.go(-1)
        },
        async Modal_onWillDismiss() {
            this.additionalModalOpenened = "none"
        },
        async meditationAdditional() {
            this.additionalModalOpenened = "info"
        },
        async changeBackground(item) {
            console.log('Requested METHOD changeBackground. Updating background scene right now...', item)
            //this.isAvailable_SimpleMeditationBackground = false
            this.currentBackground.bgcode = item.code
            this.currentBackground.type = item.type
            //this.isAvailable_SimpleMeditationBackground = true
            console.log('VAR currentBackground.bgcode updated.', this.currentBackground.bgcode)
            console.log('VAR currentBackground.type updated.', this.currentBackground.type)
        },
        async checkboxEventChangeBackground(ev: CheckboxCustomEvent) {
            
            const elements: HTMLInputElement[] = Array.from(document.querySelectorAll('.bgpicker_checkbox_element'));

            console.log(elements)

            elements.forEach((v: HTMLInputElement) => {
                
                if (this.currentBackground.bgcode == v.id){
                    v.checked = true
                }else{
                    v.checked = false
                }
            
            });

            ev.detail.checked = true
        },
        async toastAction(type_of_action, direction = null, change_amount = null) {
            var msg = ""
            if (type_of_action == "time_rewind") {
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
            } else if (type_of_action == "player_state_change") {
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
        async playerRewind(direction, time) {
            var audiotrack_playposition_now = this.audiotrack.seek(this.audiotrack_musicid)
            switch (direction) {
                case "past":
                    if (time > audiotrack_playposition_now) {
                        this.audiotrack.seek(0, this.audiotrack_musicid)
                    } else {
                        this.audiotrack.seek(audiotrack_playposition_now - time, this.audiotrack_musicid)
                    }

                    break;

                case "future":
                    console.log("seek info (future)", "this.audiotrack.duration(this.audiotrack_musicid): " + this.audiotrack.duration(this.audiotrack_musicid), "this.audiotrack.seek(this.audiotrack_musicid) + time: " + this.audiotrack.seek(this.audiotrack_musicid) + time)
                    if (this.audiotrack.duration(this.audiotrack_musicid) < this.audiotrack.seek(this.audiotrack_musicid) + time) {
                        console.log("seek info (future)  w1")
                        this.audiotrack.seek(audiotrack_playposition_now, this.audiotrack_musicid)
                    } else {
                        console.log("seek info (future)  w2")
                        this.audiotrack.seek(audiotrack_playposition_now + time, this.audiotrack_musicid)
                    }
                    break;

                default:
                    break;
            }

            this.toastAction("time_rewind", direction, time)
        },
        changePlayerState() {
            if (this.meditationState == "ready") {
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
            } else {
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
                    onpause() {
                        parent_this.playerState = "stopped"
                    },
                    onstop() {
                        parent_this.playerState = "stopped"
                    },
                    async onend() {
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
                            parent_this.$router.push({ path: '/tabs/meditation/finished', replace: true });
                        }, 4000);
                    }
                });
                this.meditationAuthors = JSON.parse(data.content.audio.audiotrack.author);
                console.log("This meditation has been recorded with the help of this contributors: " + this.meditationAuthors.name)
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
                    html5: false,
                    volume: 0.05
                });
                this.backgroundtrack_musicid = this.backgroundtrack.play();
            } else {
                console.log("[SCREEN] Can't find audio/backgroundtrack!")
            }
        }
    },
    data() {
        return {
            globaldata: globaldata,
            availableBackgrounds: [
                // available types:
                // video
                // photo
                // abstract
                {
                    code: "wavyshader",
                    type: "wavy_shader",
                    friendly_title: "Освещающий луч",
                    source: "empty currently"
                },
                {
                    code: "skyontop",
                    type: "video",
                    friendly_title: "Облака медитации",
                    source: "empty currently"
                },
                {
                    code: "underpalm",
                    type: "video",
                    friendly_title: "Гармония пальм",
                    source: "empty currently"
                },
                

            ],
            currentBackground: {
                bgcode: null,
                type: null
            },
            isAvailable_SimpleMeditationBackground: true,
            test: this.$route.params.test,
            temp_timeCounter_00: 0,
            playerState: "stopped",
            meditationAuthors: {
                name: null,
                photo: null
            },
            videoplayer: null,
            meditationState: "prestart_info",
            audiotrack: null,
            audiotrack_musicid: null,
            backgroundtrack: null,
            additionalModalOpenened: "none",
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
            playForwardOutline,
            arrowBackOutline,
            ellipsisHorizontal,
            chevronDown
        }
    }
});
</script>
    