<template>
<div>
    <div class="preloader" v-if="premadeMeditations.length == 0">
        <h1>
            <ion-spinner name="lines-sharp"></ion-spinner>
        </h1>
    </div>
    <div class="wrapper scroll" v-else ref="cardWrapper" @scroll="handleScroll">
        <div class="scroll-container">
            <div class="scroll-content">
                <!-- Your scrollable content here -->
            </div>
        </div>
        <!--- [START] Dynamically Generated Content Block Comes Here -->
        <div class="card" v-for="(item, index) in premadeMeditations" v-bind:key="item.id" :id="'card-' + index" :class="{ 'centered-card': index === centeredCard }">
            <div class="poster"><img :src="item.imgposterurl" alt="Location Unknown"></div>
            <div class="details">
                <span style="display: none">Meditation local ID is {{ index }}</span>
                <h1>{{ item.title }}</h1>
                <!---<h2>2021 • PG • 1hr 38min</h2>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span>4.2/5</span>
                    </div>-->
                <div class="tags">
                    <span v-for="(tag) in item.tags" v-bind:key="tag.code" class="tag">{{ tag.friendlycode }}</span>
                </div>
                <p class="desc">
                    {{ item.description }}
                </p>
                <div class="cast">
                    <!---<h3>Автор</h3>
                        <ul>
                            <li><img src="https://i.postimg.cc/jqgkqhSb/cast-11.jpg" alt="Marco Andrews"
                                    title="Marco Andrews"></li>
                            <li><img src="https://i.postimg.cc/8P7X7r7r/cast-12.jpg" alt="Rebecca Floyd"
                                    title="Rebecca Floyd"></li>
                            <li><img src="https://i.postimg.cc/2SvHwRFk/cast-13.jpg
        " alt="Antonio Herrera" title="Antonio Herrera"></li>
                        </ul>-->
                    <ion-button @click="$emit('event-getmeditation', item.searchobject)" style="margin-top: 0.1vh;">Начать медитацию</ion-button>
                </div>
            </div>
        </div>
        <!--- [END] Dynamically Generated Content Block Comes Here -->
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import globaldata from '../modules/global';
import {
    forEach
} from 'xregexp';

import {
    IonSpinner
} from '@ionic/vue';

export default defineComponent({
    name: 'ExploreContainer',
    components: {
        IonSpinner
    },
    props: {
        name: String
    },
    data() {
        return {
            premadeMeditations: [],
            centeredCard: 0, // Initialize with the first card centered
        }
    },
    setup() {

        //setup
    },
    methods: {
        isCardCentered(index) {
      const cardWrapper = this.$refs.cardWrapper as HTMLElement;
      if (cardWrapper) {
        const card = cardWrapper.querySelector(`#card-${index}`);
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const containerRect = cardWrapper.getBoundingClientRect();
          const center = containerRect.width / 2;
          const cardCenter = cardRect.left + cardRect.width / 2;
          return Math.abs(center - cardCenter) < cardRect.width / 2;
        }
      }
      return false;
    },
    handleScroll() {
      const cardWrapper = this.$refs.cardWrapper as HTMLElement;
      if (cardWrapper) {
        const containerRect = cardWrapper.getBoundingClientRect();
        const cardWidth = 325; // Adjust this to match your card width
        const scrollLeft = cardWrapper.scrollLeft;
        const center = containerRect.width / 2;
        const cardIndex = Math.floor((scrollLeft + center) / cardWidth);
        this.centeredCard = cardIndex;
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

                console.info(parent_this.premadeMeditations)

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

#container {
    background-color: rgb(rgba(255, 0, 0, 0), rgba(0, 128, 0, 0), rgba(0, 0, 255, 0));
}

.preloader {
    margin-top: 9vh;
    text-align: center;
}

.scroll-to {
    background-color: yellow; /* Modify this to your desired effect */
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

.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-left: 5px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    --scroll-size: 5px;
    --scroll-sidemargin: 100px;
        --scroll-radius: 20px;
        --scroll-track: rgb(255 255 255 / 10%);
        --scroll-thumb: linear-gradient(45deg, #ff00f7c3, #8061ef);

     
}

::-webkit-scrollbar {
    width: 120px; /* Adjust the width of the scrollbar as needed */
  }
.scroll {
    scrollbar-color: var(--scroll-thumb-color, grey) var(--scroll-track, transparent);
    scrollbar-width: thin;
  }
  .scroll::-webkit-scrollbar {
    width: var(--scroll-size, 10px);
    height: var(--scroll-size, 10px);
  }
  .scroll::-webkit-scrollbar-track {
    background-color: var(--scroll-track, transparent);
    border-radius: var(--scroll-track-radius, var(--scroll-radius));
  }
  .scroll::-webkit-scrollbar-thumb {
    background-color: var(--scroll-thumb-color, grey);
    background-image: var(--scroll-thumb, none);
    border-radius: var(--scroll-thumb-radius, var(--scroll-radius));
  }

  
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the track */
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888; /* Color of the thumb */
    border-radius: 6px; /* Round the thumb */
  }
  
  /* Add left and right margin to the scrollbar */
  ::-webkit-scrollbar-button:start:decrement {
    margin-right: var(--scroll-sidemargin); /* Adjust the margin as needed */
  }
  
  ::-webkit-scrollbar-button:end:increment {
    margin-left: var(--scroll-sidemargin); /* Adjust the margin as needed */
  }
  

.card {
    flex: 0 0 325px;
    position: relative;
    width: 325px;
    height: 450px;
    background: #000;
    border-radius: 27px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    margin: 0 12px;
    scroll-snap-align: center;
    transition: transform 0.3s ease-in-out;
}

.poster {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.poster::before {
    content: '';
    position: absolute;
    bottom: -45%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: .3s;
}

.centered-card .poster::before {
    bottom: 0;
}

.poster img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: .3s;
}

.centered-card .poster img {
    transform: scale(1.1);
}

.details {
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: auto;
    padding: 1.5em 1.5em 2em;
    background: #000a;
    backdrop-filter: blur(16px) saturate(120%);
    transition: .3s;
    color: #fff;
    z-index: 2;
}

.centered-card .details {
    bottom: 0;
}

.details h1,
.details h2 {
    font-weight: 700;
}

.details h1 {
    font-size: 1.5em;
    margin-bottom: 5px;
}

.details h2 {
    font-weight: 400;
    font-size: 1em;
    margin-bottom: 10px;
    opacity: .6;
}

.details .rating {
    position: relative;
    margin-bottom: 15px;
    display: flex;
    gap: .25em;
}

.details .rating i {
    color: #e3c414;
}

.details .rating span {
    margin-left: 0.25em;
}

.details .tags {
    display: flex;
    gap: .375em;
    margin-bottom: .875em;
    font-size: .85em;
}

.details .tags span {
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
</style>
