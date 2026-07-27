import { createFileRoute } from '@tanstack/react-router'
import { getCreatrice } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { CreatriceStatic } from '../components/creatrice/CreatriceStatic'
import { CreatriceCms } from '../components/creatrice/CreatriceCms'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/creatrice')({
  component: CreatricePage,
  loader: () => getCreatrice(getLocale()),
  // SEO piloté par le doc Sanity creatricePage, repli i18n tant qu'il est vide.
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.seo.title || m.seo_creatrice_title(),
      description: loaderData?.seo.description || m.seo_creatrice_desc(),
      path: '/creatrice',
    }),
})

function CreatricePage() {
  const content = Route.useLoaderData()
  // Sanity rempli => contenu d'Emeline ; sinon repli statique (Paraglide).
  return content ? <CreatriceCms content={content} /> : <CreatriceStatic />
}
