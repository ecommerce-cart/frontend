import React, { FC, ReactNode } from 'react'

export const Backdrop: FC<{ children: ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="fixed w-full h-[100vh] flex bg-black bg-opacity-20 z-50">
      {children}
    </div>
  )
}
