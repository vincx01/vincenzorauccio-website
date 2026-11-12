import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Build statica per Vercel.
 *
 * Il progetto principale usa il plugin Cloudflare e produce anche il Worker
 * in `dist/portfolio`. Vercel ospita qui solo il client React: questa
 * configurazione separata evita di dipendere da workerd o da Wrangler durante
 * la build e lascia intatta la build Cloudflare (`bun run build`).
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist/vercel',
    emptyOutDir: true,
  },
})
