<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Завершение</ion-title>
        </ion-toolbar>
      </ion-header>

      <SystemAnnoncementProvider origin="meditations/onfinishscreen"/>
      <ion-content :fullscreen="true">
        <img style="height: 25vh; margin-top: 7vh; margin-left: 3vw;" src="../../assets/graphics/juicy-sitting-girl.png"/>
        <ion-header collapse="condense" style="margin-top: 5vh; --background: none;">
          <ion-toolbar style="--background: none;">
            <ion-title size="large" style="--background: none;">Вы молодец!</ion-title>
          </ion-toolbar>
        </ion-header>
        <div style="margin-left: 1rem;">
          <div style="margin-top: 0vh;">
            <ion-label>Медитация закончилась, а ваш день только начинается</ion-label>
          </div>
          <div style="margin-top: 4vh;">
            <ion-label>Теперь вы чувствуете себя куда лучше: вас захватывает спокойствие и хорошее настроение, вы понимаете сейчас себя лучше и абсолютно рациональны.<br/><br/>Спасибо за отлично проведенное время!</ion-label>
          </div>
          
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/vue';

  import SystemAnnoncementProvider from "../../components/system/AnnoncementProvider.vue"

  import * as gamificationEngine from "../../modules/gamificationEngine"

  import confetti from 'canvas-confetti';
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonLabel, SystemAnnoncementProvider },
    mounted(){
        
        var duration = 4 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 20, spread: 260, ticks: 90, zIndex: 0 };

        function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 100 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.1 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.1 } }));
        }, 250);

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }

        gamificationEngine.recordUserEvent(this.$achievements, "meditationsplayed", 1)
    }
  });
  </script>
  