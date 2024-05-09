<template>
    <ion-page id="ionpage">
        <ion-content :fullscreen="true">

            <LoadingActivity :show="false" source="Meditations/PlayerScreen" />

            <div class="loader_at_corner" v-if="audiotrack_isLoading && (meditationState != 'prestart_info')">
                <!-- Your loading spinner content (e.g., a GIF or CSS animation) goes here -->
                <h1><ion-spinner name="lines-sharp"></ion-spinner></h1>
            </div>


            <NavbarController activatedfrom="Meditation/PlayerScreen" @backfunction="exitMeditation();"
                @additionalmodalfunction="meditationAdditional()" @bgpickmodalfunction="backgroundPick()" />
            <SimpleMeditationBackground v-if="isAvailable_SimpleMeditationBackground" :type="currentBackground.type"
                :backgroundCode="currentBackground.bgcode" />
            <div class="controllers_wrapper">
                <div class="controllers">
                    <ion-grid class="controllers_grid">
                        <ion-row>
                            <ion-col v-if="playerState == 'playing'" @click="playerRewind('past', 10)"><ion-icon
                                    :icon="playBackOutline" /></ion-col>
                            <ion-col></ion-col>
                            <ion-col
                                v-if="playerState == 'stopped' && !audiotrack_isLoading && meditationState != 'finished'"
                                @click="changePlayerState(false)"><ion-icon :icon="play" /></ion-col>
                            <ion-col
                                v-if="playerState == 'playing' && !audiotrack_isLoading && meditationState != 'finished'"
                                @click="changePlayerState(false)"><ion-icon :icon="pause" /></ion-col>
                            <ion-col v-if="meditationState == 'finished'" style="opacity: 0.35;"><ion-icon
                                    :icon="play" /></ion-col>
                            <ion-col
                                v-if="audiotrack_isLoading && playerState != 'stopped' && meditationState != 'finished'"><ion-spinner
                                    style="top: -1vh;" name="lines-sharp"></ion-spinner></ion-col>
                            <ion-col></ion-col>
                            <ion-col v-if="playerState == 'playing'" @click="playerRewind('future', 10)"><ion-icon
                                    :icon="playForwardOutline" /></ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
            </div>

            <div class="shadow1"></div>
            <div class="shadow2"></div>

            <ion-modal :is-open="meditationState == 'prestart_info' && playerState == 'stopped' && forceModalClose == false" trigger="open-modal"
                :initial-breakpoint="0.50" :breakpoints="[0.50, 0.75]" :backdrop-dismiss="false"
                handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;"><br><b style="font-size: 28px;">Вы
                                готовы?</b><br><br>Ваша медитация готова. Перед началом мы обычно рекомендуем убедиться,
                            что вам удобно и вы можете слышать звук. Если вокруг шумно, воспользуйтесь
                            наушниками.</ion-label>
                    </div>
                    <div style="margin-top: 5% !important; margin-left: -18px;">
                        <ion-button fill="clear" @click="startMeditation" style="font-weight: 700;">Начать <ion-icon
                                slot="end" :icon="arrowForward"></ion-icon>
                        </ion-button>
                    </div>
                </ion-content>
            </ion-modal>
            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="additionalModalOpenened == 'info'"
                trigger="open-modal" :initial-breakpoint="0.50" :breakpoints="[0.50, 0.75, 1]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;"><br><b
                                style="font-size: 28px;">Медитация</b><br /><br />Вы хорошо проводите время!<span
                                v-if="meditationAuthors != null" style="font-size: 13px;"><br><br>Медитация, которую вы
                                сейчас слышите, появилась благодаря этим людям:
                                {{ meditationAuthors.name }}</span></ion-label>
                        <div class="preloader" v-if="author_data_loaded != true">
                            <h1>
                                <ion-spinner name="lines-sharp"></ion-spinner>
                            </h1>
                        </div>
                        <iframe allowTransparency="true" :src="volunteer_src_iframe" id="author-iframe-0"
                            @load="adjustHeight" style="width: 100vw; height: 0.001vh;">Something went wrong: unable to
                            reach remote host to be placed in this iframe. Looks like a problem on your end.</iframe>
                    </div>
                    <div style="margin-top: 5% !important; margin-left: -18px;">
                        <ion-button fill="clear" @click="Modal_onWillDismiss" style="font-weight: 700;">Скрыть <ion-icon
                                slot="end" :icon="chevronDown"></ion-icon>
                        </ion-button>
                    </div>
                </ion-content>
            </ion-modal>
            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="additionalModalOpenened == 'bgpick'"
                trigger="open-modal">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Выбрать фон</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="Modal_onWillDismiss()">Закрыть</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <p class="ion-padding-horizontal" style="margin-top: 2vh;">Вы можете подобрать фоновое
                        сопровождение, которое вам нравится.</p>
                    <ion-list :inset="true">
                        <ion-item v-for="item in availableBackgrounds" @click="changeBackground(item)">
                            <ion-thumbnail slot="start">
                                <img alt="thumbnail" width="90px" height="90"
                                    :src="globaldata.assets.hostname + '/images/thumbnails/mededitationbg/' + item.code + '.png'" />
                            </ion-thumbnail>
                            <ion-label class="ion-text-wrap" for="terms">{{ item.friendly_title }}</ion-label>
                            <ion-checkbox :id="item.code" :checked="currentBackground.bgcode == item.code"
                                @ionChange="checkboxEventChangeBackground"
                                class="bgpicker_checkbox_element"></ion-checkbox>
                        </ion-item>
                    </ion-list>


                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.loader_at_corner {
    position: fixed;
    /* Fixed position for the loader */
    top: 1.8vh;
    /* Position at the top of the viewport */
    right: 3.5vw;
    /* Position at the right of the viewport */
    width: 50px;
    /* Adjust the width and height as needed */
    height: 50px;
    color: #fff;
    /* Text color of the loader */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Make sure it's on top of other content */
}

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
    actionSheetController,
    IonSpinner,
    IonButtons,
    IonThumbnail,
    IonItem,
    IonList,


} from '@ionic/vue';

import LoadingActivity from '@/components/system/LoadingActivity.vue';

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

declare const vkBridge;

import { Capacitor } from '@capacitor/core'

import { ScreenBrightness } from '@capacitor-community/screen-brightness';

import NoSleep from 'nosleep.js';

import { Device } from '@capacitor/device';

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
        IonCheckbox,
        LoadingActivity,
        IonHeader,
        IonSpinner,
        IonButtons,
        IonThumbnail,
        IonItem,
        IonList,
    },
    watch: {
        '$route'() {
            if (this.audiotrack[this.audiotrack_currentplaying_index] != undefined) {
                this.audiotrack[this.audiotrack_currentplaying_index].pause(this.audiotrack_musicid);
            }

            if (this.backgroundtrack != undefined) {
                this.backgroundtrack.pause(this.backgroundtrack_musicid);
            }



            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
                tabsEl.hidden = false;
                tabsEl.style.height = "1";
            }
        }
    },
    async mounted() {


        // eslint-disable-next-line
        const parent_this = this;
        
        // Attach onpopstate event handler
        window.onpopstate = function (event) {
            parent_this.forceModalClose = true;
        };

        if (Capacitor.isPluginAvailable('ScreenBrightness')) {
            //getting current brightness!!!
            const initial_brightness = await ScreenBrightness.getBrightness();
            this.mobiledevice_brightness = initial_brightness.brightness;
        }

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

        window.addEventListener("message", (event) => {
            if (event.data.type == "iframe_height_author") {
                //alert(JSON.stringify(event.data))
                //alert(event.data.height)
                let iframe = document.querySelector('#author-iframe-0') as HTMLIFrameElement;
                if (iframe) {
                    iframe.height = event.data.height;
                    iframe.style.height = event.data.height + 'px'; // or 'vh', 'em', etc. depending on the unit you want to use
                }
                parent_this.author_data_loaded = true;
            }

        });

        this.additionalVKBridgeSetups();
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
                        parent_this.changePlayerState(true)
                    }
                });
            }
        },
        async wakeLockOn() {
            console.log("(wakeLock) now is ON")
            this.noSleep.enable();

            if (Capacitor.isPluginAvailable('ScreenBrightness')) {
                const brightness = 0.2;
                await ScreenBrightness.setBrightness({ brightness });
            }

        },
        async wakeLockOff() {
            console.log("(wakeLock) now is OFF")
            this.noSleep.disable();
            const info = await Device.getInfo();

            if (info.platform == 'android') {
                const brightness = -1;
                await ScreenBrightness.setBrightness({ brightness });
            } else if (info.platform == 'ios') {
                const brightness = this.mobiledevice_brightness;
                await ScreenBrightness.setBrightness({ brightness });
            }
        },
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
            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
                tabsEl.hidden = false;
                tabsEl.style.height = "1";
            }
            this.$router.push({
                path: "/tabs/home",
                replace: true
            });
            this.wakeLockOff();
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

                if (this.currentBackground.bgcode == v.id) {
                    v.checked = true
                } else {
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
                        this.wakeLockOn();
                        break;
                    case "pause":
                        msg = `на паузе`
                        this.wakeLockOff();
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
        // NOTE: PREVIOUS VERSION OF FUNCTION 'playerRewind'! Below there is a new, which supports time seeking in playlist of multiple audiofiles.
        // async playerRewind(direction, time) {
        //     var audiotrack_playposition_now = this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid)
        //     let seeked = null;
        //     switch (direction) {
        //         case "past":
        //             if (time > audiotrack_playposition_now) {
        //                 this.audiotrack[this.audiotrack_currentplaying_index].seek(0, this.audiotrack_musicid)
        //             } else {
        //                 this.audiotrack[this.audiotrack_currentplaying_index].seek(audiotrack_playposition_now - time, this.audiotrack_musicid)
        //             }

        //             break;

        //         case "future":
        //             console.log("this.audiotrack", this.audiotrack)
        //             console.log("this.audiotrack_currentplaying_index", this.audiotrack_currentplaying_index)
        //             console.log("this.audiotrack[this.audiotrack_currentplaying_index]", this.audiotrack[this.audiotrack_currentplaying_index])
        //             console.log("this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid)", this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid))

        //             //TEMPORARE DEBUG OUTPUTS
        //             console.info("this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid)", this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid))
        //             console.info("this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid)", this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid))

        //             seeked = Number(this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid))
        //             if (isNaN(seeked)) {
        //                 console.info("SEEKED debug 1" + JSON.stringify(this.audiotrack[this.audiotrack_currentplaying_index]))
        //                 seeked = this.audiotrack[this.audiotrack_currentplaying_index]._sounds[0]._seek
        //             }
        //             console.info("provided seek is: " +  seeked)

        //             console.log("seek info (future)", "this.audiotrack.duration(this.audiotrack_musicid): " + this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid), "this.audiotrack.seek(this.audiotrack_musicid) + time: " + this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid) + time)
        //             if (this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid) < this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid) + time) {
        //                 console.log("seek info (future)  w1")
        //                 this.audiotrack[this.audiotrack_currentplaying_index].seek(audiotrack_playposition_now, this.audiotrack_musicid)
        //             } else {
        //                 console.log("seek info (future)  w2")
        //                 console.log("this.audiotrack_currentplaying_index", this.audiotrack_currentplaying_index)
        //                 this.audiotrack[this.audiotrack_currentplaying_index].seek(audiotrack_playposition_now + time, this.audiotrack_musicid)
        //             }
        //             break;

        //         default:
        //             break;
        //     }

        //     this.toastAction("time_rewind", direction, time)
        // },
        async changeCurrentAudioTrack(data) {
            console.log("Changing current Audio Track from FUNCTION 'changeCurrentAudioTrack()' with provided data...", data)

            this.updateAudiotrackLoadingState(true)

            switch (data.special_conditions) {
                case "not_added_to_timetable_track_yet":
                    console.log("SPECIAL CONDITION IN ACTION! =>/not_added_to_timetable_track_yet/<=")
                    console.log("this.audiotrack[data.audiotrack_index]", this.audiotrack[data.audiotrack_index])

                    this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid), this.audiotrack_musicid);

                    break;

                default:
                    this.audiotrack[this.audiotrack_currentplaying_index].stop();
                    this.audiotrack_currentplaying_index = data.audiotrack_index;
                    this.audiotrack_musicid = this.audiotrack[data.audiotrack_index].play();
                    break;
            }

            console.log("data.seek_moment", data.seek_moment)
            console.log("this.audiotrack_musicid", this.audiotrack_musicid)

            this.audio_seekafterplayingstarted = data.seek_moment;
        },
        async eventHandler_audioOnPlay(audioid) {
            console.log("eventHandler_audioOnPlay", this.audio_seekafterplayingstarted)
            console.log("this.audiotrack_currentplaying_index", this.audiotrack_currentplaying_index)
            if (this.audio_seekafterplayingstarted != 0) {
                this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audio_seekafterplayingstarted, audioid)
            }

            this.audio_seekafterplayingstarted = 0;
        },
        async updateAudiotrackLoadingState(state = true) {
            switch (state) {
                case true:
                    this.audiotrack_isLoading = true;
                    break;
                case false:
                    this.audiotrack_isLoading = false;
                    break;
                default:
                    break;
            }
        },
        async playerRewind(direction, time) {
            var audiotrack_playposition_now = this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid)
            let seeked = null;
            var current_element_on_timetable = this.audiotrack_timetable.filter(obj => {
                return obj.audiotrack_index === this.audiotrack_currentplaying_index;
            })[0];
            console.warn("+++++++++++ current_element_on_timetable", current_element_on_timetable)
            var currentposition_on_timetable = current_element_on_timetable["starts_on"] + audiotrack_playposition_now;
            console.warn("+++++++++++ currentposition_on_timetable", currentposition_on_timetable);

            switch (direction) {
                case "past":
                    var xlookingforposition_on_timetable = currentposition_on_timetable - time;
                    console.warn("+++++++++++ lookingforposition_on_timetable", xlookingforposition_on_timetable)
                    if (xlookingforposition_on_timetable < 0) {
                        console.warn("+++++++++++ < 0")
                        //nothing?
                    } else {
                        console.warn("+++++++++++ NOT< 0")
                        for (var x = this.audiotrack_timetable.length - 1; x >= 0; x--) {
                            var marker_alreadyFound = false;
                            if (!marker_alreadyFound) {
                                console.warn("+++++++++++ NOT< 0 LOOP ITERATION x = ", x)
                                var x_startson = this.audiotrack_timetable[x].starts_on;
                                var x_endson = this.audiotrack_timetable[x].ends_on;
                                if ((xlookingforposition_on_timetable > x_startson) && (xlookingforposition_on_timetable < x_endson)) {
                                    marker_alreadyFound = true;
                                    if (this.audiotrack_timetable[x].audiotrack_index == this.audiotrack_currentplaying_index) {
                                        this.audiotrack[this.audiotrack_currentplaying_index].seek(xlookingforposition_on_timetable - x_startson, this.audiotrack_musicid)
                                    } else {
                                        this.changeCurrentAudioTrack(
                                            {
                                                audiotrack_index: this.audiotrack_timetable[x].audiotrack_index,
                                                seek_moment: xlookingforposition_on_timetable - x_startson
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    }

                    break;

                case "future":
                    console.log("this.audiotrack", this.audiotrack)
                    console.log("this.audiotrack_currentplaying_index", this.audiotrack_currentplaying_index)
                    console.log("this.audiotrack[this.audiotrack_currentplaying_index]", this.audiotrack[this.audiotrack_currentplaying_index])
                    console.log("this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid)", this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid))

                    console.log("seek info (future)", "this.audiotrack.duration(this.audiotrack_musicid): " + this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid), "this.audiotrack.seek(this.audiotrack_musicid) + time: " + this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid) + time)
                    if (this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid) < this.audiotrack[this.audiotrack_currentplaying_index].seek(this.audiotrack_musicid) + time) {
                        console.log("seek info (future)  w1")
                        //if all the tracks are added into timetable array
                        if (this.audiotrack_timetable.length == this.fetched_remotedata_audiotrack_length) {
                            var ylookingforposition_on_timetable = parseInt(currentposition_on_timetable) + parseInt(time);
                            var ymarker_alreadyFound = false;
                            var yfound_index = 0;
                            for (var y = this.audiotrack_timetable.length - 1; y >= 0; y--) {

                                if (!ymarker_alreadyFound) {
                                    console.warn("+++++++++++ (looking for future tracks...) LOOP ITERATION x = ", y)
                                    var y_startson = this.audiotrack_timetable[y].starts_on;
                                    var y_endson = this.audiotrack_timetable[y].ends_on;
                                    console.log("+++++++++++ (looking for future tracks...) y_startson y_endson", y_startson, y_endson)
                                    if ((ylookingforposition_on_timetable > y_startson) && (ylookingforposition_on_timetable < y_endson)) {
                                        console.log("+++++++++++ (looking for future tracks...) FOUND for x = ")
                                        ymarker_alreadyFound = true;
                                        yfound_index = y;
                                        if (this.audiotrack_timetable[y].audiotrack_index == this.audiotrack_currentplaying_index) {
                                            this.audiotrack[this.audiotrack_currentplaying_index].seek(ylookingforposition_on_timetable - y_startson, this.audiotrack_musicid)
                                        }
                                    }
                                }
                            }
                            if (ymarker_alreadyFound == false) {
                                this.audiotrack[this.audiotrack_currentplaying_index].seek(audiotrack_playposition_now, this.audiotrack_musicid)
                            } else {
                                this.changeCurrentAudioTrack(
                                    {
                                        audiotrack_index: this.audiotrack_timetable[yfound_index].audiotrack_index,
                                        seek_moment: ylookingforposition_on_timetable - y_startson,
                                        special_conditions: "no"
                                    }
                                )
                            }

                        } else {
                            this.changeCurrentAudioTrack(
                                {
                                    audiotrack_index: -1,
                                    seek_moment: ylookingforposition_on_timetable - this.audiotrack[this.audiotrack_currentplaying_index].duration(this.audiotrack_musicid),
                                    special_conditions: "not_added_to_timetable_track_yet"
                                }
                            )

                        }
                    } else {
                        console.log("seek info (future)  w2")
                        console.log("this.audiotrack_currentplaying_index", this.audiotrack_currentplaying_index)
                        this.audiotrack[this.audiotrack_currentplaying_index].seek(audiotrack_playposition_now + time, this.audiotrack_musicid)
                    }
                    break;

                default:
                    break;
            }

            this.toastAction("time_rewind", direction, time)
        },
        changePlayerState(justPause = false) {
            if (this.meditationState == "ready") {

                // if i want to stop playing audio (for example, app is getting closed),
                // then i pass justPause == true
                // if justPause isn't passed, then just act as state toggler.
                var stateToPass = justPause ? "playing" : this.playerState
                switch (stateToPass) {
                    case "stopped":
                        this.playerState = "playing"
                        this.audiotrack_musicid = this.audiotrack[this.audiotrack_currentplaying_index].play();
                        this.backgroundtrack_musicid = this.backgroundtrack.play();
                        this.toastAction("player_state_change", "resume");
                        break;
                    case "playing":
                        console.log(this.audiotrack[this.audiotrack_currentplaying_index].pause(this.audiotrack_musicid))
                        this.audiotrack[this.audiotrack_currentplaying_index].pause(this.audiotrack_musicid);
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

            this.wakeLockOn();

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

            console.log(data.content.audio.audiotrack.length)

            var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                navigator.userAgent &&
                navigator.userAgent.indexOf('CriOS') == -1 &&
                navigator.userAgent.indexOf('FxiOS') == -1;

            //    var config_html5 = false;
            //    var config_usingWebAudio = true;

            //    // Temporare workaround as long as our assets server (Cloudflare Pages) doesn't support byte-to-byte media sharing.
            //    // because it's the reason why it breaks time seeking and pause-play functions...
            //    // In the future I better fix this problem on server side (we need to set 'Accept-range' to bytes)!
            //    if(isSafari){
            //     config_html5 = true;
            //     config_usingWebAudio = false;
            //    }

            var config_backgroundIsHtml5 = true;
            var config_isSafari = false;

            if (isSafari) {
                config_isSafari = true
            }


            if (data.content.audio.audiotrack) {
                this.fetched_remotedata_audiotrack_length = data.content.audio.audiotrack.length;
                for (let x = 0; x < data.content.audio.audiotrack.length; x++) {
                    console.log("[LOOP](started) Defining audio track with INDEX " + x)
                    this.audiotrack.push(new Howl({
                        preload: true,
                        src: [data.content.audio.audiotrack[x].url],
                        // html5: config_html5,
                        // usingWebAudio: config_usingWebAudio,
                        html5: true,
                        onplay(audioid) {
                            var preparetimetableelement_startson = parent_this.audiotrack_timetable.length == 0 ? 0 : parent_this.audiotrack_timetable[parent_this.audiotrack_timetable.length - 1].ends_on;
                            var duration = parent_this.audiotrack[x].duration(audioid);
                            parent_this.audiotrack_timetable.push({
                                audiotrack_index: x,
                                starts_on: preparetimetableelement_startson,
                                ends_on: preparetimetableelement_startson + duration,
                                duration: duration
                            })

                            console.info("DEBUG FOR ++audiotrack_timetable++ ", parent_this.audiotrack_timetable)
                            console.info("DEBUG FOR ++duration++ ", duration)

                            parent_this.updateAudiotrackLoadingState(false)
                            parent_this.playerState = "playing"

                            parent_this.eventHandler_audioOnPlay(audioid);
                        },
                        onload() {
                            //

                        },
                        onpause() {
                            parent_this.playerState = "stopped"
                        },
                        onstop() {
                            parent_this.playerState = "stopped"
                        },
                        async onend() {

                            const audiotrack_len_indexingcontext = data.content.audio.audiotrack.length - 1;

                            console.info("x_curr: " + x + "\nAUDIOTRACK ARR LEN: " + audiotrack_len_indexingcontext)

                            if (x == audiotrack_len_indexingcontext) {
                                parent_this.playerState = "stopped"
                                const toast = await toastController.create({
                                    message: 'Медитация подошла к концу. Через несколько секунд мы завершаем нашу сессию. Спасибо!',
                                    duration: 10000,
                                    position: 'top'
                                });
                                parent_this.meditationState = "finished"
                                await toast.present();
                                // Function to add +1 to the number of listened meditations in local storage

                                // Check if the 'listenedMeditations' key exists in local storage
                                if (localStorage.getItem('listenedMeditations')) {
                                    // If it exists, retrieve the current value
                                    var currentListenedMeditations = parseInt(localStorage.getItem('listenedMeditations'));
                                    // Increment the value by 1
                                    currentListenedMeditations += 1;
                                    // Update the value in local storage
                                    localStorage.setItem('listenedMeditations', currentListenedMeditations + "");
                                } else {
                                    // If the 'listenedMeditations' key does not exist, set it to 1
                                    localStorage.setItem('listenedMeditations', 1 + "");
                                }

                                setTimeout(() => {
                                    //FIX IT LATER PLEEEEASE!!!
                                    //parent_this.audiotrack[this.audiotrack_currentplaying_index].fade(parent_this.audiotrack[this.audiotrack_currentplaying_index].volume(parent_this.audiotrack_musicid), 0, 2000, parent_this.audiotrack_musicid);
                                    parent_this.backgroundtrack.fade(parent_this.backgroundtrack.volume(parent_this.backgroundtrack_musicid), 0, 2000, parent_this.backgroundtrack_musicid);
                                    localStorage.setItem("temp_metricsVal_0x11320214", "00111_compaign1")
                                    parent_this.$router.push({ path: '/tabs/meditation/finished', replace: true });
                                }, 10500);
                            } else {
                                console.log("perf-1")
                                parent_this.audiotrack_currentplaying_index += 1;
                                console.log("perf-2")
                                parent_this.updateAudiotrackLoadingState(true)
                                parent_this.audiotrack_musicid = parent_this.audiotrack[parent_this.audiotrack_currentplaying_index].play();
                            }

                        }
                    }))
                    console.log("[LOOP](finished) Defined audio track with INDEX " + x)
                    console.log("[LOOP](finished) Current array containing audiotracks info is: " + parent_this.audiotrack)
                }
                this.meditationAuthors = { name: 'ON MAINTENANCE', photo: "" };
                console.log("This meditation has been recorded with the help of this contributors: " + this.meditationAuthors.name)
                setTimeout(() => {
                    parent_this.audiotrack_musicid = parent_this.audiotrack[parent_this.audiotrack_currentplaying_index].play();
                }, 0); //some time before we had here 9000 instead of 0.
                this.playerState = "playing"
            } else {
                console.log("[SCREEN] THERE IS NO audio/audiotrack!")
            }

            if (data.content.audio.backgroundtrack) {

                this.backgroundtrack = new Howl({
                    //src: [data.content.audio.backgroundtrack.url],
                    src: [data.content.audio.backgroundtrack.url],
                    html5: true,
                    volume: 1,
                    loop: true
                });
                this.backgroundtrack_musicid = this.backgroundtrack.play();
            } else {
                console.log("[SCREEN] Can't find audio/backgroundtrack!")
            }
        }
    },
    created() {
        //
    },
    data() {
        return {
            forceModalClose: false,
            author_data_loaded: false,
            volunteer_src_iframe: 'https://xn--80aaafmfwb5a7d2bq4h.xn--p1ai/systemvolunteerinfo/?id=1',
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
                {
                    code: "cssgodrays",
                    type: "css_god_rays",
                    friendly_title: "Северное сияние",
                    source: "empty currently"
                }


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
            audiotrack: [],
            audio_seekafterplayingstarted: 0,
            fetched_remotedata_audiotrack_length: 0,
            audiotrack_currentplaying_index: 0,
            audiotrack_isLoading: true,
            audiotrack_musicid: null,
            audiotrack_timetable: [],
            backgroundtrack: null,
            additionalModalOpenened: "none",
            backgroundtrack_musicid: null,
            popoverOpen: false,
            event: null,
            mobiledevice_brightness: null,
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
        var noSleep = new NoSleep();
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
            chevronDown,
            noSleep
        }
    }
});
</script>