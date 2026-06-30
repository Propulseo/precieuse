import { useState, useEffect } from 'react'
import { m } from '#/paraglide/messages'

const STORAGE_KEY = 'precieuse_splash_shown'
const DURATION_MS = 5500

export function SplashScreen({ tagline }: { tagline?: string }) {
  const [phase, setPhase] = useState<'showing' | 'fading' | 'hidden'>('showing')

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setPhase('hidden')
        return
      }
    } catch {
      /* sessionStorage indisponible : on affiche quand même */
    }

    const fadeTimer = setTimeout(() => setPhase('fading'), DURATION_MS - 700)
    const hideTimer = setTimeout(() => {
      setPhase('hidden')
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* écriture impossible */
      }
    }, DURATION_MS)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (phase === 'hidden') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  if (phase === 'hidden') return null

  return (
    <div
      aria-hidden
      className={`splash-screen fixed inset-0 z-[100] bg-poudre flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-[260px] sm:w-[320px] lg:w-[360px] aspect-[5/6]">
        <img
          src="/brand/picto-shape.png"
          alt="Précieuse"
          className="splash-picto absolute inset-0 w-full h-full object-contain"
        />
      </div>

      <span aria-hidden className="splash-divider mt-7 block h-px bg-canard" />

      <p className="splash-tagline font-display text-[12px] sm:text-[13px] tracking-[0.4em] uppercase text-canard/65 mt-5">
        {tagline ?? m.splash_tagline()}
      </p>
    </div>
  )
}
