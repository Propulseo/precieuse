import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import { getArticle } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../components/framing/framing'

export const Route = createFileRoute('/carnet/$slug')({
  component: ArticlePage,
  // Lit Sanity quand il est branché, sinon le contenu statique ARTICLES.
  loader: async ({ params }) => {
    const article = await getArticle(params.slug, getLocale())
    if (!article) throw notFound()
    return article
  },
})

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body font-light text-[16px] text-canard/80 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-headline text-[26px] text-canard leading-tight mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[18px] text-canard mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-rouille/40 pl-6 my-8 font-body italic text-canard/75">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 font-body font-light text-[16px] text-canard/80 leading-relaxed space-y-1.5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 font-body font-light text-[16px] text-canard/80 leading-relaxed space-y-1.5">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string }).href}
        target="_blank"
        rel="noreferrer"
        className="text-rouille underline underline-offset-2 hover:text-canard transition-colors"
      >
        {children}
      </a>
    ),
  },
}

function ArticlePage() {
  const article = Route.useLoaderData()
  const body = (article.body ?? []) as never[]

  return (
    <section className="bg-poudre py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[760px]">
        <Link
          to="/carnet"
          className="font-display text-[13px] tracking-[0.15em] uppercase text-canard/50 hover:text-canard transition-colors"
        >
          ← {m.carnet_back()}
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="font-display text-[11px] tracking-[0.25em] uppercase text-rouille/80">
            {article.category}
          </span>
          <span className="block w-3 h-px bg-canard/25" />
          <span className="font-display text-[11px] text-canard/40">{article.date}</span>
          <span className="block w-3 h-px bg-canard/25" />
          <span className="font-display text-[11px] text-canard/40">
            {m.carnet_read_time({ time: article.readTime })}
          </span>
        </div>

        <h1 className="mt-5 font-headline text-[clamp(34px,5vw,56px)] text-canard leading-[1.05]">
          {article.title}
        </h1>

        <p className="mt-6 font-body italic font-light text-[19px] text-canard/65 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="mt-10 aspect-[3/2] overflow-hidden">
          <img
            src={article.image}
            alt={article.imageAlt}
            style={objectPositionStyle(article.imagePosition)}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-12">
          {body.length ? (
            <PortableText value={body} components={components} />
          ) : (
            <p className="font-body italic text-[16px] text-canard/55">
              {m.carnet_article_draft()}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
