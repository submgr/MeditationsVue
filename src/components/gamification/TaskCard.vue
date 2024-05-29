<template>
  <ion-card :class="{ 'stop-animations': stopAllAnimations }" @click="$router.push({ path: '/tabs/emotions/smile' })"
    color="light"
    style="border-radius: 20px; margin-top: -0vh;"
    class="ion-text-centerOFF">
    <ion-ripple-effect></ion-ripple-effect>
    <div style="margin: 2px;" >

      <ion-card-content>

        <ion-grid style="margin-left: -10px; margin-right: -10px;">
          <ion-row>
            <ion-col size="2" style="display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 2vw;
            padding-right: 2vw;">
              <img src="../../assets/graphics/business-3d-target-with-dart-arrow-in-bullseye.png"
                style="max-height: 60px;" />


            </ion-col>
            <ion-col>
              <ion-card-title style="font-size: 1.4rem; font-weight: 500; opacity: 0.6;">{{ title
                }}</ion-card-title>
              <span style="margin-top: 1vh; display: block; font-size: 1rem; font-weight: 400 !important; opacity: 0.5;
                " class="magic-text-1">{{
                  content }}</span>

              <ion-grid style="margin-bottom: -22px; margin-top: -5px; margin-right: -20px;">
                <ion-row>
                  <ion-col size="10.2">
                    <ion-progress-bar style="border-radius: 20px; width: 100%; margin-top: 8.5px; margin-left: -10px;"
                      :value="0.0" color="primary"></ion-progress-bar>
                  </ion-col>
                  <ion-col style="font-size: 0.8rem; font-weight: 400 !important; opacity: 0.7; margin-left: -7px;">
                    {{ data.progress }}/{{ data.goal }}
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>


    </div>
  </ion-card>
</template>

<script>

import * as gamificationEngine from "../../modules/gamificationEngine"

import {
  IonProgressBar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCardTitle,
  IonCol
} from '@ionic/vue';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    elementsLen: {
      type: Number,
      required: true
    }
  },
  components: {
    IonProgressBar,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCardTitle,
    IonCol
  },
  data() {
    return {
      tasks: []
    }
  },
  mounted() {
    //
  },
}
</script>

<style scoped>
/* Add your custom styles here */
@import '../../assets/css/miscellaneous/gloving_card.css';
</style>
