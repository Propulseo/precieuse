import { Link, useLocation } from '@tanstack/react-router'
import { Fragment, useEffect, useState } from 'react'
import { m } from '#/paraglide/messages'
import { getLocale, locales, setLocale } from '#/paraglide/runtime'
import { BRAND_LOCKUP_MASK, maskStyle } from './brand/brand'

// label en thunk : m.*() doit être appelé au rendu (locale courante), pas au
// chargement du module (sinon la langue est figée à la locale de base).
const navLinks = [
  { label: () => m.nav_about(), href: '/a-propos' },
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

      </nav>
    </header>
  )
}
