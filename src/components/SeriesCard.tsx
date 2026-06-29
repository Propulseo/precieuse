import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import type { Product } from '../lib/content/products'
import { objectPositionStyle } from './framing/framing'

export type CardRole =
  | 'focus'
  | 'peek-left'
  | 'peek-right'
  | 'hidden-left'
  | 'hidden-right'

interface Props {
  product: Product
  index: number
  total: number
  role: CardRole
  reducedMotion: boolean
  onClickPeek?: () => void
}

const CARD_TRANSITION =
  'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]'

// Coverflow fiabilisé : chaque carte est ancrée au centre (`left-1/2` puis
// `-translate-x-1/2`) et placée par un `left %` + `scale`. Plus aucune carte
// n'utilise l'ancrage `right`, donc tout passage d'un rôle à l'autre s'interpole
// (left %, largeur %, scale, opacité) — fini le saut quand une carte devient
// centrale : tout glisse dans le même sens, une pièce adjacente à la fois.
function getCardClasses(role: CardRole): string {
  const base = `absolute top-0 bottom-0 my-auto h-fit -translate-x-1/2 overflow-hidden bg-poudre/85 ${CARD_TRANSITION}`
  const peekShape = 'scale-[0.78] w-[24%] max-w-[300px] aspect-[3/4]'

  if (role === 'focus') {
    return `${base} left-1/2 z-20 opacity-100 scale-100 w-[88%] max-w-[1080px] cursor-default`
  }
  if (role === 'peek-left') {
    return `${base} left-[13%] z-10 opacity-50 ${peekShape} blur-[1.5px] cursor-pointer hover:opacity-75 hover:scale-[0.82] hover:blur-0 hidden lg:block`
  }
  if (role === 'peek-right') {
    return `${base} left-[87%] z-10 opacity-50 ${peekShape} blur-[1.5px] cursor-pointer hover:opacity-75 hover:scale-[0.82] hover:blur-0 hidden lg:block`
  }
  if (role === 'hidden-left') {
    // hors-champ à gauche, prête à glisser depuis/vers la peek gauche
    return `${base} left-[-12%] z-0 opacity-0 ${peekShape} pointer-events-none hidden lg:block`
  }
  // hidden-right : hors-champ à droite
  return `${base} left-[112%] z-0 opacity-0 ${peekShape} pointer-events-none hidden lg:block`
}

/** Pièce en vedette : visuel + descriptif (réutilisé par les modes glissé/fondu). */
export function FocusCardContent({
  product,
}: {
  product: Product
  index?: number
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] aspect-[5/3] md:aspect-[16/9]">
      <div className="relative bg-canard-10 overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={objectPositionStyle(product.imagePosition)}
        />
      </div>

      <div
        className="relative bg-poudre flex flex-col justify-start overflow-hidden px-8 lg:px-12 py-9 lg:py-12"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3 className="font-display text-[clamp(40px,4.5vw,64px)] text-canard leading-[1.05] mb-2">
          {product.name}
        </h3>

        <p className="font-body italic font-light text-[22px] lg:text-[24px] text-framboise mb-5 leading-snug">
          {product.tagline}
        </p>

        <p className="hidden md:block font-body font-light text-[14px] lg:text-[15px] text-canard/80 leading-relaxed mb-4 line-clamp-4">
          {product.description}
        </p>

        <p className="font-body font-light text-[12.5px] text-canard/55 leading-relaxed line-clamp-2">
          {product.materials}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-5 border-t border-canard/15">
          <span className="font-display text-[19px] text-canard">{product.price}</span>
          <Link
            to="/collection/$slug"
            params={{ slug: product.slug }}
            className="font-display text-[14px] text-canard underline underline-offset-4 decoration-canard/40 hover:decoration-lie-de-vin hover:text-lie-de-vin transition-colors w-fit"
          >
            {m.series_discover()} →
          </Link>
        </div>
      </div>
    </div>
  )
}

/** Aperçu latéral (coverflow) : visuel seul. */
export function PeekCardContent({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-full bg-canard-10">
      <img
        src={product.image}
        alt={product.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={objectPositionStyle(product.imagePosition)}
      />
    </div>
  )
}

export function SeriesCard({
  product,
  index,
  total,
  role,
  reducedMotion,
  onClickPeek,
}: Props) {
  const isFocus = role === 'focus'
  const isPeek = role === 'peek-left' || role === 'peek-right'
  const transitionClass = reducedMotion ? 'transition-none' : ''

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPeek && onClickPeek && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClickPeek()
    }
  }

  return (
    <div
      className={`${getCardClasses(role)} ${transitionClass}`}
      role={isPeek ? 'button' : 'group'}
      aria-roledescription={isPeek ? undefined : 'slide'}
      aria-label={
        isPeek
          ? m.series_focus_aria({ name: product.name })
          : m.series_slide_aria({ n: index + 1, total, name: product.name })
      }
      tabIndex={isPeek ? 0 : undefined}
      onClick={isPeek ? onClickPeek : undefined}
      onKeyDown={handleKeyDown}
    >
      {isFocus ? (
        <FocusCardContent product={product} index={index} />
      ) : (
        <PeekCardContent product={product} />
      )}
    </div>
  )
}
