/**
 * Pure locale helpers — NO dependency on the `sanity` package.
 *
 * Safe to import from the front-end (TanStack Start / Vite) data layer. The
 * schema object-type definitions that DO depend on `sanity` live in
 * `./i18n.ts`, which must only be imported by the Studio (sanity.config.ts).
 *
 * Localization uses plain localized-field objects `{ fr, en, pt }` (no plugin).
 * FR is the default locale and the only one populated today.
 */
export const LOCALES = ['fr', 'en', 'pt'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'fr'

/** Shape of a localized scalar/text value stored in Sanity and in the seed. */
export type LocalizedString = {
  fr?: string
  en?: string
  pt?: string
}

/** Shape of a localized portable-text value (array of blocks per locale). */
export type LocalizedPortableText = {
  fr?: unknown[]
  en?: unknown[]
  pt?: unknown[]
}

/**
 * Pick the value for `locale`, falling back to `fallback` (default `fr`)
 * then to any present locale, then to an empty string.
 */
export function pickLocale(
  value: LocalizedString | string | undefined | null,
  locale: Locale,
  fallback: Locale = DEFAULT_LOCALE,
): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[locale] || value[fallback] || value.fr || value.en || value.pt || ''
}

/**
 * Pick the portable-text blocks for `locale`, with FR fallback.
 */
export function pickLocaleBlocks(
  value: LocalizedPortableText | undefined | null,
  locale: Locale,
  fallback: Locale = DEFAULT_LOCALE,
): unknown[] {
  if (value == null) return []
  return value[locale] || value[fallback] || value.fr || value.en || value.pt || []
}
