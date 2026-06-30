import { m } from '#/paraglide/messages'
import { Reveal } from '../Reveal'
import { Eyebrow } from '../Eyebrow'

/**
 * Split « du croquis à la promesse » — copy à gauche (eyebrow, titre accentué,
 * paragraphe, lien vers la frise), photo d'esquisses à droite. Mobile : copy
 * puis photo.
 */
export function BespokeSplit() {
  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-[clamp(36px,6vw,80px)] px-[8vw] pb-16 pt-6 md:grid-cols-2 max-md:pb-[74px]">
      <Reveal>
        <div className="max-md:order-1">
          <Eyebrow className="mb-4 block">{m.sm_split_eyebrow()}</Eyebrow>
          <h2 className="max-w-[14ch] font-display text-[clamp(28px,3.6vw,46px)] font-normal leading-[1.06]">
            {m.sm_split_title_lead()}{' '}
            <i className="text-framboise">{m.sm_split_title_accent()}</i>{' '}
            {m.sm_split_title_tail()}
          </h2>
          <p className="my-[22px] mb-[26px] max-w-[44ch] font-body text-[17px] font-light leading-[1.7] text-canard">
            {m.sm_split_body()}
          </p>
          <a
            href="#process"
            className="group inline-flex items-center gap-[7px] border-b border-framboise pb-[3px] font-display text-[14px] tracking-[0.04em] text-canard transition-colors duration-300 hover:text-framboise"
          >
            {m.sm_split_link()}
            <span className="transition-transform duration-300 group-hover:translate-x-[5px]">›</span>
          </a>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="overflow-hidden border border-canard/15 aspect-[4/5] max-md:order-2">
          <img
            className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
            src="/images/atelier/esquisses-amethyste.jpg"
            alt={m.sm_split_img_alt()}
            loading="lazy"
          />
        </div>
      </Reveal>
    </section>
  )
}
