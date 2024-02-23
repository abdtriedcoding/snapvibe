'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Bookmark, Grid3X3 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const profileTabs = [
  {
    title: 'Posts',
    href: '',
    Icon: Grid3X3,
  },

  {
    title: 'Saved',
    href: 'saved',
    Icon: Bookmark,
  },
]

export default function ProfileTabs({
  username,
  isCurrentUser,
}: {
  username: string | null
  isCurrentUser: boolean
}) {
  const pathname = usePathname()

  return (
    <Tabs defaultValue="posts" className="pb-16 pt-14">
      <TabsList className="h-px w-full gap-x-10 bg-zinc-300 p-px dark:bg-neutral-800">
        {profileTabs
          .filter((tab) => isCurrentUser || tab.href !== 'saved')
          .map((tab) => {
            const profilePage = `/${username}`
            const isActive =
              tab.href === ''
                ? pathname === profilePage
                : pathname === `${profilePage}/${tab.href}`

            return (
              <TabsTrigger
                key={tab.href}
                value={tab.href}
                className={cn(
                  'mt-8 flex-col gap-4 p-0 data-[state=active]:text-neutral-400',
                  isActive
                    ? '!text-neutral-700 dark:!text-white'
                    : 'text-neutral-400'
                )}
                asChild
              >
                <Link href={`/${username}/${tab.href}`}>
                  <Separator
                    className={cn(
                      'h-px w-16',
                      isActive
                        ? '!bg-neutral-700 dark:!bg-white'
                        : 'bg-zinc-300 dark:!bg-neutral-800'
                    )}
                  />
                  <div className="flex items-center gap-x-1">
                    <tab.Icon className="h-3 w-3" />
                    <p className="text-xs font-bold uppercase tracking-widest">
                      {tab.title}
                    </p>
                  </div>
                </Link>
              </TabsTrigger>
            )
          })}
      </TabsList>
    </Tabs>
  )
}
