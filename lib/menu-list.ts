import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  type LucideIcon,
  UserPen,
  Home,
  Search,
} from 'lucide-react'
import { type User } from 'next-auth'

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string, user: User | undefined): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Home',
          active: pathname.includes('/dashboard'),
          icon: Home,
        },
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '/search',
          label: 'Search',
          active: pathname.includes('/search'),
          icon: Search,
        },
        {
          href: '/dashboard/create',
          label: 'Create',
          active: pathname.includes('/dashboard/create'),
          icon: SquarePen,
        },
        {
          href: `/dashboard/${user?.username}/saved`,
          label: 'Saved',
          active: pathname.includes(`/dashboard/${user?.username}/saved`),
          icon: Bookmark,
        },
        {
          href: `/dashboard/${user?.username}`,
          label: 'Profile',
          active: pathname.includes(`/dashboard/${user?.username}`),
          icon: UserPen,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/dashboard/edit-profile',
          label: 'Settings',
          active: pathname.includes('/dashboard/edit-profile'),
          icon: Settings,
        },
      ],
    },
  ]
}
