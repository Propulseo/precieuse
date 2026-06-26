import { m } from '#/paraglide/messages'
import { FOOTER_DATA } from '../lib/content/footer'
import type { FooterCms } from '../lib/cms'
import { BRAND_LOCKUP_MASK, maskStyle } from './brand/brand'

/**
 * `footer` vient de Sanity (getFooter) quand le document existe — Emeline pilote
 * alors liens, réseaux, email, signature, copyright. Sinon `null` => repli sur
 * les libellés Paraglide (traduits FR/EN/PT). Le crédit agence (Propul'SEO) reste
 * volontairement figé (Paraglide), non éditable par Emeline.
 */
export function Footer({ footer }: { footer: FooterCms | null }) {
  // Libellés structurels traduits par Paraglide (FR/EN/PT) — non éditables par Emeline.
  const navLinks = [
    { label: m.footer_nav_collection(), href: '/collection' },
    { label: m.footer_nav_journal(), href: '/carnet' },
    { label: m.footer_nav_atelier(), href: '/creatrice' },
    { label: m.footer_nav_bespoke(), href: '/sur-mesure' },
    { label: m.footer_nav_contact(), href: '/contact' },
  ]
  const legalLinks = [
    { label: m.footer_legal_mentions(), href: '/mentions-legales' },
    { label: m.footer_legal_privacy(), href: '/confidentialite' },
    { label: m.footer_legal_terms(), href: '/cgv' },
  ]
  // Réseaux sociaux + email : pilotés par Emeline via Sanity (repli statique).
  const social = footer?.social.length ? footer.social : FOOTER_DATA.social
  const email = footer?.email || FOOTER_DATA.email
  const signature = m.footer_signature()
  const copyright = m.footer_copyright()

  return (
    <footer className="bg-poudre-dark">
      {/* --- Grille principale --- */}
      <div className="border-t border-canard/15 px-4 lg:px-8 pt-12 lg:pt-14 pb-8">
        <div className="mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Atelier */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-4">
            {/* Lockup recoloré via masque CSS : suit --brand-accent (toggle). */}
            <span
              role="img"
              aria-label={m.footer_brand_aria()}
              className="block h-10 w-auto opacity-90"
              style={{
                aspectRatio: '8284 / 2955',
                ...maskStyle(BRAND_LOCKUP_MASK),
              }}
            />
            <span className="font-display text-[14px] text-canard/75 leading-relaxed">
              {signature}
            </span>

          </div>

          {/* Naviguer */}
          <div>
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-lie-de-vin block mb-4">
              {m.footer_navigate()}
            </span>
            <nav className="flex flex-col gap-2.5" aria-label={m.footer_nav_aria()}>
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-display text-[15px] text-canard/90 hover:text-canard-90 transition-colors duration-300 w-fit"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Suivre */}
          <div>
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-lie-de-vin block mb-4">
              {m.footer_follow()}
            </span>
            <div className="flex flex-col gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col w-fit"
                >
                  <span className="font-display text-[14px] text-canard/70 group-hover:text-canard-90 transition-colors duration-300">
                    {s.label}
                  </span>
                  <span className="font-display text-[12px] text-canard/55 group-hover:text-canard/75 transition-colors duration-300">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Écrire */}
          <div>
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-lie-de-vin block mb-4">
              {m.footer_write()}
            </span>
            <a
              href={`mailto:${email}`}
              className="font-display text-[15px] text-canard/90 hover:text-canard-90 transition-colors duration-300 break-all"
            >
              {email}
            </a>
            <p className="mt-3 font-display text-[13px] text-canard/60 leading-relaxed max-w-[200px]">
              {m.footer_response_line1()}
              <br />
              {m.footer_response_line2()}
            </p>
          </div>
        </div>
      </div>

      {/* --- Barre legale --- */}
      <div className="border-t border-canard/10 px-4 lg:px-8 py-5">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-x-6 gap-y-3 flex-wrap font-display text-[12px] text-canard/60">
          <nav className="flex items-center gap-4" aria-label={m.footer_legal_aria()}>
            {legalLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-canard transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </nav>
          <span>{copyright}</span>
          <a
            href={FOOTER_DATA.credit.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-canard-90 transition-colors duration-300"
          >
            {m.footer_credit()}
          </a>
        </div>
      </div>
    </footer>
  )
}
