export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PHÉNIX GROUP & JF DÉCOR',
    url: 'https://www.phenixgroupdecor.com',
    logo: 'https://www.phenixgroupdecor.com/images/logo.jpg',
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}