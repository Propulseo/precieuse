/**
 * Hero B — Split 50/50 joaillerie pure (style Sézane sans humain).
 * Macro produit à gauche + ambiance/drapé à droite.
 * Texte centré à cheval, 1 seul CTA.
 */
export function HeroSplitProduit() {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden">
      <div className="grid grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <img
            src="/images/bijoux-officiels/josephine.jpg"
            alt="Bague Joséphine, macro produit"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden">
          <img
            src="/images/bijou-lifestyle-blazer.jpg"
            alt="Bijou Précieuse, ambiance veste"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-ink/20 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-cream px-6">
        <span className="font-script text-[clamp(20px,2.5vw,28px)] text-cream/95 block mb-4">
          Lisboa, MMXXVI
        </span>
        <h1 className="font-headline text-[clamp(52px,8vw,108px)] leading-[0.92] mb-3">
          Précieuse.
        </h1>
        <p className="font-display italic text-[clamp(15px,1.6vw,18px)] text-cream/90 max-w-[440px] mb-10 leading-relaxed">
          Bagues façonnées à la main, en or 18 carats et pierres choisies.
        </p>
        <a
          href="/collection"
          className="inline-block font-display text-[12px] tracking-[0.35em] uppercase border border-cream/80 px-10 py-3.5 hover:bg-cream hover:text-ink transition-colors duration-300"
        >
          Voir la collection
        </a>
      </div>
    </section>
  )
}
