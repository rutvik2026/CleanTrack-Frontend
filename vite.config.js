import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // remove the trailing /api
        changeOrigin: true,
      },
    },
  },      
  plugins: [react()],
});
