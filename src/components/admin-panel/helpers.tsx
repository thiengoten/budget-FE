import {
  BoltIcon,
  CircleDollarSignIcon,
  LayoutGridIcon,
  UsersIcon,
  WalletIcon,
} from 'lucide-react'

export function getMenuList(pathname: string) {
  return [
    {
      groupLabel: 'Dashboard',
      menus: [
        {
          label: 'Overview',
          href: '/admin/dashboard',
          icon: LayoutGridIcon,
          active: pathname === '/admin/dashboard',
        },
      ],
    },
    {
      groupLabel: 'Manage',
      menus: [
        {
          label: 'Users',
          href: '/admin/users',
          icon: UsersIcon,
          active: pathname === '/admin/users',
        },
        {
          label: 'Products',
          href: '/admin/products',
          icon: WalletIcon,
          active: pathname === '/admin/products',
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          label: 'General',
          href: '/admin/settings/general',
          icon: BoltIcon,
          active: pathname === '/admin/settings/general',
        },
        {
          label: 'Billing',
          href: '/admin/settings/billing',
          icon: CircleDollarSignIcon,
          active: pathname === '/admin/settings/billing',
        },
      ],
    },
  ]
}
