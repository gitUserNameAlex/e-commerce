import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/App': '/src/App',
      '@/components': '/src/components',
      '@/store': '/src/store',
      '@/types': '/src/types',
      '@/config': '/src/config',
      '@/styles': '/src/styles',
    },
  },
});
