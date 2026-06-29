import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getProduct } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../components/framing/framing'
import { useContactDrawer } from '../components/contact/ContactDrawerProvider'

export const Route = createFileRoute('/collection/$slug')({
  component: ProductPage,
  // Reads from Sanity when configured, otherwise the static PRODUCTS fallback.
  loader: async ({ params }) => {
    const product = await getProduct(params.slug, getLocale())
    if (!product) throw notFound()
    return product
  },
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { open: openContact } = useContactDrawer()

  return (
    <section className="bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[1320px]">
        <Link to="/collection" className="font-display italic text-[14px] text-gold hover:text-ink transition-colors">
          ← {m.product_back_to_collection()}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img src={product.image} alt={product.imageAlt} style={objectPositionStyle(product.imagePosition)} className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="font-display italic text-[clamp(48px,6vw,80px)] text-ink leading-none mb-4">
              {product.name}
            </h1>
            <p className="font-script text-[24px] text-raspberry mb-6">{product.tagline}</p>
            <p className="font-display italic text-[24px] text-gold mb-8">{product.price}</p>

            <div className="space-y-6 max-w-prose">
              <p className="font-sans text-[15px] text-ink/85 leading-relaxed">{product.description}</p>
              <div className="border-t border-ink/15 pt-6">
                <span className="font-display italic text-[12px] tracking-[0.3em] text-gold uppercase block mb-3">
                  {m.product_materials_label()}
                </span>
                <p className="font-sans text-[14px] text-ink/80 leading-relaxed">{product.materials}</p>
              </div>
              <div className="border-t border-ink/15 pt-6">
                <span className="font-display italic text-[12px] tracking-[0.3em] text-gold uppercase block mb-3">
                  {m.product_story_label()}
                </span>
                <p className="font-display italic text-[16px] text-ink/85 leading-relaxed">{product.story}</p>
              </div>

              <button
                type="button"
                onClick={openContact}
                className="inline-block font-display italic text-[16px] text-ink border border-ink/30 px-8 py-3 mt-6 hover:bg-ink hover:text-cream transition-all duration-300"
              >
                {m.product_request_cta()} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
