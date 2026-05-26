'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit3, Trash2, Loader2, Star } from 'lucide-react'
import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/Button'

interface Testimonial {
  id: string
  author: string
  role: string
  company: string
  content: string
  rating: number
  project_type: string
  affiche: boolean
}

export function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    author: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    project_type: 'construction',
    affiche: true,
  })
  const supabase = createClient()

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    const { data } = await supabase.from('temoignages').select('*').order('created_at', { ascending: false })
    setTestimonials(data || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ author: '', role: '', company: '', content: '', rating: 5, project_type: 'construction', affiche: true })
    setEditing(null)
    setShowForm(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editing) {
      await supabase.from('temoignages').update(form).eq('id', editing.id)
    } else {
      await supabase.from('temoignages').insert(form)
    }
    resetForm()
    loadTestimonials()
  }

  async function handleDelete(id: string) {
    if (confirm('Supprimer ce témoignage ?')) {
      await supabase.from('temoignages').delete().eq('id', id)
      loadTestimonials()
    }
  }

  function startEdit(testimonial: Testimonial) {
    setEditing(testimonial)
    setForm({
      author: testimonial.author,
      role: testimonial.role || '',
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating,
      project_type: testimonial.project_type || 'construction',
      affiche: testimonial.affiche,
    })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-stone-800">Témoignages ({testimonials.length})</h2>
        <Button variant="gold" size="sm" onClick={() => { resetForm(); setShowForm(!showForm) }}>
          <Plus className="h-4 w-4 mr-2" /> Ajouter
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Auteur</label>
                <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full h-10 rounded-lg border border-stone-300 px-3 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Rôle / Entreprise</label>
                <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full h-10 rounded-lg border border-stone-300 px-3 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Contenu</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Note</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <button type="button" key={star} onClick={() => setForm({ ...form, rating: star })} className="focus:outline-none">
                      <Star className={`h-5 w-5 ${star <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Type de projet</label>
                <select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} className="w-full h-10 rounded-lg border border-stone-300 px-3 text-sm">
                  <option value="construction">Construction</option>
                  <option value="amenagement">Aménagement</option>
                  <option value="paysagisme">Paysagisme</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="affiche" checked={form.affiche} onChange={(e) => setForm({ ...form, affiche: e.target.checked })} className="rounded border-stone-300 text-amber-600 focus:ring-amber-500" />
                <label htmlFor="affiche" className="text-sm text-stone-700">Afficher sur le site</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button type="submit" variant="gold" size="sm">{editing ? 'Mettre à jour' : 'Publier'}</Button>
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>Annuler</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-5 rounded-xl shadow-sm border border-stone-100 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-800">{t.author}</span>
                  {t.role && <span className="text-stone-500 text-sm">· {t.role}{t.company ? `, ${t.company}` : ''}</span>}
                </div>
                <p className="text-stone-600 text-sm mt-1 line-clamp-2">{t.content}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`} />
                  ))}
                  <span className="text-xs text-stone-400 ml-2 capitalize">{t.project_type}</span>
                  {!t.affiche && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Masqué</span>}
                </div>
              </div>
              <div className="flex gap-2 self-end">
                <button onClick={() => startEdit(t)} className="p-2 text-stone-600 hover:text-amber-700"><Edit3 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 text-stone-600 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}