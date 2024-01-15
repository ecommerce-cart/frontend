import { Nav } from '@/components/app/Header/Nav'
import CartContextProvider from '@/contexts/cart.context'
import { ReactElement } from 'react'

export default function AppLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <div className="min-h-full">
        <CartContextProvider>
          <Nav />
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </CartContextProvider>
      </div>
    </>
  )
}
