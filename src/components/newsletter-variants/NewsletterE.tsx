import { NEWSLETTER } from './newsletter-data'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}

export function NewsletterE({ isOpen, onClose, onSubmit }: Props) {
  return (
    <div
      role="dialog"
      aria-labelledby="nl-e-title"
      className={`fixed top-0 left-0 right-0 z-[100] bg-cream border-b border-ink/15 shadow-[0_15px_30px_-15px_rgba(26,12,4,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-16 py-4 flex items-center gap-6 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/55">
            {NEWSLETTER.eyebrow}
          </span>
          <h3 id="nl-e-title" className="mt-1 font-display italic text-[18px] lg:text-[20px] text-ink leading-tight">
            {NEWSLETTER.shortSubtitle}
          </h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit('')
          }}
          className="flex items-center gap-2 flex-1 min-w-[300px]"
        >
          <input
            type="email"
            placeholder={NEWSLETTER.placeholder}
            required
            className="flex-1 bg-white border border-ink/15 rounded-md px-3 py-2 font-display italic text-[14px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            className="bg-ink text-cream rounded-md px-5 py-2 font-display italic text-[12px] tracking-[0.2em] uppercase hover:bg-raspberry transition-colors whitespace-nowrap"
          >
            {NEWSLETTER.cta}
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="w-8 h-8 flex items-center justify-center text-ink/55 hover:text-ink hover:bg-ink/5 rounded-full transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
