/**
 * Seed des contenus rendus éditables cette session :
 *  - photos des témoignages (champ `image` ajouté au schéma temoignage)
 *  - page Sur-mesure (singleton `surMesurePage` réécrit : héro, bandeau, atelier,
 *    procédé, croquis, réalisations, voix)
 *
 * Lit FR/EN/PT depuis messages/*.json. Idempotent : Sanity dédoublonne les assets
 * par hash, et on fait createOrReplace/patch sur des _id déterministes.
 * NB : `creatricePage` n'est PAS seedée ici (retravaillée en parallèle côté front).
 *
 * Lancer : node_modules/.bin/tsx scripts/seed-editabilite.ts
 * Requiert dans .env : VITE_SANITY_PROJECT_ID, SANITY_WRITE_TOKEN (rôle Editor).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { basename, join } from 'node:path'

try {
  ;(process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile('.env')
} catch {
  /* déjà chargé via --env-file */
}

import { LETTRES } from '../src/lib/content/lettres'

const projectId = process.env.VITE_SANITY_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2026-05-01'

if (!projectId || !token) {
  console.error('❌ VITE_SANITY_PROJECT_ID et/ou SANITY_WRITE_TOKEN manquant(s)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const FR = JSON.parse(readFileSync('messages/fr.json', 'utf8')) as Record<string, string>
const EN = JSON.parse(readFileSync('messages/en.json', 'utf8')) as Record<string, string>
const PT = JSON.parse(readFileSync('messages/pt.json', 'utf8')) as Record<string, string>

/** localizedString/Text depuis une clé Paraglide (FR + EN/PT si présents). */
function L(key: string, type: 'localizedString' | 'localizedText' = 'localizedString') {
  return {
    _type: type,
    fr: FR[key] ?? '',
    ...(EN[key] ? { en: EN[key] } : {}),
    ...(PT[key] ? { pt: PT[key] } : {}),
  }
}
/** localizedString littérale FR (alts codés en dur dans les composants). */
const Lit = (fr: string) => ({ _type: 'localizedString', fr })

const assetCache = new Map<string, string>()
async function uploadImage(publicPath: string): Promise<string> {
  const cached = assetCache.get(publicPath)
  if (cached) return cached
  const abs = join('public', publicPath.replace(/^\//, ''))
  const asset = await client.assets.upload('image', readFileSync(abs), {
    filename: basename(abs),
  })
  assetCache.set(publicPath, asset._id)
  return asset._id
}
async function imageField(publicPath: string, alt: { _type: string; fr: string }) {
  const ref = await uploadImage(publicPath)
  return { _type: 'image', asset: { _type: 'reference', _ref: ref }, alt }
}

// ---------------------------------------------------------------------------
// 1) Photos des témoignages — patch le champ image des docs existants
// ---------------------------------------------------------------------------
async function seedTemoignagePhotos() {
  const docs = await client.fetch<Array<{ _id: string; auteur: string }>>(
    `*[_type == "temoignage"]{ _id, auteur }`,
  )
  let n = 0
  for (const d of docs) {
    const lettre = LETTRES.find((l) => l.auteur === d.auteur)
    if (!lettre?.image) continue
    const img = await imageField(lettre.image, Lit(`${lettre.piece} portée par une cliente`))
    await client.patch(d._id).set({ image: img }).commit()
    n++
  }
  console.log(`✓ Témoignages : ${n} photo(s) attachée(s)`)
}

// ---------------------------------------------------------------------------
// 2) Page Sur-mesure — singleton surMesurePage (nouveau schéma complet)
// ---------------------------------------------------------------------------
async function seedSurMesurePage() {
  const [hero, esquisses, atImg0, atImg1, atImg2] = await Promise.all([
    imageField('/images/real/bague-main-chaise-thelma.webp', L('sm_hero_photo_alt')),
    imageField('/images/atelier/esquisses-amethyste.jpg', L('sm_split_img_alt')),
    imageField('/images/emeline/emeline-atelier.jpg', Lit("Emeline à l'établi, dans son atelier de Bordeaux")),
    imageField('/images/atelier/bague-en-fabrication.jpg', Lit("Bague en cours de fabrication, fixée à l'étau")),
    imageField('/images/real/main-poche-josephine.webp', Lit('Bague Joséphine portée, main glissée dans la poche')),
  ])

  const pieceDefs = [
    { key: 'josephine', name: 'Joséphine', mat: 'sm_real_mat_josephine', atelier: '/images/real/bague-entouree-josephine.webp', atAlt: "Bague Joséphine photographiée à l'atelier", portee: '/images/real/main-chaise-josephine.webp', poAlt: 'Bague Joséphine portée, main posée sur une chaise' },
    { key: 'aurore', name: 'Aurore', mat: 'sm_real_mat_aurore', atelier: '/images/real/bague-pierre-aurore.webp', atAlt: "Bague Aurore photographiée à l'atelier", portee: '/images/real/bague-main-chaise-aurore.webp', poAlt: 'Bague Aurore portée, main posée sur une chaise' },
    { key: 'thelma', name: 'Thelma', mat: 'sm_real_mat_thelma', atelier: '/images/real/bague-boule-thelma.webp', atAlt: "Bague Thelma photographiée à l'atelier", portee: '/images/real/mains-poche-thelma.webp', poAlt: 'Bague Thelma portée, mains glissées dans les poches' },
  ]
  const pieces = []
  for (const p of pieceDefs) {
    pieces.push({
      _key: p.key,
      _type: 'piece',
      name: p.name,
      material: L(p.mat),
      atelier: await imageField(p.atelier, Lit(p.atAlt)),
      portee: await imageField(p.portee, Lit(p.poAlt)),
    })
  }

  const voiceDefs = [
    { key: 'v1', initial: 'M', quote: 'sm_voice1_quote', name: 'Martine B.', city: 'Bordeaux' },
    { key: 'v2', initial: 'S', quote: 'sm_voice2_quote', name: 'Sandrine L.', city: 'Lyon' },
    { key: 'v3', initial: 'C', quote: 'sm_voice3_quote', name: 'Camille R.', city: 'Paris' },
  ]

  const doc = {
    _id: 'surMesurePage',
    _type: 'surMesurePage',
    heroKicker: L('sm_hero_kicker'),
    heroTitle: L('sm_hero_title'),
    heroTitleAccent: L('sm_hero_title_accent'),
    heroSub: L('sm_hero_sub', 'localizedText'),
    heroCta: L('sm_hero_cta'),
    heroImage: hero,
    marquee: ['sm_marquee_1', 'sm_marquee_2', 'sm_marquee_3', 'sm_marquee_4', 'sm_marquee_5'].map(
      (k, i) => ({ _key: `mq${i}`, ...L(k) }),
    ),
    atelierTitleLead: L('sm_about_title_lead'),
    atelierTitleAccent: L('sm_about_title_accent'),
    atelierTitleTail: L('sm_about_title_tail'),
    atelierBody: L('sm_about_body', 'localizedText'),
    atelierLink: L('sm_about_link'),
    atelierBadge: L('sm_about_badge'),
    atelierImages: [atImg0, atImg1, atImg2].map((img, i) => ({ _key: `at${i}`, ...img })),
    steps: [1, 2, 3, 4].map((n) => ({
      _key: `step${n}`,
      _type: 'step',
      title: L(`sm_step${n}_title`),
      body: L(`sm_step${n}_body`, 'localizedText'),
    })),
    manifesteLead: L('sm_manifeste_lead', 'localizedText'),
    manifesteAccent: L('sm_manifeste_accent'),
    splitEyebrow: L('sm_split_eyebrow'),
    splitTitleLead: L('sm_split_title_lead'),
    splitTitleAccent: L('sm_split_title_accent'),
    splitTitleTail: L('sm_split_title_tail'),
    splitBody: L('sm_split_body', 'localizedText'),
    splitLink: L('sm_split_link'),
    splitImage: esquisses,
    realEyebrow: L('sm_real_eyebrow'),
    realTitle: L('sm_real_title'),
    realIntro: L('sm_real_intro', 'localizedText'),
    realTagAtelier: L('sm_real_tag_atelier'),
    realTagPortee: L('sm_real_tag_portee'),
    pieces,
    voicesTitle: L('sm_voices_title'),
    voices: voiceDefs.map((v) => ({
      _key: v.key,
      _type: 'voice',
      initial: v.initial,
      quote: L(v.quote, 'localizedText'),
      name: v.name,
      city: v.city,
    })),
  }

  // Supprime l'ancien doc (ancien schéma metamorphose/promesses) puis recrée.
  const existing = await client.fetch<Array<{ _id: string }>>(
    `*[_type == "surMesurePage"]{ _id }`,
  )
  for (const e of existing) {
    if (e._id !== 'surMesurePage') await client.delete(e._id)
  }
  await client.createOrReplace(doc)
  console.log('✓ Page Sur-mesure : singleton seedé (héro, atelier, procédé, croquis, réalisations, voix)')
}

async function main() {
  console.log(`Seed sur projet ${projectId} / dataset ${dataset}…`)
  await seedTemoignagePhotos()
  await seedSurMesurePage()
  console.log('✅ Seed terminé.')
}

main().catch((e) => {
  console.error('❌ Seed échoué :', e?.message || e)
  process.exit(1)
})
