import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Isso faz o Vite escutar todas as interfaces
    port: 5173   // Confirme se é esta a porta
  },
})