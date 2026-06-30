import { useState, useEffect, useRef, useCallback } from 'react'
import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react'
import { m } from '#/paraglide/messages'
import { LETTRES, type Lettre } from '../lib/content/lettres'

const INTERVAL_MS = 7000

// Fallback si une lettre CMS n'a pas (encore) sa photo : les 3 bagues « sur chaise ».
const FALLBACK_IMAGES = [
  '/images/real/bague-main-chaise-aurore.webp',
  '/images/real/bague-main-chaise-thelma.webp',
  '/images/real/main-chaise-josephine.webp',
]

function mod(n: number, base: number): number {
  return ((n % base) + base) % base
}

/**
 * Témoignages — « galerie portée » : une grande photo de la pièce portée
 * (parallaxe à la souris) + une carte citation en verre poudré. 1 avis =
 * 1 photo = 1 bague. Lecture auto (en vue, hors survol), swipe tactile, points
 * de navigation, `prefers-reduced-motion` respecté.
 */
export function Testimonials({ lettres = LETTRES }: { lettres?: Lettre[] }) {
  const N = lettres.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setInView(!!e?.isIntersecting),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const goTo = useCallback((i: number) => setCurrent(mod(i, N)), [N])
  const goNext = useCallback(() => setCurrent((c) => mod(c + 1, N)), [N])
  const goPrev = useCallback(() => setCurrent((c) => mod(c - 1, N)), [N])

  useEffect(() => {
    if (!inView || paused || reducedMotion) return
    const t = setInterval(goNext, INTERVAL_MS)
    return () => clearInterval(t)
  }, [inView, paused, reducedMotion, goNext])

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const f = frameRef.current
    if (!f || reducedMotion) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    f.style.transform = `translate(${x * -20}px, ${y * -20}px)`
  }
  const onLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = ''
  }
  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    if (Math.abs(delta) >= 50) (delta < 0 ? goNext : goPrev)()
    touchStartX.current = null
  }

  const active = lettres[current]
  if (!active) return null
  const fade = reducedMotion
    ? ''
    : 'animate-in fade-in slide-in-from-bottom-2 duration-500'

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="scroll-mt-20 relative bg-poudre py-8 lg:py-10 px-4 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={m.testimonials_carousel_label()}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center mb-7 lg:mb-9">
          <h2 className="font-headline text-[clamp(28px,4vw,46px)] leading-[1.06] text-canard">
            {m.testimonials_title_line1()} {m.testimonials_title_line2()}
          </h2>
        </div>

        <div
          className="relative h-[min(48vh,440px)] rounded-[30px] overflow-hidden shadow-[0_40px_80px_-46px_rgba(13,71,71,0.45)]"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={frameRef}
            className="absolute -inset-[7%] transition-transform duration-300 ease-out"
          >
            {lettres.map((t, i) => (
              <img
                key={t.auteur}
                src={t.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]!}
                alt={t.imageAlt || m.testimonials_photo_alt({ model: t.piece })}
                aria-hidden={i !== current}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{ objectPosition: t.imagePosition }}
                className={`absolute inset-0 w-full h-full object-cover ${
                  reducedMotion ? '' : 'transition-opacity duration-1000 ease-out'
                } ${i === current ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          {/* Voile dégradé pour asseoir la carte sur la gauche */}
          <div className="absolute inset-0 bg-gradient-to-r from-canard/65 via-canard/15 to-transparent pointer-events-none" />

          {/* Points (indiquent la position) */}
          <div
            className="absolute right-6 top-6 flex flex-col gap-2.5"
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
                className={`w-[7px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-poudre ${
                  i === current ? 'h-6 bg-framboise' : 'h-[7px] bg-poudre/55 hover:bg-poudre'
                }`}
              />
            ))}
          </div>

          {/* Carte citation — verre poudré */}
          <div className="absolute left-5 bottom-5 sm:left-7 sm:bottom-7 w-[min(500px,84%)] rounded-[22px] bg-poudre/85 backdrop-blur-md border border-white/50 p-5 sm:p-6 shadow-[0_30px_60px_-34px_rgba(13,71,71,0.55)]">
            <p
              key={current}
              aria-live="polite"
              className={`font-display text-[14.5px] sm:text-[16px] leading-[1.5] text-canard ${fade}`}
            >
              <span
                aria-hidden
                className="float-left font-display text-[38px] leading-[0.7] text-framboise mr-2.5 -mt-0.5 select-none"
              >
                «
              </span>
              {active.citation}
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <span
                key={`a-${current}`}
                className={`font-display text-[12px] tracking-[0.28em] uppercase text-canard ${fade}`}
              >
                {active.auteur} · {active.ville}
                <span className="block mt-1.5 font-body italic font-light text-[14px] tracking-normal normal-case text-canard/60">
                  {active.piece}
                </span>
              </span>
              <span className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={m.testimonials_prev_label()}
                  className="w-9 h-9 rounded-full border border-canard/30 flex items-center justify-center text-canard hover:bg-canard hover:text-poudre transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canard"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label={m.testimonials_next_label()}
                  className="w-9 h-9 rounded-full border border-canard/30 flex items-center justify-center text-canard hover:bg-canard hover:text-poudre transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canard"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
