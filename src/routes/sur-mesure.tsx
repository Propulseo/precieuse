import { createFileRoute } from '@tanstack/react-router'
import { BespokeHero } from '../components/sur-mesure/BespokeHero'
import { BespokeMarquee } from '../components/sur-mesure/BespokeMarquee'
import { BespokeAtelier } from '../components/sur-mesure/BespokeAtelier'
import { BespokeProcess } from '../components/sur-mesure/BespokeProcess'
import { BespokeSplit } from '../components/sur-mesure/BespokeSplit'
import { BespokeRealisations } from '../components/sur-mesure/BespokeRealisations'
import { BespokeVoices } from '../components/sur-mesure/BespokeVoices'
import { ClosingInvite } from '../components/ClosingInvite'
import { getBespokePage, getContact } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/sur-mesure')({
  component: SurMesurePage,
  // Page entièrement pilotable depuis Sanity (singleton surMesurePage),
  // repli i18n/photos via bespokePageFallback(). Le bandeau de clôture partage
  // le contenu Contact (titre/accroche éditables une fois, cohérents partout).
  loader: async () => {
    const locale = getLocale()
    const [page, contact] = await Promise.all([
      getBespokePage(locale),
      getContact(locale),
    ])
    return { page, contact }
  },
  // SEO (titre/description) piloté par le doc Sanity surMesurePage, repli i18n.
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.page.seo.title ?? m.seo_surmesure_title(),
      description: loaderData?.page.seo.description ?? m.seo_surmesure_desc(),
      path: '/sur-mesure',
    }),
})

function SurMesurePage() {
  const { page, contact } = Route.useLoaderData()
  return (
    // -mt-16 : le héro passe en plein cadre sous le Nav fixe (pt-16 du <main>).
    <div className="-mt-16">
      <BespokeHero hero={page.hero} />
      <BespokeMarquee items={page.marquee} />
      <BespokeAtelier atelier={page.atelier} />
      <BespokeProcess steps={page.steps} manifeste={page.manifeste} />
      <BespokeSplit split={page.split} />
      <BespokeRealisations realisations={page.realisations} />
      <BespokeVoices voices={page.voices} />
      <ClosingInvite title={contact.title} lede={contact.lede} cta={m.surmesure_cta()} />
    </div>
  )
}
