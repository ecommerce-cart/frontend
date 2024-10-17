import React from 'react'

import FormElement from '@/components/app/UI/forms/FormElement'
import useForm from '@/hooks/use-form.hook'
import formSchema from '@/validators/address.validator'
import { LabeledInput } from '@/components/app/UI/forms/LabeledInput'
import { createAddressAction, useCities } from '@/network/address.api'
import { City } from '@/types/address.types'

export type ShippingAddressInput = {
  country?: number
  street1?: string
  street2?: string
  city?: string
  state?: string
  zipCode?: string
}

const initData: ShippingAddressInput = {
  country: 1,
  street1: '',
  street2: '',
  city: '',
  state: '',
  zipCode: '',
}
export const CreateShippingAddress = ({
  onCreate,
}: {
  onCreate: () => void
}) => {
  const { cities } = useCities()

  const submitHandler = async (values: ShippingAddressInput) => {
    const city = cities.find((c) => c.id == Number(values.city)) as City
    const country = { id: 1, name: 'Egypt' }
    createAddressAction({
      ...values, 
      city, 
      country
    }).then(onCreate)
  }

  const {
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    errors,
    values,
  } = useForm(initData, submitHandler, formSchema)

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* ===============================Country============================== */}
            <div className="col-span-full">
              <LabeledInput
                htmlFor="country"
                label="Country"
                error={errors.country}
              >
                <FormElement
                  as="select"
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={values.country || ''}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={errors.country}
                >
                  <option value="1" disabled>
                    Egypt
                  </option>
                </FormElement>
              </LabeledInput>
            </div>

            {/* =============================== Street1 ============================== */}
            <div className="col-span-full">
              <LabeledInput
                htmlFor="street1"
                label="Street1"
                error={errors.street1}
              >
                <FormElement
                  as="textarea"
                  id="street1"
                  name="street1"
                  onChange={handleChange}
                  value={values.street1}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={errors.street1}
                />
              </LabeledInput>
            </div>  
            
            {/* =============================== Street2 ============================== */}
            <div className="col-span-full">
              <LabeledInput
                htmlFor="street2"
                label="Street2"
                error={errors.street2}
              >
                <FormElement
                  as="textarea"
                  id="street2"
                  name="street2"
                  onChange={handleChange}
                  value={values.street2}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={errors.street2}
                />
              </LabeledInput>
            </div>

            {/* ===============================City============================== */}
            <div className="col-span-full">
              <LabeledInput htmlFor="city" label="City" error={errors.city}>
                <FormElement
                  as="select"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={errors.city}
                >
                  <option value="" disabled>
                    Select a city
                  </option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </FormElement>
              </LabeledInput>
            </div>

            {/* ===============================State / Province============================== */}
            <div className="col-span-full">
              <LabeledInput
                label="State / Province"
                error={errors.state}
                htmlFor="state"
              >
                <FormElement
                  id="state"
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={errors.state}
                />
              </LabeledInput>
            </div>

            {/* ===============================ZIP / Postal code============================== */}
            <div className="col-span-full">
              <LabeledInput
                label="ZIP/ Postal code"
                error={errors.zipCode}
                htmlFor="zipCode"
              >
                <FormElement
                  id="zipCode"
                  name="zipCode"
                  onChange={handleChange}
                  value={values.zipCode}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  error={errors.zipCode}
                />
              </LabeledInput>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
