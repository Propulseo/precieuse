/**
 * Etabli C — Galerie macro (refonte conceptuelle).
 * Abandonne le scroll narratif, propose un mur mosaïque des pièces finies.
 * Style catalogue éditorial Gemmyo.
 */

type Piece = {
  name: string
  image: string
  tag: string
  caption: string
  span?: 'large' | 'tall'
}

const PIECES: Piece[] = [
  {
    name: 'Aurore',
    image: '/images/bijoux-officiels/aurore.jpg',
    tag: 'I',
    caption: 'la promesse d\'un nouveau jour',
    span: 'large',
  },
  {
    name: 'Joséphine',
    image: '/images/bijoux-officiels/josephine.jpg',
    tag: 'II',
    caption: 'l\'entourage hérité',
  },
  {
    name: 'Eugénie',
    image: '/images/etabli/piece-01.png',
    tag: 'III',
    caption: 'trois pierres, trois temps',
  },
  {
    name: 'Thelma',
    image: '/images/etabli/piece-02.png',
    tag: 'IV',
    caption: 'l\'audace tranquille',
    span: 'tall',
  },
  {
    name: 'Louise',
    image: '/images/etabli/piece-03.png',
    tag: 'V',
    caption: 'l\'éternelle alliance',
  },
]

export function EtabliGalerieMacro() {
  return (
    <section className="relative bg-cream px-6 lg:px-12 py-20 lg:py-28">
      <header className="mx-auto max-w-[1440px] mb-14 lg:mb-20 text-center">
        <span className="font-display italic text-[12px] tracking-[0.45em] text-gold block mb-4">
          L'ATELIER
        </span>
        <h2 className="font-headline text-[clamp(48px,6vw,84px)] text-ink leading-[0.95]">
          Cinq pièces, à la main.
        </h2>
        <p className="font-display italic text-[17px] text-ink/65 mt-6 max-w-[520px] mx-auto">
          Chaque bague façonnée à l'unité, à Bordeaux, en or 18 carats.
        </p>
      </header>

      <div className="mx-auto max-w-[1440px] grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-3 lg:gap-5">
        {PIECES.map((piece) => {
          const spanCls =
            piece.span === 'large'
              ? 'col-span-2 row-span-2'
              : piece.span === 'tall'
                ? 'row-span-2'
                : ''
          return (
            <article
              key={piece.name}
              className={`group relative overflow-hidden bg-ivory aspect-[4/5] ${spanCls}`}
            >
              <img
                src={piece.image}
                alt={`Bague ${piece.name}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />

              {/* Tag en haut à gauche */}
              <span className="absolute top-4 left-4 font-display italic text-[11px] tracking-[0.35em] text-ink/70 bg-cream/85 backdrop-blur-sm px-2.5 py-1">
                {piece.tag}
              </span>

              {/* Nom + caption en bas */}
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent text-cream">
                <h3 className="font-headline text-[clamp(24px,2.5vw,36px)] leading-none mb-2">
                  {piece.name}
                </h3>
                <p className="font-script text-[16px] text-cream/90">
                  {piece.caption}
                </p>
              </div>
            </article>
          )
        })}
      </div>

      <footer className="mx-auto max-w-[1440px] mt-14 lg:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gold/15">
        <span className="font-display italic text-[15px] text-ink/65 max-w-[420px] text-center sm:text-left">
          De l'esquisse au polissage, six à huit semaines pour chaque création.
        </span>
        <a
          href="/sur-mesure"
          className="font-display text-[12px] tracking-[0.35em] uppercase border border-ink/30 px-7 py-3 hover:bg-ink hover:text-cream transition-colors"
        >
          Découvrir le sur-mesure
        </a>
      </footer>
    </section>
  )
}
