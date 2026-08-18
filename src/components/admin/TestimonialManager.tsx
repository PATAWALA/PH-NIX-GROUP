'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit3, Trash2, Loader2, Star } from 'lucide-react'
import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/Button'

interface Testimonial {
  id: string
  auteur: string
  role_entreprise: string
  contenu: string
  note: number
  type_projet: string
  affiche: boolean
}

export function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    auteur: '',
    role_entreprise: '',
    contenu: '',
    note: 5,
    type_projet: 'amenagement',
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
    setForm({ auteur: '', role_entreprise: '', contenu: '', note: 5, type_projet: 'amenagement', affiche: true })
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
      auteur: testimonial.auteur,
      role_entreprise: testimonial.role_entreprise || '',
      contenu: testimonial.contenu,
      note: testimonial.note,
      type_projet: testimonial.type_projet || 'amenagement',
      affiche: testimonial.affiche,
    })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-stone-800">Témoignages ({testimonials.length})</h2>
        <Button variant="gold" size="sm" onClick={() => { resetForm(); setShowForm(!showForm) }} className="!bg-emerald-600 !text-white hover:!bg-emerald-700">
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
                <input type="text" value={form.auteur} onChange={(e) => setForm({ ...form, auteur: e.target.value })} className="w-full h-10 rounded-lg border border-stone-300 px-3 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Rôle / Entreprise</label>
                <input type="text" value={form.role_entreprise} onChange={(e) => setForm({ ...form, role_entreprise: e.target.value })} className="w-full h-10 rounded-lg border border-stone-300 px-3 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Contenu</label>
                <textarea value={form.contenu} onChange={(e) => setForm({ ...form, contenu: e.target.value })} rows={3} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Note</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <button type="button" key={star} onClick={() => setForm({ ...form, note: star })} className="focus:outline-none">
                      <Star className={`h-5 w-5 ${star <= form.note ? 'text-emerald-400 fill-emerald-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Type de projet</label>
                <select value={form.type_projet} onChange={(e) => setForm({ ...form, type_projet: e.target.value })} className="w-full h-10 rounded-lg border border-stone-300 px-3 text-sm">
                  <option value="amenagement">Aménagement Extérieur</option>
                  <option value="paysagisme">Paysagisme Artistique</option>
                  <option value="entretien">Entretien de Jardins</option>
                  <option value="autre">Autre Projet Paysager</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="affiche" checked={form.affiche} onChange={(e) => setForm({ ...form, affiche: e.target.checked })} className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="affiche" className="text-sm text-stone-700">Afficher sur le site</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button type="submit" variant="gold" size="sm" className="!bg-emerald-600 !text-white hover:!bg-emerald-700">{editing ? 'Mettre à jour' : 'Publier'}</Button>
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
                  <span className="font-semibold text-stone-800">{t.auteur}</span>
                  {t.role_entreprise && <span className="text-stone-500 text-sm">· {t.role_entreprise}</span>}
                </div>
                <p className="text-stone-600 text-sm mt-1 line-clamp-2">{t.contenu}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < t.note ? 'text-emerald-400 fill-emerald-400' : 'text-stone-300'}`} />
                  ))}
                  <span className="text-xs text-stone-400 ml-2 capitalize">
                    {t.type_projet === 'amenagement' && 'Aménagement'}
                    {t.type_projet === 'paysagisme' && 'Paysagisme'}
                    {t.type_projet === 'entretien' && 'Entretien'}
                    {t.type_projet === 'autre' && 'Autre'}
                  </span>
                  {!t.affiche && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Masqué</span>}
                </div>
              </div>
              <div className="flex gap-2 self-end">
                <button onClick={() => startEdit(t)} className="p-2 text-stone-600 hover:text-emerald-700"><Edit3 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 text-stone-600 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}