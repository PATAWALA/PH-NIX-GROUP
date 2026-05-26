/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lopibwcnbuxmlpzzoate.supabase.co', // <-- retiré le https://
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig