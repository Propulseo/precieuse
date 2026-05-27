export function LeadCaptureC() {
  return (
    <section className="relative bg-cream border-t border-b border-ink/15 py-24 lg:py-32 px-6 overflow-hidden">
      {/* Filets décoratifs latéraux */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block h-32 w-px bg-gold/30" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block h-32 w-px bg-gold/30" />

      <div className="mx-auto max-w-[820px] text-center">
        <span className="font-display italic text-[11px] tracking-[0.4em] uppercase text-gold block mb-6">
          Les mains qui les portent
        </span>

        <h2 className="font-headline text-[clamp(38px,5.5vw,72px)] text-ink leading-[0.95] mb-5">
          Voir nos bagues portées.
        </h2>

        <p className="font-display italic text-[17px] text-ink/70 leading-relaxed mb-12 max-w-[520px] mx-auto">
          Une sélection de photos prises par nos clientes. Saisons, lumières, gestes. Recevez-la dans votre boîte.
        </p>

        <form
          className="flex items-stretch border-b-2 border-ink/40 focus-within:border-raspberry transition-colors max-w-[560px] mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            name="email"
            placeholder="votre.email@exemple.fr"
            required
            aria-label="Votre adresse email"
            className="flex-1 bg-transparent py-4 font-display italic text-[18px] text-ink placeholder:text-ink/35 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Recevoir la sélection"
            className="pl-5 pr-2 text-ink hover:text-raspberry transition-colors"
          >
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden>
              <path
                d="M2 10 H28 M22 4 L28 10 L22 16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        <p className="font-display italic text-[12px] text-ink/45 mt-6">
          Pas de spam. Désinscription en un clic.
        </p>
      </div>
    </section>
  )
}
