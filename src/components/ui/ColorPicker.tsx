import { RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react'

type ColorPickerProps<T> = {
  colors: Array<T>
  onColorChange?: (color: T) => void
  selectedColor?: T | null
  disabled?: (color: T) => boolean
  getKey: (color: T) => number | string
  colorName: (color: T) => string
}

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export const ColorPicker = <T,>({
  colors,
  getKey,
  onColorChange,
  colorName,
  disabled,
  selectedColor,
}: ColorPickerProps<T>) => {
  return (
    <RadioGroup value={selectedColor} onChange={onColorChange}>
      <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
      <div className="flex items-center space-x-3">
        {colors.map((color) => (
          <RadioGroup.Option
            disabled={disabled ? disabled(color) : false}
            key={getKey(color)}
            value={color}
            style={{ background: colorName(color) }}
            className={({ checked, disabled }) =>
              classNames(
                'ring-gray-400',
                checked ? 'ring ring-offset-1' : '',
                disabled ? 'cursor-not-allowed' : '',
                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
              )
            }
          >
            {({ disabled }) => (
              <Fragment>
                <RadioGroup.Label as="span" className="sr-only">
                  {colorName(color)}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={
                    'flex justify-center items-center h-8 w-8 rounded-full border border-black border-opacity-10 text-white'
                  }
                >
                  {disabled ? <XMarkIcon className="h-5 w-5" /> : null}
                </span>
              </Fragment>

            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
