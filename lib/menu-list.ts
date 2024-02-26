import { type User } from 'next-auth'
import {
  Settings,
  Bookmark,
  SquarePen,
  type LucideIcon,
  UserPen,
  Home,
  Search,
} from 'lucide-react'

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
          href: '/',
          label: 'Home',
          active: pathname === '/',
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
          active: pathname === '/search',
          icon: Search,
        },
        {
          href: '/create',
          label: 'Create',
          active: pathname === '/create',
          icon: SquarePen,
        },
        {
          href: `/${user?.username}/saved`,
          label: 'Saved',
          active: pathname === `/${user?.username}/saved`,
          icon: Bookmark,
        },
        {
          href: `/${user?.username}`,
          label: 'Profile',
          active: pathname === `/${user?.username}`,
          icon: UserPen,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/edit-profile',
          label: 'Settings',
          active: pathname === '/edit-profile',
          icon: Settings,
        },
      ],
    },
  ]
}
