import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-lg">
        {/* Code erreur */}
        <div className="text-9xl font-bold text-stone-200 font-serif mb-4">
          404
        </div>
        
        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 font-serif">
          Page introuvable
        </h1>
        
        <p className="text-stone-600 text-lg mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée. 
          Vérifiez l&apos;URL ou retournez à l&apos;accueil.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="gold" leftIcon={<Home className="h-4 w-4" />}>
              Retour à l&apos;accueil
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button variant="outline" leftIcon={<Search className="h-4 w-4" />}>
              Nous contacter
            </Button>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-500 mb-4">
            Pages suggérées :
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link 
              href="/services" 
              className="text-sm text-stone-600 hover:text-amber-700 transition-colors underline underline-offset-4"
            >
              Nos services
            </Link>
            <span className="text-stone-300">•</span>
            <Link 
              href="/realisations" 
              className="text-sm text-stone-600 hover:text-amber-700 transition-colors underline underline-offset-4"
            >
              Réalisations
            </Link>
            <span className="text-stone-300">•</span>
            <Link 
              href="/contact" 
              className="text-sm text-stone-600 hover:text-amber-700 transition-colors underline underline-offset-4"
            >
              Devis gratuit
            </Link>
            <span className="text-stone-300">•</span>
            <Link 
              href="/a-propos" 
              className="text-sm text-stone-600 hover:text-amber-700 transition-colors underline underline-offset-4"
            >
              À propos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}