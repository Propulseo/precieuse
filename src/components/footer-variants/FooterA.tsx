import { FOOTER_DATA } from '../../lib/content/footer'

export function FooterA() {
  return (
    <footer className="bg-cream border-t border-ink/15 px-6 lg:px-16 py-6">
      <div className="mx-auto max-w-[1240px]">
        {/* Ligne 1 : logo, nav, RS */}
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <img src={FOOTER_DATA.logoSrc} alt="Précieuse" className="h-7 w-auto opacity-90" />

          <nav className="flex items-center gap-x-6 gap-y-1 flex-wrap" aria-label="Navigation principale">
            {FOOTER_DATA.nav.map((l) => (
              <a key={l.label} href={l.href} className="font-display italic text-[13px] text-ink/75 hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {FOOTER_DATA.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-display italic text-[13px] text-ink/75 hover:text-raspberry transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Ligne 2 : légal + copyright + crédit */}
        <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between gap-x-6 gap-y-2 flex-wrap font-display italic text-[11px] text-ink/50">
          <span>{FOOTER_DATA.copyright}</span>
          <nav className="flex gap-4" aria-label="Liens légaux">
            {FOOTER_DATA.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={FOOTER_DATA.credit.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-raspberry transition-colors"
          >
            {FOOTER_DATA.credit.label}
          </a>
        </div>
      </div>
    </footer>
  )
}
