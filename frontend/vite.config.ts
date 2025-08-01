import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['twitchmarketingsite-production.up.railway.app'],
  },
});
