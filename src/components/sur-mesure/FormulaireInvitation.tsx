import { useState } from 'react'
import type { FormEvent } from 'react'
import { SITE } from '../../lib/content/site'
import { CREATION_TYPES, BUDGETS } from '../../lib/content/sur-mesure'
import { sendLead } from '../../lib/leads'
import { m } from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

const FIELD =
  'w-full bg-transparent border-b border-canard/25 py-3 font-display text-[16px] text-canard placeholder:text-canard/40 focus:border-canard focus:outline-none transition-colors'

export function FormulaireInvitation({ whatsapp = SITE.whatsapp }: { whatsapp?: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setSubmitting(true)
    setError(false)
    try {
      await sendLead({
        data: {
          kind: 'bespoke',
          firstName: String(fd.get('prenom') ?? ''),
          lastName: String(fd.get('nom') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? '') || undefined,
          creationType: String(fd.get('creationType') ?? '') || undefined,
          budget: String(fd.get('budget') ?? '') || undefined,
          message: String(fd.get('message') ?? '') || undefined,
          locale: getLocale(),
        },
      })
      setSent(true)
    } catch (err) {
      console.error('[sur-mesure] échec envoi :', err)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="racontez-nous" className="relative bg-poudre py-24 lg:py-32 px-8 lg:px-16 scroll-mt-16">
      <div className="absolute top-0 left-0 right-0 border-t-2 border-double border-canard/15" />

      <div className="mx-auto max-w-[600px] text-center">
        <span className="font-technical text-canard/40 block mb-6">
          {m.invitation_eyebrow()}
        </span>
        <h2 className="font-headline text-[clamp(36px,5vw,56px)] text-canard leading-[0.95] mb-4">
          {m.invitation_title()}
        </h2>
        <p className="font-body italic font-light text-[18px] text-canard/60 leading-relaxed mb-12">
          {m.invitation_subhead()}
        </p>

        {sent ? (
          <p className="font-body italic text-[20px] text-canard py-10">
            {m.form_success()}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="grid grid-cols-2 gap-5">
              <input type="text" name="prenom" placeholder={m.invitation_field_firstname()} required className={FIELD} />
              <input type="text" name="nom" placeholder={m.invitation_field_surname()} required className={FIELD} />
            </div>
            <input type="email" name="email" placeholder={m.invitation_field_email()} required className={FIELD} />
            <input type="tel" name="phone" placeholder={m.invitation_field_phone()} className={FIELD} />
            <div className="grid grid-cols-2 gap-5">
              <select name="creationType" required defaultValue="" className={`${FIELD} appearance-none cursor-pointer`}>
                <option value="" disabled>{m.invitation_field_creation_type()}</option>
                {CREATION_TYPES.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <select name="budget" defaultValue="" className={`${FIELD} appearance-none cursor-pointer`}>
                <option value="" disabled>{m.invitation_field_budget()}</option>
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
            <textarea name="message" placeholder={m.invitation_field_message()} rows={4} className={`${FIELD} resize-none`} />
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={submitting}
                className="px-10 py-3.5 bg-canard text-poudre font-display text-[13px] tracking-[0.25em] uppercase hover:bg-rouille transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {m.invitation_submit()}
              </button>
              {error && (
                <p className="mt-4 font-display text-[13px] text-alerte">{m.form_error()}</p>
              )}
            </div>
          </form>
        )}

        <div className="mt-14 pt-8 border-t border-canard/15 flex flex-col items-center gap-4">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 font-display text-[15px] text-canard/70 hover:text-canard transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
            </svg>
            <span>{m.invitation_whatsapp()}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span className="font-display text-[12px] text-canard/40">
            {SITE.email} · {SITE.hours}
          </span>
          <p className="font-display text-[11px] text-canard/30 max-w-[380px] mt-2">
            {m.invitation_legal_lead()}{' '}
            <a href="/confidentialite" className="underline underline-offset-2 hover:text-canard/50">
              {m.invitation_legal_link()}
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
