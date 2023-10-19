<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <NavbarController activatedfrom="Relaxation/SessionScreen" @backfunction="getBack()" />
            <div v-if="stage == 'getting_ready'">
                <div style="padding: 0rem; margin-top: 15%; ">
                    <div style="margin-left: -15%;">
                        <Vue3Lottie :animationData="require('./../../assets/lottie/26792-progress-loader.json')"
                            style=" width: 120% !important;" />
                    </div>

                    <p class="linear-wipe"
                        style="text-align: center; margin: 0; margin-top: 2rem; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">
                        Приготовьтесь</p>
                </div>
            </div>

            <Transition :duration="{ enter: 500, leave: 800 }">
                <div v-if="stage == 'awaiting'">
                    <div style="padding: 0rem; margin-top: 11%; ">
                        <div style="margin-left: -20%;">
                            <Vue3Lottie :animationData="require('./../../assets/lottie/26792-progress-loader.json')"
                                style=" width: 120% !important;" />
                        </div>

                        <p class="linear-wipe"
                            style="text-align: center; margin: 0; margin-top: 2rem; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">
                            Отдохните</p>
                    </div>
                </div>
            </Transition>
            <Transition :duration="{ enter: 500, leave: 800 }">
                <div v-if="stage == 'breath_staged'">
                    <div style="padding: 2rem; margin-top: 31%">
                        <Vue3Lottie :animationData="require('./../../assets/lottie/142805-huff-cough-breathing.json')" />
                        <p class="linear-wipe"
                            style="text-align: center; margin: 0; margin-top: 2rem; transform-origin: left center; align-items: flex-end; min-width: 100%; font-size: 24px; font-weight: 700;">
                            {{ advanced_stage_info }}</p>
                    </div>
                </div>
            </Transition>
        </ion-content>
    </ion-page>
</template>

<style scoped>
@media (prefers-color-scheme: light) {
    ion-content {
        --background: #F7930D url('../../assets/abstract/chris-nguyen-lbmrrNgq2lo-unsplash.jpg') no-repeat center center / cover !important;
    }
}

@media (prefers-color-scheme: dark) {
    ion-content {
        color: #ffffff !important;
        --background: #000000 url('../../assets/abstract/manuel-will-gd3t5Dtbwkw-unsplash.jpg') no-repeat center center / cover !important;
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

import { Vue3Lottie } from 'vue3-lottie'

import NavbarController from '@/components/NavbarController.vue';

export default defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, Vue3Lottie, NavbarController },
    data() {
        return {
            stage: "getting_ready",
            timer_ready: 9,
            stage_timer: 0,
            stage_completed: false,
            advanced_stage_info: "",

            breathConfData: {
                inhale_time: 0,
                exhale_time: 0,
                breathPause_time: 0
            }
        }
    },
    watch: {
        '$route'() {

            const tabsEl = document.querySelector('ion-tab-bar');
            if (tabsEl) {
                tabsEl.hidden = false;
                tabsEl.style.height = "1";
            }
        }
    },
    mounted() {
        // eslint-disable-next-line
        var parent_this = this;

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        var timer_ready_fun = setInterval(function () {
            parent_this.timer_ready -= 1
            if (parent_this.timer_ready == 0) {
                // getting_ready is ready, switching to the next stage
                parent_this.runStage("breath_staged")
                clearInterval(timer_ready_fun);
            }

        }, 1000);
    },
    methods: {
        getBack() {
            this.$router.push({
                path: "/tabs/relaxation/info",
                replace: true
            });
        },
        isTimeAvailableForStage() {
            if (this.stage_timer > 0) {
                return true
            } else {
                return false
            }
        },
        inhale() {
            if (this.isTimeAvailableForStage) {
                this.advanced_stage_info = "Вдох"
                var inhale_timeout = setTimeout(() => {
                    clearTimeout(inhale_timeout)
                    this.exhale()

                }, this.breathConfData.inhale_time);
            }

        },

        exhale() {
            if (this.isTimeAvailableForStage) {
                this.advanced_stage_info = "Резко выдохните за 3 раза"
                var exhale_timeout = setTimeout(() => {
                    clearTimeout(exhale_timeout)
                    this.breathPause()

                }, this.breathConfData.exhale_time);
            }

        },

        breathPause() {
            // eslint-disable-next-line
            var parent_this = this;

            if (this.isTimeAvailableForStage) {

                var curr_timer;

                if (parent_this.stage_completed == false) {
                    this.advanced_stage_info = "У вас хорошо получается, так держать!"
                    curr_timer = this.breathConfData.breathPause_time
                } else {
                    this.advanced_stage_info = "Вы чувствуете спокойствие"
                    curr_timer = 2333
                }
                var breathPause_timeout = setTimeout(() => {
                    clearTimeout(breathPause_timeout)
                    if (parent_this.stage_completed == false) {
                        this.inhale()
                    } else {
                        parent_this.stage = "finished"

                        this.$router.push({
                            path: '/tabs/relaxation/finished', replace: true, query: {
                            }
                        });

                        parent_this.advanced_stage_info = ""
                    }


                }, curr_timer);
            }
        },

        runStage(id) {
            // eslint-disable-next-line
            var parent_this = this;
            switch (id) {
                case "breath_staged":

                    parent_this.stage = "breath_staged"

                    var times = 6

                    parent_this.breathConfData = { inhale_time: 4900, exhale_time: 6600, breathPause_time: 2140 }
                    parent_this.stage_timer = ~~(((parent_this.breathConfData.breathPause_time * (times - 1)) + (times * (parent_this.breathConfData.inhale_time + parent_this.breathConfData.exhale_time))) / 1000)
                    console.log("parent_this.stage_timer :: " + parent_this.stage_timer)
                    parent_this.inhale()

                    var stage_timer_fun = setInterval(function () {
                        parent_this.stage_timer -= 1
                        if (parent_this.stage_timer < 1.) {
                            // getting_ready is ready, switching to the next stage
                            parent_this.stage_completed = true

                            clearInterval(stage_timer_fun);
                        }

                    }, 1000);
                    break;

                default:
                    break;
            }
        }
    }
});
</script>
  