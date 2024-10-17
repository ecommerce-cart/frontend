import { classNames } from '@/lib/general.lib'
import { BasicUser } from '@/types/user'
import Link from 'next/link'
import { FC } from 'react'

interface NavItemProps {
  item: {
    name: string
    href: string
    requireAuth?: boolean
  }
  currentPath: string
  user?: BasicUser | null
}

export const NavItem: FC<NavItemProps> = ({ item, user, currentPath }) => {
  if (item.requireAuth && !user) {
    return null
  }

  return (
    <Link
      href={item.href}
      className={classNames(
        item.href === currentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium',
      )}
      aria-current={item.href === currentPath ? 'page' : undefined}
    >
      {item.name}
    </Link>
  )
}
