/**
 * Bandeau réassurance — version éditoriale : 4 garanties réparties sur toute
 * la largeur, séparées par des losanges framboise posés au milieu de chaque
 * intervalle (espaces réguliers). Texte gras serif (Spectral 600).
 * Garanties éditables par Emeline (homePage.reassurance, repli i18n).
 */
export function Reassurance({ items }: { items: string[] }) {
  return (
    <div className="bg-canard px-6 py-3.5 lg:px-14">
      <ul className="mx-auto flex max-w-[1320px] flex-col items-center gap-2.5 sm:flex-row sm:justify-between sm:gap-0">
        {items.flatMap((text, i) => {
          const item = (
            <li
              key={i}
              className="font-display text-[14px] font-semibold tracking-[0.06em] text-poudre"
            >
              {text}
            </li>
          )
          if (i === 0) return [item]
          const sep = (
            <li
              key={`sep-${i}`}
              aria-hidden
              className="hidden size-[7px] rotate-45 bg-framboise/70 sm:block"
            />
          )
          return [sep, item]
        })}
      </ul>
    </div>
  )
}
