import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': '/src'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'background': ['/src/utils/BlurGradientBg.js']
        }
      }
    }
  },
  server: {
    host: true,
    port: 8080,
    strictPort: false,
  },
  base: '/',
  preview: {
    port: 8080
  },
// ...existing code...
});
