import { Reveal } from '../Reveal'
import { Eyebrow } from '../Eyebrow'
import type { BespokeImg, BespokePageData } from '../../lib/content/bespoke'

/**
 * Réalisations — 3 duos « à l'atelier / portée », légende centrale (nom +
 * matière) entre deux filets. Contenu piloté par Sanity.
 */
export function BespokeRealisations({
  realisations,
}: {
  realisations: BespokePageData['realisations']
}) {
  return (
    <section className="px-8 pb-16 pt-[60px] lg:px-14">
      <div className="mb-[54px] text-center">
        <Eyebrow className="mb-[14px] block">{realisations.eyebrow}</Eyebrow>
        <h2 className="font-display text-[clamp(28px,3.6vw,44px)] font-normal leading-[1.06]">
          {realisations.title}
        </h2>
        <p className="mx-auto mt-[14px] max-w-[48ch] font-display text-[16px] italic text-canard/60">
          {realisations.intro}
        </p>
      </div>

      {realisations.pieces.map((piece) => (
        <Reveal key={piece.name}>
          <div className="mb-[26px] grid grid-cols-1 items-stretch gap-5 min-[681px]:grid-cols-2">
            <PieceShot img={piece.atelier} tag={realisations.tagAtelier} />
            <PieceShot img={piece.portee} tag={realisations.tagPortee} />
            <div className="col-span-full my-2 mb-[26px] flex items-center gap-[18px] text-canard/40">
              <span className="h-px flex-1 bg-current" />
              <span className="text-center">
                <h3 className="font-display text-[24px] font-medium leading-none text-canard">
                  {piece.name}
                </h3>
                <span className="mt-[6px] block font-display text-[11px] uppercase tracking-[0.24em] text-canard">
                  {piece.material}
                </span>
              </span>
              <span className="h-px flex-1 bg-current" />
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  )
}

function PieceShot({ img, tag }: { img: BespokeImg; tag: string }) {
  return (
    <div className="group relative overflow-hidden border border-canard/15 aspect-[4/5]">
      <span className="absolute left-3 top-3 z-[1] bg-canard-90/55 px-[10px] py-[5px] font-display text-[10px] uppercase tracking-[0.24em] text-poudre backdrop-blur-[2px]">
        {tag}
      </span>
      <img
        className="h-full w-full object-cover transition-transform duration-[0.85s] ease-out group-hover:scale-[1.03]"
        src={img.src}
        alt={img.alt}
        style={img.position ? { objectPosition: img.position } : undefined}
        loading="lazy"
      />
    </div>
  )
}
