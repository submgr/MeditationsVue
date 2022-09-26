<template>
    <ion-page :style="pageStyle">
    <ion-header>
      <ion-toolbar>
        
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          
        </ion-toolbar>
      </ion-header>
      
      <swiper :modules="modules" :effect="'coverflow'" :pagination="{ clickable: true }">
          <swiper-slide style="display: block; padding-left: 14px; padding-right: 14px; background-color: #f9dedc;">
            <div class="slide">
              <img src="https://webmeditations.pages.dev/static/images/graphics/3d-fluency-sofa.webp" style="height: 21rem;" />
              <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-bottom: -1.55rem !important;">Проще некуда!</h1>
              <h2 style="font-weight: 800; font-size: 35px;">Простая медитация</h2>
              <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #1f1f1f; line-height: 24px !important; letter-spacing: -0.8px;">
                Мы сделали медитацию в нашем приложении настолько простой, что даже новичок сможет легко погрузиться и извлечь из нее максимум пользы.
              </p>
            </div>
          </swiper-slide>

          <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px; padding-top: 0px; background-color: #f9dedc;">
            <img src="https://webmeditations.pages.dev/static/images/graphics/business-3d-young-man-in-formalwear-sitting-on-the-floor-with-phone.webp" style="height: 21rem; padding-top: 50px"/>
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-bottom: -1.55rem !important;">Не займет много времени</h1>
            <h2 style="font-weight: 800; font-size: 35px;">Быстрая медитация</h2>
            <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #1f1f1f; line-height: 24px !important; letter-spacing: -0.8px;">
              Попробуйте медитацию в любом месте, где бы вы ни находились. Наши медитации не занимают много времени, поэтому их легко начать в любое время, когда они нужны.
            </p>
          </swiper-slide>

          <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px; background-color: #f9dedc;">
            <img src="https://webmeditations.pages.dev/static/images/graphics/casual-life-3d-girl-sitting-in-armchair-and-looking-at-phone.webp" style="height: 21rem;" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-bottom: -1.55rem !important;">Для максимального эффекта</h1>
            <h2 style="font-weight: 800; font-size: 35px;">Полное погружение</h2>
            <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #1f1f1f; line-height: 24px !important; letter-spacing: -0.8px;">
              В рамках данного предложения вы получите не только эффективные медитации, но и полное сопровождение к ним, включая индивидуальное аудио- и видеосопровождение.
            </p>
          </swiper-slide>

          <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px; background-color: #f9dedc;">
            <img src="https://webmeditations.pages.dev/static/images/graphics/business-3d-joyful-young-black-man-jumping.png" style="height: 21rem;" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-bottom: -1.55rem !important;">Теперь мы знакомы?</h1>
            <h2 style="font-weight: 800; font-size: 35px;">Давайте начнем</h2>
            <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #1f1f1f; line-height: 24px !important; letter-spacing: -0.8px;">
              Используйте безграничные возможности медитации, когда Вам необходимо расслабиться и найти равновесие. Хотите попробовать?
            </p>
            <ion-button fill="clear" href="/tabs/tab2" style="font-weight: 700;">Начать <ion-icon slot="end" :icon="arrowForward"></ion-icon></ion-button>
          </swiper-slide>
        </swiper>
      
    </ion-content>
  </ion-page>
  <component :is="'style'" scoped>
    .swiper-coverflow{
      height: 90%;
    }
    .swiper-pagination{
      bottom: 20px !important;
      position: relative; z-index: 4000;
    }
    .swiper-pagination-bullet {
      background: #3a81ff !important;
    }
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow } from "swiper";
import { IonPage, IonHeader, IonToolbar,  IonContent } from '@ionic/vue';

import { arrowForward } from 'ionicons/icons';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css';

import "swiper/css/effect-cards";

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "swiper/css/effect-coverflow";

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonContent, IonPage, Swiper, SwiperSlide},
  props: [ 'someFunctionParent' ],
  mounted () {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
      tabsEl.style.height = "1";
    }
  },
  setup () {
    return {
      pageStyle: {
        "--ion-background-color": "#f9dedc",
        "--ion-font-family": "Roboto"
      },
      modules: [Navigation, Pagination, Scrollbar, A11y, EffectCoverflow],
      arrowForward,
      footer: "hide"
    }
    //
  }
});

</script>
