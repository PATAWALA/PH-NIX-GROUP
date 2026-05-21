import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
    // ✅ Ajoute ça pour voir les erreurs
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
}

export default nextConfig