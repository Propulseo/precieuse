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
import type {Article, ArticleBlock} from '../content/carnet';
import { LETTRES  } from '../content/lettres'
import type {Lettre} from '../content/lettres';
import { ETABLI_STEPS  } from '../content/etabli'
import type {EtabliStep} from '../content/etabli';
import { bespokePageFallback } from '../content/bespoke'
import type { BespokePageData, BespokeImg, BespokeStepData } from '../content/bespoke'
import { homePageFallback } from '../content/home'
import type { HomePageData, HomeImg } from '../content/home'
import { SITE } from '../content/site'
import { CREATION_TYPES, BUDGETS } from '../content/sur-mesure'
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
      materials, story, imageZoom, ${IMAGE_FIELDS},
      "photoPortee": photoPortee.asset->url, "photoPorteeAlt": photoPortee.alt, "photoPorteeHotspot": photoPortee.hotspot,
      "packshot": packshot.asset->url, "packshotAlt": packshot.alt,
      "gallery": gallery[]{ "src": asset->url, alt, hotspot }
    }`,
  )
  if (!data?.length) return PRODUCTS
  return data.map((d) => {
    const slug = String(d.slug ?? '')
    // Repli statique par slug : si un champ image de grille n'est pas (encore)
    // rempli dans Sanity, on retombe sur le chemin codé dans PRODUCTS → jamais
    // de grille vide tant qu'Emeline n'a pas seedé les nouvelles photos.
    const fb = PRODUCTS.find((p) => p.slug === slug)
    return {
      slug,
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
      // Zoom du défilé d'accueil (Sanity prime, repli statique).
      imageZoom: typeof d.imageZoom === 'number' ? d.imageZoom : fb?.imageZoom,
      // Grille /collection : photo portée + packshot (Sanity prime, repli statique).
      photoPortee: d.photoPortee ? String(d.photoPortee) : fb?.photoPortee,
      photoPorteeAlt: d.photoPorteeAlt
        ? pickLocale(d.photoPorteeAlt as never, locale)
        : fb?.photoPorteeAlt,
      photoPorteePosition: hotspotToPosition(d.photoPorteeHotspot) ?? fb?.photoPorteePosition,
      packshot: d.packshot ? String(d.packshot) : fb?.packshot,
      packshotAlt: d.packshotAlt ? pickLocale(d.packshotAlt as never, locale) : fb?.packshotAlt,
      // Galerie éditable par Emeline (Sanity) ; repli sur la galerie statique du
      // contenu local si elle n'a rien rempli pour cette pièce.
      gallery: (() => {
        const raw = (d.gallery as Array<Record<string, unknown>> | undefined) ?? []
        const mapped = raw
          .filter((g) => g && g.src)
          .map((g) => ({
            src: String(g.src),
            alt: pickLocale(g.alt as never, locale),
            position: hotspotToPosition(g.hotspot),
          }))
        return mapped.length ? mapped : fb?.gallery
      })(),
    }
  })
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

/**
 * Convertit le corps d'un article modélisé dans Sanity (array d'objets
 * paragraph/heading/quote/list) vers le type `ArticleBlock` rendu par
 * `ArticleBlocks`. Carnet FR-only → champs texte simples (non localisés).
 */
function mapArticleBody(raw: unknown): ArticleBlock[] {
  if (!Array.isArray(raw)) return []
  const blocks: ArticleBlock[] = []
  for (const b of raw as Array<Record<string, unknown>>) {
    switch (String(b._type ?? '')) {
      case 'heading':
        blocks.push({ kind: 'h2', text: String(b.text ?? '') })
        break
      case 'quote':
        blocks.push({
          kind: 'quote',
          text: String(b.text ?? ''),
          cite: b.cite ? String(b.cite) : undefined,
        })
        break
      case 'list':
        blocks.push({
          kind: 'list',
          items: Array.isArray(b.items) ? (b.items as unknown[]).map(String) : [],
        })
        break
      case 'paragraph':
        blocks.push({ kind: 'p', text: String(b.text ?? '') })
        break
    }
  }
  return blocks
}

export async function getArticles(_locale: Locale = DEFAULT_LOCALE): Promise<Article[]> {
  // Carnet FR-only pour l'instant : le corps des articles n'est pas encore
  // traduit, on sert donc tout le contenu en français (DEFAULT_LOCALE) pour
  // éviter un mélange de langues (titre EN/PT + corps FR). `_locale` est conservé
  // pour la signature ; à réactiver quand le corps sera traduit dans Sanity.
  if (!isSanityConfigured) return ARTICLES
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "article"] | order(order asc){
      "slug": slug.current, title, excerpt, category, date, readTime,
      ${IMAGE_FIELDS}, featured,
      lede, body[]{ _type, text, cite, items }, closingQuote{ text, cite }
    }`,
  )
  if (!data?.length) return ARTICLES
  return data.map((d) => {
    const slug = String(d.slug ?? '')
    // Le corps (chapô / body / citation de clôture) est désormais éditable dans
    // Sanity ; on retombe sur le contenu statique par slug champ par champ tant
    // qu'un article n'est pas (encore) rempli côté CMS → aucune régression.
    const fallback = ARTICLES.find((a) => a.slug === slug)
    const bodySanity = mapArticleBody(d.body)
    const cqRaw = d.closingQuote as Record<string, unknown> | null | undefined
    const cqSanity = cqRaw?.text
      ? { text: String(cqRaw.text), cite: cqRaw.cite ? String(cqRaw.cite) : undefined }
      : undefined
    return {
      slug,
      title: pickLocale(d.title as never, DEFAULT_LOCALE),
      excerpt: pickLocale(d.excerpt as never, DEFAULT_LOCALE),
      category: String(d.category ?? ''),
      date: String(d.date ?? ''),
      readTime: String(d.readTime ?? ''),
      image: String(d.image ?? ''),
      imageAlt: pickLocale(d.imageAlt as never, DEFAULT_LOCALE),
      imagePosition: hotspotToPosition(d.imageHotspot),
      featured: Boolean(d.featured),
      lede: (typeof d.lede === 'string' && d.lede ? d.lede : undefined) ?? fallback?.lede,
      body: bodySanity.length ? bodySanity : fallback?.body,
      closingQuote: cqSanity ?? fallback?.closingQuote,
    }
  })
}

export function getCarnetCategories(): typeof CATEGORIES {
  return CATEGORIES
}

// ---------------------------------------------------------------------------
// Témoignages (lettres)
// ---------------------------------------------------------------------------

export async function getLettres(locale: Locale = DEFAULT_LOCALE): Promise<Lettre[]> {
  if (!isSanityConfigured) return LETTRES
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "temoignage"] | order(order asc){
      citation, auteur, initiale, ville, date, piece, ${IMAGE_FIELDS}
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
    // Photo « bague portée » de la galerie témoignages, pilotée par Emeline.
    image: d.image ? String(d.image) : undefined,
    imageAlt: d.imageAlt ? pickLocale(d.imageAlt as never, locale) : undefined,
    imagePosition: hotspotToPosition(d.imageHotspot),
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

export async function getBespokeSteps(
  locale: Locale = DEFAULT_LOCALE,
): Promise<BespokeStepData[]> {
  const fb = bespokePageFallback().steps
  if (!isSanityConfigured) return fb
  const data = await cmsFetch<Array<Record<string, unknown>>>(
    `*[_type == "surMesurePage"][0].steps[]{ title, body }`,
  )
  if (!data?.length) return fb
  return data.map((d, i) => ({
    title: pickLocale(d.title as never, locale) || fb[i]?.title || '',
    body: pickLocale(d.body as never, locale) || fb[i]?.body || '',
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

// ---------------------------------------------------------------------------
// Page d'accueil (héro)
// ---------------------------------------------------------------------------

/**
 * Héro d'accueil (2 photos + promesse) résolu depuis le singleton Sanity
 * `homePage`, fusionné par-dessus le repli i18n/photos (`homePageFallback`).
 * Chaque champ vide retombe sur le repli → aucune régression tant que le
 * document n'est pas rempli par Emeline.
 */
export async function getHomePage(
  locale: Locale = DEFAULT_LOCALE,
): Promise<HomePageData> {
  const fb = homePageFallback()
  if (!isSanityConfigured) return fb
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "homePage"][0]{
      "leftSrc": heroImageLeft.asset->url, "leftAlt": heroImageLeft.alt, "leftHotspot": heroImageLeft.hotspot,
      "rightSrc": heroImageRight.asset->url, "rightAlt": heroImageRight.alt, "rightHotspot": heroImageRight.hotspot,
      heroTaglineLead, heroTaglineAccent, heroSubline,
      "aproposSrc": aproposPortrait.asset->url, "aproposAlt": aproposPortrait.alt, "aproposHotspot": aproposPortrait.hotspot,
      aproposName, aproposPlace,
      "manifesto": aproposManifesto[]{ pas, mais },
      aproposQualification, aproposFounder
    }`,
  )
  if (!data) return fb
  const s = (v: unknown, fallback: string): string =>
    pickLocale(v as never, locale) || fallback
  const img = (
    src: unknown,
    alt: unknown,
    hotspot: unknown,
    fallback: HomeImg,
  ): HomeImg =>
    src
      ? {
          src: String(src),
          alt: pickLocale(alt as never, locale) || fallback.alt,
          position: hotspotToPosition(hotspot),
        }
      : fallback
  const manifestoRaw =
    (data.manifesto as Array<Record<string, unknown>> | undefined) ?? []
  const manifesto = manifestoRaw.length
    ? manifestoRaw.map((p, i) => ({
        pas: s(p.pas, fb.avantPropos.manifesto[i]?.pas ?? ''),
        mais: s(p.mais, fb.avantPropos.manifesto[i]?.mais ?? ''),
      }))
    : fb.avantPropos.manifesto
  return {
    hero: {
      imageLeft: img(data.leftSrc, data.leftAlt, data.leftHotspot, fb.hero.imageLeft),
      imageRight: img(data.rightSrc, data.rightAlt, data.rightHotspot, fb.hero.imageRight),
      taglineLead: s(data.heroTaglineLead, fb.hero.taglineLead),
      taglineAccent: s(data.heroTaglineAccent, fb.hero.taglineAccent),
      subline: s(data.heroSubline, fb.hero.subline),
    },
    avantPropos: {
      portrait: img(data.aproposSrc, data.aproposAlt, data.aproposHotspot, fb.avantPropos.portrait),
      name: String(data.aproposName ?? fb.avantPropos.name),
      place: String(data.aproposPlace ?? fb.avantPropos.place),
      manifesto,
      qualification: s(data.aproposQualification, fb.avantPropos.qualification),
      founder: s(data.aproposFounder, fb.avantPropos.founder),
    },
  }
}

/**
 * Page Sur-mesure : contenu complet (héro, bandeau, atelier, procédé, croquis,
 * réalisations, voix), résolu depuis le singleton Sanity `surMesurePage` et
 * fusionné par-dessus le repli i18n/photos (`bespokePageFallback`). Chaque champ
 * vide côté Sanity retombe sur le repli → aucune régression tant que le document
 * n'est pas rempli par Emeline.
 */
export async function getBespokePage(
  locale: Locale = DEFAULT_LOCALE,
): Promise<BespokePageData> {
  const fb = bespokePageFallback()
  if (!isSanityConfigured) return fb
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "surMesurePage"][0]{
      heroKicker, heroTitle, heroTitleAccent, heroSub, heroCta,
      "heroSrc": heroImage.asset->url, "heroAlt": heroImage.alt, "heroHotspot": heroImage.hotspot,
      "heroVideo": heroVideo.asset->url, "heroPoster": heroPoster.asset->url,
      marquee,
      atelierTitleLead, atelierTitleAccent, atelierTitleTail, atelierBody, atelierLink, atelierBadge,
      "atelierImages": atelierImages[]{ "src": img.asset->url, "alt": img.alt, "hotspot": img.hotspot },
      "steps": steps[]{ title, body },
      manifesteLead, manifesteAccent,
      splitEyebrow, splitTitleLead, splitTitleAccent, splitTitleTail, splitBody, splitLink,
      "splitSrc": splitImage.asset->url, "splitAlt": splitImage.alt, "splitHotspot": splitImage.hotspot,
      realEyebrow, realTitle, realIntro, realTagAtelier, realTagPortee,
      "pieces": pieces[]{ name, material,
        "atelierSrc": atelier.asset->url, "atelierAlt": atelier.alt, "atelierHotspot": atelier.hotspot,
        "porteeSrc": portee.asset->url, "porteeAlt": portee.alt, "porteeHotspot": portee.hotspot
      },
      voicesTitle,
      "voices": voices[]{ initial, quote, name, city }
    }`,
  )
  if (!data) return fb

  const s = (v: unknown, fallback: string): string =>
    pickLocale(v as never, locale) || fallback
  const img = (
    src: unknown,
    alt: unknown,
    hotspot: unknown,
    fallback: BespokeImg,
  ): BespokeImg =>
    src
      ? {
          src: String(src),
          alt: pickLocale(alt as never, locale) || fallback.alt,
          position: hotspotToPosition(hotspot),
        }
      : fallback

  const marqueeRaw = (data.marquee as unknown[] | undefined) ?? []
  const marquee = marqueeRaw.length
    ? marqueeRaw.map((mq) => pickLocale(mq as never, locale)).filter(Boolean)
    : fb.marquee

  const atelierImgsRaw =
    (data.atelierImages as Array<Record<string, unknown>> | undefined) ?? []
  const atelierImages = atelierImgsRaw.length
    ? atelierImgsRaw.map((im, i) =>
        img(im.src, im.alt, im.hotspot, fb.atelier.images[i] ?? fb.atelier.images[0]),
      )
    : fb.atelier.images

  const stepsRaw = (data.steps as Array<Record<string, unknown>> | undefined) ?? []
  const steps = stepsRaw.length
    ? stepsRaw.map((st, i) => ({
        title: s(st.title, fb.steps[i]?.title ?? ''),
        body: s(st.body, fb.steps[i]?.body ?? ''),
      }))
    : fb.steps

  const piecesRaw = (data.pieces as Array<Record<string, unknown>> | undefined) ?? []
  const pieces = piecesRaw.length
    ? piecesRaw.map((p, i) => {
        const f = fb.realisations.pieces[i] ?? fb.realisations.pieces[0]
        return {
          name: String(p.name ?? f.name),
          material: s(p.material, f.material),
          atelier: img(p.atelierSrc, p.atelierAlt, p.atelierHotspot, f.atelier),
          portee: img(p.porteeSrc, p.porteeAlt, p.porteeHotspot, f.portee),
        }
      })
    : fb.realisations.pieces

  const voicesRaw = (data.voices as Array<Record<string, unknown>> | undefined) ?? []
  const voices = voicesRaw.length
    ? voicesRaw.map((v, i) => {
        const f = fb.voices.items[i] ?? fb.voices.items[0]
        return {
          initial: String(v.initial ?? f.initial),
          quote: s(v.quote, f.quote),
          name: String(v.name ?? f.name),
          city: String(v.city ?? f.city),
        }
      })
    : fb.voices.items

  return {
    hero: {
      kicker: s(data.heroKicker, fb.hero.kicker),
      title: s(data.heroTitle, fb.hero.title),
      titleAccent: s(data.heroTitleAccent, fb.hero.titleAccent),
      sub: s(data.heroSub, fb.hero.sub),
      cta: s(data.heroCta, fb.hero.cta),
      photo: img(data.heroSrc, data.heroAlt, data.heroHotspot, fb.hero.photo),
      video: data.heroVideo ? String(data.heroVideo) : fb.hero.video,
      poster: data.heroPoster ? String(data.heroPoster) : fb.hero.poster,
    },
    marquee,
    atelier: {
      titleLead: s(data.atelierTitleLead, fb.atelier.titleLead),
      titleAccent: s(data.atelierTitleAccent, fb.atelier.titleAccent),
      titleTail: s(data.atelierTitleTail, fb.atelier.titleTail),
      body: s(data.atelierBody, fb.atelier.body),
      link: s(data.atelierLink, fb.atelier.link),
      badge: s(data.atelierBadge, fb.atelier.badge),
      images: atelierImages,
    },
    steps,
    manifeste: {
      lead: s(data.manifesteLead, fb.manifeste.lead),
      accent: s(data.manifesteAccent, fb.manifeste.accent),
    },
    split: {
      eyebrow: s(data.splitEyebrow, fb.split.eyebrow),
      titleLead: s(data.splitTitleLead, fb.split.titleLead),
      titleAccent: s(data.splitTitleAccent, fb.split.titleAccent),
      titleTail: s(data.splitTitleTail, fb.split.titleTail),
      body: s(data.splitBody, fb.split.body),
      link: s(data.splitLink, fb.split.link),
      image: img(data.splitSrc, data.splitAlt, data.splitHotspot, fb.split.image),
    },
    realisations: {
      eyebrow: s(data.realEyebrow, fb.realisations.eyebrow),
      title: s(data.realTitle, fb.realisations.title),
      intro: s(data.realIntro, fb.realisations.intro),
      tagAtelier: s(data.realTagAtelier, fb.realisations.tagAtelier),
      tagPortee: s(data.realTagPortee, fb.realisations.tagPortee),
      pieces,
    },
    voices: { title: s(data.voicesTitle, fb.voices.title), items: voices },
  }
}
