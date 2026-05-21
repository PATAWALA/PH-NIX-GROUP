// Ce script crée des images placeholder minimales en base64
const fs = require('fs');
const path = require('path');

// Petit PNG 1x1 pixel (le plus petit PNG valide)
const createPlaceholder = () => {
  // Placeholder 800x600 en dégradé via SVG converti
  return null;
};

// Créer la structure des dossiers
const dirs = [
  'public/images/hero',
  'public/images/services',
  'public/images/projects',
  'public/images/cta',
  'public/images/patterns',
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Dossier créé : ${dir}`);
  }
});

// Créer des SVG qui fonctionnent avec Next.js Image
const createSVG = (width, height, text, bgColor = '#1a1a2e', textColor = '#b45309') => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d2d44;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.8}" height="${height * 0.8}" 
        fill="none" stroke="${textColor}" stroke-width="2" stroke-dasharray="10,5" opacity="0.3" />
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" 
        fill="${textColor}" font-size="24" font-family="Georgia, serif" opacity="0.8">
    ${text}
  </text>
  <text x="${width / 2}" y="${height / 2 + 30}" text-anchor="middle" 
        fill="${textColor}" font-size="14" font-family="Arial, sans-serif" opacity="0.5">
    PHÉNIX GROUP &amp; JF DÉCOR
  </text>
</svg>
`.trim();

// Images à créer
const images = [
  { path: 'public/images/hero/construction.svg', width: 1200, height: 800, text: 'Construction de Luxe', bgColor: '#0f0f23' },
  { path: 'public/images/services/construction.svg', width: 600, height: 400, text: 'Construction', bgColor: '#292524' },
  { path: 'public/images/services/amenagement.svg', width: 600, height: 400, text: 'Aménagement', bgColor: '#292524' },
  { path: 'public/images/services/paysagisme.svg', width: 600, height: 400, text: 'Paysagisme', bgColor: '#292524' },
  { path: 'public/images/cta/construction-background.svg', width: 1200, height: 600, text: 'Votre Projet', bgColor: '#1c1917' },
];

// Images des projets
const projects = [
  'hotel-1', 'villa-1', 'cascade-1', 'restaurant-1', 'jardin-1', 'grotte-1'
];

projects.forEach(name => {
  images.push({
    path: `public/images/projects/${name}.svg`,
    width: 800,
    height: 600,
    text: name.replace('-', ' ').toUpperCase(),
    bgColor: '#44403c'
  });
});

// Créer les fichiers SVG
images.forEach(img => {
  const svg = createSVG(img.width, img.height, img.text, img.bgColor);
  fs.writeFileSync(img.path, svg);
  console.log(`✅ ${img.path}`);
});

// Créer le pattern topography
const patternSVG = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="1" fill="#ffffff" opacity="0.1" />
  <circle cx="20" cy="30" r="0.5" fill="#ffffff" opacity="0.05" />
  <circle cx="80" cy="70" r="0.5" fill="#ffffff" opacity="0.05" />
  <circle cx="35" cy="80" r="0.5" fill="#ffffff" opacity="0.08" />
  <circle cx="70" cy="15" r="0.5" fill="#ffffff" opacity="0.08" />
</svg>`;

fs.writeFileSync('public/images/patterns/topography.svg', patternSVG);
console.log('✅ public/images/patterns/topography.svg');

console.log('\n✨ Toutes les images placeholder sont créées !');