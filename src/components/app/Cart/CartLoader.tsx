import { useCartContext } from '@/contexts/cart.context'
import { getCart } from '@/network/cart.api'
import React, { useEffect } from 'react'

export const CartLoader = () => {
  const { setCart } = useCartContext()
  useEffect(() => {
    getCart()
      .then((data) => setCart(data))
      .catch(console.log)
  }, [setCart])
  return <></>
}
