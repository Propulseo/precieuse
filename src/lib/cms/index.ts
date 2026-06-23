/**
 * CMS data-access layer — public surface.
 *
 * Import typed getters from here. They read from Sanity when configured
 * (`isSanityConfigured`) and fall back to the local static content in
 * `src/lib/content/*` otherwise. Today no Sanity project is configured, so
 * every getter returns the static content unchanged.
 */
export { isSanityConfigured } from './env'
export * from './content'
export { LOCALES, DEFAULT_LOCALE, pickLocale, type Locale } from '../../../sanity/lib/locale'
