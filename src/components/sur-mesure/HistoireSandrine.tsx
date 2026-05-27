export function HistoireSandrine() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-20 lg:py-28">
      <img
        src="/images/atelier/dessin-aquarelle.jpg"
        alt="Dessin aquarelle original, bague sur-mesure de Sandrine"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.35) saturate(1.1)' }}
      />
      <div aria-hidden className="absolute inset-0 bg-canard/50" />

      <div className="relative z-10 text-center max-w-[700px]">
        <span className="font-technical text-poudre/50 block mb-8">
          Cas réel · Février 2025
        </span>

        <span
          aria-hidden
          className="font-display text-[100px] lg:text-[140px] text-poudre/10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none select-none"
        >
          «
        </span>

        <blockquote>
          <p className="font-body italic font-light text-[clamp(24px,3vw,36px)] text-poudre leading-relaxed">
            Ce modèle ou rien ! J'ai confié mon or et mes diamants hérités.
            Le résultat, c'est exactement la bague que je portais en tête.
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col items-center gap-1">
          <span className="font-display text-[16px] text-poudre">Sandrine M.</span>
          <span className="font-display text-[13px] text-poudre/50 tracking-wide">
            serpentine or blanc · pavage diamants GVS
          </span>
          <span className="font-display text-[12px] text-poudre/35 tracking-wide mt-0.5">
            Paris · 2025
          </span>
        </div>
      </div>
    </section>
  )
}
