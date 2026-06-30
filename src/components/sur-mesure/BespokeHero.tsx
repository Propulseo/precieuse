import { m } from '#/paraglide/messages'
import { useContactDrawer } from '../contact/ContactDrawerProvider'

/**
 * Héro Sur-mesure — split plein cadre : vidéo (atelier) à gauche, photo à
 * droite, voile canard, texte poudre centré. CTA ouvre le ContactDrawer global.
 * Vidéo masquée en `prefers-reduced-motion`. Mobile : vidéo pleine largeur.
 */
export function BespokeHero() {
  const { open: openContact } = useContactDrawer()
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Vidéo (moitié gauche) */}
        <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r border-poudre/15 bg-canard-90 max-[680px]:w-full max-[680px]:border-r-0">
          <video
            className="absolute inset-0 h-full w-full object-cover object-[center_42%] brightness-[0.8] saturate-[1.06] motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/real/bague-pierre-precieuse-perle.webp"
            aria-hidden="true"
          >
            <source src="/images/video/ring-box.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Photo (moitié droite) */}
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden max-[680px]:hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover object-[center_42%] brightness-[0.8] saturate-[1.06]"
            src="/images/real/bague-main-chaise-thelma.webp"
            alt={m.sm_hero_photo_alt()}
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Voile */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(13,71,71,0.5)_0%,rgba(13,71,71,0.2)_36%,rgba(13,71,71,0.2)_62%,rgba(13,71,71,0.56)_100%)]" />

      {/* Contenu */}
      <div className="relative z-[2] mx-auto w-full max-w-[640px] px-6 text-center text-poudre">
        <span className="mb-[22px] inline-block bg-poudre/[0.12] px-[14px] py-1.5 font-display text-[12px] uppercase tracking-[0.36em] text-poudre backdrop-blur-[2px] [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
          {m.sm_hero_kicker()}
        </span>
        <h1 className="mx-auto max-w-[18ch] font-display text-[clamp(42px,6.4vw,82px)] font-normal leading-[0.98] text-poudre [text-shadow:0_3px_20px_rgba(13,71,71,0.55)]">
          {m.sm_hero_title()}{' '}
          <i className="font-medium text-framboise [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
            {m.sm_hero_title_accent()}
          </i>
        </h1>
        <p className="mx-auto mb-8 mt-[22px] max-w-[40ch] font-display text-[clamp(16px,1.8vw,21px)] italic text-poudre/90 [text-shadow:0_2px_14px_rgba(13,71,71,0.55)]">
          {m.sm_hero_sub()}
        </p>
        <button
          type="button"
          onClick={openContact}
          className="inline-block rounded-full border border-poudre bg-poudre px-[30px] py-[15px] font-display text-[13px] font-medium uppercase tracking-[0.16em] text-canard transition-colors duration-300 hover:bg-transparent hover:text-poudre focus-visible:[outline:2px_solid_var(--framboise)] focus-visible:[outline-offset:3px]"
        >
          {m.sm_hero_cta()}
        </button>
      </div>
    </section>
  )
}
