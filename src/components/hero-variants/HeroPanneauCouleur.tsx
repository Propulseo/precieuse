/**
 * Hero D — Hybride 60/40 (image + panneau couleur uni).
 * Grande image à gauche (60%) + panneau couleur teal/cream à droite (40%) avec texte et CTA.
 */
export function HeroPanneauCouleur() {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] h-full">
        {/* Image principale (60%) */}
        <div className="relative overflow-hidden">
          <img
            src="/images/bijou-lifestyle-main.jpg"
            alt="Bague Précieuse portée, lifestyle"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Légende discrète en bas */}
          <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between text-cream/85">
            <span className="font-script text-[18px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              Joséphine
            </span>
            <span className="font-display italic text-[11px] tracking-[0.3em] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              Bordeaux
            </span>
          </div>
        </div>

        {/* Panneau couleur (40%) */}
        <div className="relative bg-raspberry flex flex-col justify-center px-10 lg:px-16 py-16 text-cream">
          {/* Filets décoratifs */}
          <div className="absolute top-10 right-10 w-20 h-px bg-cream/40" />
          <div className="absolute bottom-10 left-10 w-20 h-px bg-cream/40" />

          <span className="font-display italic text-[11px] tracking-[0.45em] uppercase text-cream/80 block mb-6">
            Maison Précieuse
          </span>
          <h1 className="font-headline text-[clamp(42px,5.5vw,72px)] leading-[0.95] mb-7">
            Une bague,
            <br />
            une présence.
          </h1>
          <p className="font-display italic text-[17px] leading-relaxed text-cream/85 max-w-[360px] mb-10">
            Cinq pièces façonnées à la main, en or 18 carats, dans notre atelier à Bordeaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/collection"
              className="inline-block font-display text-[12px] tracking-[0.35em] uppercase bg-cream text-ink px-8 py-3.5 hover:bg-ink hover:text-cream transition-colors duration-300 text-center"
            >
              La collection
            </a>
            <a
              href="/sur-mesure"
              className="inline-block font-display italic text-[15px] text-cream/90 underline underline-offset-4 decoration-cream/40 hover:decoration-cream pt-3 sm:pt-2 text-center"
            >
              Création sur-mesure
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
