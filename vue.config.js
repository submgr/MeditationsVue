const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path');

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.delete('type');
    svgRule.delete('generator');
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('svg-vue3-loader')
      .loader('svg-vue3-loader');
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