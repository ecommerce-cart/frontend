import { RadioGroup } from '@headlessui/react'
import React from 'react'

import { classNames } from '@/lib/general.lib'

type RadioProps<T> = {
  label: string
  selectedOption?: T | null
  options: Array<T>
  optionName: (option: T) => string
  keyExtractor: (option: T) => number | string
  disabled: (option: T) => boolean
  onChange?: (value: T) => void
}

export const Radio = <T,>({
  options,
  label,
  selectedOption,
  keyExtractor,
  optionName,
  disabled,
  onChange,
}: RadioProps<T>) => {
  return (
    <RadioGroup value={selectedOption} onChange={onChange}>
      <RadioGroup.Label className="sr-only">Choose a {label}</RadioGroup.Label>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {options.map((option) => (
          <RadioGroup.Option
            key={keyExtractor(option)}
            value={option}
            disabled={disabled(option)}
            className={({ active, disabled }) =>
              classNames(
                disabled
                  ? 'cursor-not-allowed bg-gray-50 text-gray-200'
                  : 'cursor-pointer bg-white text-gray-900 shadow-sm',
                active ? 'ring-2 ring-indigo-500' : '',
                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
              )
            }
          >
            {({ active, checked, disabled }) => (
              <>
                <RadioGroup.Label as="span">{optionName(option)}</RadioGroup.Label>
                {!disabled ? (
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-md'
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                    >
                      <line
                        x1={0}
                        y1={100}
                        x2={100}
                        y2={0}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
