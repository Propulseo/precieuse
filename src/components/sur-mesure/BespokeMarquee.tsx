/**
 * Bande défilante Sur-mesure — items de réassurance (pilotés par Sanity) séparés
 * par un losange framboise, boucle continue (piste dupliquée), pause au survol.
 * Keyframes en `<style>` scoped (on ne touche pas styles.css). Figée en
 * reduced-motion. Décorative : aria-hidden.
 */
export function BespokeMarquee({ items }: { items: string[] }) {
  const unit = [...items, ...items] // dupliqué pour une boucle sans couture

  return (
    <div
      className="sm-marquee overflow-hidden border-y border-canard/15 bg-poudre py-4"
      aria-hidden="true"
    >
      <style>{`
        @keyframes sm-scroll-x { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .sm-marquee-track { animation: sm-scroll-x 30s linear infinite; }
        .sm-marquee:hover .sm-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .sm-marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
        }
      `}</style>
      <div className="sm-marquee-track flex w-max">
        {unit.map((text, i) => (
          <span key={`${i}-${text}`} className="inline-flex items-center">
            <span className="whitespace-nowrap px-1 font-display text-[13px] uppercase tracking-[0.3em] text-canard">
              {text}
            </span>
            <span className="mx-[26px] inline-block h-[7px] w-[7px] shrink-0 rotate-45 bg-framboise" />
          </span>
        ))}
      </div>
    </div>
  )
}
