import { m } from '#/paraglide/messages'
import { FOOTER_DATA } from '../lib/content/footer'
import type { FooterContent } from '../lib/content/footer'
import { BRAND_PICTO_MASK, maskStyle } from './brand/brand'

// Logo poudre (picto + nom) — PNG fixe, lisible sur le fond canard.
const BRAND_LOGO =
  '/images/Photo%20Precieus/Precieuse_logo-picto-shape_RVB_poudre_300dpi.png'

/**
 * Footer « Bandeau » — bloc canard plein de clôture (le moment sombre de fin),
 * données en pleine largeur (Marque · Naviguer · Écrire · Suivre) + fleur de la
 * marque en filigrane à droite. Le fond suit l'accent (--brand-accent → bg-canard) ;
 * le logo poudre reste fixe. `footer` (Sanity, repli i18n) pilote réseaux/email +
 * signature/réponse/copyright/cachet d'atelier ; libellés de nav/légaux, crédit
 * agence et aria-labels restent structurels via Paraglide (FR/EN/PT).
 */
export function Footer({ footer }: { footer: FooterContent }) {
  const navLinks = [
    { label: m.footer_nav_collection(), href: '/collection' },
    { label: m.footer_nav_journal(), href: '/carnet' },
    { label: m.footer_nav_atelier(), href: '/creatrice' },
    { label: m.footer_nav_bespoke(), href: '/sur-mesure' },
  ]
  const legalLinks = [
    { label: m.footer_legal_mentions(), href: '/mentions-legales' },
    { label: m.footer_legal_privacy(), href: '/confidentialite' },
    { label: m.footer_legal_terms(), href: '/cgv' },
  ]
  const social = footer.social
  const email = footer.email

  const eyebrow =
    'font-display text-[11px] tracking-[0.32em] uppercase text-poudre/85 mb-4'
  const link =
    'font-display text-[15px] text-poudre/90 hover:text-poudre transition-colors duration-300 w-fit'

  return (
    <footer className="relative overflow-hidden bg-canard text-poudre">
      {/* Fleur de la marque en filigrane (droite) */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-30px] -translate-y-1/2 -scale-x-100 h-[196px] w-[196px] opacity-[0.09]"
        style={maskStyle(BRAND_PICTO_MASK, 'var(--poudre)')}
      />

      <div className="relative z-[1] px-5 lg:px-[5vw] pt-5 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-8">
          {/* Marque */}
          <div className="flex items-center gap-6 max-w-[520px]">
            <img
              src={BRAND_LOGO}
              alt={m.footer_brand_aria()}
              loading="lazy"
              decoding="async"
              className="h-[94px] sm:h-[124px] w-auto shrink-0"
            />
            <div>
              <p className="font-display text-[13px] leading-[1.45] text-poudre/70 max-w-[26ch]">
                {footer.signature}
              </p>
              <span className="mt-4 block whitespace-pre-line border-l border-poudre/35 pl-4 font-display font-semibold text-[14px] tracking-[0.24em] uppercase leading-[1.62] text-poudre/80">
                {footer.atelierStamp}
              </span>
            </div>
          </div>

          {/* Naviguer */}
          <div>
            <p className={eyebrow}>{m.footer_navigate()}</p>
            <nav className="flex flex-col gap-2.5" aria-label={m.footer_nav_aria()}>
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className={link}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Écrire */}
          <div>
            <p className={eyebrow}>{m.footer_write()}</p>
            <a href={`mailto:${email}`} className={`${link} break-all`}>
              {email}
            </a>
            <p className="mt-2 font-display text-[13px] leading-[1.45] text-poudre/55 max-w-[22ch]">
              {footer.responseLine1}
              <br />
              {footer.responseLine2}
            </p>
          </div>

          {/* Suivre */}
          <div>
            <p className={eyebrow}>{m.footer_follow()}</p>
            <div className="flex flex-col gap-2.5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barre légale : © à gauche · crédit au milieu · liens à droite */}
        <div className="mt-5 border-t border-poudre/15 pt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-display text-[12px] text-poudre/55">
          <span>{footer.copyright}</span>
          <a
            href={FOOTER_DATA.credit.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-poudre transition-colors duration-300"
          >
            {m.footer_credit()}
          </a>
          <nav className="flex items-center gap-4 flex-wrap" aria-label={m.footer_legal_aria()}>
            {legalLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-poudre transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
