import { useEffect } from 'react'
import { NEWSLETTER } from './newsletter-data'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export function NewsletterC({ isOpen, onClose, onSubmit }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[99] bg-ink/30 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="nl-c-title"
        className={`fixed top-0 right-0 bottom-0 z-[100] w-full sm:w-[420px] bg-cream p-8 lg:p-10 shadow-[-30px_0_60px_-20px_rgba(26,12,4,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="self-end w-9 h-9 flex items-center justify-center text-ink/55 hover:text-ink hover:bg-ink/5 rounded-full transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mt-6 flex-1 flex flex-col">
          <span className="font-display italic text-[10px] tracking-[0.4em] uppercase text-ink/55">
            {NEWSLETTER.eyebrow}
          </span>

          <h2 id="nl-c-title" className="mt-4 font-display italic text-[clamp(30px,4vw,44px)] leading-[1.05] text-ink">
            {NEWSLETTER.title}
          </h2>

          <p className="mt-5 font-display italic text-[15px] text-ink/70 leading-relaxed max-w-[36ch]">
            {NEWSLETTER.subtitle}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit('')
            }}
            className="mt-auto space-y-3"
          >
            <label className="block font-display italic text-[10px] tracking-[0.3em] uppercase text-ink/50">
              Votre email
            </label>
            <input
              type="email"
              placeholder={NEWSLETTER.placeholder}
              required
              className="w-full bg-transparent border-b border-ink/25 py-3 font-display italic text-[16px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="mt-6 w-full bg-ink text-cream rounded-md py-3.5 font-display italic text-[13px] tracking-[0.25em] uppercase hover:bg-raspberry transition-colors"
            >
              {NEWSLETTER.cta}
            </button>
            <p className="font-display italic text-[11px] text-ink/45 text-center mt-3">
              {NEWSLETTER.privacy}
            </p>
          </form>
        </div>
      </aside>
    </>
  )
}
