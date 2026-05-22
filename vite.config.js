import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        certificate: resolve(__dirname, 'certificate.html'),
        badges: resolve(__dirname, 'badges.html'),
        extracurricular: resolve(__dirname, 'extracurricular.html'),
        projects: resolve(__dirname, 'projects.html'),
      },
    },
  },
});
