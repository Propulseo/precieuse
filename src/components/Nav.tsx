import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { BRAND_LOCKUP_MASK } from './brand/brand'

const navLinks = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Collection', href: '/collection' },
  { label: 'Le Carnet', href: '/carnet' },
  { label: 'Contact', href: '/contact' },
]

const SCROLL_THRESHOLD = 60

/**
 * Sélecteur de langue (FR / EN / PT).
 * FR est actif ; EN & PT sont visibles mais marqués « à venir » tant que le
 * contenu n'est pas traduit (infra Paraglide encore en mode baseLocale).
 * À activer quand le contenu FR sera figé puis traduit.
 */
function LangControl({ isHomeTop }: { isHomeTop: boolean }) {
  const active = isHomeTop ? 'text-poudre' : 'text-canard'
  const muted = isHomeTop ? 'text-poudre/45' : 'text-canard/40'
  return (
    <div
      className="flex items-center gap-1.5 font-display text-[12px] tracking-[0.12em] select-none"
      aria-label="Langue : français (anglais et portugais à venir)"
    >
      <span className={active} aria-current="true">
        FR
      </span>
      <span className={muted} aria-hidden>
        ·
      </span>
      <span className={`${muted} cursor-default`} title="Version anglaise à venir">
        EN
      </span>
      <span className={muted} aria-hidden>
        ·
      </span>
      <span className={`${muted} cursor-default`} title="Versão portuguesa em breve">
        PT
      </span>
    </div>
  )
}

export function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /**
   * Mode "transparent" uniquement sur la home (qui a un hero plein écran),
   * et seulement quand on est tout en haut.
   * Sur les autres pages : toujours opaque.
   */
  const isHomeTop = pathname === '/' && !scrolled

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        isHomeTop
          ? 'bg-transparent border-b border-transparent'
          : 'bg-poudre/95 backdrop-blur-sm border-b border-canard/15'
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-3 lg:px-16">
        <Link
          to="/"
          aria-label="Précieuse, accueil"
          className="relative block transition-opacity hover:opacity-70"
        >
          {/* Lockup recoloré via masque CSS : suit --brand-accent (toggle),
              et passe en blanc par-dessus le hero plein écran (home, en haut). */}
          <span
            role="img"
            aria-label="Précieuse, Joaillerie artisanale, Bordeaux"
            className="block h-9 w-auto lg:h-10 transition-colors duration-500 ease-out"
            style={{
              aspectRatio: '8284 / 2955',
              backgroundColor: isHomeTop ? '#ffffff' : 'var(--brand-accent)',
              maskImage: `url(${BRAND_LOCKUP_MASK})`,
              WebkitMaskImage: `url(${BRAND_LOCKUP_MASK})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => {
            const isActive = pathname.startsWith(l.href)
            const baseColor = isHomeTop
              ? isActive
                ? 'text-poudre'
                : 'text-poudre/80 hover:text-poudre'
              : isActive
                ? 'text-canard'
                : 'text-canard/70 hover:text-canard'
            return (
              <Link
                key={l.label}
                to={l.href}
                className={`font-display text-[14px] transition-colors duration-300 ${baseColor}`}
              >
                {l.label}
              </Link>
            )
          })}

          <Link
            to="/sur-mesure"
            className={`ml-2 font-display text-[13px] tracking-[0.15em] uppercase px-5 py-2 border transition-colors duration-300 ${
              isHomeTop
                ? 'border-poudre/60 text-poudre hover:bg-poudre hover:text-canard'
                : 'border-canard/40 text-canard hover:bg-canard hover:text-poudre'
            }`}
          >
            Sur-Mesure
          </Link>

          <LangControl isHomeTop={isHomeTop} />
        </div>

      </nav>
    </header>
  )
}
