/**
 * CMS environment flag (front-end side).
 *
 * Reads the same `VITE_SANITY_PROJECT_ID` used by the Sanity client
 * (src/lib/sanity.ts). When unset (the case today — no Sanity project yet),
 * `isSanityConfigured` is `false` and every getter in this folder returns the
 * local static content from `src/lib/content/*` unchanged.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? ''

export const isSanityConfigured = Boolean(projectId)
