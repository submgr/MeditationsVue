<template>
    <div id="container">
        <div class="wrapper">
            <!--- [START] Dynamically Generated Content Block Comes Here -->
            <div class="card" v-for="(item, index) in premadeMeditations" v-bind:key="item.id">
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
                        <ion-button @click="$emit('event-getmeditation', item.searchobject)">Начать медитацию</ion-button>
                    </div>
                </div>
            </div>
            <!--- [END] Dynamically Generated Content Block Comes Here -->
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

import globaldata from '../modules/global';
import { forEach } from 'xregexp';


export default defineComponent({
    name: 'ExploreContainer',
    props: {
        name: String
    },
    data() {
        return {
            premadeMeditations: [   ]
        }
    },
    setup(){

        //setup
    },
    mounted(){

        

        // eslint-disable-next-line
        const parent_this = this;

        this.$http.get(globaldata.api.hostname + "access/meditations/featured", {
                params: {
                    method: "email"
                }
            }).then((response) => {
                console.log(response)
                if (response.data.status == "okay"){
                    console.log("[Server Message] Received featured meditations... length: " + response.data.content.length)

                    var meditations = response.data.content;
                    meditations.forEach(element => {
                        parent_this.premadeMeditations.push(element)
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
        }

        .card {
            flex: 0 0 325px;
            position: relative;
            width: 325px;
            height: 450px;
            background: #000;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
            margin: 0 12px;
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

        .card:hover .poster::before {
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

        .card:hover .poster img {
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

        .card:hover .details {
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
    border-radius: 4px;
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
}</style>
  