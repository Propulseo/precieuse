import { useState, useEffect, useCallback } from 'react'
import { getLocale } from '#/paraglide/runtime'
import { subscribeNewsletter } from '../leads'

const STORAGE_KEY = 'precieuse-newsletter-state'
const SCROLL_THRESHOLD = 0.5
const SUPPRESSION_DAYS = 7
const DAY_MS = 24 * 60 * 60 * 1000

type NewsletterState =
  | { status: 'submitted' }
  | { status: 'closed'; timestamp: number }
  | null

function readState(): NewsletterState {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as NewsletterState
  } catch {
    return null
  }
}

function writeState(state: NewsletterState) {
  if (typeof window === 'undefined') return
  try {
    if (state === null) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  } catch {
    /* localStorage indisponible (mode privé, quota, etc.) — silencieux */
  }
}

function shouldShow(state: NewsletterState): boolean {
  if (!state) return true
  if (state.status === 'submitted') return false
  return Date.now() - state.timestamp >= SUPPRESSION_DAYS * DAY_MS
}

export function useNewsletterTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (!shouldShow(readState())) {
      setHasTriggered(true)
    }
  }, [])

  useEffect(() => {
    if (hasTriggered) return

    const checkScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const ratio = window.scrollY / max
      if (ratio >= SCROLL_THRESHOLD) {
        if (shouldShow(readState())) setIsOpen(true)
        setHasTriggered(true)
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [hasTriggered])

  const close = useCallback(() => {
    setIsOpen(false)
    writeState({ status: 'closed', timestamp: Date.now() })
  }, [])

  const submit = useCallback((email: string) => {
    setIsOpen(false)
    writeState({ status: 'submitted' })
    // Envoi vers Brevo (server function). Sans clé Brevo côté serveur, l'appel
    // réussit en no-op (cf. src/lib/brevo.ts) — rien n'est perdu côté UX.
    void subscribeNewsletter({ data: { email, locale: getLocale() } }).catch(
      (err) => console.error('[newsletter] échec inscription :', err),
    )
  }, [])

  const forceOpen = useCallback(() => {
    setIsOpen(true)
    setHasTriggered(true)
  }, [])

  const reset = useCallback(() => {
    writeState(null)
    setIsOpen(false)
    setHasTriggered(false)
  }, [])

  return { isOpen, close, submit, forceOpen, reset }
}
