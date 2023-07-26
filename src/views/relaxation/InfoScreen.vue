<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <p style="padding: 0px 18px 0px; margin-top: 0.5rem; margin-bottom: 0rem; margin-left: -60px">
            <Vue3Lottie :animationData="require('./../../assets/lottie/125469-meditating-panda.json')" :height="150" :width="150" style="max-width: 280px;"/></p>
        <div style="padding: 1.4rem; padding-top: 0rem;">
            <h2 style="font-weight: 800; font-size: 25px;;">Баланс</h2>
            <p style="opacity: 0.8; font-size: 14px; font-weight: 500;  line-height: 20px !important; letter-spacing: -0.8px;">
              Возникла внезапная вспышка энергии или чувство нервного напряжения? Отлично! Наш уголок релаксации именно для этого создан. Здесь вы найдете атмосферу исцеления и специально разработанные методы, чтобы помочь вам найти умиротворение и баланс.
<br/><br/> Плюс, вам понадобится всего несколько минут, и это доступно в любом месте! Не нужны наушники — просто наслаждайтесь моментом и восстановите свою гармонию.
            </p>
            <ion-button style="margin-top: 0.8rem;" @click="startSession">Начать сессию</ion-button>
        </div>
        
    </ion-content>
    </ion-page>
  </template>

  <style scoped>
  @media (prefers-color-scheme: light) {
    ion-content {
      --background: #f7f7f6 url('../../assets/abstract/chris-nguyen-lbmrrNgq2lo-unsplash.jpg') no-repeat center center / cover !important;
    }
  }
  @media (prefers-color-scheme: dark) {
    ion-content {
      color: #ffffff !important;
      --background: #000000 url('../../assets/abstract/manuel-will-gd3t5Dtbwkw-unsplash.jpg') no-repeat center center / cover !important;
    }
  }
  
  </style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';

  import { Vue3Lottie } from 'vue3-lottie'
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, Vue3Lottie },
    methods: {
      startSession(){
        console.log("Requesting Relaxing Session...")
        this.$router.push({path:'/tabs/relaxation/session', replace: true, query: {
                        }});
      }
    }

  });
  </script>
  