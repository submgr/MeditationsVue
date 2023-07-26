<template>
    <ion-card color="light" style="border-radius: 20px;">
        <ion-card-header>
          <ion-card-title>Доброе утро!</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
    
        <ion-card-content> Card Content </ion-card-content>
      </ion-card>
  </template>
  
<script lang="ts">
import { defineComponent } from 'vue';

import globaldata from '../modules/global';
import { MegaphoneIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { forEach } from 'xregexp';

import {  } from '@ionic/vue';


export default defineComponent({
    name: 'ExploreContainer',
    components: { },
    props: {
        name: String
    },
    data() {
        return {
            premadeMeditations: [   ],
            MegaphoneIcon, XMarkIcon
        }
    },
    setup(){

        //setup
    },
    mounted(){

        

        // eslint-disable-next-line
        const parent_this = this;

        this.$http.get(globaldata.api.hostname + "access/meditations/featured", {
                params: {
                    method: "email"
                }
            }).then((response) => {
                console.log(response)
                if (response.data.status == "okay"){
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
  

  