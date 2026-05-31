'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit3, Trash2, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ImageUploader } from './ImageUploader'
import { Button } from '@/components/ui/Button'

interface Project {
  id: string
  categorie: string
  images: string[]
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    categorie: 'construction',
    images: [] as string[],
  })
  const supabase = createClient()

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const { data } = await supabase.from('realisations').select('*').order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ categorie: 'construction', images: [] })
    setEditingProject(null)
    setShowForm(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.images.length === 0) return alert('Ajoutez au moins une image')

    if (editingProject) {
      await supabase.from('realisations').update({ categorie: form.categorie, images: form.images }).eq('id', editingProject.id)
    } else {
      await supabase.from('realisations').insert({ categorie: form.categorie, images: form.images })
    }
    resetForm()
    loadProjects()
  }

  async function handleDelete(id: string) {
    if (confirm('Supprimer ce projet ?')) {
      await supabase.from('realisations').delete().eq('id', id)
      loadProjects()
    }
  }

  function startEdit(project: Project) {
    setEditingProject(project)
    setForm({ categorie: project.categorie, images: project.images })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-stone-800">Projets ({projects.length})</h2>
        <Button
          variant="gold"
          size="sm"
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="!bg-amber-600 !text-white hover:!bg-amber-700 shadow-lg shadow-amber-600/30"
        >
          <Plus className="h-4 w-4 mr-2" /> Nouveau projet
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-stone-200"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Catégorie</label>
                <select
                  value={form.categorie}
                  onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                  className="w-full h-11 rounded-lg border border-stone-300 px-4 text-sm text-stone-900 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="construction">Construction</option>
                  <option value="amenagement">Aménagement</option>
                  <option value="paysagisme">Paysagisme</option>
                </select>
              </div>
              <ImageUploader images={form.images} onImagesChange={(images) => setForm({ ...form, images })} />
            </div>
            <div className="flex gap-3 mt-6">
              <Button type="submit" variant="gold" size="sm" className="!bg-amber-600 !text-white hover:!bg-amber-700 shadow-lg shadow-amber-600/30">
                {editingProject ? 'Mettre à jour' : 'Publier'}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={resetForm} className="text-stone-700 border-stone-300">
                Annuler
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-100">
              <div className="relative h-48 bg-stone-100">
                {project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-400">Aucune image</div>
                )}
                <span className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-1 rounded-full capitalize text-stone-800">
                  {project.categorie}
                </span>
              </div>
              <div className="p-4 flex justify-end gap-2">
                <button onClick={() => startEdit(project)} className="p-2 text-stone-600 hover:text-amber-700"><Edit3 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-stone-600 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}