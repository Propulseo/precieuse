import { createFileRoute } from '@tanstack/react-router'
import { CarnetHero } from '../components/carnet/CarnetHero'
import { CarnetGrid } from '../components/carnet/CarnetGrid'
import { getArticles } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/carnet/')({
  component: CarnetPage,
  head: () =>
    seo({
      title: m.seo_carnet_title(),
      description: m.seo_carnet_desc(),
      path: '/carnet',
    }),
  loader: () => getArticles(getLocale()),
})

function CarnetPage() {
  const articles = Route.useLoaderData()
  return (
    <>
      <CarnetHero articles={articles} />
      <CarnetGrid articles={articles} />
    </>
  )
}
