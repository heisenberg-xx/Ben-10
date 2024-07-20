import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/ben10": "https://ben-10-server.vercel.app",
    }
  }
})
