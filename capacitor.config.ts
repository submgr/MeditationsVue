import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'meditations-ionic-vue',
  webDir: 'dist',
  bundledWebRuntime: false,
  loggingBehavior: process.env.VITE_FREERASP_ENABLED === 'true' ? "none" : "production",
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '70119537016-51a7o9e68o4e3dhs2vqmg0f006dri9h7.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    CapacitorUpdater: {
      updateUrl: "https://meditations-backend.deqstudio.com/service/updates/availableupdates",
    }
  },
};

export default config;
