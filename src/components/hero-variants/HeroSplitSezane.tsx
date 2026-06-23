/**
 * Hero A — Split 50/50 strict (style Sézane).
 * Macro produit à gauche + portrait/main portée à droite.
 * Texte centré à cheval sur les 2 images, 1 seul CTA.
 */
export function HeroSplitSezane() {
  return (
    <section className="relative w-full h-screen min-h-[640px] -mt-16 overflow-hidden">
      <div className="grid grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <img
            src="/images/real/bague-main-josephine.webp"
            alt="Bague Joséphine en or 18 carats portée à la main — atelier Précieuse, Bordeaux"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden">
          <img
            src="/images/real/buste-thelma-louise.webp"
            alt="Bagues Thelma et Louise en or 18 carats portées — création de l'atelier Précieuse, Bordeaux"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Voile très léger pour lisibilité du texte */}
      <div className="absolute inset-0 bg-canard/15 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-poudre px-6">
        <span className="font-display text-[12px] tracking-[0.4em] uppercase text-poudre/85 block mb-5">
          Joaillerie artisanale · Bordeaux
        </span>
        <h1 className="font-headline text-[clamp(48px,7vw,96px)] leading-[0.95] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          Précieuse.
        </h1>
        <p className="font-display text-[clamp(16px,2vw,22px)] text-poudre/90 mb-10 max-w-[28ch] leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]">
          Chaque bijou raconte une histoire.{' '}
          <span className="text-lie-de-vin drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">La vôtre.</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/collection"
            className="inline-block font-display text-[12px] tracking-[0.35em] uppercase border border-poudre/80 px-9 py-3.5 hover:bg-poudre hover:text-canard transition-colors duration-300"
          >
            Découvrir la collection
          </a>
          <a
            href="/sur-mesure"
            className="inline-block font-display text-[12px] tracking-[0.35em] uppercase border border-poudre/80 px-9 py-3.5 hover:bg-poudre hover:text-canard transition-colors duration-300"
          >
            Créer sur-mesure
          </a>
        </div>
      </div>
    </section>
  )
}
