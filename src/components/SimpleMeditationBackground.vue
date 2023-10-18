<template>
  <div v-if="backgroundCode != 'iwantsomecock'" style="z-index: 1; position: relative;"> 
    <div id="container" v-if="current_background == 'magic_circle'">
      <div class="circle">
        <div class="noise animated">
        </div>
      </div>
    </div>
    <div id="container" v-if="current_background == 'wavy_shader'">
      <iframe :src="`/assets/html/wavy_sahder/index.html`" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:9;" allowtransparency="true">
        При выполнении на вашем устройстве возникла проблема: Iframe is not supported on your device. Эта функция будет отключена на вашем устройстве.<br/>Sorry, we encounter some problem on your device: Iframe is not supported on your device. This feature will be turned off on your device.
      </iframe>
      <div v-if="tempdata_wavy_shader_loadstate == 'notloaded'" style="z-index: 99; position: relative; margin-top: 30vh; text-align: center;">
        <h1><ion-spinner name="lines-sharp"></ion-spinner></h1>
      </div>
    </div>
    <div v-if="current_background == 'video'" style="position: fixed; top: 0; bottom:0; width: 100%; height: 100%; z-index: -1; filter: brightness(100%);">
      <video playsinline autoplay muted loop poster="" style="height: 100%; " class="myVideo" v-reload="backgroundCode">
        <source :src="globaldata.assets.hostname + '/videos/mededitationbg/' + backgroundCode + '.mp4'">
          Ваше устройство не может воспроизвести это видео. Попробуйте обновить браузер или загрузить другой (например, Google Chrome). Возможно, вам необходимо установить последние драйвера или кодеки.<br/>Sorry, your device is unable to play this media. Update your browser or try out some other. In some cases it is recomended for users to update drivers and install latest codecs.
      </video>
    </div>
  </div>

  <div style="z-index: -99; position: relative; margin-top: 30vh; text-align: center;">
    <h1><ion-spinner name="lines-sharp"></ion-spinner></h1>
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

  import { loadScript } from "vue-plugin-load-script";

  import globaldata from '../modules/global';
  
  export default defineComponent({
    name: 'ExploreContainer',
    props: {
      type: String,
      backgroundCode: String
    },
    //components: {VuePlyr},
    mounted() {
      this.requestNewBackground();
    },
    data () {
      return {
        publicPath: process.env.BASE_URL,
        globaldata: globaldata,
        current_background: null,
        tempdata_wavy_shader_loadstate: "notloaded"
      }
    },
    watch: {
      type: {
        // the callback will be called immediately after the start of the observation
        immediate: true, 
        handler (val, oldVal) {
          this.requestNewBackground();
        }
      }
    },
    methods: {
      requestNewBackground(){
        // eslint-disable-next-line
        const parent_this = this;

        switch (this.type) {
          case "magic_circle":
            this.current_background = "magic_circle"
            break;
          case "wavy_shader":
            this.current_background = "wavy_shader"
            window.addEventListener('message', (event) => { 
              
                    if (event.data.type == "MessageFromChild" && event.data.idea == "WavyBackground" && event.data.message == "loaded"){
                      console.log("Wavy background is loaded now and ready get shown!", event.data)
                      parent_this.tempdata_wavy_shader_loadstate = "loaded"
                    }
                }, false);
            break;
          case "video":
            this.current_background = "video"
            break;
          default:
            break;
        }
        console.log("Registered the following current_background: " + this.current_background)
      }
    },
    directives: {
    reload(el, binding) {
      if (binding.oldValue !== binding.value) {
        el.load();
      }
    }
  },
  });
  </script>
  
  <style scoped>
  @import "../assets/css/light_glow_circle.css";
  </style>
  