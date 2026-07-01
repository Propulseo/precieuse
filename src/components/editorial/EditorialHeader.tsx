import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'

/**
 * En-tête éditorial partagé (Carnet, Collection, Créatrice) : titre, puis un
 * séparateur à filets framboise avec la fleur de la marque en son centre, puis
 * le contenu de la page (sous-titre, sommaire des pièces…). Compact, pleine
 * largeur, sur la charte poudre/canard, accent framboise.
 */
export function EditorialHeader({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children?: ReactNode
}) {
  return (
    <header className={cn('bg-poudre px-6 py-3 text-center lg:px-10 lg:py-3.5', className)}>
      <h1 className="font-headline text-[clamp(22px,3vw,38px)] leading-none text-canard [text-wrap:balance]">
        {title}
      </h1>

      {/* Séparateur : filets framboise + fleur de la marque (suit --brand-accent). */}
      <div className="mx-auto mt-2 mb-2.5 flex max-w-[1320px] items-center gap-5 text-framboise/50">
        <span className="h-px flex-1 bg-current" />
        <span
          role="img"
          aria-label="Précieuse"
          className="shrink-0"
          style={{ width: 'min(8vw, 32px)', aspectRatio: '1 / 1', ...maskStyle(BRAND_PICTO_MASK) }}
        />
        <span className="h-px flex-1 bg-current" />
      </div>

      {children}
    </header>
  )
}
