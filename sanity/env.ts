/**
 * Sanity environment configuration for the STUDIO side (sanity.config.ts).
 *
 * The Studio runs through the Sanity CLI / Vite, which exposes env vars on
 * `process.env`. We read the same `VITE_*` names used by the front-end client
 * (src/lib/sanity.ts) so a single set of variables configures both.
 */
export const apiVersion =
  process.env.VITE_SANITY_API_VERSION || '2026-05-01'

export const dataset = process.env.VITE_SANITY_DATASET || 'production'

// Fallback en dur sur le vrai projectId (public) : dans le navigateur du Studio
// (Vite), `process.env.VITE_*` est indisponible — sans ce fallback, le Studio
// retombait sur `'placeholder'` (cf. sanity.config.ts) et l'ajout d'origine CORS
// ciblait un projet inexistant.
export const projectId = process.env.VITE_SANITY_PROJECT_ID || '8zuvflol'

/**
 * `true` once a Sanity project id is provided via env.
 * The data-access layer (src/lib/cms) reads from Sanity when configured, and
 * falls back to the local static content otherwise — so the site stays
 * functional while the Sanity project is being created.
 */
export const isSanityConfigured = Boolean(projectId)
