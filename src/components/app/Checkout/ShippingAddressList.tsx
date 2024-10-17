import React from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge'
import { Address } from '@/types/address.types'

export const ShippingAddressesList = ({
  selected,
  setSelected,
  addresses,
}: {
  selected: Address | null
  setSelected: (address: Address) => void
  addresses: Array<Address>
}) => {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Select address</RadioGroup.Label>
      <div className="space-y-2">
        {addresses.map((address) => (
          <RadioGroup.Option
            key={address.id}
            value={address}
            className={({ active, checked }) =>
              twMerge(
                'ring-2 ring-gray-200 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                active ? 'ring-indigo-600' : '',
                checked ? 'bg-indigo-600 text-white' : 'bg-white',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                        <span>
                          {address.country.name} / {address.city.name} / {address.state}
                        </span>
                        <span className="block">{address.street1}</span>
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                      ></RadioGroup.Description>
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-white">
                      <CheckCircleIcon className="h-6 w-6 bg-indigo-500 rounded-full text-gray-50" />
                    </div>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
