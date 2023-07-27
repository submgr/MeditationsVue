import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'meditations-ionic-vue',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: '33960040607-1es2ealj7oevideh0ugqovec1n3vi4q5.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
