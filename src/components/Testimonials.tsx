import { useState, useEffect, useCallback, useRef } from 'react'
import { LETTRES } from '../lib/content/lettres'

const INTERVAL_MS = 8000
const N = LETTRES.length

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

type CardRole = 'focus' | 'peek-left' | 'peek-right' | 'hidden'

function getRoleFor(i: number, current: number): CardRole {
  const diff = mod(i - current, N)
  if (diff === 0) return 'focus'
  if (diff === 1) return 'peek-right'
  if (diff === N - 1) return 'peek-left'
  return 'hidden'
}

type Material = { bg: string; text: string; label: string }

const MATERIALS: Material[] = [
  { bg: 'bg-canard', text: 'text-poudre', label: 'text-poudre/55' },
  { bg: 'bg-poudre-dark', text: 'text-canard', label: 'text-canard/60' },
  { bg: 'bg-canard-10', text: 'text-canard', label: 'text-canard/60' },
]

function materialFor(i: number): Material {
  return MATERIALS[mod(i, MATERIALS.length)]!
}

const CARD_TRANSITION = 'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]'

function getCardClasses(role: CardRole, mat: Material): string {
  const base = `absolute top-0 h-full rounded-[24px] p-6 lg:p-9 flex flex-col items-center justify-center text-center ${mat.bg} ${mat.text} ${CARD_TRANSITION}`
  const sizing = 'w-[88%] max-w-[460px]'

  if (role === 'focus') {
    return `${base} ${sizing} left-1/2 -translate-x-1/2 z-30 opacity-100 scale-100 shadow-[0_30px_70px_-30px_rgba(26,12,4,0.45)]`
  }
  if (role === 'peek-right') {
    return `${base} ${sizing} left-1/2 translate-x-[35%] z-10 opacity-35 scale-[0.82] pointer-events-none hidden md:flex`
  }
  if (role === 'peek-left') {
    return `${base} ${sizing} left-1/2 -translate-x-[135%] z-10 opacity-35 scale-[0.82] pointer-events-none hidden md:flex`
  }
  return `${base} ${sizing} left-1/2 -translate-x-1/2 z-0 opacity-0 scale-[0.7] pointer-events-none`
}

export function Testimonials() {
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

  const goNext = useCallback(() => setCurrent((c) => mod(c + 1, N)), [])
  const goPrev = useCallback(() => setCurrent((c) => mod(c - 1, N)), [])

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
      className="scroll-mt-20 relative bg-poudre py-14 lg:py-20 px-4 lg:px-8 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Témoignages clientes"
    >
      <div className="mx-auto max-w-[1400px] flex flex-col items-center text-center">
        <span className="inline-block px-5 py-1.5 rounded-full border border-canard/35 font-display text-[11px] tracking-[0.4em] uppercase text-canard/80">
          Témoignages
        </span>

        <h2 className="font-display text-[clamp(30px,4.2vw,52px)] leading-[1.05] text-canard mt-5 mb-9 lg:mb-12 max-w-[16ch]">
          Celles qui les
          <br />
          portent en parlent
        </h2>

        <div className="relative w-full h-[300px] sm:h-[320px] lg:h-[340px]">
          {LETTRES.map((t, i) => {
            const role = getRoleFor(i, current)
            const mat = materialFor(i)
            return (
              <article
                key={t.auteur}
                className={getCardClasses(role, mat)}
                aria-hidden={role !== 'focus'}
                aria-label={`Témoignage de ${t.auteur}, ${t.ville}`}
              >
                <p
                  className={`font-display text-[clamp(16px,1.7vw,20px)] leading-[1.45] ${mat.text}`}
                >
                  « {t.citation} »
                </p>
                <footer
                  className={`mt-4 font-display text-[11px] tracking-[0.3em] uppercase ${mat.label}`}
                >
                  {t.auteur}, {t.ville}
                </footer>
              </article>
            )
          })}
        </div>

        <div
          className="flex items-center gap-3 mt-8 lg:mt-10"
          role="group"
          aria-label="Navigation des témoignages"
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Témoignage précédent"
            className="w-10 h-10 rounded-full border border-canard/30 flex items-center justify-center text-canard hover:bg-canard hover:text-poudre transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canard"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M9 2 L4 7 L9 12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Témoignage suivant"
            className="w-10 h-10 rounded-full border border-canard/30 flex items-center justify-center text-canard hover:bg-canard hover:text-poudre transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canard"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M5 2 L10 7 L5 12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
