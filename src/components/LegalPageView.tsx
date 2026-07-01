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
      <p className="font-body text-[15px] text-canard/90 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-headline text-[28px] text-canard leading-tight mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[18px] text-canard mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-framboise/40 pl-6 my-6 font-display italic text-canard/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 font-body text-[15px] text-canard/90 leading-relaxed space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 font-body text-[15px] text-canard/90 leading-relaxed space-y-1">
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
        className="text-framboise underline underline-offset-2 hover:text-canard transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export function LegalPageView({ title, blocks }: { title: string; blocks: unknown[] }) {
  return (
    <section className="bg-poudre py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-headline text-[48px] text-canard leading-none mb-8">{title}</h1>
        {blocks.length ? (
          <PortableText value={blocks} components={components} />
        ) : (
          <p className="font-display italic text-[16px] text-canard/80">{m.legal_todo()}</p>
        )}
      </div>
    </section>
  )
}
