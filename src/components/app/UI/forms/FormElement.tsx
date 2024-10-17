import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type FormElementTypes = 'input' | 'select' | 'textarea'

interface FormElementProps {
  as?: FormElementTypes
  error?: string | null
}

type InputProps = InputHTMLAttributes<HTMLInputElement>
type SelectProps = SelectHTMLAttributes<HTMLSelectElement>
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

type PropsByElementType = {
  input: InputProps
  select: SelectProps
  textarea: TextareaProps
}

type CombinedProps = FormElementProps & PropsByElementType[FormElementTypes]

const FormElement: React.FC<CombinedProps> = ({ as = 'input', className, error, ...props }: CombinedProps) => {
  const commonStyles = twMerge(
    'w-full bg-white border-0 p-2 text-gray-900 shadow-md rounded-md ring-inset ring-2 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6',
    className || '',
    error ? 'ring-2 ring-red-500' : '',
  )

  return React.createElement(as, {
    ...props,
    className: commonStyles,
  }) as ReactElement
}

export default FormElement
