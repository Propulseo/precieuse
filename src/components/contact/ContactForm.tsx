import { useState } from 'react'
import type { FormEvent } from 'react'
import { sendLead } from '../../lib/leads'
import { getLocale } from '#/paraglide/runtime'
import { contactFallback } from '../../lib/content/contact'
import type { ContactContent } from '../../lib/content/contact'

const SUBJECT_IDS = ['question', 'bespoke', 'care', 'press'] as const

type SubjectId = (typeof SUBJECT_IDS)[number]

const inputCls =
  'w-full bg-transparent border-b border-canard/30 py-1.5 font-body text-[16px] text-canard placeholder:text-canard/55 focus:outline-none focus:border-framboise transition-colors'
const labelCls =
  'block font-display text-[10px] tracking-[0.28em] uppercase text-canard/90 mb-1.5'

/** Formulaire du drawer Contact (ambiance Épure) : nom, email, sujet en chips,
 *  message. Envoi via la server fn `sendLead` (kind contact, sujet → creationType).
 *  Tout le texte (libellés, sujets, bouton, messages) vient de Sanity via
 *  `content`, avec repli i18n. Les identifiants de sujet, eux, restent figés :
 *  ils partent en base avec le lead. */
export function ContactForm({
  content = contactFallback(),
}: {
  content?: ContactContent
} = {}) {
  const success = { title: content.successTitle, body: content.successBody }
  const SUBJECTS = [
    { id: 'question', label: content.form.subjects.question },
    { id: 'bespoke', label: content.form.subjects.bespoke },
    { id: 'care', label: content.form.subjects.care },
    { id: 'press', label: content.form.subjects.press },
  ] as const satisfies ReadonlyArray<{ id: SubjectId; label: string }>
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [subject, setSubject] = useState<SubjectId>('question')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSubmitting(true)
    setError(false)
    try {
      await sendLead({
        data: {
          kind: 'contact',
          name: form.name,
          email: form.email,
          message: form.message,
          creationType: subject,
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
      <div className="flex flex-col items-start gap-2 py-4">
        <span className="font-display text-[24px] text-canard">
          {success.title}
        </span>
        <p className="font-display italic text-[16px] text-framboise">
          {success.body}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3.5 flex flex-col gap-3.5">
      <div className="flex gap-[18px]">
        <label className="flex-1">
          <span className={labelCls}>{content.form.fieldName}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
          />
        </label>
        <label className="flex-1">
          <span className={labelCls}>{content.form.fieldEmail}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
          />
        </label>
      </div>

      <div>
        <span className={labelCls}>{content.form.fieldSubject}</span>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSubject(s.id)}
              aria-pressed={subject === s.id}
              className={`font-display text-[11.5px] rounded-full px-3 py-2.5 md:py-1.5 border transition-colors ${
                subject === s.id
                  ? 'bg-canard text-poudre border-canard'
                  : 'border-canard/40 text-canard/85 hover:text-canard'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <label>
        <span className={labelCls}>{content.form.fieldMessage}</span>
        <textarea
          required
          rows={2}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${inputCls} min-h-[54px] resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="self-start font-display text-[12px] tracking-[0.24em] uppercase px-7 py-3 rounded-full bg-canard text-poudre hover:bg-framboise transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {content.form.submitLabel} →
      </button>

      {error && (
        <p role="alert" className="font-body text-[13px] text-framboise">{content.form.errorMessage}</p>
      )}
    </form>
  )
}
