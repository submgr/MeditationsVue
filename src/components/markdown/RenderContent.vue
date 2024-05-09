<template>
    <div id="container">
        <vue-markdown :source="src"/>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';

  import globaldata from '../../modules/global';
  import VueMarkdown from 'vue-markdown-render'
  
  export default defineComponent({
    name: 'ExploreContainer',
    props: {
        materialType: String,
        codename: String

    },
    components: {
        VueMarkdown
    },
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
var finalPathType = "posts";
if(this.materialType == "pages"){
    finalPathType = "pages";
}

this.$http.get(globaldata.markdown_assets.hostname + "markdown/" + finalPathType + "/" + this.codename + ".md").then(function(response){
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
  
  <style scoped>
  
  </style>
  