/* eslint-disable react/display-name */
import React, { ButtonHTMLAttributes, InputHTMLAttributes, ReactElement, ReactNode } from 'react'
import { Stepper } from './Stepper'

type StepperControlChildrenAcceptProps = {
  counter: number
  increment: () => void
  decrement: () => void
  setValue: (value: number) => void
}

type StepperControlProps = {
  children: (childrenProps: StepperControlChildrenAcceptProps) => ReactNode
  onChange: (value: number) => void
  min?: number
  max?: number
  initial?: number
}

export const StepperControl = ({ min, max, onChange, children, initial = 1 }: StepperControlProps) => {
  return (
    <Stepper initial={initial} min={min} max={max} onChange={onChange}>
      {({ counter, decrement, increment, setValue }) => children({ counter, decrement, increment, setValue })}
    </Stepper>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactElement
}

StepperControl.Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  )
}
