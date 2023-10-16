import React, { FC } from 'react'

import { Input } from '@/components/forms/Input'
import { LabeledInputProps } from '../types/input.types'

export const LabeledInput: FC<LabeledInputProps> = ({
  label,
  inputProps,
  error,
}) => {
  return (
    <>
      <label
        htmlFor={inputProps.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <Input {...inputProps} />
      </div>
      {error ? <span className="text-sm text-red-500">{error}</span> : ''}
    </>
  )
}
