<template>
    <div id="container">
        <div class="circle">
            <div class="noise animated">
            </div>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ExploreContainer',
    props: {
      name: String
    }
  });
  </script>
  
  <style scoped>
  @import "../assets/css/light_glow_circle.css";
  </style>
  