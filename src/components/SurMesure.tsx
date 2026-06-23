import { BESPOKE_PROCESS } from '../lib/content/site'

export function SurMesure() {
  return (
    <section className="relative bg-poudre py-20 lg:py-28 px-6 lg:px-16">
      <div className="absolute top-0 left-0 right-0 border-t border-canard/15" />

      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[720px] mx-auto text-center mb-16">
          <span className="font-display text-[12px] tracking-[0.35em] text-canard-90 block mb-4">
            CRÉATION SUR-MESURE
          </span>
          <h2 className="font-headline text-[clamp(32px,4.5vw,56px)] text-canard leading-[1] mb-2">
            Votre histoire, notre savoir-faire.
          </h2>
          <div className="w-12 h-[2px] bg-lie-de-vin mx-auto mb-6" />
          <p className="font-display text-[16px] lg:text-[18px] text-canard/75 leading-relaxed">
            Tout commence par une envie, un moment à marquer, une idée à traduire.
            Vous me parlez de vous, je vous propose une esquisse. Ensemble, on affine
            les lignes, on choisit les pierres, les volumes. Puis vient le temps de la
            fabrication, en or 18 carats, à la main, dans mon atelier à Bordeaux.
          </p>
          <p className="font-body italic font-light text-[20px] text-canard-90 mt-4">
            Ce qui naît, c'est bien plus qu'un bijou : c'est un lien.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {BESPOKE_PROCESS.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <span className="font-display text-[36px] text-rouille/70 leading-none mb-3">
                {step.number}
              </span>
              <h3 className="font-display text-[18px] text-canard mb-2">
                {step.title}
              </h3>
              <p className="font-body text-[13px] font-light text-canard/70 leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <a
            href="/sur-mesure"
            className="inline-block bg-canard text-poudre font-display text-[12px] tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-canard transition-colors duration-300"
          >
            Démarrer votre création
          </a>
          <span className="font-display text-[13px] text-canard/55">
            Sur devis · Délai 8 semaines · Remise sécurisée
          </span>
        </div>
      </div>
    </section>
  )
}
