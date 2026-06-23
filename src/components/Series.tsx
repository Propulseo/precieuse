import { useState, useEffect, useCallback } from 'react'
import { PRODUCTS, type Product } from '../lib/content/products'
import { SeriesCard } from './SeriesCard'
import { LoaderB } from './loader-variants/LoaderB'

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

type SlideRole = 'focus' | 'peek-left' | 'peek-right' | 'hidden'

function getRoleFor(i: number, current: number, n: number): SlideRole {
  const diff = mod(i - current, n)
  if (diff === 0) return 'focus'
  if (diff === 1) return 'peek-right'
  if (diff === n - 1) return 'peek-left'
  return 'hidden'
}

export function Series({ products = PRODUCTS }: { products?: Product[] }) {
  const N = products.length
  const [current, setCurrent] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Carousel piloté par l'index (clic / swipe / clavier) — cyclique, sans scroll-jacking.
  const goTo = useCallback((i: number) => setCurrent(mod(i, N)), [N])
  const next = useCallback(() => setCurrent((c) => mod(c + 1, N)), [N])
  const prev = useCallback(() => setCurrent((c) => mod(c - 1, N)), [N])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX
    if (Math.abs(delta) >= 50) {
      if (delta < 0) next()
      else prev()
    }
    setTouchStartX(null)
  }

  const currentProduct = products[current]
  if (!currentProduct) return null

  const annotationNum = current + 1

  return (
    <section
      className="relative bg-poudre overflow-hidden py-16 lg:py-20 outline-none focus-visible:ring-2 focus-visible:ring-canard"
      aria-roledescription="carousel"
      aria-label="Collection, Coverflow premium"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-[1440px] px-0 lg:px-12 w-full">
        <div className="mb-8 px-8 lg:px-0 flex items-end justify-between">
          <div>
            <h2 className="font-headline text-[40px] text-canard leading-none mb-1">La Collection</h2>
            <p className="font-body italic font-light text-[18px] text-rouille">cinq pièces, cinq histoires</p>
          </div>
          <span className="font-display text-[13px] text-canard hidden md:block">p. 04</span>
        </div>

        <div className="flex items-center justify-center gap-5 mb-6 px-8 lg:px-0" role="group" aria-label="Navigation carousel">
          <button
            type="button"
            onClick={prev}
            aria-label="Pièce précédente"
            className="w-9 h-9 flex items-center justify-center text-canard/70 hover:text-canard hover:bg-canard/5 rounded-full transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <LoaderB current={current} total={N} reducedMotion={reducedMotion} />

          <button
            type="button"
            onClick={next}
            aria-label="Pièce suivante"
            className="w-9 h-9 flex items-center justify-center text-canard/70 hover:text-canard hover:bg-canard/5 rounded-full transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="relative overflow-hidden h-[520px] sm:h-[600px] lg:h-[660px]">
          {products.map((product, i) => (
            <SeriesCard
              key={product.slug}
              product={product}
              index={i}
              role={getRoleFor(i, current, N)}
              reducedMotion={reducedMotion}
              onClickPeek={() => goTo(i)}
            />
          ))}

          <div className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 flex-col items-center gap-1 z-30 pointer-events-none">
            <span className="font-body italic font-light text-[13px] text-canard-90 [writing-mode:vertical-rl] rotate-180 tracking-wide">
              pièce {annotationNum} / {N}
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
