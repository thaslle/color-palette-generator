import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
    ],
  },
})

