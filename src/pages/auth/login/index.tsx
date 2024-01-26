import React from 'react'
import { useRouter } from 'next/router'

import useForm from '@/hooks/use-form.hook'
import formSchema from '@/validators/login.validator'
import { loginAction } from '@/network/auth.api'
import authenticatedVar from '@/apollo/vars/auth.vars'
import { LabeledInput } from '@/components/app/UI/forms/LabeledInput'
import FormElement from '@/components/app/UI/forms/FormElement'

const initialData = {
  email: '',
  password: '',
}

const Login = () => {
  const router = useRouter()

  const handleSubmitEvent = async (values: any) => {
    try {
      await loginAction(values)
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
  } = useForm(initialData, handleSubmitEvent, formSchema)

  return (
    <main className="w-10/12 md:w-8/12 xl:w-6/12 m-auto">
      <form onSubmit={handleSubmit} className="border px-10 py-6 m-6 rounded">
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Login
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <LabeledInput
                  label="Email"
                  error={errors.email}
                  htmlFor="email"
                >
                  <FormElement
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    value={values.email}
                    id="email"
                    name="email"
                    type="email"
                    error={errors.email}
                  />
                </LabeledInput>
              </div>

              <div className="sm:col-span-full">
                <LabeledInput
                  label="Password"
                  error={errors.password}
                  htmlFor="password"
                >
                  <FormElement
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    value={values.password}
                    id="password"
                    name="password"
                    type="password"
                    error={errors.password}
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
            {isSubmitting ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Login
