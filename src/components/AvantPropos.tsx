const PAIRES = [
  { roman: 'i', pas: 'pas de saison', mais: 'Des pièces dessinées pour traverser le temps.' },
  { roman: 'ii', pas: 'pas de stock', mais: "Une fabrication à la commande, pas forcément à l'unité." },
  { roman: 'iii', pas: "pas d'usine", mais: 'Une main, un atelier, un geste, du dessin au sertissage.' },
  { roman: 'iv', pas: "pas d'or sans origine", mais: 'Or 18 carats sourcé et tracé grâce au traité de Kimberley, pierres précieuses choisies une à une.' },
]

function Filigrane() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 24" className="w-[80px] h-6 text-rouille opacity-70" fill="none">
      <path d="M40 12 Q 32 4 24 12 Q 16 20 8 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M40 12 Q 48 4 56 12 Q 64 20 72 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <circle cx="40" cy="12" r="2" stroke="currentColor" strokeWidth="0.6" fill="currentColor" fillOpacity="0.3" />
      <line x1="0" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="0.4" />
      <line x1="74" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  )
}

function Seal() {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className="w-[88px] h-[88px] text-canard opacity-80" fill="none">
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
      <text x="60" y="40" textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="serif" letterSpacing="1.8">ATELIER</text>
      <text x="60" y="68" textAnchor="middle" fontSize="22" fill="currentColor" fontFamily="serif" fontStyle="italic">P</text>
      <text x="60" y="86" textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="serif" letterSpacing="1.8">BORDEAUX</text>
      <text x="60" y="100" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="serif" letterSpacing="2">MMXXVI</text>
    </svg>
  )
}

export function AvantPropos() {
  return (
    <section className="relative bg-poudre py-20 px-8 lg:px-16">
      <div className="absolute top-0 left-0 right-0 border-t border-canard/25" />

      <div className="mx-auto max-w-[1320px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="relative md:order-1 order-2 mx-auto md:mx-0">
          <div className="relative w-full max-w-[460px] aspect-[3/4] border border-canard/30 overflow-hidden">
            <img
              src="/images/emeline-portrait.jpg"
              alt="Portrait d'Emeline Le Ray, fondatrice et joaillière de Précieuse"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between max-w-[460px]">
            <span className="font-display text-[13px] tracking-[0.25em] uppercase text-canard/70">
              Emeline Le Ray
            </span>
            <span className="font-display text-[12px] tracking-[0.2em] uppercase text-canard">
              Bordeaux · MMXXVI
            </span>
          </div>
        </div>

        <div className="md:order-2 order-1">
          <span className="font-display text-[10px] tracking-[0.45em] uppercase text-canard block mb-5">
            Avant-propos
          </span>

          <div className="flex flex-col items-start mb-10">
            <span className="font-display text-[34px] tracking-[0.18em] uppercase text-canard leading-none">
              Atelier
            </span>
            <div className="my-3">
              <Filigrane />
            </div>
            <span className="font-headline text-[52px] text-canard leading-none">
              Précieuse
            </span>
          </div>

          <ul className="flex flex-col gap-7">
            {PAIRES.map((p) => (
              <li key={p.roman} className="grid grid-cols-[32px_1fr] gap-5 items-baseline">
                <span className="font-display text-[15px] text-rouille opacity-80 tracking-wider">
                  · {p.roman} ·
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-[15px] text-canard/65 tracking-wide">
                    {p.pas}
                  </span>
                  <span className="font-display text-[20px] text-canard leading-[1.45]">
                    {p.mais}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-6 pt-6 border-t border-canard/15">
            <Seal />
            <div className="flex flex-col">
              <span className="font-display text-[18px] text-canard">Emeline Le Ray</span>
              <span className="font-display text-[13px] text-canard/65 tracking-wide">
                joaillière diplômée · 12 ans d'expérience
              </span>
              <span className="font-display text-[12px] text-canard/45 tracking-wide mt-0.5">
                fondatrice · Bordeaux · MMXXVI
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end max-w-[1320px] mx-auto">
        <span className="font-display text-[13px] text-canard">p. 02</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-canard/25" />
    </section>
  )
}
