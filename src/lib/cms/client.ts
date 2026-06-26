import { createClient  } from '@sanity/client'
import type {SanityClient} from '@sanity/client';

import { isSanityConfigured } from './env'

/**
 * Guarded Sanity read client for the data layer.
 *
 * `@sanity/client`'s `createClient` THROWS at construction when `projectId` is
 * empty ("Configuration must contain `projectId`"). The shared
 * `src/lib/sanity.ts` client therefore cannot be imported while no project is
 * configured — doing so crashes SSR. So we create the client lazily here and
 * expose `null` (typed as a client so call sites stay clean) until configured.
 *
 * Every getter in `content.ts` short-circuits via `isSanityConfigured` before
 * touching this, so the `null` is never dereferenced today.
 */
// Token de lecture — SERVEUR UNIQUEMENT (jamais préfixé VITE_, donc absent du
// bundle navigateur). On réutilise le token d'écriture en dev ; en prod, définir
// un token « Viewer » dédié (SANITY_API_READ_TOKEN) côté serveur (Vercel).
const readToken =
  typeof process !== 'undefined'
    ? process.env.SANITY_API_READ_TOKEN || process.env.SANITY_WRITE_TOKEN
    : undefined

export const cmsClient: SanityClient = isSanityConfigured
  ? createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? '2026-05-01',
      // Lectures fraîches (les modifs d'Emeline apparaissent tout de suite) et
      // contenu PUBLIÉ seulement (pas les brouillons en cours).
      useCdn: false,
      perspective: 'published',
      token: readToken,
    })
  : (null as unknown as SanityClient)
