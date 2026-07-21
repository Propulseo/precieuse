import { Fragment } from 'react'
import { m } from '#/paraglide/messages'
import type { ArticleBlock } from '../../lib/content/carnet'

/** Numéros du mémo d'atelier (variante mobile des blocs liste). */
const MEMO_ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

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
              <Fragment key={i}>
                {/* ≥ md : liste à puces d'origine, strictement inchangée. */}
                <ul className={`max-md:hidden ${styles.list}`}>
                  {block.items.map((it) => (
                    <li key={it} className={styles.listItem}>
                      {it}
                    </li>
                  ))}
                </ul>
                {/* Mobile : « mémo d'atelier » — mêmes items, mis en scène
                    (numéros romains, filets) pour éviter l'effet liste brute. */}
                <div className="md:hidden mt-6 border border-canard/15 px-5 py-5">
                  <p className="mb-1 text-center font-display text-[11px] uppercase tracking-[0.32em] text-framboise">
                    · {m.article_memo_label()} ·
                  </p>
                  <ul>
                    {block.items.map((it, j) => (
                      <li
                        key={it}
                        className="flex items-baseline gap-3.5 border-t border-canard/10 py-2.5 first:border-t-0"
                      >
                        <span className="shrink-0 font-display text-[12px] tracking-[0.18em] text-framboise">
                          {MEMO_ROMANS[j] ?? j + 1}
                        </span>
                        <span className="font-body text-[15px] font-light leading-relaxed text-canard/85">
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fragment>
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
