import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { AdminAwareLayout } from '@/components/layout/AdminAwareLayout'
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
    default: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
    template: '%s | PHÉNIX GROUP & JF DÉCOR'
  },
  description: 'Experts en construction, aménagement et paysagisme depuis 16 ans. Découvrez l\'excellence artisanale pour vos projets d\'exception en Côte d\'Ivoire.',
  keywords: ['construction', 'aménagement', 'paysagisme', 'bâtiment', 'décoration', 'jardin', 'piscine', 'Côte d\'Ivoire', 'Abidjan'],
    verification: {
    google: 'zI43rJUyCYAdsMUrDrFmUQJuNAI840WoitX6M3KX0tg',
  },
  authors: [{ name: 'PHÉNIX GROUP & JF DÉCOR' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PHÉNIX GROUP & JF DÉCOR',
    title: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
    description: 'Experts en construction, aménagement et paysagisme depuis 16 ans.',
    url: 'https://www.phenixgroupdecor.com/',
    images: [
      {
        url: 'https://www.phenixgroupdecor.com/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'PHÉNIX GROUP & JF DÉCOR',
      },
    ],
  },
  metadataBase: new URL('https://www.phenixgroupdecor.com/'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        <AdminAwareLayout>{children}</AdminAwareLayout>
        <AdminAwareWidget />
      </body>
    </html>
  )
}