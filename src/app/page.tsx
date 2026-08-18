import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/Services'
import { StatsSection } from '@/components/sections/Stats'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'JF DÉCOR | Aménagement & Paysagisme de luxe en Côte d’Ivoire',
  description: 'Experts en aménagement extérieur, paysagisme artistique et entretien de jardins à Abidjan, Cocody, Bingerville. Devis gratuit. 16 ans d’excellence.',
  alternates: {
    canonical: 'https://www.jfdecor.ci/',
  },
  keywords: [
    'paysagiste Abidjan',
    'aménagement jardin Cocody',
    'cascade artificielle Abidjan',
    'piscine design Côte d\'Ivoire',
    'entretien jardin Abidjan',
    'jardin tropical Abidjan',
  ],
  openGraph: {
    title: 'JF DÉCOR | L\'art du paysagisme',
    description: 'Experts en aménagement extérieur et paysagisme depuis 16 ans en Côte d\'Ivoire.',
    url: 'https://www.jfdecor.ci',
    siteName: 'JF DÉCOR',
    images: [
      {
        url: 'https://www.jfdecor.ci/images/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'JF DÉCOR',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
}

async function getStats() {
  return {
    projects: 26,
    clients: 200,
    experience: 16,
    satisfaction: 97,
  }
}

export default async function HomePage() {
  const stats = await getStats()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />  
      <ServicesSection /> 
      <StatsSection stats={stats} />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}