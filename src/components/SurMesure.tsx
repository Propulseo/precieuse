import { m } from '#/paraglide/messages'
import { BESPOKE_PROCESS, type ProcessStep } from '../lib/content/site'

export function SurMesure({ process = BESPOKE_PROCESS }: { process?: ProcessStep[] }) {
  return (
    <section className="relative bg-poudre py-10 lg:py-14 px-6 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[720px] mx-auto text-center mb-8">
          <h2 className="font-headline text-[clamp(32px,4.5vw,56px)] text-canard leading-[1] mb-2">
            {m.surmesure_title()}
          </h2>
          <div className="w-12 h-[2px] bg-lie-de-vin mx-auto mb-6" />
          <p className="font-display text-[16px] lg:text-[18px] text-canard/75 leading-relaxed">
            {m.surmesure_intro_paragraph()}
          </p>
          <p className="font-body italic font-light text-[20px] text-canard-90 mt-4">
            {m.surmesure_intro_tagline()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {process.map((step) => (
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

        <div className="mt-7 flex flex-col items-center gap-4">
          <a
            href="/sur-mesure"
            className="inline-block bg-canard text-poudre font-display text-[12px] tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-canard-90 transition-colors duration-300"
          >
            {m.surmesure_cta()}
          </a>
          <span className="font-display text-[13px] text-canard/55">
            {m.surmesure_meta()}
          </span>
        </div>
      </div>
    </section>
  )
}
