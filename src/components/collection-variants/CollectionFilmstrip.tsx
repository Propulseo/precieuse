import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { PRODUCTS, type Product } from '../../lib/content/products'
import { objectPositionStyle } from '../framing/framing'

/**
 * Variante « Défilé horizontal » — pellicule (filmstrip) des 5 pièces.
 * Desktop : la section se fige et le SCROLL VERTICAL fait défiler la bande
 * horizontalement. Les cartes sont LARGES (1 à 2 visibles à la fois) → en
 * arrivant on ne voit qu'une pièce ou deux, le scroll dévoile les suivantes.
 * L'image remplit la hauteur dispo (recadrée par object-cover) et le texte
 * reste toujours dessous → jamais de rognage, quelle que soit la hauteur d'écran.
 * Mobile / reduced-motion : repli en swipe horizontal natif (scroll-snap).
 */

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

// Course de scroll vertical par pièce, en hauteurs d'écran (vh). ↓ = plus rapide.
const SCROLL_VH_PER_SLIDE = 55
// Largeur d'une carte en mode épinglé : pilote le nombre de pièces visibles.
// ↑ = pièces plus larges, moins nombreuses à l'écran (1 → 2).
const PINNED_CARD_W = 'min(56vw, 1120px)'

function CardImage({ product, className }: { product: Product; className: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-canard-10 ring-1 ring-canard/10 group-focus-visible:ring-2 group-focus-visible:ring-canard/40 ${className}`}
    >
      <img
        src={product.image}
        alt={product.imageAlt}
        loading="lazy"
        decoding="async"
        style={
          {
            ...objectPositionStyle(product.imagePosition),
            transformOrigin: product.imagePosition ?? 'center',
            '--zoom': product.imageZoom ?? 1,
          } as CSSProperties
        }
        className="absolute inset-0 h-full w-full object-cover [transform:scale(var(--zoom,1))] transition-transform duration-700 ease-out group-hover:[transform:scale(calc(var(--zoom,1)*1.03))] motion-reduce:transition-none motion-reduce:group-hover:[transform:scale(var(--zoom,1))]"
      />
    </div>
  )
}

function CardMeta({ product }: { product: Product }) {
  return (
    <div className="mt-4 shrink-0">
      <h3 className="font-headline text-[clamp(20px,2.2vw,26px)] leading-tight text-canard">
        {product.name}
      </h3>
      <p className="mt-1.5 font-body italic font-light text-[15px] leading-snug text-framboise">
        {product.tagline}
      </p>
      <span className="mt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap font-display text-[11px] uppercase tracking-[0.22em] text-canard underline decoration-canard/30 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-framboise group-hover:text-framboise">
        {m.series_discover()}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </div>
  )
}

/** Carte plein-hauteur (mode épinglé) : l'image remplit la place dispo, le texte
 * reste toujours visible dessous → aucun rognage. Largeur = 1-2 pièces visibles. */
function PinnedCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full shrink-0 flex-col" style={{ width: PINNED_CARD_W }}>
      <Link
        to="/collection/$slug"
        params={{ slug: product.slug }}
        className="group flex h-full flex-col focus:outline-none"
      >
        <CardImage product={product} className="min-h-0 flex-1" />
        <CardMeta product={product} />
      </Link>
    </article>
  )
}

/** Carte portrait (mobile / reduced-motion) pour le swipe horizontal. */
function FilmstripCard({ product, className }: { product: Product; className: string }) {
  return (
    <article className={`shrink-0 ${className}`}>
      <Link
        to="/collection/$slug"
        params={{ slug: product.slug }}
        className="group block focus:outline-none"
      >
        <CardImage product={product} className="aspect-[3/4] w-full" />
        <CardMeta product={product} />
      </Link>
    </article>
  )
}

function Header({ hint }: { hint: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="font-headline text-[clamp(28px,3.4vw,46px)] leading-[1.04] text-canard">
          {m.series_title()}
        </h2>
        <p className="mt-2 font-body italic font-light text-[clamp(15px,1.7vw,20px)] text-framboise">
          {m.series_subtitle()}
        </p>
      </div>
      <p
        aria-hidden="true"
        className="hidden shrink-0 pb-1.5 font-display text-[11px] uppercase tracking-[0.22em] text-canard/45 sm:block"
      >
        {hint}
      </p>
    </div>
  )
}

export function CollectionFilmstrip({ products = PRODUCTS }: { products?: Product[] }) {
  const N = products.length
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [tx, setTx] = useState(0)
  const [progress, setProgress] = useState(0)
  const outerRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const pinned = isDesktop && !reducedMotion && N > 1

  // Le scroll vertical pilote la translation horizontale de la bande.
  useEffect(() => {
    if (!pinned) {
      setTx(0)
      setProgress(0)
      return
    }
    const outer = outerRef.current
    const viewport = viewportRef.current
    const row = rowRef.current
    if (!outer || !viewport || !row) return
    let raf = 0
    const update = () => {
      raf = 0
      const scrollable = outer.offsetHeight - window.innerHeight
      const maxX = Math.max(0, row.scrollWidth - viewport.clientWidth)
      if (scrollable <= 0) return
      const p = clamp(-outer.getBoundingClientRect().top / scrollable, 0, 1)
      setProgress(p)
      setTx(-p * maxX)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pinned, N])

  // ─── Desktop : section figée, défilé horizontal piloté par le scroll. ───
  if (pinned) {
    return (
      <section
        ref={outerRef}
        className="relative bg-poudre"
        style={{ height: `${(N - 1) * SCROLL_VH_PER_SLIDE + 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-8 pt-[84px]">
          <header className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
            <Header hint="défilez ↓" />
            <div aria-hidden="true" className="mt-5 h-px w-full overflow-hidden bg-canard/15">
              <div
                className="h-px bg-framboise"
                style={{ width: `${clamp(progress * 100, 6, 100)}%` }}
              />
            </div>
          </header>

          <div ref={viewportRef} className="mt-7 flex min-h-0 flex-1 items-stretch overflow-hidden">
            <div
              ref={rowRef}
              className="flex h-full w-max items-stretch gap-8 px-6 will-change-transform lg:px-16"
              style={{ transform: `translate3d(${tx}px, 0, 0)` }}
            >
              {products.map((product) => (
                <PinnedCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── Mobile / reduced-motion : swipe horizontal natif. ───
  return (
    <section className="w-full bg-poudre py-12 lg:py-20">
      <header className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Header hint="glissez →" />
      </header>
      <div
        className="mt-9 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label={m.series_title()}
      >
        {products.map((product) => (
          <div role="listitem" key={product.slug} className="contents">
            <FilmstripCard product={product} className="snap-start w-[78vw] sm:w-[58vw] md:w-[420px]" />
          </div>
        ))}
      </div>
    </section>
  )
}
