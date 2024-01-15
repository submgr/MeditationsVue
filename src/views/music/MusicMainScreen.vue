<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Музыка</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Музыка</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <ion-card style="margin-left: 0;">
                <img alt="Silhouette of mountains"  style="margin-botoom: 0;" src="https://i.ibb.co/JjLSTWq/Frame-1-1.png" />
                <ion-card-header  style="margin-top: 0;">
                  <ion-card-subtitle  style="margin-top: 0;">Природа</ion-card-subtitle>
                </ion-card-header>
              </ion-card>
            </ion-col>
            <ion-col size="6">
              <ion-card style="margin-left: 0;">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <ion-card-header style="margin-top: 0;">
                  <ion-card-subtitle style="margin-top: 0;">Природа</ion-card-subtitle>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  export default defineComponent({
    name: 'Tab3Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    setup () {
      //
    }
  });
  
  </script>

  <style scoped>
  @font-face {
    font-family: "Geist";
    src: url("https://assets.codepen.io/605876/GeistVF.ttf") format("truetype");
  }
  
  ion-content {
    --background: none;
    font-family: "Geist", arial;
    font-weight: 100;
    display: grid;
    place-items: center;
    min-height: 100vh;
    color: hsl(0 0% 98%);
    --background: linear-gradient(
      hsl(0 0% 12%) 0 2px,
      transparent 2px var(--size)
    ) 50% 50% / var(--size) var(--size),
    linear-gradient(
      90deg,
      hsl(0 0% 12%) 0 2px,
      transparent 2px var(--size)
    ) 50% 50% / var(--size) var(--size) !important;
  }
  
  ion-content::before {
    content: "";
    position: fixed;
    inset: 0;
    --size: 100px;
    --background:
       !important;
    mask: linear-gradient(25deg, white, transparent);
    z-index: -1;
  }

  @font-face {
    font-family: "Geist Sans";
    src: url("https://assets.codepen.io/605876/GeistVF.ttf") format("truetype");
  }
  
  * {
    box-sizing: border-box;
  }
  
  :root {
    --bg: hsl(0 0% 2%)
  }
  
  body {
    display: grid;
    place-items: center;
    min-height: 100vh;
    font-family: "Geist Sans", sans-serif;
    font-weight: 80;
    background: var(--bg);
    overflow: hidden;
  }
  
  body::before {
    --size: 120px;
    --line: hsl(0 0% 100% / 0.13);
    --thickness: 2px;
    --offset: 60px;
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background:
      linear-gradient(transparent 0 calc(var(--size) - var(--thickness)), var(--line) calc(var(--size) - var(--thickness)) var(--size)) var(--offset) var(--offset) / var(--size) var(--size),
      linear-gradient(90deg, transparent 0 calc(var(--size) - var(--thickness)), var(--line) calc(var(--size) - var(--thickness)) var(--size)) var(--offset) var(--offset) / var(--size) var(--size);
  }

  ion-content {
    --size: 8vh;
    --line: hsl(0 0% 100% / 0.13);
    --thickness: 2px;
    --offset: 60px;
    animation: gradient 15s ease infinite;
    --background: linear-gradient(transparent 0 calc(var(--size) - var(--thickness)), var(--line) calc(var(--size) - var(--thickness)) var(--size)) var(--offset) var(--offset) / var(--size) var(--size),
    linear-gradient(90deg, transparent 0 calc(var(--size) - var(--thickness)), var(--line) calc(var(--size) - var(--thickness)) var(--size)) var(--offset) var(--offset) / var(--size) var(--size);
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  
  
  </style>
  