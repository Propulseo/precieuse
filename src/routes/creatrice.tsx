import { createFileRoute } from '@tanstack/react-router'
import { getCreatrice } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { CreatriceStatic } from '../components/creatrice/CreatriceStatic'
import { CreatriceCms } from '../components/creatrice/CreatriceCms'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/creatrice')({
  component: CreatricePage,
  head: () =>
    seo({
      title: m.seo_creatrice_title(),
      description: m.seo_creatrice_desc(),
      path: '/creatrice',
    }),
  loader: () => getCreatrice(getLocale()),
})

function CreatricePage() {
  const content = Route.useLoaderData()
  // Sanity rempli => contenu d'Emeline ; sinon repli statique (Paraglide).
  return content ? <CreatriceCms content={content} /> : <CreatriceStatic />
}
