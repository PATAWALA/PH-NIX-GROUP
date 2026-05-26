'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryFilter } from './GalleryFilter'
import { GalleryLightbox } from './GalleryLightbox'
import { createClient } from '@/lib/client'
import { ZoomIn } from 'lucide-react' // ✅ import icône

interface Project {
  id: string
  categorie: string
  images: string[]
}

export function GalleryGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('realisations')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setProjects(data)
    }
    load()
  }, [])

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.categorie === activeFilter)

  return (
    <>
      <GalleryFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Masonry layout : 2 colonnes mobile, 4 colonnes desktop */}
      <div className="columns-2 lg:columns-4 gap-3 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group bg-stone-100"
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
                  <div className="flex items-center justify-center h-48 text-stone-400 text-sm">
                    Aucune image
                  </div>
                )}

                {/* ✅ Overlay "Agrandir" au survol */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                    <ZoomIn className="h-8 w-8" />
                    <span className="text-sm font-medium">Agrandir</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <GalleryLightbox
        projects={filtered}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  )
}