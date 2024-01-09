<template>
  <ion-page>
    <ion-tabs translucent="true">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" translucent="true" mode="ios">
        <!---<ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="musicalNote" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/hello">
          <ion-icon :icon="videocam" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/onboarding">
          <ion-icon :icon="gameController" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>--->
        <ion-tab-button tab="sleep" href="/tabs/sleep/main">
          <ion-icon :icon="bedOutline" />
          <ion-label>Сон</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="music" href="/tabs/music/main">
          <ion-icon :icon="musicalNotesOutline" />
          <ion-label>Музыка</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Медитация</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="relaxation" href="/tabs/relaxation/info">
          <ion-icon :icon="infiniteOutline" />
          <ion-label>Баланс</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="myself" href="/tabs/myself/overview">
          <ion-icon :icon="happyOutline" />
          <ion-label>Вы</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { musicalNote, gameController, videocam, infiniteOutline, homeOutline, happyOutline, bedOutline, musicalNotesOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      musicalNote,
      gameController,
      videocam,
      infiniteOutline,
      homeOutline,
      happyOutline,
      bedOutline,
      musicalNotesOutline,
      footer: "show"
    }
  }
});

export function hideTabs() {
  const tabsEl = document.querySelector('ion-tabs');
  if (tabsEl) {
    tabsEl.hidden = true;
  }
}

export function showTabs() {
  const tabsEl = document.querySelector('ion-tabs');
  if (tabsEl) {
    tabsEl.hidden = false;
  }
}
</script>
