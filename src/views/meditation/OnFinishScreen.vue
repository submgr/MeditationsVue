<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Вы молодец!</ion-title>
          </ion-toolbar>
        </ion-header>
        <div id="container" style="margin-left: 1rem; margin-top: 0%;">
            <strong>Медитация закончилась, а ваш день только начинается</strong>
            <p style="margin-top: 10vh;">Теперь вы чувствуете себя куда лучше: вас захватыет спокойствие и хорошее настроение, вы понимаете сейчас себя лучше и абсолютно рациональны.<br/><br/>Спасибо за отлично проведенное время!</p>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

  import confetti from 'canvas-confetti';
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
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
    }
  });
  </script>
  