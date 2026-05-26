'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/client'

export function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  const router = useRouter()
  const supabase = createClient()

  const isDashboardActive = pathname === '/admin' && !currentTab

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/') // Redirection vers le site public
  }

  const linkClasses = (active: boolean) =>
    cn(
      'px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
      active
        ? 'bg-amber-100 text-amber-700'
        : 'text-stone-600 hover:bg-stone-100'
    )

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        href="/admin"
        className={linkClasses(isDashboardActive)}
        onClick={() => setMobileOpen(false)}
      >
        <LayoutDashboard className="h-4 w-4" />
        Tableau de bord
      </Link>
      <Link
        href="/admin?tab=projects"
        className={linkClasses(
          currentTab === 'projects' || (!currentTab && pathname === '/admin')
        )}
        onClick={() => setMobileOpen(false)}
      >
        <FolderOpen className="h-4 w-4" />
        Projets
      </Link>
      <Link
        href="/admin?tab=testimonials"
        className={linkClasses(currentTab === 'testimonials')}
        onClick={() => setMobileOpen(false)}
      >
        <MessageSquare className="h-4 w-4" />
        Témoignages
      </Link>
      <button
        onClick={() => {
          setMobileOpen(false)
          handleLogout()
        }}
        className="ml-4 px-3 py-2 text-sm text-stone-500 hover:text-red-600 transition-colors flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Déconnexion
      </button>
    </>
  )

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-800">PHÉNIX GROUP</span>
          <span className="text-xs text-stone-400 hidden sm:inline">Admin</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLinks />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-stone-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-1">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  )
}