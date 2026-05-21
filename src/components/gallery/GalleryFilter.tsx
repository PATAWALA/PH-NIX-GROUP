'use client'

import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'construction', label: 'Construction' },
  { id: 'amenagement', label: 'Aménagement' },
  { id: 'paysagisme', label: 'Paysagisme' },
]

interface GalleryFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function GalleryFilter({ activeFilter, onFilterChange }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
            activeFilter === filter.id
              ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}