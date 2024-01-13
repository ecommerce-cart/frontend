import { StepperControl } from '@/components/ui/headless/StepperControl'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import React from 'react'

export const QuantityStepper = ({
  initial = 1,
  onChange,
}: {
  onChange?: (value: number) => void
  initial?: number
}) => {
  return (
    <StepperControl
      initial={initial}
      min={0}
      max={20}
      onChange={(value) => (onChange !== undefined ? onChange(value) : null)}
    >
      {({ increment, counter, decrement, setValue }) => {
        return (
          <div className="flex items-center">
            <StepperControl.Button
              onClick={decrement}
              className="border rounded text-center px-2 py-1 bg-indigo-600 text-white"
            >
              <MinusIcon className="w-5 h-5" aria-hidden="true" />
            </StepperControl.Button>
            <input
              className="outline-none w-14 h-7 rounded text-center"
              type="text"
              value={counter}
              onChange={(e) => setValue(+e.target.value)}
            />
            <StepperControl.Button
              onClick={increment}
              className="border rounded text-center px-2 py-1 bg-indigo-600 text-white"
            >
              <PlusIcon className="w-5 h-5" aria-hidden="true" />
            </StepperControl.Button>
          </div>
        )
      }}
    </StepperControl>
  )
}
