<template>
  <div>

    <!-- <Transition name="bounce">
            <div v-if="displayStage == 'moodRateBox'">
                <ion-card :class="{ 'stop-animations': stopAllAnimations }" color="light"
            style="border-radius: 20px; --glow-opacity: 1; --glow-scale: 2.5; --glow-blur: 6; --glow-radius: 100; --glow-rotate-unit: 1deg;"
            class="ion-text-centerOFF gradient-border-card glowing-card cardg ion-activatable ripple-parent rounded-rectangle">
            <span class="glow"></span>
            <div style="margin: 2px;" class="innerdiv_notifcoloredradius bg-colored unique-element-glowing-ratebox1">
                <div style="margin-left: 16px; font-size: 18px; font-weight: 400; opacity: 0.6;"><div style="padding-top: 20px; "></div>Добрый день, {{name}}</div>
                    <div style="margin-left: 16px; margin-top: 0px; font-size: 20px; font-weight: 400;">Как вы себя чувствуете сегодня?</div>
                <div style="display: flex; overflow-x: auto; margin-top: -14px; overflow-x: hidden;">
                    <div v-for="(item, index) in moodStates" :key="item.code" style="margin-right: -25px;" @click="rated(displayStage, item.code)">
                      <ion-card class="ion-activatable ripple-parent rectangle" style="border-radius: 20px; width: 13.5vw;">
                        <span style="display: none;">Element Index is {{index}}</span>
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-card-header style="margin: -2.5vw;">
                          <ion-card-title>
                            <img v-bind:src="item.image.toString()"/></ion-card-title>
                        </ion-card-header>
                      </ion-card>
                    </div>
                  </div>
            </div>
                    
                </ion-card>
            </div>
        </Transition> -->

    <Transition name="bounce">

      <div v-if="displayStage == 'moodRateBox'" class="myview">
        <ul>
          <div style="margin: 2px;" class="innerdiv_notifcoloredradius bg-colored unique-element-glowing-ratebox1">
            <div style="margin-left: 16px; font-size: 18px; font-weight: 400; opacity: 0.6;"><div style="padding-top: 20px; "></div>Добрый день, {{name}}</div>
                <div style="margin-left: 0px; margin-top: 0px; font-size: 19px; font-weight: 400;">Как вы себя чувствуете сегодня?</div>
            <div style="display: flex; overflow-x: auto;  overflow-x: hidden; margin: auto;
            width: 90%; margin-top: -0.7vh;">
                <div v-for="(item, index) in moodStates" :key="item.code" style="margin-right: -25px;">
                  <ion-card class="ion-activatable ripple-parent rectangle" style="border-radius: 20px; width: 13.5vw; " @click="rated(displayStage, item.code)">
                    <span style="display: none;">Element Index is {{index}}</span>
                    <ion-ripple-effect></ion-ripple-effect>
                    <ion-card-header style="margin: -2.5vw;">
                      <ion-card-title>
                        <img v-bind:src="item.image.toString()"/></ion-card-title>
                    </ion-card-header>
                  </ion-card>
                </div>
              </div>
        </div>
        </ul>
      </div>
    </Transition>



  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';

import { IonCard, IonCardHeader, IonCardTitle, IonRippleEffect } from '@ionic/vue';

import { TransitionRoot } from '@headlessui/vue'

import globaldata from '../../modules/global';

import store from "../../store";

const getUserData = computed(() => {
  return store.getters.getUserData;
});



export default defineComponent({
  name: 'ExploreContainer',
  props: {
    field_test: String
  },
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonRippleEffect
  },
  data() {
    return {
      openedModal: "none",
      isShowing: true,
      name: "",
      displayStage: "moodRateBox",
      moodStates: [
        { code: "excellent", title: "Excellent", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxsaW5lYXJHcmFkaWVudCBpZD0ia1UyUGY3Zko0TnBmNkk1Q2RzaHM1YV9DSTNjcmJvb080QUZfZ3IxIiB4MT0iLTgwMS45NjkiIHgyPSItNzczLjg5IiB5MT0iLTE2MC4wMzEiIHkyPSItMTg4LjExIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDkwIC00ODEgMzMxKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZlZGUwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjUxOSIgc3RvcC1jb2xvcj0iI2ZlY2MwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmYjcwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCNrVTJQZjdmSjROcGY2STVDZHNoczVhX0NJM2NyYm9vTzRBRl9ncjEpIiBkPSJNMjQsNDRjMTEuMDQ1LDAsMjAtOC45NTUsMjAtMjBTMzUuMDQ1LDQsMjQsNFM0LDEyLjk1NSw0LDI0UzEyLjk1NSw0NCwyNCw0NHoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMzQzNDM0IiBkPSJNMjQsMzlMMjQsMzljLTQuNDE4LDAtOC0zLjU4Mi04LTh2MGMwLTAuNTUyLDAuNDQ4LTEsMS0xaDE0YzAuNTUyLDAsMSwwLjQ0OCwxLDF2MAlDMzIsMzUuNDE4LDI4LjQxOCwzOSwyNCwzOXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjkuNTM3LDMySDE4LjQ2M0MxOC4yMDcsMzIsMTgsMzEuNzkzLDE4LDMxLjUzN1YzMGgxMnYxLjUzN0MzMCwzMS43OTMsMjkuNzkzLDMyLDI5LjUzNywzMnoiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9ImtVMlBmN2ZKNE5wZjZJNUNkc2hzNWJfQ0kzY3Jib29PNEFGX2dyMiIgeDE9IjI0IiB4Mj0iMjQiIHkxPSI0MS4yMDQiIHkyPSIzNi4wMDgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmMDU5NjQiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNkNDQxNGMiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgja1UyUGY3Zko0TnBmNkk1Q2RzaHM1Yl9DSTNjcmJvb080QUZfZ3IyKSIgZD0iTTE5LjIwOCwzNy4zOTVDMjAuNTQ1LDM4LjM5OCwyMi4yLDM5LDI0LDM5czMuNDU1LTAuNjAyLDQuNzkyLTEuNjA1CUMyNy42OTcsMzUuOTQyLDI1Ljk2LDM1LDI0LDM1UzIwLjMwMywzNS45NDIsMTkuMjA4LDM3LjM5NXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMzQzNDM0IiBkPSJNMTkuOTY2LDIzYy0wLjM0NSwwLTAuNjgxLTAuMTc5LTAuODY2LTAuNDk5QzE4LjU2MywyMS41NzUsMTcuNTY3LDIxLDE2LjUsMjFzLTIuMDYzLDAuNTc1LTIuNiwxLjUgYy0wLjI3NywwLjQ3OC0wLjg5MSwwLjY0LTEuMzY2LDAuMzY0Yy0wLjQ3OS0wLjI3Ny0wLjY0Mi0wLjg4OS0wLjM2NC0xLjM2N0MxMy4wNjMsMTkuOTU3LDE0LjcyMiwxOSwxNi41LDE5IHMzLjQzOCwwLjk1OCw0LjMzLDIuNDk4YzAuMjc3LDAuNDc4LDAuMTE0LDEuMDktMC4zNjQsMS4zNjdDMjAuMzA5LDIyLjk1NiwyMC4xMzYsMjMsMTkuOTY2LDIzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMzNDM0MzQiIGQ9Ik0zNC45NjYsMjNjLTAuMzQ1LDAtMC42ODEtMC4xNzktMC44NjYtMC40OTlDMzMuNTYzLDIxLjU3NSwzMi41NjcsMjEsMzEuNSwyMXMtMi4wNjMsMC41NzUtMi42LDEuNSBjLTAuMjc3LDAuNDc4LTAuODkxLDAuNjQtMS4zNjYsMC4zNjRjLTAuNDc5LTAuMjc3LTAuNjQyLTAuODg5LTAuMzY0LTEuMzY3QzI4LjA2MywxOS45NTcsMjkuNzIyLDE5LDMxLjUsMTkgczMuNDM4LDAuOTU4LDQuMzMsMi40OThjMC4yNzcsMC40NzgsMC4xMTQsMS4wOS0wLjM2NCwxLjM2N0MzNS4zMDksMjIuOTU2LDM1LjEzNiwyMywzNC45NjYsMjN6Ij48L3BhdGg+Cjwvc3ZnPg==" },
        { code: "good", title: "Good", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV9fN1c0S1NnUnZYWmVPX2dyMSIgeDE9Ii0yNTcuOTY5IiB4Mj0iLTIyOS44OSIgeTE9Ii0yOTYuMDMxIiB5Mj0iLTMyNC4xMSIgZ3JhZGllbnRUcmFuc2Zvcm09InJvdGF0ZSg5MCAtMjc3IC05KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZlZGUwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjUxOSIgc3RvcC1jb2xvcj0iI2ZlY2MwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmYjcwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCNTVkdJRF8xX183VzRLU2dSdlhaZU9fZ3IxKSIgZD0iTTI0LDQ0YzExLDAsMjAtOSwyMC0yMFMzNSw0LDI0LDRTNCwxMyw0LDI0UzEzLDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMzNDM0MzQiIGQ9Ik0zMS44LDMxLjdjMC40LDAuNCwwLjMsMS0wLjEsMS40QzI5LjUsMzUsMjYuOCwzNiwyNCwzNnMtNS41LTEtNy43LTIuOWMtMC40LTAuNC0wLjUtMS0wLjEtMS40CWMwLjQtMC40LDEtMC41LDEuNC0wLjFjMS44LDEuNSw0LDIuNCw2LjMsMi40czQuNi0wLjksNi4zLTIuNGMwLjItMC4yLDAuNC0wLjMsMC43LTAuM0MzMS4zLDMxLjMsMzEuNiwzMS41LDMxLjgsMzEuN3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjMzQzNDM0IiBkPSJNMjAsMjNjLTAuMywwLTAuNy0wLjItMC45LTAuNWMtMC41LTAuOS0xLjUtMS41LTIuNi0xLjVzLTIuMSwwLjYtMi42LDEuNWMtMC4zLDAuNS0wLjksMC42LTEuNCwwLjQgYy0wLjUtMC4zLTAuNi0wLjktMC40LTEuNGMwLjktMS41LDIuNi0yLjUsNC4zLTIuNXMzLjQsMSw0LjMsMi41YzAuMywwLjUsMC4xLDEuMS0wLjQsMS40QzIwLjMsMjMsMjAuMSwyMywyMCwyM3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjMzQzNDM0IiBkPSJNMzUsMjNjLTAuMywwLTAuNy0wLjItMC45LTAuNWMtMC41LTAuOS0xLjUtMS41LTIuNi0xLjVzLTIuMSwwLjYtMi42LDEuNWMtMC4zLDAuNS0wLjksMC42LTEuNCwwLjQgYy0wLjUtMC4zLTAuNi0wLjktMC40LTEuNGMwLjktMS41LDIuNi0yLjUsNC4zLTIuNXMzLjQsMSw0LjMsMi41YzAuMywwLjUsMC4xLDEuMS0wLjQsMS40QzM1LjMsMjMsMzUuMSwyMywzNSwyM3oiPjwvcGF0aD4KPC9zdmc+" },
        { code: "ok", title: "OK", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV9fb1QzT3pRRXFrVndMX2dyMSIgeDE9Ii0yNTcuOTY5IiB4Mj0iLTIyOS44OSIgeTE9Ii00MzIuMDMxIiB5Mj0iLTQ2MC4xMSIgZ3JhZGllbnRUcmFuc2Zvcm09InJvdGF0ZSg5MCAtMzQ1IC03NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZWRlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii41MTkiIHN0b3AtY29sb3I9IiNmZWNjMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmI3MDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjU1ZHSURfMV9fb1QzT3pRRXFrVndMX2dyMSkiIGQ9Ik0yNCw0NGMxMSwwLDIwLTksMjAtMjBTMzUsNCwyNCw0UzQsMTMsNCwyNFMxMyw0NCwyNCw0NHoiPjwvcGF0aD48Y2lyY2xlIGN4PSIxNiIgY3k9IjIyIiByPSI0IiBmaWxsPSIjZmZmIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIzMiIgY3k9IjIyIiByPSI0IiBmaWxsPSIjZmZmIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxNiIgY3k9IjIyIiByPSIyIiBmaWxsPSIjMzQzNDM0Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIzMiIgY3k9IjIyIiByPSIyIiBmaWxsPSIjMzQzNDM0Ij48L2NpcmNsZT48cGF0aCBmaWxsPSIjMzQzNDM0IiBkPSJNMjcuMywzNmMtMS4yLDAtMi40LTAuNi0zLjMtMS43Yy0wLjksMS4xLTIsMS43LTMuMywxLjdjLTEuNSwwLTMtMC45LTMuOS0yLjVjLTAuMy0wLjUtMC4xLTEuMSwwLjQtMS40IGMwLjUtMC4zLDEuMS0wLjEsMS40LDAuNGMwLjUsMC45LDEuMywxLjUsMi4xLDEuNWMwLjksMCwxLjgtMC44LDIuMy0yYzAuMi0wLjQsMC41LTAuNiwwLjktMC42czAuOCwwLjIsMC45LDAuNiBjMC41LDEuMiwxLjQsMiwyLjMsMmMwLjgsMCwxLjYtMC41LDIuMS0xLjVjMC4zLTAuNSwwLjktMC43LDEuNC0wLjRjMC41LDAuMywwLjcsMC45LDAuNCwxLjRDMzAuMiwzNS4xLDI4LjgsMzYsMjcuMywzNnoiPjwvcGF0aD4KPC9zdmc+" },
        { code: "sad", title: "Sad", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxsaW5lYXJHcmFkaWVudCBpZD0iNHdTWE83SmlxbFp2eERVXzI5S0xGYV9wakdTTGdPZm9waUpfZ3IxIiB4MT0iMTAuMDMxIiB4Mj0iMzguMTEiIHkxPSIxMC4wMzEiIHkyPSIzOC4xMSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIDEgMSAwIDAgMCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZWRlMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii41MTkiIHN0b3AtY29sb3I9IiNmZWNjMDAiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmI3MDAiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjNHdTWE83SmlxbFp2eERVXzI5S0xGYV9wakdTTGdPZm9waUpfZ3IxKSIgZD0iTTI0LDQ0YzExLjA0NSwwLDIwLTguOTU1LDIwLTIwUzM1LjA0NSw0LDI0LDRTNCwxMi45NTUsNCwyNFMxMi45NTUsNDQsMjQsNDR6Ij48L3BhdGg+PGNpcmNsZSBjeD0iMTYiIGN5PSIyMiIgcj0iNCIgZmlsbD0iI2ZmZiI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMzIiIGN5PSIyMiIgcj0iNCIgZmlsbD0iI2ZmZiI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTYiIGN5PSIyMiIgcj0iMiIgZmlsbD0iIzM0MzQzNCI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMzIiIGN5PSIyMiIgcj0iMiIgZmlsbD0iIzM0MzQzNCI+PC9jaXJjbGU+PHBhdGggZmlsbD0iIzM0MzQzNCIgZD0iTTMxLDM1LjY1MmMtMC4yMzUsMC0wLjQ3LTAuMDgyLTAuNjYtMC4yNUMyOC41OCwzMy44NTMsMjYuMzI5LDMzLDI0LDMzcy00LjU4LDAuODUzLTYuMzM5LDIuNDAyCWMtMC40MTUsMC4zNjUtMS4wNDcsMC4zMjUtMS40MTEtMC4wOWMtMC4zNjUtMC40MTQtMC4zMjUtMS4wNDYsMC4wOS0xLjQxMUMxOC40NjQsMzIuMDMsMjEuMTg1LDMxLDI0LDMxczUuNTM2LDEuMDMsNy42NjEsMi45MDEJYzAuNDE1LDAuMzY1LDAuNDU1LDAuOTk3LDAuMDksMS40MTFDMzEuNTUzLDM1LjUzNywzMS4yNzcsMzUuNjUyLDMxLDM1LjY1MnoiPjwvcGF0aD4KPC9zdmc+" },
        { code: "awful", title: "Awful", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxsaW5lYXJHcmFkaWVudCBpZD0iN05kYUhVZXhKeXRZM3VGNXhQRjhrYV9yTGdBckpmNFBYOE9fZ3IxIiB4MT0iLTE4OS45NjkiIHgyPSItMTYxLjg5IiB5MT0iMTc5Ljk2OSIgeTI9IjE1MS44OSIgZ3JhZGllbnRUcmFuc2Zvcm09InJvdGF0ZSg5MCAtNSAxOTUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmVkZTAwIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNTE5IiBzdG9wLWNvbG9yPSIjZmVjYzAwIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZiNzAwIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBmaWxsPSJ1cmwoIzdOZGFIVWV4Snl0WTN1RjV4UEY4a2FfckxnQXJKZjRQWDhPX2dyMSkiIGQ9Ik0yNCw0NGMxMS4wNDUsMCwyMC04Ljk1NSwyMC0yMFMzNS4wNDUsNCwyNCw0UzQsMTIuOTU1LDQsMjRTMTIuOTU1LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMzNDM0MzQiIGQ9Ik0zMS43NTEsMzQuNjU2YzAuMzY1LTAuNDE0LDAuMzI1LTEuMDQ2LTAuMDktMS40MTFjLTIuMTI1LTEuODcxLTQuODQ2LTIuOTAxLTcuNjYxLTIuOTAxCXMtNS41MzYsMS4wMy03LjY2LDIuOTAxYy0wLjQxNSwwLjM2NS0wLjQ1NSwwLjk5Ny0wLjA5LDEuNDExYzAuMzY0LDAuNDE1LDAuOTk2LDAuNDU1LDEuNDExLDAuMDkJYzEuNzU5LTEuNTQ5LDQuMDEtMi40MDIsNi4zMzktMi40MDJzNC41OCwwLjg1Myw2LjM0LDIuNDAyYzAuMTksMC4xNjgsMC40MjUsMC4yNSwwLjY2LDAuMjUJQzMxLjI3NywzNC45OTYsMzEuNTUzLDM0Ljg4MSwzMS43NTEsMzQuNjU2eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMzNDM0MzQiIGQ9Ik0xOS4wMzgsMTguOTA2Yy0wLjMyMywwLjEyMi0wLjU3NCwwLjQwNy0wLjYzNSwwLjc3MkMxOC4yMjgsMjAuNzMzLDE3LjQ5OSwyMS42MjMsMTYuNSwyMiBzLTIuMTM0LDAuMTktMi45NjItMC40ODdjLTAuNDI4LTAuMzQ5LTEuMDU5LTAuMjg1LTEuNDA3LDAuMTQyYy0wLjM1LDAuNDI4LTAuMjg3LDEuMDU4LDAuMTQxLDEuNDA3IGMxLjM3OSwxLjEyNywzLjI2OSwxLjQzNyw0LjkzMywwLjgxYzEuNjY0LTAuNjI3LDIuODc5LTIuMTA5LDMuMTcxLTMuODY1YzAuMDkxLTAuNTQ1LTAuMjc4LTEuMDYtMC44MjMtMS4xNSBDMTkuMzc0LDE4LjgyNiwxOS4xOTcsMTguODQ2LDE5LjAzOCwxOC45MDZ6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzM0MzQzNCIgZD0iTTI4LjI1NywxOC45MDZjMC4zMjMsMC4xMjIsMC41NzQsMC40MDcsMC42MzUsMC43NzJjMC4xNzUsMS4wNTUsMC45MDQsMS45NDUsMS45MDMsMi4zMjEgYzAuOTk5LDAuMzc3LDIuMTM0LDAuMTksMi45NjItMC40ODdjMC40MjgtMC4zNDksMS4wNTktMC4yODUsMS40MDcsMC4xNDJjMC4zNSwwLjQyOCwwLjI4NywxLjA1OC0wLjE0MSwxLjQwNyBjLTEuMzc5LDEuMTI3LTMuMjY5LDEuNDM3LTQuOTMzLDAuODFjLTEuNjY0LTAuNjI3LTIuODc5LTIuMTA5LTMuMTcxLTMuODY1Yy0wLjA5MS0wLjU0NSwwLjI3OC0xLjA2LDAuODIzLTEuMTUgQzI3LjkyMSwxOC44MjYsMjguMDk4LDE4Ljg0NiwyOC4yNTcsMTguOTA2eiI+PC9wYXRoPgo8L3N2Zz4=" },
      ]
    }
  },
  methods: {
    closemodal() {
      this.openedModal = "none"
    },
    rated(stage, code) {
      this.displayStage = "none"
    }
  },
  mounted() {

    console.log(getUserData.value)

    this.name = getUserData.value.name;



    //
  }
});
</script>
  
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;

}

@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
    transform: scale(0);

  }

  50% {
    transform: translate3d(0, 0, 0);
    transform: scale(1.08);
  }

  100% {
    transform: translate3d(0, 0, 0);
    transform: scale(1);
  }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.elementHidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s linear, opacity 1s linear;
}

.elementVisible {
  opacity: 1;
  transition: visibility 0.3s linear, opacity 1s linear;
}

.iframe_smooth {
  animation: fadeIn 10s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }


}


.myview {
  border-radius: 20px;
  position: relative;
  margin: 0.5vh auto 3.5vh;
  width: 91vw;
  height: auto;
  
  text-align: center;
}

.myview ul {
  font-family: 'Kalam', cursive;
  font-size: 80px;
  list-style: none;
  position: relative;
}

.myview ul li:nth-child(1) {
  color: #0000ff;
  filter: blur(10px);
  animation: child1 2s alternate infinite;
}

.myview ul li:nth-child(2) {
  color: #00ffff;
  filter: blur(5px);
  animation: child2 2s alternate infinite;
}

.myview ul li:nth-child(3) {
  color: #000;
  filter: blur(0px);
}

@keyframes child1 {

  0%,
  100% {
    filter: blur(10px);
  }

  50% {
    filter: none;
  }
}

@keyframes child2 {

  0%,
  100% {
    filter: blur(5px);
  }

  50% {
    filter: blur(1px);
  }
}

.myview:before,
.myview:after {
  content: '';
  border-radius: 21.5px;
  position: absolute;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background-image: linear-gradient(45deg, #ff5da9, #3c67e3 43%, #4e00c2);
  background-size: 400%;
  z-index: -1;
  animation: move 3s alternate infinite;
}

.myview:after {
  filter: blur(0px);
}

@keyframes move {

  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}
</style>
  