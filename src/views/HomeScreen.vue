<template>
    <ion-page>
        <ion-content :fullscreen="true" :forceOverscroll="false">

            <LoadingActivity :show="loading" />

            <SystemAnnoncementProvider origin="home" />
            <AdvancedLoader v-if="1 > 2" />
            <h1 style="margin-left: 1.1rem; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">Главная</h1>
            <div style="margin-top: 4vh;"></div>
            <Transition>
                <div style="display: block;" v-if="suggestSmile">
                    <NotificationsBanner notificationType="suggestToSmileToday" />
                </div>
            </Transition>

            <div style="padding-top: 0.0rem;">

                <div @click="loadMeditation()">

                    <div class="card-alfa custom-swiper suggestion-block bg-1 card-meditate ion-activatable">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div>
                            <ion-icon :icon="playOutline"
                                style="margin-left: 0.7rem; margin-top: 1.8rem; color: white; font-size: 3rem;"
                                @click="toggleStory"></ion-icon>
                            <div class="text-a1 suggestion-text text-meditate">Медитация</div>
                        </div>
                    </div>
                </div>
                <!---<div class="card-alfa custom-swiper suggestion-block bg-2">
                    <div>
                        <div class="text-a1 suggestion-text">Пора улыбнуться, давайте поднимем вам настроение?</div>
                    </div>
                </div>--->
            </div>

            <TasksController />

            <MoodCheck />

            <MeditationsList @event-getmeditation="getMeditation" style="margin-top: -2.5vh;" />

            <div class="padding_from_bottom_line"></div>

        </ion-content>
    </ion-page>
</template>

<style scoped>
@import '../assets/css/adaptative_ui.css';

.standart_padding {
    margin: 0px 15px 30px 15px;
}

.card {
    border-radius: 20px;
    background-color: blue;
    box-shadow: 0 4px 24px 0 rgb(0 0 0 / 10%);
}

.card-meditate {
    height: 23.5vh !important;
}

.suggestion-block {
    margin-top: 0 !important;
    margin-bottom: 5%;
    height: 34vh;
    background-color: rgba(255, 255, 255, 0.104) !important;
}

.bg-1 {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(1, 116, 9, 0.714)), url('../assets/photo/ezgifprocessed_palms.webp') !important;
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
    margin-left: 4vw;
    margin-right: 4vw;
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

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import {
    IonPage,
    IonContent,
    IonRippleEffect,
    IonIcon
} from '@ionic/vue';

import {
    closeOutline,
    contractOutline,
    playOutline
} from 'ionicons/icons';

import globaldata from '../modules/global';
import { get as getMeditation } from '../modules/getMeditation';

import MeditationsList from '@/components/MeditationsList.vue';
import NotificationsBanner from '@/components/NotificationsBanner.vue';
import SystemAnnoncementProvider from '@/components/system/AnnoncementProvider.vue';
import MoodCheck from "@/components/questionnaire/MoodCheck.vue"

import AdvancedLoader from '@/components/AdvancedLoader.vue';
import LoadingActivity from '@/components/system/LoadingActivity.vue';

import TasksController from '@/components/gamification/TasksController.vue';




export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        MeditationsList,
        NotificationsBanner,
        AdvancedLoader,
        SystemAnnoncementProvider,
        IonRippleEffect,
        MoodCheck,
        IonIcon,
        LoadingActivity,
        TasksController
    },
    mounted() {

        console.log(this.$achievements)

        console.log(this.$i18next)

        let isVKMiniApps = false;

        try {
            // Try to get the value from localStorage
            isVKMiniApps = localStorage.getItem('isVKMiniApps') === 'true';
        } catch (e) {
            // If an error occurs (e.g., localStorage is not available), keep isVKMiniApps as false
            console.log('Failed to access localStorage. Defaulting isVKMiniApps to false.');
        }

        if (!isVKMiniApps) {
            this.suggestSmile = true;
        }

    },
    methods: {
        toggleStory() {
            this.showStory = !this.showStory
        },
        loadMeditation() {

            // eslint-disable-next-line
            var parent_this = this;
            // Function to check the number of listened meditations in local storage
            // Retrieve the current value of listened meditations from local storage
            var currentListenedMeditations = parseInt(localStorage.getItem('listenedMeditations'));
            if (Number.isNaN(currentListenedMeditations)) {
                currentListenedMeditations = 0;
            }

            // Use a switch statement to handle different cases
            switch (currentListenedMeditations) {
                case 0:
                    console.log("No meditations listened");
                    //parent_this.getMeditation({ servicetype: 'static', searchtype: 'theme', searchtag: 'newbie1' })
                    getMeditation({ servicetype: 'static', searchtype: 'theme', searchtag: 'newbie1' }, parent_this)
                    break;
                // case 1:
                //     console.log("Listened 1 meditation");
                //     parent_this.getMeditation({ servicetype: 'static', searchtype: 'theme', searchtag: 'newbie2' })
                //     break;
                default:
                    console.log("Listened 1+ meditation (default route)");
                    //parent_this.getMeditation({ servicetype: 'dynamic', searchtype: 'random', searchtag: '' })
                    getMeditation({ servicetype: 'dynamic', searchtype: 'random', searchtag: '' }, parent_this)
                    break;
            }

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
        ],
        suggestSmile: false,
        loading: false
    }),
    watch: {
        '$route': {
            // with immediate handler gets called on first mount aswell
            immediate: true,
            // handler will be called every time the route changes.
            // reset your local component state and fetch the new data you need here.
            async handler(newRoute, oldRoute) {
                if(oldRoute.fullPath == undefined && newRoute.fullPath == "/tabs/home") {
                    const tabsEl = document.querySelector('ion-tab-bar');
                    if (tabsEl) {
                        tabsEl.hidden = false;
                        tabsEl.style.height = "0";
                    }
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
