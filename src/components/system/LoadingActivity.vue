<template>
    <div v-if="show" class="loading-overlay">
        <div class="loading-container">
            <ion-spinner name="lines-sharp" style="color: black;"></ion-spinner><br/>
            <p class="loading-text" style="margin-left: 4vw; margin-right: 2vw;">Loading...</p>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            message: "Hello, Vue 3!"
        };
    }
};
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    z-index: 1000;
    pointer-events: all; /* Capture all pointer events */
  }
  
  .loading-container {
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* Ignore pointer events */
  }
  
  .loading-text {
    font-size: 18px;
    color: #000;
    pointer-events: all; /* Capture pointer events */
  }
</style>
