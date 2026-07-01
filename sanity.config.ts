import { frFRLocale } from '@sanity/locale-fr-fr'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { precieuseTheme } from './src/components/studio/theme'
import { StudioLogo } from './src/components/studio/StudioLogo'
import { structure } from './src/components/studio/structure'
import { singletonDocumentActions, singletonNewDocumentOptions } from './src/components/studio/singletons'

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
  plugins: [structureTool({ structure }), frFRLocale()],
  studio: {
    components: { logo: StudioLogo },
  },
  document: {
    actions: singletonDocumentActions,
    newDocumentOptions: singletonNewDocumentOptions,
  },
})
