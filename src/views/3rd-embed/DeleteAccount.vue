<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Удаление учетной записи</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Удаление учетной записи</ion-title>
                </ion-toolbar>
            </ion-header>

            <div><DeleteAccountController parentPath="/tabs/3rd-embed/deleteaccount"/></div>
            
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import globaldata from '../../modules/global';
import DeleteAccountController from '@/components/DeleteAccountController.vue';

export default defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, DeleteAccountController },
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
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

    }
});
</script>
  