import { notFound } from '@tanstack/react-router'

/**
 * Garde de route `beforeLoad` : renvoie un 404 hors développement.
 *
 * Sert à masquer les routes outillage (`/preview/*`, sélecteurs de design) en
 * production tout en les gardant accessibles en `pnpm dev`.
 */
export function devOnly() {
  if (!import.meta.env.DEV) throw notFound()
}
