<template>
    <ion-page>
      <ion-content :fullscreen="true">

        <SupportChat/>
        
      </ion-content>
    </ion-page>
  </template>

  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';

  import SupportChat from '../../components/support/Chat.vue';
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, SupportChat },
    mounted(){
        //
    }
  });
  </script>
  