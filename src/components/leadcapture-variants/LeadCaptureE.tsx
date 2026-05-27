export function LeadCaptureE() {
  return (
    <section className="relative bg-cream border-t border-b border-ink/15 py-24 lg:py-32 px-8">
      <div className="mx-auto max-w-[760px] text-center">
        <span className="font-display italic text-[12px] tracking-[0.4em] uppercase text-gold block mb-7">
          Carnet privé
        </span>

        <div className="relative inline-block mb-9">
          <h2 className="font-headline text-[clamp(34px,4.5vw,56px)] text-ink leading-[1.02]">
            Au-delà de l'atelier.
          </h2>
          <span aria-hidden className="absolute -right-7 -top-3 font-script text-[42px] text-raspberry/70 rotate-[8deg]">
            *
          </span>
        </div>

        <div className="space-y-5 font-display italic text-[17px] sm:text-[18px] text-ink/80 leading-[1.75] max-w-[640px] mx-auto mb-14">
          <p>
            Au-delà des photos d'atelier, ce sont les mains de nos clientes qui font vivre Précieuse.
          </p>
          <p>
            Saisons, voyages, gestes du quotidien : chaque bague raconte sa propre histoire, loin de
            nous, à l'endroit où elle est devenue précieuse.
          </p>
          <p>
            Si vous souhaitez recevoir une sélection de ces photos, laissez-nous votre adresse. Nous
            vous écrirons.
          </p>
        </div>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto items-stretch"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            name="email"
            placeholder="votre.email@exemple.fr"
            required
            aria-label="Votre adresse email"
            className="flex-1 bg-transparent border border-ink/30 px-5 py-3.5 font-display italic text-[16px] text-ink placeholder:text-ink/30 focus:outline-none focus:border-raspberry transition-colors"
          />
          <button
            type="submit"
            className="bg-ink text-cream font-display italic text-[15px] px-7 py-3.5 hover:bg-raspberry transition-colors"
          >
            Je m'inscris
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-4 text-ink/40">
          <span aria-hidden className="block w-12 h-px bg-ink/20" />
          <span className="font-script text-[18px] text-raspberry/70">É. R.</span>
          <span aria-hidden className="block w-12 h-px bg-ink/20" />
        </div>
      </div>
    </section>
  )
}
