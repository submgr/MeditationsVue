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
        component: () => import('@/views/HomeScreen.vue')
      },
      {
        path: 'diagnostics/emotionalstate',
        component: () => import('@/views/diagnostics/EmotionalState.vue')
      },
      {
        path: 'meditation/prepare',
        component: () => import('@/views/meditation/PrepareScreen.vue')
      },
      {
        path: 'system/unavailable',
        component: () => import('@/views/system/UnavailableScreen.vue')
      },
      {
        path: 'system/updaterequired',
        component: () => import('@/views/system/UpdateRequired.vue')
      },
      {
        name: 'meditation/play',
        path: 'meditation/play',
        component: () => import('@/views/meditation/PlayerScreen.vue'),
        props: {
          default: true,
        },
      },
      {
        name: 'meditation/playnonprogressive',
        path: 'meditation/playnonprogressive',
        component: () => import('@/views/meditation/NonProgressivePlayerScreen.vue'),
        props: {
          default: true,
        },
      },
      {
        path: 'meditation/finished',
        component: () => import('@/views/meditation/OnFinishScreen.vue')
      },
      {
        path: 'relaxation',
        redirect: '/tabs/relaxation/info'
      },
      {
        path: 'relaxation/info',
        component: () => import('@/views/relaxation/InfoScreen.vue')
      },
      {
        path: 'relaxation/session',
        component: () => import('@/views/relaxation/SessionScreen.vue')
      },
      {
        path: 'relaxation/finished',
        component: () => import('@/views/relaxation/OnFinishScreen.vue')
      },
      {
        path: 'myself/overview',
        component: () => import('@/views/myself/MyselfOverview.vue')
      },
      {
        name: 'read/youshouldknow',
        path: 'read/youshouldknow',
        component: () => import('@/views/read/YouShouldKnow.vue')
      },
      {
        path: 'read/viewpost',
        component: () => import('@/views/read/RenderRemoteContent.vue')
      },
      {
        path: '3rd-embed/deleteaccount',
        component: () => import('@/views/3rd-embed/DeleteAccount.vue')
      },
      {
        path: 'support/main',
        component: () => import('@/views/support/MainPage.vue')
      },
      {
        path: 'support/chat',
        component: () => import('@/views/support/SupportProvider.vue')
      },
      {
        path: 'settings/main',
        component: () => import('@/views/settings/MainPage.vue')
      },
      {
        path: 'settings/deleteaccount',
        component: () => import('@/views/settings/DeleteAccount.vue')
      },
      {
        path: 'music/main',
        component: () => import('@/views/music/MusicMainScreen.vue')
      },
      {
        path: 'sleep/main',
        component: () => import('@/views/sleep/SleepMainScreen.vue')
      },
      {
        path: 'emotions/smile',
        component: () => import('@/views/emotions/MakeSmilePhoto.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
