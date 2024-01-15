import React from 'react'
import { useRouter } from 'next/router'

import useForm from '@/hooks/use-form.hook'
import formSchema from '@/validators/register.validator'
import { LabeledInput } from '@/components/forms/LabeledInput'
import { RegisterFormData } from '@/types/registration'
import { register } from '@/network/auth.api'
import authenticatedVar from '@/apollo/vars/auth.vars'

const initialData = {
  name: '',
  email: '',
  password: '',
  // passwordConfirm: '',
  phone: '',
}

const Register = () => {
  const router = useRouter()

  const registerAction = async (values: RegisterFormData) => {
    try {
      await register(values)
      authenticatedVar(true)
      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    handleFocus,
    isSubmitting,
  } = useForm(initialData, registerAction, formSchema)

  return (
    <main className="w-10/12 md:w-8/12 xl:w-6/12 m-auto">
      <form onSubmit={handleSubmit} className="border px-10 py-6 m-6 rounded">
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Register
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <LabeledInput
                  label="Name"
                  error={errors.name}
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur,
                    onFocus: handleFocus,
                    value: values.name,
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    additionalClasses: 'block w-full',
                  }}
                />
              </div>

              <div className="sm:col-span-full">
                <LabeledInput
                  label="Email"
                  error={errors.email}
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur,
                    onFocus: handleFocus,
                    value: values.email,
                    id: 'email',
                    name: 'email',
                    type: 'text',
                    additionalClasses: 'block w-full',
                  }}
                />
              </div>

              <div className="sm:col-span-full">
                <LabeledInput
                  label="Phone"
                  error={errors.phone}
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur,
                    onFocus: handleFocus,
                    value: values.phone,
                    id: 'phone',
                    name: 'phone',
                    type: 'text',
                    additionalClasses: 'block w-full',
                  }}
                />
              </div>

              <div className="sm:col-span-full">
                <LabeledInput
                  label="Password"
                  error={errors.password}
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur,
                    onFocus: handleFocus,
                    value: values.password,
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    additionalClasses: 'block w-full',
                  }}
                />
              </div>

              {/* <div className="sm:col-span-full">
                <LabeledInput
                  label="Confirm Password"
                  error={errors.passwordConfirm}
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur,
                    onFocus: handleFocus,
                    value: values.passwordConfirm,
                    id: 'passwordConfirm',
                    name: 'passwordConfirm',
                    type: 'password',
                    additionalClasses: 'block w-full',
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Register
