import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
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
  description: 'Experts en construction, aménagement et paysagisme depuis 25 ans. Découvrez l\'excellence artisanale pour vos projets d\'exception.',
  keywords: ['construction', 'aménagement', 'paysagisme', 'bâtiment', 'décoration', 'jardin', 'piscine'],
  authors: [{ name: 'PHÉNIX GROUP & JF DÉCOR' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PHÉNIX GROUP & JF DÉCOR',
    title: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
    description: 'Experts en construction, aménagement et paysagisme depuis 25 ans.',
  },
  metadataBase: new URL('https://www.phenixgroup-jfdecor.fr'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}