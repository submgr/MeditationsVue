<template>
    <ion-page>

        <ion-content :fullscreen="true">

            <div v-if="!error">
                <div id="container" :class="{ invisible: paymentform_focused }">

                    <div style="z-index: 0; margin-top: 25vh;">
                        <ion-spinner name="crescent"
                            style="width: 50px; height: 50px; color: rgb(187, 61, 185); opacity: 0.9;"></ion-spinner><br /><br />
                        <strong class="capitalize" style="color: black; opacity: 0.9;">Один момент!</strong>
                        <p @click="goNext('okay', '')">Сейчас все появится</p>
                    </div>
                </div>
                <div style="margin-bottom: -1vw;" :class="{ invisible: !paymentform_focused }">
                    <div style="z-index: 2; margin-top: 1vh; margin-left: 3vw; margin-right: 3vw; width: 94vw; padding-bottom: 5vw;"
                        id="payment-form"></div>
                </div>
            </div>
            <div v-else>
                <div id="container">

                    <div style="z-index: 0; margin-top: 25vh;">
                        <strong class="capitalize" style="color: black; opacity: 0.9;">Ошибка</strong>
                        <p @click="goNext('okay', '')">Что-то пошло не так. Подробнее: {{error_message}}</p>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
    
<script lang="ts">
import {
    defineComponent,
    inject
} from 'vue';

declare const YooMoneyCheckoutWidget;
declare const window: any;

import { IonContent, IonPage, IonSpinner } from '@ionic/vue';
import {
    loadScript
} from "vue-plugin-load-script";

import globaldata from '../../modules/global';

export default defineComponent({
    components: { IonContent, IonPage, IonSpinner },
    data() {
        return {
            id: this.$route.params.id,
            error: false,
            error_message: "",
            paymentform_focused: false
        };
    },
    methods: {
        goNext(status, dataLoad) {

            switch (status) {
                case 'okay':
                    if (sessionStorage) {
                        this.$router.push({ name: 'PaymentIsReadyForActions', params: { data: dataLoad } });
                    } else {
                        this.goNext('error', { message: 'Ваш браузер не поддерживает сессии. Пожалуйста, обновите браузер или воспользуйтесь другим браузером.' });
                    }

                    break;
                case 'error':
                    this.error_message = dataLoad.message;
                    this.error = true;
                    // handle error case
                    break;
                default:
                    // handle default case
                    break;
            }
        }
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this;

        this.$http.get(globaldata.api.hostname + "access/subscribe/init", {
            params: {
                plan: "1month"
            }
        }).then((response) => {
            if(response.data.status == "okay"){
                loadScript("https://yookassa.ru/checkout-widget/v1/checkout-widget.js")
                .then(() => {
                    //here we go!!
                    console.log("loadScript>then:: loaded (okay);")
                    // eslint-disable-next-line
                    const checkout = new window.YooMoneyCheckoutWidget({
                        confirmation_token: response.data.results.confirmation_token, //Токен, который перед проведением оплаты нужно получить от ЮKassa

                        //При необходимости можно изменить цвета виджета, подробные настройки см. в документации
                        customization: {
                            //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
                            colors: {
                                //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля

                                background: "#00000"
                            }
                        },
                        error_callback: function (error) {
                            console.log(error)
                        }
                    })

                    checkout.on('success', () => {
                        //Код, который нужно выполнить после успешной оплаты.
                        this.$router.push({ path: '/tabs/payment/success' });

                        //Удаление инициализированного виджета
                        checkout.destroy();
                    });

                    checkout.on('fail', () => {
                        //Код, который нужно выполнить после неудачной оплаты.

                        //Удаление инициализированного виджета
                        checkout.destroy();
                    });

                    //Отображение платежной формы в контейнере
                    checkout.render('payment-form').then((response) => {
                        parent_this.paymentform_focused = true;
                    });
                })
                .catch((error) => {
                    console.log("loadScript>then:: Failed to fetch script;", error)
                    parent_this.goNext('error', { message: "Не удалось загрузить библиотеку провайдера платежей." });
                });
            }else{
                parent_this.error = true;
                parent_this.error_message = response.data.details;
            }

            //to get app's version: $store.getters.appVersion
        }).catch(function (error) {
            console.log("CATCHED AN ERROR.", error)
        });


    }
});

</script>
    
<style scoped>
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
}

#innercontainer {
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

/* Parent container */
.container {
    position: relative;
}

/* Element to be positioned on top */
#payment-form {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    min-height: 100vh;
}


ion-page {
    --background: rgb(255, 255, 255) !important;
}

ion-content {
    --background: rgb(255, 255, 255) !important;
}
</style>
    