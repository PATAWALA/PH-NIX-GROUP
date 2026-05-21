import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PHÉNIX GROUP & JF DÉCOR',
  description: 'Construction, aménagement et paysagisme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}