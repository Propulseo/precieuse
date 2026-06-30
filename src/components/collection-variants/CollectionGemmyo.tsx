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

// Les images de la grille (photo portée + packshot détouré) sont désormais
// pilotées par Sanity via `getProducts` (champs `photoPortee` / `packshot`), avec
// repli sur les chemins statiques de `products.ts`. Plus de map codée en dur ici.

function WornCell({ product, reversed }: { product: Product; reversed: boolean }) {
  const worn = product.photoPortee ?? '/images/placeholder-piece.svg'
  return (
    <div className={`flex items-center justify-center bg-poudre p-6 lg:p-10 ${reversed ? 'lg:order-2' : ''}`}>
      <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-canard-10">
        <img
          src={worn}
          alt={product.photoPorteeAlt ?? product.imageAlt}
          style={objectPositionStyle(product.photoPorteePosition)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

function InfoCell({ product, reversed }: { product: Product; reversed: boolean }) {
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
          src={product.packshot}
          alt={product.packshotAlt ?? `${product.name} — ${product.tagline}`}
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
        // Grille = photo portée + packshot détouré : sans packshot, on n'affiche
        // pas la rangée (évite une cellule info vide).
        if (!product.packshot) return null
        const reversed = i % 2 === 1
        return (
          <div
            key={product.slug}
            id={`piece-${product.slug}`}
            className="grid scroll-mt-20 grid-cols-1 lg:min-h-[62vh] lg:grid-cols-2"
          >
            <WornCell product={product} reversed={reversed} />
            <InfoCell product={product} reversed={reversed} />
          </div>
        )
      })}
    </section>
  )
}
