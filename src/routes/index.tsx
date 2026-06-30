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
  getBespokeProcess,
} from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/')({
  component: Home,
  head: () =>
    seo({
      title: m.seo_home_title(),
      description: m.seo_home_desc(),
      path: '/',
    }),
  // Lit Sanity quand configuré, sinon le contenu statique (fallback des getters).
  loader: async () => {
    const locale = getLocale()
    const [products, matieres, lettres, etabliSteps, bespokeProcess] =
      await Promise.all([
        getProducts(locale),
        getMatieres(locale),
        getLettres(locale),
        getEtabliSteps(locale),
        getBespokeProcess(locale),
      ])
    return { products, matieres, lettres, etabliSteps, bespokeProcess }
  },
})

function Home() {
  const { products, matieres, lettres, etabliSteps, bespokeProcess } =
    Route.useLoaderData()
  const newsletter = useNewsletterTrigger()

  return (
    <>
      <Hero />
      <CollectionSection products={products} />
      <Reassurance />
      {/* Sections éditoriales calées à ~1 écran (min-h, centrées) pour un rythme
          uniforme. min-h-screen : remplit au moins un écran sans jamais rogner. */}
      <div className="flex min-h-screen flex-col justify-center">
        <Reveal delay={60}>
          <AvantPropos />
        </Reveal>
      </div>
      <div className="flex min-h-screen flex-col justify-center">
        <Matieres matieres={matieres} />
      </div>
      <div className="flex min-h-screen flex-col justify-center">
        <Reveal delay={60}>
          <Etabli steps={etabliSteps} />
        </Reveal>
      </div>
      <div className="flex min-h-screen flex-col justify-center">
        <Reveal delay={60}>
          <SurMesure process={bespokeProcess} />
        </Reveal>
      </div>
      <Reveal delay={60}>
        <Testimonials lettres={lettres} />
      </Reveal>
      <div className="flex min-h-screen flex-col justify-center">
        <Reveal delay={60}>
          <LeadCaptureA />
        </Reveal>
      </div>

      <NewsletterB
        isOpen={newsletter.isOpen}
        onClose={newsletter.close}
        onSubmit={newsletter.submit}
      />
    </>
  )
}

/**
 * Section 2 (Collection) : défilé plein écran (validé) ou carrousel de base,
 * au choix dans le toggle « Apparence » (réglage `collectionLayout`, défaut défilé).
 */
function CollectionSection({ products }: { products: Product[] }) {
  const { collectionLayout } = useBrand()
  return collectionLayout === 'carrousel' ? (
    <Series products={products} />
  ) : (
    <CollectionFilmstrip products={products} />
  )
}
