/**
 * Seed Sanity depuis le contenu statique (src/lib/content/*) — source unique de
 * vérité aujourd'hui. Uploade les photos comme assets Sanity, puis crée les
 * documents correspondant aux schémas (sanity/schemaTypes/*).
 *
 * Idempotent : `createOrReplace` sur des _id déterministes → relançable sans
 * créer de doublons. Le contenu FR est seedé dans le champ `fr` des objets
 * localisés ; EN/PT restent vides (à traduire plus tard).
 *
 * Lancer :  node_modules/.bin/tsx scripts/seed-sanity.ts
 * Requiert dans .env : VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET,
 *                      VITE_SANITY_API_VERSION, SANITY_WRITE_TOKEN (rôle Editor).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { basename, join } from 'node:path'

// Charge .env dans process.env (Node 22).
try {
  ;(process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile('.env')
} catch {
  /* déjà chargé via --env-file, ou indisponible */
}

import { PRODUCTS } from '../src/lib/content/products'
import { MATIERES } from '../src/lib/content/matieres'
import { LETTRES } from '../src/lib/content/lettres'
import { ARTICLES } from '../src/lib/content/carnet'
import { ETABLI_STEPS } from '../src/lib/content/etabli'
import { BESPOKE_PROCESS, SITE } from '../src/lib/content/site'
import { METAMORPHOSE, PROMESSES } from '../src/lib/content/sur-mesure'
import { FOOTER_DATA } from '../src/lib/content/footer'

const projectId = process.env.VITE_SANITY_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2026-05-01'

if (!projectId || !token) {
  console.error('❌ VITE_SANITY_PROJECT_ID et/ou SANITY_WRITE_TOKEN manquant(s) dans .env')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

/** Valeur d'un champ localizedString (FR seul pour l'instant). */
const Lstr = (fr?: string) => ({ _type: 'localizedString', fr: fr ?? '' })
/** Valeur d'un champ localizedText (FR seul pour l'instant). */
const Ltext = (fr?: string) => ({ _type: 'localizedText', fr: fr ?? '' })

// Upload des images (dédupliqué par chemin) → map chemin public -> asset._id
const assetCache = new Map<string, string>()
async function uploadImage(publicPath: string): Promise<string> {
  const cached = assetCache.get(publicPath)
  if (cached) return cached
  const disk = join(process.cwd(), 'public', publicPath)
  const buf = readFileSync(disk)
  const asset = await client.assets.upload('image', buf, {
    filename: basename(publicPath),
    contentType: 'image/webp',
  })
  assetCache.set(publicPath, asset._id)
  console.log(`  ↑ ${basename(publicPath)} → ${asset._id}`)
  return asset._id
}

function imageField(assetId: string, altFr?: string) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt: Lstr(altFr),
  }
}

async function main() {
  const docs: Record<string, unknown>[] = []

  console.log('→ Upload des photos…')

  // Pièces (collection)
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]!
    const assetId = await uploadImage(p.image)
    docs.push({
      _id: `piece.${p.slug}`,
      _type: 'piece',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      tagline: Lstr(p.tagline),
      priceLabel: Lstr(p.price),
      description: Ltext(p.description),
      materials: Ltext(p.materials),
      story: Ltext(p.story),
      image: imageField(assetId, p.imageAlt),
      order: i,
    })
  }

  // Matières
  for (let i = 0; i < MATIERES.length; i++) {
    const m = MATIERES[i]!
    const assetId = await uploadImage(m.image)
    docs.push({
      _id: `matiere.${m.slug}`,
      _type: 'matiere',
      nom: m.nom,
      slug: { _type: 'slug', current: m.slug },
      sousTitre: Lstr(m.sous_titre),
      description: Ltext(m.description_courte),
      image: imageField(assetId, m.image_alt),
      annotationCaveat: Lstr(m.annotation_caveat),
      page: m.page,
      order: i,
    })
  }

  // Témoignages (placeholders — à remplacer par de vrais avis)
  for (let i = 0; i < LETTRES.length; i++) {
    const t = LETTRES[i]!
    docs.push({
      _id: `temoignage.${i}`,
      _type: 'temoignage',
      placeholder: true,
      citation: Ltext(t.citation),
      auteur: t.auteur,
      initiale: t.initiale,
      ville: t.ville,
      date: t.date,
      piece: Lstr(t.piece),
      order: i,
    })
  }

  // Articles (Carnet)
  for (let i = 0; i < ARTICLES.length; i++) {
    const a = ARTICLES[i]!
    const assetId = await uploadImage(a.image)
    docs.push({
      _id: `article.${a.slug}`,
      _type: 'article',
      title: Lstr(a.title),
      slug: { _type: 'slug', current: a.slug },
      excerpt: Ltext(a.excerpt),
      category: a.category,
      date: a.date,
      readTime: a.readTime,
      image: imageField(assetId, a.imageAlt),
      featured: Boolean(a.featured),
      order: i,
    })
  }

  // Étapes de l'établi
  for (let i = 0; i < ETABLI_STEPS.length; i++) {
    const e = ETABLI_STEPS[i]!
    const assetId = await uploadImage(e.image)
    docs.push({
      _id: `etapeEtabli.${e.index}`,
      _type: 'etapeEtabli',
      roman: e.roman,
      index: e.index,
      title: Lstr(e.title),
      annotation: Lstr(e.annotation),
      detail: Ltext(e.detail),
      image: imageField(assetId, e.imageAlt),
    })
  }

  // Étapes du parcours sur-mesure
  for (let i = 0; i < BESPOKE_PROCESS.length; i++) {
    const s = BESPOKE_PROCESS[i]!
    docs.push({
      _id: `etapeSurMesure.${s.number}`,
      _type: 'etapeSurMesure',
      number: s.number,
      title: Lstr(s.title),
      description: Ltext(s.description),
    })
  }

  // Page Sur-Mesure (singleton) : métamorphose + promesses
  const metamorphose = []
  for (let i = 0; i < METAMORPHOSE.length; i++) {
    const m = METAMORPHOSE[i]!
    const assetId = await uploadImage(m.image)
    metamorphose.push({
      _type: 'etape',
      _key: `meta-${i}`,
      roman: m.roman,
      title: Lstr(m.title),
      annotation: Lstr(m.annotation),
      detail: Ltext(m.detail),
      image: imageField(assetId, m.imageAlt),
    })
  }
  const promesses = []
  for (let i = 0; i < PROMESSES.length; i++) {
    const p = PROMESSES[i]!
    const assetId = await uploadImage(p.image)
    promesses.push({
      _type: 'promesse',
      _key: `prom-${i}`,
      titre: Lstr(p.titre),
      detail: Lstr(p.detail),
      image: imageField(assetId, p.imageAlt),
    })
  }
  docs.push({ _id: 'surMesurePage', _type: 'surMesurePage', metamorphose, promesses })

  // Réglages du site (singleton)
  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brand: SITE.brand,
    baseline: Lstr(SITE.baseline),
    email: SITE.email,
    whatsapp: SITE.whatsapp,
    instagram: SITE.instagram,
    hours: Lstr(SITE.hours),
    address: {
      street: SITE.address.street,
      zip: SITE.address.zip,
      city: SITE.address.city,
      country: SITE.address.country,
    },
  })

  // Pied de page (singleton)
  docs.push({
    _id: 'footer',
    _type: 'footer',
    nav: FOOTER_DATA.nav.map((l, i) => ({
      _type: 'link',
      _key: `nav-${i}`,
      label: Lstr(l.label),
      href: l.href,
    })),
    legal: FOOTER_DATA.legal.map((l, i) => ({
      _type: 'link',
      _key: `legal-${i}`,
      label: Lstr(l.label),
      href: l.href,
    })),
    social: FOOTER_DATA.social.map((s, i) => ({
      _type: 'social',
      _key: `social-${i}`,
      label: s.label,
      handle: s.handle,
      href: s.href,
    })),
    email: FOOTER_DATA.email,
    signature: Lstr(FOOTER_DATA.signature),
    copyright: Lstr(FOOTER_DATA.copyright),
    credit: { label: FOOTER_DATA.credit.label, href: FOOTER_DATA.credit.href },
    logoSrc: FOOTER_DATA.logoSrc,
  })

  console.log(`→ Écriture de ${docs.length} documents…`)
  const tx = client.transaction()
  for (const d of docs) tx.createOrReplace(d as never)
  await tx.commit()

  const counts = docs.reduce<Record<string, number>>((acc, d) => {
    const t = String(d._type)
    acc[t] = (acc[t] ?? 0) + 1
    return acc
  }, {})
  console.log('✅ Seed terminé :', counts)
  console.log(`   ${assetCache.size} images uploadées.`)
}

main().catch((e) => {
  console.error('❌ Échec du seed :', e?.message ?? e)
  process.exit(1)
})
