const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path');

const webpack = require('webpack');
var WebpackObfuscator = require('webpack-obfuscator');

const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"'
        }
      }),
      new ImageMinimizerPlugin({
        deleteOriginalAssets: false,
        minimizer: {
          // Implementation
          implementation: ImageMinimizerPlugin.sharpMinify,
          // Options
          options: {
            encodeOptions: {
              jpeg: {
                quality: 90,
              },
            },
          },
        },
      }),
      // process.env.NODE_ENV !== 'development' ? new WebpackObfuscator({
      //   rotateStringArray: true,
      //   deadCodeInjectionThreshold: 0,
      //   //domainLock: [".xn--80aaafmfwb5a7d2bq4h.xn--p1ai", ".deqstudio.com", ".vercel.app", ".pages.dev", ".localhost"],
      //   //domainLockRedirectUrl: "https://telegra.ph/Sorry-Izvinite-02-07",
      //   log: true,

      // }, []) : false,
    ]
  }
}