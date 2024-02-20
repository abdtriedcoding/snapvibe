'use client'

import { cn } from '@/lib/utils'
import Sidebar from '@/components/sidebar'
import { useStore } from '@/hook/use-store'
import { useSidebarToggle } from '@/hook/use-sidebar-toggle'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
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
        {children}
      </main>
    </>
  )
}
