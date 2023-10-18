<template>
    <span v-if="notificationType == 'emotionalStateFeature'">
        <WellbeingQuestionnaire ref="wellbeingQuestionnaireRef" @completion-event="WellbeingQuestionnaireCompleted" />
        <ion-card :class="{ 'stop-animations': stopAllAnimations }" @click="runWellbeingQuestionnaire()" color="light"
            style="--glow-opacity: 1; --glow-scale: 2.5; --glow-blur: 6; --glow-radius: 100; --glow-rotate-unit: 1deg;"
            class="ion-text-centerOFF gradient-border-card glowing-card cardg">
            <span class="glow"></span>
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
</template>

<style>
@import '../assets/css/miscellaneous/gloving_card.css';
</style>
  
<script lang="ts">
import { defineComponent } from 'vue';

import globaldata from '../modules/global';
import { MegaphoneIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { forEach } from 'xregexp';

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';


import WellbeingQuestionnaire from '@/components/questionnaire/WellbeingQuestionnaire.vue';


export default defineComponent({
    name: 'ExploreContainer',
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, WellbeingQuestionnaire },
    props: {
        name: String,
        notificationType: String
    },
    data() {
        return {
            premadeMeditations: [],
            stopAllAnimations: true,
            MegaphoneIcon, XMarkIcon
        }
    },
    setup() {

        //setup
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
        }
    },
    mounted() {



        // eslint-disable-next-line
        const parent_this = this;

        this.$http.get(globaldata.api.hostname + "access/meditations/featured", {
            params: {
                method: "email"
            }
        }).then((response) => {
            console.log(response)
            if (response.data.status == "okay") {
                console.log("[Server Message] Received featured meditations... length: " + response.data.content.length)

                var meditations = response.data.content;
                meditations.forEach(element => {
                    parent_this.premadeMeditations.push(element)
                });

                console.info(parent_this.premadeMeditations)


            } else {
                console.log("[Server Message] This service isn't available at this time.")
            }

        }).catch(function (error) {
            console.log("CATCHED AN ERROR.", error)
        });
    }
});
</script>
  

  