import { METAMORPHOSE, type MetamorphoseStep } from '../../lib/content/sur-mesure'
import { Reveal } from '../Reveal'
import { m } from '#/paraglide/messages'
import { objectPositionStyle } from '../framing/framing'

export function Metamorphose({ steps = METAMORPHOSE }: { steps?: MetamorphoseStep[] }) {
  return (
    <section className="relative bg-poudre py-24 lg:py-32 px-8 lg:px-16">
      <div className="absolute top-0 left-0 right-0 border-t-2 border-double border-canard/15" />

      <div className="mx-auto max-w-[1320px] mb-20">
        <span className="font-display text-[12px] tracking-[0.35em] text-canard block mb-3">
          {m.metamorphose_eyebrow()}
        </span>
        <h2 className="font-headline text-[clamp(36px,5vw,56px)] text-canard leading-[0.95]">
          {m.metamorphose_title()}
        </h2>
      </div>

      <div className="mx-auto max-w-[1320px] flex flex-col gap-28 lg:gap-36">
        {steps.map((step, idx) => {
          const imageFirst = idx % 2 === 0
          return (
            <Reveal key={step.roman} delay={80}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
                  !imageFirst ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden lg:[direction:ltr]">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    style={objectPositionStyle(step.imagePosition)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 font-display text-[80px] lg:text-[120px] leading-none text-poudre/20 select-none">
                    {step.roman}
                  </div>
                </div>

                {/* Text */}
                <div className="lg:[direction:ltr]">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block w-10 h-px bg-canard" />
                    <span className="font-display text-[12px] tracking-[0.35em] text-canard">
                      {m.metamorphose_step_label({ roman: step.roman })}
                    </span>
                  </div>

                  <h3 className="font-headline text-[clamp(32px,4vw,48px)] text-canard leading-[0.98] mb-4">
                    {step.title}.
                  </h3>

                  <p className="font-body italic font-light text-[20px] text-canard-90 leading-relaxed mb-6">
                    {step.annotation}
                  </p>

                  <p className="font-display text-[16px] text-canard/70 leading-loose max-w-[460px]">
                    {step.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
