import { useState, useEffect, useCallback, useRef } from 'react'
import { m } from '#/paraglide/messages'
import { PRODUCTS, type Product } from '../lib/content/products'
import { SeriesCard, FocusCardContent } from './SeriesCard'
import { LoaderB } from './loader-variants/LoaderB'
import { useBrand } from './brand/BrandProvider'

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

type SlideRole =
  | 'focus'
  | 'peek-left'
  | 'peek-right'
  | 'hidden-left'
  | 'hidden-right'

function getRoleFor(i: number, current: number, n: number): SlideRole {
  const diff = mod(i - current, n)
  if (diff === 0) return 'focus'
  if (diff === 1) return 'peek-right'
  if (diff === n - 1) return 'peek-left'
  // Cartes hors-champ rangées du bon côté (droite si devant, gauche si derrière)
  // pour que tout défile dans le même sens — une pièce adjacente à la fois.
  return diff * 2 <= n ? 'hidden-right' : 'hidden-left'
}

// Décalage signé (chemin le plus court, cyclique) pour le mode « glissé » :
// 0 = centre, ±1 = juste à côté (visible le temps de la glisse), ±2 = hors-champ.
function slideOffset(i: number, current: number, n: number): number {
  let d = mod(i - current, n)
  if (d * 2 > n) d -= n
  return d
}

const STAGE_CARD =
  'absolute top-0 bottom-0 my-auto h-fit w-[88%] max-w-[1080px] -translate-x-1/2 overflow-hidden bg-poudre/85'
const STAGE_EASE = 'duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]'

/** Mode « glissé » : une grande pièce à la fois, qui glisse sur le côté. */
function SlideStage({
  products,
  current,
  reducedMotion,
}: {
  products: Product[]
  current: number
  reducedMotion: boolean
}) {
  const n = products.length
  const motion = reducedMotion ? '' : `transition-[left,opacity] ${STAGE_EASE}`
  return (
    <>
      {products.map((product, i) => {
        const off = slideOffset(i, current, n)
        const active = off === 0
        const onScreen = Math.abs(off) <= 1
        return (
          <div
            key={product.slug}
            className={`${STAGE_CARD} ${motion} ${active ? 'z-20' : 'z-10 pointer-events-none'} ${onScreen ? 'opacity-100' : 'opacity-0'}`}
            style={{ left: `${50 + off * 100}%` }}
            aria-hidden={!active}
          >
            <FocusCardContent product={product} index={i} />
          </div>
        )
      })}
    </>
  )
}

/** Mode « fondu » : la pièce suivante apparaît en fondu, sans mouvement. */
function FadeStage({
  products,
  current,
  reducedMotion,
}: {
  products: Product[]
  current: number
  reducedMotion: boolean
}) {
  const motion = reducedMotion ? '' : `transition-opacity ${STAGE_EASE}`
  return (
    <>
      {products.map((product, i) => {
        const active = i === current
        return (
          <div
            key={product.slug}
            className={`${STAGE_CARD} left-1/2 ${motion} ${active ? 'z-20 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}
            aria-hidden={!active}
          >
            <FocusCardContent product={product} index={i} />
          </div>
        )
      })}
    </>
  )
}

/** Mode « coverflow » : grande pièce au centre, aperçus des voisines aux côtés. */
function CoverflowStage({
  products,
  current,
  reducedMotion,
  goTo,
}: {
  products: Product[]
  current: number
  reducedMotion: boolean
  goTo: (i: number) => void
}) {
  const n = products.length
  return (
    <>
      {products.map((product, i) => (
        <SeriesCard
          key={product.slug}
          product={product}
          index={i}
          total={n}
          role={getRoleFor(i, current, n)}
          reducedMotion={reducedMotion}
          onClickPeek={() => goTo(i)}
        />
      ))}
    </>
  )
}

export function Series({ products = PRODUCTS }: { products?: Product[] }) {
  const N = products.length
  const { carouselMode } = useBrand()
  const [current, setCurrent] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Auto-défilement piloté par le scroll : on observe l'entrée de la section
  // dans le viewport. Dès qu'on « arrive » dessus en scrollant, ça défile ;
  // quand on la quitte, ça s'arrête (pas de scroll-jacking).
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Actif seulement si la section est visible, en pause au survol/focus, et
  // désactivé si l'utilisateur préfère les animations réduites (accessibilité).
  const autoplay = inView && !paused && !reducedMotion && N > 1
  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent((c) => mod(c + 1, N)), 4500)
    return () => clearInterval(id)
  }, [autoplay, N])

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

  return (
    <section
      ref={sectionRef}
      className="relative bg-poudre overflow-hidden py-8 lg:py-10 outline-none focus-visible:ring-2 focus-visible:ring-canard"
      aria-roledescription="carousel"
      aria-label={m.series_carousel_label()}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1440px] px-0 lg:px-12 w-full">
        <div className="mb-4 px-8 lg:px-0 flex items-end justify-between">
          <div>
            <h2 className="font-headline text-[clamp(28px,5vw,40px)] text-canard leading-none mb-1">{m.series_title()}</h2>
            <p className="font-body italic font-light text-[18px] text-framboise">{m.series_subtitle()}</p>
          </div>
          <span className="font-display text-[13px] text-framboise hidden md:block">p. 04</span>
        </div>

        <div className="flex items-center justify-center gap-5 mb-6 px-8 lg:px-0" role="group" aria-label={m.series_nav_label()}>
          <button
            type="button"
            onClick={prev}
            aria-label={m.series_prev()}
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
            aria-label={m.series_next()}
            className="w-9 h-9 flex items-center justify-center text-canard/70 hover:text-canard hover:bg-canard/5 rounded-full transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="relative overflow-hidden h-[520px] sm:h-[600px] lg:h-[660px]">
          {carouselMode === 'glisse' && (
            <SlideStage products={products} current={current} reducedMotion={reducedMotion} />
          )}
          {carouselMode === 'fondu' && (
            <FadeStage products={products} current={current} reducedMotion={reducedMotion} />
          )}
          {carouselMode === 'coverflow' && (
            <CoverflowStage products={products} current={current} reducedMotion={reducedMotion} goTo={goTo} />
          )}

          <div className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 flex-col items-center gap-1 z-30 pointer-events-none">
            <span className="font-body italic font-light text-[13px] text-canard-90 [writing-mode:vertical-rl] rotate-180 tracking-wide">
              {m.series_piece_counter({ n: current + 1, total: N })}
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
