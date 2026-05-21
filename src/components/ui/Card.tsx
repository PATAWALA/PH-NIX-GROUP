import { cn } from '@/lib/utils'
import Image from 'next/image'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-stone-200 shadow-sm',
        hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-amber-200',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  imageUrl?: string
  href?: string
}

export function ServiceCard({ title, description, icon, features, imageUrl, href }: ServiceCardProps) {
  return (
    <Card hover className="group cursor-pointer overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif">
            {title}
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-stone-600">
            <svg className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      {href && (
        <a
          href={href}
          className="inline-flex items-center text-amber-700 font-medium text-sm group-hover:text-amber-800 transition-colors"
        >
          En savoir plus
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </Card>
  )
}