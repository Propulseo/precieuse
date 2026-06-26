/**
 * Client Brevo — SERVEUR UNIQUEMENT.
 *
 * Lit la configuration via `process.env` (jamais préfixé `VITE_`, donc absent
 * du bundle navigateur), comme le token Sanity dans `src/lib/cms/client.ts`.
 *
 * Repli gracieux : si `BREVO_API_KEY` est absente, les fonctions ne lèvent
 * jamais — elles loguent et renvoient `{ ok: false, skipped: true }`. Ainsi le
 * site fonctionne sans Brevo (rien n'est envoyé), et l'envoi s'active dès que la
 * clé est fournie côté serveur (Vercel).
 */

const API_BASE = 'https://api.brevo.com/v3'

type BrevoResult = { ok: boolean; skipped?: boolean; error?: string }

function config() {
  if (typeof process === 'undefined') return null
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return null
  return {
    apiKey,
    listId: Number(process.env.BREVO_LIST_ID) || undefined,
    notifyEmail: process.env.LEAD_NOTIFY_EMAIL || 'atelier@precieuse-joaillerie.com',
    fromEmail: process.env.LEAD_FROM_EMAIL || 'atelier@precieuse-joaillerie.com',
  }
}

async function brevoFetch(path: string, body: unknown): Promise<BrevoResult> {
  const cfg = config()
  if (!cfg) {
    console.warn(`[brevo] BREVO_API_KEY absente — appel ${path} ignoré (no-op).`)
    return { ok: false, skipped: true }
  }
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'api-key': cfg.apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[brevo] ${path} → ${res.status} ${detail}`)
      return { ok: false, error: `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    console.error(`[brevo] ${path} échec réseau :`, err)
    return { ok: false, error: 'network' }
  }
}

/** Email transactionnel récapitulatif vers Emeline (une demande reçue). */
export async function sendNotificationEmail(params: {
  subject: string
  htmlContent: string
  replyTo?: { email: string; name?: string }
}): Promise<BrevoResult> {
  const cfg = config()
  if (!cfg) {
    console.warn('[brevo] BREVO_API_KEY absente — email de notif ignoré (no-op).')
    return { ok: false, skipped: true }
  }
  return brevoFetch('/smtp/email', {
    sender: { email: cfg.fromEmail, name: 'Précieuse — site' },
    to: [{ email: cfg.notifyEmail }],
    replyTo: params.replyTo,
    subject: params.subject,
    htmlContent: params.htmlContent,
  })
}

/** Ajoute/maj un contact dans la liste newsletter (idempotent par email). */
export async function upsertContact(params: {
  email: string
  attributes?: Record<string, string>
}): Promise<BrevoResult> {
  const cfg = config()
  if (!cfg) {
    console.warn('[brevo] BREVO_API_KEY absente — contact non ajouté (no-op).')
    return { ok: false, skipped: true }
  }
  return brevoFetch('/contacts', {
    email: params.email,
    attributes: params.attributes,
    listIds: cfg.listId ? [cfg.listId] : undefined,
    updateEnabled: true,
  })
}
