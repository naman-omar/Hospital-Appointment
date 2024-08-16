import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure react-spinners is resolved correctly
      'react-spinners': 'react-spinners/lib/esm/index.js',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: '/src/main.jsx',
      },
      external: ['react-spinners'], // Externalize react-spinners
    },
    commonjsOptions: {
      include: [/node_modules/], // Ensure dependencies are processed
    },
  },
  optimizeDeps: {
    include: ['react-spinners'], // Pre-bundle react-spinners
  },
});
