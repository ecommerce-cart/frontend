import React, { FC } from 'react'

import { InputProps } from '../types/input.types'

export const Input: FC<InputProps> = ({ additionalClasses, ...inputProps }) => {
  return (
    <input
      {...inputProps}
      className={`${additionalClasses} rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6`}
    />
  )
}
