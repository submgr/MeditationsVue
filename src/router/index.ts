import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/HelloScreen.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/hello'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'hello',
        component: () => import('@/views/HelloScreen.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'onboarding',
        component: () => import('@/views/AppOnboarding.vue')
      },
      {
        path: 'auth',
        component: () => import('@/views/auth/AuthMain.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: 'auth/email',
        component: () => import('@/views/auth/AuthEmail.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: 'auth/anonymous',
        component: () => import('@/views/auth/Anonymous.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: 'auth/loggedOut',
        component: () => import('@/views/auth/LoggedOut.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: 'auth/almostdone',
        component: () => import('@/views/auth/AlmostDone.vue'),
        props: true,
        name: "auth/almostdone",
        meta: { transition: 'slide-left' },
      },
      {
        path: 'sorry',
        component: () => import('@/views/SplashSorry.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/HomeScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'diagnostics/emotionalstate',
        component: () => import('@/views/diagnostics/EmotionalState.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'meditation/prepare',
        component: () => import('@/views/meditation/PrepareScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'system/unavailable',
        component: () => import('@/views/system/UnavailableScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'system/updaterequired',
        component: () => import('@/views/system/UpdateRequired.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        name: 'meditation/play',
        path: 'meditation/play',
        component: () => import('@/views/meditation/PlayerScreen.vue'),
        meta: { transition: 'slide-down' },
        props: {
          default: true,
        },
      },
      {
        path: 'meditation/main',
        component: () => import('@/views/meditation/MainScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        name: 'meditation/playnonprogressive',
        path: 'meditation/playnonprogressive',
        component: () => import('@/views/meditation/NonProgressivePlayerScreen.vue'),
        meta: { transition: 'slide-down' },
        props: {
          default: true,
        },
      },
      {
        path: 'meditation/finished',
        component: () => import('@/views/meditation/OnFinishScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'relaxation',
        redirect: '/tabs/relaxation/info',
        meta: { transition: 'slide-down' },
      },
      {
        path: 'relaxation/info',
        component: () => import('@/views/relaxation/InfoScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'relaxation/session',
        component: () => import('@/views/relaxation/SessionScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'relaxation/finished',
        component: () => import('@/views/relaxation/OnFinishScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'myself/overview',
        component: () => import('@/views/myself/MyselfOverview.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'myself/settings',
        component: () => import('@/views/myself/SettingsScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        name: 'read/youshouldknow',
        path: 'read/youshouldknow',
        component: () => import('@/views/read/YouShouldKnow.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'read/viewpost',
        component: () => import('@/views/read/RenderRemoteContent.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: '3rd-embed/deleteaccount',
        component: () => import('@/views/3rd-embed/DeleteAccount.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'support/main',
        component: () => import('@/views/support/MainPage.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'support/chat',
        component: () => import('@/views/support/SupportProvider.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'settings/main',
        component: () => import('@/views/settings/MainPage.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'settings/deleteaccount',
        component: () => import('@/views/settings/DeleteAccount.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'music/main',
        component: () => import('@/views/music/MusicMainScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'sleep/main',
        component: () => import('@/views/sleep/SleepMainScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'emotions/smile',
        component: () => import('@/views/emotions/MakeSmilePhoto.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'research/takequiz',
        component: () => import('@/views/research/QuizTake.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'payment/main',
        component: () => import('@/views/payment/PaymentScreen.vue'),
        meta: { transition: 'slide-down' },
      },
      {
        path: 'payment/success',
        component: () => import('@/views/payment/PaymentSuccess.vue'),
        meta: { transition: 'slide-down' },
      },
    ]
  }
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),  IT WORKED WHEN WE USED VUE CLI
  history: createWebHistory('/'), // IT WORKS WITH VITE
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      console.log("Loading the next page...");
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  console.log("Loaded the next (current) page.");
})

export default router
