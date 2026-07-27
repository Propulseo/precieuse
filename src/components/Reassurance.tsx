/**
 * Bandeau réassurance — 4 garanties en texte gras serif (Spectral 600) sur le
 * bloc canard, rythmées par le losange framboise de la marque.
 *
 * Deux mises en page, un seul ornement :
 * - ≥ sm : les garanties sur une ligne, réparties sur toute la largeur, les
 *   losanges posés au milieu de chaque intervalle.
 * - mobile : deux lignes de deux, et le losange passe DEVANT chaque garantie —
 *   le séparateur devient une puce. Avant, les losanges disparaissaient purement
 *   et simplement sous `sm` et il ne restait que quatre lignes centrées, sans
 *   structure ni respiration.
 *
 * Deux gardes-fous, parce que les textes viennent de Sanity (longueur libre) :
 * `w-fit` fait que les colonnes se calent sur le contenu réel au lieu de
 * couper à une largeur fixe, et la taille de police est fluide
 * (`clamp(12px,3.4vw,14px)`). Mesuré sur les textes actuels : tient de 360 px
 * à 430 px. En dessous (320 px, iPhone SE 1) ou si Emeline écrit nettement plus
 * long, une garantie passe sur deux lignes dans sa case — la grille tient,
 * c'est juste un peu plus haut.
 *
 * Garanties éditables par Emeline (homePage.reassurance, repli i18n).
 */
export function Reassurance({ items }: { items: string[] }) {
  return (
    <div className="bg-canard px-4 py-5 sm:px-6 sm:py-3.5 lg:px-14">
      {/* `w-fit` + `mx-auto` : la paire de colonnes se dimensionne sur son
          contenu puis se centre comme un tout, et les textes s'alignent sur une
          même verticale à gauche — des lignes centrées donnaient un bord gauche
          en dents de scie. */}
      <ul className="mx-auto grid w-fit grid-cols-2 gap-x-3 gap-y-3.5 sm:flex sm:w-auto sm:max-w-[1320px] sm:items-center sm:justify-between sm:gap-0">
        {items.flatMap((text, i) => {
          const item = (
            <li
              key={i}
              className="flex items-start gap-2.5 font-display text-[clamp(12px,3.4vw,14px)] font-semibold leading-snug tracking-[0.06em] text-poudre sm:block sm:text-[14px]"
            >
              {/* Calage en `em` et non en pixels : la police est fluide, un
                  décalage fixe désaligne la puce dès que la taille change.
                  0.6875em = moitié de l'interligne `leading-snug`, moins la
                  demi-hauteur du losange. */}
              <span
                aria-hidden
                className="mt-[calc(0.6875em-3px)] size-[6px] shrink-0 rotate-45 bg-framboise/70 sm:hidden"
              />
              <span>{text}</span>
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
