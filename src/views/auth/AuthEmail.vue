<template>

    <ion-page>
        <NavbarController activatedfrom="Auth/AuthEmail" @backfunction="$router.back()" align="right" />

        <ion-content class="animate__animated" :fullscreen="true" v-if="state == 'main' || state == 'main_processing'">
            <Transition name="bounce" class="animate__animated">
                <div>
                    <h1 style="margin-left: 15px; margin-top: 11%; font-size: 120px;">
                        <ion-icon slot="start" :icon="mailOutline" style="text-align: left;"></ion-icon>
                    </h1>

                    <p
                        style="text-align: left; padding: 0px 22px 0px; margin-top: -1.5rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">
                        Эл. адрес</p>
                    <p
                        style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 400;">
                        На указанный эл. адрес мы отправим сообщение с кодом.</p>

                    <ion-input class="input-style" autofocus="true" type="email" placeholder="Электронный адрес"
                        v-model="email" pattern="email"></ion-input>

                    <ion-button @click="signin" :disabled="state == 'main_processing'" color="danger"
                        style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
                        <ion-icon v-if="state == 'main'" class="send-button" slot="end"
                            :icon="arrowForwardOutline"></ion-icon>
                        Продолжить
                        <ion-spinner v-if="state == 'main_processing'" name="crescent"
                            style="margin-left: 6%; margin-right: -6%;"></ion-spinner>
                    </ion-button>

                    <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="message_modal_isOpen" trigger="open-modal"
                        :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]" handle-behavior="cycle">
                        <ion-content class="ion-padding">
                            <div class="ion-margin-top">
                                <ion-label style="white-space: pre-wrap;">{{ message_modal_text }}</ion-label>
                            </div>
                        </ion-content>
                    </ion-modal>
                </div>


            </Transition>
        </ion-content>


        <ion-content class="animate__animated" :fullscreen="true"
            v-if="state == 'awaiting_code' || state == 'awaiting_code_processing'">
            <transition-slide>
                <div>
                    <h1 style="margin-left: 15px; margin-top: 11%; font-size: 120px;">
                        <ion-icon slot="start" :icon="mailOutline" style="text-align: left;"></ion-icon>
                    </h1>

                    <p
                        style="text-align: left; padding: 0px 22px 0px; margin-top: -1.5rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">
                        Это вы?</p>
                    <p
                        style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200; line-height: 1.3;">
                        Сообщение с кодом отправлено на указанный электронный адрес. Введите полученный код ниже, чтобы
                        продолжить.</p>
                    <ion-input @input="inputVerificationCodeValueUpdated($event.target.value)" class="input-style input-code" autofocus="true" type="text"
                        placeholder="Код подтверждения" v-model="code" pattern="number"></ion-input>

                    <ion-button @click="sendcode" :disabled="state == 'awaiting_code_processing'" color="danger"
                        style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
                        <ion-icon v-if="state == 'awaiting_code'" class="send-button" slot="end"
                            :icon="arrowForwardOutline"></ion-icon>
                        Продолжить
                        <ion-spinner v-if="state == 'awaiting_code_processing'" name="crescent"
                            style="margin-left: 6%; margin-right: -6%;"></ion-spinner>
                    </ion-button>

                    <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="message_modal_isOpen" trigger="open-modal"
                        :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]" handle-behavior="cycle">
                        <ion-content class="ion-padding">
                            <div class="ion-margin-top">
                                <ion-label style="white-space: pre-wrap;">{{ message_modal_text }}</ion-label>
                            </div>
                        </ion-content>
                    </ion-modal>
                </div>


            </transition-slide>
        </ion-content>

    </ion-page>
</template>


<style scoped>
.bounce-enter-active {
    animation: animate__backInLeft 0.5s;
}

.bounce-leave-active {
    animation: animate__backInLeft 0.5s reverse;

}

@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
    transform: scale(0);

  }

  50% {
    transform: translate3d(0, 0, 0);
    transform: scale(1.08);
  }

  100% {
    transform: translate3d(0, 0, 0);
    transform: scale(1);
  }
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

.input-style {
    margin-top: 8%;
    margin-left: 5%;
    width: 90%;
    line-height: 2.3;
    --background: #f8f8f834;
    --padding-start: 13px;
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
    defineComponent
} from 'vue';
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonModal,
    IonSpinner,
    modalController,
    createAnimation
} from '@ionic/vue';

import { TransitionSlide } from '@morev/vue-transitions';

import type { Animation } from '@ionic/vue';

import NavbarController from '@/components/NavbarController.vue';

import {
    arrowForwardOutline,
    mailOutline,
    logoGoogle,
    chatbubbleOutline
} from 'ionicons/icons';

import globaldata from '../../modules/global';

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        IonModal,
        IonSpinner,
        // eslint-disable-next-line
        IonInput,
        IonButton,
        IonIcon,
        TransitionSlide,
        NavbarController
    },
    data() {
        return {
            message_modal_isOpen: false,
            userid: "",
            code: "",
            state: "main",
            message_modal_text: "Something went wrong. Code: the text is not defined, but modal is called. Weird.",
            email: "",
            verificationCode: ""
        }
    },
    methods: {
        async inputVerificationCodeValueUpdated(val){
            var processedVal = val.replace(/\D/g,'').substring(0, 6);
            this.code = processedVal + "";
        },
        async signin() {
            this.state = "main_processing"
            var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var test_result = re.test(this.email);
            if (!test_result) {
                this.message_modal_text = "Не удалось отправить код подтверждения на электронный адрес, указанный тобой. Убедись, что в нем нет ошибок."
                this.message_modal_isOpen = true;
                this.state = "main"
            } else {
                // eslint-disable-next-line
                var parent_this = this;
                this.$http.get(globaldata.api.hostname + "service/auth", {
                    params:
                        { method: "email", login_thing: this.email }
                }).then((response) => {
                    console.log("Received data from server for auth request.", response.data)
                    if (response.data.status == "okay") {
                        parent_this.state = "awaiting_code"
                        this.userid = response.data.userid;
                        console.log("Obtained userId (" + this.userid + ") and following next verification step.")
                    } else {
                        this.message_modal_text = `Мы не смогли отправить код подтверждения на указанный электронный адрес (${parent_this.email}). Проверьте правильность указанного адреса.\n\nСведения: ${response.data.message}; $${response.data.details}`
                        this.message_modal_isOpen = true;
                        parent_this.email = "";
                        parent_this.state = "main"
                    }
                }).catch(function (error) {
                    parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error + '\n' + globaldata.api.hostname
                    parent_this.message_modal_isOpen = true;
                    parent_this.state = "main"
                });

            }
        },
        async sendcode() {
            this.state = "awaiting_code_processing"
            if (this.code.length != 6) {
                this.message_modal_text = "Некорректный код подтверждения, он должен состоять из 6 цифр. Попробуйте еще раз."
                this.message_modal_isOpen = true;
                this.state = "awaiting_code"
            } else {
                // eslint-disable-next-line
                var parent_this = this;
                var auth_userid = this.userid;
                this.$http.get(globaldata.api.hostname + "service/auth_getToken", {
                    params:
                        { userid: this.userid, verificationCode: this.code }
                }).then((response) => {
                    console.log("Received data from server for auth request.", response.data)
                    if (response.data.status == "okay") {
                        this.$router.push({
                            path: '/tabs/auth/almostdone', replace: true, query: {
                                auth_token: response.data.auth_token,
                                auth_userid: auth_userid
                            }
                        });
                        //parent_this.message_modal_text = `Выполнен вход.`
                        //parent_this.message_modal_isOpen = true;
                    } else {
                        if(response.data.status == "error" && response.data.message == "wrong_code"){
                            this.message_modal_text = `Код подтверждения не подошел. Попробуйте еще раз.`
                        }else{
                            this.message_modal_text = `Код подтверждения не подошел. Попробуйте еще раз.\n\nСведения: ${response.data.status}—${response.data.message}`
                        }
                        
                        this.message_modal_isOpen = true;
                        parent_this.code = "";
                        parent_this.state = "awaiting_code"
                    }
                }).catch(function (error) {
                    parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error + '\n' + globaldata.api.hostname
                    parent_this.message_modal_isOpen = true;
                    parent_this.state = "awaiting_code"
                });
            }
        },
        async Modal_onWillDismiss() {
            this.message_modal_isOpen = false;
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