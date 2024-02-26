<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <img src="./../../assets/graphics/3d-fluency-sparkling.png" :height="150" :width="150" style="max-width: 80vw; margin-left: 1rem; margin-top: 4vh;" />
        
        <ion-header collapse="condense" style="margin-top: 1vh; --background: none;">
          <ion-toolbar style="--background: none;">
            <ion-title size="large" style="--background: none;">Спасибо!</ion-title>
          </ion-toolbar>
        </ion-header>
        <div style="margin-left: 1rem;">
          <div style="margin-top: 0vh;">
            <ion-label>Вы оформили подписку</ion-label>
          </div>
          <div style="margin-top: 4vh;">
            <ion-label>Подписка не просто удаляет рекламу и открывает новые функции — она играет жизненно важную роль в разработке и совершенствовании приложения. <br/><br/> </ion-label>
            <ion-button  @click="gohome()" style="font-weight: 700;">На главную <ion-icon slot="end"
              :icon="arrowForward"></ion-icon></ion-button>
          </div>
          
        </div>
      </ion-content>
    </ion-page>
  </template>

  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/vue';

  import { arrowForward } from 'ionicons/icons';

  import confetti from 'canvas-confetti';

  //import { Vue3Lottie } from 'vue3-lottie'
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonLabel,  },
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
    },
    methods: {
      gohome(){
        this.$router.push({ path: '/tabs/home' });
      }
    },
    data(){
      return {
        arrowForward
      }
    },
  });
  </script>
  