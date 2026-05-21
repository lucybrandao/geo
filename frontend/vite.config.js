import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expõe em 0.0.0.0 para acesso na rede local
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8001', // Vite repassa as chamadas ao Django
    },
  },
})
