<template>
    <transition name="show">
        <ion-page>
            <ion-content :fullscreen="true" v-if="state == 'main' || state == 'main_processing' || state == 'finishing'">
        
                <p style="padding: 0px 18px 0px; margin-top: 14rem; margin-bottom: 1rem;">
                    <Vue3Lottie :animationData="require('./../../assets/lottie/preloader.json')" :height="200" :width="200" /></p>
                <p class="linear-wipe" style="text-align: center; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">Выполняется вход</p>
                <ion-modal
                    @willDismiss="Modal_onWillDismiss"
                    :is-open="message_modal_isOpen"
                    trigger="open-modal"
                    :initial-breakpoint="0.5"
                    :breakpoints="[0, 0.25, 0.5, 0.75]"
                    handle-behavior="cycle"
                >
                    <ion-content class="ion-padding">
                        <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;">{{message_modal_text}}</ion-label>
                        </div>
                    </ion-content>
                </ion-modal>
            </ion-content>
    </ion-page>
</transition>
    </template>
    
    
    <style scoped>

ion-spinner {
    width: 60px !important;
    height: 60px !important;
}
.linear-wipe {
	background: linear-gradient(-90deg, #000000, #ffffff0b, #757575, #000000);
	background-size: 300%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: animated_text 5s ease-in-out infinite;
	-moz-animation: animated_text 5s ease-in-out infinite;
	-webkit-animation: animated_text 5s ease-in-out infinite;
}

@keyframes animated_text {
	0% { background-position: 0px 50%; }
	50% { background-position: 110% 50%; }
	100% { background-position: 0px 50%; }
}

.show-enter-active,
.show-leave-enter {
    transform: translateX(0);
    transition: all .3s linear;
}
.show-enter,
.show-leave-to {
    transform: translateX(100%);
}
    .hr-line{
        margin-right: 7%; margin-left: 7%; background-color: white; margin-top: 7%; opacity: 0.3;
    }

    .form-control {
        display: block;
        height: 50px;
        margin-right: 0.5rem;
        text-align: center;
        font-size: 1.25rem;
        min-width: 0;
    }

    .form-control:last-child {
        margin-right: 0;
    }
    
    @media (prefers-color-scheme: light) {
        
        ion-content {
            --background: #fff url('../../assets/abstract/noised-white-background.png') no-repeat center center / cover;
        }
    
        .hr-line{
            opacity: 0.12;
            background-color: rgb(0, 0, 0);
        }
    }
    
    @media (prefers-color-scheme: dark) {
        ion-content {
            --background: #000 url('../../assets/abstract/black-and-noise-background.png') no-repeat center center / cover;
        }
        .hr-line{
            background-color: white;
        }
    }
    
    .input-style {
        margin-top: 8%;
        margin-left: 5%;
        width: 90%;
        line-height: 2.3;
        --background: #f8f8f834;
        --padding-start: 13px;
        border-radius: 8px;
    }

    .input-code[value]:not([value=""]){
        font-size: 34px;
    }
    
    .send-button {
        --opacity: 0.7;
    }
    
    @media (prefers-color-scheme: light) {
        .input-style {
            --background: #0502a713;
        }
    }
    </style>
    
    <script lang="ts">
    import {
        defineComponent
    } from 'vue';

    import {
        IonPage,
        IonContent,
        IonInput,
        IonModal,
        modalController,
        IonLabel
    } from '@ionic/vue';
    
    import {
        arrowForwardOutline,
        mailOutline,
        logoGoogle,
        chatbubbleOutline
    } from 'ionicons/icons';

    import { Vue3Lottie } from 'vue3-lottie'
    import 'vue3-lottie/dist/style.css'

    import globaldata from '../../modules/global';

    import XRegExp from'xregexp';
    
    export default defineComponent({
        name: 'Tab1Page',
        components: {
            IonContent,
            IonPage,
            // eslint-disable-next-line
            IonInput,
            IonLabel,
            IonModal,
            Vue3Lottie
        },
        data() {
            return {
                message_modal_isOpen: false,
                state: "main",
                user_firstname: "",
                message_modal_text: "Something went wrong. Code: the text is not defined, but modal is called. Weird.",
            }
        },
        methods: {
            async Modal_onWillDismiss(){
                this.message_modal_isOpen = false;
            },
        },
        mounted(){
            setTimeout(() => {
                // eslint-disable-next-line
                const parent_this = this;
                this.$http.get(globaldata.api.hostname + "service/auth_anonymousAccess").then((response) => {
                        console.log("Received data from server for auth request.", response.data)
                        this.$router.push({path:'/tabs/auth/almostdone', replace: true, query: {
                            auth_token: response.data.auth_token,
                            auth_userid: response.data.user_id
                        }});
                    }).catch(function(error){
                        console.log("error", error)
                        parent_this.message_modal_text = `Произошла ошибка во время обмена данными о сессии. Попробуйте еще раз через несколько минут. Если проблема не проходит, очистите файлы cookie и кеш.`
                        parent_this.message_modal_isOpen = true;
                    });
            }, 3333)
        },
        setup() {
            return {
                arrowForwardOutline,
                logoGoogle,
                mailOutline,
                chatbubbleOutline
            }
        }
    });
    </script>
    