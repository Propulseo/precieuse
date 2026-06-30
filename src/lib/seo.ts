/**
 * Helper SEO : construit les balises `<head>` (title, description, Open Graph,
 * Twitter Card, canonical) pour le `head()` d'une route TanStack.
 *
 * Les pages partagent le même URL quelle que soit la langue (Paraglide en mode
 * cookie, sans préfixe `/en/`) : le canonical pointe donc vers le chemin sur le
 * domaine de production, et `og:locale` suit la langue active.
 */
import { getLocale } from '#/paraglide/runtime'

const SITE_NAME = 'Précieuse'
/** Domaine public canonique (pas de domaine custom à ce jour). */
const BASE_URL = 'https://precieuse-five.vercel.app'
const DEFAULT_OG_IMAGE = `${BASE_URL}/picto.png`

const OG_LOCALE: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  pt: 'pt_PT',
}

export interface SeoInput {
  title: string
  description: string
  /** Chemin sur le site, ex. `/collection` — sert au canonical et à `og:url`. */
  path?: string
  /** Image des cartes sociales (URL absolue ou relative au site). */
  image?: string
  type?: 'website' | 'article'
}

/** Aplatit les retours-ligne (certains titres en contiennent) pour le `<head>`. */
function flatten(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function absolute(url: string): string {
  return url.startsWith('http') ? url : `${BASE_URL}${url}`
}

/**
 * Renvoie l'objet `{ meta, links }` attendu par `head()`. TanStack déduplique
 * les balises par `title` / `name` / `property` : une route écrase donc les
 * valeurs globales posées dans `__root`.
 */
export function seo({
  title,
  description,
  path,
  image,
  type = 'website',
}: SeoInput) {
  const t = flatten(title)
  const d = flatten(description)
  const img = absolute(image ?? DEFAULT_OG_IMAGE)
  const url = path ? `${BASE_URL}${path}` : undefined

  const meta = [
    { title: t },
    { name: 'description', content: d },
    { property: 'og:title', content: t },
    { property: 'og:description', content: d },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: OG_LOCALE[getLocale()] ?? 'fr_FR' },
    { property: 'og:image', content: img },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t },
    { name: 'twitter:description', content: d },
    { name: 'twitter:image', content: img },
    ...(url ? [{ property: 'og:url', content: url }] : []),
  ]

  return {
    meta,
    links: url ? [{ rel: 'canonical', href: url }] : [],
  }
}
