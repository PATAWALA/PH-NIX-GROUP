/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.phenixgroupdecor.com/',
  generateRobotsTxt: true,  // ← génère automatiquement robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    additionalSitemaps: [
      'https://www.phenixgroupdecor.com/sitemap-0.xml',
    ],
  },
  transform: async (config, path) => {
    // Personnalisez les priorités selon la page
    if (path === '/') return { loc: path, priority: 1.0, changefreq: 'daily' }
    if (path.startsWith('/services')) return { loc: path, priority: 0.9, changefreq: 'weekly' }
    return { loc: path, priority: 0.7, changefreq: 'monthly' }
  },
}