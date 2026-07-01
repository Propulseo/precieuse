import { ARTICLES, type Article } from '../../lib/content/carnet'
import { m } from '#/paraglide/messages'
import { EditorialHeader } from '../editorial/EditorialHeader'
import { objectPositionStyle } from '../framing/framing'

/**
 * Ouverture du Carnet : manchette cohérente avec la page Collection
 * (pictogramme fleur + titre + ornement), puis l'article à la une en grand,
 * traitement éditorial (pas une carte). Sur la charte poudre/canard, accent
 * framboise.
 */
export function CarnetHero({ articles = ARTICLES }: { articles?: Article[] }) {
  const featured = articles.find((a) => a.featured) ?? articles[0]

  return (
    <>
      {/* Manchette — composant partagé (cohérent avec Collection et Créatrice),
          avec le texte d'intro à la place de la liste de pièces. */}
      <EditorialHeader title={m.carnet_title()}>
        <p className="mx-auto max-w-[54ch] font-body italic font-light text-[clamp(14px,1.4vw,17px)] leading-[1.4] text-canard-90 [text-wrap:pretty]">
          {m.carnet_intro()}
        </p>
      </EditorialHeader>

      {/* Article à la une */}
      {featured ? (
        <section className="bg-poudre px-8 pb-14 pt-5 lg:px-16 lg:pb-16 lg:pt-6">
          <article className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
            <a
              href={`/carnet/${featured.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden"
            >
              <img
                src={featured.image}
                alt={featured.imageAlt}
                style={objectPositionStyle(featured.imagePosition)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute left-5 top-5 inline-block bg-canard px-4 py-1.5 font-display text-[11px] uppercase tracking-[0.3em] text-poudre">
                {featured.category}
              </span>
            </a>

            <div>
              <span className="font-display text-[11px] uppercase tracking-[0.3em] text-framboise">
                {m.carnet_featured_label()} · {featured.date}
              </span>
              <a href={`/carnet/${featured.slug}`} className="group block">
                <h2 className="mt-3 font-headline text-[clamp(26px,3.4vw,44px)] leading-[1.05] text-canard transition-colors duration-300 group-hover:text-framboise [text-wrap:balance]">
                  {featured.title}
                </h2>
              </a>
              <p className="mt-4 max-w-[44ch] font-body font-light text-[16px] leading-relaxed text-canard/90 [text-wrap:pretty]">
                {featured.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={`/carnet/${featured.slug}`}
                  className="group/btn inline-flex items-center gap-2.5 font-display text-[13px] uppercase tracking-[0.2em] text-canard transition-colors hover:text-framboise"
                >
                  <span>{m.carnet_read_article()}</span>
                  <span
                    aria-hidden
                    className="transition-transform group-hover/btn:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </a>
                <span className="font-display text-[12px] text-canard/45">
                  {m.carnet_read_time({ time: featured.readTime })}
                </span>
              </div>
            </div>
          </article>
        </section>
      ) : null}
    </>
  )
}
