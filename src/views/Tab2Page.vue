<template>
<ion-page>
    <ion-content :fullscreen="true" >

        <img style="padding-top: 4rem; height: auto; width: 70%; max-width: 400px; margin-left: auto; margin-right: auto; display: block;" :src="natureEllipse">

        <p style="text-align: center;padding: 0px 18px 0px; margin-top: 2rem; margin-bottom: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 21px; font-weight: 400;">{{ natureText }}</p>
        <p style="text-align: center;padding: 0px 22px 0px; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">АЛЕКСАНДР!</p>

        <ion-card style="margin-top: 9000px;">
            <ion-card-header>
                <ion-card-subtitle>Подзаголовок</ion-card-subtitle>
                <ion-card-title>Заголовок</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                Держись ближе к сердцу Природы... и время от времени отрывайся,
                и подняться на гору или провести неделю в лесу. Очисти свой дух.
            </ion-card-content>
        </ion-card>

        <ion-card >
            <ion-item>
                <ion-icon :icon="pin" slot="start"></ion-icon>
                <ion-label>ion-item in a card, icon left, button right</ion-label>
                <ion-button fill="outline" slot="end">View</ion-button>
            </ion-item>

            <ion-card-content>
                This is content, without any paragraph or header tags,
                within an ion-card-content element.
            </ion-card-content>
        </ion-card>

        <ion-card>
            <ion-item href="#" class="ion-activated">
                <ion-icon :icon="wifi" slot="start"></ion-icon>
                <ion-label>Card Link Item 1 activated</ion-label>
            </ion-item>

            <ion-item href="#">
                <ion-icon :icon="wine" slot="start"></ion-icon>
                <ion-label>Card Link Item 2</ion-label>
            </ion-item>

            <ion-item class="ion-activated">
                <ion-icon :icon="warning" slot="start"></ion-icon>
                <ion-label>Card Button Item 1 activated</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon :icon="walk" slot="start"></ion-icon>
                <ion-label>Card Button Item 2</ion-label>
            </ion-item>
        </ion-card>
    </ion-content>
</ion-page>
</template>

<style scoped>
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
    defineComponent
} from 'vue';
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonLabel
} from '@ionic/vue';

export default defineComponent({
    name: 'Tab2Page',
    components: {
        IonContent,
        IonPage,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonIcon,
        IonItem,
        IonLabel
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
