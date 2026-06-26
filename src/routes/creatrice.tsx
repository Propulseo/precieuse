import { createFileRoute } from '@tanstack/react-router'
import { getCreatrice } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { CreatriceStatic } from '../components/creatrice/CreatriceStatic'
import { CreatriceCms } from '../components/creatrice/CreatriceCms'

export const Route = createFileRoute('/creatrice')({
  component: CreatricePage,
  loader: () => getCreatrice(getLocale()),
})

function CreatricePage() {
  const content = Route.useLoaderData()
  // Sanity rempli => contenu d'Emeline ; sinon repli statique (Paraglide).
  return content ? <CreatriceCms content={content} /> : <CreatriceStatic />
}
