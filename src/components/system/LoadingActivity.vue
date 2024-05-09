<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="(show || show_local)" class="loading-overlay">
                <div class="loading-container">
                    <ion-spinner name="lines-sharp" style="color: black;"></ion-spinner><br/>
                    <p class="loading-text" style="margin-left: 4vw; margin-right: 2vw;">Один момент...</p>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<!-- Rest of your script and style remains the same -->

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            default: "other"
        }
    },
    data() {
        return {
            message: "Hello, Vue 3!",
            waitstart_timestamp: 0,
            show_local: false
        };
    },
    watch: {
        show(newValue) {
            this.triggerStateChange(newValue)
        }
    },
    methods: {
        triggerStateChange(newValue){
            if (newValue) {
                this.waitstart_timestamp = Date.now();
                let source = this.source;
                if(source != "Meditations/PlayerScreen") {
                        localStorage.setItem("show_local", JSON.stringify(this.show_local));
                    }
                this.show_local = true;
            } else {
                const elapsed = Date.now() - this.waitstart_timestamp;
                const remaining = Math.max(0, 2650 - elapsed);
                let source = this.source;
                setTimeout(() => {
                    if(source != "Meditations/PlayerScreen") {
                        localStorage.setItem("show_local", JSON.stringify(this.show_local));
                    }
                    
                    this.show_local = false;
                    this.waitstart_timestamp = 0;
                }, remaining);
            }
        }
    },
    mounted() {
        console.log("LoadingActivity.vue mounted");

        if(this.source === "Meditations/PlayerScreen") {
            if(localStorage.getItem("show_local") == "true") {
                this.show_local = JSON.parse(localStorage.getItem("show_local"));
                localStorage.removeItem("show_local")
                this.triggerStateChange(true);
                this.triggerStateChange(false);
            }
        }

        

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
    z-index: 999999999999999;
    pointer-events: all; /* Capture all pointer events */
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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