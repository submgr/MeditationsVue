<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <h1 style="margin-left: 4vw; margin-right: 4vw; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Удаление учетной записи</h1>

            <div><DeleteAccountController parentPath="/tabs/settings/deleteaccount"/></div>

            <div style="height: calc(50px + 1.5vh);"></div>
            
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

import globaldata from '../../modules/global';
import DeleteAccountController from '@/components/DeleteAccountController.vue';

export default defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, DeleteAccountController },
    data() {
        return {
            src: ''
        }
    },
    mounted(){

        // eslint-disable-next-line
        const parent_this = this;


        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }

    }
});
</script>
  