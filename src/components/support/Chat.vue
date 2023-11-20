<template>
    <div>
        <iframe :class="{ elementHidden: isloading, elementVisible: !isloading }" class="iframe_smooth"
            :src="`/assets/html/tawkchat/`" sandbox="allow-scripts allow-same-origin"
            style="position:fixed; top:-0.12vh; left: -10px; bottom:50px; right:-10px; width:105%; height:calc(100% - 50px); border:none; margin:0; padding:0; overflow:hidden; z-index: -1; "
            allowtransparency="true">
            При выполнении на вашем устройстве возникла проблема: Iframe is not supported on your device. Эта функция будет
            отключена на вашем устройстве.<br />Sorry, we encounter some problem on your device: Iframe is not supported on
            your device. This feature will be turned off on your device.
        </iframe>
        <div v-if="isloading" style="z-index: 99; position: relative; margin-top: 30vh; text-align: center;">
            <h1><ion-spinner name="lines-sharp"></ion-spinner></h1>
            <AdvancedLoader origin="support-chat-is-loading" />
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';

import globaldata from '../../modules/global';

import AdvancedLoader from '../../components/AdvancedLoader.vue';

import store from "../../store";

const getUserData = computed(() => {
    return store.getters.getUserData;
});


export default defineComponent({
    name: 'ExploreContainer',
    props: {
        name: String
    },
    components: { AdvancedLoader },
    data() {
        return {
            announcements: [],
            freePremiumServerMagicToken: "mi3si0fbl27kad4bxtfwcbzebbb6yjrl",
            freePremiumForPeriod: "1 год (1-year)",
            openedModal: "none",
            isloading: true
        }
    },
    methods: {
        closemodal() {
            this.openedModal = "none"
        }
    },
    mounted() {

        // eslint-disable-next-line
        var parent_this = this;

        console.log("Going to load chat script from third-party provider... (tawk.to)");

        window.addEventListener("message", function (event) {

            if (event.data == "tawkto_layer_loaded") {
                setTimeout(() => {
                    parent_this.isloading = false;
                }, 4000);
            }



            // can message back using event.source.postMessage(...)
        });
    }
});
</script>
  
<style scoped>
.elementHidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s linear, opacity 1s linear;
}

.elementVisible {
    opacity: 1;
    transition: visibility 0.3s linear, opacity 1s linear;
}

.iframe_smooth {
    animation: fadeIn 10s forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}</style>
  