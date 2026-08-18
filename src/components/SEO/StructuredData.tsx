export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JF DÉCOR',
    url: 'https://www.jfdecor.ci',
    logo: 'https://www.jfdecor.ci/images/logo.jpeg',
    description: 'Experts en aménagement extérieur, paysagisme artistique et entretien de jardins en Côte d\'Ivoire.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+225 05 06 96 05 82',
      contactType: 'customer service',
      availableLanguage: ['French'],
    },
    sameAs: [
      'https://web.facebook.com/profile.php?id=61587317350685',
      'https://www.instagram.com/...',
      'https://www.linkedin.com/...',
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LandscapingBusiness',
    name: 'JF DÉCOR',
    description: 'Service d\'aménagement paysager et d\'entretien de jardins en Côte d\'Ivoire.',
    url: 'https://www.jfdecor.ci',
    telephone: '+225 05 06 96 05 82',
    email: 'contact@jfdecor.ci',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abidjan',
      addressRegion: 'Abidjan',
      addressCountry: 'CI',
    },
    areaServed: ['Abidjan', 'Cocody', 'Bingerville', 'Grand-Bassam'],
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-18:00',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}