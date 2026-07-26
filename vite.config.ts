import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages (proyecto): /muscle-atlas/
// Local / otros hosts: /
const base = process.env.VITE_BASE || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
