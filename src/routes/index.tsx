import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { AvantPropos } from '../components/AvantPropos'
import { Series } from '../components/Series'
import { CollectionFilmstrip } from '../components/collection-variants/CollectionFilmstrip'
import { useBrand } from '../components/brand/BrandProvider'
import type { Product } from '../lib/content/products'
import { Reassurance } from '../components/Reassurance'
import { Matieres } from '../components/Matieres'
import { Etabli } from '../components/Etabli'
import { SurMesure } from '../components/SurMesure'
import { Testimonials } from '../components/Testimonials'
import { LeadCaptureA } from '../components/leadcapture-variants/LeadCaptureA'
import { Reveal } from '../components/Reveal'
import { NewsletterB } from '../components/newsletter-variants/NewsletterB'
import { useNewsletterTrigger } from '../lib/hooks/useNewsletterTrigger'
import {
  getProducts,
  getMatieres,
  getLettres,
  getEtabliSteps,
  getBespokeSteps,
  getHomePage,
} from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/')({
  component: Home,
  // Lit Sanity quand configuré, sinon le contenu statique (fallback des getters).
  loader: async () => {
    const locale = getLocale()
    const [products, matieres, lettres, etabliSteps, bespokeSteps, home] =
      await Promise.all([
        getProducts(locale),
        getMatieres(locale),
        getLettres(locale),
        getEtabliSteps(locale),
        getBespokeSteps(locale),
        getHomePage(locale),
      ])
    return { products, matieres, lettres, etabliSteps, bespokeSteps, home }
  },
  // head après loader : TanStack n'infère `loaderData` que si loader est déclaré
  // avant. Le SEO (titre/description) vient du doc Sanity homePage, repli i18n.
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.home.seo.title ?? m.seo_home_title(),
      description: loaderData?.home.seo.description ?? m.seo_home_desc(),
      path: '/',
    }),
})

function Home() {
  const { products, matieres, lettres, etabliSteps, bespokeSteps, home } =
    Route.useLoaderData()
  const newsletter = useNewsletterTrigger()

  return (
    <>
      <Hero home={home} />
      <CollectionSection products={products} header={home.sections.collection} />
      <Reassurance items={home.sections.reassurance} />
      {/* Sections éditoriales calées à ~1 écran (min-h, centrées) pour un rythme
          uniforme. min-h-screen : remplit au moins un écran sans jamais rogner. */}
      <div className="flex min-h-screen flex-col justify-center">
        <Reveal delay={60}>
          <AvantPropos apropos={home.avantPropos} />
        </Reveal>
      </div>
      <div className="flex min-h-screen flex-col justify-center">
        <Matieres matieres={matieres} header={home.sections.matieres} />
      </div>
      <div className="flex min-h-screen flex-col justify-center">
        <Reveal delay={60}>
          <Etabli steps={etabliSteps} header={home.sections.etabli} />
        </Reveal>
      </div>
      <Reveal delay={60}>
        <SurMesure steps={bespokeSteps} header={home.sections.bespoke} />
      </Reveal>
      <Reveal delay={60}>
        <Testimonials lettres={lettres} header={home.sections.testimonials} />
      </Reveal>
      <Reveal delay={60}>
        <LeadCaptureA header={home.sections.leadCapture} />
      </Reveal>

      <NewsletterB
        isOpen={newsletter.isOpen}
        onClose={newsletter.close}
        onSubmit={newsletter.submit}
        content={home.sections.newsletter}
      />
    </>
  )
}

/**
 * Section 2 (Collection) : défilé plein écran (validé) ou carrousel de base,
 * au choix dans le toggle « Apparence » (réglage `collectionLayout`, défaut défilé).
 */
function CollectionSection({
  products,
  header,
}: {
  products: Product[]
  header: { title: string; subtitle: string }
}) {
  const { collectionLayout } = useBrand()
  return collectionLayout === 'carrousel' ? (
    <Series products={products} header={header} />
  ) : (
    <CollectionFilmstrip products={products} header={header} />
  )
}
