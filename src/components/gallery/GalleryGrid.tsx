'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryFilter } from './GalleryFilter'
import { GalleryModal } from './GalleryModal'

interface Project {
  id: string
  title: string
  description: string
  category: 'construction' | 'amenagement' | 'paysagisme'
  images: string[]
  location: string
  year: number
}

// Données de démonstration
const demoProjects: Project[] = [
  {
    id: '1',
    title: 'Hôtel Le Majestic',
    description: 'Construction complète d\'un hôtel 5 étoiles avec spa et restaurant gastronomique.',
    category: 'construction',
    images: ['/images/villa.jpg'],
    location: 'Paris',
    year: 2023,
  },
  {
    id: '2',
    title: 'Villa Les Oliviers',
    description: 'Aménagement paysager complet avec piscine à débordement et jardin méditerranéen.',
    category: 'amenagement',
    images: ['/images/terasse.jpg'],
    location: 'Côte d\'Azur',
    year: 2023,
  },
  {
    id: '3',
    title: 'Cascade Artificielle',
    description: 'Création d\'une cascade naturelle avec grotte décorative pour un parc privé.',
    category: 'paysagisme',
    images: ['/images/cascade.jpg'],
    location: 'Lyon',
    year: 2022,
  },
  {
    id: '4',
    title: 'Restaurant La Terrasse',
    description: 'Construction et aménagement d\'un restaurant panoramique avec vue sur la mer.',
    category: 'construction',
    images: ['/images/restaurant.jpg'],
    location: 'Marseille',
    year: 2022,
  },
  {
    id: '5',
    title: 'Jardin Zen',
    description: 'Création d\'un jardin japonais avec bassin, pont et végétation soigneusement sélectionnée.',
    category: 'amenagement',
    images: ['/images/jardin.jpg'],
    location: 'Bordeaux',
    year: 2021,
  },
  {
    id: '6',
    title: 'Grotte Décorative',
    description: 'Réalisation d\'une grotte artificielle avec jeux de lumière pour un complexe hôtelier.',
    category: 'paysagisme',
    images: ['/images/decoration.jpg'],
    location: 'Nice',
    year: 2021,
  },
]

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = activeFilter === 'all'
    ? demoProjects
    : demoProjects.filter(project => project.category === activeFilter)

  return (
    <>
      <GalleryFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden bg-stone-200">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.location} • {project.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <GalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}