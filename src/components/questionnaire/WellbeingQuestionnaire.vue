<template>
    <div>
        <p style="display: none;">[Wellbeing Questionnaire Block]</p>
        <ion-content class="ion-padding">
            <ion-modal handle-behavior="cycle" style="--border-radius: 10px; padding-top: 4vh;"
                :is-open="questionnaireModalIsOpen">
                <ion-header>
                    <ion-toolbar style="border-radius: 10px !important">
                        <ion-title>Узнаем вас лучше</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closemodal()">Закрыть</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding" style="--background: none;">

                    <div v-if="wellbeingQuestionnaireState == 'intro'">

                        <img src="../../assets/graphics/juicy-girl-pointing-her-finger.png" style="
        margin-top: 7vh;
        margin-left: 3vw;
        height: 20vh;
    " />

                        <div style="margin-top: 5vh; margin-left: 1vw;">
                            <p>Помогите приложению определить состояние вашего психологического благополучия в данный
                                момент
                                времени, пройдя небольшой тест. Вам предстоит ответить на несколько вопросов.
                                Постарайтесь
                                расслабиться и отвечать как можно честно, а самое главное — от души.</p>
                            <div style="margin-top: 2vh;"></div>
                            <ion-checkbox :checked="wellbeingquestionare_donotshowintroanymore == 'true'"
                                @ionChange="donotShowAnymore()" label-placement="end">Больше не
                                показывать</ion-checkbox>
                        </div>

                        <div style="margin-top: 5vh;"></div>
                        <ion-button @click="startQuestionnaire();" expand="block">Начать<p style="opacity: 0.8;">⠀(~5
                                минут)
                            </p></ion-button>

                    </div>
                    <div v-if="wellbeingQuestionnaireState == 'quiz'">
                        <flow-form style="margin-left: -4vw;" ref="flowform" v-on:complete="onComplete"
                            v-on:submit="onSubmit" v-bind:questions="questions" v-bind:language="language"
                            v-bind:standalone="true">
                            <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
                            <!-- We've overriden the default "complete" slot content -->
                            <template v-slot:complete>
                                <div class="f-section-wrap">
                                    <p>
                                        <span class="fh2">Спасибо. 🙏</span>
                                        <span class="f-section-text">
                                            Отличная работа, тест завершен и вы ответили на все вопросы. Вы можете
                                            просмотреть свои ответы или нажать "Отправить", чтобы продолжить.
                                        </span>
                                    </p>
                                    <p class="f-description">Заметка: не забудьте нажать на "Отправить", чтобы
                                        сохранить
                                        ответы в приложении и получить результат.</p>
                                </div>
                            </template>

                            <!-- We've overriden the default "completeButton" slot content -->
                            <template v-slot:completeButton>
                                <div class="f-submit" v-if="!submitted">
                                    <button class="o-btn-action" ref="button" type="submit" href="#"
                                        v-on:click.prevent="onSendData()" aria-label="Press to submit">
                                        <span>{{ language.submitText }}</span>
                                    </button>
                                    <a class="f-enter-desc" href="#" v-on:click.prevent="onSendData()"
                                        v-html="language.formatString(language.pressEnter)">
                                    </a>
                                </div>

                                <p class="text-success" v-if="submitted">Успешно отправлено.</p>
                            </template>
                        </flow-form>
                    </div>
                    <div v-if="wellbeingQuestionnaireState == 'processing'">
                        <h1 style="margin-top: 15vh; text-align: center;">
                            <ion-spinner name="lines-sharp"></ion-spinner>
                        </h1>
                        <p style="text-align: center;">Ожидание сервера</p>

                    </div>
                    <div v-if="wellbeingQuestionnaireState == 'finished'">
                        <div style="margin-top: 4vh;">
                            <p><b>Текущее эмоциональное состояние</b></p>
                            <div class="progressbar_container" style="margin-top: 1vh;">
                                <div class="shell">
                                    <div class="bar" :style="{ width: barProgress_progress + '%' }">
                                        <span> </span>
                                    </div>
                                </div>
                            </div>

                            <p v-if="barProgress_progress > 75" style="margin-top: 2vh; margin-left: 0.5vw;">Ваш
                                результат указывает на
                                низкий
                                уровень психического благополучия. Обратите внимание на свое самочувствие. Медитация
                                может
                                быть мощным инструментом для улучшения вашего психического благополучия. Она помогает
                                обрести внутреннюю гармонию, уменьшить стресс и научиться распознавать свои эмоции.</p>
                            <p v-else-if="barProgress_progress > 35" style="margin-top: 2vh; margin-left: 0.5vw;">Ваш
                                результат указывает на
                                средний
                                уровень психического благополучия. Помните, что медитация может помочь вам расслабиться,
                                снизить уровень стресса и получить ясность мышления. Это эффективный способ улучшить
                                свое
                                психическое благополучие и увеличить уровень счастья и удовлетворенности жизнью.</p>
                            <p v-else style="margin-top: 2vh; margin-left: 0.5vw;">Поздравляем! Ваш результат указывает
                                на высокий уровень психического благополучия. Ваше психическое здоровье и благополучие -
                                наш
                                приоритет. Продолжайте практиковать медитацию, чтобы поддерживать и усиливать свое
                                психическое благополучие. Медитация способствует осознанности, позволяет лучше управлять
                                стрессом и сохраняет ваш психический баланс.</p>

                            <div style="margin-top: 5vh;"></div>
                            <ion-button @click="finished();" expand="block">Готово</ion-button>
                        </div>

                    </div>
                </ion-content>
            </ion-modal>
        </ion-content>
    </div>
</template>

<script lang="ts">
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    actionSheetController,
    IonCheckbox,
    IonSpinner
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { FlowForm, Question, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

export default defineComponent({
    name: 'ExploreContainer',
    props: {
        opensCounter: Number
    },
    components: {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonCheckbox,
        FlowForm,
        IonSpinner
    },
    data() {

        return {
            questionnaireModalIsOpen: false,
            wellbeingquestionare_donotshowintroanymore: "false",
            wellbeingQuestionnaireState: "none",
            submitted: false,
            completed: false,
            barProgress_progress: 40,
            finalScore: 0,
            language: new LanguageModel(
                {
                    "pressEnter": " ",
                    "ok": "Дальше",
                    "continue": "Хорошо",
                    "submitText": "Отправить",
                    "percentCompleted": ":percent% пройдено",
                    "multipleChoiceHelpTextSingle": ""
                }
            ),
            questions: [
                new QuestionModel({
                    id: 'intro_message',
                    tagline: 'Привет! Рады тебя видеть 😊',
                    title: 'Тебе предстоит ответить на несколько простых вопросов о своих чувствах за последние несколько дней.',
                    type: QuestionType.SectionBreak,
                    multiple: false,
                    required: true,
                    helpTextShow: false,
                    model: '',
                }),
                new QuestionModel({
                    id: 'q1',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я с оптимизмом смотрю в будущее',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q2',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я чувствую себя полезным',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q3',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я чувствую себя расслабленным',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q4',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я хорошо справляюсь с трудностями',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q5',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я мыслю ясно',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q6',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я чувствую себя как часть общества (я не одинок)',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q7',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я могу легко принимать решения',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
                new QuestionModel({
                    id: 'q8',
                    tagline: 'Насколько верно это утверждение для последних нескольких дней?',
                    title: 'Я легко концентрирую внимание на работе, учебе и других делах',
                    subtitle: '',
                    type: QuestionType.MultipleChoice,
                    multiple: false,
                    required: true,
                    options: [
                        new ChoiceOption({
                            label: 'Постоянно',
                            value: 'allthetime'
                        }),
                        new ChoiceOption({
                            label: 'Часто',
                            value: 'often'
                        }),
                        new ChoiceOption({
                            label: 'Иногда',
                            value: 'someofthetime'
                        }),
                        new ChoiceOption({
                            label: 'Редко',
                            value: 'rarely'
                        }),
                        new ChoiceOption({
                            label: 'Никогда',
                            value: 'noneofthetime'
                        }),
                    ]
                }),
            ]
        };
    },
    mounted() {
        this.wellbeingquestionare_donotshowintroanymore = localStorage.getItem("wellbeingquestionare_donotshowintroanymore");
    },
    methods: {
        finished() {
            this.dismiss()
        },
        onSubmit() {
            // here we go..

        },
        onSendData() {
            // here we go..
            this.wellbeingQuestionnaireState = "processing"

            setTimeout(() => {
                this.processResults();
            }, 2000);

        },
        processResults() {
            // here we go..
            var data = {
                questions: [],
                answers: []
            }

            this.questions = this.questions.filter(question => !question.id.includes("intro_"));

            var points_assign_table = {
                "allthetime": 1,
                "often": 2,
                "someofthetime": 3,
                "rarely": 4,
                "noneofthetime": 5,
            }

            var max_points_per_question = 0;

            for (const [key, value] of Object.entries(points_assign_table)) {
                if (value > max_points_per_question) {
                    max_points_per_question = value;
                }
            }

            var questions_amount = Object.keys(this.questions).length;

            var max_point_to_gather = max_points_per_question * questions_amount;


            this.questions.forEach(question => {
                switch (question.answer) {
                    case "allthetime":
                        this.finalScore += points_assign_table["allthetime"];
                        break;
                    case "often":
                        this.finalScore += points_assign_table["often"];
                        break;
                    case "someofthetime":
                        console.log("someofthetime PROCC. " + points_assign_table["someofthetime"])
                        this.finalScore += points_assign_table["someofthetime"];
                        break;
                    case "rarely":
                        this.finalScore += points_assign_table["rarely"];
                        break;
                    case "noneofthetime":
                        this.finalScore += points_assign_table["noneofthetime"];
                        break;
                    default:
                        //nothing!
                        break;
                }
                if (question.title) {
                    //console.log("question's data", question, question.answer)
                    let answer = question.answer
                    if (Array.isArray(answer)) {
                        answer = answer.join(', ')
                    }
                    // eslint-disable-next-line
                    data.questions.push(question.id)
                    // eslint-disable-next-line
                    data.answers.push(answer)
                }

                console.log("(questionnaire) max_point_to_gather: " + max_point_to_gather)
                console.log("(questionnaire) this.finalScore: " + this.finalScore)

                var calculateBarProgressAndVerify = (100 / max_point_to_gather) * this.finalScore
                console.log("(questionnaire) calculateBarProgressAndVerify: " + calculateBarProgressAndVerify)
                if(calculateBarProgressAndVerify >= 100){
                    this.barProgress_progress = 100;
                }else{
                    this.barProgress_progress = calculateBarProgressAndVerify;
                }
                

                console.log("DATA-LOAD", data, this.finalScore)
            })
            this.wellbeingQuestionnaireState = "finished"
        },
        donotShowAnymore() {
            // donotShowAnymore implementation goes here.
            if (this.wellbeingquestionare_donotshowintroanymore == "true") {
                // == true
                this.wellbeingquestionare_donotshowintroanymore = "false";
                localStorage.setItem("wellbeingquestionare_donotshowintroanymore", "false")
            } else {
                // == false
                this.wellbeingquestionare_donotshowintroanymore = "true";
                localStorage.setItem("wellbeingquestionare_donotshowintroanymore", "true")
            }
        },
        open() {
            this.questionnaireModalIsOpen = true;

            if (this.wellbeingquestionare_donotshowintroanymore == "true") {
                this.wellbeingQuestionnaireState = "quiz"
            } else {
                this.wellbeingQuestionnaireState = "intro"
            }
        },
        startQuestionnaire() {
            this.wellbeingQuestionnaireState = "quiz"
        },
        dismiss() {
            this.questionnaireModalIsOpen = false;

            this.$emit('completion-event', 'Completed');
        },
        async closemodal() {
            // eslint-disable-next-line
            var parent_this = this;
            const actionSheet = await actionSheetController.create({
                header: 'Вы уверены, что хотите прервать тест?',
                buttons: [
                    {
                        text: 'Да',
                        role: 'confirm',
                    },
                    {
                        text: 'Нет',
                        role: 'cancel',
                    },
                ],
            });
            actionSheet.present();

            const { role } = await actionSheet.onWillDismiss();

            if (role === 'confirm') {
                parent_this.dismiss()
            }
        },
    }

});
</script>

<style>
/* Import Vue Flow Form base CSS */
@import '/node_modules/@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
/* Import one of the Vue Flow Form CSS themes (optional) */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
@import '/src/assets/css/quiz-flow.css';
</style>

<style scoped>


ion-toolbar {
    --background: none;
}

.header-ios ion-toolbar:last-of-type {
    --border-width: 0 0 0px;
}

ion-modal ion-content {
    --background: none !important;
}

#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}

.shell {
    height: 5vh;
    width: 90vw;
    border: 1px solid #aaa;
    border-radius: 13px;
    padding: 3px;
}

.bar {
    background: linear-gradient(to right, #B993D6, #8CA6DB);
    height: 4vh;
    width: 15px;
    border-radius: 9px;

    span {
        float: right;
        padding: 4px 5px;
        color: #fff;
        font-size: 0.7em
    }
}

.progressbar_container {
    display: flex;
}


</style>