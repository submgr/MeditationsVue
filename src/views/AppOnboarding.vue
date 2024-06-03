<template>
  <ion-page :style="pageStyle">
    <ion-content :fullscreen="true">

      <div class="floating_element center" style="width:250%; align: center;"></div>
      <div style="margin-top: -8vh;"></div>

      <swiper :modules="modules" :effect="'coverflow'" navigation :pagination="{ clickable: true }">
        <swiper-slide style="display: block; padding-left: 14px; padding-right: 14px;">
          <div class="slide margintopforslide">
            <img src="../assets/graphics/3d-fluency-sofa.webp" class="center" style="height: 21rem;" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC;">
              Проще некуда!</h1>
            <h2 style="font-weight: 800; font-size: 35px; margin-top: 1vh !important;">Простая медитация</h2>
            <p
              style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
              Мы сделали медитацию в нашем приложении настолько простой, что даже новичок сможет легко погрузиться и
              извлечь из нее максимум пользы.
            </p>
          </div>
        </swiper-slide>

        <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px; padding-top: 0px;">
          <div class="margintopforslide">
            <img src="../assets/graphics/business-3d-young-man-in-formalwear-sitting-on-the-floor-with-phone.webp"
              class="center" style="height: 21rem; padding-top: 50px" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC;">
              Не
              займет много времени</h1>
            <h2 style="font-weight: 800; font-size: 35px; margin-top: 1vh !important;">Быстрая медитация</h2>
            <p
              style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
              Попробуйте медитацию в любом месте, где бы вы ни находились. Наши медитации не занимают много времени,
              поэтому
              их легко начать в любое время, когда они нужны.
            </p>
          </div>

        </swiper-slide>

        <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px;">
          <div class="margintopforslide">
            <img src="../assets/graphics/casual-life-3d-girl-sitting-in-armchair-and-looking-at-phone.webp" class="center"
              style="height: 21rem;" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC;">
              Для максимального эффекта</h1>
            <h2 style="font-weight: 800; font-size: 35px; margin-top: 1vh !important;">Полное погружение</h2>
            <p
              style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
              В рамках данного предложения вы получите не только эффективные медитации, но и полное сопровождение к ним,
              включая индивидуальное аудио- и видеосопровождение.
            </p>
          </div>

        </swiper-slide>

        <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px;">
          <div class="margintopforslide">
            <img src="../assets/graphics/business-3d-joyful-young-black-man-jumping.webp" style="height: 21rem;"
              class="center" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC;">
              Теперь мы знакомы?</h1>
            <h2 style="font-weight: 800; font-size: 35px; margin-top: 1vh !important;">Давайте начнем</h2>
            <p
              style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
              Используйте безграничные возможности медитации, когда Вам необходимо расслабиться и найти равновесие. Хотите
              попробовать?
            </p>
            <ion-button fill="clear" @click="gonextscreen()" style="font-weight: 700;">Начать <ion-icon slot="end"
                :icon="arrowForward"></ion-icon></ion-button>
          </div>

        </swiper-slide>
      </swiper>

    </ion-content>
  </ion-page>
</template>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
}

.floating_element {
  display: block;
  position: fixed;
  z-index: -1;
  bottom: -100%;
  height: 160%;
  left: 30px;
}

.swiper-coverflow {
  height: 120%;
}

.swiper-pagination {
  bottom: 00px !important;
  position: relative;
  z-index: 4000;
}

.swiper-pagination-bullet {
  background: #3a81ff !important;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.swiper-button-prev {
  margin-top: -5vh !important;
}

.swiper-button-next {
  margin-top: -5vh !important;
}

.margintopforslide {
  margin-top: 19vh;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { IonPage, IonContent, IonButton } from '@ionic/vue';

import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';

import { arrowForward } from 'ionicons/icons';
import 'swiper/css/bundle';
import '@ionic/vue/css/ionic-swiper.css';

import "swiper/css/effect-cards";

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "swiper/css/effect-coverflow";

export default defineComponent({
  name: 'Tab3Page',
  components: { IonContent, IonPage, Swiper, SwiperSlide, IonButton },
  props: ['someFunctionParent'],
  mounted() {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
      tabsEl.style.height = "1";
    }
  },
  methods: {
    gonextscreen() {
      this.$router.push({
        path: '/tabs/auth',
        replace: false
      });
    }
  },
  setup() {
    return {
      pageStyle: {
        "--ion-background-color": "#000000",
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
