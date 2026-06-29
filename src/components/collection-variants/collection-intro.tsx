import { Fragment } from 'react'
import { m } from '#/paraglide/messages'
import type { Product } from '../../lib/content/products'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import { BrilliantCutScheme } from '../ornaments'

/**
 * Bandeau d'ouverture de la page Collection : grande fleur (pictogramme) + titre
 * « La Collection », intro, ornement diamant et sommaire des pièces (ancres).
 * Pleine largeur, compact. Sur la charte (poudre/canard, accent framboise).
 */
export function CollectionIntro({ products }: { products: Product[] }) {
  return (
    <header className="paper-grain bg-poudre px-6 py-3 text-center lg:px-10 lg:py-4">
      {/* Pictogramme (fleur de la marque), suit --brand-accent. */}
      <div
        role="img"
        aria-label="Précieuse"
        className="mx-auto"
        style={{
          width: 'min(9vw, 40px)',
          aspectRatio: '1 / 1',
          ...maskStyle(BRAND_PICTO_MASK),
        }}
      />
      <h1 className="mt-1.5 font-headline text-[clamp(22px,3vw,38px)] leading-none text-canard">
        {m.collection_title()}
      </h1>
      {/* Ornement diamant — filets pleine largeur. */}
      <div className="mt-3 mb-2 flex items-center gap-4 text-framboise/50">
        <span className="h-px flex-1 bg-current" />
        <BrilliantCutScheme className="h-4 w-4 shrink-0" stroke="currentColor" strokeWidth={1} />
        <span className="h-px flex-1 bg-current" />
      </div>
      <nav
        aria-label={m.collection_title()}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {products.map((p, i) => (
          <Fragment key={p.slug}>
            {i > 0 ? (
              <span aria-hidden className="text-canard/25">
                ·
              </span>
            ) : null}
            <a
              href={`#piece-${p.slug}`}
              className="font-body italic font-light text-[clamp(16px,1.7vw,20px)] text-canard/70 transition-colors hover:text-framboise"
            >
              {p.name}
            </a>
          </Fragment>
        ))}
      </nav>
    </header>
  )
}
