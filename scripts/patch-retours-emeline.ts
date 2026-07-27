/**
 * Patch cible des retours Emeline du 27/07 dans Sanity.
 *
 * Pourquoi ce script plutôt que `pnpm seed` : le seed fait un
 * `createOrReplace` sur TOUS les documents du catalogue et des singletons. Ici
 * on ne veut toucher que les quelques champs commentés par Emeline, en laissant
 * intact tout le reste (photos, hotspots, SEO, réglages…). On utilise donc un
 * `patch().set()`, qui ne remplace que les chemins listés.
 *
 * Les textes ne sont PAS recopiés ici : ils sont lus dans `messages/*.json`,
 * seule source de vérité. Impossible que Sanity et le code divergent.
 *
 * Champs touchés :
 *   homePage.aproposManifesto    (#1 à #5)
 *   homePage.bespokeTagline      (#23)
 *   homePage.newsletterSubtitle  (#6)
 *   surMesurePage.steps          (#24 à #27)
 *
 * Les matières et les témoignages n'ont AUCUN document dans le dataset : le
 * site sert le repli statique de `src/lib/content/*`, déjà à jour. Rien à
 * pousser pour eux.
 *
 * Lancer :  node_modules/.bin/tsx scripts/patch-retours-emeline.ts
 *           --dry pour afficher le patch sans rien écrire.
 * Requiert dans .env : VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET,
 *                      VITE_SANITY_API_VERSION, SANITY_WRITE_TOKEN (rôle Editor).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

try {
  ;(process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile('.env')
} catch {
  /* déjà chargé via --env-file, ou indisponible */
}

const DRY = process.argv.includes('--dry')

const projectId = process.env.VITE_SANITY_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2026-05-01'

if (!projectId || (!token && !DRY)) {
  console.error('❌ VITE_SANITY_PROJECT_ID et/ou SANITY_WRITE_TOKEN manquant(s) dans .env')
  process.exit(1)
}

type Messages = Record<string, string>

function messages(locale: 'fr' | 'en' | 'pt'): Messages {
  const raw = readFileSync(join(process.cwd(), 'messages', `${locale}.json`), 'utf8')
  return JSON.parse(raw) as Messages
}

const FR = messages('fr')
const EN = messages('en')
const PT = messages('pt')

/** Valeur localisée bâtie depuis les 3 fichiers i18n pour une même clé. */
function L(type: 'localizedString' | 'localizedText', key: string) {
  const fr = FR[key]
  if (fr === undefined) throw new Error(`clé i18n absente : ${key}`)
  return { _type: type, fr, en: EN[key] ?? '', pt: PT[key] ?? '' }
}

// Les _key et _type reprennent EXACTEMENT ceux déjà en base (pair1..pair4,
// step1..step4) : sans ça, Sanity considérerait des entrées différentes.
const aproposManifesto = [1, 2, 3, 4].map((i) => ({
  _key: `pair${i}`,
  _type: 'pair',
  pas: L('localizedString', `avantpropos_pair${i}_pas`),
  mais: L('localizedString', `avantpropos_pair${i}_mais`),
}))

const steps = [1, 2, 3, 4].map((i) => ({
  _key: `step${i}`,
  _type: 'step',
  title: L('localizedString', `sm_step${i}_title`),
  body: L('localizedText', `sm_step${i}_body`),
}))

const homePatch = {
  aproposManifesto,
  bespokeTagline: L('localizedString', 'surmesure_intro_tagline'),
  newsletterSubtitle: L('localizedString', 'newsletter_short_subtitle'),
}

const surMesurePatch = { steps }

async function main() {
  if (DRY) {
    console.log('— patch homePage —')
    console.log(JSON.stringify(homePatch, null, 2))
    console.log('\n— patch surMesurePage —')
    console.log(JSON.stringify(surMesurePatch, null, 2))
    console.log('\n(--dry : rien écrit)')
    return
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

  console.log(`→ patch de homePage et surMesurePage (dataset « ${dataset} »)…`)
  await client
    .transaction()
    .patch('homePage', (p) => p.set(homePatch))
    .patch('surMesurePage', (p) => p.set(surMesurePatch))
    .commit()

  console.log('✅ Patch appliqué :')
  console.log('   homePage      → aproposManifesto (4 paires), bespokeTagline, newsletterSubtitle')
  console.log('   surMesurePage → steps (4 étapes, titre + corps)')
}

main().catch((e) => {
  console.error('❌ Échec du patch :', e?.message ?? e)
  process.exit(1)
})
