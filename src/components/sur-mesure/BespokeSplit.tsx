import { Reveal } from '../Reveal'
import { Eyebrow } from '../Eyebrow'
import type { BespokePageData } from '../../lib/content/bespoke'

/**
 * Split « du croquis à la promesse » — copy à gauche (eyebrow, titre accentué,
 * paragraphe, lien vers la frise), photo d'esquisses à droite. Mobile : copy
 * puis photo. Contenu piloté par Sanity.
 */
export function BespokeSplit({ split }: { split: BespokePageData['split'] }) {
  return (
    <section className="grid grid-cols-1 items-center gap-[clamp(36px,6vw,80px)] px-8 pb-16 pt-6 md:grid-cols-2 lg:px-14 max-md:pb-[74px]">
      <Reveal>
        <div>
          <Eyebrow className="mb-4 block">{split.eyebrow}</Eyebrow>
          <h2 className="max-w-[14ch] font-display text-[clamp(28px,3.6vw,46px)] font-normal leading-[1.06]">
            {split.titleLead}{' '}
            <i className="text-framboise">{split.titleAccent}</i>{' '}
            {split.titleTail}
          </h2>
          <p className="my-[22px] mb-[26px] max-w-[44ch] font-body text-[17px] font-light leading-[1.7] text-canard">
            {split.body}
          </p>
          <a
            href="#process"
            className="group inline-flex items-center gap-[7px] border-b border-framboise pb-[3px] font-display text-[14px] tracking-[0.04em] text-canard transition-colors duration-300 hover:text-framboise focus-visible:[outline:2px_solid_var(--framboise)] focus-visible:[outline-offset:3px]"
          >
            {split.link}
            <span className="transition-transform duration-300 group-hover:translate-x-[5px]">›</span>
          </a>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="overflow-hidden border border-canard/15 aspect-[4/5]">
          <img
            className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
            src={split.image.src}
            alt={split.image.alt}
            style={split.image.position ? { objectPosition: split.image.position } : undefined}
            loading="lazy"
          />
        </div>
      </Reveal>
    </section>
  )
}
