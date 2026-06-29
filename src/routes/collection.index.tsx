import { createFileRoute } from '@tanstack/react-router'
import { CollectionGemmyo } from '../components/collection-variants/CollectionGemmyo'
import { getProducts } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'

export const Route = createFileRoute('/collection/')({
  component: CollectionPage,
  // Lit Sanity quand configuré, sinon le contenu statique (fallback des getters).
  loader: () => getProducts(getLocale()),
})

function CollectionPage() {
  const products = Route.useLoaderData()
  return <CollectionGemmyo products={products} />
}
