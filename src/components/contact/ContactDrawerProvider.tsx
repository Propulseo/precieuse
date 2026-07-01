import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type ContactDrawerValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContactDrawerContext = createContext<ContactDrawerValue | null>(null)

/** État global d'ouverture du drawer Contact (calqué sur BrandProvider). */
export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  return (
    <ContactDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactDrawerContext.Provider>
  )
}

export function useContactDrawer(): ContactDrawerValue {
  const ctx = useContext(ContactDrawerContext)
  if (!ctx) {
    throw new Error('useContactDrawer must be used within a <ContactDrawerProvider>')
  }
  return ctx
}
