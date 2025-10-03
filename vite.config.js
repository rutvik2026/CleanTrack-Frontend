import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://cleantrack-9xtg.onrender.com", // remove the trailing /api
        changeOrigin: true,
      },
    },
  },      
  plugins: [react()],
  
});
