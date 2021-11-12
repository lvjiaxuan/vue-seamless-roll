import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/Seamless.vue'),
      name: 'Seamless',
      fileName: format => `index.${format}.js`,
    },
  },
  plugins: [vue()],
})
