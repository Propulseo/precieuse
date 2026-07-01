import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { PRODUCTS } from '../../lib/content/products'
import type { Product } from '../../lib/content/products'
import { objectPositionStyle } from '../framing/framing'
import { ringMedia } from './collection-media'
import type { RingMedia } from './collection-media'
import { CollectionIntro } from './collection-intro'

/**
 * Variante 4 — Damier rythmé.
 * Reprend l'idée « porté + packshot » mais alterne TROIS compositions
 * (immersif plein cadre / split photo encadrée / packshot centré) pour ne
 * jamais répéter deux fois de suite la même mise en page. Marges blanches,
 * packshots détourés, CTA canard.
 */
const MODE_ORDER = ['immersif', 'split', 'packshot', 'immersif', 'split'] as const

function DiscoverCta({ slug, dark }: { slug: string; dark?: boolean }) {
  return (
    <Link
      to="/collection/$slug"
      params={{ slug }}
      className={`inline-flex w-fit items-center gap-3 px-9 py-3.5 font-display text-[12px] uppercase tracking-[0.22em] transition-colors duration-300 ${
        dark
          ? 'border-b border-poudre/40 pb-1 text-poudre hover:border-poudre'
          : 'bg-canard text-poudre hover:bg-canard-90'
      }`}
    >
      {m.series_discover()}
      <span aria-hidden>→</span>
    </Link>
  )
}

/** Plein cadre : photo portée qui sature, texte posé en bas. */
function Immersif({ product, media }: { product: Product; media: RingMedia }) {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-canard">
      <img
        src={media.worn}
        alt={product.imageAlt}
        style={objectPositionStyle(media.wornPosition)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-canard/85 via-canard/20 to-transparent" />
      <div className="relative max-w-[44ch] px-8 pb-16 lg:px-16">
        <h2 className="font-display text-[clamp(44px,7vw,96px)] text-poudre leading-[0.92]">
          {product.name}
        </h2>
        <p className="mt-3 font-body italic font-light text-[clamp(19px,2.2vw,26px)] text-poudre/90">
          {product.tagline}
        </p>
        <div className="mt-7">
          <DiscoverCta slug={product.slug} dark />
        </div>
      </div>
    </section>
  )
}

/** Split : photo portée encadrée de blanc d'un côté, descriptif de l'autre. */
function Split({
  product,
  media,
  reversed,
}: {
  product: Product
  media: RingMedia
  reversed: boolean
}) {
  return (
    <section className="grid grid-cols-1 bg-white lg:min-h-screen lg:grid-cols-2">
      <div className={`flex items-center justify-center p-8 lg:p-16 ${reversed ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-canard-10">
          <img
            src={media.worn}
            alt={product.imageAlt}
            style={objectPositionStyle(media.wornPosition)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div className={`flex flex-col justify-center px-8 py-16 lg:px-16 ${reversed ? 'lg:order-1' : ''}`}>
        <h2 className="font-display text-[clamp(34px,4vw,60px)] text-canard leading-[1.02]">
          {product.name}
        </h2>
        <p className="mt-3 font-body italic font-light text-[clamp(18px,1.9vw,22px)] text-canard/75">
          {product.tagline}
        </p>
        <p className="mt-6 max-w-[44ch] font-body font-light text-[14px] leading-relaxed text-canard/60">
          {product.description}
        </p>
        <p className="mt-6 font-display text-[17px] text-canard">{product.price}</p>
        <div className="mt-7">
          <DiscoverCta slug={product.slug} />
        </div>
      </div>
    </section>
  )
}

/** Packshot centré : la pièce détourée au centre, sur blanc, façon planche. */
function Packshot({ product, media }: { product: Product; media: RingMedia }) {
  return (
    <section className="flex min-h-[82vh] flex-col items-center justify-center bg-white px-8 py-24 text-center">
      <h2 className="font-display text-[clamp(32px,3.6vw,52px)] text-canard leading-[1.05]">
        {product.name}
      </h2>
      <p className="mt-3 font-body italic font-light text-[clamp(17px,1.7vw,21px)] text-canard/75">
        {product.tagline}
      </p>
      <div className="my-10 flex h-[240px] w-full items-center justify-center lg:h-[300px]">
        <img
          src={media.packshot}
          alt={`${product.name} — ${product.tagline}`}
          className="max-h-full max-w-[300px] object-contain"
        />
      </div>
      <p className="mb-8 max-w-[48ch] font-body font-light text-[14px] leading-relaxed text-canard/60">
        {product.description}
      </p>
      <DiscoverCta slug={product.slug} />
    </section>
  )
}

export function CollectionDamier({ products = PRODUCTS }: { products?: Product[] }) {
  return (
    <section className="bg-white">
      <CollectionIntro products={products} />
      {products.map((product, i) => {
        const media = ringMedia(product.slug)
        if (!media) return null
        const mode = MODE_ORDER[i % MODE_ORDER.length]
        if (mode === 'immersif') return <Immersif key={product.slug} product={product} media={media} />
        if (mode === 'packshot') return <Packshot key={product.slug} product={product} media={media} />
        return <Split key={product.slug} product={product} media={media} reversed={i % 4 === 1} />
      })}
    </section>
  )
}
