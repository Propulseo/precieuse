import { createFileRoute, Outlet } from '@tanstack/react-router'

/**
 * Layout de la section Collection. Parent de `/collection` (index, la liste) et
 * `/collection/$slug` (fiche pièce) : il doit rendre l'`<Outlet/>` pour que la
 * route enfant s'affiche, sinon on verrait toujours la liste.
 */
export const Route = createFileRoute('/collection')({
  component: CollectionLayout,
})

function CollectionLayout() {
  return <Outlet />
}
