import { FOOTER_DATA } from '../../lib/content/footer'

export function FooterD() {
  return (
    <footer className="bg-cream border-t border-ink/15 px-6 lg:px-16 py-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Ligne 1 : logo+signature à gauche, nav+RS à droite */}
        <div className="flex items-start justify-between gap-8 flex-wrap pb-6 border-b border-ink/10">
          <div className="flex items-center gap-5">
            <img src={FOOTER_DATA.logoSrc} alt="Précieuse" className="h-9 w-auto opacity-90" />
            <span className="font-display italic text-[14px] text-raspberry hidden sm:block">
              {FOOTER_DATA.signature}
            </span>
          </div>

          <div className="flex flex-col items-end gap-3">
            <nav className="flex items-center gap-x-6 gap-y-1 flex-wrap justify-end" aria-label="Navigation principale">
              {FOOTER_DATA.nav.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-display italic text-[13px] text-ink hover:text-raspberry transition-colors"
                >
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
                  className="font-display italic text-[11px] tracking-[0.3em] uppercase text-ink/55 hover:text-ink transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne 2 : légal · copyright · crédit (pleine largeur) */}
        <div className="pt-5 flex items-center justify-between gap-x-6 gap-y-2 flex-wrap font-display italic text-[11px] text-ink/50">
          <nav className="flex gap-4" aria-label="Liens légaux">
            {FOOTER_DATA.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <span className="text-center flex-1 min-w-[200px]">{FOOTER_DATA.copyright}</span>
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
