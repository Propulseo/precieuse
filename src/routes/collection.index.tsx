import { createFileRoute } from '@tanstack/react-router'
import { CollectionGemmyo } from '../components/collection-variants/CollectionGemmyo'
import { getProducts } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/collection/')({
  component: CollectionPage,
  head: () =>
    seo({
      title: m.seo_collection_title(),
      description: m.seo_collection_desc(),
      path: '/collection',
    }),
  // Lit Sanity quand configuré, sinon le contenu statique (fallback des getters).
  loader: () => getProducts(getLocale()),
})

function CollectionPage() {
  const products = Route.useLoaderData()
  return <CollectionGemmyo products={products} />
}
