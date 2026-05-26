'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Portal } from '@/components/ui/Portal'

interface Project {
  id: string
  images: string[]
}

interface GalleryLightboxProps {
  projects: Project[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export function GalleryLightbox({ projects, currentIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const isOpen = currentIndex !== null && projects.length > 0
  const currentProject = isOpen ? projects[currentIndex!] : null

  const goToPrevious = useCallback(() => {
    if (currentIndex === null) return
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    onNavigate(newIndex)
  }, [currentIndex, projects.length, onNavigate])

  const goToNext = useCallback(() => {
    if (currentIndex === null) return
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
  }, [currentIndex, projects.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, goToPrevious, goToNext])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !currentProject) return null

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Compteur */}
        <div className="absolute top-6 left-6 z-10">
          <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            {currentIndex! + 1} / {projects.length}
          </span>
        </div>

        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Flèche gauche */}
        <button
          onClick={(e) => { e.stopPropagation(); goToPrevious() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Flèche droite */}
        <button
          onClick={(e) => { e.stopPropagation(); goToNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Conteneur image */}
        <div
          className="w-full h-full max-w-[95vw] max-h-[90vh] mx-auto p-4 md:p-8 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentProject.images[0]}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </motion.div>
    </Portal>
  )
}