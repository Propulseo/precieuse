import { createFileRoute } from '@tanstack/react-router'
import { getLegalPage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { LegalPageView } from '../components/LegalPageView'

export const Route = createFileRoute('/mentions-legales')({
  component: MentionsPage,
  loader: () => getLegalPage('mentions-legales', getLocale()),
})

function MentionsPage() {
  const content = Route.useLoaderData()
  return (
    <LegalPageView
      title={content?.title || m.footer_legal_mentions()}
      blocks={content?.body ?? []}
    />
  )
}
