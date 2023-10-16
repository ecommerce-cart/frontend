import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  additionalClasses?: string
}

export interface LabeledInputProps {
  label: string
  inputProps: InputProps
  error?: string | undefined
}
