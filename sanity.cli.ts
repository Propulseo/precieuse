import { defineCliConfig } from 'sanity/cli'

/**
 * Config CLI Sanity (utilisée par `sanity dev` / `sanity deploy`).
 * Distincte de `sanity.config.ts` (qui définit le Studio lui-même).
 * projectId public — repris du .env, avec fallback en dur.
 */
const projectId = process.env.VITE_SANITY_PROJECT_ID || '8zuvflol'
const dataset = process.env.VITE_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  // Hôte du Studio déployé → https://precieuse.sanity.studio
  // (doit être unique ; si pris, `sanity deploy` proposera d'en choisir un autre)
  studioHost: 'precieuse',
})
