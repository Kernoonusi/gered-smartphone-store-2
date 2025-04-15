import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import i18n from 'laravel-react-i18n/vite';

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.jsx',
      refresh: true,
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler', ReactCompilerConfig],
      },
    }),
    tailwindcss(),
    i18n(),
  ],
  esbuild: {
    jsx: 'automatic',
  },
});
