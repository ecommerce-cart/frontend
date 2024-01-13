import React, { FC, ReactElement } from 'react'

export type RadioButtonProps<T> = {
  selected: T
  selections: Array<T>
  additionalClasses?: string
  name: string
renderElement: (element: T) => ReactElement
}

const RadioButton = <T,>({
  selected,
  selections,
  additionalClasses,
  name,
  renderElement,
}: RadioButtonProps<T>) => {
  return (
    <ul className={`${additionalClasses ?? ''} flex`}>
      {selections.map((selection, index) => (
        <div key={index}>{renderElement(selection)}</div>
      ))}
    </ul>
  )
}

export default RadioButton
