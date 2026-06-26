import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { sendNotificationEmail, upsertContact } from './brevo'

/**
 * Server functions de capture de leads — exécutées côté serveur via RPC
 * (createServerFn). Les formulaires (composants client) les appellent ; la clé
 * Brevo reste serveur. Sans clé, les helpers Brevo font no-op (cf. brevo.ts),
 * donc l'appel réussit sans rien envoyer.
 */

const LeadSchema = z.object({
  kind: z.enum(['contact', 'bespoke', 'leadCapture']),
  civility: z.enum(['M', 'Mme']).optional(),
  firstName: z.string().max(120).optional(),
  lastName: z.string().max(120).optional(),
  name: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().max(5000).optional(),
  creationType: z.string().max(120).optional(),
  budget: z.string().max(120).optional(),
  locale: z.string().max(5).optional(),
})

export type LeadInput = z.infer<typeof LeadSchema>

const NewsletterSchema = z.object({
  email: z.string().email(),
  locale: z.string().max(5).optional(),
})

const KIND_LABEL: Record<LeadInput['kind'], string> = {
  contact: 'Contact',
  bespoke: 'Demande sur-mesure',
  leadCapture: 'Photos portées',
}

function esc(value?: string): string {
  if (!value) return '—'
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildHtml(data: LeadInput): string {
  const rows: Array<[string, string | undefined]> = [
    ['Civilité', data.civility],
    ['Prénom', data.firstName],
    ['Nom', data.lastName ?? data.name],
    ['Email', data.email],
    ['Téléphone', data.phone],
    ['Type de création', data.creationType],
    ['Budget', data.budget],
    ['Langue', data.locale],
    ['Message', data.message],
  ]
  const body = rows
    .map(
      ([label, val]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#005454;font-weight:600">${label}</td><td style="padding:4px 0">${esc(val)}</td></tr>`,
    )
    .join('')
  return `<h2 style="font-family:Georgia,serif;color:#005454">${KIND_LABEL[data.kind]}</h2><table style="font-family:Arial,sans-serif;font-size:14px">${body}</table>`
}

export const sendLead = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await sendNotificationEmail({
      subject: `Précieuse — ${KIND_LABEL[data.kind]} (${data.email})`,
      htmlContent: buildHtml(data),
      replyTo: { email: data.email, name: data.firstName ?? data.name },
    })
    return { ok: result.ok, skipped: result.skipped ?? false }
  })

export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => NewsletterSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await upsertContact({
      email: data.email,
      attributes: { SOURCE: 'newsletter', LOCALE: data.locale ?? 'fr' },
    })
    return { ok: result.ok, skipped: result.skipped ?? false }
  })
