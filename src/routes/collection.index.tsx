import { createFileRoute } from '@tanstack/react-router'
import { CollectionGemmyo } from '../components/collection-variants/CollectionGemmyo'
import { getCollectionPage, getProducts } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/collection/')({
  component: CollectionPage,
  // Titre et SEO pilotés par le singleton Sanity `collectionPage` ; repli i18n
  // si le document est vide. Les bagues restent des documents `piece`.
  loader: async () => {
    const locale = getLocale()
    const [products, page] = await Promise.all([getProducts(locale), getCollectionPage(locale)])
    return { products, page }
  },
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.page.seo.title ?? '',
      description: loaderData?.page.seo.description ?? '',
      path: '/collection',
    }),
})

function CollectionPage() {
  const { products, page } = Route.useLoaderData()
  return <CollectionGemmyo products={products} title={page.title} />
}
