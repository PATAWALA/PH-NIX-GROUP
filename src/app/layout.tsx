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
    default: 'JF DÉCOR | Aménagement & Paysagisme de luxe',
    template: '%s | JF DÉCOR',
  },
  description:
    'Experts en aménagement extérieur, paysagisme artistique et entretien de jardins en Côte d’Ivoire. Jardins, piscines, cascades. Devis gratuit.',
  keywords: [
    'paysagiste Abidjan',
    'aménagement jardin Cocody',
    'cascade artificielle Abidjan',
    'piscine design Côte d\'Ivoire',
    'entretien jardin Abidjan',
    'jardin tropical Abidjan',
    'aménagement terrasse Abidjan',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.jfdecor.ci',
    siteName: 'JF DÉCOR',
    title: 'JF DÉCOR | L\'art du paysagisme',
    description: 'Experts en aménagement extérieur et paysagisme depuis 16 ans en Côte d’Ivoire.',
    images: [
      {
        url: 'https://www.jfdecor.ci/images/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'JF DÉCOR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JF DÉCOR | L\'art du paysagisme',
    description: 'Experts en aménagement extérieur et paysagisme depuis 16 ans en Côte d’Ivoire.',
    images: ['https://www.jfdecor.ci/images/logo.jpeg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  alternates: {
    canonical: 'https://www.jfdecor.ci',
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
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LandscapingBusiness',
              name: 'JF DÉCOR',
              description: 'Aménagement extérieur et paysagisme de luxe en Côte d’Ivoire. Jardins, piscines, cascades et décors naturels.',
              url: 'https://www.jfdecor.ci',
              telephone: '+225 05 06 96 05 82',
              email: 'contact@jfdecor.ci',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abidjan',
                addressRegion: 'Abidjan',
                addressCountry: 'CI',
              },
              areaServed: ['Abidjan', 'Cocody', 'Bingerville', 'Grand-Bassam', 'Côte d\'Ivoire'],
              image: 'https://www.jfdecor.ci/images/logo.jpeg',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+225 42 55 07 79',
                  contactType: 'customer service',
                  availableLanguage: ['French'],
                  areaServed: 'CI',
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