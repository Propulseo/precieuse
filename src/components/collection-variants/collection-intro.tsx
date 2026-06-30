import { Fragment } from 'react'
import { m } from '#/paraglide/messages'
import type { Product } from '../../lib/content/products'
import { EditorialHeader } from '../editorial/EditorialHeader'

/**
 * Bandeau d'ouverture de la page Collection : grande fleur (pictogramme) + titre
 * « La Collection », intro, ornement diamant et sommaire des pièces (ancres).
 * Pleine largeur, compact. Sur la charte (poudre/canard, accent framboise).
 */
export function CollectionIntro({ products }: { products: Product[] }) {
  return (
    <EditorialHeader title={m.collection_title()} className="paper-grain">
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
    </EditorialHeader>
  )
}
