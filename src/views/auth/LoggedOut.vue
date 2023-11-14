<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Сессия завершена</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <img style="height: 25vh; margin-top: 7vh; margin-left: 3vw;" src="../../assets/graphics/3d-fluency-door.png"/>
        <div style="margin-left: 1rem;">
          <div style="margin-top: 3vh;">
            <ion-label style="font-size: 3vh;  font-weight: 700;">Вы вышли из учетной записи</ion-label>
          </div>
          <div style="margin-top: 4vh;">
            <ion-label>Чтобы продолжить, войдите в учетную запись, так как предыдущая сессия была прекращена. Это могло произойти, например, по следующим причинам:<br/><br/>
                <span style="opacity: 0.5; font-weight: 600; font-size: 2vh;">— если вы вошли в учетную запись на другом устройстве (только 1 устройство может одновременно быть подключено к одной учетной записи);</span></ion-label>
          </div>
          <ion-button style="margin-top: 3vh; margin-right: 5vw;" @click="gotoauth()" expand="block">Продолжить</ion-button>
          
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton } from '@ionic/vue';
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonLabel, IonButton },
    mounted(){

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }
    },
    methods: {
        gotoauth(){
            this.$router.push({ path: "/tabs/auth/", replace: true });
        }
    }
  });
  </script>
  