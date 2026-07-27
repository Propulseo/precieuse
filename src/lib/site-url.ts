/**
 * Domaine public du site — SOURCE UNIQUE.
 *
 * Sert au canonical, à `og:url` et aux images de partage (`src/lib/seo.ts`,
 * `src/routes/__root.tsx`). Le canonical est le plus sensible : s'il pointe
 * vers l'ancien domaine, Google indexe l'ancienne adresse et ignore la
 * nouvelle, sans le moindre message d'erreur.
 *
 * Bascule vers le domaine définitif : poser `VITE_SITE_URL` sur Vercel puis
 * redéployer — aucune ligne de code à toucher. Attention, les variables
 * `VITE_*` sont figées AU BUILD par Vite : changer la variable sans
 * redéployer ne suffit pas.
 *
 * Restent à basculer à la main le jour J, car ce sont des fichiers statiques :
 * `public/robots.txt` (ligne `Sitemap:`) et `public/sitemap.xml` (19 URLs).
 */

// `vite/client` type les variables VITE_* en `any` : on repasse par `unknown`
// puis on rétrécit, plutôt que de laisser filer un `any`.
const fromEnv: unknown = import.meta.env.VITE_SITE_URL

/** Domaine actuel tant que le domaine définitif n'est pas branché. */
const FALLBACK_URL = 'https://precieuse-five.vercel.app'

/** Sans barre oblique finale : les appelants concatènent des chemins en `/...`. */
export const SITE_URL =
  typeof fromEnv === 'string' && fromEnv.trim().length > 0
    ? fromEnv.trim().replace(/\/+$/, '')
    : FALLBACK_URL
