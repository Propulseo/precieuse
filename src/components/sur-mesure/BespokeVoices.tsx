import { Reveal } from '../Reveal'
import type { BespokePageData } from '../../lib/content/bespoke'

/**
 * Témoignages — voix en cartes poudre sur fond poudre-dark, médaillon initiale +
 * attribution (prénom + ville). Contenu piloté par Sanity.
 */
export function BespokeVoices({
  voices,
}: {
  voices: BespokePageData['voices']
}) {
  return (
    <section className="bg-poudre-dark px-8 pb-16 pt-[60px] lg:px-14">
      <div className="mb-[54px] text-center">
        <h2 className="font-display text-[clamp(26px,3.3vw,42px)] font-normal leading-[1.1]">
          {voices.title}
        </h2>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-[26px] min-[881px]:grid-cols-3 max-[880px]:max-w-[520px]">
        {voices.items.map((voice) => (
          <Reveal key={voice.name}>
            <article className="flex h-full flex-col border border-canard/15 bg-poudre px-[34px] py-10">
              <p className="font-display text-[19px] italic leading-[1.55] text-canard">
                {voice.quote}
              </p>
              <div className="mt-auto flex items-center gap-[14px] pt-[26px]">
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-canard font-display text-[16px] text-poudre">
                  {voice.initial}
                </span>
                <span>
                  <span className="block font-display text-[14px] tracking-[0.04em] text-canard">
                    {voice.name}
                  </span>
                  <span className="mt-[2px] block font-display text-[11px] uppercase tracking-[0.2em] text-canard">
                    {voice.city}
                  </span>
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
