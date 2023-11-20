<template>
    <div>
        
        <Transition name="bounce">
            <div v-if="displayStage == 'moodRateBox'">
                <ion-card :class="{ 'stop-animations': stopAllAnimations }" color="light"
            style="border-radius: 20px; --glow-opacity: 1; --glow-scale: 2.5; --glow-blur: 6; --glow-radius: 100; --glow-rotate-unit: 1deg;"
            class="ion-text-centerOFF gradient-border-card glowing-card cardg ion-activatable ripple-parent rounded-rectangle">
            <span class="glow"></span>
            <div style="margin: 2px;" class="innerdiv_notifcoloredradius bg-colored unique-element-glowing-ratebox1">
                <div style="margin-left: 16px; font-size: 18px; font-weight: 400; opacity: 0.6;"><div style="padding-top: 20px; "></div>Добрый день, Арам</div>
                    <div style="margin-left: 16px; margin-top: 0px; font-size: 20px; font-weight: 400;">Как вы себя чувствуете сегодня?</div>
                <div style="display: flex; overflow-x: auto; margin-top: -14px;">
                    <div v-for="(item, index) in moodStates" :key="item.code" style="margin-right: -17px;" @click="rated(displayStage, item.code)">
                      <ion-card class="ion-activatable ripple-parent rectangle" style="border-radius: 20px; width: 14vw;">
                        <span style="display: none;">Element Index is {{index}}</span>
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-card-header style="margin: -2.5vw;">
                          <ion-card-title>
                            <img :src="item.image"/></ion-card-title>
                        </ion-card-header>
                      </ion-card>
                    </div>
                  </div>
            </div>
                    
                </ion-card>
            </div>
        </Transition>
          
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';

import globaldata from '../../modules/global';

import store from "../../store";

const getUserData = computed(() => {
    return store.getters.getUserData;
});

import Icon_Smiling from "../../assets/graphics/emojis/icons8-smiling.svg?inline"
import Icon_Sad from "../../assets/graphics/emojis/icons8-sad.svg?inline"
import Icon_Blushing from "../../assets/graphics/emojis/icons8-blushing.svg?inline"
import Icon_Disappointed from "../../assets/graphics/emojis/icons8-disappointed.svg?inline"
import Icon_Uwu from "../../assets/graphics/emojis/icons8-uwu-emoji.svg?inline"


export default defineComponent({
    name: 'ExploreContainer',
    props: {
        name: String
    },
    components: {  },
    data() {
        return {
            openedModal: "none",
            displayStage: "moodRateBox", 
            moodStates: [
                {code: "excellent", title: "Excellent", image: Icon_Smiling},
                {code: "good", title: "Good", image: Icon_Blushing},
                {code: "ok", title: "OK", image: Icon_Uwu},
                {code: "sad", title: "Sad", image: Icon_Sad},
                {code: "awful", title: "Awful", image: Icon_Disappointed},
            ]
        }
    },
    methods: {
        closemodal() {
            this.openedModal = "none"
        },
        rated(stage, code){
            this.displayStage = "none"
        }
    },
    mounted() {

      //
    }
});
</script>
  
<style scoped>

.bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
    
  }
  
  @keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
      transform: scale(0);
      
    }
    50% {
        transform: translate3d(0, 0, 0);
      transform: scale(1.08);
    }
    100% {
        transform: translate3d(0, 0, 0);
      transform: scale(1);
    }
  }

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.elementHidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s linear, opacity 1s linear;
}

.elementVisible {
    opacity: 1;
    transition: visibility 0.3s linear, opacity 1s linear;
}

.iframe_smooth {
    animation: fadeIn 10s forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}</style>
  