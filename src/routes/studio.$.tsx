import { createFileRoute } from '@tanstack/react-router'
import { Suspense, lazy, useEffect, useState } from 'react'

/**
 * Studio Sanity embarqué à `/studio` (et toutes ses sous-routes via le splat).
 * Le Studio est **client-only** : on ne le monte qu'après hydratation et on
 * l'importe en `lazy` pour qu'il ne pèse sur le bundle que sur cette page.
 * Le chrome du site (nav/footer/splash) est masqué pour `/studio` dans `__root`.
 */
export const Route = createFileRoute('/studio/$')({
  component: StudioPage,
})

const StudioApp = lazy(() => import('../components/studio/StudioApp'))

function Loading() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#125e5e',
        background: '#faf6f1',
      }}
    >
      Chargement du Studio…
    </div>
  )
}

function StudioPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Conteneur plein écran, fond clair du Studio : évite que le fond poudre du
  // site déborde sous le Studio quand il ne remplit pas toute la hauteur.
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'auto', background: '#faf6f1' }}>
      {mounted ? (
        <Suspense fallback={<Loading />}>
          <StudioApp />
        </Suspense>
      ) : (
        <Loading />
      )}
    </div>
  )
}
