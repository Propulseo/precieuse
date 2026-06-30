import { m } from '#/paraglide/messages'
import { Reveal } from '../Reveal'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import { BESPOKE_STEPS, bespokeMessage } from '../../lib/content/bespoke'

/**
 * Le procédé — frise de 4 étapes reliées par un filet framboise (masqué sous
 * chaque icône), puis manifeste centré + ornement (picto entre deux filets).
 * Replis 2x2 puis 1 colonne (filet masqué).
 */
export function BespokeProcess() {
  return (
    <section id="process" className="bg-poudre-dark px-[8vw] pb-16 pt-[60px]">
      <Reveal>
        <div className="relative mx-auto grid max-w-[1080px] grid-cols-4 gap-[30px] max-[768px]:grid-cols-2 max-[768px]:gap-x-[26px] max-[768px]:gap-y-[42px] max-[460px]:grid-cols-1">
          {/* Filet horizontal reliant les étapes */}
          <span className="absolute inset-x-[12%] top-[50px] z-0 h-px bg-framboise/30 max-[768px]:hidden" />
          {BESPOKE_STEPS.map((step, i) => (
            <div key={step.svg} className="relative z-[1] text-center">
              <span className="mx-auto mb-4 flex h-[100px] items-end justify-center bg-poudre-dark px-[18px]">
                <img src={step.svg} alt="" aria-hidden="true" className="block h-[88px] w-auto" />
              </span>
              <span className="mb-2 block font-display text-[11px] uppercase tracking-[0.28em] text-framboise">
                {m.sm_step_label()} {i + 1}
              </span>
              <h3 className="mb-[10px] font-display text-[20px] font-medium leading-[1.1]">
                {bespokeMessage(step.titleKey)}
              </h3>
              <p className="mx-auto max-w-[25ch] font-body text-[14px] font-light leading-[1.6] text-canard">
                {bespokeMessage(step.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mx-auto mt-[54px] max-w-[780px] text-center">
          <h2 className="mx-auto max-w-[22ch] font-display text-[clamp(26px,3.4vw,46px)] font-normal leading-[1.16]">
            {m.sm_manifeste_lead()}{' '}
            <i className="text-framboise">{m.sm_manifeste_accent()}</i>
          </h2>
          <div className="mt-[46px] flex items-center justify-center gap-[22px]">
            <span className="h-px w-[88px] bg-framboise/55" />
            <span className="h-[42px] w-[42px]" style={maskStyle(BRAND_PICTO_MASK)} />
            <span className="h-px w-[88px] bg-framboise/55" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
