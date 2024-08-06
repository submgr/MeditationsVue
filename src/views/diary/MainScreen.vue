<template>
    <ion-page>
      <ion-content :style="{ '--bg-image': `url(${bgImage})` }" :fullscreen="true" style="z-index: 5 !important;">
        <div style="padding: 0px 18px 0px; margin-top: 0.42rem; margin-bottom: 0rem; margin-left: -40px">
          <Vue3Lottie :animationData="animationData" :height="150" :width="150" style="height: 40vh; max-width: 240px;" />
        </div>
        <div style="padding: 1.4rem; padding-top: 0rem;">
          <h2 style="font-weight: 800; font-size: 25px;;">Баланс</h2>
          <p
            style="opacity: 0.8; font-size: 14px; font-weight: 500;  line-height: 20px !important; letter-spacing: -0.8px;">
            Возникла внезапная вспышка энергии или чувство нервного напряжения? Отлично! Наш уголок релаксации именно для
            этого создан. Здесь вы найдете атмосферу исцеления и специально разработанные методы, чтобы помочь вам найти
            умиротворение и баланс.
            <br /><br /> Плюс, вам понадобится всего несколько минут, и это доступно в любом месте! Не нужны наушники —
            просто наслаждайтесь моментом и восстановите свою гармонию.
          </p>
          <ion-button id="relaxstartbtn"
            style="margin-top: 3.25vh; margin-left: -0.2vw; opacity: 0.9; --background: linear-gradient(134.98deg, rgba(255, 255, 255, 0.15) 0%, rgb(0, 181, 239, 0.2); font-weight: 700;"
            @click="startSession">Начать сессию</ion-button>
        </div>
        <div style="height: calc(50px + 1.5vh);"></div>
  
      </ion-content>
    </ion-page>
  </template>
  
  <style scoped>
  :root {
    --fade-color: white;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
  
    100% {
      opacity: 1;
      background-color: red !important;
    }
  }
  
  
  
  @media (prefers-color-scheme: dark) {
    :root{
      --fade-color: dark;
    }
  
    ion-content::before {
      --background: black;
    }
  
    ion-content {
      --fade-color: black;
      color: #ffffff !important;
      --background: #000000 url('../../assets/abstract/aurora-retina-background.png') no-repeat center center / cover !important;
      animation: fadeIn 1.5s ease-in-out;
    }
  }
  
  @media (prefers-color-scheme: light) {
    :root{
      --fade-color: white;
    }
  
    ion-content::before {
      --background: #ffffff;
    }
  
    ion-content {
      --fade-color: white;
      color: #fefefe !important;
      --background: #ffffff url('../../assets/abstract/chris-nguyen-lbmrrNgq2lo-unsplash.webp') no-repeat center center / cover !important;
      animation: fadeIn 1.5s ease-in-out;
    }
  }
  
  @media (prefers-color-scheme: light) {
  
    #relaxstartbtn {
      --background: rgb(43, 84, 209) !important;
  
    }
  
    ion-content {
      position: relative;
      background: rgb(233, 233, 233) !important;
      z-index: -2;
    }
  }
  </style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonButton } from '@ionic/vue';
  import animationData from './../../assets/lottie/125469-meditating-panda.json'
  import { Vue3Lottie } from 'vue3-lottie'
  
  
  export default defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, Vue3Lottie, IonButton },
    methods: {
      startSession() {
        console.log("Requesting Relaxing Session...")
        this.$router.push({
          path: '/tabs/relaxation/session', replace: true, query: {
          }
        });
      }
    },
    data() {
      return {
        animationData,
      }
    },
  
  });
  </script>