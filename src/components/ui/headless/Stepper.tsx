import { FC, ReactNode, useState } from 'react'

export type StepperProps = {
  initial?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  children: (props: {
    counter: number
    increment: () => void
    decrement: () => void
    setValue: (value: number) => void
  }) => ReactNode
}

export const Stepper: FC<StepperProps> = ({
  initial = 1,
  children,
  onChange,
  min,
  max,
}) => {
  const [counter, setCounter] = useState(initial)

  const setActualValue = (value: number) => {
    setCounter(value)
    if (onChange) {
      onChange(value)
    }
  }

  const increment = () => {
    if (max !== undefined && counter >= max) {
      setActualValue(counter)
    } else {
      setActualValue(counter + 1)
    }
  }

  const decrement = () => {
    if (min !== undefined && counter <= min) {
      setActualValue(0)
    } else {
      setActualValue(counter - 1)
    }
  }

  const setValue = (value: number) => {
    if (
      min !== undefined &&
      max !== undefined &&
      value <= max &&
      value >= min
    ) {
      setActualValue(value)
    } else {
      setActualValue(counter)
    }
  }

  return children({
    counter,
    increment,
    decrement,
    setValue,
  })
}
