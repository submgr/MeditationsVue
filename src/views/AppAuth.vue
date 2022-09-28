<template>
<ion-page>
    <ion-content :fullscreen="true">

        <img style="margin-left: 6.5%; margin-top: 4rem; height: 230px; opacity: 0.99;" src="../assets/graphics/creative-hello-text.png">

        <p style="text-align: left; padding: 0px 22px 0px; margin-top: 1rem; margin-bottom: 0;  align-items: flex-start; min-width: 100%; font-size: 34px; font-weight: 600;">Почти готово!</p>
        <p style="text-align: left; padding: 0px 22px 0px; padding-top: 2%; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 18px; font-weight: 200;">Войдите в систему, чтобы мы могли предоставить вам уникальный опыт медитации.</p>

        <ion-input class="input-style" placeholder="Электронный адрес"></ion-input>

        <ion-button @click="authenticateWithGoogle" color="danger" style="margin-right: 5%; margin-left: 35%; margin-top: 6%; --opacity: 0.7;" expand="block">
            <ion-icon class="send-button" slot="end" :icon="arrowForwardOutline"></ion-icon>
            Продолжить
        </ion-button>

        <hr class="hr-line">

        <ion-button @click="authenticateWithGoogle"  style="margin-right: 5%; margin-left: 5%; margin-top: 6%; --opacity: 0.7;" expand="block">
            <ion-icon class="send-button" slot="end" :icon="logoGoogle"></ion-icon>
            Войти с Google
        </ion-button>

    </ion-content>
</ion-page>
</template>

<style scoped>
.hr-line{
    margin-right: 7%; margin-left: 7%; background-color: white; margin-top: 14%; opacity: 0.3;
}

@media (prefers-color-scheme: light) {
    ion-content {
        --background: #fff url('../assets/abstract/noised-white-background.png') no-repeat center center / cover;
    }

    .hr-line{
        opacity: 0.12;
        background-color: rgb(0, 0, 0);
    }
}

@media (prefers-color-scheme: dark) {
    ion-content {
        --background: #000 url('../assets/abstract/black-and-noise-background.png') no-repeat center center / cover;
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
    IonIcon
} from '@ionic/vue';

import {
    arrowForwardOutline,
    logoGoogle
} from 'ionicons/icons';

import {
    GoogleAuth
} from '@codetrix-studio/capacitor-google-auth';

// use hook after platform dom ready
GoogleAuth.initialize({
    clientId: '33960040607-coalo6hl8cscmu8mngtb3rf6jgnibr5q.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
});

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        IonInput,
        IonButton,
        IonIcon
    },
    mounted () {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
        tabsEl.hidden = true;
        tabsEl.style.height = "1";
        }
    },
    setup() {
        const authenticateWithGoogle = async () => {
        try {
            const userResponse = await GoogleAuth.signIn()
            console.log(userResponse)
            // add the code for the functionality your need
            } catch (error) {
                console.error(error)
            }
        }
        return {
            authenticateWithGoogle,
            arrowForwardOutline,
            logoGoogle
        }
    }
});
</script>
