import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    // Fix timeout issues
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000

  },
})
