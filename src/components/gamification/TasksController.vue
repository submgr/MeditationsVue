<template>
    <div v-if="elementsLen > 0" class="task-container" style="margin-top: -1vh;">
        <div v-for="(item, index) in tasks" :key="index" class="task-card" :style="`max-width: ${computedWidth}%`">
            <TaskCard :title="item.title" :content="item.description" :data="item" ref="taskCards" :elementsLen="elementsLen"/>
        </div>
    </div>
</template>


<style scoped>
.task-container {
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */
}

.task-container::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}


.task-card {
    flex: 0 0 auto;
    margin-right: 10px;
    /* Adjust the max-width as needed */
    display: flex;
    flex-direction: column;
}

.task-card>div {
    flex: 1;
}
</style>

<script>
import * as gamificationEngine from "../../modules/gamificationEngine"
import TaskCard from '@/components/gamification/TaskCard.vue';

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    components: { TaskCard },
    data() {
        return {
            tasks: [],
            elementsLen: 0,
            computedWidth: 90
        }
    },
    mounted() {
        // eslint-disable-next-line
        var parent_this = this;

        this.tasks = gamificationEngine.getActiveTasks(this.$achievements);
        console.log("gamification_tasks: ", this.tasks)
        this.tasks = this.tasks.filter(task => task.goal > task.progress);
        
        console.log("gamification_filteredTasks: ", this.tasks)
        setTimeout(() => {
            parent_this.setMinHeightForTaskCards()
            this.elementsLen = this.tasks.length;
        if(this.elementsLen == 1){
            this.computedWidth = 100;
        }
        }, 1000);

        
    },
    methods: {
        setMinHeightForTaskCards() {
            const taskCardElements = this.$refs.taskCards;
            console.log("test555", taskCardElements)
            if (taskCardElements) {
                console.log("element", taskCardElements[0].$el)
                const heights = Array.from(taskCardElements).map(el => el.$el.clientHeight);
                console.log("heights", heights)
                const maxHeight = Math.max(...heights);
                taskCardElements.forEach(el => {
                    el.$el.style.height = `${maxHeight}px`;
                });
            }
        }
    }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
