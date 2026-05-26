'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/client'
import { FolderOpen, MessageSquare, Star, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function Dashboard() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    testimonialsCount: 0,
    recentProjects: [] as any[],
    recentTestimonials: [] as any[],
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchStats() {
      const { count: pCount, data: pData } = await supabase
        .from('realisations')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(3)

      const { count: tCount, data: tData } = await supabase
        .from('temoignages')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(3)

      setStats({
        projectsCount: pCount || 0,
        testimonialsCount: tCount || 0,
        recentProjects: pData || [],
        recentTestimonials: tData || [],
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return <Loader2 className="h-8 w-8 animate-spin mx-auto mt-12" />
  }

  return (
    <div className="space-y-8">
      {/* Cards résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin?tab=projects"
          className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FolderOpen className="h-5 w-5 text-amber-700" />
            </div>
            <span className="text-sm font-medium text-stone-500">Projets</span>
          </div>
          <p className="text-3xl font-bold text-stone-800">{stats.projectsCount}</p>
        </Link>

        <Link
          href="/admin?tab=testimonials"
          className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-amber-700" />
            </div>
            <span className="text-sm font-medium text-stone-500">Témoignages</span>
          </div>
          <p className="text-3xl font-bold text-stone-800">{stats.testimonialsCount}</p>
        </Link>
      </div>

      {/* Derniers ajouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projets récents */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <h3 className="text-sm font-semibold text-stone-700 mb-4 flex items-center gap-2">
            <FolderOpen className="h-4 w-4" /> Projets récents
          </h3>
          {stats.recentProjects.length === 0 ? (
            <p className="text-sm text-stone-400">Aucun projet pour le moment.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentProjects.map((p: any) => (
                <li key={p.id} className="flex items-center gap-3 text-sm">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-stone-200" />
                  )}
                  <div>
                    <p className="font-medium text-stone-800 capitalize">{p.categorie}</p>
                    <p className="text-xs text-stone-400">{p.images?.length || 0} image(s)</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Témoignages récents */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <h3 className="text-sm font-semibold text-stone-700 mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Témoignages récents
          </h3>
          {stats.recentTestimonials.length === 0 ? (
            <p className="text-sm text-stone-400">Aucun témoignage pour le moment.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentTestimonials.map((t: any) => (
                <li key={t.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{t.author}</p>
                    <p className="text-xs text-stone-500 line-clamp-1">{t.content}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < t.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}