import { createFileRoute, Link } from '@tanstack/react-router'
import { PRODUCTS } from '../lib/content/products'

export const Route = createFileRoute('/collection')({ component: CollectionPage })

function CollectionPage() {
  return (
    <section className="bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-12">
          <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3">
            CHAPITRE I · LA COLLECTION
          </span>
          <h1 className="font-headline text-[64px] text-ink leading-none">La Collection</h1>
          <p className="font-script text-[20px] text-raspberry mt-4">cinq pièces, cinq histoires</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              to="/collection/$slug"
              params={{ slug: product.slug }}
              className="group block"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h2 className="font-display italic text-[28px] text-ink leading-none">{product.name}</h2>
              <p className="font-script text-[16px] text-raspberry mt-1">{product.tagline}</p>
              <p className="font-display italic text-[14px] text-gold mt-2">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
