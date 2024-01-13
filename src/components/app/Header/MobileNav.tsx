import { Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import React from 'react'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export const MobileNav = ({ navigation, user, userNavigation }: any) => {
  return (
    <Disclosure.Panel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item: any) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <Image
              width={24}
              height={24}
              className="rounded-full h-auto w-8"
              src={user.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              {user.name}
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              {user.email}
            </div>
          </div>
          <button
            type="button"
            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map((item: any) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </div>
    </Disclosure.Panel>
  )
}
