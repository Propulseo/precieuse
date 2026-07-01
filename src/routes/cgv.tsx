import { createFileRoute } from '@tanstack/react-router'
import { getLegalPage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { LegalPageView } from '../components/LegalPageView'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/cgv')({
  component: CgvPage,
  head: () =>
    seo({
      title: m.seo_legal_terms_title(),
      description: m.seo_legal_desc(),
      path: '/cgv',
    }),
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
