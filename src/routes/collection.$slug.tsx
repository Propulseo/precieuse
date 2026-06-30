import { useEffect, useState } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getProduct } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../components/framing/framing'
import { useContactDrawer } from '../components/contact/ContactDrawerProvider'
import { maskStyle } from '../components/brand/brand'
import { seo } from '../lib/seo'
import type { Product } from '../lib/content/products'

export const Route = createFileRoute('/collection/$slug')({
  component: ProductPage,
  // Reads from Sanity when configured, otherwise the static PRODUCTS fallback.
  loader: async ({ params }) => {
    const product = await getProduct(params.slug, getLocale())
    if (!product) throw notFound()
    return product
  },
  // head après loader : TanStack n'infère `loaderData` que si loader est déclaré avant.
  head: ({ loaderData, params }) =>
    loaderData
      ? seo({
          title: `${loaderData.name} — Précieuse`,
          description: loaderData.description,
          path: `/collection/${params.slug}`,
          image: loaderData.image,
        })
      : {},
})

type GalleryPhoto = { src: string; alt: string; pos?: string; contain?: boolean }

/**
 * Photos de la fiche : on privilégie les vues **avec un vrai fond** (portée +
 * studio), pas le packshot détouré — réservé au repli quand la pièce n'a pas de
 * 2ᵉ photo « avec fond » (ex. Louise). Dédoublonne par chemin.
 */
function buildGallery(product: Product): GalleryPhoto[] {
  // Galerie pilotée par Emeline dans Sanity : si elle a ajouté des photos, on
  // les affiche telles quelles (dans son ordre), cliquables/agrandissables.
  if (product.gallery && product.gallery.length > 0) {
    return product.gallery.map((g) => ({ src: g.src, alt: g.alt, pos: g.position }))
  }

  const isReal = (s?: string) => !!s && !s.includes('placeholder')
  const withBg: GalleryPhoto[] = []
  if (isReal(product.photoPortee))
    withBg.push({
      src: product.photoPortee as string,
      alt: product.photoPorteeAlt ?? product.imageAlt,
      pos: product.photoPorteePosition,
    })
  if (isReal(product.image))
    withBg.push({ src: product.image, alt: product.imageAlt, pos: product.imagePosition })

  const seen = new Set<string>()
  const photos: GalleryPhoto[] = []
  for (const p of withBg) {
    if (!seen.has(p.src)) {
      seen.add(p.src)
      photos.push(p)
    }
  }
  if (photos.length < 2 && product.packshot) {
    photos.push({ src: product.packshot, alt: product.packshotAlt ?? product.name, contain: true })
  }
  return photos
}

const imgMotion =
  'transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100'

/**
 * Fiche produit — « Galerie & spécifications » : manchette ornementale (nom
 * centré + cartouche de la marque entre deux filets framboise), galerie de
 * photos cliquables (lightbox), puis spécifications et appel au contact (drawer).
 */
function ProductPage() {
  const product = Route.useLoaderData()
  const { open: openContact } = useContactDrawer()
  const [zoom, setZoom] = useState<GalleryPhoto | null>(null)
  const photos = buildGallery(product)
  const [main, ...rest] = photos

  // Lightbox : Échap ferme, scroll de fond verrouillé tant qu'elle est ouverte.
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(null)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [zoom])

  return (
    <section className="min-h-screen bg-poudre px-8 pb-20 pt-3 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <Link
          to="/collection"
          className="inline-block font-display text-[14px] italic text-framboise transition-colors hover:text-canard"
        >
          ← {m.product_back_to_collection()}
        </Link>

        {/* Manchette ornementale : nom centré + cartouche de la marque entre deux filets. */}
        <header className="pt-1 text-center">
          <h1 className="font-display text-[clamp(40px,5.2vw,68px)] leading-none text-canard [text-wrap:balance]">
            {product.name}
          </h1>
          <div className="mx-auto mb-1 mt-4 flex max-w-[680px] items-center gap-6 text-framboise/50">
            <span className="h-px flex-1 bg-current" />
            <span
              role="img"
              aria-label="Précieuse"
              className="shrink-0"
              style={{
                width: 'clamp(80px,11vw,108px)',
                aspectRatio: '1 / 1',
                ...maskStyle('/brand/picto-shape.png', 'var(--framboise)'),
              }}
            />
            <span className="h-px flex-1 bg-current" />
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 pt-4 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Galerie cliquable (lightbox) */}
          <div className="grid gap-3.5">
            {main ? (
              <button
                type="button"
                onClick={() => setZoom(main)}
                aria-label={`Agrandir la photo de ${product.name}`}
                className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden border border-canard/20"
              >
                <img
                  src={main.src}
                  alt={main.alt}
                  style={main.pos ? objectPositionStyle(main.pos) : undefined}
                  className={`absolute inset-0 h-full w-full ${main.contain ? 'object-contain p-[10%]' : 'object-cover'} ${imgMotion}`}
                />
              </button>
            ) : null}

            {rest.length > 0 ? (
              <div className={`grid gap-3.5 ${rest.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {rest.map((p) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setZoom(p)}
                    aria-label={`Agrandir la photo de ${product.name}`}
                    className={`group relative cursor-zoom-in overflow-hidden border border-canard/20 ${p.contain ? 'bg-poudre-dark' : ''} ${rest.length === 1 ? 'aspect-[16/10]' : 'aspect-square'}`}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      style={p.pos ? objectPositionStyle(p.pos) : undefined}
                      className={`absolute inset-0 h-full w-full ${p.contain ? 'object-contain p-[14%]' : 'object-cover'} ${imgMotion}`}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Spécifications */}
          <div>
            <p className="font-display text-[clamp(18px,2vw,23px)] italic text-framboise">
              {product.tagline}
            </p>
            <p className="mb-6 mt-1.5 font-display text-[20px] italic text-canard/70">
              {product.price}
            </p>
            <p className="max-w-[48ch] font-body text-[15px] leading-relaxed text-canard/90">
              {product.description}
            </p>

            <div className="mt-6 border-t border-canard/15 pt-5">
              <span className="mb-2.5 block font-display text-[12px] uppercase italic tracking-[0.3em] text-framboise">
                {m.product_materials_label()}
              </span>
              <p className="font-body text-[14px] leading-relaxed text-canard/90">
                {product.materials}
              </p>
            </div>
            <div className="mt-6 border-t border-canard/15 pt-5">
              <span className="mb-2.5 block font-display text-[12px] uppercase italic tracking-[0.3em] text-framboise">
                {m.product_story_label()}
              </span>
              <p className="font-display text-[16px] italic leading-[1.5] text-canard">
                {product.story}
              </p>
            </div>

            <button
              type="button"
              onClick={openContact}
              className="mt-8 inline-block bg-canard px-10 py-3.5 font-display text-[12px] uppercase tracking-[0.3em] text-poudre transition-colors duration-300 hover:bg-canard-90"
            >
              {m.product_request_cta()} →
            </button>
            <p className="mt-4 font-display text-[12px] text-canard/85">
              {m.product_reassurance()}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox plein écran */}
      {zoom ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-canard/95 p-4 sm:p-8"
        >
          <img
            src={zoom.src}
            alt={zoom.alt}
            className="max-h-[90vh] max-w-[92vw] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setZoom(null)
            }}
            aria-label="Fermer"
            className="absolute right-5 top-5 font-display text-[24px] leading-none text-poudre/80 transition-colors hover:text-poudre"
          >
            ✕
          </button>
        </div>
      ) : null}
    </section>
  )
}
