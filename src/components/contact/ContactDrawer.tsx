import { useEffect, useRef } from 'react'
import type { SyntheticEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { BRAND_LOCKUP_MASK, maskStyle } from '../brand/brand'
import { ContactForm } from './ContactForm'
import { useContactDrawer } from './ContactDrawerProvider'

const FAQ = [
  { q: () => m.contact_faq_q1(), a: () => m.contact_faq_a1() },
  { q: () => m.contact_faq_q2(), a: () => m.contact_faq_a2() },
  { q: () => m.contact_faq_q3(), a: () => m.contact_faq_a3() },
]

const kCls = 'font-display text-[9px] tracking-[0.24em] uppercase text-canard/55 mb-px'

/**
 * Drawer Contact — ambiance « Épure » (panneau droit ~420 px). Voile + aside
 * qui glisse depuis la droite, verrou de scroll, Échap, focus entrant/sortant.
 * Sans scroll au repos ; la FAQ (accordéon mono-ouverture) défile sa réponse.
 */
export function ContactDrawer({ site }: { site: { email: string; whatsapp: string } }) {
  const { isOpen, close } = useContactDrawer()
  const panelRef = useRef<HTMLElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  // Esc ferme ; verrou de scroll du fond ; focus entrant puis restitué.
  useEffect(() => {
    if (!isOpen) return
    lastFocused.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => panelRef.current?.focus(), 60)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
      lastFocused.current?.focus()
    }
  }, [isOpen, close])

  // Quand une question s'ouvre, on amène doucement sa réponse dans le champ visible.
  function revealAnswer(e: SyntheticEvent<HTMLDetailsElement>) {
    const el = e.currentTarget
    if (el.open) {
      window.setTimeout(() => el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 70)
    }
  }

  return (
    <>
      {/* Voile */}
      <button
        type="button"
        aria-hidden={!isOpen}
        tabIndex={-1}
        onClick={close}
        className={`fixed inset-0 z-[90] bg-canard-90/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panneau */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={m.contact_title()}
        tabIndex={-1}
        className={`fixed top-0 right-0 z-[95] h-screen w-[420px] max-w-[94vw] bg-poudre text-canard shadow-[-30px_0_60px_-30px_rgba(13,71,71,0.5)] outline-none transition-transform duration-500 ease-[cubic-bezier(.4,0,.1,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label={m.contact_close_aria()}
          className="absolute top-[18px] right-[18px] z-[5] flex h-[38px] w-[38px] items-center justify-center rounded-full border border-canard/60 text-canard opacity-70 transition-all hover:rotate-90 hover:opacity-100"
        >
          ✕
        </button>

        <div className="flex h-full min-h-0 flex-col overflow-y-auto px-[34px] pt-2 pb-6 [scrollbar-width:thin]">
          {/* En-tête : logo lockup recoloré canard, calé à gauche */}
          <span
            role="img"
            aria-label="Précieuse"
            className="block h-12 w-[210px] shrink-0"
            style={{
              ...maskStyle(BRAND_LOCKUP_MASK),
              maskPosition: 'left center',
              WebkitMaskPosition: 'left center',
            }}
          />
          <p className="mt-4 font-display text-[11px] tracking-[0.4em] uppercase text-framboise">
            {m.contact_eyebrow()}
          </p>
          <h2 className="mt-2.5 font-display text-[30px] leading-[1.04] text-canard">
            {m.contact_title()}
          </h2>
          <p className="mt-2 max-w-[40ch] font-display text-[14px] italic leading-[1.45] text-canard/75">
            {m.contact_lede()}
          </p>

          {/* Formulaire */}
          <ContactForm />

          {/* Réassurance */}
          <p className="mt-[18px] font-display text-[11.5px] leading-[1.6] text-canard/65">
            {m.contact_reassurance()}
          </p>

          {/* Coordonnées */}
          <div className="mt-3.5 grid grid-cols-2 gap-x-[18px] gap-y-2">
            <div className="col-span-2">
              <div className={kCls}>{m.contact_label_email()}</div>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-[13.5px] text-canard transition-colors hover:text-framboise"
              >
                {site.email}
              </a>
            </div>
            <div>
              <div className={kCls}>{m.contact_label_whatsapp()}</div>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[13.5px] text-canard transition-colors hover:text-framboise"
              >
                {m.contact_whatsapp_link()}
              </a>
            </div>
            <div>
              <div className={kCls}>{m.contact_label_atelier()}</div>
              <span className="font-display text-[13.5px] text-canard">
                {m.contact_atelier_value()}
              </span>
            </div>
          </div>

          {/* Renvoi sur-mesure */}
          <p className="mt-3.5 font-display text-[12.5px] text-canard/85">
            {m.contact_renvoi()}{' '}
            <Link
              to="/sur-mesure"
              onClick={close}
              className="border-b border-framboise text-framboise"
            >
              {m.contact_renvoi_link()}
            </Link>
          </p>

          {/* FAQ — accordéon mono-ouverture, réponse révélée en douceur */}
          <div className="mt-3.5">
            {FAQ.map((item, i) => (
              <details
                key={i}
                name="contact-faq"
                onToggle={revealAnswer}
                className="border-t border-canard/15 py-2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3.5 font-display text-[13.5px] [&::-webkit-details-marker]:hidden">
                  {item.q()}
                  <span className="text-[16px] opacity-60">+</span>
                </summary>
                <p className="max-w-[40ch] pt-1.5 font-display text-[12.5px] italic leading-[1.55] text-canard/75">
                  {item.a()}
                </p>
              </details>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
