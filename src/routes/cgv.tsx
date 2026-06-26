import { createFileRoute } from '@tanstack/react-router'
import { getLegalPage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { LegalPageView } from '../components/LegalPageView'

export const Route = createFileRoute('/cgv')({
  component: CgvPage,
  loader: () => getLegalPage('cgv', getLocale()),
})

function CgvPage() {
  const content = Route.useLoaderData()
  return (
    <LegalPageView
      title={content?.title || m.footer_legal_terms()}
      blocks={content?.body ?? []}
    />
  )
}
