import React, { useEffect, useMemo, useState } from 'react'

import AppLayout from '@/layouts/App.layout'
import { CartDetails } from '@/components/app/Checkout/CartDetails'
import { ShippingAddressesList } from '@/components/app/Checkout/ShippingAddressList'
import { Address } from '@/types/address.types'
import { useAddresses } from '@/network/address.api'
import { CreateShippingAddressModal } from '@/components/app/Checkout/CreateShippingAddressModal'
import { RadioGroup } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { LabeledInput } from '@/components/app/UI/forms/LabeledInput'
import FormElement from '@/components/app/UI/forms/FormElement'
import useForm from '@/hooks/use-form.hook'
import { string } from 'yup'
import { useUser } from '@/hooks/use-user'

const orderCustomerSchema = {
  email: string().required().email(),
  name: string().required(),
}

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const { addresses, reload } = useAddresses()

  const { user } = useUser()

  const { handleChange, handleBlur, handleFocus, values, setValues, errors } =
    useForm(
      {
        email: user ? user.email : '',
        name: user ? user.name : '',
      },
      async (v) => {},
      orderCustomerSchema
    )

  useEffect(() => {
    setValues({
      email: user ? user.email : '',
      name: user ? user.name : '',
    })
  }, [user, setValues])

  useEffect(() => {
    if (addresses.length >= 1) {
      setSelectedAddress(
        addresses.find((address) => address.default) as Address
      )
    }
  }, [addresses])

  const onCreateNewAddress = () => reload()

  // TODO:
  const createOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
  }

  return (
    <AppLayout>
      <>
        <div className="block py-10 lg:flex bg-gray-50 rounded-md shadow-md">
          <div className="w-full lg:w-2/3">
            <div className="px-10">
              <div className="border-gray-900/10 pb-12">
                <h2 className="mb-6 text-base font-semibold leading-7 text-gray-900">
                  Customer Information
                </h2>

                <LabeledInput
                  label="Email"
                  htmlFor="email"
                  error={errors.email}
                >
                  <FormElement
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    value={values.email}
                    error={errors.email}
                  ></FormElement>
                </LabeledInput>

                <div className="mt-2">
                  <LabeledInput label="Name" htmlFor="name" error={errors.name}>
                    <FormElement
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      value={values.name}
                      error={errors.name}
                    ></FormElement>
                  </LabeledInput>
                </div>
              </div>
              <div className="border-gray-900/10 pb-12">
                <h2 className="mb-6 text-base font-semibold leading-7 text-gray-900">
                  Address Information
                </h2>

                <ShippingAddressesList
                  addresses={addresses}
                  selected={selectedAddress}
                  setSelected={setSelectedAddress}
                />

                <div className="mt-4 text-sm">
                  <CreateShippingAddressModal onCreate={onCreateNewAddress} />
                </div>
              </div>
              <div className="border-gray-900/10 pb-12">
                <h2 className="mb-6 text-base font-semibold leading-7 text-gray-900">
                  Shipping method
                </h2>
                <p className="border-2 border-indigo-600 p-4 rounded-md shadow bg-indigo-200">
                  Free
                </p>
              </div>
              <div className="border-gray-900/10 pb-12">
                <h2 className="mb-6 text-base font-semibold leading-7 text-gray-900">
                  Payment method
                </h2>

                <RadioGroup value={1}>
                  <RadioGroup.Label className="sr-only">
                    Select payment method
                  </RadioGroup.Label>
                  <div className="space-y-2">
                    <RadioGroup.Option
                      value={1}
                      className={({ active, checked }) =>
                        twMerge(
                          'ring-2 ring-gray-200 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                          active ? 'ring-indigo-600' : '',
                          checked ? 'bg-indigo-600 text-white' : 'bg-white'
                        )
                      }
                    >
                      {({ checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  <span>Cash on delivery</span>
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                  }`}
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
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="hidden lg:flex px-10 justify-center items-center">
              <button
                onClick={createOrder}
                className="w-1/2 rounded shadow-md bg-green-600 text-xl text-white px-8 py-4"
              >
                Complete order
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3 border-left border-l">
            <CartDetails />
            <div className="px-10 flex lg:hidden justify-center items-center">
              <button
                onClick={createOrder}
                className="w-1/2 rounded shadow-md bg-green-600 text-xl text-white px-8 py-4"
              >
                Complete order
              </button>
            </div>
          </div>
        </div>
      </>
    </AppLayout>
  )
}

export default Checkout
