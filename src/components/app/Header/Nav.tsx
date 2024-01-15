import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

import { UserCart } from '@/components/app/Cart/UserCart'
import { AnimatePresence } from 'framer-motion'
import { useBodyOverlay } from '@/hooks/use-body-overlay.hook'
import { useCartContext } from '@/contexts/cart.context'
import { MobileNav } from '@/components/app/Header/MobileNav'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/use-user'
import { ProfileDropdown } from '@/components/app/Header/ProfileDropdown'
import { logoutAction } from '@/network/auth.api'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Orders', href: '/orders' },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export const Nav = () => {
  const [isUserCartOpen, setIsUserCartOpen] = useState(false)
  const { user } = useUser()
  const { cart } = useCartContext()
  useBodyOverlay(isUserCartOpen)

  const router = useRouter()

  const handleLogout = () => {
    logoutAction().then(() => {
      router.push('/auth/login')
    })
  }

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {isUserCartOpen ? (
          <UserCart close={() => setIsUserCartOpen(false)} />
        ) : null}
      </AnimatePresence>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      width={24}
                      height={24}
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                      className="h-auto w-8"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === router.pathname
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={
                            item.href === router.pathname ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                      onClick={() => setIsUserCartOpen(true)}
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">User Cart</span>
                      <div className="relative">
                        <div className="absolute flex justify-center items-center bg-green-600 w-4 h-4 p-2.5 -top-4 -left-1 rounded-xl">
                          <span className="text-white text-xs font-bold">
                            {cart.items.length}
                          </span>
                        </div>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                    </button>

                    {user ? (
                      <ProfileDropdown
                        user={user}
                        handleLogout={handleLogout}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <MobileNav
              navigation={navigation}
              userNavigation={userNavigation}
              user={user}
            />
          </>
        )}
      </Disclosure>
    </>
  )
}
