<template>
<ion-page >
    <div
        v-if="showStory"
        style="position: absolute; height: 100vh; width: 100vw; background: black; top: 0rem !important;"
        >
        <div style="position: fixed; z-index: 2; padding-top: 1.5rem; right: 0; padding-right: 1rem;">
            <ion-icon :icon="closeOutline" style="color: white; font-size: 2rem;" @click="toggleStory"></ion-icon>
        </div>
        <section class="justify-center" style="position: flex; align-items: center; justify-content: center;">
            <Stories
            v-if="showStory"
            :stories="items" :interval="8000"
            style="position: absolute; top: 0rem !important; height: 100%; width: 100%;"
            />
        </section>
    </div>
    <ion-content :fullscreen="true" >
        <div style="padding: 20px; padding-top: 42px; overflow:scroll; white-space: nowrap;" @click="toggleStory">
            <div style="height: 70px; width: 70px; background-color: red; border-radius: 50%; display: inline-block; margin-right: 3%;"></div>
            <div style="height: 70px; width: 70px; background-color: red; border-radius: 50%; display: inline-block; margin-right: 3%;"></div>
            <div style="height: 70px; width: 70px; background-color: red; border-radius: 50%; display: inline-block; margin-right: 3%;"></div>
            <div style="height: 70px; width: 70px; background-color: red; border-radius: 50%; display: inline-block; margin-right: 3%;"></div>
            <div style="height: 70px; width: 70px; background-color: red; border-radius: 50%; display: inline-block; margin-right: 3%;"></div>
        </div>
        <div style="padding-left: 2rem; padding-top: 2rem;">
            <h1 style="font-size: 34px;" >Test</h1>
        </div>
    </ion-content>
</ion-page>
</template>

<style scoped>
    ion-content {
        --background: #030303;
    }
</style>

  
<script lang="ts">
import {
    defineComponent
} from 'vue';
import { Stories } from "vue-insta-stories";
import {
    IonPage,
    IonContent,
} from '@ionic/vue';

import { closeOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonContent,
        IonPage,
        Stories
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
            if(this.showStory){
                const tabsEl = document.querySelector('ion-tab-bar');
                if (tabsEl) {
                    tabsEl.hidden = true;
                    tabsEl.style.height = "1";
                }
            }else{
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
            closeOutline
        }
    }
});
</script>
