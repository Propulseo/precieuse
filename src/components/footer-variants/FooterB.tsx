import { FOOTER_DATA } from '../../lib/content/footer'

export function FooterB() {
  return (
    <footer className="bg-cream border-t border-ink/15 px-6 lg:px-16 py-8">
      <div className="mx-auto max-w-[1240px]">
        {/* Ligne 1 : logo à gauche, nav à droite */}
        <div className="flex items-center justify-between gap-6 flex-wrap pb-6 border-b border-ink/10">
          <img src={FOOTER_DATA.logoSrc} alt="Précieuse" className="h-8 w-auto opacity-90" />
          <nav className="flex items-center gap-x-7 gap-y-2 flex-wrap" aria-label="Navigation principale">
            {FOOTER_DATA.nav.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-display italic text-[14px] text-ink hover:text-raspberry transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Ligne 2 : légal · RS · crédit */}
        <div className="pt-5 flex items-center justify-between gap-x-6 gap-y-2 flex-wrap font-display italic text-[12px] text-ink/55">
          <nav className="flex gap-4" aria-label="Liens légaux">
            {FOOTER_DATA.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-ink transition-colors">
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
                className="hover:text-raspberry transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <span className="flex items-center gap-2">
            <span>{FOOTER_DATA.copyright}</span>
            <span className="text-ink/25">·</span>
            <a
              href={FOOTER_DATA.credit.href}
              target="_blank"
              rel="noreferrer"
              className="text-ink/70 hover:text-raspberry transition-colors"
            >
              {FOOTER_DATA.credit.label}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
