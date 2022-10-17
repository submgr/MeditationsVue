<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <flow-form
          ref="flowform"
          v-on:complete="onComplete"
          v-bind:language="language"
          v-bind:progressbar="false"
          v-bind:standalone="true"
        >
          <question 
            v-for="(question, index) in questions" 
            v-bind="question" 
            v-bind:key="'m' + index" 
            v-model="question.model"
          >
          </question>
          
          <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
          <template v-slot:complete>
            <div class="f-section-wrap">
              <div v-if="questions[0].model === 'technical_issue'">
                <span class="f-tagline">Submit issue &gt; Step 3/3</span>
                <div v-if="loading">
                  <span class="fh2">Please wait, submitting...</span>
                </div>
                <div v-else>
                  <span class="fh2">Your ticket number is: {{ getTicket() }}</span>
                  <p class="f-description"><span>Thank You 😊. Our support team will contact you as soon as possible.</span></p>
                </div>
              </div>
              <div v-else>
                <span class="f-tagline">Support page &gt; Ticket status</span>
                <div v-if="loading">
                  <span class="fh2">Please wait, checking...</span>
                </div>
                <div v-else>
                  <span  class="fh2">Good news - the wheels are turning, your ticket No. {{ formatTicket(questions[2].model) }} is being processed!😉</span>
                  <p class="f-description"><span>Have a great day!</span></p>
                </div>
              </div>
            </div>  
          </template>
          <!-- We've overriden the default "complete" slot content -->
          <template v-slot:completeButton>
            <div class="f-submit">
              <!-- Leave empty to hide default submit button -->
            </div>
          </template>
        </flow-form>
      </ion-content>
    </ion-page>
  </template>

<style scoped>
  rion-content{
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.121) 10%, rgba(2, 156, 12, 0.714)), url('https://images.unsplash.com/photo-1586078074298-05dca4848695?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80') !important;
    background-position: 100%;
    background-size: cover !important;
  }

  .vff ul.f-radios li {
    border-radius: 20px !important;
  }
</style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';
  import { FlowForm, Question, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'
  
  export default  defineComponent({
    name: 'Tab1Page',
    components: { IonContent, IonPage, FlowForm, Question },
    data() {
      return {
        loading: false,
        completed: false,
        language: new LanguageModel(),
        questions: [
          {
            type: 'multiplechoice',
            id: 'any_meditations_experience',
            tagline: 'Давайте узнаем вас лучше!',
            title: '👋, пробовали ли вы медитации ранее?',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Ранее я не пробовал медитации вовсе',
                value: 'technical_issue'
              },
              {
                label: 'Я пробовал, но у меня не получалось, либо мне было непонятно',
                value: 'enter_ticket'
              },
              {
                label: 'У меня есть определенный опыт в этом деле',
                value: 'enter_ticket'
              },
              {
                label: 'Я профессионал в этом!',
                value: 'enter_ticket'
              },
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_canworkwithcloserelations',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я умею развивать и поддерживать тесные взаимоотношения.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_cantakeresponsibility',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я принимаю на себя ответственность за свои действия.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_cantakeobstacklesasopportunities',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я рассматриваю трудности и перемены как возможности для роста.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_cantakecontroloverlife',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я чувствую, что в значительной степени контролирую свою жизнь.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_canlaughtonmylifeandme',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я умею смеяться над жизнью и над собой.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_feelgood',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я чувствую себя хорошо.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_canworkwithstressandtakerest',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'У меня получается адекватно справляться со стрессом и напряжением и находить время для отдыха.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_canlearnbymymistrakes',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я способен признавать свои личные недостатки и учиться на своих ошибках.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_canexpressfeelings',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я умею распознавать и выражать свои чувства.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'psycho_emotional_enjoylife',
            tagline: 'Укажите, насколько верно для вас представленное утверждение.',
            title: 'Я наслаждаюсь жизнью.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'date',
            id: 'birtdate',
            tagline: 'Это поможет создать ',
            title: 'Я наслаждаюсь жизнью.',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Почти всегда',
                value: 'almost_always'
              },
              {
                label: 'Иногда/изредка',
                value: 'sometimes'
              },
              {
                label: 'Очень редко',
                value: 'very_seldom'
              }
            ],
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'technical_issue',
            tagline: 'Submit issue > Step 1/3',
            title: 'Have you read our technical FAQ?',
            multiple: false,
            required: true,
            helpTextShow: false,
            description: "Here you'll find answers to",
            descriptionLink: [
              {
                url: '#',
                text: 'FAQs',
                target: '_self'
              }
            ],
            options: [          
              {
                label: 'Yes, but I couldn’t find the answer',
                value: 'faq_no'
              }
            ],
            jump: {
              faq_no: 'faq_no'
            },
            model: '',
          },
          {
            type: 'text',
            id: 'enter_ticket',
            tagline: 'Support page > Ticket status',
            title: 'Please enter your 6-digit code.',
            subtitle: 'You received this when you reported your problem.',
            multiple: false, 
            required: true,
            mask: '#-#-#-#-#-#',
            placeholder: '#-#-#-#-#-#',
            jump: {
              _other: '_submit'
            },
            model: ''
          },
          {
            type: 'longtext',
            id: "faq_no",
            tagline: 'Submit issue > Step 2/3',
            title: 'Please describe your problem.',
            required: true,
            placeholder: 'Start typing here...',
            model: ''
          },
          {
            type: 'iconrate',
            id: 'icon_rate',
            tagline: "One more thing before you go",
            title: 'How would you rate our service?',
            required: false,
            max: 5,
            model: ''
          },
        ]
      }
    },
    methods: {
      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        //!!! this.$refs.flowform.submitted = true
        this.onSendData()
      },
      
      onSendData() {
        // eslint-disable-next-line
        const self = this
        const data = this.getData()
        this.loading = true
        
        /*
          You can use Fetch API to send the data to your server, eg.:
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        */
        setTimeout(() => {
          self.loading = false
        }, 1500)
      },
      getData() {
        var data = {
          questions: [],
          answers: []
        }
    
        this.questions.forEach(question => {
          if (question.title) {
            let answer = question.model
            if (Array.isArray(answer)) {
              answer = answer.join(', ')
            }
            // eslint-disable-next-line
            data.questions.push(question.title)
            // eslint-disable-next-line
            data.answers.push(answer)
          }
        })
    
        return data
      },
      formatTicket(ticket) {
        return ticket && ticket.replace(/-/g, '')
      },
      getTicket() {
        return Math.floor(Math.random() * (999999 - 100000) + 100000).toString()
      }
    }
  });
  </script>

<style>
/* Import Vue Flow Form base CSS */
@import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
/* Import one of the Vue Flow Form CSS themes (optional) */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
@import '../assets/css/quiz-flow.css';
</style>
  