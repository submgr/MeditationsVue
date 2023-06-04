<template>
    <div id="container" v-if="current_background == 'magic_circle'">
      <div class="circle">
        <div class="noise animated">
        </div>
      </div>
    </div>
    <div v-if="current_background == 'video'" style="position: fixed; top: 0; bottom:0; width: 100%; height: 100%; z-index: -1; filter: brightness(100%);">
      <video playsinline autoplay muted loop poster="" style="height: 100%;">
        <source src="https://accessmeditation.pages.dev/video/pexels_ambientnature_atmosphere_1.mp4">
          Ваше устройство не может воспроизвести это видео. Попробуйте обновить браузер или загрузить другой (например, Google Chrome). Возможно, вам необходимо установить последние драйвера или кодеки.<br/>Sorry, your device is unable to play this media. Update your browser or try out some other. In some cases it is recomended for users to update drivers and install latest codecs.
      </video>
    </div>
  </template>

  <style scoped>
    .myVideo {
      position: fixed;
      right: 0;
      bottom: 0;
      object-fit: cover;
      width: 100%;
      min-width: 100%;
      min-height: 100%;
    }
  </style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import VuePlyr from 'vue-plyr'
  import 'vue-plyr/dist/vue-plyr.css' 
  
  export default defineComponent({
    name: 'ExploreContainer',
    props: {
      type: String
    },
    //components: {VuePlyr},
    mounted() {
        switch (this.type) {
          case "magic_circle":
            this.current_background = "magic_circle"
            break;
          case "video":
            this.current_background = "video"
            break;
          default:
            break;
        }
        console.log("Registered the folowing current_background: " + this.current_background)
    },
    setup(){
      return {
        current_background: null
      }
    }
  });
  </script>
  
  <style scoped>
  @import "../assets/css/light_glow_circle.css";
  </style>
  