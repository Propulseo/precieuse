import { FOOTER_DATA } from '../../lib/content/footer'

export function FooterC() {
  return (
    <footer className="bg-cream border-t border-ink/15 px-6 lg:px-16 py-12">
      <div className="mx-auto max-w-[1240px] flex flex-col items-center text-center gap-7">
        <img src={FOOTER_DATA.logoSrc} alt="Précieuse" className="h-10 w-auto opacity-90" />

        <nav className="flex items-center gap-x-7 gap-y-2 flex-wrap justify-center" aria-label="Navigation principale">
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

        <div className="flex items-center gap-5">
          {FOOTER_DATA.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-display italic text-[12px] tracking-[0.3em] uppercase text-ink/60 hover:text-ink transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="w-full max-w-[680px] pt-5 border-t border-ink/10 flex items-center justify-between gap-x-6 gap-y-2 flex-wrap font-display italic text-[11px] text-ink/50">
          <nav className="flex gap-4" aria-label="Liens légaux">
            {FOOTER_DATA.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <span>{FOOTER_DATA.copyright}</span>
        </div>

        <a
          href={FOOTER_DATA.credit.href}
          target="_blank"
          rel="noreferrer"
          className="font-display italic text-[11px] text-ink/40 hover:text-raspberry transition-colors"
        >
          {FOOTER_DATA.credit.label}
        </a>
      </div>
    </footer>
  )
}
