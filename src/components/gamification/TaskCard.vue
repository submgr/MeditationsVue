<template>
  <ion-card style="border-radius: 20px; margin-top: 1.2vh;">
    <ion-card-content>

      <ion-grid>
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
            <ion-card-title style="font-size: 1rem;">{{ title }}</ion-card-title>
            <span style="margin-top: 1vh; display: block; font-size: 0.8rem;">{{ content }}</span>

            <ion-grid style="margin-bottom: -3vh;">
              <ion-row>
                <ion-col size="9.5">
                  <ion-progress-bar style="border-radius: 20px; width: 100%; margin-top: 1.5vh; margin-left: -6%;"
                    :value="0.0" color="primary"></ion-progress-bar>
                </ion-col>
                <ion-col style="font-size: 0.8rem;">
                  {{ data.progress }}/{{ data.goal }}
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
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
</style>
