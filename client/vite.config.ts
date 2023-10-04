import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
process.env = { ...process.env, ...loadEnv(process.env.NODE_ENV, process.cwd()) }

export default defineConfig({
  build: {
    minify: true,
  },
  server: {
    host: true,
    port: Number(process.env?.VITE_DEVELOPMENT_PORT || 5173),
    hmr: process.env.NODE_ENV !== 'production',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: false,
  },
  preview: {
    port: Number(process.env?.VITE_PRODUCTION_PORT || 4173),
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/assets/css/quasar-variables.sass',
    }),
    eslintPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
