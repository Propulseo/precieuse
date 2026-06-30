import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getProduct } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../components/framing/framing'
import { useContactDrawer } from '../components/contact/ContactDrawerProvider'
import { seo } from '../lib/seo'

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

function ProductPage() {
  const product = Route.useLoaderData()
  const { open: openContact } = useContactDrawer()

  return (
    <section className="bg-poudre py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[1320px]">
        <Link to="/collection" className="font-display italic text-[14px] text-framboise hover:text-canard transition-colors">
          ← {m.product_back_to_collection()}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8">
          <div className="aspect-[3/4] overflow-hidden bg-canard-10">
            <img src={product.image} alt={product.imageAlt} style={objectPositionStyle(product.imagePosition)} className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="font-display italic text-[clamp(48px,6vw,80px)] text-canard leading-none mb-4">
              {product.name}
            </h1>
            <p className="font-script text-[24px] text-framboise mb-6">{product.tagline}</p>
            <p className="font-display italic text-[24px] text-canard mb-8">{product.price}</p>

            <div className="space-y-6 max-w-prose">
              <p className="font-body text-[15px] text-canard/90 leading-relaxed">{product.description}</p>
              <div className="border-t border-canard/15 pt-6">
                <span className="font-display italic text-[12px] tracking-[0.3em] text-framboise uppercase block mb-3">
                  {m.product_materials_label()}
                </span>
                <p className="font-body text-[14px] text-canard/90 leading-relaxed">{product.materials}</p>
              </div>
              <div className="border-t border-canard/15 pt-6">
                <span className="font-display italic text-[12px] tracking-[0.3em] text-framboise uppercase block mb-3">
                  {m.product_story_label()}
                </span>
                <p className="font-display italic text-[16px] text-canard/90 leading-relaxed">{product.story}</p>
              </div>

              <button
                type="button"
                onClick={openContact}
                className="inline-block font-display italic text-[16px] text-canard border border-canard/40 px-8 py-3 mt-6 hover:bg-canard hover:text-poudre transition-all duration-300"
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
