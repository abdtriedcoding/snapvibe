import Link from 'next/link'
import Menu from './menu'
import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'
import { type User } from '@prisma/client'
import { useStore } from '@/hook/use-store'
import { Button } from '@/components/ui/button'
import { SidebarToggle } from './sidebar-toggle'
import { useSidebarToggle } from '@/hook/use-sidebar-toggle'

export default function Sidebar({ user }: { user: User | null }) {
  const sidebar = useStore(useSidebarToggle, (state) => state)
  if (!sidebar) return null

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full border-r-2 transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md">
        <Button
          className={cn(
            'mb-1 transition-transform duration-300 ease-in-out',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <Camera className="mr-1 h-6 w-6" />
            <h1
              className={cn(
                'whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
                sidebar?.isOpen === false
                  ? 'hidden -translate-x-96 opacity-0'
                  : 'translate-x-0 opacity-100'
              )}
            >
              Snapvibe
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} user={user} />
      </div>
    </aside>
  )
}
