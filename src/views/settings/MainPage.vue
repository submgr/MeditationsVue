


<template>
    <ion-page>
      <ion-content :fullscreen="true">

        <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Настройки</h1>

        <ion-card>
            <ion-card-header>
              <ion-card-subtitle style="margin-left: -5px;">Учетная запись</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
                <ion-item>
                  <ion-toggle>Получать уведомления</ion-toggle>
                </ion-item>
                <ion-item @click="deleteAccountSetting()">
                  <ion-label color="danger" >Удалить учетную запись</ion-label>
                </ion-item>
              </ion-list>
          </ion-card>

          
        
      </ion-content>

      <ion-modal trigger="open-modal" :initial-breakpoint="0.55" :breakpoints="[0, 0.55]" handle-behavior="cycle"
            :is-open="openedModal == 'deleteaccountinfomodal'">
            <ion-content class="ion-padding">
                <div class="ion-margin-top">
                    <span style="font-size: 12px; display: block; line-height: 1.5; opacity: 0.7; font-weight: 500;">Обратите внимание, что удаление учетной записи нельзя будет отменить. Это значит, что все ваши данные будут удалены без возможности восстановления.</span>
                    <ion-button style="margin-top: 4vh;" color="danger" expand="block" @click="openedModal = 'none'; $router.push({path:'/tabs/settings/deleteaccount', replace: false});">Удалить учетную запись</ion-button>
                </div>
            </ion-content>
        </ion-modal>

      
    </ion-page>
  </template>

  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonLabel, IonCard, IonCardHeader, IonModal } from '@ionic/vue';
  import { chatbubblesOutline, mailOutline } from 'ionicons/icons';

  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, IonCard, IonLabel, IonCardHeader, IonModal },
    mounted(){
        //
    },
    data(){
        return {
            openedModal: "none",
        }
    },
    methods: {
        deleteAccountSetting(){
            this.openedModal = 'deleteaccountinfomodal'
        }
    },
    setup(){
        return {
            chatbubblesOutline, mailOutline
        }
    }
  });
  </script>
  