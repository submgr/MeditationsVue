<template>
<ion-page>
    <ion-content :fullscreen="true">

        <img style="margin-left: 6.5%; margin-top: 4rem; height: 230px; opacity: 0.99;" src="../../assets/graphics/creative-hello-text.png">

        <p style="text-align: left; padding: 0px 22px 0px; margin-top: 1rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">Почти готово!</p>
        <p style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200;">Войдите в систему, чтобы мы могли предоставить вам уникальный опыт медитации.</p>

        <!-----<ion-input class="input-style" placeholder="Электронный адрес"></ion-input> 

        <ion-button @click="authenticateWithGoogle" color="danger" style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
            <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
            Продолжить
        </ion-button>--->
        
        <ion-button router-link="/tabs/auth/email" color="danger" style="left: 0px; margin-right: 5%; margin-left: 5%; margin-top: 7.5%; --opacity: 0.7; --padding-start: 0; --padding-end: 0;" expand="block">
            <ion-icon class="send-button" slot="start" :icon="mailOutline" style="text-align: left;"></ion-icon>
            <span style="text-align:left; width: 72%;">
                Продолжить с эл. почтой
            </span>
            <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline" style="text-align: end;"></ion-icon>
            
        </ion-button>
        <ion-button @click="authenticateWithGoogle" color="danger" style="left: 0px; margin-right: 5%; margin-left: 5%; margin-top: 2.5%; --opacity: 0.7; --padding-start: 0; --padding-end: 0;" expand="block">
            <ion-icon class="send-button" slot="start" :icon="chatbubbleOutline" style="text-align: left;"></ion-icon>
            <span style="text-align:left; width: 72%;">
                Продолжить с Telegram
            </span>
            <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline" style="text-align: end;"></ion-icon>
        </ion-button>

        <hr class="hr-line">

        <ion-button @click="authenticateWithGoogle"  style="margin-right: 5%; margin-left: 5%; margin-top: 6%; --opacity: 0.7;" expand="block">
            <ion-icon class="send-button" slot="end" :icon="logoGoogle"></ion-icon>
            Войти с Google
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
    margin-top: 14%;
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
    IonLabel
} from '@ionic/vue';

import {
    arrowForwardOutline,
    mailOutline,
    logoGoogle,
    chatbubbleOutline
} from 'ionicons/icons';

import {
    GoogleAuth
} from '@codetrix-studio/capacitor-google-auth';

import axios from 'axios'

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        // eslint-disable-next-line
        IonInput,
        IonButton,
        IonIcon,
        IonModal,
        IonLabel
    },
    data () {
        return {
            message_modal_isOpen: false,
            message_modal_text: "ModalText"
        }
    },
    mounted () {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        GoogleAuth.initialize({
            clientId: '33960040607-coalo6hl8cscmu8mngtb3rf6jgnibr5q.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });
    },
    setup() {
        return {
            arrowForwardOutline,
            logoGoogle,
            mailOutline,
            chatbubbleOutline
        }
    },
    methods: {
        async Modal_onWillDismiss(){
            this.message_modal_isOpen = false;
        },
        async authenticateWithGoogle(){
            const userResponse = await GoogleAuth.signIn()
                    var accessToken = userResponse.authentication.accessToken;
                    var idToken = userResponse.authentication.idToken;
                    // eslint-disable-next-line
                    const parent_this = this;
                    axios.get("https://meditations-app.azurewebsites.net/service/auth_withGoogle", { params:
                            {accessToken: accessToken, idToken: idToken }
                        }).then((response) => {
                            if(response.data.status == "okay"){
                                localStorage.auth_token = response.data.auth_token;
                                //this.message_modal_text = `Выполнен вход.`
                                //this.message_modal_isOpen = true;
                            }else {
                                this.message_modal_text = `Произошла ошибка при входе с помощью учетной записи Google. Попробуйте еще раз или воспользуйтесь другим способом входа.\n\nСведения: ` + JSON.stringify(response)
                                this.message_modal_isOpen = true;
                            }
                        }).catch(function(error){
                            parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error
                            parent_this.message_modal_isOpen = true;
                        });
                    // add the code for the functionality your need
        }
            
    }
})
</script>
