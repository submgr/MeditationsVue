const config = {
    appId: 'io.ionic.starter',
    appName: 'meditations-ionic-vue',
    webDir: 'dist',
    bundledWebRuntime: false,
    plugins: {
        GoogleAuth: {
            scopes: ['profile', 'email'],
            clientId: '70119537016-fopt4mu69mtdvf4seb12i3drcfa7i41s.apps.googleusercontent.com',
            androidClientId: '70119537016-fopt4mu69mtdvf4seb12i3drcfa7i41s.apps.googleusercontent.com',
            forceCodeForRefreshToken: true,
        },
    },
};
export default config;
