import { RadioGroup } from '@headlessui/react'
import React, { useState } from 'react'

type ColorPickerProps<T> = {
  colors: Array<T>
  onColorChange?: (color: T) => void
  selectedColor?: T | null
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
  selectedColor,
}: ColorPickerProps<T>) => {
  return (
    <RadioGroup value={selectedColor} onChange={onColorChange}>
      <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
      <div className="flex items-center space-x-3">
        {colors.map((color) => (
          <RadioGroup.Option
            key={getKey(color)}
            value={color}
            style={{ background: colorName(color) }}
            className={({ checked }) =>
              classNames(
                'ring-gray-400',
                checked ? 'ring ring-offset-1' : '',
                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
              )
            }
          >
            <RadioGroup.Label as="span" className="sr-only">
              {colorName(color)}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className={
                'h-8 w-8 rounded-full border border-black border-opacity-10'
              }
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
