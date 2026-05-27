import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { PRODUCTS } from '../lib/content/products'

export const Route = createFileRoute('/collection/$slug')({
  component: ProductPage,
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug)
    if (!product) throw notFound()
    return product
  },
})

function ProductPage() {
  const product = Route.useLoaderData()

  return (
    <section className="bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[1320px]">
        <Link to="/collection" className="font-display italic text-[14px] text-gold hover:text-ink transition-colors">
          ← retour à la collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover" />
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
                  Matières
                </span>
                <p className="font-sans text-[14px] text-ink/80 leading-relaxed">{product.materials}</p>
              </div>
              <div className="border-t border-ink/15 pt-6">
                <span className="font-display italic text-[12px] tracking-[0.3em] text-gold uppercase block mb-3">
                  Histoire
                </span>
                <p className="font-display italic text-[16px] text-ink/85 leading-relaxed">{product.story}</p>
              </div>

              <Link
                to="/contact"
                className="inline-block font-display italic text-[16px] text-ink border border-ink/30 px-8 py-3 mt-6 hover:bg-ink hover:text-cream transition-all duration-300"
              >
                Demander cette pièce →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
