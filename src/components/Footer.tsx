import { FOOTER_DATA } from '../lib/content/footer'
import { useBrand } from './brand/BrandProvider'
import { logoForBrand } from './brand/brand'

export function Footer() {
  const { brand } = useBrand()
  return (
    <footer className="bg-poudre-dark">
      {/* --- Grille principale --- */}
      <div className="border-t border-canard/15 px-4 lg:px-8 pt-12 lg:pt-14 pb-8">
        <div className="mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Atelier */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-4">
            <img
              src={logoForBrand(brand)}
              alt="Précieuse, Joaillerie artisanale, Bordeaux"
              className="h-10 w-auto opacity-90"
            />
            <span className="font-display text-[14px] text-canard/75 leading-relaxed">
              {FOOTER_DATA.signature}
            </span>

          </div>

          {/* Naviguer */}
          <div>
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-lie-de-vin block mb-4">
              Naviguer
            </span>
            <nav className="flex flex-col gap-2.5" aria-label="Navigation principale">
              {FOOTER_DATA.nav.map((l) => (
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
              Suivre
            </span>
            <div className="flex flex-col gap-3">
              {FOOTER_DATA.social.map((s) => (
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
              Écrire
            </span>
            <a
              href={`mailto:${FOOTER_DATA.email}`}
              className="font-display text-[15px] text-canard/90 hover:text-canard-90 transition-colors duration-300 break-all"
            >
              {FOOTER_DATA.email}
            </a>
            <p className="mt-3 font-display text-[13px] text-canard/60 leading-relaxed max-w-[200px]">
              Réponse sous 48 h,
              <br />
              du lundi au vendredi.
            </p>
          </div>
        </div>
      </div>

      {/* --- Barre legale --- */}
      <div className="border-t border-canard/10 px-4 lg:px-8 py-5">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-x-6 gap-y-3 flex-wrap font-display text-[12px] text-canard/60">
          <nav className="flex items-center gap-4" aria-label="Liens légaux">
            {FOOTER_DATA.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-canard transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </nav>
          <span>{FOOTER_DATA.copyright}</span>
          <a
            href={FOOTER_DATA.credit.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-canard-90 transition-colors duration-300"
          >
            {FOOTER_DATA.credit.label}
          </a>
        </div>
      </div>
    </footer>
  )
}
