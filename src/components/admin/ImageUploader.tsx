'use client'

import { useState } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
}

export function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: string[] = []

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('realisations-images')
        .upload(fileName, file)

      if (error) {
        console.error('Erreur upload:', error.message)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('realisations-images')
        .getPublicUrl(fileName)

      newImages.push(publicUrl)
    }

    onImagesChange([...images, ...newImages])
    setUploading(false)
    e.target.value = ''
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index)
    onImagesChange(updated)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">Images</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {images.map((url, idx) => (
          <div key={idx} className="relative h-32 rounded-lg overflow-hidden border border-stone-200 group">
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <label className="h-32 rounded-lg border-2 border-dashed border-stone-400 flex items-center justify-center cursor-pointer hover:border-amber-500 transition-colors bg-stone-50">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-stone-500" />
          ) : (
            <Plus className="h-6 w-6 text-stone-500" />
          )}
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
      </div>
      <p className="text-xs text-stone-500">Formats acceptés : JPG, PNG, GIF, WebP. Taille max 5 Mo par image.</p>
    </div>
  )
}