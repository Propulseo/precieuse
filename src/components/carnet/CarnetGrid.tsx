import { useState } from 'react'
import { ARTICLES, type Article } from '../../lib/content/carnet'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../framing/framing'

/** Filtre « tous les articles » (sentinelle ; Carnet FR-only pour l'instant). */
const ALL = 'Tous'

/**
 * Index des articles du Carnet : filtre par catégorie + grille éditoriale
 * (rythme magazine — la une est portée par CarnetHero, ici les autres pièces).
 * Accent framboise sur catégories et survols, état vide géré. Les catégories
 * sont dérivées des articles (donc éditables dans Sanity, jamais désynchronisées).
 */
export function CarnetGrid({ articles = ARTICLES }: { articles?: Article[] }) {
  const rest = articles.filter((a) => !a.featured)
  const categories = [ALL, ...new Set(articles.map((a) => a.category))]
  const [filter, setFilter] = useState<string>(ALL)
  const filtered =
    filter === ALL ? rest : rest.filter((a) => a.category === filter)

  return (
    <section className="bg-poudre px-8 pb-24 lg:px-16 lg:pb-32">
      <div className="mx-auto max-w-[1320px]">
        {/* Filtres */}
        <div
          className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3"
          role="group"
          aria-label={m.carnet_eyebrow()}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`border-b-2 pb-1 font-display text-[13px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                filter === cat
                  ? 'border-framboise text-canard'
                  : 'border-transparent text-canard/50 hover:text-canard/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille / état vide */}
        {filtered.length === 0 ? (
          <p className="py-16 text-center font-body italic font-light text-[18px] text-canard/65">
            {m.carnet_empty()}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <article key={article.slug} className="group flex flex-col">
                <a
                  href={`/carnet/${article.slug}`}
                  className="relative mb-5 block aspect-[3/2] overflow-hidden"
                >
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    style={objectPositionStyle(article.imagePosition)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </a>

                <div className="mb-3 flex items-center gap-3">
                  <span className="font-display text-[11px] uppercase tracking-[0.25em] text-framboise">
                    {article.category}
                  </span>
                  <span className="block h-px w-3 bg-canard/25" />
                  <span className="font-display text-[11px] text-canard/45">
                    {article.date}
                  </span>
                </div>

                <a href={`/carnet/${article.slug}`}>
                  <h3 className="font-headline text-[22px] leading-[1.15] text-canard transition-colors duration-300 group-hover:text-framboise lg:text-[24px] [text-wrap:balance]">
                    {article.title}
                  </h3>
                </a>

                <p className="mt-2.5 flex-1 font-body font-light text-[14px] leading-relaxed text-canard/90 [text-wrap:pretty]">
                  {article.excerpt}
                </p>

                <span className="mt-4 font-display text-[11px] text-canard/45">
                  {m.carnet_read_time({ time: article.readTime })}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
