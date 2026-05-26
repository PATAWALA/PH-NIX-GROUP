import { Suspense } from 'react'
import AdminContent from './AdminContent'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">Chargement…</div>}>
      <AdminContent />
    </Suspense>
  )
}