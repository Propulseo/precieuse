import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import type { Article } from '../../lib/content/carnet'
import { objectPositionStyle } from '../framing/framing'
import { ArticleBlocks, proseStyles } from './blocks'
import { Sommaire } from './Sommaire'

/** Méta d'un article : catégorie · date · temps de lecture (accent framboise). */
function Meta({ a, center }: { a: Article; center?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[11px] uppercase tracking-[0.25em] ${
        center ? 'justify-center' : ''
      }`}
    >
      <span className="text-framboise">{a.category}</span>
      <span aria-hidden className="text-canard/30">·</span>
      <span className="text-canard/50">{a.date}</span>
      <span aria-hidden className="text-canard/30">·</span>
      <span className="text-canard/50">{m.carnet_read_time({ time: a.readTime })}</span>
    </div>
  )
}

export function CarnetArticle({
  article,
  related,
}: {
  article: Article
  related: Article[]
}) {
  const body = article.body ?? []
  const headings = body.filter(
    (b): b is { kind: 'h2'; text: string } => b.kind === 'h2',
  )

  return (
    <article className="bg-poudre pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1180px] px-6 pt-8 lg:px-10 lg:pt-10">
        {/* Bandeau de tête. Le titre respecte les sauts de ligne du champ
            (Sanity) via whitespace-pre-line → l'éditrice décide où il se coupe. */}
        <header>
          {/* Retour + méta sur la même ligne (retour à gauche, méta centrée) ;
              empilés sur mobile pour éviter le chevauchement. */}
          <div className="relative sm:flex sm:items-center sm:justify-center">
            <Link
              to="/carnet"
              className="group inline-flex items-center gap-2 font-display text-[13px] uppercase tracking-[0.18em] text-framboise transition-colors hover:text-canard sm:absolute sm:left-0"
            >
              <span
                aria-hidden
                className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
              >
                ←
              </span>
              {m.article_back()}
            </Link>
            <div className="mt-4 sm:mt-0">
              <Meta a={article} center />
            </div>
          </div>

          <div className="mt-5 grid items-start gap-x-12 gap-y-5 md:grid-cols-[1.6fr_1fr]">
            <h1 className="whitespace-pre-line font-headline text-[clamp(32px,3.4vw,52px)] leading-[1.06] text-canard [text-wrap:pretty]">
              {article.title}
            </h1>
            {article.lede ? (
              <p className="font-body italic text-[clamp(17px,1.5vw,22px)] font-light leading-[1.55] text-canard-90 [text-wrap:pretty] md:pb-2">
                {article.lede}
              </p>
            ) : null}
          </div>
        </header>

        {/* Photo en passe-partout : cadre de hauteur bornée (≤ écran), photo
            ENTIÈRE (object-contain) centrée. Fond transparent → l'espace autour
            de la photo se fond dans le poudre de la page (aucun cadre visible).
            Jamais rognée, quel que soit le ratio. Repli sur le placeholder. */}
        <figure className="mt-9 flex h-[min(56vh,520px)] w-full items-center justify-center overflow-hidden lg:mt-11">
          <img
            src={article.image || '/images/placeholder-piece.svg'}
            alt={article.imageAlt}
            className="max-h-full max-w-full object-contain"
          />
        </figure>

        {/* Corps : sommaire collant (colonne gauche) + colonne de lecture. */}
        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-x-16">
          {headings.length > 0 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <Sommaire headings={headings} readTime={article.readTime} />
              </div>
            </aside>
          ) : null}

          <div>
            {headings.length > 0 ? (
              <div className="mb-10 border-y border-canard/15 py-6 lg:hidden">
                <Sommaire headings={headings} readTime={article.readTime} />
              </div>
            ) : null}

            <div className="max-w-[700px] [&>h2:first-child]:mt-2">
              {body.length > 0 ? (
                <ArticleBlocks body={body} styles={proseStyles} dropCap />
              ) : (
                <p className="py-8 text-center font-body italic text-[17px] font-light text-canard/65">
                  {m.article_todo()}
                </p>
              )}

              {/* Citation de clôture (signature d'Emeline) — éditable dans Sanity (repli statique). */}
              {article.closingQuote ? (
                <figure className="mt-16 border-t border-canard/15 pt-10 text-center">
                  <p className="mx-auto max-w-[48ch] font-headline text-[clamp(24px,3vw,36px)] italic leading-snug text-canard [text-wrap:pretty]">
                    « {article.closingQuote.text} »
                  </p>
                  {article.closingQuote.cite ? (
                    <figcaption className="mt-4 font-display text-[12px] uppercase tracking-[0.25em] text-framboise">
                      {article.closingQuote.cite}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* À lire aussi */}
      {related.length > 0 ? (
        <aside className="mx-auto mt-20 max-w-[1320px] px-8 lg:px-16">
          <h2 className="mb-10 text-center font-headline text-[clamp(22px,2.6vw,32px)] text-canard">
            {m.article_related()}
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                to="/carnet/$slug"
                params={{ slug: a.slug }}
                className="group flex flex-col"
              >
                <div className="relative mb-4 aspect-[3/2] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.imageAlt}
                    style={objectPositionStyle(a.imagePosition)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-framboise">
                  {a.category}
                </span>
                <h3 className="mt-2 font-headline text-[20px] leading-[1.15] text-canard transition-colors group-hover:text-framboise [text-wrap:balance]">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </article>
  )
}
