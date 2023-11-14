<template>
    <transition name="show">
        <ion-page>
            <ion-content :fullscreen="true" v-if="state == 'main' || state == 'main_processing' || state == 'finishing'">

                <p style="padding: 0px 18px 0px; margin-top: 14rem; margin-bottom: 1rem;">
                    <Vue3Lottie :animationData="require('./../../assets/lottie/preloader.json')" :style="imgStyle"
                        id="dogImage" :height="172" :width="172" />
                </p>
                <p class="linear-wipe"
                    style="text-align: center; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">
                    Почти готово</p>
            </ion-content>
            <ion-content :fullscreen="true" v-if="state == 'ready_askname' || state == 'ready_askname_processing'">
                <img src="@/assets/illustrations/juicy-photo-of-dog.png"
                    style="margin-top: 7vh; margin-left: 21.5px; height: 27vh; border-radius: 20px;">
                <!--<p style="text-align: left; padding: 0px 22px 0px; margin-top: 0rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">вас зовут...</p>-->
                <p
                    style="text-align: left; padding: 0px 22px 0px; padding-top: 1%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 400;">
                    Укажи свое имя, чтобы мы знали друг друга как друзья!</p>

                <ion-input @input="inputNameValueUpdated($event.target.value)" v-focus @focus="resizeImage"
                    @blur="resetImage" class="input-style" type="text" placeholder="Имя, которым вас зовут друзья"
                    v-model="user_firstname" pattern="text"></ion-input>

                <ion-button @click="gonext" :disabled="state == 'ready_askname_processing'" color="danger"
                    style="margin-right: 5%; margin-left: 35%; margin-top: 3.5%; --opacity: 0.7;" expand="block">
                    <ion-icon v-if="state == 'ready_askname'" class="send-button" slot="end"
                        :icon="arrowForwardOutline"></ion-icon>
                    Продолжить
                    <ion-spinner v-if="state == 'ready_askname_processing'" name="crescent"
                        style="margin-left: 6%; margin-right: -6%;"></ion-spinner>
                </ion-button>

                <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="message_modal_isOpen" trigger="open-modal"
                    :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.75]" handle-behavior="cycle">
                    <ion-content class="ion-padding">
                        <div class="ion-margin-top">
                            <ion-label style="white-space: pre-wrap;">{{ message_modal_text }}</ion-label>
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
    0% {
        background-position: 0px 50%;
    }

    50% {
        background-position: 110% 50%;
    }

    100% {
        background-position: 0px 50%;
    }
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

.hr-line {
    margin-right: 7%;
    margin-left: 7%;
    background-color: white;
    margin-top: 7%;
    opacity: 0.3;
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

    .hr-line {
        opacity: 0.12;
        background-color: rgb(0, 0, 0);
    }
}

@media (prefers-color-scheme: dark) {
    ion-content {
        --background: #000 url('../../assets/abstract/black-and-noise-background.png') no-repeat center center / cover;
    }

    .hr-line {
        background-color: white;
    }
}

#dogImage {
    transition: transform 0.3s ease-in-out;
}

.input-style {
    margin-top: 4%;
    margin-left: 5%;
    width: 90%;
    line-height: 2.3;
    --background: #f8f8f834;
    --padding-start: 13px;
    border-collapse: separate;
    perspective: 1px;
    overflow: hidden;
    border-radius: 8px !important;
}

.input-code[value]:not([value=""]) {
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
    defineComponent,
    nextTick,
    computed
} from 'vue';

import {
    IonPage,
    IonContent,
    IonInput,
    IonModal,
    modalController
} from '@ionic/vue';

import {
    arrowForwardOutline,
    mailOutline,
    logoGoogle,
    chatbubbleOutline,
    thunderstormOutline
} from 'ionicons/icons';

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import globaldata from '../../modules/global';

import XRegExp from 'xregexp';

import store from "../../store";

const getUserData = computed(() => {
    return store.getters.getUserData;
});

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        // eslint-disable-next-line
        IonInput,
        IonModal,
        Vue3Lottie
    },
    data() {
        return {
            imgStyle: {

                WebkitTransform: 'scale(1)',
                transform: 'scale(1)',
                transition: 'transform 0.9s ease-in-out',
                WebkitTransition: 'transform 0.3s ease-in-out'
            },
            message_modal_isOpen: false,
            state: "main",
            user_firstname: "",
            message_modal_text: "Something went wrong. Code: the text is not defined, but modal is called. Weird.",
        }
    },
    directives: {
        focus: {
            mounted(el) {
                el.focus();
            }
        }
    },
    methods: {
        async gonext() {
            if (XRegExp("^[0-9\\p{L}_.]+$").test(this.user_firstname) === true) {
                this.state = 'finishing'
                localStorage.setItem("user_firstname", this.user_firstname)
                this.CompleteAuth();
            } else {
                this.message_modal_text = `Не удалось проверить имя!\n\nУбедитесь, что в указанном имени отсутствуют лишние символы. Оно может содержать только буквы алфавита.\n\nОбратите внимание: пробелы не допускаются.\n\nЕсли ваше имя состоит из нескольких слов, укажите неофициальный вариант без пробела.`
                this.message_modal_isOpen = true;
            }
        },
        async Modal_onWillDismiss() {
            this.message_modal_isOpen = false;
        },
        async inputNameValueUpdated(val) {
            this.user_firstname = this.user_firstname.replace(/[^\p{L}]/gu, '');
            const word = this.user_firstname

            if (word.length > 0) {
                const firstLetter = word.charAt(0)

                const firstLetterCap = firstLetter.toUpperCase()

                const remainingLetters = word.slice(1)

                this.user_firstname = firstLetterCap + remainingLetters
            }
        },
        isLocalStorageAvailable() {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        },
        async CompleteAuth() {
            console.log("Done with AlmostDone-Auth. Going further...")
            // eslint-disable-next-line
            var parent_this = this;

            setTimeout(() => {

                var markerIsRedirectedAlready = false;
                if (!parent_this.isLocalStorageAvailable()) {
                    alert("Произошла ошибка: не удалось прочитать набор данных. Отмена транзакции. Попробуйте позже, или воспользуйтесь другим браузером. Обратите внимание на то, что функционал приложения может быть ограничен в режиме браузера 'Инкогнито'.")
                } else {
                    var local = localStorage.getItem("flag_waitingForAuthPath")
                    if (local && local.length > 1) {
                        markerIsRedirectedAlready = true
                        localStorage.setItem("flag_waitingForAuthPath", "authCompletedSuccessfully")
                        setTimeout(() => {
                            this.$router.push({ path: local + "", replace: true, query: { auth: "true" } });
                        }, 345);
                    }
                }

                if (markerIsRedirectedAlready == false) {
                    this.$router.push({ path: '/tabs/', replace: true, query: { justloggedin: "true" } });
                }



            }, 3000)
        },
        async resizeImage() {
            await nextTick();

            this.imgStyle.WebkitTransform = 'scale(0.8, 0.8)';
            this.imgStyle.transform = 'scale(0.8)';
        },
        resetImage() {

            this.imgStyle.WebkitTransform = 'scale(1, 1)';
            this.imgStyle.transform = 'scale(1)';
        }
    },
    mounted() {
        if (this.$route.query.auth_token) {
            localStorage.setItem("auth_token", (this.$route.query.auth_token).toString());
        }
        if (this.$route.query.auth_userid) {
            localStorage.setItem("auth_userid", (this.$route.query.auth_userid).toString());
        }

        setTimeout(() => {
            this.state = "ready_askname";
        }, 3000)


        console.log(this.$store)
        this.$store.dispatch("fetchUserData").then(() => {
            if (getUserData.value.name != null && getUserData.value.name != undefined) {
                this.user_firstname = getUserData.value.name + ""
            }
            // this.$router.push('/') // Also, its better to invoke router's method from a component than in a store file, anyway reference of a component may not be defined in the store file till you explicity pass it
        });

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }



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
    