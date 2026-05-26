'use client'

import { ReactNode } from 'react'

export function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">{title}</h1>
        {children}
      </div>
    </div>
  )
}