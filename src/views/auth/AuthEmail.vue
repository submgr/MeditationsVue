<template>
    <ion-page>
        <ion-content :fullscreen="true" v-if="state == 'main'">
    
            <h1 style="margin-left: 15px; margin-top: 11%; font-size: 120px;">
                <ion-icon slot="start" :icon="mailOutline" style="text-align: left;"></ion-icon>
            </h1>
    
            <p style="text-align: left; padding: 0px 22px 0px; margin-top: -1.5rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">Эл. адрес</p>
            <p style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200;">На указанный эл. адрес мы отправим сообщение с кодом.</p>
    
            <ion-input class="input-style" autofocus="true" type="email" placeholder="Электронный адрес" v-model="email" pattern="email"></ion-input>
    
            <ion-button @click="signin" color="danger" style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
                <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
                Продолжить
            </ion-button>

            <ion-modal
                @willDismiss="Modal_onWillDismiss"
                :is-open="message_modal_isOpen"
                trigger="open-modal"
                :initial-breakpoint="0.25"
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
        <ion-content :fullscreen="true" v-if="state == 'awaiting_code'">
            
            <h1 style="margin-left: 15px; margin-top: 11%; font-size: 120px;">
                <ion-icon slot="start" :icon="mailOutline" style="text-align: left;"></ion-icon>
            </h1>

            <p style="text-align: left; padding: 0px 22px 0px; margin-top: -1.5rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">Это вы?</p>
            <p style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200;">Сообщение с кодом отправлено на указанный электронный адрес. Введите полученный код ниже, чтобы продолжить.</p>
            <ion-input class="input-style" autofocus="true" style="font-size:34px; line-height: 1.2;" type="number" minlenght="6" maxlenght="6" placeholder="Код подтверждения" v-model="code" pattern="number"></ion-input>

            <ion-button @click="sendcode" color="danger" style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
                <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
                Продолжить
            </ion-button>

            <ion-modal
                @willDismiss="Modal_onWillDismiss"
                :is-open="message_modal_isOpen"
                trigger="open-modal"
                :initial-breakpoint="0.25"
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
    </template>
    
    
    <style scoped>
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
        modalController
    } from '@ionic/vue';
    
    import {
        arrowForwardOutline,
        mailOutline,
        logoGoogle,
        chatbubbleOutline
    } from 'ionicons/icons';
    
    export default defineComponent({
        name: 'Tab1Page',
        components: {
            IonContent,
            IonPage,
            IonModal,
            // eslint-disable-next-line
            IonInput,
            IonButton,
            IonIcon
        },
        data() {
            return {
                message_modal_isOpen: false,
                code: "",
                state: "main",
                message_modal_text: "Something went wrong. Code: the text is not defined, but modal is called. Weird.",
                email: "" }
        },
        methods: {
            async signin() {
                var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var test_result = re.test(this.email);
                if(!test_result){
                    this.message_modal_text = "Не удалось отправить код подтверждения на электронный адрес, указанный тобой. Убедись, что в нем нет ошибок."
                    this.message_modal_isOpen = true;
                }else{
                    // eslint-disable-next-line
                    var parent_this = this;
                    this.$http.get("http://192.168.1.38:8080").then((response) => {
                        console.log("Received data from server for auth request.", response.data)
                        parent_this.state = "awaiting_code"
                    }).catch(function(error){
                        parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error
                        parent_this.message_modal_isOpen = true;
                    });

                }
            },
            async sendcode(){
                if(this.code.length != 6){
                    this.message_modal_text = "Некорректный код подтверждения, он должен состоять из 6 цифр. Попробуйте еще раз."
                    this.message_modal_isOpen = true;
                }else{
                    // eslint-disable-next-line
                    var parent_this = this;
                    this.$http.get("http://192.168.1.38:8080").then((response) => {
                        console.log("Received data from server for auth request.", response.data)
                        parent_this.state = "awaiting_code"
                    }).catch(function(error){
                        parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error
                        parent_this.message_modal_isOpen = true;
                    });
                }
            },
            async Modal_onWillDismiss(){
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
    