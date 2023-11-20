const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path');

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
    configureWebpack: {
      plugins: [
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