<template>
    <div>
        <ion-content class="ion-padding">
            <ion-modal trigger="open-modal" :initial-breakpoint="0.85" :breakpoints="[0, 0.85]" handle-behavior="cycle"
                :is-open="openedModal == 'redeemedFreePremiumAccessModal'">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <Vue3Lottie :animationData="require('./../../assets/lottie/florid-girl-ties-a-bow-on-a-gift.json')"
                            :height="150" :width="150" style="max-width: 55vw; margin-left: -3vw; margin-top: 4vh;" />
                        <ion-label style="font-size: 14px;">Спасибо за то, что решили попробовать приложение <b><i>Ваша
                                    медитация</i></b><i>!</i></ion-label><br/><br/>
                        <span style="font-size: 12px; display: block; line-height: 1.5; opacity: 0.7; font-weight: 500;">В знак
                            благодарности за то, что вы одними из первых попробовали наше приложение, мы рады предложить вам
                            целый год премиум-доступа безвозмездно. Мы надеемся, что вам было очень приятно медитировать
                            вместе с нами, и мы очень хотим вдохновлять вас и дальше в этом совместном
                            путешествии!</span>
                        <ion-button style="margin-top: 4vh;" expand="block" @click="closemodal()">Спасибо!</ion-button>
                    </div>
                </ion-content>
            </ion-modal>
        </ion-content>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';

import globaldata from '../../modules/global';

import { IonContent, IonLabel, IonModal, IonButton } from '@ionic/vue';

import store from "../../store";

const getUserData = computed(() => {
    return store.getters.getUserData;
});

import { Vue3Lottie } from 'vue3-lottie'

export default defineComponent({
    name: 'ExploreContainer',
    props: {
        origin: String
    },
    components: { IonContent, IonModal, IonLabel, Vue3Lottie, IonButton },
    data() {
        return {
            announcements: [],
            freePremiumServerMagicToken: "mi3si0fbl27kad4bxtfwcbzebbb6yjrl",
            freePremiumForPeriod: "1 год (1-year)",
            openedModal: "none"
        }
    },
    methods: {
        closemodal() {
            this.openedModal = "none"
        },
        checkForFreePremiumAccessRedeem() {
            if (localStorage.getItem("temp_metricsVal_0x11320214") === null) {
                //nothing?
            } else {
                // Here we check if conditions are met for free premium subscription.
                // We called it this weird way "temp_metricsVal_0x11320214" just to hide it from other's eyes :)
                // this complicated key name will confuse everyone else.
                console.log("Executed temp_metricsVal_0x11320214 with the result: this feature isn't available right now for redeem.")
                if (localStorage.getItem("temp_metricsVal_0x11320214") == "00111_compaign1") {
                    this.redeemFreePremiumAccess();
                }
            }
        },
        redeemFreePremiumAccess() {
            // eslint-disable-next-line
            const parent_this = this;

            var data_obj = {
                compaign: "compaign1",
                doYouLikeDick: "yes",
                magic_token: parent_this.freePremiumServerMagicToken,
                timestamp: new Date().getTime()
            }

            let encodedValue = btoa(JSON.stringify(data_obj));

            //we use param "milkshake" to deliver our special object with info of compaign requested, magic token and current date in milliseconds.

            this.$http.get(globaldata.api.hostname + "access/redeem/freePremiumAccess", {
                params: {
                    method: "email",
                    magic_code: parent_this.freePremiumServerMagicToken,
                    milkshake: encodedValue,
                    auth_userid: getUserData.value.id
                }
            }).then((response) => {
                console.log(response)
                if (response.data.status == "okay") {
                    this.$store.dispatch("fetchUserData").then(() => {
                        //done! updated user's data so in other parts of app there will be updated information with New User's Premium Status!!! yay! :D
                    });
                    setTimeout(() => {
                        parent_this.openedModal = "redeemedFreePremiumAccessModal"
                        setTimeout(() => {
                            localStorage.removeItem("temp_metricsVal_0x11320214")
                        }, 2300);
                    }, 2500);

                } else {
                    console.log("[Server Message] This Redeem isn't available at this time.")
                }

            }).catch(function (error) {
                console.log("CATCHED AN ERROR.", error)
            });
        }
    },
    mounted() {

        this.checkForFreePremiumAccessRedeem()

    }
});
</script>
  
<style scoped></style>
  