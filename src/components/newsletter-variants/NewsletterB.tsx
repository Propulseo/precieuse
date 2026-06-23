import { useState } from 'react'
import { NEWSLETTER } from './newsletter-data'
import { m } from '#/paraglide/messages'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export function NewsletterB({ isOpen, onClose, onSubmit }: Props) {
  const [email, setEmail] = useState('')

  return (
    <div
      role="dialog"
      aria-labelledby="nl-b-title"
      className={`fixed bottom-6 right-6 z-[100] w-[340px] max-w-[calc(100vw-3rem)] bg-poudre rounded-[24px] p-7 shadow-[0_30px_60px_-20px_rgba(0,84,84,0.25)] border border-canard/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? 'translate-x-0 opacity-100'
          : 'translate-x-[calc(100%+2rem)] opacity-0 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={m.newsletter_close()}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-canard/55 hover:text-canard hover:bg-canard/5 rounded-full transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path d="M3 3 L10 10 M10 3 L3 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      <span className="font-display text-[10px] tracking-[0.35em] uppercase text-canard/55">
        {NEWSLETTER.eyebrow}
      </span>

      <h3 id="nl-b-title" className="mt-2 font-display text-[22px] leading-tight text-canard">
        {NEWSLETTER.title}
      </h3>

      <p className="mt-2 font-display text-[13px] text-canard/70 leading-relaxed">
        {NEWSLETTER.shortSubtitle}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(email)
        }}
        className="mt-5 space-y-2"
      >
        <input
          type="email"
          placeholder={NEWSLETTER.placeholder}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-poudre-dark/30 border border-canard/15 rounded-md px-3 py-2 font-display text-[14px] text-canard placeholder:text-canard/40 focus:border-canard focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-canard text-poudre rounded-md py-2 font-display text-[12px] tracking-[0.2em] uppercase hover:bg-canard-90 transition-colors"
        >
          {NEWSLETTER.cta}
        </button>
      </form>
    </div>
  )
}
