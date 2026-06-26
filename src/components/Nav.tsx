import { Link, useLocation } from '@tanstack/react-router'
import { Fragment, useEffect, useState } from 'react'
import { m } from '#/paraglide/messages'
import { getLocale, locales, setLocale } from '#/paraglide/runtime'
import { BRAND_LOCKUP_MASK, maskStyle } from './brand/brand'

// label en thunk : m.*() doit être appelé au rendu (locale courante), pas au
// chargement du module (sinon la langue est figée à la locale de base).
const navLinks = [
  { label: () => m.nav_about(), href: '/creatrice' },
  { label: () => m.nav_collection(), href: '/collection' },
  { label: () => m.nav_journal(), href: '/carnet' },
  { label: () => m.nav_contact(), href: '/contact' },
]

const SCROLL_THRESHOLD = 60

/**
 * Sélecteur de langue FR / EN / PT (Paraglide, stratégie cookie).
 * `setLocale` mémorise la langue (cookie) et recharge ; le SSR lit alors la
 * bonne langue via le middleware Paraglide (server.ts).
 */
function LangControl({ isHomeTop }: { isHomeTop: boolean }) {
  const current = getLocale()
  const active = isHomeTop ? 'text-poudre' : 'text-canard'
  const idle = isHomeTop
    ? 'text-poudre/50 hover:text-poudre'
    : 'text-canard/45 hover:text-canard'
  const sep = isHomeTop ? 'text-poudre/30' : 'text-canard/25'
  return (
    <div
      className="flex items-center gap-1.5 font-display text-[12px] tracking-[0.12em]"
      aria-label={m.nav_language_choice()}
    >
      {locales.map((loc, i) => (
        <Fragment key={loc}>
          {i > 0 && (
            <span className={sep} aria-hidden>
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => loc !== current && setLocale(loc)}
            aria-current={loc === current}
            className={`uppercase transition-colors ${
              loc === current ? active : `${idle} cursor-pointer`
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  )
}

export function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => setMenuOpen(false), [pathname])

  // Bloque le scroll de fond quand le menu mobile est ouvert.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /**
   * Mode "transparent" uniquement sur la home (qui a un hero plein écran),
   * et seulement quand on est tout en haut. Sur les autres pages, et dès que le
   * menu mobile est ouvert : toujours opaque (lisibilité).
   */
  const isHomeTop = pathname === '/' && !scrolled
  const barOpaque = !isHomeTop || menuOpen
  const burgerColor = isHomeTop && !menuOpen ? 'text-poudre' : 'text-canard'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        barOpaque
          ? 'bg-poudre/95 backdrop-blur-sm border-b border-canard/15'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-3 lg:px-16">
        <Link
          to="/"
          aria-label={m.nav_home_aria()}
          className="relative block transition-opacity hover:opacity-70"
        >
          {/* Lockup recoloré via masque CSS : suit --brand-accent (toggle),
              et passe en blanc par-dessus le hero plein écran (home, en haut). */}
          <span
            role="img"
            aria-label={m.nav_brand_aria()}
            className="block h-9 w-auto lg:h-10 transition-colors duration-500 ease-out"
            style={{
              aspectRatio: '8284 / 2955',
              ...maskStyle(
                BRAND_LOCKUP_MASK,
                isHomeTop ? '#ffffff' : 'var(--brand-accent)',
              ),
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
                key={l.href}
                to={l.href}
                className={`font-display text-[14px] transition-colors duration-300 ${baseColor}`}
              >
                {l.label()}
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
            {m.nav_bespoke()}
          </Link>

          <LangControl isHomeTop={isHomeTop} />
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? m.nav_menu_close() : m.nav_menu_open()}
          className={`-mr-2 flex h-10 w-10 items-center justify-center transition-colors md:hidden ${burgerColor}`}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16 M4 12h16 M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Panneau de navigation mobile */}
      {menuOpen && (
        <div className="border-b border-canard/15 bg-poudre px-8 pb-6 pt-1 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-canard/10 py-3 font-display text-[16px] text-canard/85 transition-colors hover:text-canard"
              >
                {l.label()}
              </Link>
            ))}
            <Link
              to="/sur-mesure"
              onClick={() => setMenuOpen(false)}
              className="mt-5 border border-canard/40 px-5 py-3 text-center font-display text-[13px] uppercase tracking-[0.15em] text-canard transition-colors hover:bg-canard hover:text-poudre"
            >
              {m.nav_bespoke()}
            </Link>
            <div className="mt-6 flex justify-center">
              <LangControl isHomeTop={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
