import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  plugins: [
    solidPlugin(),
  ],
});
