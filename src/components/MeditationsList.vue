<template>
    <div>
        <div class="preloader" v-if="premadeMeditations.length == 0 && !meditationsListReceivedResponseWithData">
            <h1 style="margin-bottom: 7vh;">
                <ion-spinner name="lines-sharp"></ion-spinner>
            </h1>
        </div>
        <Transition>
        <div class="wrapper scroll" v-if="premadeMeditations.length > 0 && meditationsListReceivedResponseWithData" ref="cardWrapper" @scroll="handleScroll" style="margin-top: 7vh;">
            
                <swiper ref="{swiperRef}" :centeredSlides="false" :slidesPerView="slidesPerView"
                    :spaceBetween="spaceBetween" :loop="true" :modules="modules" class="mySwiper"
                    :slidesOffsetBefore="slidesOffsetBefore" style="margin-bottom: 10vh; margin-left: 0vw;">
                    <swiper-slide v-for="(item, index) in premadeMeditations" v-bind:key="item.id">
                        <div class="new_card"
                            :style="`background: url('${item.imgposterurl}') no-repeat center center / cover;`">
                            <span style="display: none">Meditation local ID is {{ index }}</span>
                            <div class="new_content">
                                <h1 class="new_title">{{ item.title }}</h1>
                                <div class="tags">
                                    <span v-for="(tag) in item.tags" v-bind:key="tag.code" class="tag">{{
                                        tag.friendlycode
                                    }}</span>
                                </div>
                                <p class="new_description">{{ item.description }} <br /><ion-button
                                        @click="requestMeditation(item.searchobject)" style="margin-top: 3vh;">Начать
                                        медитацию</ion-button></p>

                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            
        </div>
    </Transition>

    </div>

</template>


<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';


import '../assets/css/swiper_blocks_meditations.css';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';

import {
    defineComponent
} from 'vue';

import globaldata from '../modules/global';
import {
    forEach
} from 'xregexp';

import {
    IonSpinner,
    IonButton
} from '@ionic/vue';

import { get as getMeditation } from '../modules/getMeditation';

export default defineComponent({
    name: 'ExploreContainer',
    components: {
        IonSpinner,
        IonButton,
        Swiper,
        SwiperSlide,
    },
    computed: {
        slidesPerView() {
            return 2; // 80% of viewport width
        },
        spaceBetween() {
            return this.windowWidth * 70 / 100; // -15% of viewport width
        },
        // slidesOffsetBefore() {
        //     return this.windowWidth * 10 / 100; // -3% of viewport width
        // }
    },
    props: {
        name: String
    },
    data() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            premadeMeditations: [],
            centeredCard: 0, // Initialize with the first card centered,
            meditationsListReceivedResponseWithData: false
        }
    },
    created() {
        this.slidesOffsetBefore();
    },
    unmounted() {
        window.removeEventListener('resize', this.onResize);
    },
    setup() {
        return {
            modules: [Pagination, Navigation],
        }
        //setup
    },
    methods: {
        //smoothScroll(){
        //   this.$smoothScroll({
        //   scrollTo: myEl, // scrollTo is also allowed to be number
        //   hash: '#sampleHash' // required if updateHistory is true
        //   })
        //},
        slidesOffsetBefore() {
            return this.windowWidth * 10 / 100; // -3% of viewport width
        },
        onResize() {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        },
        requestMeditation(searchobj) {
            getMeditation(searchobj, this, false)
        },
        isCardCentered(index) {
            const cardWrapper = this.$refs.cardWrapper as HTMLElement;
            if (cardWrapper) {
                const card = cardWrapper.querySelector(`#card-${index}`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth' });
                }
            }
            return false;
        },
        scrollToCard(index: number) {
            const cardWrapper = this.$refs.cardWrapper as HTMLElement;
            if (cardWrapper) {
                const card = cardWrapper.querySelector(`#card-${index}`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
        handleScroll() {
            const cardWrapper = this.$refs.cardWrapper as HTMLElement;
            if (cardWrapper) {
                const containerRect = cardWrapper.getBoundingClientRect();
                const cardWidth = 280; // Adjust this to match your card width
                const scrollLeft = cardWrapper.scrollLeft;
                const center = containerRect.width / 2;
                const cardIndex = Math.floor((scrollLeft + center) / cardWidth);
                this.centeredCard = cardIndex;

                // Scroll to the nearest card
                // this.scrollToCard(cardIndex);

            }
        },
    },
    mounted() {


        // eslint-disable-next-line
        const parent_this = this;

        this.$http.get(globaldata.api.hostname + "access/meditations/featured", {
            params: {
                method: "email"
            }
        }).then((response) => {
            console.log(response)
            if (response.data.status == "okay") {
                console.log("[Server Message] Received featured meditations... length: " + response.data.content.length)

                var meditations = response.data.content;
                meditations.forEach(element => {
                    parent_this.premadeMeditations.push(element)
                    element = element['servicetype'] = "static"
                });

                parent_this.meditationsListReceivedResponseWithData = true;

                console.info(parent_this.premadeMeditations)
                
                parent_this.slidesOffsetBefore();

            } else {
                console.log("[Server Message] This service isn't available at this time.")
            }

        }).catch(function (error) {
            console.log("CATCHED AN ERROR.", error)
        });
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#container {
    background-color: rgb(rgba(255, 0, 0, 0), rgba(0, 128, 0, 0), rgba(0, 0, 255, 0));
}

.preloader {
    margin-top: 9vh;
    text-align: center;
}

.scroll-to {
    background-color: yellow;
    /* Modify this to your desired effect */
    transition: background-color 0.3s;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, sans-serif;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f5f5f5;
}



.tags {
    display: flex;
    gap: .375em;
    margin-bottom: .875em;
    font-size: .85em;
}

.tags span {
    padding: .35rem .65rem;
    color: #fff;
    border: 1.5px solid rgba(255 255 255 / 0.4);
    border-radius: 15px;
    border-radius: 50px;
}

.details .desc {
    color: #fff;
    opacity: .8;
    line-height: 1.5;
    margin-bottom: 1em;
}

.details .cast h3 {
    margin-bottom: .5em;
}

.details .cast ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    width: 100%;
}

.details .cast ul li {
    list-style: none;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;
    border: 1.5px solid #fff;
}

.details .cast ul li img {
    width: 100%;
    height: 100%;
}


.new_card {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    margin: 0 auto;
    background-size: cover;
    position: relative;
    height: 65vh;
    min-width: 80vw;
}

.new_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0px 0px 20px 20px;

    background: rgba(0, 0, 0, 0.605);
    /* This creates the blur effect */
    backdrop-filter: blur(10px);
}

.new_title,
.new_description {
    margin: 0;
    text-align: left;
    padding: 20px;
    padding-top: 0;
    padding-bottom: 0;
    color: #fff;
    opacity: .8;
    line-height: 1.5;
}

.new_title {
    margin-top: 2vh;
    color: #fff;
    line-height: 1.1;
    opacity: 1;
    font-weight: 700;
    font-size: 1.5em;
}

.new_description {
    margin-top: 0vh;
    padding-top: 0;
    padding-bottom: 20px;
    font-size: 0.8em;
}

.tags {
    margin-top: 1vh;
    padding-left: 20px;
    font-size: 0.63em;
}
</style>
