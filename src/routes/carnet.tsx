import { createFileRoute } from '@tanstack/react-router'
import { CarnetHero } from '../components/carnet/CarnetHero'
import { CarnetGrid } from '../components/carnet/CarnetGrid'
import { getArticles } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'

export const Route = createFileRoute('/carnet')({
  component: CarnetPage,
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
