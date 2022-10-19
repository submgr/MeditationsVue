<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Главная</h1>
            <div style="padding-top: 1.1rem;">
                <div @click="onClickButton" >
                    <div class="card-alfa custom-swiper suggestion-block bg-1 card-meditate">
                        <div>
                            <ion-icon :icon="playOutline" style="margin-left: 0.7rem; margin-top: 1.8rem; color: white; font-size: 3rem;" @click="toggleStory"></ion-icon>
                            <div class="text-a1 suggestion-text text-meditate">Медитация</div>
                        </div>
                    </div>
                </div>
                <div class="card-alfa custom-swiper suggestion-block bg-2">
                    <div>
                        <div class="text-a1 suggestion-text">Пора улыбнуться, давайте поднимем вам настроение?</div>
                    </div>
                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<style scoped>
.standart_padding {
    margin: 0px 15px 30px 15px;
}

.card {
    border-radius: 20px;
    background-color: blue;
    box-shadow: 0 4px 24px 0 rgb(0 0 0 / 10%);
}

.card-meditate {
    height: 33.5vh !important;
}

.suggestion-block {
    margin-top: 0 !important;
    margin-bottom: 5%;
    height: 34vh;
    background-color: rgba(255, 255, 255, 0.104) !important;
}

.bg-1 {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(1, 116, 9, 0.714)), url('https://images.unsplash.com/photo-1586078074298-05dca4848695?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80') !important;
    background-position: 100%;
    background-size: cover !important;
}

.text-meditate {
    background-image: linear-gradient(45deg, #ffffff 0%, #e5f1e1 50%, #82d187 100%) !important;
}

.bg-2 {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(118, 0, 196, 0.714)), url('https://images.unsplash.com/photo-1554224311-beee415c201f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80') !important;
    background-position: 100%;
    background-size: cover !important;
}

.bg-3 {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgb(11, 11, 11)), url('https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80') !important;
}

.suggestion-block .text-a1 {
    margin-left: 4%;
    margin-right: 4%;
    text-align: left;
    position: absolute;
    white-space: normal;
    word-wrap: break-word !important;
    background-image: linear-gradient(45deg, #989891 0%, #ffffff 50%, #d182cb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    bottom: 9%;
    left: 0% !important;
    font-size: 29px;
    font-weight: 500;
}

ion-page {
    --background: #111111;
}

.card-alfa {
    position: relative;
    border-radius: 25px;
    width: auto;
    background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
    margin-top: 7%;
    margin-left: 4%;
    margin-right: 4%;
}

.small-card {
    height: 12vh;
}

.small-card-left {
    margin-right: 1%;
    background-color: rgba(255, 255, 255, 0.104) !important;
    background-image: none;
}

.small-card-right {
    background-color: rgba(255, 255, 255, 0.104) !important;
    background-image: none;
}

.text-a1 {
    text-align: left;
    position: absolute;
    white-space: normal;
    word-wrap: break-word !important;
    background-image: linear-gradient(45deg, #797973 0%, #020202 50%, #fbfcdb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    bottom: 10%;

    right: 5%;
    font-size: 35px;
    font-weight: 500;
}
</style>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import {
    IonPage,
    IonContent,
} from '@ionic/vue';

import {
    closeOutline,
    playOutline
} from 'ionicons/icons';

import globaldata from '../modules/global';

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage
    },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }
    },
    methods: {
        toggleStory() {
            this.showStory = !this.showStory
        },
        onClickButton() {
            this.$http.get(globaldata.api.hostname + "access/meditations/demo_data", {
                params: {
                    method: "email"
                }
            }).then((response) => {
                localStorage.setItem("temp/alfa_meditationdata", JSON.stringify(response.data))
                this.$router.push({
                    name: "meditation/play",
                });
            }).catch(function (error) {
                console.log("CATCHED AN ERROR.", error)
            });
        },
    },
    data: () => ({
        showStory: false,
        items: [
            "https://images.unsplash.com/photo-1531804159968-24716780d214?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
            "https://images.unsplash.com/photo-1529974019031-b0cd38fd54fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            {
                url: "https://test.deqstudio.com/Vertical 4K Nature Film with Music - The Beauty of Big Island's Nature, Hawaii.mp4",
                type: "video",
            },
        ]
    }),
    watch: {
        showStory: function (val) {
            if (this.showStory) {
                const tabsEl = document.querySelector('ion-tab-bar');
                if (tabsEl) {
                    tabsEl.hidden = true;
                    tabsEl.style.height = "1";
                }
            } else {
                const tabsEl = document.querySelector('ion-tab-bar');
                if (tabsEl) {
                    tabsEl.hidden = false;
                    tabsEl.style.height = "1";
                }
            }

        }
    },
    setup() {
        return {
            closeOutline,
            playOutline
        }
    }
});
</script>
