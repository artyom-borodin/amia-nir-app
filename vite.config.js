import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const DEV_PORT = Number(env.VITE_DEV_PORT) || 5173
  const BASE_PATH = env.VITE_BASE_PATH || '/'
  const HOST = env.VITE_HOST || '0.0.0.0'
  const API_PREFIX = env.VITE_API_PREFIX || '/api'
  const BACKEND_TARGET = env.VITE_BACKEND_TARGET || 'http://localhost:8000'
  return {
    base: BASE_PATH,
    plugins: [vue()],
    server: {
      host: HOST,
      port: DEV_PORT,
      allowedHosts: true,
      proxy: {
        [API_PREFIX]: {
          target: BACKEND_TARGET,
          changeOrigin: true
        }
      }
    },
    preview: {
      port: DEV_PORT
    }
  }
})
