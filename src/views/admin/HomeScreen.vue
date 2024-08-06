<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Главная</ion-title>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" id="content">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Вознаграждение</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-label>
                        0 ₽
                        <p v-if="!agreementIsAvailableToSign">На данный момент</p>
                        <p v-if="agreementIsAvailableToSign">Предполагаемое вознаграждение</p>
                    </ion-label>
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Прослушивания</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-label>
                        0
                        <p>За все время</p>
                    </ion-label>
                </ion-card-content>
            </ion-card>
            <ion-card v-if="agreementIsAvailableToSign">
                <ion-card-header>
                    <ion-card-title>Пора подумать о кое-чем!</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-label>
                        Похоже, вы становитесь популярными на платформе! Вы можете получать вознаграждение за то, что пользователи слушают ваши медитации. 
                        <p>Для этого свяжитесь с нами, написав на адрес <a href="mailto:support+partnermeditations@deqstudio.com">support+partnermeditations@deqstudio.com</a><br/>Мы расскажем вам о следующих шагах.</p>
                    </ion-label>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/vue';

import SystemAnnoncementProvider from "../../components/system/AnnoncementProvider.vue"

import * as gamificationEngine from "../../modules/gamificationEngine"

import confetti from 'canvas-confetti';

export default defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonPage, IonLabel, SystemAnnoncementProvider },
    data() {
        return {
            agreementIsAvailableToSign: true
        }
    },
    mounted() {

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }
    }
});
</script>