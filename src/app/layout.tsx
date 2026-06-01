import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { AdminAwareLayout } from '@/components/layout/AdminAwareLayout'
import { StructuredData } from '@/components/SEO/StructuredData'
import { AdminAwareWidget } from '@/components/layout/AdminAwareWidget'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'PHÉNIX GROUP & JF DÉCOR | Construction, aménagement & paysagisme de luxe',
    template: '%s | PHÉNIX GROUP & JF DÉCOR',
  },
  description:
    'Experts en construction, aménagement extérieur et paysagisme artistique en Côte d’Ivoire. Devis gratuit. 16 ans d’excellence.',
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
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.phenixgroupdecor.com',
    siteName: 'PHÉNIX GROUP & JF DÉCOR',
    title: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
    description: 'Experts en construction, aménagement et paysagisme depuis 16 ans en Côte d’Ivoire.',
    images: [
      {
        url: 'https://www.phenixgroupdecor.com/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'PHÉNIX GROUP & JF DÉCOR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
    description: 'Experts en construction, aménagement et paysagisme depuis 16 ans en Côte d’Ivoire.',
    images: ['https://www.phenixgroupdecor.com/images/logo.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://www.phenixgroupdecor.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        {/* Données structurées LocalBusiness */}
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: 'PHÉNIX GROUP & JF DÉCOR',
      description: 'Construction, aménagement et paysagisme de luxe en Côte d’Ivoire.',
      url: 'https://www.phenixgroupdecor.com',
      telephone: '+225 05 06 96 05 82',
      email: 'contact@phenixgroupdecor.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abidjan',
        addressRegion: 'Abidjan',
        addressCountry: 'CI',
      },
      areaServed: ['Abidjan', 'Cocody', 'Bingerville', 'Grand-Bassam', 'Côte d\'Ivoire'],
      image: 'https://www.phenixgroupdecor.com/images/logo.jpg',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      // 👇 Ajout du contact WhatsApp
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+225 42 55 07 79',
          contactType: 'customer service',
          availableLanguage: ['French'],
          areaServed: 'CI',
          // Optionnel : préciser qu'il s'agit de WhatsApp
          description: 'Contactez-nous via WhatsApp pour un devis rapide.',
        },
      ],
    }),
  }}
/>
        <AdminAwareLayout>{children}</AdminAwareLayout>
        <AdminAwareWidget />
      </body>
    </html>
  )
}