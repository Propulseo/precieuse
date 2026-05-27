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

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const newsletter = useNewsletterTrigger()

  return (
    <>
      <Hero />
      <Series />
      <Reassurance />
      <Reveal delay={60}>
        <AvantPropos />
      </Reveal>
      <Matieres />
      <Reveal delay={60}>
        <Etabli />
      </Reveal>
      <Reveal delay={60}>
        <SurMesure />
      </Reveal>
      <Reveal delay={60}>
        <Testimonials />
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
