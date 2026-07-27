import { createFileRoute } from '@tanstack/react-router'
import { CarnetHero } from '../components/carnet/CarnetHero'
import { CarnetGrid } from '../components/carnet/CarnetGrid'
import { getArticles, getCarnetPage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/carnet/')({
  component: CarnetPage,
  // En-tête et libellés pilotés par le singleton Sanity `carnetPage` ; repli
  // i18n si le document est vide.
  loader: async () => {
    const locale = getLocale()
    const [articles, page] = await Promise.all([getArticles(locale), getCarnetPage(locale)])
    return { articles, page }
  },
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.page.seo.title ?? '',
      description: loaderData?.page.seo.description ?? '',
      path: '/carnet',
    }),
})

function CarnetPage() {
  const { articles, page } = Route.useLoaderData()
  return (
    <>
      <CarnetHero articles={articles} page={page} />
      <CarnetGrid articles={articles} page={page} />
    </>
  )
}
