<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <NavbarController align="right" activatedfrom="Emotions/MakeSmilePhoto"
                @backfunction="$router.push({ path: '/tabs/myself/overview', replace: false });" />

            <h1 style="margin-left: 4vw; margin-right: 4vw; margin-top: 2.4rem; font-weight: 700; font-size: 34px;">
                Профиль</h1>
            <div style="padding-top: 1.0rem;"></div>

            <div style="padding-top: 0.1rem; ">
                <div>
                    <div class="p-ripple card-alfa custom-swiper suggestion-block bg-1 card-meditate " v-ripple
                        @click="openAccountEditor()">
                        <div style="margin-left: 5vw;">
                            <ion-icon :icon="createOutline"
                                style="margin-left: 0.3rem; margin-top: 1.8rem; color: white; font-size: 3rem;"></ion-icon>
                            <div class="text-a1 suggestion-text text-meditate">
                                <p style="display:inline;">{{ firstname }}</p><img v-if="isPremiumActive"
                                    style="margin-left: 5vw; margin-top: -3.2vh; height: 10vh; display:inline;"
                                    src="../../assets/graphics/premium_glowing_pink_text_fromcanva.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <!---<div class="card-alfa custom-swiper suggestion-block bg-2">
                    <div>
                        <div class="text-a1 suggestion-text">Пора улыбнуться, давайте поднимем вам настроение?</div>
                    </div>
                </div>--->
            </div>

            <ion-list :inset="true" style="--background: red;">
                <ion-item @click="userAgreements();">
                    <ion-label>Пользовательские соглашения</ion-label>
                </ion-item>
                <ion-item @click="$router.push({ path: '/tabs/support/main', replace: false });">
                    <ion-label>Поддержка</ion-label>
                </ion-item>
                <ion-item @click="signOut()">
                    <ion-label>Выйти из учетной записи</ion-label>
                </ion-item>
            </ion-list>



            <div style="height: calc(50px + 1.5vh);"></div>


            <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="myselfProfileEdit_isModalOpen" trigger="open-modal"
                :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" handle-behavior="cycle">
                <ion-content class="ion-padding">
                    <div class="ion-margin-top">
                        <ion-label style="white-space: pre-wrap;">Вы можете изменить информацию о себе. Эти сведения
                            видите
                            только вы.</ion-label>
                        <ion-item style="margin-top: 1.9vh; border-radius: 11px;">
                            <ion-input @input="inputNameValueUpdated($event.target.value)" :autofocus="true" label="Ваше имя" 
                            label-placement="stacked" :placeholder="name" :maxlength="12"
                                v-model="name"></ion-input>
                        </ion-item>
                        <ion-button @click="saveProfileNewData()" style="margin-top: 2.8vh;"
                            expand="block">Сохранить</ion-button>
                    </div>
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="openedModal == 'privacypolicy'">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Политика конфиденциальности</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeOpenedModals()">Закрыть</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <RenderContent materialType="pages" :metatagsExist="false" codename="privacypolicy" />
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="openedModal == 'termsofuse'">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Условия использования</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeOpenedModals()">Закрыть</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <RenderContent materialType="pages" :metatagsExist="false" codename="termsofuse" />
                </ion-content>
            </ion-modal>




        </ion-content>
    </ion-page>
</template>

<style scoped>
ion-item {
    --background: var(--ion-card-background);
}

.standart_padding {
    margin: 0px 15px 30px 15px;
}

.card {
    border-radius: 20px;
    background-color: blue;
    box-shadow: 0 4px 24px 0 rgb(0 0 0 / 10%);
}

.card-meditate {
    height: 34vh !important;
}

.suggestion-block {
    margin-top: 0 !important;
    margin-bottom: 5%;
    height: 34vh;
    background-color: rgba(255, 255, 255, 0.104) !important;
}


.bg-1 {
    background-position: 100%;
    background-size: cover !important;
}

@media (prefers-color-scheme: dark) {
    .bg-1 {
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(7, 5, 36, 0.74)), url('../../assets/photo/photo1507400492013.webp') !important;
    }
}

@media (prefers-color-scheme: light) {
    .bg-1 {
        background-image: linear-gradient(-190deg, #fa8ce8 0%, #060c4a 100%) !important;
    }
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
    margin-left: 6vw;
    margin-right: 6vw;
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
    defineComponent,
    computed
} from 'vue';
import {
    IonPage,
    IonContent,
    IonModal,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    actionSheetController,
    toastController
} from '@ionic/vue';

import {
    closeOutline,
    contractOutline,
    playOutline,
    createOutline,
    rocketOutline,
    helpBuoyOutline,
    settingsOutline
} from 'ionicons/icons';

import NavbarController from '@/components/NavbarController.vue';

import globaldata from '../../modules/global';

//import NotificationsBanner from '@/components/NotificationsBanner.vue';

import RenderContent from '@/components/markdown/RenderContent.vue';

import store from "../../store";

import auth_logout from "../../store";

const getUserData = computed(() => {
    return store.getters.getUserData;
});


export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        IonModal,
        IonLabel,
        IonInput,
        IonItem,
        IonButton,
        NavbarController,
        RenderContent
    },
    mounted() {
        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }

        this.firstname = localStorage.getItem("user_firstname")
        if (localStorage.getItem("user_meditationtime") === null) {
            localStorage.setItem("user_meditationtime", "0")
            this.meditationtime = "0"
        } else {
            this.meditationtime = this.meditationtimePrepare(localStorage.getItem("user_meditationtime"))
        }

        console.log(getUserData)

        if (getUserData.value.isPremiumActive == true) {
            this.isPremiumActive = true
        } else {
            this.isPremiumActive = false
        }


    },
    methods: {
        async inputNameValueUpdated(val) {
            this.name = this.name.replace(/[^\p{L}]/gu, '');
            const word = this.name;
            if (word.length > 0) {
                const firstLetter = word.charAt(0)
                const firstLetterCap = firstLetter.toUpperCase()
                const remainingLetters = word.slice(1)
                this.name = firstLetterCap + remainingLetters
                this.firstname = this.name
            }
        },
        toggleStory() {
            this.showStory = !this.showStory
        },

        openAccountEditor() {
            this.myselfProfileEdit_isModalOpen = true
            this.name = this.firstname;
            //alert(this.name + ";" + this.firstname)
        },

        Modal_onWillDismiss() {
            //nothing yet
            this.myselfProfileEdit_isModalOpen = false
        },

        closeOpenedModals() {
            // this one function closes documents view modals.
            this.openedModal = "none"
        },

        async saveProfileNewData() {
            if (this.name.length > 1) {
                localStorage.setItem("user_firstname", this.firstname)
                this.$store.dispatch("setNewName", this.firstname)
                this.myselfProfileEdit_isModalOpen = false;
            } else {
                const toast = await toastController.create({
                    message: 'Слишком короткое имя',
                    duration: 1500,
                    position: 'top',
                    color: "danger"
                });

                await toast.present();
            }
        },

        learnMore() {
            this.$router.push({
                name: "read/youshouldknow",
            });
        },

        meditationtimePrepare(rawMinutes) {



            const hours = Math.floor(rawMinutes / 60)

            const minutes = rawMinutes - (hours * 60)

            var formatted_message = ""

            if (minutes + (hours * 60) > 10) {
                this.enoughExpForTimeReview = true
            } else {
                this.enoughExpForTimeReview = false
            }

            if (hours == 0) {
                formatted_message = minutes + " минут"
            } else {
                formatted_message = hours + " ч. " + minutes + " мин."
            }

            return formatted_message;

        },
        async signOut() {
            // eslint-disable-next-line
            var parent_this = this;
            const actionSheet = await actionSheetController.create({
                header: 'Вы уверены, что хотите выйти из текущей учетной записи?',
                buttons: [
                    {
                        text: 'Выйти',
                        role: 'confirm',
                    },
                    {
                        text: 'Отмена',
                        role: 'cancel',
                    },
                ],
            });
            actionSheet.present();

            const { role } = await actionSheet.onWillDismiss();

            if (role === 'confirm') {

                //auth_logout();
                this.$store.dispatch("accountLogout", parent_this).then(() => {
                    //done! logged out!
                });
            }
        },
        async userAgreements() {
            // eslint-disable-next-line
            var parent_this = this;

            var isVKMiniApps = false;

            var userAgreementsButtons = [
                    {
                        text: 'Политика конфиденциальности',
                        role: 'privacypolicy',
                    },
                    {
                        text: 'Условия использования',
                        role: 'termsofuse',
                    }
                ]

            try {
                // Try to get the value from localStorage
                isVKMiniApps = localStorage.getItem('isVKMiniApps') === 'true';
            } catch (e) {
                // If an error occurs (e.g., localStorage is not available), keep isVKMiniApps as false
                console.log('Failed to access localStorage. Defaulting isVKMiniApps to false.');
            }

            if (!isVKMiniApps) {
                userAgreementsButtons.push({
                        text: 'Удаление учетной записи',
                        role: 'accountdeleteprocedure',
                    })
            }
            const actionSheet = await actionSheetController.create({
                header: 'Текущие пользовательские соглашения',
                buttons: userAgreementsButtons,
            });
            actionSheet.present();

            const { role } = await actionSheet.onWillDismiss();

            if (role === 'privacypolicy') {
                //window.open("https://вашамедитация.рф/privacypolicy/", "_blank")
                this.openedModal = "privacypolicy"
            }

            if (role === 'termsofuse') {
                //window.open("https://вашамедитация.рф/termsofservice/", "_blank")
                this.openedModal = "termsofuse"
            }

            if (role === 'accountdeleteprocedure') {
                window.open("https://вашамедитация.рф/accountdeletion/", "_blank")
            }
        },


    },
    data: () => ({
        showStory: false,
        myselfProfileEdit_isModalOpen: false,
        firstname: "",
        name: "",
        meditationtime: "",
        enoughExpForTimeReview: null,
        isPremiumActive: null,
        openedModal: "none"
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
            playOutline,
            createOutline,
            rocketOutline,
            helpBuoyOutline,
            settingsOutline

        }
    }
});
</script>
