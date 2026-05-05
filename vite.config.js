import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Local backend for testing the live-stock computation.
        // target: 'http://localhost:8000',
        // changeOrigin: true,
        // secure: false,
        target: 'https://api.rentangadi.in',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
