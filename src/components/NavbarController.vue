<template>
    <div style="position: fixed; z-index: 100; color: white;">
        <ion-grid id="top_el_holder">
            <ion-row style="margin-top: 0.7vh;">
                <ion-col v-if="navConfig.backbtn" @click="$emit('backfunction')"><ion-icon :icon="arrowBackOutline" /></ion-col>
                <ion-col></ion-col>
                <ion-col v-if="navConfig.infomodal" @click="$emit('additionalmodalfunction')"><ion-icon :icon="ellipsisHorizontal" /></ion-col>
            </ion-row>
        </ion-grid> 
    </div>
  </template>

  <style scoped>

  #top_el_holder{
    background-color: #19202420 !important;
    font-size: 34px;
    opacity: 0.65;
    margin-left: 2vw;
    margin-top: 0.7vh;
    border-radius: 25px;
}

</style>
  
<script lang="ts">
import { defineComponent } from 'vue';

import globaldata from '../modules/global';
import { MegaphoneIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { forEach } from 'xregexp';

import {
        closeOutline,
        playOutline,
        arrowForward,
        arrowBackOutline,
        ellipsisHorizontal,
        chevronDown
    } from 'ionicons/icons';

import {  } from '@ionic/vue';


export default defineComponent({
    name: 'ExploreContainer',
    components: { },
    props: {
        activatedfrom: String
    },
    data() {
        return {
            premadeMeditations: [   ],
            MegaphoneIcon, XMarkIcon,
            arrowBackOutline,
            ellipsisHorizontal,

            navConfig: {
                backbtn: true,
                infomodal: false
            }
        }
    },
    setup(){

        //setup
    },
    mounted(){

        switch (this.activatedfrom) {
            case "Meditation/PlayerScreen":
                // some changes to nav for meditations player screen here
                this.navConfig.infomodal = true
                break;
            case "Relaxation/PlayerScreen":
                // no changes, cuz we need just a back btn here
                break;
        
            default:
                break;
        }

        // eslint-disable-next-line
        const parent_this = this;

        
    }
});
</script>
  

  