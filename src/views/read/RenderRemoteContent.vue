<template>
    <ion-page>
        <ion-header> 
            <ion-toolbar>
                <ion-title>{{ page_title_friendly }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ page_title_friendly }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-card style="border-radius: 20px;">

                <ion-card-content>

                    <div>
                        <vue-markdown :source="src"/>
                    </div>
                </ion-card-content>

            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import VueMarkdown from 'vue-markdown-render'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,  IonCard, IonCardContent } from '@ionic/vue';

import globaldata from '../../modules/global';

export default defineComponent({
    name: 'Tab1Page',
    components: { VueMarkdown, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent },
    data() {
        return {
            page_title_friendly: "test",
            content_id: "test",
            src: ''
        }
    },
    mounted(){

        // eslint-disable-next-line
        const parent_this = this;
        const post_codename = this.$route.query.post_codename

        this.$http.get(globaldata.assets.hostname + "markdown/posts/" + post_codename + ".md").then(function(response){
            var received_content = response.data;
            const metadata_tagmarker = ["<<metadata_title>>", "<</metadata_title>>"]
            const metadata_tagplacement = [
                [ received_content.indexOf(metadata_tagmarker[0]), received_content.indexOf(metadata_tagmarker[0]) + metadata_tagmarker[0].length ],
                [ received_content.indexOf(metadata_tagmarker[1]), received_content.indexOf(metadata_tagmarker[1]) + metadata_tagmarker[1].length ],
            ]
            const extractedmeta_title = received_content.substring(metadata_tagplacement[0][1], metadata_tagplacement[1][0]);
            received_content = received_content.slice(metadata_tagplacement[1][1], received_content.length);
            parent_this.src = received_content;
        });

    }
});
</script>
  