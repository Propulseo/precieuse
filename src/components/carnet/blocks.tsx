import type { ArticleBlock } from '../../lib/content/carnet'

/** Slug stable pour les ancres de sommaire (sans accents, kebab-case).
 *  Repli `section` si le titre ne produit aucun caractère exploitable. */
export function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return slug || 'section'
}

export type BlockStyles = {
  h2: string
  p: string
  quote: string
  quoteText: string
  quoteCite: string
  list: string
  listItem: string
}

/** Preset de lecture par défaut (mesure confortable, canard sur poudre). */
export const proseStyles: BlockStyles = {
  h2: 'mb-3 mt-14 font-headline text-[clamp(26px,3.2vw,38px)] leading-[1.1] text-canard [text-wrap:balance]',
  p: 'mt-5 font-body text-[17px] font-light leading-[1.75] text-canard/85 [text-wrap:pretty]',
  quote: 'my-12 text-center',
  quoteText:
    'mx-auto max-w-[46ch] font-headline text-[clamp(24px,3vw,36px)] italic leading-snug text-canard [text-wrap:pretty]',
  quoteCite: 'mt-4 font-display text-[12px] uppercase tracking-[0.25em] text-framboise',
  list: 'mt-5 space-y-2 pl-6 font-body text-[17px] font-light leading-[1.7] text-canard/85 [list-style:disc]',
  listItem: 'marker:text-framboise [text-wrap:pretty]',
}

const DROP_CAP =
  " [&::first-letter]:float-left [&::first-letter]:mr-3 [&::first-letter]:pt-1 [&::first-letter]:font-headline [&::first-letter]:text-[64px] [&::first-letter]:leading-[0.7] [&::first-letter]:text-framboise"

/**
 * Rend le corps d'un article. `dropCap` applique une lettrine au premier
 * paragraphe ; les H2 reçoivent un id (ancre) + `scroll-mt` pour atterrir sous
 * le header collant quand on clique une entrée du sommaire.
 */
export function ArticleBlocks({
  body,
  styles,
  dropCap = false,
}: {
  body: ArticleBlock[]
  styles: BlockStyles
  dropCap?: boolean
}) {
  let firstParagraph = true
  return (
    <>
      {body.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className={`scroll-mt-24 ${styles.h2}`}
              >
                {block.text}
              </h2>
            )
          case 'quote':
            return (
              <figure key={i} className={styles.quote}>
                <p className={styles.quoteText}>« {block.text} »</p>
                {block.cite ? (
                  <figcaption className={styles.quoteCite}>{block.cite}</figcaption>
                ) : null}
              </figure>
            )
          case 'list':
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((it) => (
                  <li key={it} className={styles.listItem}>
                    {it}
                  </li>
                ))}
              </ul>
            )
          default: {
            const cap = dropCap && firstParagraph
            firstParagraph = false
            return (
              <p key={i} className={cap ? styles.p + DROP_CAP : styles.p}>
                {block.text}
              </p>
            )
          }
        }
      })}
    </>
  )
}
