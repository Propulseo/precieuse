import { useState, useEffect, useCallback, useRef } from 'react'
import { PRODUCTS } from '../lib/content/products'
import { SeriesCard } from './SeriesCard'
import { LoaderB } from './loader-variants/LoaderB'

const N = PRODUCTS.length
/** Total scroll height of the sticky zone (in vh units) — kept short for UX */
const TOTAL_VH = 300

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

type SlideRole = 'focus' | 'peek-left' | 'peek-right' | 'hidden'

function getRoleFor(i: number, current: number): SlideRole {
  const diff = mod(i - current, N)
  if (diff === 0) return 'focus'
  if (diff === 1) return 'peek-right'
  if (diff === N - 1) return 'peek-left'
  return 'hidden'
}

export function Series() {
  const [current, setCurrent] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Scroll-driven slide index
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      // How far the top of the wrapper has scrolled past the viewport top
      const scrolled = -rect.top
      const totalScrollable = wrapper.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      const idx = Math.min(N - 1, Math.floor(progress * N))
      setCurrent(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = useCallback((idx: number) => setCurrent(idx), [])

  const handleGoTo = useCallback(
    (i: number) => {
      goTo(i)
      // Also scroll to the right position
      const wrapper = wrapperRef.current
      if (!wrapper) return
      const totalScrollable = wrapper.offsetHeight - window.innerHeight
      const targetScroll = wrapper.offsetTop + (i / N) * totalScrollable
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    },
    [goTo],
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleGoTo(mod(current + 1, N))
    if (e.key === 'ArrowLeft') handleGoTo(mod(current - 1, N))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX
    if (Math.abs(delta) >= 50) {
      if (delta < 0) handleGoTo(mod(current + 1, N))
      else handleGoTo(mod(current - 1, N))
    }
    setTouchStartX(null)
  }

  const currentProduct = PRODUCTS[current]
  if (!currentProduct) return null

  const annotationNum = current + 1

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${TOTAL_VH}vh` }}
    >
      <section
        className="sticky top-0 h-screen bg-poudre overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-canard flex flex-col justify-center"
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
              <p className="font-body italic font-light text-[18px] text-rouille">scrollez pour explorer</p>
            </div>
            <span className="font-display text-[13px] text-canard hidden md:block">p. 04</span>
          </div>

          <div className="flex items-center justify-center gap-5 mb-6 px-8 lg:px-0" role="group" aria-label="Navigation carousel">
            <button
              type="button"
              onClick={() => handleGoTo(mod(current - 1, N))}
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
              onClick={() => handleGoTo(mod(current + 1, N))}
              aria-label="Pièce suivante"
              className="w-9 h-9 flex items-center justify-center text-canard/70 hover:text-canard hover:bg-canard/5 rounded-full transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="relative overflow-hidden h-[520px] sm:h-[600px] lg:h-[660px]">
            {PRODUCTS.map((product, i) => (
              <SeriesCard
                key={product.slug}
                product={product}
                index={i}
                role={getRoleFor(i, current)}
                reducedMotion={reducedMotion}
                onClickPeek={() => handleGoTo(i)}
              />
            ))}

            <div className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 flex-col items-center gap-1 z-30 pointer-events-none">
              <span className="font-body italic font-light text-[13px] text-canard-90 [writing-mode:vertical-rl] rotate-180 tracking-wide">
                pièce {annotationNum} / {N}
              </span>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t-2 border-double border-canard/15" />
      </section>
    </div>
  )
}
