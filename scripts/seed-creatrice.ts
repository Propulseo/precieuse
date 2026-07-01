/**
 * Seed du singleton `creatricePage` (page Créatrice) depuis la version statique
 * (Paraglide FR/EN/PT + littéraux). Idempotent : createOrReplace sur un _id
 * déterministe. Publié (pas de brouillon) → la page devient pilotée par Sanity.
 *
 * Lancer : node_modules/.bin/tsx scripts/seed-creatrice.ts
 * Requiert dans .env : VITE_SANITY_PROJECT_ID, SANITY_WRITE_TOKEN (rôle Editor).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

try {
  ;(process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile('.env')
} catch {
  /* déjà chargé via --env-file */
}

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
/** Membre de tableau localizedText avec _key (requis par Sanity). */
function Lk(key: string, arrayKey: string) {
  return { _key: arrayKey, ...L(key, 'localizedText') }
}

async function main() {
  const asset = await client.assets.upload(
    'image',
    readFileSync(join('public', 'images/emeline-portrait.jpg')),
    { filename: 'emeline-portrait.jpg' },
  )

  await client.createOrReplace({
    _id: 'creatricePage',
    _type: 'creatricePage',
    introTitle: L('creatrice_intro_title'),
    introLede: L('creatrice_intro_lede', 'localizedText'),
    portrait: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: L('creatrice_intro_portrait_alt'),
    },
    captionName: 'Emeline Le Ray',
    captionPlace: 'Bordeaux · MMXXV',
    parcours: [Lk('creatrice_parcours_p1', 'p1'), Lk('creatrice_parcours_p2', 'p2')],
    philosophieBody: L('creatrice_philosophie_body', 'localizedText'),
    quote: L('creatrice_philosophie_quote', 'localizedText'),
    signatureName: 'Emeline',
    signatureRole: L('creatrice_signature_role'),
  })

  console.log('✅ creatricePage seedé (publié)')
}

main().catch((e) => {
  console.error('Erreur seed:', e.message)
  process.exit(1)
})
