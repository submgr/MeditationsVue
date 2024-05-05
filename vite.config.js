import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';
import svgLoader from 'vite-svg-loader'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'

import { dynamicImport } from 'vite-plugin-dynamic-import'

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig({
  assetsInclude: ['**/*.png'],
  plugins: [vue(), svgLoader({
    defaultImport: 'url',
  }), WindiCSS(), ],
  resolve: {
    alias: {
      '@': path.resolve(pathSegments, './src'),
      '@assets': path.resolve(pathSegments, './src/assets'),
      '~': path.resolve(pathSegments, './node_modules'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  }
})