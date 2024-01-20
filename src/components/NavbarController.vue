<template>
    <div style="position: fixed; z-index: 100;">
        <ion-grid id="top_el_holder" v-bind:class="{'top_el_holder_left': align == 'left', 'top_el_holder_right': align == 'right', 'top_el_holder_defaultaling': align == '' || align == 'any'}">
            <ion-row style="margin-top: 0.7vh;">
                <ion-col v-if="navConfig.backbtn" @click="$emit('backfunction')"><ion-icon :icon="arrowBackOutline" /></ion-col>
                <ion-col v-if="navConfig.backbtn"></ion-col>
                <ion-col v-if="navConfig.settingsmodal" @click="$emit('additionalmodalfunction')"><ion-icon :icon="ellipsisHorizontal" /></ion-col>
                <ion-col v-if="navConfig.infomodal" @click="$emit('infomodalfunction')"><ion-icon :icon="helpCircleOutline"></ion-icon></ion-col>
                <ion-col v-if="navConfig.bgpickmodal" @click="$emit('bgpickmodalfunction')"><ion-icon :icon="imageOutline" /></ion-col>
            </ion-row>
        </ion-grid> 
    </div>
  </template>

  <style scoped>

  #top_el_holder {
    position: fixed;
    z-index: 100;
    color: rgb(255, 255, 255);
    top: 3vh; /* Adjust as needed */

    background-color: #19202420;
    font-size: 34px;
    opacity: 0.65;
    border-radius: 25px;
}


@media (prefers-color-scheme: light) {
    #top_el_holder {
        color: rgb(186, 0, 233);
        
    }
  }

.top_el_holder_left{
     /* Align to the right edge */
     left: 4vw;
}

.top_el_holder_right{
    /* Align to the right edge */
    right: 3vw;
}

.top_el_holder_defaultaling{
    left: 3vw;
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
        chevronDown,
        imageOutline,
        helpCircleOutline
    } from 'ionicons/icons';

import {  } from '@ionic/vue';


export default defineComponent({
    name: 'ExploreContainer',
    components: { },
    props: {
        activatedfrom: String,
        align: String
    },
    data() {
        return {
            premadeMeditations: [   ],
            MegaphoneIcon, XMarkIcon,
            arrowBackOutline,
            ellipsisHorizontal,
            imageOutline,
            helpCircleOutline,

            navConfig: {
                backbtn: true,
                settingsmodal: false,
                infomodal: false,
                bgpickmodal: false
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
                this.navConfig.settingsmodal = true
                this.navConfig.bgpickmodal = true
                break;
            case "Relaxation/PlayerScreen":
                // no changes, cuz we need just a back btn here
                break;
            case "Sleep/SleepMainScreen":
                this.navConfig.infomodal = true
                this.navConfig.backbtn = false
                break;
            case "Emotions/MakeSmilePhoto":
                this.navConfig.infomodal = false
                this.navConfig.backbtn = true;
                break;
                
            default:
                break;
        }

        if(this.align == "right"){
//
        }

        // eslint-disable-next-line
        const parent_this = this;

        
    }
});
</script>
  

  