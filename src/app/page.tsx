import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/Services'
import { StatsSection } from '@/components/sections/Stats'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'  // ✅ ajout
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'PHÉNIX GROUP & JF DÉCOR | Construction, aménagement & paysagisme de luxe en Côte d’Ivoire',
  description: 'Experts en construction de villas, aménagement extérieur et paysagisme artistique à Abidjan, Cocody, Bingerville. Devis gratuit. 16 ans d’excellence.',
  alternates: {
    canonical: 'https://www.phenixgroupdecor.com/',
  },
  keywords: [
    'construction villa Abidjan',
    'paysagiste Cocody',
    'aménagement piscine Abidjan',
    'décoration intérieure Côte d\'Ivoire',
    'entreprise BTP Abidjan',
    'architecte d\'intérieur Abidjan',
    'jardin tropical Abidjan',
  ],
  openGraph: {
    title: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
    description: 'Experts en construction, aménagement et paysagisme depuis 16 ans en Côte d\'Ivoire.',
    url: 'https://www.phenixgroupdecor.com',
    siteName: 'PHÉNIX GROUP & JF DÉCOR',
    images: [
      {
        url: 'https://www.phenixgroupdecor.com/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'PHÉNIX GROUP & JF DÉCOR',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
}

async function getStats() {
  // Données statiques (ou appel Supabase)
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