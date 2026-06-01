import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.phenixgroupdecor.com'
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/realisations`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/a-propos`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
  ]
}