/**
 * Seed des contenus rendus éditables :
 *  - photos des témoignages (champ `image` ajouté au schéma temoignage)
 *  - page Sur-mesure (singleton `surMesurePage` : héro + vidéo/poster, bandeau,
 *    atelier, procédé, croquis, réalisations, voix)
 *  - page d'accueil (singleton `homePage` : héro 2 photos + promesse)
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
import { FOOTER_DATA } from '../src/lib/content/footer'
import { SITE } from '../src/lib/content/site'

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
/** Image sans alt — visuels décoratifs (poster vidéo, aria-hidden). */
async function imagePlain(publicPath: string) {
  const ref = await uploadImage(publicPath)
  return { _type: 'image', asset: { _type: 'reference', _ref: ref } }
}
/** Upload d'un fichier non-image (vidéo) → asset._id. */
async function uploadFile(publicPath: string): Promise<string> {
  const abs = join('public', publicPath.replace(/^\//, ''))
  const asset = await client.assets.upload('file', readFileSync(abs), {
    filename: basename(abs),
  })
  return asset._id
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
    heroVideo: {
      _type: 'file',
      asset: { _type: 'reference', _ref: await uploadFile('/images/video/ring-box.mp4') },
    },
    heroPoster: await imagePlain('/images/real/bague-pierre-precieuse-perle.webp'),
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
    seoTitle: L('seo_surmesure_title'),
    seoDescription: L('seo_surmesure_desc', 'localizedText'),
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

// ---------------------------------------------------------------------------
// 3) Page d'accueil — singleton homePage (héro : 2 photos + promesse)
// ---------------------------------------------------------------------------
async function seedHomePage() {
  const [left, right, portrait] = await Promise.all([
    imageField('/images/real/bague-main-josephine.webp', L('hero_alt_josephine')),
    imageField('/images/real/buste-thelma-louise.webp', L('hero_alt_thelma_louise')),
    imageField('/images/emeline-portrait.jpg', L('avantpropos_portrait_alt')),
  ])
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroImageLeft: left,
    heroImageRight: right,
    heroEyebrow: L('hero_eyebrow'),
    heroTaglineLead: L('hero_tagline_lead'),
    heroTaglineAccent: L('hero_tagline_accent'),
    heroSubline: L('hero_subline', 'localizedText'),
    aproposPortrait: portrait,
    aproposName: 'Emeline Le Ray',
    aproposPlace: 'Bordeaux · MMXXVI',
    aproposManifesto: [1, 2, 3, 4].map((n) => ({
      _key: `pair${n}`,
      _type: 'pair',
      pas: L(`avantpropos_pair${n}_pas`),
      mais: L(`avantpropos_pair${n}_mais`),
    })),
    aproposQualification: L('avantpropos_credits_qualification'),
    aproposFounder: L('avantpropos_credits_founder'),
    reassurance: [
      'reassurance_returns',
      'reassurance_resizing',
      'reassurance_whatsapp',
      'reassurance_certificate',
    ].map((k, i) => ({ _key: `r${i}`, ...L(k) })),
    matieresTitle: L('matieres_section_title'),
    matieresSubtitle: L('matieres_section_subtitle'),
    matieresMarginNote: L('matieres_margin_note'),
    bespokeTitle: L('surmesure_title'),
    bespokeIntro: L('surmesure_intro_paragraph', 'localizedText'),
    bespokeTagline: L('surmesure_intro_tagline'),
    bespokeMeta: L('surmesure_meta'),
    etabliOverline: L('etabli_overline'),
    etabliTitle: L('etabli_title'),
    collectionTitle: L('series_title'),
    collectionSubtitle: L('series_subtitle'),
    testimonialsTitleLine1: L('testimonials_title_line1'),
    testimonialsTitleLine2: L('testimonials_title_line2'),
    leadCaptureTitle: L('leadcapture_title'),
    leadCaptureSubtitle: L('leadcapture_subtitle', 'localizedText'),
    leadCaptureConsentPrefix: L('leadcapture_consent_prefix'),
    leadCaptureConsentLink: L('leadcapture_consent_link'),
    leadCaptureConsentSuffix: L('leadcapture_consent_suffix'),
    newsletterEyebrow: L('newsletter_eyebrow'),
    newsletterTitle: L('newsletter_title'),
    newsletterSubtitle: L('newsletter_short_subtitle'),
    seoTitle: L('seo_home_title'),
    seoDescription: L('seo_home_desc', 'localizedText'),
  })
  console.log("✓ Page d'accueil : héro + avant-propos + en-têtes de section seedés")
}

// ---------------------------------------------------------------------------
// 4) Pied de page — singleton footer (réseaux/email + textes éditoriaux)
// ---------------------------------------------------------------------------
async function seedFooter() {
  await client.createOrReplace({
    _id: 'footer',
    _type: 'footer',
    social: FOOTER_DATA.social.map((s, i) => ({ _key: `social${i}`, ...s })),
    email: FOOTER_DATA.email,
    signature: L('footer_signature', 'localizedText'),
    responseLine1: L('footer_response_line1'),
    responseLine2: L('footer_response_line2'),
    copyright: L('footer_copyright'),
    atelierStamp: { _type: 'localizedText', fr: 'Atelier\nBordeaux\nMMXXVI' },
  })
  console.log('✓ Pied de page : réseaux/email + signature/réponse/copyright/cachet seedés')
}

// ---------------------------------------------------------------------------
// 5) Paramètres du site — singleton siteSettings (coordonnées + libellé WhatsApp)
// ---------------------------------------------------------------------------
async function seedSiteSettings() {
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brand: SITE.brand,
    baseline: { _type: 'localizedString', fr: SITE.baseline },
    email: SITE.email,
    whatsapp: SITE.whatsapp,
    whatsappLabel: L('wa_label'),
    instagram: SITE.instagram,
    hours: { _type: 'localizedString', fr: SITE.hours },
    address: { ...SITE.address },
  })
  console.log('✓ Paramètres du site : coordonnées + libellé WhatsApp seedés')
}

// ---------------------------------------------------------------------------
// 6) Contact — singleton contact (drawer + bandeau de clôture partagé)
// ---------------------------------------------------------------------------
async function seedContact() {
  await client.createOrReplace({
    _id: 'contact',
    _type: 'contact',
    eyebrow: L('contact_eyebrow'),
    title: L('contact_title'),
    lede: L('contact_lede', 'localizedText'),
    reassurance: L('contact_reassurance', 'localizedText'),
    faq: [1, 2, 3].map((n) => ({
      _key: `faq${n}`,
      _type: 'faqItem',
      q: L(`contact_faq_q${n}`),
      a: L(`contact_faq_a${n}`, 'localizedText'),
    })),
    successTitle: L('contact_success_title'),
    successBody: L('contact_success_body'),
  })
  console.log('✓ Contact : drawer (sur-titre, titre, accroche, réassurance, FAQ, succès) seedé')
}

async function main() {
  console.log(`Seed sur projet ${projectId} / dataset ${dataset}…`)
  await seedTemoignagePhotos()
  await seedSurMesurePage()
  await seedHomePage()
  await seedFooter()
  await seedSiteSettings()
  await seedContact()
  console.log('✅ Seed terminé.')
}

main().catch((e) => {
  console.error('❌ Seed échoué :', e?.message || e)
  process.exit(1)
})
