import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { AvantPropos } from '../components/AvantPropos'
import { Series } from '../components/Series'
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

export const Route = createFileRoute('/')({
  component: Home,
  // Lit Sanity quand configuré, sinon le contenu statique (fallback des getters).
  loader: async () => {
    const [products, matieres, lettres, etabliSteps, bespokeProcess] =
      await Promise.all([
        getProducts(),
        getMatieres(),
        getLettres(),
        getEtabliSteps(),
        getBespokeProcess(),
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
      <Series products={products} />
      <Reassurance />
      <Reveal delay={60}>
        <AvantPropos />
      </Reveal>
      <Matieres matieres={matieres} />
      <Reveal delay={60}>
        <Etabli steps={etabliSteps} />
      </Reveal>
      <Reveal delay={60}>
        <SurMesure process={bespokeProcess} />
      </Reveal>
      <Reveal delay={60}>
        <Testimonials lettres={lettres} />
      </Reveal>
      <Reveal delay={60}>
        <LeadCaptureA />
      </Reveal>

      <NewsletterB
        isOpen={newsletter.isOpen}
        onClose={newsletter.close}
        onSubmit={newsletter.submit}
      />
    </>
  )
}
