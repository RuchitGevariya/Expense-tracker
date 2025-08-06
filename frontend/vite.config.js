import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },server: {
    proxy: {
      '/api': {
        target: 'https://expense-tracker-wjih.onrender.com', // your backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
