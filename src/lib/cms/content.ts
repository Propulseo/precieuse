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
import { DEFAULT_LOCALE, pickLocale, type Locale } from '../../../sanity/lib/locale'

import { PRODUCTS, type Product } from '../content/products'
import { MATIERES, type Matiere } from '../content/matieres'
import { ARTICLES, CATEGORIES, type Article } from '../content/carnet'
import { LETTRES, type Lettre } from '../content/lettres'
import { ETABLI_STEPS, type EtabliStep } from '../content/etabli'
import { SITE, BESPOKE_PROCESS, type ProcessStep } from '../content/site'
import {
  METAMORPHOSE,
  PROMESSES,
  CREATION_TYPES,
  BUDGETS,
  type MetamorphoseStep,
} from '../content/sur-mesure'
import { FOOTER_DATA } from '../content/footer'

/** GROQ projection for a localized image: asset URL string + localized alt. */
const IMAGE_FIELDS = `"image": image.asset->url, "imageAlt": image.alt`

// ---------------------------------------------------------------------------
// Collection — pièces
// ---------------------------------------------------------------------------

export async function getProducts(locale: Locale = DEFAULT_LOCALE): Promise<Product[]> {
  if (!isSanityConfigured) return PRODUCTS
  const data = await sanity.fetch<Array<Record<string, unknown>>>(
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
  const data = await sanity.fetch<Array<Record<string, unknown>>>(
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
    annotation_caveat: pickLocale(d.annotationCaveat as never, locale),
    page: String(d.page ?? ''),
  }))
}

// ---------------------------------------------------------------------------
// Carnet — articles
// ---------------------------------------------------------------------------

export async function getArticles(locale: Locale = DEFAULT_LOCALE): Promise<Article[]> {
  if (!isSanityConfigured) return ARTICLES
  const data = await sanity.fetch<Array<Record<string, unknown>>>(
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
    featured: Boolean(d.featured),
  }))
}

export function getCarnetCategories(): typeof CATEGORIES {
  return CATEGORIES
}

// ---------------------------------------------------------------------------
// Témoignages (lettres)
// ---------------------------------------------------------------------------

export async function getLettres(locale: Locale = DEFAULT_LOCALE): Promise<Lettre[]> {
  if (!isSanityConfigured) return LETTRES
  const data = await sanity.fetch<Array<Record<string, unknown>>>(
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
  const data = await sanity.fetch<Array<Record<string, unknown>>>(
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
  }))
}

// ---------------------------------------------------------------------------
// Parcours sur-mesure (process)
// ---------------------------------------------------------------------------

export async function getBespokeProcess(
  locale: Locale = DEFAULT_LOCALE,
): Promise<ProcessStep[]> {
  if (!isSanityConfigured) return BESPOKE_PROCESS
  const data = await sanity.fetch<Array<Record<string, unknown>>>(
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
  const data = await sanity.fetch<Record<string, unknown> | null>(
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
  }))
}

export async function getPromesses(
  locale: Locale = DEFAULT_LOCALE,
): Promise<typeof PROMESSES> {
  if (!isSanityConfigured) return PROMESSES
  const data = await sanity.fetch<Record<string, unknown> | null>(
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
  const data = await sanity.fetch<Record<string, unknown> | null>(
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

export async function getFooter(
  locale: Locale = DEFAULT_LOCALE,
): Promise<typeof FOOTER_DATA> {
  if (!isSanityConfigured) return FOOTER_DATA
  const data = await sanity.fetch<Record<string, unknown> | null>(
    `*[_type == "footer"][0]{
      nav[]{ label, href }, legal[]{ label, href },
      social[]{ label, handle, href }, email, signature, copyright,
      credit{ label, href }, logoSrc
    }`,
  )
  if (!data) return FOOTER_DATA
  const credit = (data.credit as Record<string, unknown> | undefined) ?? {}
  return {
    nav: ((data.nav as Array<Record<string, unknown>>) ?? []).map((l) => ({
      label: pickLocale(l.label as never, locale),
      href: String(l.href ?? ''),
    })),
    legal: ((data.legal as Array<Record<string, unknown>>) ?? []).map((l) => ({
      label: pickLocale(l.label as never, locale),
      href: String(l.href ?? ''),
    })),
    social: ((data.social as Array<Record<string, unknown>>) ?? []).map((s) => ({
      label: String(s.label ?? ''),
      handle: String(s.handle ?? ''),
      href: String(s.href ?? ''),
    })),
    email: String(data.email ?? FOOTER_DATA.email),
    signature: pickLocale(data.signature as never, locale) || FOOTER_DATA.signature,
    copyright: pickLocale(data.copyright as never, locale) || FOOTER_DATA.copyright,
    credit: {
      label: String(credit.label ?? FOOTER_DATA.credit.label),
      href: String(credit.href ?? FOOTER_DATA.credit.href),
    },
    logoSrc: String(data.logoSrc ?? FOOTER_DATA.logoSrc),
  } as typeof FOOTER_DATA
}
