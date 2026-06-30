import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import type { CreatriceImage, CreatriceRealisation } from '../../lib/cms'

/** Une prise (studio ou portée) avec son étiquette en surimpression. */
function Shot({ img, tag }: { img: CreatriceImage; tag: string }) {
  if (!img.url) {
    return <div className="relative aspect-[4/5] border border-canard/20 bg-poudre-dark/30" />
  }
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-canard/20">
      <img
        src={img.url}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: img.position }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute left-3 top-3 bg-canard/55 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.24em] text-poudre backdrop-blur-[2px]">
        {tag}
      </span>
    </div>
  )
}

/**
 * Galerie de réalisations en bas de la page Créatrice : chaque pièce en duo
 * « à l'atelier » + « portée », avec sa légende centrée. Charte poudre/canard,
 * accent framboise. Ne s'affiche que si Emeline a renseigné des réalisations.
 */
export function CreatriceRealisations({ realisations }: { realisations: CreatriceRealisation[] }) {
  if (!realisations.length) return null

  return (
    <section className="bg-poudre px-8 pb-24 pt-16 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 text-center">
          <span className="font-display text-[12px] uppercase tracking-[0.4em] text-framboise">
            {m.creatrice_real_eyebrow()}
          </span>
          <h2 className="mt-3 font-headline text-[clamp(28px,3.6vw,42px)] leading-[1.05] text-canard [text-wrap:balance]">
            {m.creatrice_real_title()}
          </h2>
          <p className="mx-auto mt-3.5 max-w-[48ch] font-display italic text-[16px] text-canard/60 [text-wrap:pretty]">
            {m.creatrice_real_intro()}
          </p>
        </div>

        <div className="space-y-6">
          {realisations.map((r, i) => (
            <article key={`${r.title}-${i}`} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Shot img={r.studio} tag={m.creatrice_real_tag_studio()} />
              <Shot img={r.worn} tag={m.creatrice_real_tag_worn()} />
              <div className="col-span-full flex items-center gap-[18px] text-canard/35">
                <span className="h-px flex-1 bg-current" />
                <span className="text-center">
                  <span className="block font-headline text-[24px] leading-none text-canard">
                    {r.title}
                  </span>
                  {r.material ? (
                    <span className="mt-1.5 block font-display text-[11px] uppercase tracking-[0.24em] text-canard/55">
                      {r.material}
                    </span>
                  ) : null}
                </span>
                <span className="h-px flex-1 bg-current" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/collection"
            className="inline-block border-b border-framboise pb-1.5 font-display text-[12px] uppercase tracking-[0.28em] text-canard transition-colors hover:text-framboise"
          >
            {m.creatrice_real_collection_link()} →
          </Link>
        </div>
      </div>
    </section>
  )
}
