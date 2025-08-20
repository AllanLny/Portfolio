import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Désactivé car nous gérons les routes manuellement avec React Router
// import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    // Désactivé pour éviter les conflits avec notre routage manuel
    // Pages({
    //   dirs: 'src/pages',
    //   extensions: ['jsx', 'tsx']
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': '/src'
    }
  },
  server: {
    // Configuration pour que toutes les routes soient redirigées vers index.html
    host: true,
    port: 3000,
    strictPort: false,
  },
  // Configuration pour les SPA
  base: '/',
  preview: {
    port: 3000
  },
  // Configuration pour la production
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Ajouter d'autres chunks au besoin
        }
      }
    }
  }
});
