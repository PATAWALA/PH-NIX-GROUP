'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const phoneNumber = '22542550779' // +225 42 55 07 79
const defaultMessage = encodeURIComponent(
  'Bonjour PHÉNIX GROUP & JF DÉCOR, je souhaite échanger au sujet d’un projet.'
)
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-stone-100 p-5 w-72 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-stone-800 text-sm">
                  PHÉNIX GROUP & JF DÉCOR
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Habituellement répond en moins de 2h
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-xs text-stone-600 leading-relaxed">
                Bonjour ! 👋<br />
                Dites‑nous tout sur votre projet, nous vous répondrons avec plaisir.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium text-sm py-3 px-5 rounded-xl transition-all duration-300 shadow-md shadow-green-200/50"
            >
              <MessageCircle className="h-4 w-4" />
              Discuter sur WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-300/40 hover:shadow-green-400/50 transition-shadow duration-300"
        aria-label="Ouvrir la discussion WhatsApp"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </motion.div>
        {/* Indicateur de disponibilité */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
      </motion.button>
    </div>
  )
}