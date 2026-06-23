/**
 * CMS environment flag (front-end side).
 *
 * Reads the same `VITE_SANITY_PROJECT_ID` used by the Sanity client
 * (src/lib/sanity.ts). When unset (the case today — no Sanity project yet),
 * `isSanityConfigured` is `false` and every getter in this folder returns the
 * local static content from `src/lib/content/*` unchanged.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? ''

/**
 * Sanity est lu UNIQUEMENT côté serveur (SSR / loaders).
 *
 * Le dataset « public » n'autorise pas la lecture anonyme (rôles d'accès du
 * projet → docs `omitted: permission`). On lit donc avec un token, qui ne doit
 * jamais partir dans le bundle navigateur. En navigation côté client, les
 * getters retombent sur le contenu statique (identique au contenu publié).
 */
export const isSanityConfigured =
  Boolean(projectId) && typeof window === 'undefined'
