import { createFileRoute } from '@tanstack/react-router'
import { getLegalPage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { LegalPageView } from '../components/LegalPageView'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/confidentialite')({
  component: ConfidentialitePage,
  head: () =>
    seo({
      title: m.seo_legal_privacy_title(),
      description: m.seo_legal_desc(),
      path: '/confidentialite',
    }),
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
