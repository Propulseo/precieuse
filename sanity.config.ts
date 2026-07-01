import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { precieuseTheme } from './src/components/studio/theme'
import { StudioLogo } from './src/components/studio/StudioLogo'

/**
 * Standalone Sanity Studio configuration.
 *
 * Run with:  pnpm dlx sanity@latest dev   (or: npx sanity dev)
 *
 * This file is intentionally NOT imported anywhere in the TanStack Start app.
 * Sanity Studio is client-only (it relies on React context and browser APIs),
 * so embedding it at a `/studio` route would risk SSR/build evaluation. The
 * embedded route is therefore DEFERRED — see the data layer in src/lib/cms,
 * which is fully wired and only needs a project id + token to go live.
 *
 * `placeholder` keeps the config loadable before the real project exists.
 */
export default defineConfig({
  basePath: '/studio',
  title: 'Précieuse',
  projectId: projectId || 'placeholder',
  dataset,
  theme: precieuseTheme,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  studio: {
    components: { logo: StudioLogo },
  },
})
