<template>
    <ion-page>
        <ion-content :fullscreen="true">



            <!-----<ion-input class="input-style" placeholder="Электронный адрес"></ion-input> 

        <ion-button @click="authenticateWithGoogle" color="danger" style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
            <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
            Продолжить
        </ion-button>--->



            <div class="split-container">
                <div class="left-side">
                    <img style="margin-left: 6.5%; margin-top: 4rem; height: 230px; opacity: 0.99;"
                        src="../../assets/graphics/creative_hello_purpleversion.png">

                    <p
                        style="text-align: left; padding: 0px 22px 0px; margin-top: 1rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">
                        Почти готово!</p>
                    <p
                        style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200;">
                        Войдите в систему, чтобы мы могли предоставить вам уникальный опыт медитации.</p>
                </div>
                <div class="right-side">
                    <!-- Buttons go here -->
                    <ion-button router-link="/tabs/auth/email" color="primary"
                        style="left: 0px; margin-right: 5%; margin-left: 5%; margin-top: 7.5%; --opacity: 0.7; --padding-start: 0; --padding-end: 0;"
                        expand="block">
                        <ion-icon class="send-button" slot="start" :icon="mailOutline" style="text-align: left;"></ion-icon>
                        <span style="text-align:left; width: 72%;">
                            &nbsp;&nbsp;Продолжить с эл. почтой
                        </span>
                        <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"
                            style="text-align: end;"></ion-icon>

                    </ion-button>
                    <!---<ion-button @click="authenticateWithGoogle" color="primary" style="left: 0px; margin-right: 5%; margin-left: 5%; margin-top: 2.5%; --opacity: 0.7; --padding-start: 0; --padding-end: 0;" expand="block">
                <ion-icon class="send-button" slot="start" :icon="chatbubbleOutline" style="text-align: left;"></ion-icon>
                <span style="text-align:left; width: 72%;">
                    Продолжить с Telegram
                </span>
                <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline" style="text-align: end;"></ion-icon>
            </ion-button>
            
    
            --->
                    <hr class="hr-line" style="margin-top: 4%;">
                    <div style="margin-bottom: 4%;"></div>



                    <ion-button @click="authenticateWithGoogle"
                        style="margin-right: 5%; margin-left: 5%; margin-top: 3.5%; --opacity: 0.7;" expand="block">
                        <ion-icon class="send-button" slot="end" :icon="logoGoogle"></ion-icon>
                        Войти с Google
                    </ion-button>
                    <br/><br/>
                    <p
                    style="text-align: start !important; margin-right: 5%; margin-left: 5%; ">Продолжая, вы соглашаетесь с <span @click="userAgreements" style="color: var(--ion-color-primary-shade)">условиями использования</span> и <span @click="userAgreements" style="color: var(--ion-color-primary-shade)">политикой конфиденциальности</span>.</p>
                   
                </div>
                
            </div>

            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="message_modal_isOpen" trigger="open-modal"
                :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;">{{ message_modal_text }}</ion-label>
                    </div>
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="googleauth_awaiting">
                <ion-content>
                    <h1 style="margin-top: 15vh; text-align: center;">
                        <ion-spinner name="lines-sharp"></ion-spinner>
                    </h1>
                    <p style="text-align: center;">Ожидание ответа<br />от Google...</p>
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="openedModal == 'privacypolicy'">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Политика конфиденциальности</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeOpenedModals()">Закрыть</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <RenderContent materialType="pages" :metatagsExist="false" codename="privacypolicy" />
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="openedModal == 'termsofuse'">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Условия использования</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeOpenedModals()">Закрыть</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <RenderContent materialType="pages" :metatagsExist="false" codename="termsofuse" />
                </ion-content>
            </ion-modal>

        </ion-content>
    </ion-page>
</template>

<style scoped>
@import '../../assets/css/adaptative_ui.css';

.hr-line {
    margin-right: 7%;
    margin-left: 7%;
    background-color: white;
    opacity: 0.3;
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
    IonLabel,
    actionSheetController,
    toastController
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

import { googleTokenLogin } from 'vue3-google-login';

import { Capacitor } from '@capacitor/core'

import axios from 'axios'

import globaldata from '../../modules/global';

import RenderContent from '@/components/markdown/RenderContent.vue';

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
        IonLabel,
        RenderContent
    },
    data() {
        return {
            message_modal_isOpen: false,
            message_modal_text: "ModalText",
            clientId: '70119537016-fopt4mu69mtdvf4seb12i3drcfa7i41s.apps.googleusercontent.com',
            googleauth_awaiting: false,
            openedModal: null
        }
    },
    mounted() {

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        if (Capacitor.isNativePlatform()) {
            GoogleAuth.initialize({
                scopes: ['profile', 'email'],
                grantOfflineAccess: true,
            });
        } else {
            //web
            GoogleAuth.initialize({
                scopes: ['profile', 'email'],
                grantOfflineAccess: true,
            });
        }


    },
    setup() {
        return {
            arrowForwardOutline,
            logoGoogle,
            mailOutline,
            chatbubbleOutline,
        }
    },
    methods: {
        async callback(response) {
            // This callback will be triggered when the user selects or login to
            // his Google account from the popup
            console.log("Handle the response", response)
        },
        async Modal_onWillDismiss() {
            this.message_modal_isOpen = false;
        },
        async authenticateWithGoogle() {
            this.googleauth_awaiting = true;
            var err_on_googleauth = false;
            try {
                var userResponse = await GoogleAuth.signIn();
            } catch (error) {
                this.googleauth_awaiting = false;
                err_on_googleauth = true;
            }

            if (!err_on_googleauth) {
                this.proccessGoogleResponse(userResponse)
            }


        },
        async proccessGoogleResponse(response) {
            //console.log("response: ", response)

            const userResponse = response;
            var accessToken = userResponse.authentication.accessToken;
            var idToken = userResponse.authentication.idToken;
            //var idToken = userResponse.authentication.serverAuthCode
            // eslint-disable-next-line
            const parent_this = this;

            axios.get(globaldata.api.hostname + "service/auth_withGoogle", {
                params:
                    { accessToken: accessToken, idToken: idToken }
            }).then((response) => {
                parent_this.googleauth_awaiting = false;
                //console.log(response)
                if (response.data.status == "okay") {
                    this.$router.push({ path: '/tabs/auth/almostdone', replace: true, query: { auth_token: response.data.auth_token, auth_userid: response.data.userid } });
                    //this.message_modal_text = `Выполнен вход.`
                    //this.message_modal_isOpen = true;
                } else {
                    this.message_modal_text = `Произошла ошибка при входе с помощью учетной записи Google. Попробуйте еще раз или воспользуйтесь другим способом входа.\n\nСведения: ` + JSON.stringify(response)
                    this.message_modal_isOpen = true;
                }
            }).catch(function (error) {
                parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error + '\n' + globaldata.api.hostname
                parent_this.message_modal_isOpen = true;
            });
            // add the code for the functionality your need
        },
        closeOpenedModals() {
            // this one function closes documents view modals.
            this.openedModal = "none"
        },
        async userAgreements() {
            // eslint-disable-next-line
            var parent_this = this;

            var isVKMiniApps = false;

            var userAgreementsButtons = [
                    {
                        text: 'Политика конфиденциальности',
                        role: 'privacypolicy',
                    },
                    {
                        text: 'Условия использования',
                        role: 'termsofuse',
                    }
                ]

            try {
                // Try to get the value from localStorage
                isVKMiniApps = localStorage.getItem('isVKMiniApps') === 'true';
            } catch (e) {
                // If an error occurs (e.g., localStorage is not available), keep isVKMiniApps as false
                console.log('Failed to access localStorage. Defaulting isVKMiniApps to false.');
            }
            const actionSheet = await actionSheetController.create({
                header: 'Текущие пользовательские соглашения',
                buttons: userAgreementsButtons,
            });
            actionSheet.present();

            const { role } = await actionSheet.onWillDismiss();

            if (role === 'privacypolicy') {
                //window.open("https://вашамедитация.рф/privacypolicy/", "_blank")
                this.openedModal = "privacypolicy"
            }

            if (role === 'termsofuse') {
                //window.open("https://вашамедитация.рф/termsofservice/", "_blank")
                this.openedModal = "termsofuse"
            }

            if (role === 'accountdeleteprocedure') {
                window.open("https://вашамедитация.рф/accountdeletion/", "_blank")
            }
        },

    }
})
</script>
