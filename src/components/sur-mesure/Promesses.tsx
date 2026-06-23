import { PROMESSES } from '../../lib/content/sur-mesure'
import { m } from '#/paraglide/messages'

export function Promesses({ promesses = PROMESSES }: { promesses?: typeof PROMESSES }) {
  return (
    <section className="relative bg-poudre py-20 lg:py-28 px-8 lg:px-16">
      <div className="absolute top-0 left-0 right-0 border-t border-canard/25" />

      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span className="font-display text-[12px] tracking-[0.35em] text-canard block mb-3">
              {m.promesses_eyebrow()}
            </span>
            <h2 className="font-headline text-[clamp(32px,4vw,48px)] text-canard leading-[0.95]">
              {m.promesses_title()}
            </h2>
          </div>
          <span className="font-body italic font-light text-[13px] text-canard-90/40 hidden md:block">
            {m.promesses_aside()}
          </span>
        </div>

        <div className="divide-y divide-canard/15">
          {promesses.map((p, i) => (
            <div
              key={p.titre}
              className="grid grid-cols-[48px_1fr] sm:grid-cols-[64px_200px_1fr] gap-x-6 lg:gap-x-10 py-7 lg:py-9 items-baseline"
            >
              <span className="font-display text-[36px] lg:text-[44px] text-rouille/50 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[22px] lg:text-[26px] text-canard leading-none">
                {p.titre}
              </h3>
              <p className="font-body font-light text-[15px] text-canard/65 leading-relaxed col-start-2 sm:col-start-3">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
