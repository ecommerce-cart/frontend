import { FC, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useCartContext } from '@/contexts/cart.context'

export const CartGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { cart } = useCartContext()
  const router = useRouter()

  // FIXME: add a loading placeholder
  if (!cart.isReady) {
    return <div>Loading...</div>
  }

  if (cart.isReady && cart.items.length === 0) {
    router.replace('/')
    return null
  }

  return children
}
