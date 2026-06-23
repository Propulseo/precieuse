import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      // cookie : la langue choisie est mémorisée et lue côté serveur (SSR) ;
      // baseLocale (fr) par défaut tant qu'aucun cookie.
      strategy: ['cookie', 'baseLocale'],
    }),
    nitro(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: './server.ts',
        },
      },
    },
  },
})

export default config