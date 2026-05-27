import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { SITE } from '../lib/content/site'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  return (
    <section className="relative bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Colonne gauche : intro + coordonnees */}
        <div>
          <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
            Contact
          </span>
          <h1 className="font-display italic text-[clamp(48px,7vw,90px)] text-ink leading-[0.95]">
            Parlons de votre projet.
          </h1>
          <p className="font-display italic text-[18px] text-ink/75 mt-8 leading-relaxed max-w-prose">
            Une question sur la collection ? Une création sur-mesure ? Un simple bonjour ? Écrivez-moi par
            formulaire, par mail ou directement par WhatsApp. Je vous réponds sous 24h.
          </p>

          <ul className="mt-12 space-y-6">
            <li>
              <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase block mb-1">
                Email
              </span>
              <a href={`mailto:${SITE.email}`} className="font-script text-[22px] text-raspberry hover:text-ink transition-colors">
                {SITE.email}
              </a>
            </li>
            <li>
              <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase block mb-1">
                WhatsApp
              </span>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-script text-[22px] text-raspberry hover:text-ink transition-colors"
              >
                Discuter directement
              </a>
            </li>
            <li>
              <span className="font-display italic text-[11px] tracking-[0.3em] text-gold uppercase block mb-1">
                Atelier
              </span>
              <span className="font-script text-[20px] text-raspberry not-italic leading-[1.6]">
                {SITE.address.street}, {SITE.address.zip} {SITE.address.city}
                <br />
                {SITE.hours}
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
  const [form, setForm] = useState({ nom: '', email: '', message: '' })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) return
    setSent(true)
    // TODO Phase 7 : envoyer vers Convex (table leads) + email Brevo
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 py-8">
        <span className="font-display italic text-[28px] text-ink">Merci !</span>
        <p className="font-script text-[20px] text-raspberry">
          Votre message est bien arrivé. Je vous réponds sous 24h. É.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field label="Votre nom">
        <input
          type="text"
          required
          value={form.nom}
          onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
          className="w-full bg-transparent border-b border-ink/30 pb-2 font-sans text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </Field>
      <Field label="Votre email">
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full bg-transparent border-b border-ink/30 pb-2 font-sans text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </Field>
      <Field label="Votre message">
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
        className="self-start font-display italic text-[16px] text-ink border border-ink/30 px-8 py-3 mt-2 hover:bg-ink hover:text-cream transition-all duration-300"
      >
        Envoyer →
      </button>
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
