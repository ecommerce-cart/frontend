import { BasicUser } from '@/types/user'
import { Menu, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import React, { Fragment } from 'react'

export const ProfileDropdown = ({
  user,
  handleLogout,
}: {
  user: BasicUser
  handleLogout: () => void
}) => {
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        {user?.image ? (
          <div>
            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Image
                width={24}
                height={24}
                className="rounded-full h-auto w-8"
                src={user.image}
                alt=""
              />
            </Menu.Button>
          </div>
        ) : null}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="border-b block px-4 py-2 text-sm text-gray-700">
                {/* FIXME: */}
                Hello Taha Mohamed
              </div>
            </Menu.Item>

            <Menu.Item>
              <button
                className="flex items-center w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <ArrowLeftOnRectangleIcon
                  className="h-4 w-4 mr-2"
                  aria-hidden="true"
                />
                Logout
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
