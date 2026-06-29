import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { PRODUCTS } from '../../lib/content/products'
import type { Product } from '../../lib/content/products'
import { objectPositionStyle } from '../framing/framing'
import { CollectionIntro } from './collection-intro'

/**
 * Variante E — Damier « porté + packshot » (système façon Gemmyo).
 * Chaque bague = deux cellules côte à côte : une photo PORTÉE plein cadre et,
 * en regard, une cellule claire centrée avec nom (large tracking), tagline,
 * PACKSHOT de la bague et bouton « Découvrir ». L'alternance gauche/droite
 * se fait à chaque rangée. Charte Précieuse conservée (poudre/canard).
 */

// Couple d'images par pièce, propre à cette présentation (porté + packshot).
// `position` cale le point focal de la photo portée.
type Pair = { worn: string; wornPosition?: string; packshot: string }

const PAIRS: Partial<Record<string, Pair>> = {
  josephine: {
    worn: '/images/real/main-chaise-josephine.webp',
    wornPosition: '50% 40%',
    packshot: '/images/bijoux-detoures/josephine.png',
  },
  aurore: {
    worn: '/images/carnet/aurore-portee.jpg',
    packshot: '/images/bijoux-detoures/aurore.png',
  },
  eugenie: {
    // Pas de photo portée (pièce dessinée) → placeholder pour le grand visuel,
    // en attendant qu'Emeline fournisse la vraie photo. Le packshot garde le dessin.
    worn: '/images/placeholder-piece.svg',
    packshot: '/images/bijoux-detoures/eugenie.png',
  },
  thelma: {
    worn: '/images/real/mains-poche-thelma.webp',
    wornPosition: '50% 45%',
    packshot: '/images/bijoux-detoures/thelma.png',
  },
  louise: {
    worn: '/images/real/buste-thelma-louise.webp',
    wornPosition: '50% 35%',
    packshot: '/images/bijoux-detoures/louise.png',
  },
}

function WornCell({
  pair,
  product,
  reversed,
}: {
  pair: Pair
  product: Product
  reversed: boolean
}) {
  return (
    <div className={`flex items-center justify-center bg-poudre p-6 lg:p-10 ${reversed ? 'lg:order-2' : ''}`}>
      <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-canard-10">
        <img
          src={pair.worn}
          alt={product.imageAlt}
          style={objectPositionStyle(pair.wornPosition)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

function InfoCell({
  pair,
  product,
  reversed,
}: {
  pair: Pair
  product: Product
  reversed: boolean
}) {
  return (
    <div className={`flex flex-col items-center justify-center bg-poudre px-8 py-12 text-center lg:px-14 ${reversed ? 'lg:order-1' : ''}`}>
      <h2 className="font-display text-[clamp(32px,3.2vw,48px)] text-canard leading-[1.05]">
        {product.name}
      </h2>
      <p className="mt-4 font-body italic font-light text-[clamp(17px,1.6vw,21px)] text-canard/75">
        {product.tagline}
      </p>
      <p className="mt-6 max-w-[46ch] font-body font-light text-[14px] leading-relaxed text-canard/60">
        {product.description}
      </p>

      <div className="my-8 flex h-[150px] w-full items-center justify-center lg:my-9 lg:h-[190px]">
        <img
          src={pair.packshot}
          alt={`${product.name} — ${product.tagline}`}
          className="max-h-full max-w-[190px] object-contain"
        />
      </div>

      <Link
        to="/collection/$slug"
        params={{ slug: product.slug }}
        className="bg-canard px-10 py-3.5 font-display text-[11px] uppercase tracking-[0.28em] text-poudre transition-colors duration-300 hover:bg-canard-90"
      >
        {m.series_discover()}
      </Link>
    </div>
  )
}

export function CollectionGemmyo({ products = PRODUCTS }: { products?: Product[] }) {
  return (
    <section className="bg-poudre">
      <CollectionIntro products={products} />

      {products.map((product, i) => {
        const pair = PAIRS[product.slug]
        if (!pair) return null
        const reversed = i % 2 === 1
        return (
          <div
            key={product.slug}
            id={`piece-${product.slug}`}
            className="grid scroll-mt-20 grid-cols-1 lg:min-h-[62vh] lg:grid-cols-2"
          >
            <WornCell pair={pair} product={product} reversed={reversed} />
            <InfoCell pair={pair} product={product} reversed={reversed} />
          </div>
        )
      })}
    </section>
  )
}
