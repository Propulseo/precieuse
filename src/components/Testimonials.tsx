import { useState, useEffect, useCallback, useRef } from 'react'
import { m } from '#/paraglide/messages'
import { Eyebrow } from './Eyebrow'
import { LETTRES, type Lettre } from '../lib/content/lettres'

// PLACEHOLDER : carte canard simple, le temps de choisir le format « waouh »
// final (exploré en previews HTML autonomes dans public/previews/).

const INTERVAL_MS = 8000

function mod(n: number, base: number): number {
  return ((n % base) + base) % base
}

export function Testimonials({ lettres = LETTRES }: { lettres?: Lettre[] }) {
  const N = lettres.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const goTo = useCallback((i: number) => setCurrent(mod(i, N)), [N])
  const goNext = useCallback(() => setCurrent((c) => mod(c + 1, N)), [N])
  const goPrev = useCallback(() => setCurrent((c) => mod(c - 1, N)), [N])

  useEffect(() => {
    if (paused || reducedMotion) return
    timerRef.current = setInterval(goNext, INTERVAL_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, reducedMotion, goNext])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX
    if (Math.abs(delta) >= 50) {
      if (delta < 0) goNext()
      else goPrev()
    }
    setTouchStartX(null)
  }

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 relative bg-poudre py-14 lg:py-20 px-4 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label={m.testimonials_carousel_label()}
    >
      <div className="mx-auto max-w-[760px] flex flex-col items-center text-center">
        <Eyebrow className="mb-3">{m.testimonials_overline()}</Eyebrow>

        <h2 className="font-headline text-[clamp(28px,4vw,46px)] leading-[1.06] text-canard mb-8 lg:mb-10 max-w-[18ch]">
          {m.testimonials_title_line1()} {m.testimonials_title_line2()}
        </h2>

        <div className="relative w-full min-h-[360px] sm:min-h-[320px] lg:min-h-[300px]">
          {lettres.map((t, i) => (
            <article
              key={t.auteur}
              aria-hidden={i !== current}
              aria-label={m.testimonials_card_label({ author: t.auteur, city: t.ville })}
              className={`absolute inset-0 flex flex-col items-center justify-center rounded-[28px] bg-canard text-poudre px-7 py-10 lg:px-14 lg:py-12 shadow-[0_24px_60px_-32px_rgba(18,94,94,0.5)] transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <span
                aria-hidden
                className="font-display text-[56px] leading-none text-poudre/30 select-none mb-2"
              >
                «
              </span>
              <p className="font-display text-[clamp(17px,1.9vw,22px)] leading-[1.5] text-poudre max-w-[46ch]">
                {t.citation}
              </p>
              <footer className="mt-7 flex flex-col items-center gap-1">
                <span className="font-display text-[12px] tracking-[0.3em] uppercase text-poudre">
                  {t.auteur} · {t.ville}
                </span>
                <span className="font-body italic font-light text-[14px] text-poudre/60">
                  {t.piece}
                </span>
              </footer>
            </article>
          ))}
        </div>

        <div
          className="flex items-center gap-2.5 mt-8"
          role="group"
          aria-label={m.testimonials_nav_label()}
        >
          {lettres.map((t, i) => (
            <button
              key={t.auteur}
              type="button"
              onClick={() => goTo(i)}
              aria-label={m.testimonials_card_label({ author: t.auteur, city: t.ville })}
              aria-current={i === current}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canard focus-visible:ring-offset-2 focus-visible:ring-offset-poudre ${
                i === current ? 'w-7 bg-framboise' : 'w-2 bg-canard/25 hover:bg-canard/45'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
