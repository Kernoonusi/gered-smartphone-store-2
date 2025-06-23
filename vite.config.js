import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import compression, { defineAlgorithm } from 'vite-plugin-compression2';

const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.jsx',
      refresh: true,
    }),
    compression({
      algorithms: [defineAlgorithm('gz', { level: 9 }), defineAlgorithm('br', { level: 11 })],
      threshold: 10240, // минимальный размер файла в байтах для сжатия (10 KiB)
      deleteOriginFile: false, // оставить оригинальные файлы
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler', ReactCompilerConfig],
      },
    }),
    tailwindcss(),
    i18n(),
  ],
});
