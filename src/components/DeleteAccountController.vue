<template>
    <ion-card style="border-radius: 20px;">

        <ion-card-content>
            <div v-if="!isAnythingLoadingNow">
                <div v-if="current_state == 'onboard'">
                    <br>
                    <img :src="`/assets/svg/kitekat-7.svg`" style="max-width: 40vw; max-height: 20vh;" />
                    <img :src="svg_photos_array['test'].src" style="max-width: 40vw; max-height: 20vh;" />
                    <br>
                    <p><i>Вы точно хотите уйти, оставив этого милого котика под дождем? &#60;3</i></p><br>
                    <p>Вы можете запросить удаление вашей учетной записи из системы. <br><br>Обратите внимание, что это
                        необратимый
                        процесс: после этого все данные будут безвозратно удалены и если вы захотите вернуться, вам придется
                        создать
                        новую учетную запись.</p>
                    <p><br>Чтобы перейти к удалению учетной записи, мы попросим вас еще раз войти в систему, чтобы подтвердить
                        вашу
                        личность.</p>
                    <br><ion-button style="margin-top: 1vh;" @click="askedToStartDeletion()" color="danger">Продолжить</ion-button>
                </div>
                <div v-if="current_state == 'unabletoproceed'">
                    <p>Не удалось начать сессию авторизации (причина: can't load LocalStorage). Обычно такое бывает, когда пользователь пытается открыть страницу удаления учетной записи в браузере в режиме инкогнито или "защищенный просмотр". Попробуйте позже еще раз, возможно вам стоит попробовать другой браузер.</p>
                </div>
                <div v-if="current_state == 'authorization_confirmed'">
                    <br>
                    <img :src="`/assets/svg/kitekat-19.svg`" style="max-width: 40vw; max-height: 20vh;" />
                    <br>
                    <p><i>Медитирующий котик считает, что вы — лучше всех! &#60;3</i></p><br>
                    <p>Вы успешно подтвердили, что именно вы являетесь владельцем этой учетной записи.</p>
                    <p><br>Это последний шаг перед удалением. После нажатия на красную кнопку ниже все данные будут удалены навсегда. К примеру, главная особенность нашего приложения — персонализация. Каждая медитация создается с помощью искусственного интеллекта, с учетом уникальных особенностей каждого пользователя.<br><br>Постепенно приложение узнает вас все лучше и лучше, но как только вы удалите свою учетную запись, то и эта информация будет удалена. Помимо этого, будет утерят весь прогресс, как и приобретенные подписки, если такие были.</p>
                    <br><b>Теперь, когда мы рассказали вам обо всем, выбор за вами! Перед нажатием на кнопку, взгляните еще раз на милого медитирующего котика...</b>
                    <br><br><ion-button  style="margin-top: 1vh;" @click="eraseThisAccount()" color="danger">УДАЛИТЬ учетную запись НАВСЕГДА</ion-button>
                    <ion-button  style="margin-top: 0.2vh;" @click="getBack()" color="success">Вернуться назад</ion-button>
                </div>
                <div v-if="current_state == 'deleteinprocess'">
                    <p>Ваша учетная запись и связанные с ней данные, идентифицирующие вас, будут удалены. Это займет некоторое время. Пожалуйста, не закрывайте эту страницу.</p>
                </div>
                <div v-if="current_state == 'deleted'">
                    <p>Спасибо за то, что уделили время нашему приложению. Для нас это очень ценно. <br/><br/>Мы хотим стать лучше, поэтому будем признательны, если расскажете нам хотя бы немного о том, что сподвигло вас удалить вашу учетную запись навсегда.</p><br/>
                    <iframe src="https://tally.so/r/wzYWr1?transparentBackground=1" allowtransparency="true" sandbox="allow-scripts allow-same-origin" style="width: 75vw; height: 100vh; background: none transparent;"></iframe>
                </div>
            </div>
            <div v-else>
                <h1 style="margin-top: 1.5vh; text-align: center;">
                    <ion-spinner name="lines-sharp"></ion-spinner>
                </h1>
                <p style="text-align: center; margin-top: 0.3vh;">{{loading_spinner_text}}</p>
            </div>
        </ion-card-content>

    </ion-card>
</template>
  
  
<style scoped></style>

<script>
import {
    defineComponent
} from 'vue';

import test_svg from "../assets/graphics/kitekat-19.svg";

import {
    IonCard, IonCardContent, IonButton, actionSheetController, IonSpinner
} from '@ionic/vue';
export default defineComponent({
    name: 'ExploreContainer',
    components: { IonCard, IonCardContent, IonButton, IonSpinner },
    props: {
        parentPath: String
    },
    data() {
        return {
            current_state: "onboard",
            isAnythingLoadingNow: false,
            loading_spinner_text: "Сейчас вам нужно будет еще раз войти в свою учетную запись",
            svg_photos_array: {
                "graphics/kitekat-7.svg": {
                    src: require("../assets/graphics/kitekat-7.svg")
                },
                "graphics/kitekat-19.svg": {
                    src: require("../assets/graphics/kitekat-19.svg")
                },
                "test": {
                    src: test_svg
                }

            }
        }
    },
    setup() {

        //setup
    },
    watch:{
        $route (to, from){
            if(from.path == "/tabs/auth/almostdone"){
                localStorage.setItem("flag_waitingForAuthPath", "sessionIsDone")
            }
        }
    },
    methods: {
        getBack(){
            this.current_state = "onboard";
        },
        isLocalStorageAvailable(){
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        },
        async askedToStartDeletion() {
            // eslint-disable-next-line
            var parent_this = this;
            const actionSheet = await actionSheetController.create({
                header: 'Вы точно хотите удалить свою учетную запись безвозвратно? Данные будут удалены навсегда.',
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
                
                parent_this.isAnythingLoadingNow = true
                setTimeout(() => {
                    parent_this.initiateDeletion()
                }, 4500);
            }
        },
        async eraseThisAccount() {
            // eslint-disable-next-line
            var parent_this = this;
            const actionSheet = await actionSheetController.create({
                header: 'Сейчас мы отправим запрос на полное удаление вашей учетной записи. Удаление займет менее одной минуты.',
                buttons: [
                    {
                        text: 'Продолжить',
                        role: 'confirm',
                    },
                    {
                        text: 'Отмена',
                        role: 'cancel',
                    },
                ],
            });
            actionSheet.present();

            const { role } = await actionSheet.onWillDismiss();

            if (role === 'confirm') {
                
                this.loading_spinner_text = "Удаление данных"

                this.current_state = "deleteinprocess";
                this.isAnythingLoadingNow = true

                setTimeout(() => {
                    parent_this.current_state = "deleted";
                    parent_this.isAnythingLoadingNow = false;
                }, 7000);

            }
        },
        initiateDeletion() {
            //
            this.current_state = "redirection_for_auth"
            if(this.isLocalStorageAvailable()){
                this.loading_spinner_text = "Ожидание подтверждения"
                localStorage.setItem("flag_waitingForAuthPath", this.parentPath + "")
                this.$router.push({path:'/tabs/auth', replace: false, query: { redirectWithCredentials: this.parentPath }});
            }else{
                this.current_state = "unabletoproceed"
            }
            
        }
    },
    mounted() {

        setInterval(() => {
            if(localStorage.getItem("flag_waitingForAuthPath") == "sessionIsDone"){
                this.current_state = "authorization_confirmed"
                this.isAnythingLoadingNow = false
                localStorage.removeItem("flag_waitingForAuthPath")
            }
        }, 2000);

        // eslint-disable-next-line
        const parent_this = this;


    }
});
</script>

  