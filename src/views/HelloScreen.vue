<template>
  <ion-page>
      <ion-content :fullscreen="true" >

          <img style="padding-top: 10rem; height: auto; width: 70%; max-width: 400px; margin-left: auto; margin-right: auto; display: block;" :src="natureEllipse">

          <p style="text-align: center;padding: 0px 18px 0px; margin-top: 2rem; margin-bottom: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 21px; font-weight: 400;">{{ natureText }}</p>
          <p style="text-align: center;padding: 0px 22px 0px; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">{{ user_firstname }}!</p>
          
          <div id="outer" style="margin-top: 4rem; display: flex; justify-content: center;">
            <ion-spinner name="crescent"></ion-spinner>
          </div>
        </ion-content>
  </ion-page>
</template>

<style scoped>

ion-spinner {
    width: 60px !important;
    height: 60px !important;
}
  *{
    font-family: Montserrat !important;
  }
  @media (prefers-color-scheme: light) {
    ion-content {
      --background: #fff url('../assets/abstract/relaxing-pinkbackground.jpg') no-repeat center center / cover;
    }
  }

  @media (prefers-color-scheme: dark) {
    ion-content {
      --background: #000 url('../assets/abstract/black-and-noise-background.png') no-repeat center center / cover;
    }
  }
  
</style>

<script lang="ts">
import {
    defineComponent,
    inject
} from 'vue';
import {
    IonPage,
    IonContent,
    IonSpinner
} from '@ionic/vue';

import globaldata from '../modules/global';

export default defineComponent({
    name: 'Tab2Page',
    components: {
        IonContent,
        IonPage,
        IonSpinner
    },
    data(){
      return{
        user_firstname: "Человек"
      }
    },
    mounted () {
      // eslint-disable-next-line
      const parent_this = this;

      if(localStorage.getItem("auth_token")){
        setTimeout(function (this) {
          if(localStorage.getItem("stats_emotionalstate_atleast_once")){
            parent_this.$router.replace('/tabs/home')
            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
              tabsEl.hidden = false;
              tabsEl.style.height = "1";
            }
          }else{
            parent_this.$router.replace('/tabs/diagnostics/emotionalstate')
          }
          
        }, 5000);

        if(localStorage.getItem("user_firstname") != null){
          parent_this.user_firstname = localStorage.getItem("user_firstname") + "";
        }
        
      } else{
        parent_this.$router.replace('/tabs/auth');
      }

      const tabsEl = document.querySelector('ion-tab-bar');
      if (tabsEl) {
        tabsEl.hidden = true;
        tabsEl.style.height = "1";
      }

      
    },
    setup () {

      

      function get_random (list) {
        return list[Math.floor((Math.random()*list.length))];
      }

      const d = new Date();

      const dayMinutes = d.getHours() * 60 +d.getMinutes();

      var natureEllipse_Image;

      function imageLookup(dayPeriod = "morning"){
        var image_local;
        if(!["morning", "afternoon", "evening", "night"].includes(dayPeriod)){
          image_local = "page-dead.png"
        }else{
          const dayPeriod_list = {
            morning: ["morning-ellipse.png", "morning-mountains-ellipse.png", "morning-highview-ellipse.png", "morning-work-onbeach-ellipse.png", "swimming-morning-ellipse.png", "morning-forest-ellipse.png", "morning-bedsheet-ellipse.png", "morning-vibes-ellipse.png"],
            afternoon: ["afternoon-sky-ellipse.png", "day-city-ellipse.png", "man-onrocks-waterfall-ellipse.png", "forest-afternoon-ellipse.png", "creative-office-afternoon-ellipse.png", "afternoon-citybridge-ellipse.png", "afternoon-beach-ellipse.png", "daytime-beach-ellipse.png"],
            evening: ["evening-desert-mountains-ellipse.png", "evening-construction-ellipse.png", "evening-nature.png", "evening-newyork-ellipse.png", "evening-subway-ellipse.png", "evening-hotel-veranda-ellipse.png"],
            night: ["night-sky-1-ellipse.png", "night-view-ellipse.png", "night-houselife-ellipse.png", "mountains-at-night-ellipse.png", "night-city-ellipse.png", "man-understone-atnight-ellipse.png", "aurora-night-ellipse.png", "night-greennature-ellipse.png", "night-hotelroom-ellipse.png"]
          }
          image_local = dayPeriod_list[dayPeriod][Math.floor(Math.random() * dayPeriod_list[dayPeriod].length)]
        }
        return require("./../assets/graphics/" + image_local);
      }

      var natureEllipse_Text = "?ERR-0"

      switch (true) {
        case (300 <= dayMinutes &&  dayMinutes < 660):
          natureEllipse_Image = imageLookup("morning");
          natureEllipse_Text = get_random(["Доброе утро,", "Салют новому дню,", "Волшебного тебе утра,", "Продуктивного тебе утра,", "Счастливого дня,", "С новым днем,", "Подъем,", "Удачных удач,"])
          break;
        case (660 <= dayMinutes &&  dayMinutes < 1080):
          natureEllipse_Image = imageLookup("afternoon");
          natureEllipse_Text = get_random(["Это прекрасный день,", "У тебя все получится,", "Какой хороший день,", "Сегодня в моде улыбаться,"])
          break;
        case (1080 <= dayMinutes && dayMinutes < 1260):
          natureEllipse_Image = imageLookup("evening");
          natureEllipse_Text = get_random(["Хорошего вечера,", "Время отдохнуть,", "День только начинается,", "Хороших снов,", "Добрых снова,", "Споки-ноки,", "Завтра ты проснешься легко,", "Уютного сна,"])
          break;
        case ((0 <= dayMinutes && dayMinutes < 300) || (1260 <= dayMinutes && dayMinutes < 9999)):
          natureEllipse_Image = imageLookup("night");
          natureEllipse_Text = get_random(["Приятных снов,", "Спокойной ночи,"])
          break;
      }

      return {
        natureText: natureEllipse_Text,
        natureEllipse: natureEllipse_Image,
        pageStyle: {
          "--ion-background-color": "#F9F9F9",
          "--ion-font-family": "Roboto"
        },
        footer: "hide"
      }
      //
    }
});
</script>
