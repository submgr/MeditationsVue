


  <template>
    <ion-page>
      <ion-content :fullscreen="true">

        <NavbarController activatedfrom="Emotions/MakeSmilePhoto" @backfunction="$router.back()"
        @infomodalfunction="infomodalfunction()" align="right" />

        <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Поддержка</h1>

        <div style="margin-left: 1.1rem; margin-right: 2vw;">
            <ion-label><br/>Если у вас возникли вопросы, вы можете задать их нам удобным для вас способом, например, в онлайн-чате или по электронной почте.<br/><br/>
                Иногда никого из нашей команды нет в сети, поэтому, если вы не получили ответа в чате, напишите нам на электронную почту, и мы ответим, как только сможем.</ion-label>
        </div>
        
        <ion-grid>

            
            <ion-row>
              <ion-col style="margin-right: -3vw; margin-left: -2vw;" @click="supportOption_chat">
                <ion-card class="ion-activatable ripple-parent rectangle">
                    <ion-ripple-effect></ion-ripple-effect>
                    <ion-card-header>
                      <ion-card-title><ion-icon style="font-size: 5vh; margin-top: 1vh;" :icon="chatbubblesOutline"></ion-icon></ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Онлайн чат
                      </ion-card-content>
                  </ion-card>
              </ion-col>
              <ion-col style="margin-left: -3vw;" @click="supportOption_email">
                <ion-card class="ion-activatable ripple-parent rectangle">
                    <ion-ripple-effect></ion-ripple-effect>
                    <ion-card-header>
                      <ion-card-title><ion-icon style="font-size: 5vh; margin-top: 1vh;" :icon="mailOutline"></ion-icon></ion-card-title>
                    </ion-card-header>
                
                    <ion-card-content>
                      E-mail
                    </ion-card-content>
                  </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        
      </ion-content>
    </ion-page>
  </template>

  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonGrid, IonLabel, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRippleEffect } from '@ionic/vue';
  import { chatbubblesOutline, mailOutline } from 'ionicons/icons';

  import NavbarController from '@/components/NavbarController.vue';

  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonRippleEffect, NavbarController  },
    mounted(){
        //
    },
    methods: {
        supportOption_chat(){
            this.$router.push({path:'/tabs/support/chat', replace: false});
        },
        supportOption_email(){
            (window as any).location = "mailto:support@deqstudio.com";
        }
    },
    setup(){
        return {
            chatbubblesOutline, mailOutline
        }
    }
  });
  </script>
  