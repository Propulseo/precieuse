import { createFileRoute, Outlet } from '@tanstack/react-router'

/**
 * Layout de la section Carnet. Sert de parent à `/carnet` (index, la liste) et
 * `/carnet/$slug` (article) : il doit rendre l'`<Outlet/>` pour que la route
 * enfant s'affiche, sinon on verrait toujours la liste.
 */
export const Route = createFileRoute('/carnet')({
  component: CarnetLayout,
})

function CarnetLayout() {
  return <Outlet />
}
