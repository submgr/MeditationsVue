<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <WellbeingQuestionnaire ref="wellbeingQuestionnaireRef"
                @completion-event="WellbeingQuestionnaireCompleted" />



            <div
                style="padding-top: 10vh; height: auto; width: 70%; max-width: 320px; margin-left: auto; margin-right: auto; display: block;">
                <img v-if="natureEllipse" :src="natureEllipse">
            </div>

            <p
                style="text-align: center;padding: 0px 18px 0px; margin-top: 7vh; margin-bottom: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 21px; font-weight: 400;">
                {{ natureText }}</p>
            <p
                style="text-align: center;padding: 0px 22px 0px; margin: 0; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">
                {{ user_firstname }}!</p>

            <div id="outer" style="margin-top: 4vh; display: flex; justify-content: center;">
                <ion-spinner name="crescent"></ion-spinner>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
ion-spinner {
    width: 60px !important;
    height: 60px !important;
}



* {
    font-family: Montserrat !important;
}

@media (prefers-color-scheme: light) {
    ion-content {
        --background: #fff url('../assets/abstract/relaxing-pinkbackground.jpg') no-repeat center center / cover;
    }
}

@media (prefers-color-scheme: dark) {
    ion-content {
        --background: #000 url('../assets/abstract/black-and-noise-background.png') no-repeat center center / cover;
    }
}
</style>

<script lang="ts">
import {
    defineComponent,
    inject
} from 'vue';
import {
    IonPage,
    IonContent,
    IonSpinner,

} from '@ionic/vue';

import { App } from '@capacitor/app';

declare const YaGames;
declare const vkBridge;
declare const yaContextCb;

import WellbeingQuestionnaire from '@/components/questionnaire/WellbeingQuestionnaire.vue';

import { Device } from '@capacitor/device';

import { startFreeRASP } from 'capacitor-freerasp';

import * as adsEngine from "../modules/ads_engine"

import globaldata from '../modules/global';
import {
    loadScript
} from "vue-plugin-load-script";

export default defineComponent({
    name: 'Tab2Page',
    components: {
        IonContent,
        IonPage,
        IonSpinner,
        WellbeingQuestionnaire,
    },
    data() {
        return {
            user_firstname: "Человек",
            natureText: "",
            natureEllipse: null,
        }
    },
    methods: {
        WellbeingQuestionnaireCompleted() {
            adsEngine.showBanner();
            this.$router.replace('/tabs/home')
        },
        async loaderGatherData() {
            function get_random(list) {
                return list[Math.floor((Math.random() * list.length))];
            }

            const d = new Date();

            const dayMinutes = d.getHours() * 60 + d.getMinutes();

            var natureEllipse_Image;

            //alert("hello")

            async function imageLookup(dayPeriod = "morning") {
                let image;
                var image_local;
                if (!["morning", "afternoon", "evening", "night"].includes(dayPeriod)) {
                    image = new URL(`../assets/graphics/page-dead.png`, import.meta.url).href
                } else {
                    const dayPeriod_list = {
                        morning: ["morning-ellipse.png", "morning-mountains-ellipse.png", "morning-highview-ellipse.png", "morning-work-onbeach-ellipse.png", "swimming-morning-ellipse.png", "morning-forest-ellipse.png", "morning-bedsheet-ellipse.png", "morning-vibes-ellipse.png"],
                        afternoon: ["afternoon-sky-ellipse.png", "day-city-ellipse.png", "man-onrocks-waterfall-ellipse.png", "forest-afternoon-ellipse.png", "creative-office-afternoon-ellipse.png", "afternoon-citybridge-ellipse.png", "afternoon-beach-ellipse.png", "daytime-beach-ellipse.png"],
                        evening: ["evening-desert-mountains-ellipse.png", "evening-construction-ellipse.png", "evening-nature.png", "evening-newyork-ellipse.png", "evening-subway-ellipse.png", "evening-hotel-veranda-ellipse.png"],
                        night: ["night-sky-1-ellipse.png", "night-view-ellipse.png", "night-houselife-ellipse.png", "mountains-at-night-ellipse.png", "night-city-ellipse.png", "man-understone-atnight-ellipse.png", "aurora-night-ellipse.png", "night-greennature-ellipse.png", "night-hotelroom-ellipse.png"]
                    }
                    const imageName = dayPeriod_list[dayPeriod][Math.floor(Math.random() * dayPeriod_list[dayPeriod].length)]
                    image = new URL(`../assets/graphics/${imageName}`, import.meta.url).href;
                }
                return await image;
            }

            var natureEllipse_Text = "?ERR-0"

            switch (true) {
                case (300 <= dayMinutes && dayMinutes < 660):
                    natureEllipse_Image = await imageLookup("morning");

                    natureEllipse_Text = get_random(["Доброе утро,", "Салют новому дню,", "Волшебного тебе утра,", "Продуктивного тебе утра,", "Счастливого дня,", "С новым днем,", "Подъем,", "Удачных удач,"])
                    break;
                case (660 <= dayMinutes && dayMinutes < 1080):
                    natureEllipse_Image = await imageLookup("afternoon");
                    natureEllipse_Text = get_random(["Это прекрасный день,", "У тебя все получится,", "Какой хороший день,", "Сегодня в моде улыбаться,"])
                    break;
                case (1080 <= dayMinutes && dayMinutes < 1260):
                    natureEllipse_Image = await imageLookup("evening");
                    natureEllipse_Text = get_random(["Хорошего вечера,", "Время отдохнуть,", "День только начинается,", "Хороших снов,", "Добрых снов,", "Споки-ноки,", "Завтра ты проснешься легко,", "Уютного сна,"])
                    break;
                case ((0 <= dayMinutes && dayMinutes < 300) || (1260 <= dayMinutes && dayMinutes < 9999)):
                    natureEllipse_Image = await imageLookup("night");
                    natureEllipse_Text = get_random(["Приятных снов,", "Спокойной ночи,"])
                    break;
            }
            this.natureText = natureEllipse_Text;
            this.natureEllipse = natureEllipse_Image;
        }
    },
    async mounted() {
        // eslint-disable-next-line
        const parent_this = this;

        this.loaderGatherData();

        // Here we check platforms and decide if non-progessive audio player is needed
        // I hope in future I will delete this part, but who knows - maybe we will need it
        if (localStorage) {
            localStorage.removeItem("useNonProgressiveAudioPlayer");
            if (this.$route.query.isYandexGames && this.$route.query.isYandexGames == "true") {
                console.log("isYandexGames -> true.");
                setTimeout(() => {
                    // WE DO NOT USE NON-PROGRESSIVE AUDIO PLAYER ANYMORE.
                    //localStorage.setItem("useNonProgressiveAudioPlayer", "true");
                }, 100);
            } else if (this.$route.query.isVKMiniApps && this.$route.query.isVKMiniApps == "true") {
                console.log("isVKMiniApps -> true.");
                //setTimeout(() => {
                //    localStorage.setItem("useNonProgressiveAudioPlayer", "true");
                //}, 100);
                //currently turned off because they dont require this on vk mini apps platform!
            }
        }

        if (this.$route.query.isYandexGames && this.$route.query.isYandexGames == "true") {
            console.log("isYandexGames -> true.");
            loadScript("https://yandex.ru/games/sdk/v2")
                .then(() => {
                    console.log("loadScript>then:: Success->then;")
                    // eslint-disable-next-line
                    YaGames
                        .init()
                        .then(ysdk => {
                            console.log('Yandex SDK initialized');
                            (window as any).ysdk = ysdk;
                            ysdk.adv.showFullscreenAdv({
                                callbacks: {
                                    onClose: function (wasShown) {
                                        // some action after close
                                        console.log("ysdk.adv.showFullscreenAdv -> onClose", wasShown)
                                    },
                                    onError: function (error) {
                                        // some action on error
                                        console.log("ysdk.adv.showFullscreenAdv -> onError", error)
                                    }
                                }
                            })
                        });
                })
                .catch(() => {
                    console.log("loadScript>then:: Failed to fetch script;")
                });
        }

        if (this.$route.query.isVKMiniApps && this.$route.query.isVKMiniApps == "true") {
            console.log("isVKMiniApps -> true.");

            // Store the value in localStorage
            localStorage.setItem('isVKMiniApps', 'true');

            loadScript("https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js")
                .then(() => {
                    console.log("loadScript>then:: Success->then;")
                    // eslint-disable-next-line
                    vkBridge
                        .send('VKWebAppInit')
                        .then(() => {
                            (window as any).vkBridge = vkBridge;
                        })
                })
                .catch(() => {
                    console.log("loadScript>then:: Failed to fetch script;")
                });
        }

        // eslint-disable-next-line
        window.yaContextCb=window.yaContextCb||[];
        
        if(this.$route.query.isVKMiniApps != "true" && this.$route.query.isYandexGames != "true"){
            loadScript("https://yandex.ru/ads/system/context.js")
                .then(() => {
                    console.log("loadScript>then:: Success->then;")
                    
                })
                .catch(() => {
                    console.log("loadScript>then:: Failed to fetch script;")
                });
        }

        if (localStorage.getItem("auth_token")) {
            setTimeout(function (this) {
                if (localStorage.getItem("stats_emotionalstate_atleast_once")) {
                    console.log("Called adsEngline to show banner...")
                    //we show banner here or after redirect to home from Quiz Prompt
                    adsEngine.showBanner();
                    parent_this.$router.replace('/tabs/home')
                    const tabsEl = document.querySelector('ion-tab-bar');
                    if (tabsEl) {
                        tabsEl.hidden = false;
                        tabsEl.style.height = "1";
                    }
                } else {
                    //CURRENTLY WE JUST SKIP IT!
                    //parent_this.$router.replace('/tabs/diagnostics/emotionalstate')

                    // Define the type for the child component reference
                    const childComponent = parent_this.$refs.wellbeingQuestionnaireRef as any;

                    // Now TypeScript knows the type and you can access 'open' method
                    childComponent.open();

                }

            }, 5000);

            if (localStorage.getItem("user_firstname") != null) {
                parent_this.user_firstname = localStorage.getItem("user_firstname") + "";
            }

        } else {
            if (this.$route.query.isYandexGames && this.$route.query.isYandexGames == "true") {
                console.log("isYandexGames -> true.");
                this.$router.push({
                    path: '/tabs/auth/anonymous',
                    replace: true
                });
            } else if (this.$route.query.isVKMiniApps && this.$route.query.isVKMiniApps == "true") {
                console.log("isVKMiniApps -> true.");
                this.$router.push({
                    path: '/tabs/auth/anonymous',
                    replace: true
                });
            } else {
                parent_this.$router.replace('/tabs/onboarding');
            }
        }

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }



        // IMPORTANT!! HERE WE CHECK INTEGRITY OF OUR APP
        // IN CASE IF THERE IS A MAJOR SIGN OF FRAUD, 
        // WE WILL CRASH OUR APP OR SMTH LIKE THAT.

        // CURRENTLY WE CHECK ONLY FOR DOMAIN NAME.

        // oWoWoW! DON'T FORGET ADD iOS VERIFICATION LATER
        // WHEN YOU WILL PUBLISH IT ON APP STORE, OKAY?

        const deviceInfo = await Device.getInfo();

        // Here we go: conspiracy!
        // This variable shows if fraud detected,
        // as long as SUPER_HORNY equals to "fabric",
        // everything is fine... 
        // if fraud is detected - we change it a bit,
        // for example, strip last character:)
        var SUPER_HORNY = "fabric";

        switch (deviceInfo.platform) {
            case "ios":
                // oWoWoW! DON'T FORGET ADD iOS VERIFICATION LATER
                // WHEN YOU WILL PUBLISH IT ON APP STORE, OKAY?
                break;
            case 'android':
                // ANDROID OFFICIAL BUNDLE ID
                // Here we split in into multiple variables
                // to make it harder to reverse-engineer :)
                const android_zone = "com";
                const android_author = "aramvirabyan";
                const android_package = "yourmeditation";

                const android_mono = `${android_zone}.${android_author}.${android_package}`;

                const appInstanceInfo = await App.getInfo();
                if (appInstanceInfo.id == android_mono) {
                    // Things are fine! Everything is okay here.
                } else {
                    // Oopsie! Fraud.
                    SUPER_HORNY = SUPER_HORNY.substring(0, SUPER_HORNY.length - 1)
                }
                break;
            case 'web':
                const currentDomain = window.location.hostname;
                const allowedVariations = ["вашамедитация.рф", "xn--80aaafmfwb5a7d2bq4h.xn--p1ai", "deqstudio.com", "urmeditation.com"];
                const domainIsAllowed = allowedVariations.some(variation => currentDomain.includes(variation));

                if (domainIsAllowed) {
                    // Things are fine! Everything is okay here.
                } else {
                    // Oopsie! Fraud.
                    if (process.env.NODE_ENV === 'development') {
                        // okay, if it's a development instance, we DONT care
                        // and do nothing here.
                    } else {
                        SUPER_HORNY = SUPER_HORNY.substring(0, SUPER_HORNY.length - 1)
                    }

                }

                break;
            default:
                break;
        }


        // NOW, INTEGRITY CHECK WITH freeRASP!

        const config = {
            androidConfig: {
                packageName: 'com.aramvirabyan.yourmeditation',
                certificateHashes: ['hIoOrVrvaI4VFrIfq8zNClW/QMzbEpUV3Kwp49LxuN4=', '13EqMfYIxmIAiStXIKmm9ue8jvnfcFg+iig0Tf/zI7Q='],
                supportedAlternativeStores: ['com.sec.android.app.samsungapps', 'ru.vk.store'],
            },
            iosConfig: {
                appBundleId: 'com.aramvirabyan.yourmeditation',
                appTeamId: 'yourTeamID',
            },
            watcherMail: 'support@deqstudio.com',
            isProd: import.meta.env.VITE_FREERASP_ENABLED === 'true' ? true : false,
        };
        // reactions for detected threats
        const actions = {
            // Android & iOS
            privilegedAccess: () => {
                
            },
            // Android & iOS
            debug: () => {
                alert("debug")
                App.exitApp();
            },
            // Android & iOS
            simulator: () => {
                //
            },
            // Android & iOS
            appIntegrity: () => {
                alert("appIntegrity")
                App.exitApp();
            },
            // Android & iOS
            unofficialStore: () => {
                //
            },
            // Android & iOS
            hooks: () => {
                alert("hooks")
                App.exitApp();
            },
            // Android & iOS
            deviceBinding: () => {
                //
            },
            // Android & iOS
            secureHardwareNotAvailable: () => {
                //
            },
            // Android & iOS
            systemVPN: () => {
                //
            },
            // Android & iOS
            passcode: () => {
                //
            },
            // iOS only
            deviceID: () => {
                //
            },
            // Android only
            obfuscationIssues: () => {
                //
                // alert("obfuscationIssues")
                // App.exitApp();
            },
            // Android only
            devMode: () => {
                //
            },
        };

        if (SUPER_HORNY == "fabric") {
            // Everything is just fine, have a good day!
        } else {
            // Our user is such a bad boy..
            setTimeout(() => {
                document.location.replace("about:blank#blocked")
            }, 123);
            document.getElementsByTagName('html')[0].innerHTML = `
                <p>you are such a.. bad boy. stop it!</p>
            `;
        }

        const started = await startFreeRASP(config, actions);

    },
    setup() {

        return {

            pageStyle: {
                "--ion-background-color": "#F9F9F9",
                "--ion-font-family": "Roboto"
            },
            footer: "hide"
        }
        //
    },
});
</script>
