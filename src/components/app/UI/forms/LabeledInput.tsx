import React, { FC, ReactElement } from 'react'

export const LabeledInput: FC<{
  htmlFor: string
  label: string
  error?: string | null
  children: ReactElement
}> = ({ htmlFor, label, error, children }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <span className="text-sm text-red-500">{error}</span> : null}
    </>
  )
}
