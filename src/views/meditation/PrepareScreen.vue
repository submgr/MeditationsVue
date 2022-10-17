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
              <div v-if="1<2">
                <span class="f-tagline">Связь с сервером</span>
                <div v-if="loading">
                  <span class="fh2">Пожалуйста, подождите: сервер анализирует ваши ответ...</span>
                </div>
                <div v-else>
                  <div v-if="finalScore >= 15">
                    <span class="fh2">Превосходная устойчивость в отношении эмоционального состояния.</span>
                    <div style="border: 1px solid #ccc!important; border-radius: 10px; margin-right: 20%;">
                      <div style="background-color:green;height:24px;width:98%; border-radius: 10px;"></div>
                    </div>
                    <p class="f-description" style="margin-top: 15px;"><span>У вас очень устойчивое эмоциональное состояние.
                      Эмоциональное здоровье позволяет вам продуктивно работать и справляться со стрессами повседневной жизни.
                      Это помогает вам полностью реализовать свой потенциал.
                      Оно помогает вам работать с другими людьми и вносить свой вклад в жизнь общества,
                      а также влияет на ваше физическое здоровье.
                      <br><br>Сейчас медитации будут полезны вам тем, что они помогут вам сохранить текущее эмоциональное состояние — оно не ухудшится.
                      Кроме того, медитация помогает вам лучше понять себя.</span></p>
                  </div>
                  <div v-else-if="finalScore >= 9">
                    <span class="fh2">Умеренное эмоциональное состояние.</span>
                    <div style="border: 1px solid #ccc!important; border-radius: 10px; margin-right: 20%;">
                      <div style="background-color:orange;height:24px;width:68%; border-radius: 10px;"></div>
                    </div>
                    <p class="f-description" style="margin-top: 15px;"><span>У вас умеренное эмоциональное состояние.
                      Эмоциональное здоровье позволяет вам продуктивно работать и справляться со стрессами повседневной жизни.
                      Это помогает вам полностью реализовать свой потенциал.
                      Оно помогает вам работать с другими людьми и вносить свой вклад в жизнь общества,
                      а также влияет на ваше физическое здоровье.
                      <br><br>Сейчас медитации будут полезны вам тем, что они помогут вам повысить уровень эмоционального состояния.
                      Это приведет к тому, что медитация поможет вам не только лучше понять себя, но и повысить качество жизни.</span></p>
                  </div>
                  <div v-else-if="finalScore >= 0">
                    <span class="fh2">Критично низкое эмоциональное состояние.</span>
                    <div style="border: 1px solid #ccc!important; border-radius: 10px; margin-right: 20%;">
                      <div style="background-color: darkred;height:24px;width:18%; border-radius: 10px;"></div>
                    </div>
                    <p class="f-description" style="margin-top: 15px;"><span>У вас очень низкий уровень эмоционального состояния.
                      Эмоциональное здоровье позволяет вам продуктивно работать и справляться со стрессами повседневной жизни.
                      Это помогает вам полностью реализовать свой потенциал.
                      Оно помогает вам работать с другими людьми и вносить свой вклад в жизнь общества,
                      а также влияет на ваше физическое здоровье.
                      <br><br>Сейчас медитации будут полезны вам тем, что они помогут вам повысить уровень эмоционального состояния.
                      Не пугайтесь: в этом нет ничего страшного, часто бывают моменты, когда уровень эмоционального благополучия резко падает. Например, это может произойти осенью или весной, или из-за определенных жизненных обстоятельств.<br><br>Уровень эмоционального состояния можно вернуть довольно быстро, для этого рекомендуется больше времени проводить на свежем воздухе. Если вы смотрите фильмы или сериалы, это отличный момент, чтобы обратить момент на комедии (пример такого сериала: "Теория большого взрыва"). Медитация поможет вам лучше погрузиться в себя, и именно это может помочь вам: мы часто излишне беспокоимся там, где можно обойтись без этого.</span></p>
                  </div>
                  <div style="border: 1px solid #ccc!important; background-color: var(--vff-button-color); margin-right: 60%;">
                    <span style="font-size: 20vw; display: block; font-weight: 500; color: var(--vff-button-text-color); padding: .6em 1.4em;">Продолжить</span>
                  </div>
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
        finalScore: 0,
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
            type: 'sectionbreak',
            id: 'review',
            tagline: 'Ваши ответы помогают нам измерять уровень вашего эмоционального состояния для рекомендаций оптимальных медитаций.',
            title: 'Спасибо.',
            multiple: false,
            required: true,
            helpTextShow: false,
            model: '',
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
          switch (question.model) {
            case "almost_always":
              this.finalScore += 2;
              break;
            case "sometimes":
              this.finalScore += 1;
              break;
            case "very_seldom":
              this.finalScore += 0;
              break;
            default:
              //nothing!
              break;
          }
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
@import '@assets/css/quiz-flow.css';
</style>
  