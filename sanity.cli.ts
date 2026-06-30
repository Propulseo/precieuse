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
  // Hôte du Studio déployé → https://precieuse-joaillerie.sanity.studio
  // (« precieuse » seul était déjà pris globalement chez Sanity ; hostname unique)
  studioHost: 'precieuse-joaillerie',
  // Application déployée (évite le prompt d'appId aux prochains `sanity deploy`).
  deployment: { appId: 'qbhxg48x5z8bi7v1jnnfefu3' },
})
