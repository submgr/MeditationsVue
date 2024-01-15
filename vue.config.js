const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path');

const webpack = require('webpack');

const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

// vue.config.js
module.exports = {
  publicPath: '',
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
      })
    ]
  }
}