<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <NavbarController activatedfrom="Read/YouShouldKnow" @backfunction="$router.back()" align="right" />
            <ion-header collapse="condense">
                <ion-toolbar style="--background: none !important; --opacity: 0;">
                    <ion-title size="large">{{ page_title_friendly }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-card style="border-radius: 20px;">
                <ion-card-header>
                    <ion-card-subtitle>Это действительно работает.</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>Медитация позволяет нам не только расслабиться, но и избавиться от тревоги через перенос
                    фокуса с окружающего мира на более абстрактные вещи. Например, на свое тело или воображаемый сценарий.
                    Положительный эффект медитации был доказан ведущими исследовательскими институтами мира, среди
                    которых, например, Гарвардский университет и университет Джонса Хопкинса. Исследования показывают, 
                    что регулярная медитация помогает снизить уровень стресса, улучшает концентрацию внимания и повышает 
                    общий уровень жизненного благополучия.</ion-card-content>
            </ion-card>
            <ion-card style="border-radius: 20px;">
                <ion-card-header>
                    <ion-card-subtitle>Что говорят исследования?</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>Исследования показывают, что практика медитации приводит к повышению способности к
                    эмоциональной регуляции. Мышление помогает людям лучше осознавать свои мысли в настоящем моменте, а
                    такое осознание ведет к улучшению обработки информации и контроля над реакцией на окружающую обстановку
                    или обстоятельства.<br /><br />Некоторые исследования показывают, что медитация может изменять структуру
                    мозга. Другие показывают, что она может изменять функции мозга. Медитация оказывает заметное влияние на
                    три области мозга: серое вещество - участвует в управлении мышцами и сенсорном восприятии, включая
                    эмоции, память, речь, зрение, слух и принятие решений.</ion-card-content>
            </ion-card>
            <ion-card style="border-radius: 20px;">
                <ion-card-header>
                    <ion-card-subtitle>Как это работает с точки зрения науки?</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>Согласно данным нейронаучных исследований, практика осознанности снижает активность
                    миндалевидной железы и усиливает связи между миндалиной и префронтальной корой головного мозга. Обе эти
                    части мозга помогают нам меньше реагировать на стрессовые факторы и лучше восстанавливаться после
                    стресса.</ion-card-content>
            </ion-card>
            <ion-card style="border-radius: 20px;">
                <ion-card-header>
                    <ion-card-subtitle>Медитация является нонсенсом?</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>В отличие от некоторых непроверенных методов воздействия на организм, медитация была
                    тщательно изучена и показала, что приносит конкретную пользу, включая снижение тревожности и
                    депрессии.</ion-card-content>
            </ion-card>
            <ion-card style="border-radius: 20px;">
                <ion-card-header>
                    <ion-card-subtitle>Может ли медитация улучшить мой интеллект?</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>Результаты показали, что у участников, занимавшихся медитацией, средний прирост IQ
                    составил 23%. Одна из причин этого заключается в том, что глубокая медитация замедляет мозговую
                    активность. Замедление мозговых волн повышает способность мозга к самореорганизации. Когда вы даете
                    мозгу отдохнуть, он сам себя улучшает (так, например, работает сон: во время сна мозг тоже
                    реорганизуется). Обратите внимание, необходимо заниматься медитацией периодически, чтобы эта полезная
                    привычка оказала данный эффект.</ion-card-content>
            </ion-card>
            <ion-card style="border-radius: 20px;">
                <ion-card-header>
                <ion-card-subtitle>Как много людей уже медитирует?</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>До 6% населения планеты медитируют. После йоги медитация является самой популярной
                практикой работы с телом и разумом в мире.</ion-card-content>
        </ion-card>
        <div style="height: calc(50px + 1.5vh);"></div>
    </ion-content>
</ion-page></template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent } from '@ionic/vue';

import NavbarController from '@/components/NavbarController.vue';

export default defineComponent({
    name: 'Tab1Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, NavbarController },
    data() {
        return {
            page_title_friendly: "Узнайте больше",
            curr_time: 0
        }
    },
    mounted() {
        this.curr_time =  Date.now()
    }
});
</script>
  