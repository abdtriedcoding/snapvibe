import Link from 'next/link'
import { type User } from 'next-auth'
import { Button } from '@/components/ui/button'
import { Camera, MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import Menu from './menu'
import UserNav from './user-nav'
import ModeToggle from './mode-toggle'
import LoginModal from './login-modal'

export default function MobileSidebar({ user }: { user: User | undefined }) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <Sheet>
          <SheetTrigger className="lg:hidden" asChild>
            <Button className="h-8" variant="outline" size="icon">
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="flex h-full flex-col px-3 sm:w-72"
            side="left"
          >
            <SheetHeader>
              <Button
                className="flex items-center justify-center pb-2 pt-1"
                variant="link"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Camera className="mr-1 h-6 w-6" />
                  <h1 className="text-lg font-bold">Snapvibe</h1>
                </Link>
              </Button>
            </SheetHeader>
            <Menu isOpen user={user} />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
          {user ? <UserNav user={user} /> : <LoginModal />}
        </div>
      </div>
    </header>
  )
}
