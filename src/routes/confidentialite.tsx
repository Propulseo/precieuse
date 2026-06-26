import { createFileRoute } from '@tanstack/react-router'
import { getLegalPage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { LegalPageView } from '../components/LegalPageView'

export const Route = createFileRoute('/confidentialite')({
  component: ConfidentialitePage,
  loader: () => getLegalPage('confidentialite', getLocale()),
})

function ConfidentialitePage() {
  const content = Route.useLoaderData()
  return (
    <LegalPageView
      title={content?.title || m.footer_legal_privacy()}
      blocks={content?.body ?? []}
    />
  )
}
