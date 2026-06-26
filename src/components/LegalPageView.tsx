import { PortableText  } from '@portabletext/react'
import type {PortableTextComponents} from '@portabletext/react';
import { m } from '#/paraglide/messages'

/**
 * Rendu d'une page légale (mentions, confidentialité, CGV).
 * `title` + `blocks` viennent de Sanity (getLegalPage) ; si `blocks` est vide,
 * on affiche un repli « page en cours de rédaction » (le contenu juridique
 * réel reste à saisir par Emeline / un juriste dans le Studio).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-[15px] text-ink/80 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-headline text-[28px] text-ink leading-tight mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[18px] text-ink mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-raspberry/40 pl-6 my-6 font-display italic text-ink/75">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 font-sans text-[15px] text-ink/80 leading-relaxed space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 font-sans text-[15px] text-ink/80 leading-relaxed space-y-1">
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
        className="text-raspberry underline underline-offset-2 hover:text-ink transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export function LegalPageView({ title, blocks }: { title: string; blocks: unknown[] }) {
  return (
    <section className="bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-headline text-[48px] text-ink leading-none mb-8">{title}</h1>
        {blocks.length ? (
          <PortableText value={blocks} components={components} />
        ) : (
          <p className="font-display italic text-[16px] text-ink/70">{m.legal_todo()}</p>
        )}
      </div>
    </section>
  )
}
