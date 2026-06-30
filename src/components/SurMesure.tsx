import { m } from '#/paraglide/messages'
import { BESPOKE_STEP_SVGS, bespokePageFallback } from '../lib/content/bespoke'
import type { BespokeStepData } from '../lib/content/bespoke'

/**
 * Bloc Sur-mesure de la LP — aguiche : en-tête éditorial (titre, intro,
 * tagline), frise des 4 étapes illustrées (mêmes pictos + contenu que la page
 * `/sur-mesure`, source unique `surMesurePage`), puis CTA vers la page
 * complète. Le manifeste « Je ne vends pas des bijoux… » reste réservé à
 * `/sur-mesure` ; ici on garde un format court qui appelle au clic.
 */
export function SurMesure({
  steps = bespokePageFallback().steps,
  header,
}: {
  steps?: BespokeStepData[]
  header: { title: string; intro: string; tagline: string; meta: string }
}) {
  return (
    <section className="relative bg-poudre pt-10 lg:pt-14 pb-6 lg:pb-7 px-6 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[720px] mx-auto text-center mb-10">
          <h2 className="font-headline text-[clamp(32px,4.5vw,56px)] text-canard leading-[1] mb-2">
            {header.title}
          </h2>
          <div className="w-12 h-[2px] bg-lie-de-vin mx-auto mb-6" />
          <p className="font-display text-[16px] lg:text-[18px] text-canard/75 leading-relaxed">
            {header.intro}
          </p>
          <p className="font-body italic font-light text-[20px] text-canard-90 mt-4">
            {header.tagline}
          </p>
        </div>

        <div className="relative mx-auto grid max-w-[1080px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {/* Filet horizontal reliant les étapes (masqué sous chaque picto). */}
          <span className="absolute inset-x-[12%] top-[50px] z-0 h-px bg-framboise/30 hidden lg:block" />
          {steps.map((step, i) => (
            <div key={i} className="relative z-[1] text-center">
              <span className="mx-auto mb-4 flex h-[100px] items-end justify-center bg-poudre px-[18px]">
                <img
                  src={BESPOKE_STEP_SVGS[i] ?? ''}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="block h-[88px] w-auto"
                />
              </span>
              <span className="mb-2 block font-display text-[11px] uppercase tracking-[0.28em] text-framboise">
                {m.sm_step_label()} {i + 1}
              </span>
              <h3 className="font-display text-[20px] text-canard leading-[1.1]">
                {step.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <a
            href="/sur-mesure"
            className="inline-block bg-canard text-poudre font-display text-[12px] tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-canard-90 transition-colors duration-300"
          >
            {m.surmesure_cta()}
          </a>
          <span className="font-display text-[13px] text-canard/55">
            {header.meta}
          </span>
        </div>
      </div>
    </section>
  )
}
