import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { m } from '#/paraglide/messages'
import { getLocale, locales, setLocale } from '#/paraglide/runtime'
import { BRAND_LOCKUP_MASK, maskStyle } from './brand/brand'
import { useContactDrawer } from './contact/ContactDrawerProvider'

// label en thunk : m.*() doit être appelé au rendu (locale courante), pas au
// chargement du module (sinon la langue est figée à la locale de base).
// « Contact » n'est plus un lien : c'est un bouton qui ouvre le drawer.
const navLinks = [
  { label: () => m.nav_about(), href: '/creatrice' },
  { label: () => m.nav_collection(), href: '/collection' },
  { label: () => m.nav_journal(), href: '/carnet' },
]

const SCROLL_THRESHOLD = 60

/**
 * Liste des 3 langues (FR / EN / PT), partagée entre le dropdown desktop et le
 * panneau burger mobile. `setLocale` mémorise la langue (cookie) et recharge ;
 * le SSR lit alors la bonne langue via le middleware Paraglide (server.ts).
 */
function LangList({
  tone,
  onSelect,
}: {
  tone: 'light' | 'dark'
  onSelect?: () => void
}) {
  const current = getLocale()
  const active = tone === 'light' ? 'text-poudre' : 'text-canard'
  const idle =
    tone === 'light'
      ? 'text-poudre/55 hover:text-poudre'
      : 'text-canard/50 hover:text-canard'
  return (
    <>
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => {
            if (loc !== current) setLocale(loc)
            onSelect?.()
          }}
          aria-current={loc === current}
          className={`font-display text-[13px] uppercase tracking-[0.18em] transition-colors ${
            loc === current ? active : `${idle} cursor-pointer`
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </>
  )
}

/**
 * Sélecteur de langue desktop — déclencheur épuré (locale courante + chevron)
 * qui ouvre un petit panneau déroulant. Remplace l'ancienne rangée FR·EN·PT.
 */
function LangMenu({
  isHomeTop,
  shadow,
}: {
  isHomeTop: boolean
  shadow: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = getLocale()

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const triggerColor = isHomeTop
    ? 'text-poudre/90 hover:text-poudre'
    : 'text-canard/80 hover:text-canard'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={m.nav_language_choice()}
        className={`flex items-center gap-1 font-display text-[13px] tracking-[0.18em] uppercase transition-colors ${triggerColor} ${shadow}`}
      >
        {current.toUpperCase()}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M2 3.5 L5 6.5 L8 3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-3 flex flex-col items-end gap-2 border border-canard/15 bg-poudre px-4 py-3">
          <LangList tone="dark" onSelect={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}

export function Nav() {
  const { pathname } = useLocation()
  const { open: openContact } = useContactDrawer()
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
  // Ombre portée pour garder texte/icônes lisibles par-dessus le hero (le voile
  // teinté a été retiré). Neutre, uniquement quand la barre est transparente.
  const homeTopShadow = isHomeTop
    ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]'
    : ''

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        barOpaque
          ? 'bg-poudre/95 backdrop-blur-sm border-b border-canard/15'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-8 py-3 lg:px-16">
        {/* Zone gauche : logo */}
        <Link
          to="/"
          aria-label={m.nav_home_aria()}
          className="relative block justify-self-start transition-opacity hover:opacity-70"
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

        {/* Zone centre : liens de navigation (centrés) */}
        <div className="hidden items-center justify-self-center gap-10 md:flex">
          {navLinks.map((l) => {
            const isActive = pathname.startsWith(l.href)
            const baseColor = isHomeTop
              ? isActive
                ? 'text-poudre'
                : 'text-poudre/85 hover:text-poudre'
              : isActive
                ? 'text-canard'
                : 'text-canard/70 hover:text-canard'
            return (
              <Link
                key={l.href}
                to={l.href}
                className={`font-display text-[14px] transition-colors duration-300 ${baseColor} ${homeTopShadow}`}
              >
                {l.label()}
              </Link>
            )
          })}
          <button
            type="button"
            onClick={openContact}
            className={`font-display text-[14px] transition-colors duration-300 ${
              isHomeTop
                ? 'text-poudre/85 hover:text-poudre'
                : 'text-canard/70 hover:text-canard'
            } ${homeTopShadow}`}
          >
            {m.nav_contact()}
          </button>
        </div>

        {/* Zone droite : CTA Sur-mesure + langue (desktop) / burger (mobile) */}
        <div className="flex items-center justify-self-end gap-6">
          <Link
            to="/sur-mesure"
            className={`hidden md:inline-flex font-display text-[13px] tracking-[0.15em] uppercase px-5 py-2 border transition-colors duration-300 ${homeTopShadow} ${
              isHomeTop
                ? 'border-poudre/60 text-poudre hover:bg-poudre hover:text-canard'
                : 'border-canard/40 text-canard hover:bg-canard hover:text-poudre'
            }`}
          >
            {m.nav_bespoke()}
          </Link>

          <div className="hidden md:block">
            <LangMenu isHomeTop={isHomeTop} shadow={homeTopShadow} />
          </div>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? m.nav_menu_close() : m.nav_menu_open()}
            className={`-mr-2 flex h-10 w-10 items-center justify-center transition-colors md:hidden ${burgerColor} ${homeTopShadow}`}
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
        </div>
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
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                openContact()
              }}
              className="border-b border-canard/10 py-3 text-left font-display text-[16px] text-canard/85 transition-colors hover:text-canard"
            >
              {m.nav_contact()}
            </button>
            <Link
              to="/sur-mesure"
              onClick={() => setMenuOpen(false)}
              className="mt-5 border border-canard/40 px-5 py-3 text-center font-display text-[13px] uppercase tracking-[0.15em] text-canard transition-colors hover:bg-canard hover:text-poudre"
            >
              {m.nav_bespoke()}
            </Link>
            <div
              className="mt-6 flex justify-center gap-5"
              aria-label={m.nav_language_choice()}
            >
              <LangList tone="dark" onSelect={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
