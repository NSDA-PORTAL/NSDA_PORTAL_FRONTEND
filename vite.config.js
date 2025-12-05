import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. Import the new Tailwind CSS Vite plugin
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
],
})