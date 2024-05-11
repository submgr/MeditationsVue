import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';
import svgLoader from 'vite-svg-loader'
import WindiCSS from 'vite-plugin-windicss'

import viteImagemin from '@vheemstra/vite-plugin-imagemin'

// The minifiers you want to use:
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminWebp from 'imagemin-webp'

import { resolve } from 'path'

import { dynamicImport } from 'vite-plugin-dynamic-import'

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig({
  assetsInclude: ['**/*.png'],
  plugins: [vue(), svgLoader({
    defaultImport: 'url',
  }), WindiCSS(),

  viteImagemin({
    plugins: {
      jpg: imageminMozjpeg(),
    },
    makeWebp: {
      plugins: {
        jpg: imageminWebp(),
        png: imageminWebp()
      },
    },
  }),

  // ViteImageOptimizer({
  //   /* pass your config */
  //   jpeg: {
  //     quality: 80,
  //     force: false
  //   },
  //   png: {
  //     quality: 83,
  //     force: false,
  //     compressionLevel: 9
  //   },
  //   jpg: {
  //     // https://sharp.pixelplumbing.com/api-output#jpeg
  //     quality: 80,
  //   },
  //   tiff: {
  //     // https://sharp.pixelplumbing.com/api-output#tiff
  //     quality: 80,
  //   },
  //   webp: {
  //     // https://sharp.pixelplumbing.com/api-output#webp
  //     lossless: true,
  //   },
  //   avif: {
  //     // https://sharp.pixelplumbing.com/api-output#avif
  //     lossless: true,
  //   },
  //   logStats: true
  // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(pathSegments, './src'),
      '@assets': path.resolve(pathSegments, './src/assets'),
      '~': path.resolve(pathSegments, './node_modules'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  }
})