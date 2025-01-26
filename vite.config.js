import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Make sure this points to the postcss.config.js
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'process.env': process.env,
  },
});