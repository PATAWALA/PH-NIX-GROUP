
'use client'

import { usePathname } from 'next/navigation'
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget'

export function AdminAwareWidget() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return null

  return <WhatsAppWidget />
}