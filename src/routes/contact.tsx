import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { getSite } from '../lib/cms'
import { sendLead } from '../lib/leads'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  loader: async () => ({ site: await getSite(getLocale()) }),
})

function ContactPage() {
  const { site } = Route.useLoaderData()
  return (
    <section className="relative bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Colonne gauche : intro + coordonnees */}
        <div>
          <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
            {m.contact_eyebrow()}
          </span>
          <h1 className="font-display italic text-[clamp(48px,7vw,90px)] text-ink leading-[0.95]">
            {m.contact_title()}
          </h1>
          <p className="font-display italic text-[18px] text-ink/75 mt-8 leading-relaxed max-w-prose">
            {m.contact_lede()}
          </p>

          <ul className="mt-12 space-y-6">
            <li>
              <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase block mb-1">
                {m.contact_label_email()}
              </span>
              <a href={`mailto:${site.email}`} className="font-script text-[22px] text-raspberry hover:text-ink transition-colors">
                {site.email}
              </a>
            </li>
            <li>
              <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase block mb-1">
                {m.contact_label_whatsapp()}
              </span>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-script text-[22px] text-raspberry hover:text-ink transition-colors"
              >
                {m.contact_whatsapp_link()}
              </a>
            </li>
            <li>
              <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase block mb-1">
                {m.contact_label_atelier()}
              </span>
              <span className="font-script text-[20px] text-raspberry not-italic leading-[1.6]">
                {site.address.street}, {site.address.zip} {site.address.city}
                <br />
                {site.hours}
              </span>
            </li>
          </ul>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="bg-white/85 border border-ink/10 p-8 sm:p-10 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.15)]">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', message: '' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) return
    setSubmitting(true)
    setError(false)
    try {
      await sendLead({
        data: {
          kind: 'contact',
          name: form.nom,
          email: form.email,
          message: form.message,
          locale: getLocale(),
        },
      })
      setSent(true)
    } catch (err) {
      console.error('[contact] échec envoi :', err)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 py-8">
        <span className="font-display italic text-[28px] text-ink">{m.contact_success_title()}</span>
        <p className="font-script text-[20px] text-raspberry">
          {m.contact_success_body()}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field label={m.contact_field_name()}>
        <input
          type="text"
          required
          value={form.nom}
          onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
          className="w-full bg-transparent border-b border-ink/30 pb-2 font-sans text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </Field>
      <Field label={m.contact_field_email()}>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full bg-transparent border-b border-ink/30 pb-2 font-sans text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </Field>
      <Field label={m.contact_field_message()}>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full bg-transparent border-b border-ink/30 pb-2 font-sans text-[15px] text-ink focus:outline-none focus:border-ink transition-colors resize-none"
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="self-start font-display italic text-[16px] text-ink border border-ink/30 px-8 py-3 mt-2 hover:bg-ink hover:text-cream transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {m.contact_submit()} →
      </button>
      {error && (
        <p className="font-sans text-[13px] text-raspberry">
          {m.form_error()}
        </p>
      )}
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase">{label}</span>
      {children}
    </label>
  )
}
