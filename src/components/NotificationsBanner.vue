<template>
    <span v-if="notificationType == 'emotionalStateFeature'">
        <WellbeingQuestionnaire :key="componentKey" ref="wellbeingQuestionnaireRef"
            @completion-event="WellbeingQuestionnaireCompleted" />
        <ion-card :class="{ 'stop-animations': stopAllAnimations }" @click="runWellbeingQuestionnaire()" color="light"
            style="--glow-opacity: 1; --glow-scale: 2.5; --glow-blur: 6; --glow-radius: 100; --glow-rotate-unit: 1deg;"
            class="ion-text-centerOFF gradient-border-card glowing-card cardg ion-activatable ripple-parent rounded-rectangle">
            <span class="glow"></span>
            <ion-ripple-effect></ion-ripple-effect>
            <div style="margin: 2px;" class="innerdiv_notifcoloredradius bg-colored">
                <div style="height: 3vh;"></div>
                <img src="../assets/graphics/3d-glassy-four-plastic-rectangles-1.png" style="margin: 0;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    height: 15vh;">

                <ion-card-header>
                    <ion-card-title>Тест на эмоциональное состояние</ion-card-title>
                </ion-card-header>

                <ion-card-content style="">Вместе с регулярными медитациями, оценка вашего текущего состояния позволяет
                    персонализировать ваш опыт и помочь вам заботиться о своем эмоциональном
                    благополучии.</ion-card-content>
            </div>
        </ion-card>
    </span>
    <Transition>
        <div v-if="notificationType == 'suggestToSmileToday__type1'" class="myview" style="margin-top: -5vh;">


            <div>
                <ul>
                    <div style="margin: 2px; padding-top: 0.5vh;"
                        class="innerdiv_notifcoloredradius bg-colored unique-element-glowing-ratebox1">
                        <ion-card-header>
                            <ion-card-title>Улыбнитесь!</ion-card-title>
                        </ion-card-header>

                        <ion-card-content style="">Исследования показывают, что улыбка может вызвать выброс эндорфинов,
                            а
                            также возбуждение и эмоции, которые вызывают чувство счастья.</ion-card-content>


                    </div>
                </ul>
            </div>

        </div>
    </Transition>
    <span v-if="notificationType == 'suggestToSmileToday' && varHasUserSmiledToday != true"  style="padding-top: -15vh !important;">
        <WellbeingQuestionnaire ref="wellbeingQuestionnaireRef" @completion-event="WellbeingQuestionnaireCompleted" />
        <ion-card :class="{ 'stop-animations': stopAllAnimations }"
            @click="$router.push({ path: '/tabs/emotions/smile' })" color="light"
            style="border-radius: 20px;"
            class="ion-text-centerOFF">
            <ion-ripple-effect></ion-ripple-effect>
            <div style="margin: 2px;">
                <div style="height: 3vh;"></div>
                <img src="../assets/graphics/active-young-woman-showing-heart-sign-with-her-hands.png" style="margin: 0;
                        display: block;
                        margin-left: 2rem;
                        height: 15vh;">

                <ion-card-header>
                    <ion-card-title>Улыбка, та самая!</ion-card-title>
                </ion-card-header>

                <ion-card-content style="">Улыбнитесь в приложении сейчас, чтобы заложить отличное начало для этого
                    великолепного дня! Исследования показывают, что улыбка вызывает выброс эндорфинов, а также
                    возбуждение и
                    эмоции, которые вызывают чувство счастья. Улыбнитесь себе!

                    <br /><br /><ion-button>Улыбнуться<ion-icon slot="end"
                            :icon="arrowForwardOutline"></ion-icon></ion-button>

                </ion-card-content>


            </div>
        </ion-card>
    </span>
</template>

<style>
@import '../assets/css/miscellaneous/gloving_card.css';
</style>

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
    transition: opacity 1.5s ease;
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


}


.myview {
    border-radius: 20px;
    position: relative;
    margin: 0.5vh auto 3.5vh;
    width: 91vw;
    height: auto;

    text-align: center;
}

.myview ul {
    font-family: 'Kalam', cursive;
    font-size: 80px;
    list-style: none;
    position: relative;
}

.myview ul li:nth-child(1) {
    color: #0000ff;
    filter: blur(10px);
    animation: child1 2s alternate infinite;
}

.myview ul li:nth-child(2) {
    color: #00ffff;
    filter: blur(5px);
    animation: child2 2s alternate infinite;
}

.myview ul li:nth-child(3) {
    color: #000;
    filter: blur(0px);
}

@keyframes child1 {

    0%,
    100% {
        filter: blur(10px);
    }

    50% {
        filter: none;
    }
}

@keyframes child2 {

    0%,
    100% {
        filter: blur(5px);
    }

    50% {
        filter: blur(1px);
    }
}

.myview:before,
.myview:after {
    content: '';
    border-radius: 21.5px;
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    background-image: linear-gradient(45deg, #ff5da9, #3c67e3 43%, #4e00c2);
    background-size: 400%;
    z-index: -1;
    animation: move 3s alternate infinite;
}

.myview:after {
    filter: blur(0px);
}

@keyframes move {

    0%,
    100% {
        background-position: 0 0;
    }

    50% {
        background-position: 100% 0;
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

import globaldata from '../modules/global';
import { MegaphoneIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { forEach } from 'xregexp';

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonRippleEffect, IonIcon, IonSpinner } from '@ionic/vue';

import {
    arrowForwardOutline
} from 'ionicons/icons';


import WellbeingQuestionnaire from '@/components/questionnaire/WellbeingQuestionnaire.vue';


export default defineComponent({
    name: 'ExploreContainer',
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, WellbeingQuestionnaire, IonButton, IonRippleEffect, IonIcon },
    props: {
        name: String,
        notificationType: String
    },
    data() {
        return {
            premadeMeditations: [],
            stopAllAnimations: true,
            MegaphoneIcon, XMarkIcon,
            arrowForwardOutline,
            varHasUserSmiledToday: null,
            componentKey: 0,
        }
    },
    setup() {

        //setup
    },
    watch: {
        '$route'() {
            console.log("observed route update...")
            this.varHasUserSmiledToday = this.checkAndLoadSmileProposalBanner();
            console.log(this.varHasUserSmiledToday)
        }
    },
    methods: {
        runWellbeingQuestionnaire() {

            // Define the type for the child component reference
            const childComponent = this.$refs.wellbeingQuestionnaireRef as any;

            // Now TypeScript knows the type and you can access 'open' method

            childComponent.open();

        },
        WellbeingQuestionnaireCompleted() {

            // Wellbeing Questionnaire Is Completed Now.

            setTimeout(() => {
                this.componentKey += 1;
            }, 500);

        },
        hasUserSmiledToday() {
            // Get the stored smile data from localStorage
            const smileData = localStorage.getItem('appData__temp__dailySmile');

            // Check if there is any stored data
            if (smileData) {
                // Parse the stored JSON data
                const parsedData = JSON.parse(smileData);

                // Get today's date in YYYY-MM-DD format
                const today = new Date().toISOString().split('T')[0];

                // Check if the stored date matches today's date
                return parsedData.date === today;
            }

            // If there's no stored data, the user has not smiled today
            return false;
        },
        updateUserSmile() {
            // Create an object with the current date
            const smileData = {
                date: new Date().toISOString().split('T')[0], // Store today's date in YYYY-MM-DD format
                smiled: true // Indicate that the user has smiled
            };

            // Save the smile data to localStorage as a JSON string
            localStorage.setItem('appData__temp__dailySmile', JSON.stringify(smileData));
        },
        checkAndLoadSmileProposalBanner() {
            if (this.hasUserSmiledToday()) {
                console.log("(smile check) You've already smiled today!");
            } else {
                console.log("(smile check) You haven't smiled today yet. Time to smile!");

            }
            return this.hasUserSmiledToday()
        }
    },
    mounted() {

        // eslint-disable-next-line
        const parent_this = this;

        this.varHasUserSmiledToday = this.checkAndLoadSmileProposalBanner();
        console.log(this.varHasUserSmiledToday)

    }
});
</script>