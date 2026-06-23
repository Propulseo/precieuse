import { useState } from 'react'
import { ARTICLES, CATEGORIES, type Article } from '../../lib/content/carnet'

export function CarnetGrid({ articles = ARTICLES }: { articles?: Article[] }) {
  const rest = articles.filter((a) => !a.featured)
  const [filter, setFilter] = useState<string>('Tous')
  const filtered = filter === 'Tous' ? rest : rest.filter((a) => a.category === filter)

  return (
    <section className="relative bg-poudre pb-24 lg:pb-32 px-8 lg:px-16">
      <div className="absolute top-0 left-0 right-0 border-t border-canard/15" />

      <div className="mx-auto max-w-[1320px] pt-14 lg:pt-20">
        {/* Filters */}
        <div className="flex items-center gap-6 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`font-display text-[13px] tracking-[0.15em] uppercase pb-1 border-b-2 transition-colors duration-300 ${
                filter === cat
                  ? 'border-canard text-canard'
                  : 'border-transparent text-canard/45 hover:text-canard/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((article) => (
            <article key={article.slug} className="group flex flex-col">
              <a
                href={`/carnet/${article.slug}`}
                className="relative aspect-[3/2] overflow-hidden block mb-5"
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </a>

              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-[11px] tracking-[0.25em] uppercase text-rouille/80">
                  {article.category}
                </span>
                <span className="block w-3 h-px bg-canard/25" />
                <span className="font-display text-[11px] text-canard/40">
                  {article.date}
                </span>
              </div>

              <a href={`/carnet/${article.slug}`}>
                <h3 className="font-headline text-[22px] lg:text-[24px] text-canard leading-[1.15] group-hover:text-rouille transition-colors duration-300">
                  {article.title}
                </h3>
              </a>

              <p className="font-body font-light text-[14px] text-canard/55 leading-relaxed mt-2.5 flex-1">
                {article.excerpt}
              </p>

              <span className="font-display text-[11px] text-canard/30 mt-4">
                {article.readTime} de lecture
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
