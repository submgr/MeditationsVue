<template>
    <ion-card style="border-radius: 20px;">
        <ion-card-content>
            
            <ion-grid>
                <ion-row>
                  <ion-col size="3" style="display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-right: 2vw;
                  padding-right: 2vw;">
                    <img src="../../assets/graphics/business-3d-target-with-dart-arrow-in-bullseye.png"
                    style="max-height: 90px;"/>


                  </ion-col>
                  <ion-col>
                    <ion-card-title>{{ title }}</ion-card-title>
                    <span style="margin-top: 1vh; display: block;">{{ content }}</span>
                    
                    <ion-grid style="margin-bottom: -3vh;">
                        <ion-row>
                          <ion-col size="9.5">
                            <ion-progress-bar style="border-radius: 20px; width: 90%; margin-top: 1.5vh; margin-left: -1.85vw;" :value="0.0" color="primary"></ion-progress-bar>
                          </ion-col>
                          <ion-col>
                            {{data.progress}}/{{ data.goal }}
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
    IonProgressBar
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
      IonProgressBar
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
