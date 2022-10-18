<template lang="en">
<ion-page>
    <ion-content :fullscreen="true">
        <vue-plyr :options="options" @click="" ref="videoplayer">
            <video controls playsinline style="object-fit: cover;">
                <source size="720" src="https://test.deqstudio.com/pexels-tima-miroshnichenko-5716900.mp4" type="video/mp4" />
                <source size="1080" src="https://test.deqstudio.com/pexels-tima-miroshnichenko-5716900.mp4" type="video/mp4" />
            </video>
        </vue-plyr>
        <ion-modal
            @willDismiss="Modal_onWillDismiss"
            :is-open="meditationState == 'prestart_info'"
            trigger="open-modal"
            :initial-breakpoint="0.40"
            :breakpoints="[0,  0.40, 0.75]"
            handle-behavior="cycle"
            >
            <ion-content class="ion-padding">
                <div class="ion-margin-top">
                    <ion-label style="white-space: pre-wrap;"><br><b style="font-size: 28px;">Вы готовы?</b><br><br>Ваша медитация готова. Перед началом мы обычно рекомендуем убедиться, что вам удобно и вы можете слышать звук. Если вокруг шумно, воспользуйтесь наушниками.</ion-label>
                </div>
                <ion-button fill="clear" @click="startMeditation" style="font-weight: 700; margin-left: -3.95% !important; padding-top: 10% !important;">Начать <ion-icon slot="end" :icon="arrowForward"></ion-icon></ion-button>
            </ion-content>
        </ion-modal>
    </ion-content>
</ion-page>
</template>

<style scoped>

</style>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import {
    IonPage,
    IonContent,
    IonModal,
    IonLabel
} from '@ionic/vue';

import {
    closeOutline,
    playOutline,
    arrowForward
} from 'ionicons/icons';

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        IonModal,
        IonLabel,
        VuePlyr
    },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.videoplayer = this.$refs.videoplayer.player;
    },
    methods: {
        startMeditation(){
            this.videoplayer.play();
            this.meditationState = "playing"
        }
    },
    data (){
        return {
            videoplayer: null,
            meditationState: "prestart_info",
			options: {
                autoplay: false,
                loop: { active: true },
                settings: [],
                controls: [],
                fullscreen: { enabled: false, fallback: true, iosNative: false, container: null }
            }
		}
    },
    setup() {
        return {
            closeOutline,
            playOutline,
            arrowForward
        }
    }
});
</script>
