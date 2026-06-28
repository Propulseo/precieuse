/**
 * Data-access layer (CMS).
 *
 * Each getter returns Sanity data when a project is configured
 * (`isSanityConfigured`), otherwise the local static content from
 * `src/lib/content/*` — the source of truth today (already Bordeaux-correct).
 * Routes/components can import from here so they never branch on the data
 * source themselves.
 *
 * The returned shapes are EXACTLY the current static types (Product, Matiere,
 * Article, …). They are monolingual `string` today; the Sanity branch resolves
 * each localized field down to a single locale (FR by default) via `pickLocale`
 * so the rest of the app stays source-agnostic and behavior is unchanged.
 *
 * NOTE: the Sanity branch is wired but untested end-to-end (no project exists
 * yet). GROQ projections are shaped to match the static types; image fields are
 * projected to a string URL via the asset URL. Because `isSanityConfigured` is
 * `false` today, every getter short-circuits to the static fallback and the
 * Sanity branch is never reached. Final verification happens once a project
 * id + token are provided.
 */
import { cmsClient as sanity } from './client'
import { isSanityConfigured } from './env'
import {
  DEFAULT_LOCALE,
  pickLocale,
  pickLocaleBlocks
  
} from '../../../sanity/lib/locale'
import type {Locale} from '../../../sanity/lib/locale';

import { PRODUCTS  } from '../content/products'
import type {Product} from '../content/products';
import { MATIERES  } from '../content/matieres'
import type {Matiere} from '../content/matieres';
import { ARTICLES, CATEGORIES  } from '../content/carnet'
import type {Article} from '../content/carnet';
import { LETTRES  } from '../content/lettres'
import type {Lettre} from '../content/lettres';
import { ETABLI_STEPS  } from '../content/etabli'
import type {EtabliStep} from '../content/etabli';
import { SITE, BESPOKE_PROCESS  } from '../content/site'
import type {ProcessStep} from '../content/site';
import {
  METAMORPHOSE,
  PROMESSES,
  CREATION_TYPES,
  BUDGETS
  
} from '../content/sur-mesure'
import type {MetamorphoseStep} from '../content/sur-mesure';
import { FOOTER_DATA } from '../content/footer'
import { getStaticLegal } from '../content/legal'

/**
 * GROQ projection for a localized image: asset URL + localized alt + hotspot
 * (point focal). Le hotspot pilote `object-position` côté front (cf.
 * `hotspotToPosition`) — Emeline le règle visuellement dans le Studio.
 */
const IMAGE_FIELDS = `"image": image.asset->url, "imageAlt": image.alt, "imageHotspot": image.hotspot`

/** Convertit un hotspot Sanity {x,y ∈ 0–1} en `object-position` CSS, sinon undefined (centre). */
function hotspotToPosition(h: unknown): string | undefined {
  if (h && typeof h === 'object') {
    const { x, y } = h as { x?: number; y?: number }
    if (typeof x === 'number' && typeof y === 'number') {
      return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`
    }
  }
  return undefined
}

/**
 * Lecture Sanity tolérante aux pannes. Renvoie `null` au lieu de propager si la
 * requête échoue (token absent/invalide sur le dataset privé, réseau, Sanity HS).
 * Chaque getter teste déjà `!data` et retombe sur son contenu statique, donc une
 * défaillance CMS dégrade proprement vers le statique au lieu de renvoyer une 500
 * (NFR perf/fiabilité — le site marketing ne doit jamais tomber à cause du CMS).
 * N'est appelé qu'après le garde `isSanityConfigured`, donc `sanity` est non-null.
 */
async function cmsFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  try {
    return await sanity.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[cms] lecture Sanity échouée — repli sur le contenu statique:', err)
    return null
  }
}

// ---------------------------------------------------------------------------
// Collection — pièces
// ---------------------------------------------------------------------------

export async function getProducts(locale: Locale = DEFAULT_LOCALE): Promise<Product[]> {
  if (!isSanityConfigured) return PRODUCTS
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "piece"] | order(order asc){
      "slug": slug.current, name, tagline, priceLabel, description,
      materials, story, ${IMAGE_FIELDS}
    }`,
  )
  if (!data?.length) return PRODUCTS
  return data.map((d) => ({
    slug: String(d.slug ?? ''),
    name: String(d.name ?? ''),
    tagline: pickLocale(d.tagline as never, locale),
    price: pickLocale(d.priceLabel as never, locale) || 'Sur devis',
    description: pickLocale(d.description as never, locale),
    materials: pickLocale(d.materials as never, locale),
    story: pickLocale(d.story as never, locale),
    image: String(d.image ?? ''),
    imageAlt: pickLocale(d.imageAlt as never, locale),
    // Point focal piloté par le hotspot Sanity (réglé par Emeline dans le Studio).
    imagePosition: hotspotToPosition(d.imageHotspot),
  }))
}

export async function getProduct(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Product | undefined> {
  const products = await getProducts(locale)
  return products.find((p) => p.slug === slug)
}

// ---------------------------------------------------------------------------
// Matières
// ---------------------------------------------------------------------------

export async function getMatieres(locale: Locale = DEFAULT_LOCALE): Promise<Matiere[]> {
  if (!isSanityConfigured) return MATIERES
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "matiere"] | order(order asc){
      "slug": slug.current, nom, sousTitre, description,
      ${IMAGE_FIELDS}, annotationCaveat, page
    }`,
  )
  if (!data?.length) return MATIERES
  return data.map((d) => ({
    slug: String(d.slug ?? ''),
    nom: String(d.nom ?? ''),
    sous_titre: pickLocale(d.sousTitre as never, locale),
    description_courte: pickLocale(d.description as never, locale),
    image: String(d.image ?? ''),
    image_alt: pickLocale(d.imageAlt as never, locale),
    imagePosition: hotspotToPosition(d.imageHotspot),
    annotation_caveat: pickLocale(d.annotationCaveat as never, locale),
    page: String(d.page ?? ''),
  }))
}

// ---------------------------------------------------------------------------
// Carnet — articles
// ---------------------------------------------------------------------------

export async function getArticles(locale: Locale = DEFAULT_LOCALE): Promise<Article[]> {
  if (!isSanityConfigured) return ARTICLES
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "article"] | order(order asc){
      "slug": slug.current, title, excerpt, category, date, readTime,
      ${IMAGE_FIELDS}, featured
    }`,
  )
  if (!data?.length) return ARTICLES
  return data.map((d) => ({
    slug: String(d.slug ?? ''),
    title: pickLocale(d.title as never, locale),
    excerpt: pickLocale(d.excerpt as never, locale),
    category: String(d.category ?? ''),
    date: String(d.date ?? ''),
    readTime: String(d.readTime ?? ''),
    image: String(d.image ?? ''),
    imageAlt: pickLocale(d.imageAlt as never, locale),
    imagePosition: hotspotToPosition(d.imageHotspot),
    featured: Boolean(d.featured),
  }))
}

export function getCarnetCategories(): typeof CATEGORIES {
  return CATEGORIES
}

/**
 * Article unique (métadonnées + corps Portable Text) par slug, ou `undefined`
 * si aucun article ne correspond. Les métadonnées proviennent de `getArticles`
 * (statique ou Sanity) ; le corps `body` n'est récupéré qu'ici (la liste ne le
 * projette pas, pour rester légère). `body` reste vide tant que Sanity n'est pas
 * branché ou que l'article n'a pas encore de contenu rédigé.
 */
export async function getArticle(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Article | undefined> {
  const article = (await getArticles(locale)).find((a) => a.slug === slug)
  if (!article) return undefined
  if (!isSanityConfigured) return article
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "article" && slug.current == $slug][0]{ body }`,
    { slug },
  )
  const body = data ? pickLocaleBlocks(data.body as never, locale) : []
  return { ...article, body: body.length ? body : undefined }
}

// ---------------------------------------------------------------------------
// Témoignages (lettres)
// ---------------------------------------------------------------------------

export async function getLettres(locale: Locale = DEFAULT_LOCALE): Promise<Lettre[]> {
  if (!isSanityConfigured) return LETTRES
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "temoignage"] | order(order asc){
      citation, auteur, initiale, ville, date, piece
    }`,
  )
  if (!data?.length) return LETTRES
  return data.map((d) => ({
    citation: pickLocale(d.citation as never, locale),
    auteur: String(d.auteur ?? ''),
    initiale: String(d.initiale ?? ''),
    ville: String(d.ville ?? ''),
    date: String(d.date ?? ''),
    piece: pickLocale(d.piece as never, locale),
  }))
}

// ---------------------------------------------------------------------------
// Établi (étapes atelier)
// ---------------------------------------------------------------------------

export async function getEtabliSteps(
  locale: Locale = DEFAULT_LOCALE,
): Promise<EtabliStep[]> {
  if (!isSanityConfigured) return ETABLI_STEPS
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "etapeEtabli"] | order(index asc){
      roman, index, title, annotation, detail, ${IMAGE_FIELDS}
    }`,
  )
  if (!data?.length) return ETABLI_STEPS
  return data.map((d) => ({
    roman: String(d.roman ?? ''),
    index: Number(d.index ?? 0),
    title: pickLocale(d.title as never, locale),
    annotation: pickLocale(d.annotation as never, locale),
    detail: pickLocale(d.detail as never, locale),
    image: String(d.image ?? ''),
    imageAlt: pickLocale(d.imageAlt as never, locale),
    imagePosition: hotspotToPosition(d.imageHotspot),
  }))
}

// ---------------------------------------------------------------------------
// Parcours sur-mesure (process)
// ---------------------------------------------------------------------------

export async function getBespokeProcess(
  locale: Locale = DEFAULT_LOCALE,
): Promise<ProcessStep[]> {
  if (!isSanityConfigured) return BESPOKE_PROCESS
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "etapeSurMesure"] | order(number asc){ number, title, description }`,
  )
  if (!data?.length) return BESPOKE_PROCESS
  return data.map((d) => ({
    number: String(d.number ?? ''),
    title: pickLocale(d.title as never, locale),
    description: pickLocale(d.description as never, locale),
  }))
}

// ---------------------------------------------------------------------------
// Page sur-mesure — métamorphose + promesses
// ---------------------------------------------------------------------------

export async function getMetamorphose(
  locale: Locale = DEFAULT_LOCALE,
): Promise<MetamorphoseStep[]> {
  if (!isSanityConfigured) return METAMORPHOSE
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "surMesurePage"][0]{
      metamorphose[]{ roman, title, annotation, detail, ${IMAGE_FIELDS} }
    }`,
  )
  const items = (data?.metamorphose as Array<Record<string, unknown>> | undefined) ?? []
  if (!items.length) return METAMORPHOSE
  return items.map((d) => ({
    roman: String(d.roman ?? ''),
    title: pickLocale(d.title as never, locale),
    annotation: pickLocale(d.annotation as never, locale),
    detail: pickLocale(d.detail as never, locale),
    image: String(d.image ?? ''),
    imageAlt: pickLocale(d.imageAlt as never, locale),
    imagePosition: hotspotToPosition(d.imageHotspot),
  }))
}

export async function getPromesses(
  locale: Locale = DEFAULT_LOCALE,
): Promise<typeof PROMESSES> {
  if (!isSanityConfigured) return PROMESSES
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "surMesurePage"][0]{
      promesses[]{ titre, detail, ${IMAGE_FIELDS} }
    }`,
  )
  const items = (data?.promesses as Array<Record<string, unknown>> | undefined) ?? []
  if (!items.length) return PROMESSES
  return items.map((d) => ({
    titre: pickLocale(d.titre as never, locale),
    detail: pickLocale(d.detail as never, locale),
    image: String(d.image ?? ''),
    imageAlt: pickLocale(d.imageAlt as never, locale),
  }))
}

/** Form option lists are structural, not editorial — always local. */
export function getCreationTypes(): typeof CREATION_TYPES {
  return CREATION_TYPES
}

export function getBudgets(): typeof BUDGETS {
  return BUDGETS
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export async function getSite(locale: Locale = DEFAULT_LOCALE): Promise<typeof SITE> {
  if (!isSanityConfigured) return SITE
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "siteSettings"][0]{
      brand, baseline, email, whatsapp, instagram, address, hours
    }`,
  )
  if (!data) return SITE
  const address = (data.address as Record<string, unknown> | undefined) ?? {}
  return {
    brand: String(data.brand ?? SITE.brand),
    baseline: pickLocale(data.baseline as never, locale) || SITE.baseline,
    email: String(data.email ?? SITE.email),
    whatsapp: String(data.whatsapp ?? SITE.whatsapp),
    instagram: String(data.instagram ?? SITE.instagram),
    address: {
      street: String(address.street ?? SITE.address.street),
      zip: String(address.zip ?? SITE.address.zip),
      city: String(address.city ?? SITE.address.city),
      country: String(address.country ?? SITE.address.country),
    },
    hours: pickLocale(data.hours as never, locale) || SITE.hours,
  } as typeof SITE
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/** Contenu footer piloté par Emeline : réseaux sociaux + email (neutres en langue). */
export type FooterCms = { social: typeof FOOTER_DATA.social; email: string }

/**
 * Renvoie les réseaux sociaux + l'email du footer depuis Sanity, ou `null` si
 * non configuré / document absent. Volontairement limité à ces deux champs
 * (contenu qui change vraiment et indépendant de la langue) : les libellés de
 * navigation, la signature et le copyright restent gérés par Paraglide (traduits
 * FR/EN/PT) pour éviter toute régression i18n, et le crédit agence reste figé.
 */
export async function getFooter(): Promise<FooterCms | null> {
  if (!isSanityConfigured) return null
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "footer"][0]{ social[]{ label, handle, href }, email }`,
  )
  if (!data) return null
  return {
    social: ((data.social as Array<Record<string, unknown>> | undefined) ?? []).map((s) => ({
      label: String(s.label ?? ''),
      handle: String(s.handle ?? ''),
      href: String(s.href ?? ''),
    })),
    email: String(data.email ?? FOOTER_DATA.email),
  }
}

// ---------------------------------------------------------------------------
// Pages légales (mentions légales, confidentialité, CGV)
// ---------------------------------------------------------------------------

/** Contenu d'une page légale résolu pour une locale. `body` = blocs Portable Text. */
export type LegalContent = { title: string; body: unknown[] }

/**
 * Renvoie le contenu Sanity d'une page légale par slug, ou `null` si Sanity
 * n'est pas configuré / le document n'existe pas. Les routes affichent alors un
 * repli (titre Paraglide + message « en cours de rédaction »).
 */
export async function getLegalPage(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<LegalContent | null> {
  const fallback = getStaticLegal(slug)
  const staticContent: LegalContent | null = fallback
    ? { title: fallback.title, body: fallback.body }
    : null
  if (!isSanityConfigured) return staticContent
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "legalPage" && slug.current == $slug][0]{ title, body }`,
    { slug },
  )
  if (!data) return staticContent
  // Sanity prime, mais on retombe sur le contenu statique champ par champ s'il est vide.
  const body = pickLocaleBlocks(data.body as never, locale)
  return {
    title: pickLocale(data.title as never, locale) || fallback?.title || '',
    body: body.length ? body : (fallback?.body ?? []),
  }
}

// ---------------------------------------------------------------------------
// Page Créatrice ("À propos")
// ---------------------------------------------------------------------------

export type CreatriceImage = { url: string; alt: string; position?: string }
export type CreatriceSection = {
  overline: string
  title: string
  body: string[]
  image: CreatriceImage
}
export type CreatriceContent = {
  overline: string
  title: string
  intro: string
  portrait: CreatriceImage
  sections: CreatriceSection[]
  quote: string
}

/**
 * Contenu Sanity de la page Créatrice, ou `null` si non configuré / absent —
 * la route retombe alors sur sa version statique (Paraglide). Dès qu'Emeline
 * remplit le document, son storytelling + ses photos priment.
 */
export async function getCreatrice(
  locale: Locale = DEFAULT_LOCALE,
): Promise<CreatriceContent | null> {
  if (!isSanityConfigured) return null
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "creatricePage"][0]{
      overline, title, intro,
      "portrait": portrait.asset->url, "portraitAlt": portrait.alt, "portraitHotspot": portrait.hotspot,
      sections[]{
        overline, title, body,
        "image": image.asset->url, "imageAlt": image.alt, "imageHotspot": image.hotspot
      },
      quote
    }`,
  )
  if (!data) return null
  const sections = ((data.sections as Array<Record<string, unknown>> | undefined) ?? []).map((s) => ({
    overline: pickLocale(s.overline as never, locale),
    title: pickLocale(s.title as never, locale),
    body: ((s.body as Array<unknown> | undefined) ?? [])
      .map((b) => pickLocale(b as never, locale))
      .filter(Boolean),
    image: {
      url: String(s.image ?? ''),
      alt: pickLocale(s.imageAlt as never, locale),
      position: hotspotToPosition(s.imageHotspot),
    },
  }))
  return {
    overline: pickLocale(data.overline as never, locale),
    title: pickLocale(data.title as never, locale),
    intro: pickLocale(data.intro as never, locale),
    portrait: {
      url: String(data.portrait ?? ''),
      alt: pickLocale(data.portraitAlt as never, locale),
      position: hotspotToPosition(data.portraitHotspot),
    },
    sections,
    quote: pickLocale(data.quote as never, locale),
  }
}
