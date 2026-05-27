/**
 * Hero C — Triptyque 3 panneaux (style Gemmyo).
 * Gauche image produit (40%) + centre fond uni cream (40%) + droite image+texte (20%).
 */
export function HeroTriptyqueGemmyo() {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden">
      <div className="grid grid-cols-[40fr_40fr_20fr] h-full">
        {/* Panneau gauche : macro produit */}
        <div className="relative overflow-hidden">
          <img
            src="/images/bijoux-officiels/aurore.jpg"
            alt="Bague Aurore, macro produit"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Panneau central : respiration colorée */}
        <div className="relative bg-ivory flex items-center justify-center">
          <div className="text-center px-8">
            <span className="font-display italic text-[12px] tracking-[0.45em] uppercase text-ink/55 block mb-6">
              Maison Précieuse
            </span>
            <h1 className="font-headline text-[clamp(38px,4.5vw,64px)] text-ink leading-[0.95]">
              Une histoire,
              <br />
              une bague.
            </h1>
            <div className="mt-7 mx-auto w-16 h-px bg-gold" />
            <p className="font-display italic text-[15px] text-ink/65 mt-7 max-w-[280px] mx-auto leading-relaxed">
              Sur-mesure et collection, à la main, au Portugal.
            </p>
          </div>
        </div>

        {/* Panneau droit : image lifestyle + CTA en bas */}
        <div className="relative overflow-hidden">
          <img
            src="/images/carnet/aurore-portee.jpg"
            alt="Bague Aurore portée"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-cream">
            <a
              href="/collection"
              className="font-display text-[11px] tracking-[0.35em] uppercase border-b border-cream/70 pb-1 hover:border-gold transition-colors"
            >
              Découvrir
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
