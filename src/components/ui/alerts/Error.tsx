import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import React from 'react'

export const Error = ({ message }: { message: string }) => {
  return (
    <div className="mb-4 flex text-sm border border-red-500 bg-red-300 text-red-950 rounded p-2">
      <span className="mr-1">
        <ExclamationTriangleIcon className="w-5 h-5" aria-hidden="true" />
      </span>
      {message}
    </div>
  )
}
