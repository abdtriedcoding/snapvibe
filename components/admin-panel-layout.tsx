'use client'

import { cn } from '@/lib/utils'
import { type Session } from 'next-auth'
import { useStore } from '@/hook/use-store'
import { useSidebarToggle } from '@/hook/use-sidebar-toggle'
import Sidebar from '@/components/sidebar'
import MobileSidebar from '@/components/mobile-sidebar'

export default function AdminPanelLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state)
  if (!sidebar) return null

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <MobileSidebar session={session} />
        {/* TODO */}
        {/* {children} */}
      </main>
    </>
  )
}
