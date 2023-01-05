import { defineConfig } from 'vite'
import { resolve } from 'path'

import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://localhost:8080/',

  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,

    hmr: {
      host: 'localhost',
      protocol: 'wss',
      port: 8080
    }
  },

  plugins: [
    basicSsl(),
    vue()
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
