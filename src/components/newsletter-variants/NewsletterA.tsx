import { useEffect } from 'react'
import { NEWSLETTER } from './newsletter-data'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export function NewsletterA({ isOpen, onClose, onSubmit }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nl-a-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center px-6 transition-opacity duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        className={`relative bg-cream rounded-[28px] p-8 lg:p-12 max-w-md w-full shadow-[0_40px_80px_-30px_rgba(26,12,4,0.4)] transition-transform duration-500 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-ink/55 hover:text-ink hover:bg-ink/5 rounded-full transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <span className="inline-block px-4 py-1 rounded-full border border-ink/35 font-display italic text-[10px] tracking-[0.4em] uppercase text-ink/80">
          {NEWSLETTER.eyebrow}
        </span>

        <h2 id="nl-a-title" className="mt-5 font-display italic text-[clamp(26px,3.2vw,36px)] leading-[1.1] text-ink">
          {NEWSLETTER.title}
        </h2>

        <p className="mt-3 font-display italic text-[15px] text-ink/70 leading-relaxed">
          {NEWSLETTER.subtitle}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit('')
          }}
          className="mt-7 space-y-3"
        >
          <input
            type="email"
            placeholder={NEWSLETTER.placeholder}
            required
            className="w-full bg-white/70 border border-ink/15 rounded-md px-4 py-3 font-display italic text-[15px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="w-full bg-ink text-cream rounded-md py-3 font-display italic text-[13px] tracking-[0.25em] uppercase hover:bg-raspberry transition-colors"
          >
            {NEWSLETTER.cta}
          </button>
        </form>

        <p className="mt-4 font-display italic text-[11px] text-ink/45 text-center">
          {NEWSLETTER.privacy}
        </p>
      </div>
    </div>
  )
}
