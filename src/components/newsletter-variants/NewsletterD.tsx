import { useEffect } from 'react'
import { NEWSLETTER } from './newsletter-data'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export function NewsletterD({ isOpen, onClose, onSubmit }: Props) {
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
      aria-labelledby="nl-d-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center px-6 transition-opacity duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        className={`relative grid grid-cols-1 md:grid-cols-2 max-w-[780px] w-full bg-cream rounded-[28px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(26,12,4,0.45)] transition-transform duration-500 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* LEFT — visuel matières */}
        <div className="relative min-h-[200px] md:min-h-[440px] bg-gradient-to-br from-rose-gold via-ivory to-oxidized-silver/35 flex items-end p-8 lg:p-10">
          <div className="relative max-w-[18ch]">
            <span className="font-display italic text-[10px] tracking-[0.4em] uppercase text-ink/60">
              {NEWSLETTER.eyebrow}
            </span>
            <p className="mt-4 font-display italic text-[clamp(22px,2.5vw,28px)] leading-[1.15] text-ink">
              « De l'atelier à votre boîte mail. »
            </p>
            <p className="mt-3 font-display italic text-[12px] tracking-[0.2em] uppercase text-ink/55">
              Eméline
            </p>
          </div>
        </div>

        {/* RIGHT — formulaire */}
        <div className="relative p-8 lg:p-10 flex flex-col">
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

          <h2 id="nl-d-title" className="mt-2 font-display italic text-[clamp(24px,2.8vw,32px)] leading-[1.1] text-ink">
            {NEWSLETTER.title}
          </h2>
          <p className="mt-3 font-display italic text-[14px] text-ink/70 leading-relaxed">
            {NEWSLETTER.subtitle}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit('')
            }}
            className="mt-6 space-y-3"
          >
            <input
              type="email"
              placeholder={NEWSLETTER.placeholder}
              required
              className="w-full bg-white/80 border border-ink/15 rounded-md px-4 py-3 font-display italic text-[15px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="w-full bg-ink text-cream rounded-md py-3 font-display italic text-[13px] tracking-[0.25em] uppercase hover:bg-raspberry transition-colors"
            >
              {NEWSLETTER.cta}
            </button>
          </form>

          <p className="mt-auto pt-4 font-display italic text-[11px] text-ink/45">
            {NEWSLETTER.privacy}
          </p>
        </div>
      </div>
    </div>
  )
}
