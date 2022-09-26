<template>
  <Tone/>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
          <video-player
            src="/your-path/video.mp4"
            poster="/your-path/poster.jpg"
            controls
            :loop="true"
            :volume="0.6"
          />
        </ion-toolbar>
      </ion-header>
      
      <ExploreContainer name="Tab 3 page" />
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import * as Tone from 'tone';
import 'video.js/dist/video-js.css'

export default defineComponent({
  name: 'Tab3Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Tone },
  setup () {
    //
  }
});

</script>
