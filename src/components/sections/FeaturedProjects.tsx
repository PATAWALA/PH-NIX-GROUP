'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Calendar, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/client'

// Données ivoiriennes de démonstration (remplace par tes propres images et descriptions)
const projects = [
  {
    id: '1',
    titre: 'Résidence présidentielle',
    categorie: 'construction' as const,
    images: ['/images/hotel.jpg'],
    localisation: 'Abidjan, Cocody',
    annee: 2026,
  },
  {
    id: '2',
    titre: 'Aménagement du Jardin Botanique',
    categorie: 'amenagement' as const,
    images: ['/images/jardin1.jpg'],
    localisation: 'Bingerville',
    annee: 2025,
  },
  {
    id: '3',
    titre: 'Complexe Hôtelier « La Lagune »',
    categorie: 'construction' as const,
    images: ['/images/hotel1.jpg'],
    localisation: 'Grand-Bassam',
    annee: 2026,
  },
  {
    id: '4',
    titre: 'Espace paysager du Plateau',
    categorie: 'paysagisme' as const,
    images: ['/images/paysage.jpg'],
    localisation: 'Abidjan, Plateau',
    annee: 2025,
  },
  {
    id: '5',
    titre: 'Villa moderne à Yamoussoukro',
    categorie: 'construction' as const,
    images: ['/images/projects/jardin-1.svg'],
    localisation: 'Yamoussoukro',
    annee: 2026,
  },
  {
    id: '6',
    titre: 'Cascade du Parc des Princes',
    categorie: 'paysagisme' as const,
    images: ['/images/projects/grotte-1.svg'],
    localisation: 'Abidjan, Yopougon',
    annee: 2025,
  },
]

// Modal simple pour agrandir l’image
function ImageModal({ project, onClose }: { project: typeof projects[0] | null; onClose: () => void }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-96 bg-stone-200">
          <Image
            src={project.images[0]}
            alt={project.titre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4 font-serif">{project.titre}</h2>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {project.localisation}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {project.annee}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FeaturedProjects() {
  const [displayedProjects, setDisplayedProjects] = useState(projects.slice(0, 4))
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  useEffect(() => {
    async function loadFromSupabase() {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('realisations')
          .select('*')
          .order('annee', { ascending: false })
          .limit(4)

        if (data && data.length > 0) {
          setDisplayedProjects(data)
        }
      } catch (error) {
        // garde les données locales
      }
    }
    loadFromSupabase()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">Réalisations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            Nos dernières réalisations
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Découvrez un aperçu de notre savoir-faire à travers une sélection de projets récents en Côte d’Ivoire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image cliquable pour agrandir */}
              <div
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.images[0] || '/images/projects/placeholder.svg'}
                  alt={project.titre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-900 text-xs px-2 py-1 rounded-full font-medium capitalize">
                  {project.categorie}
                </span>
                {/* Indication "cliquer pour agrandir" */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">Agrandir</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-stone-900 mb-2 font-serif leading-tight">{project.titre}</h3>
                <div className="flex items-center gap-4 text-xs text-stone-400 mt-auto">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {project.localisation}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {project.annee}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/realisations">
            <Button variant="gold" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Voir toutes nos réalisations
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Modal d'agrandissement */}
      {selectedProject && (
        <ImageModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}