import { ARTICLES, type Article } from '../../lib/content/carnet'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../framing/framing'

export function CarnetHero({ articles = ARTICLES }: { articles?: Article[] }) {
  const featured = articles.find((a) => a.featured) ?? articles[0]
  if (!featured) return null
  return (
    <section className="relative bg-poudre pt-10 pb-20 lg:pb-28 px-8 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="font-display text-[12px] tracking-[0.35em] text-canard block mb-3">
            {m.carnet_eyebrow()}
          </span>
          <h1 className="font-headline text-[clamp(48px,7vw,80px)] text-canard leading-[0.92]">
            {m.carnet_title()}
          </h1>
          <p className="font-body italic font-light text-[20px] text-canard-90 mt-4 max-w-[44ch]">
            {m.carnet_intro()}
          </p>
        </div>

        {/* Featured article */}
        <article className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
          <a href={`/carnet/${featured.slug}`} className="group relative aspect-[4/3] overflow-hidden block">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              style={objectPositionStyle(featured.imagePosition)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute top-5 left-5">
              <span className="inline-block bg-canard text-poudre font-display text-[11px] tracking-[0.3em] uppercase px-4 py-1.5">
                {featured.category}
              </span>
            </div>
          </a>

          <div>
            <span className="font-technical text-canard/40 block mb-4">
              {m.carnet_featured_label()} · {featured.date}
            </span>
            <a href={`/carnet/${featured.slug}`} className="group">
              <h2 className="font-headline text-[clamp(28px,3.5vw,44px)] text-canard leading-[1.05] group-hover:text-rouille transition-colors duration-300">
                {featured.title}
              </h2>
            </a>
            <p className="font-body font-light text-[16px] text-canard/65 leading-relaxed mt-5 max-w-[42ch]">
              {featured.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-6">
              <a
                href={`/carnet/${featured.slug}`}
                className="group/btn font-display text-[13px] tracking-[0.2em] uppercase inline-flex items-center gap-2.5 text-canard hover:text-rouille transition-colors"
              >
                <span>{m.carnet_read_article()}</span>
                <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">→</span>
              </a>
              <span className="font-display text-[12px] text-canard/35">{m.carnet_read_time({ time: featured.readTime })}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
