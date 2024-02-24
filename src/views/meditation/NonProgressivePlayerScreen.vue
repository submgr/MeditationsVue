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
                    <div style="margin-top: 5% !important; margin-left: -18px;">
                        <ion-button fill="clear" @click="startMeditation" style="font-weight: 700;">Начать <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                        </ion-button>
                    </div>
                </ion-content>
            </ion-modal>
            <ion-modal @willDismiss="Modal_onWillDismiss" :canDismiss="isCanDismissDownloaderModal" :is-open="meditationState == 'downloading'" trigger="open-modal" :initial-breakpoint="0.6" :breakpoints="[0.6]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <Vue3Lottie :animationData="require('./../../assets/lottie/131216-loading.json')" :height="180" :width="200" />
                        <div text-center>
                            <ion-label style="white-space: pre-wrap;"><span style="text-align: center;"><br><b style="font-size: 28px;">Медитация загружается</b><br><br>Мы создали медитацию специально для вас, осталось только загрузить ее. Это не займет много времени.</span></ion-label>
                        </div>
                    </div>
                    <div style="margin-top: 5% !important; margin-left: -18px; display: none">
                        <ion-button fill="clear" @click="startMeditation" style="font-weight: 700;">Начать <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                        </ion-button>
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
        toastController
    
    } from '@ionic/vue';
    
    import {
        closeOutline,
        playOutline,
        arrowForward
    } from 'ionicons/icons';
    
    import VuePlyr from 'vue-plyr'
    import 'vue-plyr/dist/vue-plyr.css'
    
    import globaldata from '../../modules/global';

    import { Vue3Lottie } from 'vue3-lottie'
    import 'vue3-lottie/dist/style.css'
    
    import SimpleMeditationBackground from '@/components/SimpleMeditationBackground.vue';

    import * as Tone from 'tone'
    import * as Pizzicato from 'pizzicato'
    
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
            IonButton,
            Vue3Lottie
        },
        mounted() {
            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
                tabsEl.hidden = true;
                tabsEl.style.height = "1";
            }

            this.loadMeditation()

    
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
                this.audiotrack.pause()
                var audiotrack_playposition_now = this.audiotrack.offsetTime
                switch (direction) {
                    case "past":
                        if(time > audiotrack_playposition_now){
                            this.audiotrack.play()
                        }else{
                            this.audiotrack.play(0, audiotrack_playposition_now - time)
                        }
                        
                        break;
    
                    case "future":
                        
                        if( this.audiotrack.sourceNode.buffer.duration < this.audiotrack.offsetTime + time){
                            //nothing then? just start is back i guess
                            this.audiotrack.play()
                        }else{
                            this.audiotrack.play(0, audiotrack_playposition_now + time)
                        }
                        break;
                
                    default:
                        this.audiotrack.play()
                        break;
                }
    
                this.toastAction("time_rewind", direction, time)
            },
            changePlayerState(source_of_action = "none"){
                if(this.meditationState == "ready"){
                    switch (this.playerState) {
                        case "stopped":
                            this.playerState = "playing"
                            this.audiotrack.play();
                            this.backgroundtrack.play();
                            this.toastAction("player_state_change", "resume");
                            break;
                        case "playing":
                            if(source_of_action == "StoppedByListener"){
                                this.isStoppedByListener = true;
                            }else{
                                this.isStoppedByListener = false;
                            }
                            this.audiotrack.pause();
                            this.backgroundtrack.pause();
                            this.playerState = "stopped";
                            this.toastAction("player_state_change", "pause");
                            break;
                        default:
                            break;
                    }
                }else{
                    this.loadMeditation()
                }
            },
            
            async showToastMessage(msg){
                const toast = await toastController.create({
                    message: msg,
                    color: "tertiary",
                    cssClass: "toast_center",
                    duration: 2000,
                    animated: true,
                    position: 'top'
                });
                await toast.present();
            },
            async startMeditation() {
                

                console.log("a", this.audiotrack.lastTimePlayed)
                // eslint-disable-next-line
                const parent_this = this;
                setInterval(() => {
                    console.log("a", parent_this.audiotrack)
                }, 5000);
                console.log("a", this.audiotrack)
                console.info("(1) context state:" + Tone.context.state)
                if (Tone.context.state !== 'running') {
                    await Tone.context.resume()
                }
                console.info("(1) context state:" + Tone.context.state)
                console.log('audio is ready')
                this.audiotrack.play()
                if(this.backgroundtrack_isReady == true){
                    this.backgroundtrack.play()
                }

                this.playerState = "playing"

                this.meditationState = "ready"
                
                
                
                
            },
            async loadMeditation() {
                // eslint-disable-next-line
                const parent_this = this;

                window.addEventListener('focus', function (event) {
                    console.log('(player-listener) has focus');
                    console.log("(player-listener) data list", parent_this.isStoppedByListener, parent_this.playerState)
                    if(parent_this.isStoppedByListener == true && parent_this.playerState == "stopped"){
                        console.log("(player-listener) has-focus ->> play meditation then")
                        parent_this.changePlayerState();
                    }
                });

                window.addEventListener('blur', function (event) {
                    console.log('(player-listener) lost focus');
                    if(parent_this.playerState == "playing"){
                        parent_this.changePlayerState("StoppedByListener");
                    }
                });

                var data = JSON.parse(localStorage.getItem("temp/alfa_meditationdata"))
                console.log("Received LOCAL persist data from localstorage.", data)
    
    
                if (!data.content) {
                    console.log("[SCREEN] CAN'T ACCESS $content AT $response!\nIt's critical!")
                }
    
                if (data.content.audio.audiotrack) {
                    this.audiotrack = new Pizzicato.Sound({ 
                        source: 'file',
                        options: { path: data.content.audio.audiotrack.url }
                    }, function() {
                        console.info('sound (audiotrack) file loaded!');
                        parent_this.isCanDismissDownloaderModal = true;
                        setTimeout(() => {
                            parent_this.meditationState = "prestart_info"
                            parent_this.showToastMessage("Медитация загружена")
                        }, 200);
                    });

                    this.audiotrack.on('end', async function() {
                        //...
                        parent_this.playerState = "stopped"
                        const toast = await toastController.create({
                            message: 'Медитация подошла к концу. Через несколько секунд мы завершаем нашу сессию. Спасибо!',
                            duration: 4000,
                            position: 'top'
                        });
                        await toast.present();
                        parent_this.audiotrack.stop();
                        setTimeout(() => {
                            parent_this.backgroundtrack.stop();
                            parent_this.$router.push( { path:'/tabs/meditation/finished', replace: true } );
                        }, 4000);
                    })
                    

                    
                } else {
                    console.log("[SCREEN] THERE IS NO audio/audiotrack!")
                }
    
                if (data.content.audio.backgroundtrack) {
                    this.backgroundtrack = new Pizzicato.Sound({ 
                        source: 'file',
                        release: '4',
                        
                        options: { path: data.content.audio.backgroundtrack.url, loop: true, }
                    }, function() {
                        console.info('sound (backgroundtrack) file loaded!');
                        parent_this.showToastMessage("Фоновое сопровождение загружено")
                        parent_this.backgroundtrack_isReady = true;
                        if(parent_this.playerState == "playing"){
                            parent_this.backgroundtrack.play();
                        }
                    });
                    this.backgroundtrack.volume = 0.06;
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
                //meditationState: "prestart_info",
                meditationState: "downloading",
                isStoppedByListener: false,
                isCanDismissDownloaderModal: false,
                audio_ishtml5: false,
                audiotrack: null,
                backgroundtrack_isReady: false,
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
