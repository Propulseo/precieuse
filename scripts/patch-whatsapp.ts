/**
 * Patch ciblé : met à jour le numéro WhatsApp dans le singleton siteSettings.
 *
 * Lancer :  node_modules/.bin/tsx scripts/patch-whatsapp.ts
 *           --dry pour afficher sans écrire.
 * Requiert dans .env : VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET,
 *                      VITE_SANITY_API_VERSION, SANITY_WRITE_TOKEN (rôle Editor).
 */
import { createClient } from '@sanity/client'

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

const WHATSAPP = 'https://wa.me/33623185887'

if (!projectId || (!token && !DRY)) {
  console.error('❌ VITE_SANITY_PROJECT_ID et/ou SANITY_WRITE_TOKEN manquant(s) dans .env')
  process.exit(1)
}

async function main() {
  if (DRY) {
    console.log(`(--dry) siteSettings.whatsapp → ${WHATSAPP}`)
    return
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

  console.log(`→ patch de siteSettings.whatsapp (dataset « ${dataset} »)…`)
  await client.patch('siteSettings').set({ whatsapp: WHATSAPP }).commit()

  console.log(`✅ siteSettings.whatsapp → ${WHATSAPP}`)
}

main().catch((e) => {
  console.error('❌ Échec du patch :', e?.message ?? e)
  process.exit(1)
})
