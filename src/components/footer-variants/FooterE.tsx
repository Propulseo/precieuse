import { FOOTER_DATA } from '../../lib/content/footer'

export function FooterE() {
  return (
    <footer className="bg-cream border-t border-ink/15 px-6 lg:px-16 py-8">
      <div className="mx-auto max-w-[1240px]">
        {/* 4 colonnes fines avec séparateurs verticaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-ink/10">
          <div className="md:px-6 md:first:pl-0">
            <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/40 block mb-3">
              Maison
            </span>
            <img src={FOOTER_DATA.logoSrc} alt="Précieuse" className="h-6 w-auto opacity-90" />
            <p className="mt-2 font-display italic text-[12px] text-ink/65">{FOOTER_DATA.signature}</p>
          </div>

          <div className="md:px-6">
            <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/40 block mb-3">
              Naviguer
            </span>
            <nav className="flex flex-col gap-1.5">
              {FOOTER_DATA.nav.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-display italic text-[13px] text-ink/80 hover:text-raspberry transition-colors w-fit"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:px-6">
            <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/40 block mb-3">
              Contact
            </span>
            <a
              href={`mailto:${FOOTER_DATA.email}`}
              className="font-display italic text-[13px] text-ink hover:text-raspberry transition-colors break-all"
            >
              {FOOTER_DATA.email}
            </a>
          </div>

          <div className="md:px-6">
            <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/40 block mb-3">
              Suivre
            </span>
            <div className="flex flex-col gap-1.5">
              {FOOTER_DATA.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display italic text-[13px] text-ink/80 hover:text-raspberry transition-colors w-fit"
                >
                  {s.handle}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 pt-4 border-t border-ink/10 flex items-center justify-between gap-x-6 gap-y-2 flex-wrap font-display italic text-[11px] text-ink/50">
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
