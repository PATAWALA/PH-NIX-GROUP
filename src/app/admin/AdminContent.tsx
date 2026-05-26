'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { ProjectManager } from '@/components/admin/ProjectManager'
import { TestimonialManager } from '@/components/admin/TestimonialManager'
import { Dashboard } from '@/components/admin/Dashboard'

export default function AdminContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'testimonials'>('dashboard')

  useEffect(() => {
    if (tabParam === 'projects') setActiveTab('projects')
    else if (tabParam === 'testimonials') setActiveTab('testimonials')
    else setActiveTab('dashboard')
  }, [tabParam])

  const handleTabChange = (tab: 'dashboard' | 'projects' | 'testimonials') => {
    setActiveTab(tab)
    if (tab === 'dashboard') {
      router.push('/admin')
    } else {
      router.push(`/admin?tab=${tab}`)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Onglets */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            Tableau de bord
          </button>
          <button
            onClick={() => handleTabChange('projects')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'projects' ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            Projets
          </button>
          <button
            onClick={() => handleTabChange('testimonials')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'testimonials' ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            Témoignages
          </button>
        </div>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'testimonials' && <TestimonialManager />}
      </div>
    </div>
  )
}