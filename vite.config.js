import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  theme: {
  fontFamily: {
    sans: ["Inter", "sans-serif"],
  },
}

})