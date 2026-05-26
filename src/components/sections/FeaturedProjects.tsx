'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/client'
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox'

interface Project {
  id: string
  categorie: string
  images: string[]
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('realisations')
        .select('*')
        .order('created_at', { ascending: false })

      if (!data || data.length === 0) return

      const recent = data.slice(0, 2)
      const remaining = data.slice(2)
      const recentCategories = new Set(recent.map(p => p.categorie))
      const diverse: Project[] = []
      const usedCategories = new Set(recentCategories)

      for (const project of remaining) {
        if (diverse.length >= 4) break
        if (!usedCategories.has(project.categorie) || diverse.length >= 4 - (3 - usedCategories.size)) {
          diverse.push(project)
          usedCategories.add(project.categorie)
        }
      }

      if (diverse.length < 4) {
        for (const project of remaining) {
          if (diverse.length >= 4) break
          if (!diverse.includes(project)) diverse.push(project)
        }
      }

      const finalProjects = [...recent, ...diverse].slice(0, 6)
      setProjects(finalProjects)
    }
    load()
  }, [])

  if (projects.length === 0) return null

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Masonry layout : 2 colonnes sur mobile, 4 colonnes sur desktop */}
        <div className="columns-2 lg:columns-4 gap-3 space-y-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group bg-stone-50"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden">
                {project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt=""
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 text-stone-400">Aucune image</div>
                )}

                {/* Overlay "Agrandir" au survol */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                    <ZoomIn className="h-8 w-8" />
                    <span className="text-sm font-medium">Agrandir</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/realisations">
            <Button variant="gold" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Voir toutes nos réalisations
            </Button>
          </Link>
        </div>
      </div>

      <GalleryLightbox
        projects={projects}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </section>
  )
}