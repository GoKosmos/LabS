import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
export default defineConfig({base: '/LabS/', plugins:[tailwindcss()], build:{rollupOptions:{input:{main: resolve(import.meta.dirname, 'index.html'), loolJool: resolve(import.meta.dirname, 'lool-jool/index.html')}}}});
